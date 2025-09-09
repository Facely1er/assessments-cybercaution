const express = require('express');
const { validate, securitySchemas } = require('../utils/validation');
const { authenticateToken, authorize, auditLog } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { ValidationError } = require('../middleware/errorHandler');

const router = express.Router();

// Security headers management
router.get('/headers', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    // Get current security headers configuration
    const securityHeaders = {
      'Content-Security-Policy': process.env.CSP_POLICY || "default-src 'self'",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };

    res.json({
      headers: securityHeaders,
      status: 'active'
    });
  } catch (error) {
    next(error);
  }
});

// Update security headers
router.put('/headers', authenticateToken, authorize('admin'), validate(securitySchemas.securityHeader), async (req, res, next) => {
  try {
    const { name, value, enabled } = req.body;

    // Validate header name
    const allowedHeaders = [
      'Content-Security-Policy',
      'X-Frame-Options',
      'X-Content-Type-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security',
      'Referrer-Policy',
      'Permissions-Policy'
    ];

    if (!allowedHeaders.includes(name)) {
      throw new ValidationError('Invalid security header name');
    }

    // Update environment variable (in production, this would be stored in a database)
    if (name === 'Content-Security-Policy') {
      process.env.CSP_POLICY = value;
    }

    logger.auditLog('SECURITY_HEADER_UPDATED', req.user, 'security_config', {
      headerName: name,
      headerValue: value,
      enabled,
      ip: req.ip
    });

    res.json({
      message: 'Security header updated successfully',
      header: {
        name,
        value,
        enabled
      }
    });
  } catch (error) {
    next(error);
  }
});

// Rate limiting configuration
router.get('/rate-limits', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const rateLimits = {
      global: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
        skipSuccessfulRequests: false
      },
      auth: {
        windowMs: 900000, // 15 minutes
        maxRequests: 5,
        skipSuccessfulRequests: true
      },
      api: {
        windowMs: 60000, // 1 minute
        maxRequests: 30,
        skipSuccessfulRequests: false
      }
    };

    res.json({
      rateLimits,
      status: 'active'
    });
  } catch (error) {
    next(error);
  }
});

// Update rate limiting configuration
router.put('/rate-limits', authenticateToken, authorize('admin'), validate(securitySchemas.rateLimit), async (req, res, next) => {
  try {
    const { windowMs, maxRequests, skipSuccessfulRequests } = req.body;

    // Update environment variables
    process.env.RATE_LIMIT_WINDOW_MS = windowMs.toString();
    process.env.RATE_LIMIT_MAX_REQUESTS = maxRequests.toString();

    logger.auditLog('RATE_LIMIT_UPDATED', req.user, 'security_config', {
      windowMs,
      maxRequests,
      skipSuccessfulRequests,
      ip: req.ip
    });

    res.json({
      message: 'Rate limiting configuration updated successfully',
      configuration: {
        windowMs,
        maxRequests,
        skipSuccessfulRequests
      }
    });
  } catch (error) {
    next(error);
  }
});

// Security scan endpoint
router.post('/scan', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const { scanType, target } = req.body;

    if (!scanType || !target) {
      throw new ValidationError('Scan type and target are required');
    }

    const allowedScanTypes = ['vulnerability', 'configuration', 'compliance', 'malware'];
    if (!allowedScanTypes.includes(scanType)) {
      throw new ValidationError('Invalid scan type');
    }

    // Simulate security scan
    const scanId = require('crypto').randomUUID();
    const scanResults = {
      scanId,
      scanType,
      target,
      status: 'completed',
      timestamp: new Date(),
      findings: [
        {
          severity: 'medium',
          title: 'Missing security headers',
          description: 'Some security headers are not properly configured',
          recommendation: 'Implement all recommended security headers'
        },
        {
          severity: 'low',
          title: 'Weak password policy',
          description: 'Password policy could be strengthened',
          recommendation: 'Implement stronger password requirements'
        }
      ],
      score: 75
    };

    logger.auditLog('SECURITY_SCAN_EXECUTED', req.user, 'security_scan', {
      scanId,
      scanType,
      target,
      findingsCount: scanResults.findings.length,
      score: scanResults.score,
      ip: req.ip
    });

    res.json({
      message: 'Security scan completed',
      results: scanResults
    });
  } catch (error) {
    next(error);
  }
});

// Security events monitoring
router.get('/events', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const { page = 1, limit = 20, severity, type, startDate, endDate } = req.query;

    // This would typically query a security events database
    // For now, return sample events
    const events = [
      {
        id: 'evt_001',
        type: 'authentication_failure',
        severity: 'medium',
        message: 'Multiple failed login attempts detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        source: 'auth_service',
        details: {
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0...',
          attempts: 5
        }
      },
      {
        id: 'evt_002',
        type: 'suspicious_activity',
        severity: 'high',
        message: 'Unusual data access pattern detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        source: 'data_protection',
        details: {
          userId: 'user_123',
          dataId: 'data_456',
          accessCount: 50
        }
      },
      {
        id: 'evt_003',
        type: 'policy_violation',
        severity: 'low',
        message: 'DLP rule triggered',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        source: 'dlp_engine',
        details: {
          ruleId: 'rule_789',
          dataType: 'document',
          action: 'logged'
        }
      }
    ];

    // Filter events based on query parameters
    let filteredEvents = events;
    
    if (severity) {
      filteredEvents = filteredEvents.filter(event => event.severity === severity);
    }
    
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }

    res.json({
      events: filteredEvents,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(filteredEvents.length / limit),
        total: filteredEvents.length
      }
    });
  } catch (error) {
    next(error);
  }
});

