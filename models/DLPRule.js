const mongoose = require('mongoose');

const dlpRuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Rule name is required'],
    trim: true,
    maxlength: [100, 'Rule name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  pattern: {
    type: String,
    required: [true, 'Pattern is required'],
    trim: true
  },
  patternType: {
    type: String,
    enum: ['regex', 'keyword', 'credit_card', 'ssn', 'email', 'phone', 'custom'],
    default: 'regex'
  },
  action: {
    type: String,
    enum: ['block', 'warn', 'log'],
    required: [true, 'Action is required']
  },
  classification: {
    type: String,
    enum: ['public', 'internal', 'confidential', 'restricted'],
    required: [true, 'Classification is required']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  enabled: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  scope: {
    type: String,
    enum: ['global', 'department', 'user', 'data_type'],
    default: 'global'
  },
  scopeValue: String, // Department name, user ID, or data type
  conditions: [{
    field: String,
    operator: {
      type: String,
      enum: ['equals', 'not_equals', 'contains', 'not_contains', 'regex', 'greater_than', 'less_than']
    },
    value: String
  }],
  exceptions: [{
    field: String,
    operator: {
      type: String,
      enum: ['equals', 'not_equals', 'contains', 'not_contains', 'regex']
    },
    value: String
  }],
  notificationSettings: {
    email: {
      enabled: {
        type: Boolean,
        default: true
      },
      recipients: [String] // Email addresses
    },
    webhook: {
      enabled: {
        type: Boolean,
      default: false
      },
      url: String,
      headers: mongoose.Schema.Types.Mixed
    }
  },
  statistics: {
    totalMatches: {
      type: Number,
      default: 0
    },
    blockedCount: {
      type: Number,
      default: 0
    },
    warnedCount: {
      type: Number,
      default: 0
    },
    loggedCount: {
      type: Number,
      default: 0
    },
    lastTriggered: Date
  },
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  metadata: {
    source: String,
    reference: String,
    compliance: [String] // NIST, CISA, etc.
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for rule effectiveness
dlpRuleSchema.virtual('effectiveness').get(function() {
  const total = this.statistics.totalMatches;
  if (total === 0) return 0;
  
  const blocked = this.statistics.blockedCount;
  return Math.round((blocked / total) * 100);
});

// Virtual for rule activity
dlpRuleSchema.virtual('isRecentlyActive').get(function() {
  if (!this.statistics.lastTriggered) return false;
  const daysSinceLastTrigger = (Date.now() - this.statistics.lastTriggered) / (1000 * 60 * 60 * 24);
  return daysSinceLastTrigger <= 7; // Active if triggered within last 7 days
});

// Indexes
dlpRuleSchema.index({ enabled: 1, isActive: 1 });
dlpRuleSchema.index({ classification: 1 });
dlpRuleSchema.index({ severity: 1 });
dlpRuleSchema.index({ scope: 1, scopeValue: 1 });
dlpRuleSchema.index({ createdBy: 1 });
dlpRuleSchema.index({ 'statistics.lastTriggered': -1 });
dlpRuleSchema.index({ tags: 1 });

// Pre-save middleware to update version
dlpRuleSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.version += 1;
    this.lastModifiedBy = this.createdBy; // This should be set by the controller
  }
  next();
});

// Instance method to test pattern
dlpRuleSchema.methods.testPattern = function(testData) {
  try {
    switch (this.patternType) {
      case 'regex':
        const regex = new RegExp(this.pattern, 'gi');
        return regex.test(testData);
      
      case 'keyword':
        return testData.toLowerCase().includes(this.pattern.toLowerCase());
      
      case 'credit_card':
        const ccRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b/;
        return ccRegex.test(testData);
      
      case 'ssn':
        const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/;
        return ssnRegex.test(testData);
      
      case 'email':
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        return emailRegex.test(testData);
      
      case 'phone':
        const phoneRegex = /\b(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/;
        return phoneRegex.test(testData);
      
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};

// Instance method to check conditions
dlpRuleSchema.methods.checkConditions = function(data) {
  if (!this.conditions || this.conditions.length === 0) {
    return true;
  }
  
  return this.conditions.every(condition => {
    const fieldValue = this.getFieldValue(data, condition.field);
    return this.evaluateCondition(fieldValue, condition.operator, condition.value);
  });
};

// Instance method to check exceptions
dlpRuleSchema.methods.checkExceptions = function(data) {
  if (!this.exceptions || this.exceptions.length === 0) {
    return false;
  }
  
  return this.exceptions.some(exception => {
    const fieldValue = this.getFieldValue(data, exception.field);
    return this.evaluateCondition(fieldValue, exception.operator, exception.value);
  });
};

// Helper method to get field value from data object
dlpRuleSchema.methods.getFieldValue = function(data, field) {
  const keys = field.split('.');
  let value = data;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
};

// Helper method to evaluate condition
dlpRuleSchema.methods.evaluateCondition = function(fieldValue, operator, expectedValue) {
  if (fieldValue === undefined) return false;
  
  const fieldStr = String(fieldValue).toLowerCase();
  const expectedStr = String(expectedValue).toLowerCase();
  
  switch (operator) {
    case 'equals':
      return fieldStr === expectedStr;
    case 'not_equals':
      return fieldStr !== expectedStr;
    case 'contains':
      return fieldStr.includes(expectedStr);
    case 'not_contains':
      return !fieldStr.includes(expectedStr);
    case 'regex':
      try {
        const regex = new RegExp(expectedValue, 'i');
        return regex.test(fieldStr);
      } catch {
        return false;
      }
    case 'greater_than':
      return Number(fieldValue) > Number(expectedValue);
    case 'less_than':
      return Number(fieldValue) < Number(expectedValue);
    default:
      return false;
  }
};

// Instance method to increment statistics
dlpRuleSchema.methods.incrementStats = function(action) {
  this.statistics.totalMatches += 1;
  this.statistics.lastTriggered = new Date();
  
  switch (action) {
    case 'block':
      this.statistics.blockedCount += 1;
      break;
    case 'warn':
      this.statistics.warnedCount += 1;
      break;
    case 'log':
      this.statistics.loggedCount += 1;
      break;
  }
  
  return this.save();
};

// Instance method to reset statistics
dlpRuleSchema.methods.resetStats = function() {
  this.statistics = {
    totalMatches: 0,
    blockedCount: 0,
    warnedCount: 0,
    loggedCount: 0,
    lastTriggered: null
  };
  
  return this.save();
};

// Static method to find active rules
dlpRuleSchema.statics.findActive = function() {
  return this.find({ enabled: true, isActive: true });
};

// Static method to find by classification
dlpRuleSchema.statics.findByClassification = function(classification) {
  return this.find({ classification, enabled: true, isActive: true });
};

// Static method to find by scope
dlpRuleSchema.statics.findByScope = function(scope, scopeValue) {
  return this.find({ 
    scope, 
    scopeValue, 
    enabled: true, 
    isActive: true 
  });
};

// Static method to find most triggered rules
dlpRuleSchema.statics.findMostTriggered = function(limit = 10) {
  return this.find({ enabled: true, isActive: true })
    .sort({ 'statistics.totalMatches': -1 })
    .limit(limit);
};

module.exports = mongoose.model('DLPRule', dlpRuleSchema);