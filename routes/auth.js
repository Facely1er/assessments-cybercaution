const express = require('express');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { User } = require('../models/User');
const { validate, userSchemas, validatePasswordStrength } = require('../utils/validation');
const { authenticateToken, verifyMFA } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { AuthenticationError, ValidationError, ConflictError } = require('../middleware/errorHandler');

const router = express.Router();

// Register new user
router.post('/register', validate(userSchemas.register), async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role, department, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      throw new ValidationError('Password does not meet security requirements', passwordValidation.issues);
    }

    // Create user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
      department,
      phone
    });

    await user.save();

    // Generate email verification token
    const verificationToken = user.createEmailVerificationToken();
    await user.save();

    // Log user registration
    logger.auditLog('USER_REGISTERED', { id: user._id, email: user.email }, 'user', {
      role: user.role,
      department: user.department
    });

    // Send verification email (implement email service)
    // await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
      email: user.email,
      requiresVerification: true
    });
  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', validate(userSchemas.login), async (req, res, next) => {
  try {
    const { email, password, mfaCode } = req.body;

    // Find user and include password for comparison
    const user = await User.findByEmail(email).select('+password');
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Check if account is locked
    if (user.isLocked) {
      throw new AuthenticationError('Account is locked due to multiple failed login attempts');
    }

    // Check password
    const isPasswordValid = await user.correctPassword(password, user.password);
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      throw new AuthenticationError('Invalid email or password');
    }

    // Reset login attempts on successful password check
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Check if MFA is required
    if (user.mfaEnabled && !mfaCode) {
      return res.status(200).json({
        message: 'MFA code required',
        mfaRequired: true,
        userId: user._id
      });
    }

    // Verify MFA code if provided
    if (user.mfaEnabled && mfaCode) {
      const isValidMFA = await verifyMFACode(user, mfaCode);
      if (!isValidMFA) {
        logger.securityEvent('INVALID_MFA_ATTEMPT', {
          userId: user._id,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        throw new AuthenticationError('Invalid MFA code');
      }
    }

    // Update last login
    await user.updateLastLogin();

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );

    // Set session
    req.session.userId = user._id;
    req.session.role = user.role;

    // Log successful login
    logger.auditLog('USER_LOGIN', { id: user._id, email: user.email }, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      mfaUsed: user.mfaEnabled
    });

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department,
        mfaEnabled: user.mfaEnabled,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthenticationError('Refresh token required');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res, next) => {
  try {
    // Log logout
    logger.auditLog('USER_LOGOUT', req.user, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    next(error);
  }
});

// Setup MFA
router.post('/setup-mfa', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.mfaEnabled) {
      throw new ConflictError('MFA is already enabled for this account');
    }

    // Generate MFA secret
    const secret = speakeasy.generateSecret({
      name: `Cybersecurity Platform (${user.email})`,
      issuer: 'Cybersecurity Platform'
    });

    // Save secret to user
    user.mfaSecret = secret.base32;
    await user.save();

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      message: 'MFA setup initiated',
      secret: secret.base32,
      qrCode: qrCodeUrl,
      manualEntryKey: secret.base32
    });
  } catch (error) {
    next(error);
  }
});

// Verify MFA setup
router.post('/verify-mfa', authenticateToken, async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id).select('+mfaSecret');

    if (!user.mfaSecret) {
      throw new ValidationError('MFA setup not initiated');
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: token,
      window: 2
    });

    if (!verified) {
      throw new AuthenticationError('Invalid MFA token');
    }

    // Enable MFA
    user.mfaEnabled = true;
    user.mfaBackupCodes = generateBackupCodes();
    await user.save();

    logger.auditLog('MFA_ENABLED', req.user, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      message: 'MFA enabled successfully',
      backupCodes: user.mfaBackupCodes
    });
  } catch (error) {
    next(error);
  }
});

// Disable MFA
router.post('/disable-mfa', authenticateToken, async (req, res, next) => {
  try {
    const { password, mfaCode } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    // Verify password
    const isPasswordValid = await user.correctPassword(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password');
    }

    // Verify MFA code
    if (user.mfaEnabled) {
      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: mfaCode,
        window: 2
      });

      if (!verified) {
        throw new AuthenticationError('Invalid MFA code');
      }
    }

    // Disable MFA
    user.mfaEnabled = false;
    user.mfaSecret = undefined;
    user.mfaBackupCodes = [];
    await user.save();

    logger.auditLog('MFA_DISABLED', req.user, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'MFA disabled successfully' });
  } catch (error) {
    next(error);
  }
});

// Change password
router.post('/change-password', authenticateToken, validate(userSchemas.changePassword), async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    // Verify current password
    const isCurrentPasswordValid = await user.correctPassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new AuthenticationError('Current password is incorrect');
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new ValidationError('New password does not meet security requirements', passwordValidation.issues);
    }

    // Update password
    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    logger.auditLog('PASSWORD_CHANGED', req.user, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
});

// Forgot password
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent' });
    }

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Send reset email (implement email service)
    // await sendPasswordResetEmail(user.email, resetToken);

    logger.auditLog('PASSWORD_RESET_REQUESTED', { id: user._id, email: user.email }, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'If an account with that email exists, a password reset link has been sent' });
  } catch (error) {
    next(error);
  }
});

// Reset password
router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    // Hash the token to compare with stored hash
    const hashedToken = require('crypto')
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new AuthenticationError('Invalid or expired reset token');
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new ValidationError('Password does not meet security requirements', passwordValidation.issues);
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.mustChangePassword = false;
    await user.save();

    logger.auditLog('PASSWORD_RESET', { id: user._id, email: user.email }, 'user', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department,
        phone: user.phone,
        mfaEnabled: user.mfaEnabled,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        preferences: user.preferences
      }
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to verify MFA code
async function verifyMFACode(user, code) {
  if (!user.mfaSecret) return false;

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token: code,
    window: 2
  });

  return verified;
}

// Helper function to generate backup codes
function generateBackupCodes() {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    codes.push(require('crypto').randomBytes(4).toString('hex').toUpperCase());
  }
  return codes;
}

module.exports = router;