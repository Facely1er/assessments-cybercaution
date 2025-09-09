const express = require('express');
const { ComplianceAssessment } = require('../models/Compliance');
const { validate, complianceSchemas } = require('../utils/validation');
const { authenticateToken, authorize, auditLog } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');

const router = express.Router();

// Get all compliance assessments
router.get('/assessments', authenticateToken, authorize('admin', 'security_officer', 'auditor'), async (req, res, next) => {
  try {
    const { page = 1, limit = 10, framework, status, search } = req.query;
    
    const filter = {};
    if (framework) filter.framework = framework;
    if (status) filter.status = status;
    
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { 'organization.name': new RegExp(search, 'i') }
      ];
    }

    const assessments = await ComplianceAssessment.find(filter)
      .populate('createdBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ComplianceAssessment.countDocuments(filter);

    res.json({
      assessments,
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

// Create new compliance assessment
router.post('/assessments', authenticateToken, authorize('admin', 'security_officer'), validate(complianceSchemas.assessment), async (req, res, next) => {
  try {
    const assessmentData = {
      ...req.body,
      createdBy: req.user.id
    };

    const assessment = new ComplianceAssessment(assessmentData);
    await assessment.save();

    logger.auditLog('COMPLIANCE_ASSESSMENT_CREATED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      framework: assessment.framework,
      version: assessment.version,
      ip: req.ip
    });

    res.status(201).json({
      message: 'Compliance assessment created successfully',
      assessment: {
        id: assessment._id,
        assessmentId: assessment.assessmentId,
        framework: assessment.framework,
        version: assessment.version,
        title: assessment.title,
        status: assessment.status
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get specific assessment
router.get('/assessments/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const assessment = await ComplianceAssessment.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .populate('controls.evidence.uploadedBy', 'firstName lastName email')
      .populate('findings.assignedTo', 'firstName lastName email')
      .populate('findings.evidence.uploadedBy', 'firstName lastName email');

    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check access permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'security_officer' && 
        assessment.createdBy._id.toString() !== req.user.id &&
        !assessment.assignedTo.some(user => user._id.toString() === req.user.id)) {
      throw new ValidationError('Access denied to this assessment');
    }

    res.json({ assessment });
  } catch (error) {
    next(error);
  }
});

// Update assessment
router.put('/assessments/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const assessment = await ComplianceAssessment.findById(id);
    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        assessment.createdBy.toString() !== req.user.id) {
      throw new ValidationError('Access denied to modify this assessment');
    }

    // Update allowed fields
    const allowedFields = ['title', 'description', 'status', 'assignedTo', 'scope', 'organization'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        assessment[field] = req.body[field];
      }
    });

    await assessment.save();

    logger.auditLog('COMPLIANCE_ASSESSMENT_UPDATED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      updatedFields: Object.keys(req.body),
      ip: req.ip
    });

    res.json({
      message: 'Assessment updated successfully',
      assessment: {
        id: assessment._id,
        assessmentId: assessment.assessmentId,
        title: assessment.title,
        status: assessment.status
      }
    });
  } catch (error) {
    next(error);
  }
});

