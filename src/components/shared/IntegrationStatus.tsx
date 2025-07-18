// components/shared/IntegrationStatus.tsx
import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock,
  Activity,
  RefreshCw,
  Settings,
  BarChart3
} from 'lucide-react';

export type IntegrationHealth = 'healthy' | 'warning' | 'error' | 'offline' | 'syncing';

export interface IntegrationMetrics {
  dataPointsProcessed?: number;
  lastSyncDuration?: number; // in seconds
  errorRate?: number; // percentage
  uptime?: number; // percentage
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  health: IntegrationHealth;
  lastSync?: Date | string;
  nextSync?: Date | string;
  metrics?: IntegrationMetrics;
  message?: string;
}

export interface IntegrationStatusProps {
  integrations: Integration[];
  showMetrics?: boolean;
  onRefresh?: (integrationId: string) => void;
  onConfigure?: (integrationId: string) => void;
  className?: string;
}

const healthConfig: Record<IntegrationHealth, { icon: React.FC<any>; color: string; bgColor: string }> = {
  healthy: { 
    icon: CheckCircle, 
    color: 'text-green-600', 
    bgColor: 'bg-green-50' 
  },
  warning: { 
    icon: AlertCircle, 
    color: 'text-yellow-600', 
    bgColor: 'bg-yellow-50' 
  },
  error: { 
    icon: XCircle, 
    color: 'text-red-600', 
    bgColor: 'bg-red-50' 
  },
  offline: { 
    icon: XCircle, 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-50' 
  },
  syncing: { 
    icon: RefreshCw, 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-50' 
  }
};

export const IntegrationStatus: React.FC<IntegrationStatusProps> = ({
  integrations,
  showMetrics = false,
  onRefresh,
  onConfigure,
  className = ''
}) => {
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'Never';
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString();
  };

  const formatMetricValue = (value: number | undefined, suffix: string = ''): string => {
    if (value === undefined) return 'N/A';
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M${suffix}`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K${suffix}`;
    return `${value}${suffix}`;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {integrations.map((integration) => {
        const config = healthConfig[integration.health];
        const HealthIcon = config.icon;

        return (
          <div
            key={integration.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <HealthIcon className={`w-5 h-5 ${config.color} ${
                    integration.health === 'syncing' ? 'animate-spin' : ''
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{integration.name}</h4>
                  <p className="text-sm text-gray-600">{integration.type}</p>
                  {integration.message && (
                    <p className="text-sm text-gray-500 mt-1">{integration.message}</p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Last sync: {formatDate(integration.lastSync)}</span>
                    </div>
                    {integration.nextSync && (
                      <div className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        <span>Next: {formatDate(integration.nextSync)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {onRefresh && (
                  <button
                    onClick={() => onRefresh(integration.id)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                    title="Refresh integration"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                {onConfigure && (
                  <button
                    onClick={() => onConfigure(integration.id)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                    title="Configure integration"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {showMetrics && integration.metrics && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-gray-500">Data Points</div>
                    <div className="font-medium text-gray-900 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {formatMetricValue(integration.metrics.dataPointsProcessed)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Sync Time</div>
                    <div className="font-medium text-gray-900">
                      {integration.metrics.lastSyncDuration ? 
                        `${integration.metrics.lastSyncDuration}s` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Error Rate</div>
                    <div className={`font-medium ${
                      (integration.metrics.errorRate || 0) > 5 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {formatMetricValue(integration.metrics.errorRate, '%')}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Uptime</div>
                    <div className={`font-medium ${
                      (integration.metrics.uptime || 0) < 95 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {formatMetricValue(integration.metrics.uptime, '%')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};