// Security dashboard statistics
router.get('/dashboard', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const stats = {
      totalEvents: 1250,
      criticalEvents: 5,
      highEvents: 23,
      mediumEvents: 156,
      lowEvents: 1066,
      activeThreats: 3,
      securityScore: 85,
      complianceScore: 78,
      lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      vulnerabilities: {
        critical: 2,
        high: 8,
        medium: 15,
        low: 42
      },
      recentActivity: [
        {
          type: 'login',
          user: 'john.doe@company.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          status: 'success'
        },
        {
          type: 'data_access',
          user: 'jane.smith@company.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          status: 'success'
        },
        {
          type: 'policy_violation',
          user: 'bob.wilson@company.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: 'blocked'
        }
      ]
    };

    res.json({ stats });
  } catch (error) {
    next(error);
  }
});

// Security recommendations
router.get('/recommendations', authenticateToken, async (req, res, next) => {
  try {
    const recommendations = [
      {
        id: 'rec_001',
        category: 'Authentication',
        priority: 'high',
        title: 'Enable Multi-Factor Authentication',
        description: 'MFA is not enabled for all user accounts. This significantly increases security risk.',
        impact: 'Reduces risk of account compromise by 99.9%',
        effort: 'low',
        status: 'pending'
      },
      {
        id: 'rec_002',
        category: 'Data Protection',
        priority: 'medium',
        title: 'Implement Data Loss Prevention',
        description: 'DLP rules should be configured to prevent sensitive data exfiltration.',
        impact: 'Prevents accidental data leaks and improves compliance',
        effort: 'medium',
        status: 'in_progress'
      },
      {
        id: 'rec_003',
        category: 'Network Security',
        priority: 'low',
        title: 'Update Security Headers',
        description: 'Some security headers are missing or misconfigured.',
        impact: 'Improves protection against common web vulnerabilities',
        effort: 'low',
        status: 'completed'
      },
      {
        id: 'rec_004',
        category: 'Compliance',
        priority: 'high',
        title: 'Complete NIST Assessment',
        description: 'NIST Cybersecurity Framework assessment is overdue.',
        impact: 'Required for compliance and risk management',
        effort: 'high',
        status: 'pending'
      }
    ];

    res.json({ recommendations });
  } catch (error) {
    next(error);
  }
});

// Update recommendation status
router.patch('/recommendations/:id', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const allowedStatuses = ['pending', 'in_progress', 'completed', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      throw new ValidationError('Invalid status');
    }

    // This would typically update a database record
    logger.auditLog('SECURITY_RECOMMENDATION_UPDATED', req.user, 'security_recommendation', {
      recommendationId: id,
      status,
      notes,
      ip: req.ip
    });

    res.json({
      message: 'Recommendation status updated successfully',
      recommendation: {
        id,
        status,
        notes,
        updatedAt: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
});

// Security policy management
router.get('/policies', authenticateToken, async (req, res, next) => {
  try {
    const policies = [
      {
        id: 'pol_001',
        title: 'Password Policy',
        category: 'Authentication',
        version: '2.1',
        status: 'active',
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        description: 'Defines requirements for password complexity and management'
      },
      {
        id: 'pol_002',
        title: 'Data Classification Policy',
        category: 'Data Protection',
        version: '1.5',
        status: 'active',
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
        description: 'Establishes data classification levels and handling requirements'
      },
      {
        id: 'pol_003',
        title: 'Incident Response Policy',
        category: 'Incident Response',
        version: '3.0',
        status: 'draft',
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        description: 'Defines procedures for responding to security incidents'
      }
    ];

    res.json({ policies });
  } catch (error) {
    next(error);
  }
});

// Security metrics and KPIs
router.get('/metrics', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;

    const metrics = {
      period,
      securityScore: {
        current: 85,
        previous: 82,
        trend: 'up'
      },
      complianceScore: {
        current: 78,
        previous: 75,
        trend: 'up'
      },
      incidents: {
        total: 45,
        resolved: 42,
        open: 3,
        avgResolutionTime: '2.5 days'
      },
      vulnerabilities: {
        total: 67,
        patched: 45,
        critical: 2,
        high: 8
      },
      userActivity: {
        totalLogins: 1250,
        failedLogins: 23,
        mfaUsage: 89,
        suspiciousActivity: 5
      },
      dataProtection: {
        encryptedData: 12500,
        dlpViolations: 12,
        backupSuccess: 98.5,
        retentionCompliance: 95
      }
    };

    res.json({ metrics });
  } catch (error) {
    next(error);
  }
});

module.exports = router;