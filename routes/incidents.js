const express = require('express');
const { Incident } = require('../models/Incident');
const { validate, incidentSchemas } = require('../utils/validation');
const { authenticateToken, authorize, auditLog } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');

const router = express.Router();

// Get all incidents
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      severity, 
      priority, 
      category, 
      assignedTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    
    if (status) filter.status = status;
    if (severity) filter.severity = severity;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (assignedTo) filter.assignedTo = assignedTo;
    
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { incidentId: new RegExp(search, 'i') }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const incidents = await Incident.find(filter)
      .populate('reportedBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .populate('affectedUsers', 'firstName lastName email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Incident.countDocuments(filter);

    res.json({
      incidents,
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

// Create new incident
router.post('/', authenticateToken, validate(incidentSchemas.createIncident), async (req, res, next) => {
  try {
    const incidentData = {
      ...req.body,
      reportedBy: req.user.id
    };

    const incident = new Incident(incidentData);
    await incident.save();

    // Populate user data for response
    await incident.populate('reportedBy', 'firstName lastName email');

    logger.auditLog('INCIDENT_CREATED', req.user, 'incident', {
      incidentId: incident.incidentId,
      title: incident.title,
      severity: incident.severity,
      category: incident.category,
      ip: req.ip
    });

    res.status(201).json({
      message: 'Incident created successfully',
      incident: {
        id: incident._id,
        incidentId: incident.incidentId,
        title: incident.title,
        severity: incident.severity,
        priority: incident.priority,
        status: incident.status,
        category: incident.category,
        reportedBy: incident.reportedBy,
        createdAt: incident.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get specific incident
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id)
      .populate('reportedBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .populate('affectedUsers', 'firstName lastName email')
      .populate('timeline.user', 'firstName lastName email')
      .populate('evidence.collectedBy', 'firstName lastName email')
      .populate('containment.implementedBy', 'firstName lastName email')
      .populate('eradication.completedBy', 'firstName lastName email')
      .populate('recovery.completedBy', 'firstName lastName email')
      .populate('resolution.completedBy', 'firstName lastName email')
      .populate('communication.sentBy', 'firstName lastName email');

    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check access permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'security_officer' &&
        incident.reportedBy._id.toString() !== req.user.id &&
        (!incident.assignedTo || incident.assignedTo._id.toString() !== req.user.id)) {
      throw new ValidationError('Access denied to this incident');
    }

    res.json({ incident });
  } catch (error) {
    next(error);
  }
});

// Update incident
router.put('/:id', authenticateToken, validate(incidentSchemas.updateIncident), async (req, res, next) => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id);
    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'security_officer' &&
        incident.reportedBy.toString() !== req.user.id &&
        (!incident.assignedTo || incident.assignedTo.toString() !== req.user.id)) {
      throw new ValidationError('Access denied to modify this incident');
    }

    // Update allowed fields
    const allowedFields = ['title', 'description', 'severity', 'priority', 'status', 'category', 'subcategory', 'affectedSystems', 'affectedUsers', 'initialImpact'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        incident[field] = req.body[field];
      }
    });

    await incident.save();

    logger.auditLog('INCIDENT_UPDATED', req.user, 'incident', {
      incidentId: incident.incidentId,
      updatedFields: Object.keys(req.body),
      ip: req.ip
    });

    res.json({
      message: 'Incident updated successfully',
      incident: {
        id: incident._id,
        incidentId: incident.incidentId,
        title: incident.title,
        status: incident.status
      }
    });
  } catch (error) {
    next(error);
  }
});

// Assign incident
router.post('/:id/assign', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new ValidationError('User ID is required');
    }

    const incident = await Incident.findById(id);
    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'security_officer') {
      throw new ValidationError('Access denied to assign incidents');
    }

    await incident.assign(userId, req.user.id);

    logger.auditLog('INCIDENT_ASSIGNED', req.user, 'incident', {
      incidentId: incident.incidentId,
      assignedTo: userId,
      ip: req.ip
    });

    res.json({
      message: 'Incident assigned successfully',
      assignedTo: userId
    });
  } catch (error) {
    next(error);
  }
});

