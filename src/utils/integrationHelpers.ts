// src/utils/integrationHelpers.ts

import { 
  Integration, 
  IntegrationType, 
  ConnectionStatus, 
  IntegrationConfig,
  IntegrationTestResult,
  IntegrationStats,
  IntegrationEvent
} from '../types/integrations';

/**
 * Test connection to an integration
 */
export async function testIntegrationConnection(
  integration: Integration
): Promise<IntegrationTestResult> {
  const startTime = Date.now();
  const result: IntegrationTestResult = {
    success: false,
    message: '',
    timestamp: new Date(),
    duration: 0,
    details: {
      connectivity: false,
      authentication: false,
      permissions: false,
      dataAccess: false
    },
    errors: []
  };

  try {
    // Simulate connection test (replace with actual API calls)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test connectivity
    result.details!.connectivity = await testConnectivity(integration.config.apiEndpoint);
    
    // Test authentication
    result.details!.authentication = await testAuthentication(integration.config);
    
    // Test permissions
    result.details!.permissions = await testPermissions(integration);
    
    // Test data access
    result.details!.dataAccess = await testDataAccess(integration);
    
    result.success = Object.values(result.details!).every(test => test === true);
    result.message = result.success 
      ? 'Connection test successful' 
      : 'Connection test failed';
    
  } catch (error) {
    result.success = false;
    result.message = 'Connection test encountered an error';
    result.errors?.push(error instanceof Error ? error.message : 'Unknown error');
  }
  
  result.duration = Date.now() - startTime;
  return result;
}

/**
 * Transform integration data based on type
 */
export function transformIntegrationData(
  data: any,
  integrationType: IntegrationType,
  targetFormat: 'normalized' | 'raw' = 'normalized'
): any {
  if (targetFormat === 'raw') return data;

  const transformers: Record<IntegrationType, (data: any) => any> = {
    [IntegrationType.SIEM]: transformSIEMData,
    [IntegrationType.EDR]: transformEDRData,
    [IntegrationType.SOAR]: transformSOARData,
    [IntegrationType.IAM]: transformIAMData,
    [IntegrationType.VULNERABILITY_SCANNER]: transformVulnerabilityData,
    [IntegrationType.CLOUD_SECURITY]: transformCloudSecurityData,
    [IntegrationType.NETWORK_MONITOR]: transformNetworkData,
    [IntegrationType.TICKETING]: transformTicketingData,
    [IntegrationType.COMMUNICATION]: transformCommunicationData,
    [IntegrationType.GOVERNANCE]: transformGovernanceData
  };

  const transformer = transformers[integrationType];
  return transformer ? transformer(data) : data;
}

/**
 * Calculate integration health score
 */
