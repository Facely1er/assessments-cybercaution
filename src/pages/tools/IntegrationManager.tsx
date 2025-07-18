// src/pages/tools/IntegrationManager.tsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  Database,
  TrendingUp,
  Link2,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  Edit,
  Eye,
  Download,
  Upload
} from 'lucide-react';
import ToolTemplate from './ToolTemplate';
import {
  Integration,
  IntegrationType,
  ConnectionStatus,
  IntegrationStats,
  IntegrationTemplate,
  IntegrationConfig
} from '../../types/integrations';
import {
  getStatusColor,
  getIntegrationTypeIcon,
  calculateIntegrationHealth,
  generateIntegrationSummary,
  testIntegrationConnection,
  validateIntegrationConfig
} from '../../utils/integrationHelpers';

// Mock data generator
const generateMockIntegrations = (): Integration[] => {
  const now = new Date();
  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Splunk Enterprise',
      type: IntegrationType.SIEM,
      vendor: 'Splunk',
      description: 'Enterprise security information and event management',
      status: ConnectionStatus.CONNECTED,
      lastSync: new Date(now.getTime() - 15 * 60 * 1000), // 15 minutes ago
      config: {
        apiEndpoint: 'https://splunk.company.com:8089',
        apiKey: '********',
        syncInterval: 5
      },
      version: '9.0.1',
      supportedFeatures: ['log-ingestion', 'alerting', 'dashboards', 'reporting'],
      requiredPermissions: ['read_logs', 'create_alerts'],
      dataFlowDirection: 'bidirectional',
      createdAt: new Date('2024-01-15'),
      updatedAt: now,
      createdBy: 'admin@company.com',
      isActive: true,
      healthCheckUrl: 'https://splunk.company.com:8089/health',
      tags: ['production', 'critical']
    },
    {
      id: '2',
      name: 'CrowdStrike Falcon',
      type: IntegrationType.EDR,
      vendor: 'CrowdStrike',
      description: 'Endpoint detection and response platform',
      status: ConnectionStatus.CONNECTED,
      lastSync: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
      config: {
        apiEndpoint: 'https://api.crowdstrike.com',
        clientId: 'client123',
        clientSecret: '********',
        syncInterval: 10
      },
      version: '6.42.0',
      supportedFeatures: ['threat-detection', 'endpoint-visibility', 'incident-response'],
      requiredPermissions: ['read_detections', 'manage_hosts'],
      dataFlowDirection: 'inbound',
      createdAt: new Date('2024-02-01'),
      updatedAt: now,
      createdBy: 'security@company.com',
      isActive: true,
      tags: ['production', 'endpoints']
    },
    {
      id: '3',
      name: 'ServiceNow',
      type: IntegrationType.TICKETING,
      vendor: 'ServiceNow',
      description: 'IT service management and ticketing',
      status: ConnectionStatus.ERROR,
      lastSync: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      lastError: 'Authentication failed: Invalid credentials',
      config: {
        apiEndpoint: 'https://company.service-now.com',
        username: 'integration_user',
        password: '********',
        syncInterval: 15
      },
      version: 'Tokyo',
      supportedFeatures: ['ticket-creation', 'workflow-automation', 'cmdb-sync'],
      requiredPermissions: ['create_incident', 'read_cmdb'],
      dataFlowDirection: 'bidirectional',
      createdAt: new Date('2024-01-20'),
      updatedAt: now,
      createdBy: 'it-ops@company.com',
      isActive: true,
      tags: ['production', 'itsm']
    },
    {
      id: '4',
      name: 'Microsoft Azure AD',
      type: IntegrationType.IAM,
      vendor: 'Microsoft',
      description: 'Identity and access management',
      status: ConnectionStatus.CONNECTED,
      lastSync: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
      config: {
        apiEndpoint: 'https://graph.microsoft.com',
        tenantId: 'tenant123',
        clientId: 'app123',
        clientSecret: '********',
        syncInterval: 60
      },
      version: '2.0',
      supportedFeatures: ['user-sync', 'group-management', 'sso', 'mfa'],
      requiredPermissions: ['User.Read.All', 'Group.Read.All'],
      dataFlowDirection: 'inbound',
      createdAt: new Date('2024-01-10'),
      updatedAt: now,
      createdBy: 'admin@company.com',
      isActive: true,
      tags: ['production', 'identity']
    },
    {
      id: '5',
      name: 'Qualys VMDR',
      type: IntegrationType.VULNERABILITY_SCANNER,
      vendor: 'Qualys',
      description: 'Vulnerability management and scanning',
      status: ConnectionStatus.PENDING,
      config: {
        apiEndpoint: 'https://qualysapi.qualys.com',
        username: 'api_user',
        password: '********',
        syncInterval: 720 // 12 hours
      },
      version: '2.0',
      supportedFeatures: ['vulnerability-scanning', 'asset-discovery', 'reporting'],
      requiredPermissions: ['scan_assets', 'view_reports'],
      dataFlowDirection: 'inbound',
      createdAt: new Date('2024-03-01'),
      updatedAt: now,
      createdBy: 'security@company.com',
      isActive: false,
      tags: ['staging', 'vulnerability-management']
    }
  ];

  return integrations;
};