// Add timeline entry
router.post('/:id/timeline', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { event, description, evidence = [] } = req.body;

    if (!event || !description) {
      throw new ValidationError('Event and description are required');
    }

    const incident = await Incident.findById(id);
    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'security_officer' &&
        incident.reportedBy.toString() !== req.user.id &&
        (!incident.assignedTo || incident.assignedTo.toString() !== req.user.id)) {
      throw new ValidationError('Access denied to modify this incident');
    }

    await incident.addTimelineEntry(event, description, req.user.id, evidence);

    logger.auditLog('TIMELINE_ENTRY_ADDED', req.user, 'incident', {
      incidentId: incident.incidentId,
      event,
      ip: req.ip
    });

    res.json({
      message: 'Timeline entry added successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Add evidence
router.post('/:id/evidence', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const evidenceData = req.body;

    if (!evidenceData.type || !evidenceData.description) {
      throw new ValidationError('Evidence type and description are required');
    }

    const incident = await Incident.findById(id);
    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'security_officer' &&
        incident.reportedBy.toString() !== req.user.id &&
        (!incident.assignedTo || incident.assignedTo.toString() !== req.user.id)) {
      throw new ValidationError('Access denied to modify this incident');
    }

    await incident.addEvidence(evidenceData, req.user.id);

    logger.auditLog('EVIDENCE_ADDED', req.user, 'incident', {
      incidentId: incident.incidentId,
      evidenceType: evidenceData.type,
      ip: req.ip
    });

    res.json({
      message: 'Evidence added successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Implement containment
router.post('/:id/containment', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { measures } = req.body;

    if (!measures || !Array.isArray(measures) || measures.length === 0) {
      throw new ValidationError('Containment measures are required');
    }

    const incident = await Incident.findById(id);
    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'security_officer') {
      throw new ValidationError('Access denied to implement containment');
    }

    await incident.implementContainment(measures, req.user.id);

    logger.auditLog('CONTAINMENT_IMPLEMENTED', req.user, 'incident', {
      incidentId: incident.incidentId,
      measures,
      ip: req.ip
    });

    res.json({
      message: 'Containment implemented successfully',
      measures
    });
  } catch (error) {
    next(error);
  }
});

// Resolve incident
router.post('/:id/resolve', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { summary, rootCause, resolution } = req.body;

    if (!summary || !rootCause || !resolution) {
      throw new ValidationError('Summary, root cause, and resolution are required');
    }

    const incident = await Incident.findById(id);
    if (!incident) {
      throw new NotFoundError('Incident');
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'security_officer') {
      throw new ValidationError('Access denied to resolve incidents');
    }

    await incident.resolve(summary, rootCause, resolution, req.user.id);

    logger.auditLog('INCIDENT_RESOLVED', req.user, 'incident', {
      incidentId: incident.incidentId,
      ip: req.ip
    });

    res.json({
      message: 'Incident resolved successfully',
      resolution: {
        summary,
        rootCause,
        resolution,
        completedAt: incident.resolution.completedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get incident statistics
router.get('/stats/overview', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const totalIncidents = await Incident.countDocuments();
    const openIncidents = await Incident.countDocuments({ status: { $in: ['open', 'investigating', 'contained'] } });
    const resolvedIncidents = await Incident.countDocuments({ status: 'resolved' });
    const closedIncidents = await Incident.countDocuments({ status: 'closed' });

    const incidentsBySeverity = await Incident.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);

    const incidentsByCategory = await Incident.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const incidentsByStatus = await Incident.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const avgResolutionTime = await Incident.aggregate([
      { $match: { status: 'closed', 'resolution.completedAt': { $exists: true } } },
      {
        $project: {
          resolutionTime: {
            $divide: [
              { $subtract: ['$resolution.completedAt', '$createdAt'] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          }
        }
      },
      { $group: { _id: null, avgTime: { $avg: '$resolutionTime' } } }
    ]);

    res.json({
      totalIncidents,
      openIncidents,
      resolvedIncidents,
      closedIncidents,
      incidentsBySeverity,
      incidentsByCategory,
      incidentsByStatus,
      avgResolutionTime: avgResolutionTime[0]?.avgTime || 0
    });
  } catch (error) {
    next(error);
  }
});

// Get incidents requiring attention
router.get('/alerts/attention', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const incidents = await Incident.findRequiringAttention()
      .populate('reportedBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({ incidents });
  } catch (error) {
    next(error);
  }
});

// Get incident dashboard data
router.get('/dashboard', authenticateToken, async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const stats = {
      totalIncidents: await Incident.countDocuments(),
      openIncidents: await Incident.countDocuments({ status: { $in: ['open', 'investigating', 'contained'] } }),
      criticalIncidents: await Incident.countDocuments({ severity: 'critical', status: { $in: ['open', 'investigating', 'contained'] } }),
      recentIncidents: await Incident.countDocuments({ createdAt: { $gte: startDate } }),
      avgResolutionTime: 0, // Calculate based on closed incidents
      topCategories: await Incident.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      slaBreaches: 0 // Calculate based on SLA requirements
    };

    res.json({ stats });
  } catch (error) {
    next(error);
  }
});

module.exports = router;