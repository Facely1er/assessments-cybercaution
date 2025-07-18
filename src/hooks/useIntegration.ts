// hooks/useIntegrations.ts
import { useState, useEffect, useCallback } from 'react';
import { Integration, IntegrationHealth } from '../components/shared/IntegrationStatus';
import { DataSource } from '../components/shared/DataSourceIndicator';

export interface IntegrationConfig {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  apiKey?: string;
  settings?: Record<string, any>;
}

export interface UseIntegrationsReturn {
  integrations: Integration[];
  dataSources: DataSource[];
  isLoading: boolean;
  error: string | null;
  addIntegration: (config: IntegrationConfig) => Promise<void>;
  removeIntegration: (id: string) => Promise<void>;
  updateIntegration: (id: string, config: Partial<IntegrationConfig>) => Promise<void>;
  refreshIntegration: (id: string) => Promise<void>;
  testConnection: (config: IntegrationConfig) => Promise<boolean>;
  getIntegrationData: (id: string, query?: any) => Promise<any>;
}

// Mock API functions - Replace with actual API calls
const mockApi = {
  fetchIntegrations: async (): Promise<Integration[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'splunk-001',
        name: 'Splunk Enterprise',
        type: 'SIEM',
        health: 'healthy' as IntegrationHealth,
        lastSync: new Date(Date.now() - 300000), // 5 minutes ago
        nextSync: new Date(Date.now() + 300000), // in 5 minutes
        metrics: {
          dataPointsProcessed: 125430,
          lastSyncDuration: 23,
          errorRate: 0.2,
          uptime: 99.8
        }
      },
      {
        id: 'crowdstrike-001',
        name: 'CrowdStrike Falcon',
        type: 'EDR',
        health: 'warning' as IntegrationHealth,
        lastSync: new Date(Date.now() - 600000), // 10 minutes ago
        message: 'High API response time detected',
        metrics: {
          dataPointsProcessed: 87650,
          lastSyncDuration: 45,
          errorRate: 2.1,
          uptime: 98.5
        }
      }
    ];
  },
  
  addIntegration: async (config: IntegrationConfig): Promise<Integration> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: config.id,
      name: config.name,
      type: config.type,
      health: 'syncing' as IntegrationHealth,
      message: 'Initial synchronization in progress'
    };
  },
  
  testConnection: async (config: IntegrationConfig): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return Math.random() > 0.2; // 80% success rate for demo
  }
};

export const useIntegrations = (): UseIntegrationsReturn => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load integrations on mount
  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await mockApi.fetchIntegrations();
      setIntegrations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load integrations');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert integrations to data sources
  const dataSources: DataSource[] = integrations.map(integration => ({
    type: integration.type.toLowerCase() as DataSource['type'],
    name: integration.name,
    status: integration.health === 'healthy' ? 'active' : 
            integration.health === 'warning' ? 'warning' :
            integration.health === 'error' ? 'error' : 'inactive',
    lastDataReceived: integration.lastSync ? new Date(integration.lastSync) : undefined
  }));

  const addIntegration = useCallback(async (config: IntegrationConfig) => {
    try {
      const newIntegration = await mockApi.addIntegration(config);
      setIntegrations(prev => [...prev, newIntegration]);
      
      // Simulate connection establishment
      setTimeout(() => {
        setIntegrations(prev => prev.map(int => 
          int.id === newIntegration.id 
            ? { ...int, health: 'healthy' as IntegrationHealth, message: undefined }
            : int
        ));
      }, 3000);
    } catch (err) {
      throw new Error('Failed to add integration');
    }
  }, []);

  const removeIntegration = useCallback(async (id: string) => {
    setIntegrations(prev => prev.filter(int => int.id !== id));
  }, []);

  const updateIntegration = useCallback(async (id: string, config: Partial<IntegrationConfig>) => {
    setIntegrations(prev => prev.map(int => 
      int.id === id 
        ? { ...int, ...config, health: 'syncing' as IntegrationHealth }
        : int
    ));
    
    // Simulate update completion
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === id 
          ? { ...int, health: 'healthy' as IntegrationHealth }
          : int
      ));
    }, 2000);
  }, []);

  const refreshIntegration = useCallback(async (id: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === id 
        ? { ...int, health: 'syncing' as IntegrationHealth }
        : int
    ));
    
    // Simulate refresh
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === id 
          ? { 
              ...int, 
              health: 'healthy' as IntegrationHealth,
              lastSync: new Date()
            }
          : int
      ));
    }, 1500);
  }, []);

  const testConnection = useCallback(async (config: IntegrationConfig): Promise<boolean> => {
    return await mockApi.testConnection(config);
  }, []);

  const getIntegrationData = useCallback(async (id: string, query?: any): Promise<any> => {
    // Simulate fetching data from integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id,
      timestamp: new Date(),
      data: {
        events: Math.floor(Math.random() * 1000),
        alerts: Math.floor(Math.random() * 50),
        threats: Math.floor(Math.random() * 10)
      },
      query
    };
  }, []);

  return {
    integrations,
    dataSources,
    isLoading,
    error,
    addIntegration,
    removeIntegration,
    updateIntegration,
    refreshIntegration,
    testConnection,
    getIntegrationData
  };
};