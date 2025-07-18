// components/shared/RiskGauge.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type GaugeSize = 'sm' | 'md' | 'lg' | 'xl';

export interface RiskGaugeProps {
  value: number;
  maxValue?: number;
  label?: string;
  size?: GaugeSize;
  showTrend?: boolean;
  trendValue?: number;
  trendPeriod?: string;
  thresholds?: {
    low: number;
    medium: number;
    high: number;
  };
  className?: string;
}

const sizeConfig: Record<GaugeSize, { width: number; height: number; strokeWidth: number; fontSize: string }> = {
  sm: { width: 100, height: 60, strokeWidth: 8, fontSize: 'text-sm' },
  md: { width: 150, height: 90, strokeWidth: 10, fontSize: 'text-base' },
  lg: { width: 200, height: 120, strokeWidth: 12, fontSize: 'text-lg' },
  xl: { width: 250, height: 150, strokeWidth: 14, fontSize: 'text-xl' }
};

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  value = 0,
  maxValue = 100,
  label = 'Risk Score',
  size = 'md',
  showTrend = false,
  trendValue = 0,
  trendPeriod = '7d',
  thresholds = {
    low: 30,
    medium: 60,
    high: 85
  },
  className = ''
}) => {
  const config = sizeConfig[size];
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  // Calculate arc parameters
  const centerX = config.width / 2;
  const centerY = config.height - 20;
  const radius = Math.min(centerX, centerY) - config.strokeWidth / 2 - 10;
  
  // Convert percentage to angle (180 degree arc)
  const angle = (percentage / 100) * 180;
  const angleRad = (angle - 90) * (Math.PI / 180);
  
  // Calculate end point of arc
  const endX = centerX + radius * Math.cos(angleRad);
  const endY = centerY + radius * Math.sin(angleRad);
  
  // Create arc path
  const largeArcFlag = angle > 180 ? 1 : 0;
  const arcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  
  // Determine color based on value and thresholds
  const getColor = (): string => {
    if (value <= thresholds.low) return '#10b981'; // green
    if (value <= thresholds.medium) return '#f59e0b'; // yellow
    if (value <= thresholds.high) return '#ef4444'; // red
    return '#991b1b'; // dark red
  };
  
  const getTrendIcon = () => {
    if (trendValue > 0) return <TrendingUp className="w-4 h-4" />;
    if (trendValue < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };
  
  const getTrendColor = () => {
    if (trendValue > 0) return 'text-red-600';
    if (trendValue < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Threshold markers */}
        {[thresholds.low, thresholds.medium, thresholds.high].map((threshold, index) => {
          const thresholdAngle = (threshold / maxValue) * 180;
          const thresholdRad = (thresholdAngle - 90) * (Math.PI / 180);
          const markerX = centerX + (radius - config.strokeWidth) * Math.cos(thresholdRad);
          const markerY = centerY + (radius - config.strokeWidth) * Math.sin(thresholdRad);
          
          return (
            <circle
              key={index}
              cx={markerX}
              cy={markerY}
              r={2}
              fill="#6b7280"
            />
          );
        })}
        
        {/* Value arc */}
        <path
          d={arcPath}
          fill="none"
          stroke={getColor()}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        
        {/* Value text */}
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          className={`fill-gray-900 font-bold ${config.fontSize}`}
        >
          {Math.round(value)}
        </text>
        
        {/* Label */}
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          className="fill-gray-600 text-xs"
        >
          {label}
        </text>
      </svg>
      
      {/* Trend indicator */}
      {showTrend && (
        <div className={`flex items-center gap-1 mt-2 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm font-medium">
            {Math.abs(trendValue)}%
          </span>
          <span className="text-xs text-gray-500">
            ({trendPeriod})
          </span>
        </div>
      )}
    </div>
  );
};