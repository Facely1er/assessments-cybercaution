const express = require('express');
const crypto = require('crypto');
const { DataProtection } = require('../models/DataProtection');
const { DLPRule } = require('../models/DLPRule');
const { validate, dataProtectionSchemas } = require('../utils/validation');
const { authenticateToken, authorize, auditLog } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { NotFoundError, ValidationError, SecurityError } = require('../middleware/errorHandler');

const router = express.Router();

// Encrypt and store data
router.post('/encrypt', authenticateToken, validate(dataProtectionSchemas.encryptData), async (req, res, next) => {
  try {
    const { data, classification, retentionPeriod } = req.body;
    const userId = req.user.id;

    // Generate data hash for integrity checking
    const dataHash = crypto.createHash('sha256').update(data).digest('hex');

    // Check for existing data with same hash
    const existingData = await DataProtection.findOne({ 
      dataHash, 
      userId, 
      isDeleted: false 
    });

    if (existingData) {
      return res.status(409).json({
        error: 'Data with identical content already exists',
        dataId: existingData.dataId
      });
    }

    // Create new data protection record
    const dataProtection = new DataProtection({
      userId,
      dataType: 'document', // Default type
      classification,
      retentionPeriod: retentionPeriod || 2555, // 7 years default
      dataHash
    });

    // Encrypt the data
    const { encrypted, key } = dataProtection.encryptData(data);
    dataProtection.encryptedData = encrypted;
    dataProtection.encryptionKey = key;

    await dataProtection.save();

    // Log data encryption
    logger.auditLog('DATA_ENCRYPTED', req.user, 'data_protection', {
      dataId: dataProtection.dataId,
      classification,
      retentionPeriod: dataProtection.retentionPeriod,
      ip: req.ip
    });

    res.status(201).json({
      message: 'Data encrypted and stored successfully',
      dataId: dataProtection.dataId,
      classification: dataProtection.classification,
      retentionExpiry: dataProtection.retentionExpiry
    });
  } catch (error) {
    next(error);
  }
});