// Add control to assessment
router.post('/assessments/:id/controls', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const controlData = req.body;

    const assessment = await ComplianceAssessment.findById(id);
    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        assessment.createdBy.toString() !== req.user.id) {
      throw new ValidationError('Access denied to modify this assessment');
    }

    await assessment.addControl(controlData);

    logger.auditLog('CONTROL_ADDED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      controlId: controlData.controlId,
      controlName: controlData.controlName,
      ip: req.ip
    });

    res.json({
      message: 'Control added successfully',
      control: {
        controlId: controlData.controlId,
        controlName: controlData.controlName,
        implementationStatus: controlData.implementationStatus
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update control status
router.patch('/assessments/:id/controls/:controlId', authenticateToken, async (req, res, next) => {
  try {
    const { id, controlId } = req.params;
    const { status, evidence, notes } = req.body;

    const assessment = await ComplianceAssessment.findById(id);
    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        assessment.createdBy.toString() !== req.user.id &&
        !assessment.assignedTo.includes(req.user.id)) {
      throw new ValidationError('Access denied to modify this assessment');
    }

    await assessment.updateControlStatus(controlId, status, evidence, notes);

    logger.auditLog('CONTROL_STATUS_UPDATED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      controlId,
      status,
      ip: req.ip
    });

    res.json({
      message: 'Control status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Add finding to assessment
router.post('/assessments/:id/findings', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const findingData = req.body;

    const assessment = await ComplianceAssessment.findById(id);
    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        assessment.createdBy.toString() !== req.user.id) {
      throw new ValidationError('Access denied to modify this assessment');
    }

    await assessment.addFinding(findingData);

    logger.auditLog('FINDING_ADDED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      findingId: findingData.findingId,
      severity: findingData.severity,
      ip: req.ip
    });

    res.json({
      message: 'Finding added successfully',
      finding: {
        findingId: findingData.findingId,
        title: findingData.title,
        severity: findingData.severity
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update finding status
router.patch('/assessments/:id/findings/:findingId', authenticateToken, async (req, res, next) => {
  try {
    const { id, findingId } = req.params;
    const { status, evidence } = req.body;

    const assessment = await ComplianceAssessment.findById(id);
    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        assessment.createdBy.toString() !== req.user.id &&
        !assessment.assignedTo.includes(req.user.id)) {
      throw new ValidationError('Access denied to modify this assessment');
    }

    await assessment.updateFindingStatus(findingId, status, evidence);

    logger.auditLog('FINDING_STATUS_UPDATED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      findingId,
      status,
      ip: req.ip
    });

    res.json({
      message: 'Finding status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Generate assessment report
router.post('/assessments/:id/report', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const assessment = await ComplianceAssessment.findById(id);
    if (!assessment) {
      throw new NotFoundError('Compliance assessment');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        assessment.createdBy.toString() !== req.user.id) {
      throw new ValidationError('Access denied to generate report for this assessment');
    }

    await assessment.generateReport(req.user.id);

    logger.auditLog('ASSESSMENT_REPORT_GENERATED', req.user, 'compliance_assessment', {
      assessmentId: assessment.assessmentId,
      ip: req.ip
    });

    res.json({
      message: 'Assessment report generated successfully',
      report: assessment.report
    });
  } catch (error) {
    next(error);
  }
});

// Get compliance statistics
router.get('/stats/overview', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const totalAssessments = await ComplianceAssessment.countDocuments();
    const activeAssessments = await ComplianceAssessment.countDocuments({ status: 'in_progress' });
    const completedAssessments = await ComplianceAssessment.countDocuments({ status: 'completed' });

    const assessmentsByFramework = await ComplianceAssessment.aggregate([
      { $group: { _id: '$framework', count: { $sum: 1 } } }
    ]);

    const averageComplianceScore = await ComplianceAssessment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, avgScore: { $avg: '$metrics.compliancePercentage' } } }
    ]);

    const criticalFindings = await ComplianceAssessment.aggregate([
      { $unwind: '$findings' },
      { $match: { 'findings.severity': 'critical', 'findings.remediationStatus': { $ne: 'resolved' } } },
      { $count: 'total' }
    ]);

    res.json({
      totalAssessments,
      activeAssessments,
      completedAssessments,
      assessmentsByFramework,
      averageComplianceScore: averageComplianceScore[0]?.avgScore || 0,
      criticalFindings: criticalFindings[0]?.total || 0
    });
  } catch (error) {
    next(error);
  }
});

// Get NIST framework controls
router.get('/frameworks/nist/controls', authenticateToken, async (req, res, next) => {
  try {
    // This would typically come from a database or external API
    // For now, return a sample of NIST controls
    const nistControls = [
      {
        id: 'AC-1',
        name: 'Access Control Policy and Procedures',
        category: 'Access Control',
        description: 'The organization develops, documents, and disseminates access control policy and procedures.'
      },
      {
        id: 'AC-2',
        name: 'Account Management',
        category: 'Access Control',
        description: 'The organization manages information system accounts.'
      },
      {
        id: 'AC-3',
        name: 'Access Enforcement',
        category: 'Access Control',
        description: 'The information system enforces approved authorizations for logical access.'
      },
      {
        id: 'AC-4',
        name: 'Information Flow Enforcement',
        category: 'Access Control',
        description: 'The information system enforces approved authorizations for controlling the flow of information.'
      },
      {
        id: 'AC-5',
        name: 'Separation of Duties',
        category: 'Access Control',
        description: 'The organization separates duties of individuals as necessary.'
      }
    ];

    res.json({ controls: nistControls });
  } catch (error) {
    next(error);
  }
});

// Get CISA CPG controls
router.get('/frameworks/cisa/controls', authenticateToken, async (req, res, next) => {
  try {
    // This would typically come from a database or external API
    // For now, return a sample of CISA CPG controls
    const cisaControls = [
      {
        id: 'CPG-1',
        name: 'Account Security',
        category: 'Identity and Access Management',
        description: 'Implement account security controls to prevent unauthorized access.'
      },
      {
        id: 'CPG-2',
        name: 'Device Security',
        category: 'Device Management',
        description: 'Implement device security controls to protect endpoints.'
      },
      {
        id: 'CPG-3',
        name: 'Data Security',
        category: 'Data Protection',
        description: 'Implement data security controls to protect sensitive information.'
      },
      {
        id: 'CPG-4',
        name: 'Network Security',
        category: 'Network Protection',
        description: 'Implement network security controls to protect network infrastructure.'
      },
      {
        id: 'CPG-5',
        name: 'Incident Response',
        category: 'Response and Recovery',
        description: 'Implement incident response capabilities to detect and respond to security incidents.'
      }
    ];

    res.json({ controls: cisaControls });
  } catch (error) {
    next(error);
  }
});

module.exports = router;