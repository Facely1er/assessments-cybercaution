// components/shared/DataSourceIndicator.tsx
import React from 'react';
import { 
  Shield, 
  Server, 
  Lock, 
  Cloud, 
  Users, 
  AlertTriangle, 
  Database,
  Settings,
  Activity,
  XCircle,
  Clock,
  LucideIcon
} from 'lucide-react';

export interface DataSource {
  type: 'siem' | 'edr' | 'firewall' | 'cloud' | 'identity' | 'vulnerability' | 'logs' | 'custom';
  name: string;
  status?: 'active' | 'error' | 'warning' | 'inactive';
  endpoint?: string;
  lastDataReceived?: Date;
}

export interface DataSourceIndicatorProps {
  sources?: DataSource[];
  status?: 'active' | 'warning' | 'error' | 'inactive';
  lastSync?: Date | string;
  className?: string;
}

const sourceIcons: Record<string, { icon: LucideIcon; label: string }> = {
  siem: { icon: Shield, label: 'SIEM' },
  edr: { icon: Server, label: 'EDR' },
  firewall: { icon: Lock, label: 'Firewall' },
  cloud: { icon: Cloud, label: 'Cloud' },
  identity: { icon: Users, label: 'Identity' },
  vulnerability: { icon: AlertTriangle, label: 'Vulnerability' },
  logs: { icon: Database, label: 'Logs' },
  custom: { icon: Settings, label: 'Custom' }
};

const statusColors: Record<string, string> = {
  active: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  inactive: 'text-gray-400'
};

export const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({ 
  sources = [], 
  status = 'active', 
  lastSync,
  className = ''
}) => {
  const formatLastSync = (sync: Date | string | undefined): string => {
    if (!sync) return 'Never';
    const date = typeof sync === 'string' ? new Date(sync) : sync;
    return date.toLocaleString();
  };

  return (
    <div className={`bg-white p-3 rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">Data Sources</span>
        <span className={`flex items-center gap-1 text-xs ${statusColors[status]}`}>
          <Activity className="w-3 h-3" />
          {status}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, index) => {
          const SourceIcon = sourceIcons[source.type]?.icon || Database;
          const sourceStatus = source.status || 'active';
          
          return (
            <div
              key={`${source.type}-${source.name}-${index}`}
              className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs"
              title={`${sourceIcons[source.type]?.label || source.type}: ${source.name}`}
            >
              <SourceIcon className="w-3 h-3 text-gray-600" />
              <span className="text-gray-700">{source.name}</span>
              {sourceStatus === 'error' && (
                <XCircle className="w-3 h-3 text-red-500" />
              )}
            </div>
          );
        })}
      </div>
      {lastSync && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          Last sync: {formatLastSync(lastSync)}
        </div>
      )}
    </div>
  );
};