// Mock integration templates
const integrationTemplates: IntegrationTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Palo Alto Networks',
    vendor: 'Palo Alto',
    type: IntegrationType.NETWORK_MONITOR,
    description: 'Next-generation firewall and network security',
    icon: '🔥',
    configurationSchema: {
      fields: [
        {
          name: 'apiEndpoint',
          label: 'API Endpoint',
          type: 'text',
          required: true,
          placeholder: 'https://firewall.company.com',
          helpText: 'The base URL of your Palo Alto firewall'
        },
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          required: true,
          helpText: 'Generate from Device > Setup > Operations'
        }
      ]
    },
    supportedFeatures: ['traffic-monitoring', 'threat-prevention', 'url-filtering'],
    documentation: 'https://docs.paloaltonetworks.com/pan-os/10-2/pan-os-panorama-api',
    category: 'Network Security',
    popularity: 95,
    isRecommended: true
  },
  {
    id: 'tpl-2',
    name: 'Slack',
    vendor: 'Slack',
    type: IntegrationType.COMMUNICATION,
    description: 'Team communication and alerting',
    icon: '💬',
    configurationSchema: {
      fields: [
        {
          name: 'webhookUrl',
          label: 'Webhook URL',
          type: 'text',
          required: true,
          placeholder: 'https://hooks.slack.com/services/...',
          helpText: 'Create an incoming webhook in your Slack workspace'
        },
        {
          name: 'channel',
          label: 'Default Channel',
          type: 'text',
          required: false,
          placeholder: '#security-alerts',
          defaultValue: '#general'
        }
      ]
    },
    supportedFeatures: ['notifications', 'alerts', 'incident-updates'],
    documentation: 'https://api.slack.com/messaging/webhooks',
    category: 'Communication',
    popularity: 90,
    isRecommended: true
  }
];

const IntegrationManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<IntegrationType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ConnectionStatus | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<IntegrationStats | null>(null);

  useEffect(() => {
    // Load mock data
    const mockData = generateMockIntegrations();
    setIntegrations(mockData);
    
    // Calculate stats
    const mockStats = generateIntegrationSummary(mockData, []);
    setStats(mockStats);
  }, []);

  // Filter integrations based on search and filters
  const filteredIntegrations = useMemo(() => {
    return integrations.filter(integration => {
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          integration.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          integration.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || integration.type === filterType;
      const matchesStatus = filterStatus === 'all' || integration.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [integrations, searchQuery, filterType, filterStatus]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update last sync times
    const updatedIntegrations = integrations.map(integration => ({
      ...integration,
      lastSync: integration.status === ConnectionStatus.CONNECTED ? new Date() : integration.lastSync
    }));
    
    setIntegrations(updatedIntegrations);
    setIsRefreshing(false);
  };

  const handleTestConnection = async (integration: Integration) => {
    const result = await testIntegrationConnection(integration);
    console.log('Connection test result:', result);
    // Show result in a toast or modal
  };

  const handleDeleteIntegration = (id: string) => {
    if (window.confirm('Are you sure you want to delete this integration?')) {
      setIntegrations(integrations.filter(i => i.id !== id));
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: number;
    color?: string;
  }> = ({ title, value, icon, trend, color = 'blue' }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <TrendingUp className={`h-4 w-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ml-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      title="Integration Manager"
      description="Connect and manage your security tools in one unified platform"
      icon={<Link2 className="h-8 w-8 text-blue-600" />}
      toolId="integration-manager"
    >
      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Integrations"
            value={stats.totalIntegrations}
            icon={<Database className="h-6 w-6 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="Active Connections"
            value={stats.activeIntegrations}
            icon={<CheckCircle className="h-6 w-6 text-green-600" />}
            trend={12}
            color="green"
          />
          <StatCard
            title="Failed Connections"
            value={stats.failedIntegrations}
            icon={<XCircle className="h-6 w-6 text-red-600" />}
            color="red"
          />
          <StatCard
            title="System Uptime"
            value={`${stats.uptime}%`}
            icon={<Activity className="h-6 w-6 text-purple-600" />}
            trend={5}
            color="purple"
          />
        </div>
      )}

      {/* Actions Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as IntegrationType | 'all')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {Object.values(IntegrationType).map(type => (
                  <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ConnectionStatus | 'all')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {Object.values(ConnectionStatus).map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add Integration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integration List */}
      <div className="space-y-4">
        {filteredIntegrations.map(integration => (
          <div
            key={integration.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">
                    {getIntegrationTypeIcon(integration.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {integration.vendor} • {integration.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getStatusColor(integration.status) }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                        </span>
                      </div>
                      {integration.lastSync && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {integration.tags?.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {integration.lastError && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <p className="text-sm text-red-700 dark:text-red-300">
                            {integration.lastError}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {integration.isActive ? (
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Pause integration"
                    >
                      <Pause className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  ) : (
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Resume integration"
                    >
                      <Play className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleTestConnection(integration)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Test connection"
                  >
                    <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedIntegration(integration);
                      setShowConfigModal(true);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Configure"
                  >
                    <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteIntegration(integration.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No integrations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery || filterType !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by adding your first integration'}
          </p>
          {!searchQuery && filterType === 'all' && filterStatus === 'all' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Integration
            </button>
          )}
        </div>
      )}
    </ToolTemplate>
  );
};

export default IntegrationManager;