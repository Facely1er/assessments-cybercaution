const express = require('express');
const { User } = require('../models/User');
const { validate, userSchemas } = require('../utils/validation');
const { authenticateToken, authorize, auditLog } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { NotFoundError, ValidationError, AuthorizationError } = require('../middleware/errorHandler');

const router = express.Router();

// Get all users (admin and security officers only)
router.get('/', authenticateToken, authorize('admin', 'security_officer'), auditLog('USERS_LISTED', 'user'), async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, department, isActive, search } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (role) filter.role = role;
    if (department) filter.department = new RegExp(department, 'i');
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const users = await User.find(filter)
      .select('-password -mfaSecret -mfaBackupCodes -passwordResetToken -passwordResetExpires -emailVerificationToken')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Users can only view their own profile unless they're admin/security officer
    if (req.user.role !== 'admin' && req.user.role !== 'security_officer' && req.user.id !== id) {
      throw new AuthorizationError('Access denied');
    }

    const user = await User.findById(id)
      .select('-password -mfaSecret -mfaBackupCodes -passwordResetToken -passwordResetExpires -emailVerificationToken');

    if (!user) {
      throw new NotFoundError('User');
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/:id', authenticateToken, validate(userSchemas.updateProfile), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Users can only update their own profile unless they're admin
    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new AuthorizationError('Access denied');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Update user fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        user[key] = req.body[key];
      }
    });

    await user.save();

    logger.auditLog('USER_UPDATED', req.user, 'user', {
      targetUserId: id,
      updatedFields: Object.keys(req.body),
      ip: req.ip
    });

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department,
        phone: user.phone,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update user role (admin only)
router.patch('/:id/role', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'security_officer', 'user', 'auditor'].includes(role)) {
      throw new ValidationError('Invalid role');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    logger.auditLog('USER_ROLE_CHANGED', req.user, 'user', {
      targetUserId: id,
      oldRole,
      newRole: role,
      ip: req.ip
    });

    res.json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// Activate/Deactivate user (admin only)
router.patch('/:id/status', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive, reason } = req.body;

    if (typeof isActive !== 'boolean') {
      throw new ValidationError('isActive must be a boolean');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    const oldStatus = user.isActive;
    user.isActive = isActive;
    
    if (!isActive) {
      user.accountLocked = true;
      user.accountLockedReason = reason || 'Account deactivated by administrator';
      user.accountLockedAt = new Date();
    } else {
      user.accountLocked = false;
      user.accountLockedReason = undefined;
      user.accountLockedAt = undefined;
    }

    await user.save();

    logger.auditLog('USER_STATUS_CHANGED', req.user, 'user', {
      targetUserId: id,
      oldStatus,
      newStatus: isActive,
      reason,
      ip: req.ip
    });

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        email: user.email,
        isActive: user.isActive,
        accountLocked: user.accountLocked
      }
    });
  } catch (error) {
    next(error);
  }
});

// Reset user password (admin only)
router.post('/:id/reset-password', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword, mustChangePassword = true } = req.body;

    if (!newPassword) {
      throw new ValidationError('New password is required');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Validate password strength
    const { validatePasswordStrength } = require('../utils/validation');
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new ValidationError('Password does not meet security requirements', passwordValidation.issues);
    }

    user.password = newPassword;
    user.mustChangePassword = mustChangePassword;
    user.passwordChangedAt = new Date();
    await user.save();

    logger.auditLog('USER_PASSWORD_RESET', req.user, 'user', {
      targetUserId: id,
      mustChangePassword,
      ip: req.ip
    });

    res.json({
      message: 'Password reset successfully',
      mustChangePassword
    });
  } catch (error) {
    next(error);
  }
});

// Unlock user account (admin only)
router.post('/:id/unlock', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    user.accountLocked = false;
    user.accountLockedReason = undefined;
    user.accountLockedAt = undefined;
    user.lockUntil = undefined;
    user.loginAttempts = 0;
    await user.save();

    logger.auditLog('USER_ACCOUNT_UNLOCKED', req.user, 'user', {
      targetUserId: id,
      ip: req.ip
    });

    res.json({
      message: 'Account unlocked successfully',
      user: {
        id: user._id,
        email: user.email,
        accountLocked: user.accountLocked
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user activity log
router.get('/:id/activity', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Users can only view their own activity unless they're admin/security officer
    if (req.user.role !== 'admin' && req.user.role !== 'security_officer' && req.user.id !== id) {
      throw new AuthorizationError('Access denied');
    }

    const { page = 1, limit = 20, action, startDate, endDate } = req.query;

    // Build date filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    // This would typically query an audit log collection
    // For now, return a placeholder response
    res.json({
      activities: [],
      pagination: {
        current: parseInt(page),
        pages: 0,
        total: 0
      }
    });
  } catch (error) {
    next(error);
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user.id === id) {
      throw new ValidationError('Cannot delete your own account');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Soft delete - mark as deleted instead of actually deleting
    user.isActive = false;
    user.accountLocked = true;
    user.accountLockedReason = 'Account deleted by administrator';
    user.accountLockedAt = new Date();
    await user.save();

    logger.auditLog('USER_DELETED', req.user, 'user', {
      targetUserId: id,
      targetUserEmail: user.email,
      ip: req.ip
    });

    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user statistics (admin and security officers only)
router.get('/stats/overview', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const lockedUsers = await User.countDocuments({ accountLocked: true });
    const mfaEnabledUsers = await User.countDocuments({ mfaEnabled: true });

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });

    res.json({
      totalUsers,
      activeUsers,
      lockedUsers,
      mfaEnabledUsers,
      usersByRole,
      recentRegistrations
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;