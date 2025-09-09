const jwt = require('jsonwebtoken');
const { AuthenticationError, AuthorizationError } = require('./errorHandler');
const { logger } = require('../utils/logger');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AuthenticationError('Access token required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    if (!user.isActive) {
      throw new AuthenticationError('Account is deactivated');
    }

    // Check if user needs to change password
    if (user.mustChangePassword) {
      return res.status(403).json({
        error: 'Password change required',
        mustChangePassword: true
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AuthenticationError('Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AuthenticationError('Token expired'));
    } else {
      next(error);
    }
  }
};

// Check user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthenticationError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      logger.securityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles,
        path: req.originalUrl,
        method: req.method
      });
      
      return next(new AuthorizationError('Insufficient permissions'));
    }

    next();
  };
};

// Check if user can access resource
const authorizeResource = (resourceType) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AuthenticationError('Authentication required'));
      }

      const resourceId = req.params.id;
      const userId = req.user.id;

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      // Security officers can access most resources
      if (req.user.role === 'security_officer' && 
          ['incident', 'compliance', 'audit'].includes(resourceType)) {
        return next();
      }

      // Users can only access their own resources
      if (resourceType === 'user' && resourceId === userId) {
        return next();
      }

      // Check if user owns the resource
      const resource = await getResourceById(resourceType, resourceId);
      if (resource && resource.userId === userId) {
        return next();
      }

      logger.securityEvent('UNAUTHORIZED_RESOURCE_ACCESS', {
        userId,
        resourceType,
        resourceId,
        path: req.originalUrl,
        method: req.method
      });

      next(new AuthorizationError('Access denied to this resource'));
    } catch (error) {
      next(error);
    }
  };
};

// Helper function to get resource by ID
const getResourceById = async (resourceType, resourceId) => {
  const models = {
    user: User,
    // Add other models as needed
  };

  const Model = models[resourceType];
  if (!Model) {
    return null;
  }

  return await Model.findById(resourceId);
};

// MFA verification middleware
const verifyMFA = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new AuthenticationError('Authentication required'));
    }

    // Skip MFA if not enabled for user
    if (!req.user.mfaEnabled) {
      return next();
    }

    const { mfaCode } = req.body;
    if (!mfaCode) {
      return res.status(400).json({
        error: 'MFA code required',
        mfaRequired: true
      });
    }

    // Verify MFA code (implement based on your MFA method)
    const isValid = await verifyMFACode(req.user, mfaCode);
    if (!isValid) {
      logger.securityEvent('INVALID_MFA_ATTEMPT', {
        userId: req.user.id,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      return res.status(401).json({
        error: 'Invalid MFA code',
        mfaRequired: true
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Verify MFA code (placeholder - implement based on your MFA method)
const verifyMFACode = async (user, code) => {
  // This is a placeholder implementation
  // In a real application, you would verify against TOTP, SMS, etc.
  return code === '123456'; // Remove this in production
};

// Session validation
const validateSession = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return next(new AuthenticationError('Session expired'));
  }

  if (req.session.userId !== req.user?.id) {
    logger.securityEvent('SESSION_MISMATCH', {
      sessionUserId: req.session.userId,
      tokenUserId: req.user?.id,
      ip: req.ip
    });
    
    return next(new AuthenticationError('Session validation failed'));
  }

  next();
};

// Audit logging middleware
const auditLog = (action, resource) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log the action after response is sent
      logger.auditLog(action, req.user, resource, {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = {
  authenticateToken,
  authorize,
  authorizeResource,
  verifyMFA,
  validateSession,
  auditLog
};