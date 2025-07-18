import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, AlertTriangle, Loader2 } from 'lucide-react';

export type ConnectionState = 'connected' | 'disconnected' | 'error' | 'connecting' | 'reconnecting';

export interface ConnectionStatusProps {
  status: ConnectionState;
  message?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function ConnectionStatus({
  status,
  message,
  showLabel = true,
  size = 'md',
  animated = true,
  onRetry,
  className = ''
}: ConnectionStatusProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animated && (status === 'connecting' || status === 'reconnecting')) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [status, animated]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'text-sm',
          icon: 'w-4 h-4',
          dot: 'w-2 h-2'
        };
      case 'lg':
        return {
          container: 'text-lg',
          icon: 'w-6 h-6',
          dot: 'w-4 h-4'
        };
      default:
        return {
          container: 'text-base',
          icon: 'w-5 h-5',
          dot: 'w-3 h-3'
        };
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: <Wifi className={getSizeClasses().icon} />,
          label: 'Connected',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          borderColor: 'border-green-300 dark:border-green-700',
          dotColor: 'bg-green-600 dark:bg-green-400'
        };
      case 'disconnected':
        return {
          icon: <WifiOff className={getSizeClasses().icon} />,
          label: 'Disconnected',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-900/30',
          borderColor: 'border-gray-300 dark:border-gray-700',
          dotColor: 'bg-gray-600 dark:bg-gray-400'
        };
      case 'error':
        return {
          icon: <AlertTriangle className={getSizeClasses().icon} />,
          label: 'Connection Error',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          borderColor: 'border-red-300 dark:border-red-700',
          dotColor: 'bg-red-600 dark:bg-red-400'
        };
      case 'connecting':
        return {
          icon: <Loader2 className={`${getSizeClasses().icon} animate-spin`} />,
          label: 'Connecting...',
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          borderColor: 'border-blue-300 dark:border-blue-700',
          dotColor: 'bg-blue-600 dark:bg-blue-400'
        };
      case 'reconnecting':
        return {
          icon: <Loader2 className={`${getSizeClasses().icon} animate-spin`} />,
          label: 'Reconnecting...',
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          borderColor: 'border-yellow-300 dark:border-yellow-700',
          dotColor: 'bg-yellow-600 dark:bg-yellow-400'
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300
                  ${config.bgColor} ${config.borderColor} ${sizeClasses.container}`}
      >
        <div className="relative">
          {/* Animated pulse dot */}
          {isAnimating && (
            <div className={`absolute inset-0 flex items-center justify-center`}>
              <div className={`${sizeClasses.dot} ${config.dotColor} rounded-full animate-ping`} />
            </div>
          )}
          
          {/* Status icon */}
          <div className={config.color}>
            {config.icon}
          </div>
        </div>
        
        {showLabel && (
          <span className={`font-medium ${config.color}`}>
            {message || config.label}
          </span>
        )}
      </div>
      
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                    ${config.color} ${config.bgColor} hover:opacity-80
                    border ${config.borderColor}`}
        >
          Retry
        </button>
      )}
    </div>
  );
}

// Standalone component with automatic connection monitoring
export interface AutoConnectionStatusProps {
  checkInterval?: number;
  endpoint?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AutoConnectionStatus({
  checkInterval = 5000,
  endpoint = '/api/health',
  showLabel = true,
  size = 'md',
  className = ''
}: AutoConnectionStatusProps) {
  const [status, setStatus] = useState<ConnectionState>('connecting');
  const [retryCount, setRetryCount] = useState(0);

  const checkConnection = async () => {
    try {
      const response = await fetch(endpoint, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      if (response.ok) {
        setStatus('connected');
        setRetryCount(0);
      } else {
        setStatus('error');
      }
    } catch (error) {
      if (retryCount > 2) {
        setStatus('disconnected');
      } else {
        setStatus('reconnecting');
        setRetryCount(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, checkInterval);
    
    return () => clearInterval(interval);
  }, [checkInterval, endpoint, retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    setStatus('connecting');
    checkConnection();
  };

  return (
    <ConnectionStatus
      status={status}
      showLabel={showLabel}
      size={size}
      onRetry={status === 'error' || status === 'disconnected' ? handleRetry : undefined}
      className={className}
    />
  );
}

// Demo component showing all states
export default function ConnectionStatusDemo() {
  const [currentStatus, setCurrentStatus] = useState<ConnectionState>('connected');

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Connection Status Examples
        </h3>
        
        <div className="grid gap-4">
          <ConnectionStatus status="connected" />
          <ConnectionStatus status="connecting" />
          <ConnectionStatus status="reconnecting" />
          <ConnectionStatus status="error" onRetry={() => console.log('Retry clicked')} />
          <ConnectionStatus status="disconnected" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Size Variations
        </h3>
        
        <div className="flex items-center gap-4">
          <ConnectionStatus status="connected" size="sm" />
          <ConnectionStatus status="connected" size="md" />
          <ConnectionStatus status="connected" size="lg" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Interactive Demo
        </h3>
        
        <div className="flex items-center gap-4">
          <ConnectionStatus status={currentStatus} />
          
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value as ConnectionState)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="connected">Connected</option>
            <option value="connecting">Connecting</option>
            <option value="reconnecting">Reconnecting</option>
            <option value="error">Error</option>
            <option value="disconnected">Disconnected</option>
          </select>
        </div>
      </div>
    </div>
  );
}