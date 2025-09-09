const mongoose = require('mongoose');
const crypto = require('crypto');

const dataProtectionSchema = new mongoose.Schema({
  dataId: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dataType: {
    type: String,
    required: true,
    enum: ['document', 'database_record', 'file', 'api_data', 'log_data']
  },
  classification: {
    type: String,
    required: true,
    enum: ['public', 'internal', 'confidential', 'restricted'],
    default: 'internal'
  },
  encryptedData: {
    type: String,
    required: true
  },
  encryptionKey: {
    type: String,
    required: true,
    select: false // Don't include in queries by default
  },
  encryptionAlgorithm: {
    type: String,
    default: 'aes-256-gcm'
  },
  originalFileName: String,
  originalFileSize: Number,
  originalFileType: String,
  dataHash: {
    type: String,
    required: true
  },
  retentionPeriod: {
    type: Number, // in days
    default: 2555 // 7 years default
  },
  retentionExpiry: {
    type: Date,
    required: true
  },
  accessLog: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    action: {
      type: String,
      enum: ['view', 'download', 'modify', 'delete', 'share']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    ipAddress: String,
    userAgent: String,
    success: {
      type: Boolean,
      default: true
    }
  }],
  sharingPermissions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permissions: [{
      type: String,
      enum: ['read', 'write', 'delete', 'share']
    }],
    grantedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    grantedAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: Date
  }],
  dlpRules: [{
    ruleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DLPRule'
    },
    triggered: {
      type: Boolean,
      default: false
    },
    triggeredAt: Date,
    action: {
      type: String,
      enum: ['block', 'warn', 'log']
    }
  }],
  backupInfo: [{
    backupId: String,
    backupType: {
      type: String,
      enum: ['full', 'incremental', 'differential']
    },
    backupLocation: String,
    backupSize: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }],
  metadata: {
    tags: [String],
    description: String,
    source: String,
    version: {
      type: String,
      default: '1.0'
    }
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  auditTrail: [{
    action: {
      type: String,
      enum: ['created', 'accessed', 'modified', 'shared', 'backed_up', 'deleted', 'restored']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    details: String,
    ipAddress: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for data age
dataProtectionSchema.virtual('dataAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // days
});

// Virtual for retention status
dataProtectionSchema.virtual('retentionStatus').get(function() {
  const daysUntilExpiry = Math.floor((this.retentionExpiry - Date.now()) / (1000 * 60 * 60 * 24));
  if (daysUntilExpiry < 0) return 'expired';
  if (daysUntilExpiry <= 30) return 'expiring_soon';
  return 'active';
});

// Indexes
dataProtectionSchema.index({ userId: 1 });
dataProtectionSchema.index({ classification: 1 });
dataProtectionSchema.index({ dataType: 1 });
dataProtectionSchema.index({ retentionExpiry: 1 });
dataProtectionSchema.index({ isDeleted: 1 });
dataProtectionSchema.index({ createdAt: -1 });

// Pre-save middleware to set retention expiry
dataProtectionSchema.pre('save', function(next) {
  if (this.isNew && !this.retentionExpiry) {
    this.retentionExpiry = new Date(Date.now() + (this.retentionPeriod * 24 * 60 * 60 * 1000));
  }
  next();
});

// Instance method to encrypt data
dataProtectionSchema.methods.encryptData = function(data) {
  const algorithm = this.encryptionAlgorithm || 'aes-256-gcm';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  this.encryptedData = encrypted;
  this.encryptionKey = key.toString('hex');
  
  return { encrypted, key: key.toString('hex') };
};

// Instance method to decrypt data
dataProtectionSchema.methods.decryptData = function() {
  try {
    const algorithm = this.encryptionAlgorithm || 'aes-256-gcm';
    const key = Buffer.from(this.encryptionKey, 'hex');
    
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(this.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    throw new Error('Failed to decrypt data');
  }
};

// Instance method to log access
dataProtectionSchema.methods.logAccess = function(userId, action, ipAddress, userAgent, success = true) {
  this.accessLog.push({
    userId,
    action,
    ipAddress,
    userAgent,
    success,
    timestamp: new Date()
  });
  
  this.auditTrail.push({
    action: 'accessed',
    userId,
    details: `${action} access logged`,
    ipAddress,
    timestamp: new Date()
  });
  
  return this.save();
};

// Instance method to check access permissions
dataProtectionSchema.methods.canAccess = function(userId, action) {
  // Owner can do everything
  if (this.userId.toString() === userId.toString()) {
    return true;
  }
  
  // Check sharing permissions
  const sharingPermission = this.sharingPermissions.find(
    sp => sp.userId.toString() === userId.toString() && 
          (!sp.expiresAt || sp.expiresAt > new Date())
  );
  
  if (!sharingPermission) {
    return false;
  }
  
  return sharingPermission.permissions.includes(action);
};

// Instance method to add backup
dataProtectionSchema.methods.addBackup = function(backupType, backupLocation, backupSize) {
  const backupId = crypto.randomUUID();
  
  this.backupInfo.push({
    backupId,
    backupType,
    backupLocation,
    backupSize,
    status: 'completed'
  });
  
  this.auditTrail.push({
    action: 'backed_up',
    userId: this.userId,
    details: `Backup created: ${backupType}`,
    timestamp: new Date()
  });
  
  return this.save();
};

// Static method to find by classification
dataProtectionSchema.statics.findByClassification = function(classification) {
  return this.find({ classification, isDeleted: false });
};

// Static method to find expiring data
dataProtectionSchema.statics.findExpiring = function(days = 30) {
  const expiryDate = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
  return this.find({
    retentionExpiry: { $lte: expiryDate },
    isDeleted: false
  });
};

// Static method to find by user
dataProtectionSchema.statics.findByUser = function(userId) {
  return this.find({ userId, isDeleted: false });
};

module.exports = mongoose.model('DataProtection', dataProtectionSchema);