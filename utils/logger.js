const winston = require('winston');
const path = require('path');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which transports the logger must use
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  }),
  // File transport for errors
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/error.log'),
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
  // File transport for all logs
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/combined.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  transports,
  exitOnError: false,
});

// Security-specific logging methods
logger.securityEvent = (event, details = {}) => {
  logger.info(`SECURITY_EVENT: ${event}`, {
    type: 'security',
    event,
    ...details,
    timestamp: new Date().toISOString()
  });
};

logger.auditLog = (action, user, resource, details = {}) => {
  logger.info(`AUDIT: ${action}`, {
    type: 'audit',
    action,
    user: user?.id || 'anonymous',
    resource,
    ...details,
    timestamp: new Date().toISOString()
  });
};

logger.complianceEvent = (framework, control, status, details = {}) => {
  logger.info(`COMPLIANCE: ${framework} - ${control}`, {
    type: 'compliance',
    framework,
    control,
    status,
    ...details,
    timestamp: new Date().toISOString()
  });
};

logger.incidentLog = (incidentId, event, details = {}) => {
  logger.warn(`INCIDENT: ${incidentId} - ${event}`, {
    type: 'incident',
    incidentId,
    event,
    ...details,
    timestamp: new Date().toISOString()
  });
};

module.exports = { logger };