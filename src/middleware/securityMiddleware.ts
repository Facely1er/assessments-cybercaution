/**
 * Security Middleware for CyberCaution Platform
 * Implements NIST/CISA security controls
 */

import { SecurityEvent, SecurityEventType, SECURITY_CONSTANTS } from '../lib/securityConfig';
import { logSecurityEvent } from '../lib/securityLogger';

export interface SecurityContext {
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  requestId: string;
}

export class SecurityMiddleware {
  private static instance: SecurityMiddleware;
  private failedAttempts = new Map<string, { count: number; lastAttempt: Date }>();
  private activeSessions = new Map<string, SecurityContext>();

  static getInstance(): SecurityMiddleware {
    if (!SecurityMiddleware.instance) {
      SecurityMiddleware.instance = new SecurityMiddleware();
    }
    return SecurityMiddleware.instance;
  }

  /**
   * Rate limiting middleware
   */
  async checkRateLimit(
    identifier: string,
    limit: number,
    windowMs: number,
    context: SecurityContext
  ): Promise<boolean> {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    
    // Check if user is currently rate limited
    if (this.isRateLimited(identifier)) {
      await this.logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        userId: context.userId,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        details: { identifier, limit, windowMs },
        severity: 'MEDIUM',
        timestamp: new Date(),
      });
      return false;
    }

    // Simple in-memory rate limiting (in production, use Redis)
    const attempts = this.failedAttempts.get(key) || { count: 0, lastAttempt: new Date(0) };
    
    if (now - attempts.lastAttempt.getTime() > windowMs) {
      // Reset counter if window has passed
      attempts.count = 1;
      attempts.lastAttempt = new Date();
    } else {
      attempts.count++;
    }

    this.failedAttempts.set(key, attempts);

    if (attempts.count > limit) {
      await this.logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        userId: context.userId,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        details: { identifier, limit, windowMs, attempts: attempts.count },
        severity: 'MEDIUM',
        timestamp: new Date(),
      });
      return false;
    }

    return true;
  }

  /**
   * Authentication security checks
   */
  async validateAuthentication(
    userId: string,
    context: SecurityContext
  ): Promise<{ valid: boolean; reason?: string }> {
    // Check if user account is locked
    if (this.isAccountLocked(userId)) {
      await this.logSecurityEvent({
        type: SecurityEventType.AUTH_FAILURE,
        userId,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        details: { reason: 'Account locked due to failed attempts' },
        severity: 'HIGH',
        timestamp: new Date(),
      });
      return { valid: false, reason: 'Account locked' };
    }

    // Check for suspicious login patterns
    const suspiciousActivity = await this.detectSuspiciousActivity(userId, context);
    if (suspiciousActivity) {
      await this.logSecurityEvent({
        type: SecurityEventType.SUSPICIOUS_ACTIVITY,
        userId,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        details: { reason: suspiciousActivity },
        severity: 'HIGH',
        timestamp: new Date(),
      });
      return { valid: false, reason: 'Suspicious activity detected' };
    }

    return { valid: true };
  }

  /**
   * Input validation and sanitization
   */
  validateInput(input: any, type: 'email' | 'password' | 'text' | 'json'): {
    valid: boolean;
    sanitized?: any;
    errors: string[];
  } {
    const errors: string[] = [];
    let sanitized = input;

    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          errors.push('Invalid email format');
        }
        sanitized = input.toLowerCase().trim();
        break;

      case 'password':
        const passwordErrors = this.validatePassword(input);
        errors.push(...passwordErrors);
        break;

      case 'text':
        // Remove potentially dangerous characters
        sanitized = input.replace(/[<>\"'&]/g, '');
        if (input !== sanitized) {
          errors.push('Input contains potentially dangerous characters');
        }
        break;

      case 'json':
        try {
          sanitized = JSON.parse(input);
        } catch (e) {
          errors.push('Invalid JSON format');
        }
        break;
    }

    return {
      valid: errors.length === 0,
      sanitized,
      errors,
    };
  }

  /**
   * Password validation
   */
  private validatePassword(password: string): string[] {
    const errors: string[] = [];
    const requirements = SECURITY_CONSTANTS.PASSWORD_REQUIREMENTS;

    if (password.length < requirements.minLength) {
      errors.push(`Password must be at least ${requirements.minLength} characters long`);
    }

    if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (requirements.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (requirements.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (requirements.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check against common passwords
    const commonPasswords = ['password', '123456', 'password123', 'admin', 'qwerty'];
    if (requirements.preventCommonPasswords && commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common and easily guessable');
    }

    return errors;
  }

  /**
   * Detect suspicious activity patterns
   */
  private async detectSuspiciousActivity(
    userId: string,
    context: SecurityContext
  ): Promise<string | null> {
    // Check for unusual login times (simplified)
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) {
      return 'Unusual login time';
    }

    // Check for rapid successive logins
    const recentAttempts = this.getRecentLoginAttempts(userId, 5 * 60 * 1000); // 5 minutes
    if (recentAttempts > 3) {
      return 'Rapid successive login attempts';
    }

    // Check for unusual IP patterns (simplified)
    const userSessions = this.activeSessions.get(userId);
    if (userSessions && userSessions.ipAddress !== context.ipAddress) {
      return 'Login from different IP address';
    }

    return null;
  }

  /**
   * Check if account is locked due to failed attempts
   */
  private isAccountLocked(userId: string): boolean {
    const attempts = this.failedAttempts.get(`auth:${userId}`);
    if (!attempts) return false;

    const now = Date.now();
    const lockoutDuration = SECURITY_CONSTANTS.LOCKOUT_DURATION;
    
    return (
      attempts.count >= SECURITY_CONSTANTS.MAX_LOGIN_ATTEMPTS &&
      now - attempts.lastAttempt.getTime() < lockoutDuration
    );
  }

  /**
   * Check if identifier is currently rate limited
   */
  private isRateLimited(identifier: string): boolean {
    const attempts = this.failedAttempts.get(`rate_limit:${identifier}`);
    if (!attempts) return false;

    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    
    return (
      attempts.count > 100 && // Max requests per window
      now - attempts.lastAttempt.getTime() < windowMs
    );
  }

  /**
   * Get recent login attempts for user
   */
  private getRecentLoginAttempts(userId: string, timeWindow: number): number {
    const attempts = this.failedAttempts.get(`auth:${userId}`);
    if (!attempts) return 0;

    const now = Date.now();
    const windowStart = now - timeWindow;
    
    return attempts.lastAttempt.getTime() > windowStart ? attempts.count : 0;
  }

  /**
   * Log security event
   */
  private async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      await logSecurityEvent(event);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  /**
   * Record failed authentication attempt
   */
  recordFailedAuth(userId: string, context: SecurityContext): void {
    const key = `auth:${userId}`;
    const attempts = this.failedAttempts.get(key) || { count: 0, lastAttempt: new Date(0) };
    
    attempts.count++;
    attempts.lastAttempt = new Date();
    
    this.failedAttempts.set(key, attempts);

    // Log the failed attempt
    this.logSecurityEvent({
      type: SecurityEventType.AUTH_FAILURE,
      userId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      details: { attemptCount: attempts.count },
      severity: attempts.count >= SECURITY_CONSTANTS.MAX_LOGIN_ATTEMPTS ? 'HIGH' : 'MEDIUM',
      timestamp: new Date(),
    });
  }

  /**
   * Record successful authentication
   */
  recordSuccessfulAuth(userId: string, context: SecurityContext): void {
    // Clear failed attempts on successful login
    this.failedAttempts.delete(`auth:${userId}`);
    
    // Store active session
    this.activeSessions.set(userId, context);

    // Log successful authentication
    this.logSecurityEvent({
      type: SecurityEventType.AUTH_SUCCESS,
      userId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      details: { sessionId: context.requestId },
      severity: 'LOW',
      timestamp: new Date(),
    });
  }

  /**
   * Clean up expired sessions and failed attempts
   */
  cleanup(): void {
    const now = Date.now();
    const cleanupThreshold = 24 * 60 * 60 * 1000; // 24 hours

    // Clean up old failed attempts
    for (const [key, attempts] of this.failedAttempts.entries()) {
      if (now - attempts.lastAttempt.getTime() > cleanupThreshold) {
        this.failedAttempts.delete(key);
      }
    }

    // Clean up old sessions
    for (const [userId, session] of this.activeSessions.entries()) {
      if (now - session.timestamp.getTime() > SECURITY_CONSTANTS.SESSION_TIMEOUT) {
        this.activeSessions.delete(userId);
      }
    }
  }
}

// Export singleton instance
export const securityMiddleware = SecurityMiddleware.getInstance();

// Cleanup every hour
setInterval(() => {
  securityMiddleware.cleanup();
}, 60 * 60 * 1000);

export default securityMiddleware;