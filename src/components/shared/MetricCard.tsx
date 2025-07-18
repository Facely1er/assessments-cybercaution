import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

export type MetricType = 'number' | 'percentage' | 'currency' | 'duration' | 'score';
export type TrendDirection = 'up' | 'down' | 'neutral';
export type MetricStatus = 'success' | 'warning' | 'danger' | 'neutral';

export interface MetricCardProps {
  title: string;
  value: number | string;
  type?: MetricType;
  trend?: {
    value: number;
    direction: TrendDirection;
    isPositive?: boolean;
  };
  status?: MetricStatus;
  subtitle?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  type = 'number',
  trend,
  status = 'neutral',
  subtitle,
  icon,
  loading = false,
  className = '',
  onClick
}: MetricCardProps) {
  const formatValue = (val: number | string, metricType: MetricType): string => {
    if (typeof val === 'string') return val;
    
    switch (metricType) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'duration':
        if (val < 60) return `${val}s`;
        if (val < 3600) return `${Math.floor(val / 60)}m`;
        return `${Math.floor(val / 3600)}h`;
      case 'score':
        return val.toFixed(1);
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    const iconClass = `w-4 h-4 ${
      trend.isPositive 
        ? 'text-green-600 dark:text-green-400' 
        : 'text-red-600 dark:text-red-400'
    }`;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className={iconClass} />;
      case 'down':
        return <TrendingDown className={iconClass} />;
      default:
        return <Minus className={iconClass} />;
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      case 'danger':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  const getValueColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-900 dark:text-green-100';
      case 'warning':
        return 'text-yellow-900 dark:text-yellow-100';
      case 'danger':
        return 'text-red-900 dark:text-red-100';
      default:
        return 'text-gray-900 dark:text-gray-100';
    }
  };

  if (loading) {
    return (
      <div className={`p-6 rounded-lg border ${getStatusStyles()} ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          {subtitle && <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-lg border transition-all duration-200 ${getStatusStyles()} 
                ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <div className="text-gray-500 dark:text-gray-400">
                {icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </h3>
          </div>
          
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-bold ${getValueColor()}`}>
              {formatValue(value, type)}
            </p>
            
            {trend && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={`text-sm font-medium ${
                  trend.isPositive 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {trend.value}%
                </span>
              </div>
            )}
          </div>
          
          {subtitle && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        {status === 'warning' && (
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
        )}
        {status === 'danger' && (
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}

// Example usage with different metric types
export default function MetricCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <MetricCard
        title="Total Revenue"
        value={1234567}
        type="currency"
        trend={{ value: 12.5, direction: 'up', isPositive: true }}
        status="success"
        subtitle="Last 30 days"
      />
      
      <MetricCard
        title="Security Score"
        value={85.7}
        type="score"
        trend={{ value: 5.2, direction: 'up', isPositive: true }}
        status="success"
        subtitle="Out of 100"
      />
      
      <MetricCard
        title="Compliance Rate"
        value={78}
        type="percentage"
        trend={{ value: 3.1, direction: 'down', isPositive: false }}
        status="warning"
        subtitle="Below target"
      />
      
      <MetricCard
        title="Response Time"
        value={245}
        type="duration"
        trend={{ value: 15, direction: 'down', isPositive: true }}
        status="neutral"
        subtitle="Average"
      />
    </div>
  );
}