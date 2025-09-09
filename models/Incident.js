const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  incidentId: {
    type: String,
    required: true,
    unique: true,
    default: () => require('crypto').randomUUID()
  },
  title: {
    type: String,
    required: [true, 'Incident title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Incident description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: [true, 'Severity is required'],
    default: 'medium'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: [true, 'Priority is required'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'investigating', 'contained', 'resolved', 'closed'],
    default: 'open'
  },
  category: {
    type: String,
    enum: ['malware', 'phishing', 'data_breach', 'insider_threat', 'system_compromise', 'ddos', 'unauthorized_access', 'other'],
    required: [true, 'Category is required']
  },
  subcategory: String,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  affectedSystems: [{
    name: String,
    type: {
      type: String,
      enum: ['server', 'workstation', 'network', 'application', 'database', 'other']
    },
    ipAddress: String,
    status: {
      type: String,
      enum: ['operational', 'degraded', 'down', 'unknown'],
      default: 'unknown'
    }
  }],
  affectedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  initialImpact: {
    type: String,
    maxlength: [1000, 'Initial impact description cannot exceed 1000 characters']
  },
  businessImpact: {
    financial: {
      estimatedCost: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    operational: {
      affectedServices: [String],
      downtime: Number, // in minutes
      dataLoss: Boolean
    },
    reputation: {
      publicDisclosure: Boolean,
      mediaCoverage: Boolean,
      customerImpact: String
    }
  },
  timeline: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    event: {
      type: String,
      required: true
    },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    evidence: [{
      type: String,
      description: String,
      filePath: String
    }]
  }],
  evidence: [{
    type: {
      type: String,
      enum: ['log', 'screenshot', 'file', 'network_capture', 'memory_dump', 'other']
    },
    description: String,
    filePath: String,
    hash: String,
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    collectedAt: {
      type: Date,
      default: Date.now
    }
  }],
  containment: {
    measures: [String],
    implementedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    implementedAt: Date,
    effectiveness: {
      type: String,
      enum: ['effective', 'partially_effective', 'ineffective', 'unknown']
    }
  },
  eradication: {
    steps: [String],
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: Date,
    verification: String
  },
  recovery: {
    steps: [String],
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: Date,
    testing: String,
    monitoring: String
  },
  resolution: {
    summary: String,
    rootCause: String,
    resolution: String,
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: Date
  },
  lessonsLearned: {
    whatWentWell: [String],
    whatWentWrong: [String],
    improvements: [String],
    recommendations: [String]
  },
  communication: [{
    type: {
      type: String,
      enum: ['internal', 'external', 'regulatory', 'media', 'customer']
    },
    audience: String,
    message: String,
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'delivered', 'failed'],
      default: 'draft'
    }
  }],
  stakeholders: [{
    name: String,
    role: String,
    organization: String,
    contactInfo: String,
    involvement: String
  }],
  regulatory: {
    reportable: Boolean,
    reportedTo: [String],
    reportDeadline: Date,
    reportSubmitted: Boolean,
    reportSubmittedAt: Date
  },
  tags: [String],
  metadata: {
    source: String,
    confidence: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    falsePositive: {
      type: Boolean,
      default: false
    },
    relatedIncidents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident'
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for incident duration
incidentSchema.virtual('duration').get(function() {
  if (this.status === 'closed' && this.resolution?.completedAt) {
    return Math.floor((this.resolution.completedAt - this.createdAt) / (1000 * 60 * 60 * 24)); // days
  }
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // days
});

// Virtual for incident age
incidentSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60)); // hours
});

// Virtual for SLA status
incidentSchema.virtual('slaStatus').get(function() {
  const slaHours = {
    critical: 4,
    high: 8,
    medium: 24,
    low: 72
  };
  
  const expectedResolution = slaHours[this.priority] || 72;
  const ageInHours = this.age;
  
  if (this.status === 'closed') return 'met';
  if (ageInHours > expectedResolution) return 'breached';
  if (ageInHours > expectedResolution * 0.8) return 'at_risk';
  return 'on_track';
});

// Indexes
incidentSchema.index({ incidentId: 1 });
incidentSchema.index({ status: 1 });
incidentSchema.index({ severity: 1, priority: 1 });
incidentSchema.index({ category: 1 });
incidentSchema.index({ reportedBy: 1 });
incidentSchema.index({ assignedTo: 1 });
incidentSchema.index({ createdAt: -1 });
incidentSchema.index({ tags: 1 });

// Pre-save middleware to add timeline entry
incidentSchema.pre('save', function(next) {
  if (this.isNew) {
    this.timeline.push({
      event: 'Incident created',
      description: `Incident ${this.incidentId} created by ${this.reportedBy}`,
      user: this.reportedBy
    });
  }
  next();
});

// Instance method to add timeline entry
incidentSchema.methods.addTimelineEntry = function(event, description, userId, evidence = []) {
  this.timeline.push({
    event,
    description,
    user: userId,
    evidence,
    timestamp: new Date()
  });
  
  return this.save();
};

// Instance method to update status
incidentSchema.methods.updateStatus = function(newStatus, userId, notes = '') {
  const oldStatus = this.status;
  this.status = newStatus;
  
  this.addTimelineEntry(
    `Status changed from ${oldStatus} to ${newStatus}`,
    notes,
    userId
  );
  
  return this.save();
};

// Instance method to assign incident
incidentSchema.methods.assign = function(userId, assignedBy) {
  this.assignedTo = userId;
  
  this.addTimelineEntry(
    'Incident assigned',
    `Assigned to user ${userId}`,
    assignedBy
  );
  
  return this.save();
};

// Instance method to add evidence
incidentSchema.methods.addEvidence = function(evidenceData, userId) {
  this.evidence.push({
    ...evidenceData,
    collectedBy: userId,
    collectedAt: new Date()
  });
  
  this.addTimelineEntry(
    'Evidence collected',
    `Evidence added: ${evidenceData.description || evidenceData.type}`,
    userId
  );
  
  return this.save();
};

// Instance method to implement containment
incidentSchema.methods.implementContainment = function(measures, userId) {
  this.containment = {
    measures,
    implementedBy: userId,
    implementedAt: new Date()
  };
  
  this.addTimelineEntry(
    'Containment implemented',
    `Containment measures: ${measures.join(', ')}`,
    userId
  );
  
  return this.save();
};

// Instance method to resolve incident
incidentSchema.methods.resolve = function(summary, rootCause, resolution, userId) {
  this.resolution = {
    summary,
    rootCause,
    resolution,
    completedBy: userId,
    completedAt: new Date()
  };
  
  this.status = 'resolved';
  
  this.addTimelineEntry(
    'Incident resolved',
    `Resolution: ${summary}`,
    userId
  );
  
  return this.save();
};

// Static method to find by status
incidentSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Static method to find by severity
incidentSchema.statics.findBySeverity = function(severity) {
  return this.find({ severity });
};

// Static method to find by category
incidentSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

// Static method to find by assigned user
incidentSchema.statics.findByAssignedUser = function(userId) {
  return this.find({ assignedTo: userId });
};

// Static method to find open incidents
incidentSchema.statics.findOpen = function() {
  return this.find({ status: { $in: ['open', 'investigating', 'contained'] } });
};

// Static method to find incidents requiring attention
incidentSchema.statics.findRequiringAttention = function() {
  return this.find({
    status: { $in: ['open', 'investigating'] },
    $or: [
      { severity: 'critical' },
      { priority: 'critical' },
      { createdAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } // Older than 24 hours
    ]
  });
};

module.exports = mongoose.model('Incident', incidentSchema);