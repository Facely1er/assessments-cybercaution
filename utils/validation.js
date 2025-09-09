const Joi = require('joi');

// Environment validation
const validateEnvironment = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'SESSION_SECRET',
    'ENCRYPTION_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Validate encryption key length
  if (process.env.ENCRYPTION_KEY && process.env.ENCRYPTION_KEY.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be exactly 32 characters long');
  }
};

// User validation schemas
const userSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    role: Joi.string().valid('admin', 'security_officer', 'user', 'auditor').default('user'),
    department: Joi.string().max(100).optional(),
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mfaCode: Joi.string().length(6).optional()
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    department: Joi.string().max(100).optional(),
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional()
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
  })
};

// Data protection validation schemas
const dataProtectionSchemas = {
  encryptData: Joi.object({
    data: Joi.string().required(),
    classification: Joi.string().valid('public', 'internal', 'confidential', 'restricted').required(),
    retentionPeriod: Joi.number().integer().min(1).max(2555).optional() // days
  }),

  backupData: Joi.object({
    dataId: Joi.string().required(),
    backupType: Joi.string().valid('full', 'incremental', 'differential').required(),
    description: Joi.string().max(500).optional()
  }),

  dlpRule: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    pattern: Joi.string().required(),
    action: Joi.string().valid('block', 'warn', 'log').required(),
    classification: Joi.string().valid('public', 'internal', 'confidential', 'restricted').required(),
    enabled: Joi.boolean().default(true)
  })
};

// Compliance validation schemas
const complianceSchemas = {
  assessment: Joi.object({
    framework: Joi.string().valid('NIST', 'CISA', 'ISO27001', 'SOC2').required(),
    version: Joi.string().required(),
    controls: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        status: Joi.string().valid('implemented', 'partially_implemented', 'not_implemented', 'not_applicable').required(),
        evidence: Joi.string().max(1000).optional(),
        notes: Joi.string().max(500).optional()
      })
    ).min(1).required()
  }),

  policy: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    content: Joi.string().min(50).required(),
    category: Joi.string().valid('security', 'privacy', 'compliance', 'incident_response', 'data_protection').required(),
    version: Joi.string().pattern(/^\d+\.\d+$/).required(),
    effectiveDate: Joi.date().min('now').required(),
    reviewDate: Joi.date().min(Joi.ref('effectiveDate')).required()
  })
};

// Incident response validation schemas
const incidentSchemas = {
  createIncident: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    description: Joi.string().min(20).required(),
    severity: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
    category: Joi.string().valid('malware', 'phishing', 'data_breach', 'insider_threat', 'system_compromise', 'other').required(),
    affectedSystems: Joi.array().items(Joi.string()).optional(),
    initialImpact: Joi.string().max(1000).optional()
  }),

  updateIncident: Joi.object({
    status: Joi.string().valid('open', 'investigating', 'contained', 'resolved', 'closed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high', 'critical').optional(),
    assignedTo: Joi.string().optional(),
    resolution: Joi.string().max(2000).optional(),
    lessonsLearned: Joi.string().max(1000).optional()
  })
};

// Security validation schemas
const securitySchemas = {
  securityHeader: Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required(),
    enabled: Joi.boolean().default(true)
  }),

  rateLimit: Joi.object({
    windowMs: Joi.number().integer().min(1000).max(3600000).required(), // 1 second to 1 hour
    maxRequests: Joi.number().integer().min(1).max(10000).required(),
    skipSuccessfulRequests: Joi.boolean().default(false)
  })
};

// Validation middleware factory
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { 
      abortEarly: false,
      stripUnknown: true 
    });
    
    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));
      
      return res.status(400).json({
        error: 'Validation failed',
        details: errorDetails
      });
    }
    
    req[property] = value;
    next();
  };
};

// Password strength validation
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const issues = [];
  
  if (password.length < minLength) {
    issues.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) {
    issues.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    issues.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    issues.push('Password must contain at least one number');
  }
  if (!hasSpecialChar) {
    issues.push('Password must contain at least one special character');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

module.exports = {
  validateEnvironment,
  userSchemas,
  dataProtectionSchemas,
  complianceSchemas,
  incidentSchemas,
  securitySchemas,
  validate,
  validatePasswordStrength
};