// Decrypt and retrieve data
router.get('/:dataId', authenticateToken, async (req, res, next) => {
  try {
    const { dataId } = req.params;
    const userId = req.user.id;

    const dataProtection = await DataProtection.findOne({ 
      dataId, 
      isDeleted: false 
    });

    if (!dataProtection) {
      throw new NotFoundError('Data');
    }

    // Check access permissions
    if (!dataProtection.canAccess(userId, 'read')) {
      logger.securityEvent('UNAUTHORIZED_DATA_ACCESS', {
        userId,
        dataId,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      throw new SecurityError('Access denied to this data');
    }

    // Decrypt data
    const decryptedData = dataProtection.decryptData();

    // Log access
    await dataProtection.logAccess(userId, 'view', req.ip, req.get('User-Agent'));

    res.json({
      dataId: dataProtection.dataId,
      data: decryptedData,
      classification: dataProtection.classification,
      createdAt: dataProtection.createdAt,
      retentionExpiry: dataProtection.retentionExpiry
    });
  } catch (error) {
    next(error);
  }
});

// List user's data
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, classification, dataType, search } = req.query;
    const userId = req.user.id;

    // Build filter
    const filter = { userId, isDeleted: false };
    
    if (classification) filter.classification = classification;
    if (dataType) filter.dataType = dataType;
    
    if (search) {
      filter.$or = [
        { originalFileName: new RegExp(search, 'i') },
        { 'metadata.description': new RegExp(search, 'i') },
        { 'metadata.tags': new RegExp(search, 'i') }
      ];
    }

    const dataList = await DataProtection.find(filter)
      .select('-encryptedData -encryptionKey')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await DataProtection.countDocuments(filter);

    res.json({
      data: dataList,
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

// Create backup
router.post('/:dataId/backup', authenticateToken, validate(dataProtectionSchemas.backupData), async (req, res, next) => {
  try {
    const { dataId } = req.params;
    const { backupType, description } = req.body;
    const userId = req.user.id;

    const dataProtection = await DataProtection.findOne({ 
      dataId, 
      isDeleted: false 
    });

    if (!dataProtection) {
      throw new NotFoundError('Data');
    }

    // Check access permissions
    if (!dataProtection.canAccess(userId, 'read')) {
      throw new SecurityError('Access denied to this data');
    }

    // Create backup
    const backupId = crypto.randomUUID();
    const backupLocation = `backups/${backupId}`;
    const backupSize = dataProtection.encryptedData.length;

    await dataProtection.addBackup(backupType, backupLocation, backupSize);

    logger.auditLog('DATA_BACKUP_CREATED', req.user, 'data_protection', {
      dataId,
      backupId,
      backupType,
      ip: req.ip
    });

    res.json({
      message: 'Backup created successfully',
      backupId,
      backupLocation,
      backupSize
    });
  } catch (error) {
    next(error);
  }
});

// Share data with another user
router.post('/:dataId/share', authenticateToken, async (req, res, next) => {
  try {
    const { dataId } = req.params;
    const { userId: targetUserId, permissions, expiresAt } = req.body;
    const userId = req.user.id;

    if (!targetUserId || !permissions || !Array.isArray(permissions)) {
      throw new ValidationError('Target user ID and permissions are required');
    }

    const dataProtection = await DataProtection.findOne({ 
      dataId, 
      isDeleted: false 
    });

    if (!dataProtection) {
      throw new NotFoundError('Data');
    }

    // Only owner can share
    if (dataProtection.userId.toString() !== userId) {
      throw new SecurityError('Only the data owner can share data');
    }

    // Add sharing permission
    dataProtection.sharingPermissions.push({
      userId: targetUserId,
      permissions,
      grantedBy: userId,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined
    });

    await dataProtection.save();

    logger.auditLog('DATA_SHARED', req.user, 'data_protection', {
      dataId,
      targetUserId,
      permissions,
      expiresAt,
      ip: req.ip
    });

    res.json({
      message: 'Data shared successfully',
      sharedWith: targetUserId,
      permissions
    });
  } catch (error) {
    next(error);
  }
});

// Revoke data sharing
router.delete('/:dataId/share/:targetUserId', authenticateToken, async (req, res, next) => {
  try {
    const { dataId, targetUserId } = req.params;
    const userId = req.user.id;

    const dataProtection = await DataProtection.findOne({ 
      dataId, 
      isDeleted: false 
    });

    if (!dataProtection) {
      throw new NotFoundError('Data');
    }

    // Only owner can revoke sharing
    if (dataProtection.userId.toString() !== userId) {
      throw new SecurityError('Only the data owner can revoke sharing');
    }

    // Remove sharing permission
    dataProtection.sharingPermissions = dataProtection.sharingPermissions.filter(
      sp => sp.userId.toString() !== targetUserId
    );

    await dataProtection.save();

    logger.auditLog('DATA_SHARING_REVOKED', req.user, 'data_protection', {
      dataId,
      targetUserId,
      ip: req.ip
    });

    res.json({
      message: 'Data sharing revoked successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete data (soft delete)
router.delete('/:dataId', authenticateToken, async (req, res, next) => {
  try {
    const { dataId } = req.params;
    const userId = req.user.id;

    const dataProtection = await DataProtection.findOne({ 
      dataId, 
      isDeleted: false 
    });

    if (!dataProtection) {
      throw new NotFoundError('Data');
    }

    // Check access permissions
    if (!dataProtection.canAccess(userId, 'delete')) {
      throw new SecurityError('Access denied to delete this data');
    }

    // Soft delete
    dataProtection.isDeleted = true;
    dataProtection.deletedAt = new Date();
    dataProtection.deletedBy = userId;

    await dataProtection.save();

    logger.auditLog('DATA_DELETED', req.user, 'data_protection', {
      dataId,
      classification: dataProtection.classification,
      ip: req.ip
    });

    res.json({
      message: 'Data deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// DLP Rules Management
router.get('/dlp/rules', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const { page = 1, limit = 10, classification, enabled, search } = req.query;

    const filter = {};
    if (classification) filter.classification = classification;
    if (enabled !== undefined) filter.enabled = enabled === 'true';
    
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { pattern: new RegExp(search, 'i') }
      ];
    }

    const rules = await DLPRule.find(filter)
      .populate('createdBy', 'firstName lastName email')
      .populate('lastModifiedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await DLPRule.countDocuments(filter);

    res.json({
      rules,
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

// Create DLP rule
router.post('/dlp/rules', authenticateToken, authorize('admin', 'security_officer'), validate(dataProtectionSchemas.dlpRule), async (req, res, next) => {
  try {
    const ruleData = {
      ...req.body,
      createdBy: req.user.id
    };

    const rule = new DLPRule(ruleData);
    await rule.save();

    logger.auditLog('DLP_RULE_CREATED', req.user, 'dlp_rule', {
      ruleId: rule._id,
      ruleName: rule.name,
      classification: rule.classification,
      action: rule.action,
      ip: req.ip
    });

    res.status(201).json({
      message: 'DLP rule created successfully',
      rule: {
        id: rule._id,
        name: rule.name,
        classification: rule.classification,
        action: rule.action,
        enabled: rule.enabled
      }
    });
  } catch (error) {
    next(error);
  }
});

// Test DLP rule
router.post('/dlp/rules/:ruleId/test', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const { ruleId } = req.params;
    const { testData } = req.body;

    if (!testData) {
      throw new ValidationError('Test data is required');
    }

    const rule = await DLPRule.findById(ruleId);
    if (!rule) {
      throw new NotFoundError('DLP rule');
    }

    const matches = rule.testPattern(testData);
    const conditionsMet = rule.checkConditions({ content: testData });
    const exceptionsMet = rule.checkExceptions({ content: testData });

    res.json({
      matches,
      conditionsMet,
      exceptionsMet,
      wouldTrigger: matches && conditionsMet && !exceptionsMet,
      rule: {
        id: rule._id,
        name: rule.name,
        action: rule.action
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get data protection statistics
router.get('/stats/overview', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const totalData = await DataProtection.countDocuments({ isDeleted: false });
    const dataByClassification = await DataProtection.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$classification', count: { $sum: 1 } } }
    ]);

    const expiringData = await DataProtection.countDocuments({
      retentionExpiry: { $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
      isDeleted: false
    });

    const totalBackups = await DataProtection.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: '$backupInfo' },
      { $count: 'total' }
    ]);

    const dlpRulesCount = await DLPRule.countDocuments({ enabled: true, isActive: true });

    res.json({
      totalData,
      dataByClassification,
      expiringData,
      totalBackups: totalBackups[0]?.total || 0,
      dlpRulesCount
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;