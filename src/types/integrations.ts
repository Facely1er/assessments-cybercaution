// src/types/integrations.ts

export enum IntegrationType {
  SIEM = 'SIEM',
  EDR = 'EDR',
  SOAR = 'SOAR',
  IAM = 'IAM',
  VULNERABILITY_SCANNER = 'VULNERABILITY_SCANNER',
  CLOUD_SECURITY = 'CLOUD_SECURITY',
  NETWORK_MONITOR = 'NETWORK_MONITOR',
  TICKETING = 'TICKETING',
  COMMUNICATION = 'COMMUNICATION',
  GOVERNANCE = 'GOVERNANCE'
}

export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  PENDING = 'pending',
  CONFIGURING = 'configuring'
}

export interface IntegrationConfig {
  apiEndpoint?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
  webhookUrl?: string;
  customFields?: Record<string, any>;
  syncInterval?: number; // in minutes
  dataRetentionDays?: number;
  enabledFeatures?: string[];
}

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  vendor: string;
  description: string;
  icon?: string;
  status: ConnectionStatus;
  lastSync?: Date;
  lastError?: string;
  config: IntegrationConfig;
  version?: string;
  supportedFeatures: string[];
  requiredPermissions: string[];
  dataFlowDirection: 'inbound' | 'outbound' | 'bidirectional';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
  healthCheckUrl?: string;
  documentation?: string;
  tags?: string[];
}

export interface IntegrationStats {
  totalIntegrations: number;
  activeIntegrations: number;
  failedIntegrations: number;
  lastSyncTime?: Date;
  dataProcessed: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  uptime: number; // percentage
  alertsGenerated: number;
  incidentsCreated: number;
}

export interface IntegrationEvent {
  id: string;
  integrationId: string;
  eventType: 'sync' | 'error' | 'warning' | 'info';
  message: string;
  details?: any;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface IntegrationTemplate {
  id: string;
  name: string;
  vendor: string;
  type: IntegrationType;
  description: string;
  icon?: string;
  configurationSchema: {
    fields: ConfigField[];
    validationRules?: ValidationRule[];
  };
  supportedFeatures: string[];
  documentation: string;
  category: string;
  popularity: number;
  isRecommended: boolean;
}

export interface ConfigField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'select' | 'number' | 'boolean' | 'json';
  required: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    message?: string;
  };
  helpText?: string;
  dependsOn?: {
    field: string;
    value: any;
  };
}

export interface ValidationRule {
  field: string;
  rule: 'required' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any, config: IntegrationConfig) => boolean;
}

export interface IntegrationTestResult {
  success: boolean;
  message: string;
  details?: {
    connectivity: boolean;
    authentication: boolean;
    permissions: boolean;
    dataAccess: boolean;
  };
  timestamp: Date;
  duration: number; // in ms
  errors?: string[];
}