export function calculateIntegrationHealth(
  integration: Integration,
  events: IntegrationEvent[]
): number {
  let score = 100;
  
  // Check connection status
  if (integration.status !== ConnectionStatus.CONNECTED) {
    score -= 50;
  }
  
  // Check last sync time
  if (integration.lastSync) {
    const hoursSinceSync = (Date.now() - integration.lastSync.getTime()) / (1000 * 60 * 60);
    if (hoursSinceSync > 24) score -= 20;
    else if (hoursSinceSync > 12) score -= 10;
    else if (hoursSinceSync > 6) score -= 5;
  }
  
  // Check recent events
  const recentEvents = events.filter(e => 
    e.timestamp.getTime() > Date.now() - 24 * 60 * 60 * 1000
  );
  
  const errorEvents = recentEvents.filter(e => e.eventType === 'error');
  const warningEvents = recentEvents.filter(e => e.eventType === 'warning');
  
  score -= errorEvents.length * 10;
  score -= warningEvents.length * 5;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Get integration status color
 */
export function getStatusColor(status: ConnectionStatus): string {
  const statusColors: Record<ConnectionStatus, string> = {
    [ConnectionStatus.CONNECTED]: '#10b981',
    [ConnectionStatus.DISCONNECTED]: '#6b7280',
    [ConnectionStatus.ERROR]: '#ef4444',
    [ConnectionStatus.PENDING]: '#f59e0b',
    [ConnectionStatus.CONFIGURING]: '#3b82f6'
  };
  
  return statusColors[status] || '#6b7280';
}

/**
 * Get integration type icon
 */
export function getIntegrationTypeIcon(type: IntegrationType): string {
  const icons: Record<IntegrationType, string> = {
    [IntegrationType.SIEM]: '🛡️',
    [IntegrationType.EDR]: '🔍',
    [IntegrationType.SOAR]: '🤖',
    [IntegrationType.IAM]: '🔐',
    [IntegrationType.VULNERABILITY_SCANNER]: '🎯',
    [IntegrationType.CLOUD_SECURITY]: '☁️',
    [IntegrationType.NETWORK_MONITOR]: '🌐',
    [IntegrationType.TICKETING]: '🎫',
    [IntegrationType.COMMUNICATION]: '💬',
    [IntegrationType.GOVERNANCE]: '📋'
  };
  
  return icons[type] || '🔧';
}

/**
 * Validate integration configuration
 */
export function validateIntegrationConfig(
  config: IntegrationConfig,
  type: IntegrationType
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Common validations
  if (!config.apiEndpoint && !config.webhookUrl) {
    errors.push('API endpoint or webhook URL is required');
  }
  
  // Type-specific validations
  switch (type) {
    case IntegrationType.SIEM:
    case IntegrationType.EDR:
      if (!config.apiKey && !config.clientId) {
        errors.push('API key or client credentials are required');
      }
      break;
    case IntegrationType.IAM:
      if (!config.tenantId) {
        errors.push('Tenant ID is required for IAM integrations');
      }
      break;
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Generate integration summary
 */
export function generateIntegrationSummary(
  integrations: Integration[],
  events: IntegrationEvent[]
): IntegrationStats {
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const todayEvents = events.filter(e => e.timestamp >= todayStart);
  const weekEvents = events.filter(e => e.timestamp >= weekStart);
  const monthEvents = events.filter(e => e.timestamp >= monthStart);
  
  return {
    totalIntegrations: integrations.length,
    activeIntegrations: integrations.filter(i => i.status === ConnectionStatus.CONNECTED).length,
    failedIntegrations: integrations.filter(i => i.status === ConnectionStatus.ERROR).length,
    lastSyncTime: integrations
      .filter(i => i.lastSync)
      .sort((a, b) => (b.lastSync?.getTime() || 0) - (a.lastSync?.getTime() || 0))[0]?.lastSync,
    dataProcessed: {
      today: todayEvents.filter(e => e.eventType === 'sync').length * 1000, // Mock data volume
      thisWeek: weekEvents.filter(e => e.eventType === 'sync').length * 1000,
      thisMonth: monthEvents.filter(e => e.eventType === 'sync').length * 1000
    },
    uptime: calculateAverageUptime(integrations),
    alertsGenerated: monthEvents.filter(e => e.severity === 'high' || e.severity === 'critical').length,
    incidentsCreated: monthEvents.filter(e => e.eventType === 'error' && e.severity === 'critical').length
  };
}

// Private helper functions
async function testConnectivity(endpoint?: string): Promise<boolean> {
  // Simulate connectivity test
  return !!endpoint && endpoint.startsWith('http');
}

async function testAuthentication(config: IntegrationConfig): Promise<boolean> {
  // Simulate authentication test
  return !!(config.apiKey || config.clientId || config.username);
}

async function testPermissions(integration: Integration): Promise<boolean> {
  // Simulate permissions test
  return integration.requiredPermissions.length > 0;
}

async function testDataAccess(integration: Integration): Promise<boolean> {
  // Simulate data access test
  return integration.supportedFeatures.length > 0;
}

function calculateAverageUptime(integrations: Integration[]): number {
  if (integrations.length === 0) return 0;
  
  const connectedCount = integrations.filter(i => i.status === ConnectionStatus.CONNECTED).length;
  return Math.round((connectedCount / integrations.length) * 100);
}

// Data transformation functions for each integration type
function transformSIEMData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    severity: data.severity || 'medium'
  };
}

function transformEDRData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    threatLevel: data.threatLevel || 'low'
  };
}

function transformSOARData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    automationStatus: data.status || 'pending'
  };
}

function transformIAMData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    accessLevel: data.role || 'user'
  };
}

function transformVulnerabilityData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    riskScore: data.cvss || 0
  };
}

function transformCloudSecurityData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    complianceStatus: data.compliant || false
  };
}

function transformNetworkData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    trafficType: data.protocol || 'unknown'
  };
}

function transformTicketingData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    priority: data.priority || 'medium'
  };
}

function transformCommunicationData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    channel: data.channel || 'email'
  };
}

function transformGovernanceData(data: any): any {
  return {
    ...data,
    normalized: true,
    timestamp: new Date(),
    complianceFramework: data.framework || 'NIST'
  };
}