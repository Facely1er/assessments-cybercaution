/**
 * Security Logger for CyberCaution Platform
 * Implements comprehensive security event logging and monitoring
 */

import { supabase } from './supabase';
import { SecurityEvent, SecurityEventType } from './securityConfig';

export interface SecurityLogEntry {
  id: string;
  event_type: SecurityEventType;
  user_id?: string;
  organization_id?: string;
  ip_address: string;
  user_agent: string;
  details: Record<string, any>;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  created_at: string;
}

export interface SecurityMetrics {
  totalEvents: number;
  eventsByType: Record<SecurityEventType, number>;
  eventsBySeverity: Record<string, number>;
  eventsByHour: Record<string, number>;
  topIPs: Array<{ ip: string; count: number }>;
  topUsers: Array<{ userId: string; count: number }>;
}

export class SecurityLogger {
  private static instance: SecurityLogger;
  private logBuffer: SecurityEvent[] = [];
  private bufferSize = 100;
  private flushInterval = 30000; // 30 seconds

  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
      SecurityLogger.instance.startBufferFlush();
    }
    return SecurityLogger.instance;
  }

  /**
   * Log a security event
   */
  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      // Add to buffer for batch processing
      this.logBuffer.push(event);

      // Flush buffer if it's full
      if (this.logBuffer.length >= this.bufferSize) {
        await this.flushBuffer();
      }

      // Log critical events immediately
      if (event.severity === 'CRITICAL') {
        await this.logToDatabase(event);
        await this.sendImmediateAlert(event);
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
      // Fallback to console logging
      console.log('SECURITY_EVENT:', JSON.stringify(event));
    }
  }

  /**
   * Log authentication events
   */
  async logAuthEvent(
    type: 'SUCCESS' | 'FAILURE' | 'LOCKOUT' | 'PASSWORD_RESET',
    userId: string | null,
    ipAddress: string,
    userAgent: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    const event: SecurityEvent = {
      type: type === 'SUCCESS' ? SecurityEventType.AUTH_SUCCESS : SecurityEventType.AUTH_FAILURE,
      userId: userId || undefined,
      ipAddress,
      userAgent,
      details: {
        authType: type,
        ...details,
      },
      severity: type === 'FAILURE' || type === 'LOCKOUT' ? 'HIGH' : 'LOW',
      timestamp: new Date(),
    };

    await this.logSecurityEvent(event);
  }

  /**
   * Log data access events
   */
  async logDataAccess(
    userId: string,
    resourceType: string,
    resourceId: string,
    action: 'READ' | 'WRITE' | 'DELETE' | 'EXPORT',
    ipAddress: string,
    userAgent: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    const event: SecurityEvent = {
      type: SecurityEventType.DATA_ACCESS,
      userId,
      ipAddress,
      userAgent,
      details: {
        resourceType,
        resourceId,
        action,
        ...details,
      },
      severity: action === 'DELETE' || action === 'EXPORT' ? 'HIGH' : 'MEDIUM',
      timestamp: new Date(),
    };

    await this.logSecurityEvent(event);
  }

  /**
   * Log suspicious activity
   */
  async logSuspiciousActivity(
    userId: string | null,
    activityType: string,
    ipAddress: string,
    userAgent: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    const event: SecurityEvent = {
      type: SecurityEventType.SUSPICIOUS_ACTIVITY,
      userId: userId || undefined,
      ipAddress,
      userAgent,
      details: {
        activityType,
        ...details,
      },
      severity: 'HIGH',
      timestamp: new Date(),
    };

    await this.logSecurityEvent(event);
    await this.sendImmediateAlert(event);
  }

  /**
   * Log privilege escalation attempts
   */
  async logPrivilegeEscalation(
    userId: string,
    attemptedRole: string,
    currentRole: string,
    ipAddress: string,
    userAgent: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    const event: SecurityEvent = {
      type: SecurityEventType.PRIVILEGE_ESCALATION,
      userId,
      ipAddress,
      userAgent,
      details: {
        attemptedRole,
        currentRole,
        ...details,
      },
      severity: 'CRITICAL',
      timestamp: new Date(),
    };

    await this.logSecurityEvent(event);
    await this.sendImmediateAlert(event);
  }

  /**
   * Log rate limiting events
   */
  async logRateLimitExceeded(
    identifier: string,
    limit: number,
    ipAddress: string,
    userAgent: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    const event: SecurityEvent = {
      type: SecurityEventType.RATE_LIMIT_EXCEEDED,
      ipAddress,
      userAgent,
      details: {
        identifier,
        limit,
        ...details,
      },
      severity: 'MEDIUM',
      timestamp: new Date(),
    };

    await this.logSecurityEvent(event);
  }

  /**
   * Get security metrics
   */
  async getSecurityMetrics(
    startDate: Date,
    endDate: Date,
    organizationId?: string
  ): Promise<SecurityMetrics> {
    try {
      let query = supabase
        .from('cc_audit_logs')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (organizationId) {
        query = query.eq('organization_id', organizationId);
      }

      const { data: logs, error } = await query;

      if (error) {
        throw error;
      }

      return this.calculateMetrics(logs || []);
    } catch (error) {
      console.error('Failed to get security metrics:', error);
      return this.getEmptyMetrics();
    }
  }

  /**
   * Get recent security events
   */
  async getRecentSecurityEvents(
    limit: number = 100,
    organizationId?: string
  ): Promise<SecurityLogEntry[]> {
    try {
      let query = supabase
        .from('cc_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (organizationId) {
        query = query.eq('organization_id', organizationId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to get recent security events:', error);
      return [];
    }
  }

  /**
   * Search security events
   */
  async searchSecurityEvents(
    filters: {
      eventType?: SecurityEventType;
      userId?: string;
      severity?: string;
      startDate?: Date;
      endDate?: Date;
      organizationId?: string;
    },
    limit: number = 100
  ): Promise<SecurityLogEntry[]> {
    try {
      let query = supabase
        .from('cc_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (filters.eventType) {
        query = query.eq('action', filters.eventType);
      }

      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }

      if (filters.severity) {
        query = query.eq('details->severity', filters.severity);
      }

      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }

      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }

      if (filters.organizationId) {
        query = query.eq('organization_id', filters.organizationId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to search security events:', error);
      return [];
    }
  }

  /**
   * Flush log buffer to database
   */
  private async flushBuffer(): Promise<void> {
    if (this.logBuffer.length === 0) return;

    const eventsToFlush = [...this.logBuffer];
    this.logBuffer = [];

    try {
      const logEntries = eventsToFlush.map(event => ({
        action: event.type,
        resource_type: 'security_event',
        details: {
          ...event.details,
          severity: event.severity,
          timestamp: event.timestamp.toISOString(),
        },
        ip_address: event.ipAddress,
        user_agent: event.userAgent,
        user_id: event.userId,
        organization_id: await this.getCurrentOrganizationId(event.userId),
      }));

      const { error } = await supabase
        .from('cc_audit_logs')
        .insert(logEntries);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Failed to flush security log buffer:', error);
      // Re-add events to buffer for retry
      this.logBuffer.unshift(...eventsToFlush);
    }
  }

  /**
   * Log single event to database
   */
  private async logToDatabase(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await supabase
        .from('cc_audit_logs')
        .insert({
          action: event.type,
          resource_type: 'security_event',
          details: {
            ...event.details,
            severity: event.severity,
            timestamp: event.timestamp.toISOString(),
          },
          ip_address: event.ipAddress,
          user_agent: event.userAgent,
          user_id: event.userId,
          organization_id: await this.getCurrentOrganizationId(event.userId),
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Failed to log security event to database:', error);
    }
  }

  /**
   * Send immediate alert for critical events
   */
  private async sendImmediateAlert(event: SecurityEvent): Promise<void> {
    try {
      // In a real implementation, this would send alerts via:
      // - Email to security team
      // - Slack notifications
      // - SMS alerts for critical events
      // - Integration with SIEM systems

      console.log('SECURITY_ALERT:', {
        type: event.type,
        severity: event.severity,
        userId: event.userId,
        ipAddress: event.ipAddress,
        details: event.details,
        timestamp: event.timestamp,
      });

      // Example: Send to external monitoring service
      if (process.env.SECURITY_WEBHOOK_URL) {
        await fetch(process.env.SECURITY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            alert: 'Security Event',
            event: event.type,
            severity: event.severity,
            userId: event.userId,
            ipAddress: event.ipAddress,
            details: event.details,
            timestamp: event.timestamp.toISOString(),
          }),
        });
      }
    } catch (error) {
      console.error('Failed to send security alert:', error);
    }
  }

  /**
   * Calculate security metrics from log data
   */
  private calculateMetrics(logs: any[]): SecurityMetrics {
    const metrics: SecurityMetrics = {
      totalEvents: logs.length,
      eventsByType: {} as Record<SecurityEventType, number>,
      eventsBySeverity: {},
      eventsByHour: {},
      topIPs: [],
      topUsers: [],
    };

    const ipCounts = new Map<string, number>();
    const userCounts = new Map<string, number>();

    logs.forEach(log => {
      // Count by event type
      const eventType = log.action as SecurityEventType;
      metrics.eventsByType[eventType] = (metrics.eventsByType[eventType] || 0) + 1;

      // Count by severity
      const severity = log.details?.severity || 'UNKNOWN';
      metrics.eventsBySeverity[severity] = (metrics.eventsBySeverity[severity] || 0) + 1;

      // Count by hour
      const hour = new Date(log.created_at).getHours().toString();
      metrics.eventsByHour[hour] = (metrics.eventsByHour[hour] || 0) + 1;

      // Count IPs
      if (log.ip_address) {
        ipCounts.set(log.ip_address, (ipCounts.get(log.ip_address) || 0) + 1);
      }

      // Count users
      if (log.user_id) {
        userCounts.set(log.user_id, (userCounts.get(log.user_id) || 0) + 1);
      }
    });

    // Convert maps to sorted arrays
    metrics.topIPs = Array.from(ipCounts.entries())
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    metrics.topUsers = Array.from(userCounts.entries())
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return metrics;
  }

  /**
   * Get empty metrics structure
   */
  private getEmptyMetrics(): SecurityMetrics {
    return {
      totalEvents: 0,
      eventsByType: {} as Record<SecurityEventType, number>,
      eventsBySeverity: {},
      eventsByHour: {},
      topIPs: [],
      topUsers: [],
    };
  }

  /**
   * Get current organization ID for user
   */
  private async getCurrentOrganizationId(userId?: string): Promise<string | null> {
    if (!userId) return null;

    try {
      const { data } = await supabase
        .from('cc_user_profiles')
        .select('organization_id')
        .eq('id', userId)
        .single();

      return data?.organization_id || null;
    } catch (error) {
      console.error('Failed to get organization ID:', error);
      return null;
    }
  }

  /**
   * Start periodic buffer flush
   */
  private startBufferFlush(): void {
    setInterval(() => {
      this.flushBuffer();
    }, this.flushInterval);
  }
}

// Export singleton instance
export const securityLogger = SecurityLogger.getInstance();

// Export convenience function
export const logSecurityEvent = (event: SecurityEvent): Promise<void> => {
  return securityLogger.logSecurityEvent(event);
};

export default securityLogger;