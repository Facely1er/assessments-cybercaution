import React, { useState, useEffect } from 'react';
import { 
  Link2, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Zap,
  Lock,
  Cloud,
  Database,
  Server,
  GitBranch,
  Settings,
  ChevronRight,
  Circle,
  Workflow,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Shield
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import ToolTemplate from './ToolTemplate';

interface Integration {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'available' | 'pending' | 'error';
  icon: string;
  description: string;
  config?: {
    endpoint?: string;
    apiKey?: string;
    lastSync?: Date;
    syncInterval?: number;
    dataPoints?: number;
  };
}

interface ConnectionLog {
  id: string;
  integrationId: string;
  timestamp: Date;
  action: string;
  status: 'success' | 'error' | 'warning';
  message: string;
}

const IntegrationHub: React.FC = () => {
  // State Management
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [connectionLogs, setConnectionLogs] = useState<ConnectionLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [configModal, setConfigModal] = useState<{open: boolean; integration: Integration | null}>({
    open: false,
    integration: null
  });
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [syncingIntegration, setSyncingIntegration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for configuration
  const [configForm, setConfigForm] = useState({
    endpoint: '',
    apiKey: '',
    syncInterval: 5
  });

  // Initialize Supabase client
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || '',
    process.env.REACT_APP_SUPABASE_ANON_KEY || ''
  );

  // Initialize with default integrations
  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to load from Supabase first
      const { data: dbIntegrations, error: dbError } = await supabase
        .from('integrations')
        .select('*')
        .order('name');

      if (dbError) {
        console.warn('Failed to load from Supabase, using local storage:', dbError);
        loadFromLocalStorage();
      } else if (dbIntegrations && dbIntegrations.length > 0) {
        setIntegrations(dbIntegrations);
        // Also load logs from Supabase
        const { data: dbLogs } = await supabase
          .from('integration_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);
        
        if (dbLogs) {
          setConnectionLogs(dbLogs);
        }
      } else {
        // No data in Supabase, load defaults
        loadFromLocalStorage();
      }
    } catch (err) {
      console.error('Error loading integrations:', err);
      loadFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const defaultIntegrations: Integration[] = [
      {
        id: 'splunk',
        name: 'Splunk',
        category: 'SIEM',
        status: 'available',
        icon: 'Database',
        description: 'Real-time security event correlation and analysis'
      },
      {
        id: 'crowdstrike',
        name: 'CrowdStrike Falcon',
        category: 'EDR',
        status: 'available',
        icon: 'Shield',
        description: 'Endpoint detection and response platform'
      },
      {
        id: 'sentinel',
        name: 'Microsoft Sentinel',
        category: 'SIEM',
        status: 'available',
        icon: 'Cloud',
        description: 'Cloud-native SIEM with AI-driven insights'
      },
      {
        id: 'paloalto',
        name: 'Palo Alto Cortex',
        category: 'XDR',
        status: 'available',
        icon: 'Server',
        description: 'Extended detection and response platform'
      }
    ];

    const savedIntegrations = localStorage.getItem('cybercaution_integrations');
    const savedLogs = localStorage.getItem('cybercaution_logs');
    
    if (savedIntegrations) {
      setIntegrations(JSON.parse(savedIntegrations));
    } else {
      setIntegrations(defaultIntegrations);
    }
    
    if (savedLogs) {
      setConnectionLogs(JSON.parse(savedLogs));
    }
  };

  // Save to localStorage and attempt Supabase sync
  const saveIntegrations = async (newIntegrations: Integration[]) => {
    setIntegrations(newIntegrations);
    localStorage.setItem('cybercaution_integrations', JSON.stringify(newIntegrations));
    
    // Try to sync with Supabase
    try {
      for (const integration of newIntegrations) {
        await supabase.from('integrations').upsert({
          ...integration,
          updated_at: new Date().toISOString()
        });
      }
    } catch (err) {
      console.warn('Failed to sync with Supabase:', err);
    }
  };

  const saveLogs = async (newLogs: ConnectionLog[]) => {
    setConnectionLogs(newLogs);
    localStorage.setItem('cybercaution_logs', JSON.stringify(newLogs));
    
    // Try to sync latest log with Supabase
    if (newLogs.length > 0) {
      try {
        await supabase.from('integration_logs').insert(newLogs[0]);
      } catch (err) {
        console.warn('Failed to sync log with Supabase:', err);
      }
    }
  };

  // Simulate periodic sync for connected integrations
  useEffect(() => {
    const interval = setInterval(() => {
      integrations.forEach(integration => {
        if (integration.status === 'connected' && integration.config?.syncInterval) {
          const lastSync = new Date(integration.config.lastSync || new Date());
          const now = new Date();
          const minutesSinceSync = (now.getTime() - lastSync.getTime()) / 60000;
          
          if (minutesSinceSync >= integration.config.syncInterval) {
            performSync(integration.id);
          }
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [integrations]);

  const addLog = (integrationId: string, action: string, status: 'success' | 'error' | 'warning', message: string) => {
    const newLog: ConnectionLog = {
      id: Date.now().toString(),
      integrationId,
      timestamp: new Date(),
      action,
      status,
      message
    };
    saveLogs([newLog, ...connectionLogs].slice(0, 100)); // Keep last 100 logs
  };

  const testConnection = async (integration: Integration) => {
    setTestingConnection(integration.id);
    
    // Simulate API connection test
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        addLog(integration.id, 'Connection Test', 'success', `Successfully connected to ${integration.name}`);
        alert(`Connection to ${integration.name} successful!`);
      } else {
        addLog(integration.id, 'Connection Test', 'error', `Failed to connect to ${integration.name}: Connection timeout`);
        alert(`Failed to connect to ${integration.name}`);
      }
      
      setTestingConnection(null);
    }, 2000);
  };

  const performSync = async (integrationId: string) => {
    setSyncingIntegration(integrationId);
    
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    // Simulate data sync
    setTimeout(() => {
      const newDataPoints = Math.floor(Math.random() * 1000) + 100;
      
      const updatedIntegrations = integrations.map(i => {
        if (i.id === integrationId && i.config) {
          return {
            ...i,
            config: {
              ...i.config,
              lastSync: new Date(),
              dataPoints: (i.config.dataPoints || 0) + newDataPoints
            }
          };
        }
        return i;
      });
      
      saveIntegrations(updatedIntegrations);
      addLog(integrationId, 'Data Sync', 'success', `Synced ${newDataPoints} new data points from ${integration.name}`);
      setSyncingIntegration(null);
    }, 3000);
  };

  const saveConfiguration = () => {
    if (!configModal.integration) return;
    
    const integration = configModal.integration;
    
    // Validate inputs
    if (!configForm.endpoint || !configForm.apiKey) {
      alert('Please fill in all required fields');
      return;
    }

    // Update integration
    const updatedIntegrations = integrations.map(i => {
      if (i.id === integration.id) {
        return {
          ...i,
          status: 'connected' as const,
          config: {
            endpoint: configForm.endpoint,
            apiKey: configForm.apiKey,
            syncInterval: configForm.syncInterval,
            lastSync: new Date(),
            dataPoints: 0
          }
        };
      }
      return i;
    });
    
    saveIntegrations(updatedIntegrations);
    addLog(integration.id, 'Configuration', 'success', `${integration.name} configured successfully`);
    
    // Close modal and reset form
    setConfigModal({ open: false, integration: null });
    setConfigForm({ endpoint: '', apiKey: '', syncInterval: 5 });
  };

  const disconnectIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    
    const updatedIntegrations = integrations.map(i => {
      if (i.id === integrationId) {
        const { config, ...rest } = i;
        return { ...rest, status: 'available' as const };
      }
      return i;
    });
    
    saveIntegrations(updatedIntegrations);
    
    if (integration) {
      addLog(integrationId, 'Disconnection', 'warning', `${integration.name} disconnected`);
    }
  };

  const openConfigModal = (integration: Integration) => {
    setConfigModal({ open: true, integration });
    if (integration.config) {
      setConfigForm({
        endpoint: integration.config.endpoint || '',
        apiKey: integration.config.apiKey || '',
        syncInterval: integration.config.syncInterval || 5
      });
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Database: <Database className="w-6 h-6" />,
      Shield: <Shield className="w-6 h-6" />,
      Cloud: <Cloud className="w-6 h-6" />,
      Server: <Server className="w-6 h-6" />,
      Workflow: <Workflow className="w-6 h-6" />
    };
    return icons[iconName] || <Activity className="w-6 h-6" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 dark:text-green-400';
      case 'available': return 'text-blue-600 dark:text-blue-400';
      case 'pending': return 'text-yellow-600 dark:text-yellow-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle2 className="w-5 h-5" />;
      case 'available': return <Circle className="w-5 h-5" />;
      case 'pending': return <RefreshCw className="w-5 h-5 animate-spin" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const categories = ['all', 'SIEM', 'SOAR', 'EDR', 'XDR'];
  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const totalDataPoints = connectedIntegrations.reduce((sum, i) => sum + (i.config?.dataPoints || 0), 0);

  return (
    <ToolTemplate
      title="Integration Hub"
      description="Connect and orchestrate your existing security tools"
      icon={<Link2 />}
      toolId="integration-hub"
      showConnectionStatus={true}
      isLoading={isLoading}
      error={error}
    >
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connected Tools</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{connectedIntegrations.length}</p>
            </div>
            <Link2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Data Points</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDataPoints.toLocaleString()}</p>
            </div>
            <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Syncs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{syncingIntegration ? 1 : 0}</p>
            </div>
            <RefreshCw className={`w-8 h-8 ${syncingIntegration ? 'text-yellow-600 dark:text-yellow-400 animate-spin' : 'text-gray-400 dark:text-gray-600'}`} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent Logs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{connectionLogs.length}</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All Integrations' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                {getIcon(integration.icon)}
              </div>
              <div className={`flex items-center ${getStatusColor(integration.status)}`}>
                {syncingIntegration === integration.id ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  getStatusIcon(integration.status)
                )}
                <span className="ml-2 text-sm font-medium capitalize">
                  {integration.status}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{integration.description}</p>
            
            {integration.config && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-500">Last sync: {new Date(integration.config.lastSync || new Date()).toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Data points: {integration.config.dataPoints?.toLocaleString() || 0}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              {integration.status === 'connected' ? (
                <>
                  <button
                    onClick={() => performSync(integration.id)}
                    disabled={syncingIntegration === integration.id}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {syncingIntegration === integration.id ? 'Syncing...' : 'Sync Now'}
                  </button>
                  <button
                    onClick={() => openConfigModal(integration)}
                    className="p-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => disconnectIntegration(integration.id)}
                    className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded hover:bg-red-100 dark:hover:bg-red-900/40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openConfigModal(integration)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Configure
                  </button>
                  <button
                    onClick={() => testConnection(integration)}
                    disabled={testingConnection === integration.id}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                  >
                    {testingConnection === integration.id ? 'Testing...' : 'Test'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connection Logs</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {connectionLogs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No logs yet. Configure an integration to get started.</p>
          ) : (
            connectionLogs.map((log) => (
              <div key={log.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className={`mr-3 mt-0.5 ${
                  log.status === 'success' ? 'text-green-600 dark:text-green-400' : 
                  log.status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {log.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                   log.status === 'error' ? <AlertCircle className="w-5 h-5" /> :
                   <AlertCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{log.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{log.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      {configModal.open && configModal.integration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Configure {configModal.integration.name}
              </h3>
              <button
                onClick={() => setConfigModal({ open: false, integration: null })}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Endpoint *
                </label>
                <input
                  type="text"
                  value={configForm.endpoint}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, endpoint: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://api.example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key *
                </label>
                <input
                  type="password"
                  value={configForm.apiKey}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sync Interval (minutes)
                </label>
                <input
                  type="number"
                  value={configForm.syncInterval}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, syncInterval: parseInt(e.target.value) || 5 }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="60"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setConfigModal({ open: false, integration: null })}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveConfiguration}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </ToolTemplate>
  );
};

export default IntegrationHub;