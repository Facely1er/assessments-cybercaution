const mongoose = require('mongoose');

const complianceAssessmentSchema = new mongoose.Schema({
  assessmentId: {
    type: String,
    required: true,
    unique: true,
    default: () => require('crypto').randomUUID()
  },
  framework: {
    type: String,
    required: true,
    enum: ['NIST', 'CISA', 'ISO27001', 'SOC2', 'PCI-DSS', 'HIPAA']
  },
  version: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['draft', 'in_progress', 'completed', 'archived'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organization: {
    name: String,
    industry: String,
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'enterprise']
    }
  },
  scope: {
    description: String,
    systems: [String],
    processes: [String],
    locations: [String]
  },
  controls: [{
    controlId: {
      type: String,
      required: true
    },
    controlName: {
      type: String,
      required: true
    },
    category: String,
    subcategory: String,
    description: String,
    implementationStatus: {
      type: String,
      enum: ['implemented', 'partially_implemented', 'not_implemented', 'not_applicable'],
      default: 'not_implemented'
    },
    evidence: [{
      type: {
        type: String,
        enum: ['document', 'screenshot', 'configuration', 'test_result', 'interview', 'other']
      },
      description: String,
      filePath: String,
      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    notes: String,
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    remediationPlan: String,
    targetDate: Date,
    completedDate: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date
  }],
  findings: [{
    findingId: {
      type: String,
      required: true,
      default: () => require('crypto').randomUUID()
    },
    controlId: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true
    },
    title: {
      type: String,
      required: true,
      maxlength: [200, 'Finding title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: true,
      maxlength: [2000, 'Finding description cannot exceed 2000 characters']
    },
    impact: String,
    recommendation: String,
    remediationStatus: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'accepted_risk'],
      default: 'open'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dueDate: Date,
    resolvedDate: Date,
    evidence: [{
      type: String,
      description: String,
      filePath: String,
      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  metrics: {
    totalControls: Number,
    implementedControls: Number,
    partiallyImplementedControls: Number,
    notImplementedControls: Number,
    notApplicableControls: Number,
    compliancePercentage: Number,
    criticalFindings: Number,
    highFindings: Number,
    mediumFindings: Number,
    lowFindings: Number
  },
  report: {
    executiveSummary: String,
    methodology: String,
    scope: String,
    findings: String,
    recommendations: String,
    conclusion: String,
    generatedAt: Date,
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  tags: [String],
  metadata: {
    lastCalculated: Date,
    version: {
      type: Number,
      default: 1
    },
    parentAssessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplianceAssessment'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for compliance score
complianceAssessmentSchema.virtual('complianceScore').get(function() {
  if (!this.metrics || !this.metrics.totalControls) return 0;
  return Math.round((this.metrics.implementedControls / this.metrics.totalControls) * 100);
});

// Virtual for risk score
complianceAssessmentSchema.virtual('riskScore').get(function() {
  if (!this.metrics) return 0;
  const critical = this.metrics.criticalFindings || 0;
  const high = this.metrics.highFindings || 0;
  const medium = this.metrics.mediumFindings || 0;
  const low = this.metrics.lowFindings || 0;
  
  return (critical * 4) + (high * 3) + (medium * 2) + (low * 1);
});

// Indexes
complianceAssessmentSchema.index({ framework: 1, version: 1 });
complianceAssessmentSchema.index({ status: 1 });
complianceAssessmentSchema.index({ createdBy: 1 });
complianceAssessmentSchema.index({ assignedTo: 1 });
complianceAssessmentSchema.index({ createdAt: -1 });
complianceAssessmentSchema.index({ tags: 1 });

// Pre-save middleware to calculate metrics
complianceAssessmentSchema.pre('save', function(next) {
  if (this.controls && this.controls.length > 0) {
    const metrics = {
      totalControls: this.controls.length,
      implementedControls: this.controls.filter(c => c.implementationStatus === 'implemented').length,
      partiallyImplementedControls: this.controls.filter(c => c.implementationStatus === 'partially_implemented').length,
      notImplementedControls: this.controls.filter(c => c.implementationStatus === 'not_implemented').length,
      notApplicableControls: this.controls.filter(c => c.implementationStatus === 'not_applicable').length,
      criticalFindings: this.findings.filter(f => f.severity === 'critical').length,
      highFindings: this.findings.filter(f => f.severity === 'high').length,
      mediumFindings: this.findings.filter(f => f.severity === 'medium').length,
      lowFindings: this.findings.filter(f => f.severity === 'low').length
    };
    
    metrics.compliancePercentage = Math.round((metrics.implementedControls / metrics.totalControls) * 100);
    this.metrics = metrics;
  }
  
  next();
});

// Instance method to add control
complianceAssessmentSchema.methods.addControl = function(controlData) {
  this.controls.push(controlData);
  return this.save();
};

// Instance method to update control status
complianceAssessmentSchema.methods.updateControlStatus = function(controlId, status, evidence, notes) {
  const control = this.controls.id(controlId);
  if (!control) {
    throw new Error('Control not found');
  }
  
  control.implementationStatus = status;
  if (evidence) {
    control.evidence.push(evidence);
  }
  if (notes) {
    control.notes = notes;
  }
  
  return this.save();
};

// Instance method to add finding
complianceAssessmentSchema.methods.addFinding = function(findingData) {
  this.findings.push(findingData);
  return this.save();
};

// Instance method to update finding status
complianceAssessmentSchema.methods.updateFindingStatus = function(findingId, status, evidence) {
  const finding = this.findings.id(findingId);
  if (!finding) {
    throw new Error('Finding not found');
  }
  
  finding.remediationStatus = status;
  if (evidence) {
    finding.evidence.push(evidence);
  }
  
  if (status === 'resolved') {
    finding.resolvedDate = new Date();
  }
  
  return this.save();
};

// Instance method to generate report
complianceAssessmentSchema.methods.generateReport = function(userId) {
  this.report = {
    executiveSummary: `Compliance assessment for ${this.framework} ${this.version} completed. Overall compliance: ${this.complianceScore}%.`,
    methodology: 'Assessment conducted using industry-standard frameworks and best practices.',
    scope: this.scope.description || 'Assessment scope as defined in the assessment plan.',
    findings: `Total findings: ${this.findings.length}. Critical: ${this.metrics.criticalFindings}, High: ${this.metrics.highFindings}, Medium: ${this.metrics.mediumFindings}, Low: ${this.metrics.lowFindings}.`,
    recommendations: 'Implement recommended controls and remediate identified findings.',
    conclusion: `Assessment completed with ${this.complianceScore}% compliance score.`,
    generatedAt: new Date(),
    generatedBy: userId
  };
  
  return this.save();
};

// Static method to find by framework
complianceAssessmentSchema.statics.findByFramework = function(framework) {
  return this.find({ framework, status: { $ne: 'archived' } });
};

// Static method to find by status
complianceAssessmentSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Static method to find by user
complianceAssessmentSchema.statics.findByUser = function(userId) {
  return this.find({
    $or: [
      { createdBy: userId },
      { assignedTo: userId }
    ]
  });
};

module.exports = mongoose.model('ComplianceAssessment', complianceAssessmentSchema);