import React, { useEffect, useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  BarChart, 
  PieChart, 
  AreaChart,
  Line,
  Bar,
  Pie,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface ChartTheme {
  gridColor: string;
  textColor: string;
  backgroundColor: string;
  tooltipBackgroundColor: string;
  tooltipBorderColor: string;
  colors: string[];
}

export interface ChartWrapperProps {
  type: ChartType;
  data: any[];
  dataKeys?: string[];
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  title?: string;
  loading?: boolean;
  colors?: string[];
}

// Default theme colors
const lightTheme: ChartTheme = {
  gridColor: '#e5e7eb',
  textColor: '#6b7280',
  backgroundColor: '#ffffff',
  tooltipBackgroundColor: '#ffffff',
  tooltipBorderColor: '#e5e7eb',
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']
};

const darkTheme: ChartTheme = {
  gridColor: '#374151',
  textColor: '#9ca3af',
  backgroundColor: '#1f2937',
  tooltipBackgroundColor: '#1f2937',
  tooltipBorderColor: '#374151',
  colors: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#f472b6', '#22d3ee', '#a3e635']
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="p-3 rounded-lg shadow-lg border"
        style={{
          backgroundColor: theme.tooltipBackgroundColor,
          borderColor: theme.tooltipBorderColor
        }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: theme.textColor }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartWrapper({
  type,
  data,
  dataKeys = [],
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className = '',
  title,
  loading = false,
  colors: customColors
}: ChartWrapperProps) {
  const [theme, setTheme] = useState<ChartTheme>(lightTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
      setTheme(isDark ? darkTheme : lightTheme);
    };

    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const chartColors = customColors || theme.colors;

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-48 w-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            )}
            <XAxis 
              dataKey={xAxisKey} 
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            <YAxis 
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            {showTooltip && (
              <Tooltip content={<CustomTooltip theme={theme} />} />
            )}
            {showLegend && (
              <Legend 
                wrapperStyle={{ color: theme.textColor }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={2}
                dot={{ fill: chartColors[index % chartColors.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            )}
            <XAxis 
              dataKey={xAxisKey} 
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            <YAxis 
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            {showTooltip && (
              <Tooltip content={<CustomTooltip theme={theme} />} />
            )}
            {showLegend && (
              <Legend 
                wrapperStyle={{ color: theme.textColor }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            )}
            <XAxis 
              dataKey={xAxisKey} 
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            <YAxis 
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            {showTooltip && (
              <Tooltip content={<CustomTooltip theme={theme} />} />
            )}
            {showLegend && (
              <Legend 
                wrapperStyle={{ color: theme.textColor }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                fill={chartColors[index % chartColors.length]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={dataKeys[0] || 'value'}
              label={({ value }) => value.toLocaleString()}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={chartColors[index % chartColors.length]} 
                />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip content={<CustomTooltip theme={theme} />} />
            )}
            {showLegend && (
              <Legend 
                wrapperStyle={{ color: theme.textColor }}
              />
            )}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

// Demo component showing different chart types
export default function ChartWrapperDemo() {
  const lineData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 300, revenue: 2210 },
    { name: 'Mar', users: 600, revenue: 2290 },
    { name: 'Apr', users: 800, revenue: 2780 },
    { name: 'May', users: 700, revenue: 2890 },
    { name: 'Jun', users: 900, revenue: 3390 },
  ];

  const barData = [
    { name: 'Critical', value: 4, resolved: 2 },
    { name: 'High', value: 12, resolved: 8 },
    { name: 'Medium', value: 24, resolved: 20 },
    { name: 'Low', value: 8, resolved: 8 },
  ];

  const pieData = [
    { name: 'Compliant', value: 65 },
    { name: 'Non-Compliant', value: 25 },
    { name: 'Pending', value: 10 },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper
          type="line"
          data={lineData}
          dataKeys={['users', 'revenue']}
          title="Monthly Performance"
          height={300}
        />

        <ChartWrapper
          type="bar"
          data={barData}
          dataKeys={['value', 'resolved']}
          title="Risk Distribution"
          height={300}
        />

        <ChartWrapper
          type="area"
          data={lineData}
          dataKeys={['users', 'revenue']}
          title="Growth Trends"
          height={300}
        />

        <ChartWrapper
          type="pie"
          data={pieData}
          dataKeys={['value']}
          title="Compliance Status"
          height={300}
        />
      </div>
    </div>
  );
}