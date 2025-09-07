/**
 * Security Configuration for CyberCaution Platform
 * Implements NIST/CISA ransomware protection frameworks
 */

export interface SecurityConfig {
  encryption: EncryptionConfig;
  headers: SecurityHeadersConfig;
  rateLimiting: RateLimitingConfig;
  monitoring: MonitoringConfig;
  compliance: ComplianceConfig;
}

export interface EncryptionConfig {
  enabled: boolean;
  algorithm: string;
  keyLength: number;
  encryptAtRest: boolean;
  encryptInTransit: boolean;
}

export interface SecurityHeadersConfig {
  contentSecurityPolicy: string;
  strictTransportSecurity: string;
  xFrameOptions: string;
  xContentTypeOptions: string;
  xXSSProtection: string;
  referrerPolicy: string;
  permissionsPolicy: string;
}

export interface RateLimitingConfig {
  enabled: boolean;
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export interface MonitoringConfig {
  enabled: boolean;
  logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  anomalyDetection: boolean;
  realTimeAlerts: boolean;
  retentionDays: number;
}

export interface ComplianceConfig {
  frameworks: string[];
  autoCheck: boolean;
  reportingEnabled: boolean;
  auditTrail: boolean;
}

// Production Security Configuration
export const PRODUCTION_SECURITY_CONFIG: SecurityConfig = {
  encryption: {
    enabled: true,
    algorithm: 'AES-256-GCM',
    keyLength: 256,
    encryptAtRest: true,
    encryptInTransit: true,
  },
  headers: {
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';",
    strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
    xFrameOptions: 'DENY',
    xContentTypeOptions: 'nosniff',
    xXSSProtection: '1; mode=block',
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  rateLimiting: {
    enabled: true,
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per window
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },
  monitoring: {
    enabled: true,
    logLevel: 'INFO',
    anomalyDetection: true,
    realTimeAlerts: true,
    retentionDays: 90,
  },
  compliance: {
    frameworks: ['NIST_CSF', 'CISA_CPG', 'CISA_ZERO_TRUST'],
    autoCheck: true,
    reportingEnabled: true,
    auditTrail: true,
  },
};

// Development Security Configuration (Less Restrictive)
export const DEVELOPMENT_SECURITY_CONFIG: SecurityConfig = {
  encryption: {
    enabled: false, // Disabled for development
    algorithm: 'AES-256-GCM',
    keyLength: 256,
    encryptAtRest: false,
    encryptInTransit: true,
  },
  headers: {
    contentSecurityPolicy: "default-src 'self' 'unsafe-inline' 'unsafe-eval' *;",
    strictTransportSecurity: 'max-age=0',
    xFrameOptions: 'SAMEORIGIN',
    xContentTypeOptions: 'nosniff',
    xXSSProtection: '1; mode=block',
    referrerPolicy: 'no-referrer-when-downgrade',
    permissionsPolicy: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  rateLimiting: {
    enabled: false, // Disabled for development
    windowMs: 15 * 60 * 1000,
    maxRequests: 1000,
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
  monitoring: {
    enabled: true,
    logLevel: 'DEBUG',
    anomalyDetection: false,
    realTimeAlerts: false,
    retentionDays: 7,
  },
  compliance: {
    frameworks: ['NIST_CSF'],
    autoCheck: false,
    reportingEnabled: false,
    auditTrail: true,
  },
};

// Get current security configuration based on environment
export const getSecurityConfig = (): SecurityConfig => {
  const isProduction = import.meta.env.PROD;
  return isProduction ? PRODUCTION_SECURITY_CONFIG : DEVELOPMENT_SECURITY_CONFIG;
};

// Security validation functions
export const validateSecurityConfig = (config: SecurityConfig): string[] => {
  const errors: string[] = [];

  // Validate encryption configuration
  if (config.encryption.enabled && !config.encryption.encryptAtRest) {
    errors.push('Encryption enabled but encryptAtRest is false');
  }

  if (config.encryption.keyLength < 256) {
    errors.push('Encryption key length must be at least 256 bits');
  }

  // Validate rate limiting configuration
  if (config.rateLimiting.enabled && config.rateLimiting.maxRequests <= 0) {
    errors.push('Rate limiting enabled but maxRequests must be greater than 0');
  }

  // Validate monitoring configuration
  if (config.monitoring.enabled && config.monitoring.retentionDays < 30) {
    errors.push('Monitoring retention period should be at least 30 days for compliance');
  }

  return errors;
};

// Security compliance check functions
export const checkNISTCompliance = (config: SecurityConfig): ComplianceResult => {
  const checks = [
    { control: 'Data Encryption', status: config.encryption.enabled ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Security Headers', status: config.headers.contentSecurityPolicy ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Rate Limiting', status: config.rateLimiting.enabled ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Security Monitoring', status: config.monitoring.enabled ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Audit Logging', status: config.compliance.auditTrail ? 'COMPLIANT' : 'NON_COMPLIANT' },
  ];

  const compliantCount = checks.filter(check => check.status === 'COMPLIANT').length;
  const complianceScore = (compliantCount / checks.length) * 100;

  return {
    framework: 'NIST_CSF',
    score: complianceScore,
    checks,
    status: complianceScore >= 80 ? 'COMPLIANT' : 'NON_COMPLIANT',
  };
};

export const checkCISACompliance = (config: SecurityConfig): ComplianceResult => {
  const checks = [
    { control: 'Ransomware Prevention', status: config.encryption.enabled ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Network Security', status: config.headers.strictTransportSecurity ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Incident Response', status: config.monitoring.realTimeAlerts ? 'COMPLIANT' : 'NON_COMPLIANT' },
    { control: 'Data Backup', status: config.compliance.auditTrail ? 'COMPLIANT' : 'NON_COMPLIANT' },
  ];

  const compliantCount = checks.filter(check => check.status === 'COMPLIANT').length;
  const complianceScore = (compliantCount / checks.length) * 100;

  return {
    framework: 'CISA_CPG',
    score: complianceScore,
    checks,
    status: complianceScore >= 75 ? 'COMPLIANT' : 'NON_COMPLIANT',
  };
};

export interface ComplianceResult {
  framework: string;
  score: number;
  checks: Array<{ control: string; status: string }>;
  status: 'COMPLIANT' | 'NON_COMPLIANT';
}

// Security event types for monitoring
export enum SecurityEventType {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  DATA_ACCESS = 'DATA_ACCESS',
  PRIVILEGE_ESCALATION = 'PRIVILEGE_ESCALATION',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SECURITY_HEADER_VIOLATION = 'SECURITY_HEADER_VIOLATION',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
}

export interface SecurityEvent {
  type: SecurityEventType;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: Date;
}

// Security constants
export const SECURITY_CONSTANTS = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  SESSION_TIMEOUT: 8 * 60 * 60 * 1000, // 8 hours
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_REQUIREMENTS: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommonPasswords: true,
  },
  ENCRYPTION: {
    ALGORITHM: 'AES-256-GCM',
    KEY_LENGTH: 256,
    IV_LENGTH: 12,
    TAG_LENGTH: 16,
  },
  RATE_LIMITS: {
    LOGIN: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
    API: { windowMs: 15 * 60 * 1000, maxRequests: 100 },
    ASSESSMENT: { windowMs: 60 * 1000, maxRequests: 10 },
  },
} as const;

export default getSecurityConfig;