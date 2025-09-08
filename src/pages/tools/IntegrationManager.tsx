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
import { supabase } from '../../lib/supabase';
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

// Real integration data management
const fetchIntegrations = async (): Promise<Integration[]> => {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch integrations: ${error.message}`);
  }

  return data || [];
};

const createIntegration = async (integration: Omit<Integration, 'id' | 'createdAt' | 'updatedAt'>): Promise<Integration> => {
  const { data, error } = await supabase
    .from('integrations')
    .insert([{
      ...integration,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create integration: ${error.message}`);
  }

  return data;
};

const updateIntegration = async (id: string, updates: Partial<Integration>): Promise<Integration> => {
  const { data, error } = await supabase
    .from('integrations')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update integration: ${error.message}`);
  }

  return data;
};

const deleteIntegration = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('integrations')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete integration: ${error.message}`);
  }
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<IntegrationStats | null>(null);

  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        setIsLoading(true);
        const integrationsData = await fetchIntegrations();
        setIntegrations(integrationsData);
        
        // Calculate stats
        const integrationStats = generateIntegrationSummary(integrationsData, []);
        setStats(integrationStats);
      } catch (error) {
        setError('Failed to load integrations. Please try again.');
        console.error('Integration loading error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIntegrations();
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
    try {
      const integrationsData = await fetchIntegrations();
      setIntegrations(integrationsData);
      
      // Update stats
      const integrationStats = generateIntegrationSummary(integrationsData, []);
      setStats(integrationStats);
    } catch (error) {
      setError('Failed to refresh integrations. Please try again.');
      console.error('Integration refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTestConnection = async (integration: Integration) => {
    const result = await testIntegrationConnection(integration);
    console.log('Connection test result:', result);
    // Show result in a toast or modal
  };

  const handleDeleteIntegration = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this integration?')) {
      try {
        await deleteIntegration(id);
        setIntegrations(integrations.filter(i => i.id !== id));
        
        // Update stats
        const updatedIntegrations = integrations.filter(i => i.id !== id);
        const integrationStats = generateIntegrationSummary(updatedIntegrations, []);
        setStats(integrationStats);
      } catch (error) {
        setError('Failed to delete integration. Please try again.');
        console.error('Integration deletion error:', error);
      }
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
      isLoading={isLoading}
      error={error}
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