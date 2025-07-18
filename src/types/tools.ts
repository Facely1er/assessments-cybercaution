/**
 * Tool and integration types for CyberCaution Security Orchestration & Governance Platform
 */

export type IntegrationType = 
  | 'SIEM'
  | 'EDR'
  | 'SOAR'
  | 'IDS/IPS'
  | 'Firewall'
  | 'VulnerabilityScanner'
  | 'CloudSecurity'
  | 'IdentityManagement'
  | 'ComplianceTool'
  | 'ThreatIntelligence'
  | 'LogManagement'
  | 'API'
  | 'Custom';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending';

export type WorkflowStatus = 'active' | 'inactive' | 'draft' | 'archived';

export type WidgetType = 
  | 'chart'
  | 'metric'
  | 'table'
  | 'list'
  | 'map'
  | 'timeline'
  | 'gauge'
  | 'alert'
  | 'custom';

export interface ToolConfig {
  id: string;
  name: string;
  type: IntegrationType;
  vendor?: string;
  version?: string;
  description?: string;
  icon?: string;
  status: IntegrationStatus;
  connectionDetails: {
    endpoint: string;
    authType: 'apiKey' | 'oauth2' | 'basic' | 'certificate' | 'custom';
    lastConnected?: Date;
    healthCheckInterval?: number;
  };
  capabilities: string[];
  configuration: Record<string, any>;
  metadata?: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    tags?: string[];
  };
}

export interface Integration {
  id: string;
  toolId: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  dataFlows: DataFlow[];
  errorLog?: IntegrationError[];
  statistics: {
    eventsProcessed: number;
    lastEventTime?: Date;
    averageLatency?: number;
    errorRate?: number;
  };
}

export interface DataFlow {
  id: string;
  sourceToolId: string;
  destinationToolId?: string;
  dataType: string;
  transformations?: DataTransformation[];
  schedule?: {
    type: 'realtime' | 'batch' | 'scheduled';
    interval?: string;
    lastRun?: Date;
    nextRun?: Date;
  };
}

export interface DataTransformation {
  id: string;
  type: 'filter' | 'map' | 'aggregate' | 'enrich' | 'custom';
  configuration: Record<string, any>;
  order: number;
}

export interface IntegrationError {
  timestamp: Date;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
  resolved?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  triggers: WorkflowTrigger[];
  steps: WorkflowStep[];
  variables?: Record<string, any>;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    version: number;
    tags?: string[];
  };
  performance?: {
    totalExecutions: number;
    successRate: number;
    averageDuration: number;
    lastExecution?: Date;
  };
}

export interface WorkflowTrigger {
  id: string;
  type: 'manual' | 'scheduled' | 'event' | 'webhook' | 'condition';
  configuration: {
    schedule?: string;
    eventType?: string;
    condition?: string;
    webhookUrl?: string;
  };
  enabled: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'action' | 'condition' | 'loop' | 'parallel' | 'wait';
  toolId?: string;
  action?: string;
  configuration: Record<string, any>;
  nextSteps: {
    onSuccess?: string;
    onFailure?: string;
    conditions?: Array<{
      condition: string;
      nextStepId: string;
    }>;
  };
  retryPolicy?: {
    maxAttempts: number;
    backoffStrategy: 'linear' | 'exponential';
    delay: number;
  };
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  configuration: {
    dataSource: string;
    visualization?: VisualizationConfig;
    filters?: FilterConfig[];
    refreshInterval?: number;
    thresholds?: ThresholdConfig[];
  };
  permissions?: {
    viewRoles: string[];
    editRoles: string[];
  };
}

export interface VisualizationConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'scatter' | 'heatmap';
  colors?: string[];
  legend?: boolean;
  axes?: {
    x?: AxisConfig;
    y?: AxisConfig;
  };
  customOptions?: Record<string, any>;
}

export interface AxisConfig {
  label?: string;
  type?: 'linear' | 'log' | 'time' | 'category';
  min?: number;
  max?: number;
  format?: string;
}

export interface FilterConfig {
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'between' | 'in';
  value: any;
  label?: string;
}

export interface ThresholdConfig {
  value: number;
  color: string;
  label?: string;
  alertEnabled?: boolean;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  type: 'access' | 'data' | 'network' | 'compliance' | 'custom';
  rules: PolicyRule[];
  scope: {
    tools?: string[];
    users?: string[];
    groups?: string[];
    resources?: string[];
  };
  enforcement: 'block' | 'alert' | 'monitor';
  priority: number;
  enabled: boolean;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    complianceFrameworks?: string[];
    tags?: string[];
  };
}

export interface PolicyRule {
  id: string;
  condition: string;
  action: 'allow' | 'deny' | 'alert' | 'log';
  exceptions?: string[];
  description?: string;
}