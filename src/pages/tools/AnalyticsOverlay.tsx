import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Activity, TrendingUp, AlertTriangle, BarChart3, Clock, Download, Calendar, ChevronDown, ChevronRight, Settings, RefreshCw, Grid3x3, Maximize2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { createClient } from '@supabase/supabase-js';
import ToolTemplate from './ToolTemplate';

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

// Types
interface MetricData {
  timestamp: string;
  value: number;
  category: string;
  source: string;
}

interface RiskScore {
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  factors: RiskFactor[];
}

interface RiskFactor {
  name: string;
  weight: number;
  value: number;
  description: string;
}

interface Widget {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'radar' | 'metric' | 'risk-matrix' | 'trend';
  title: string;
  dataSource: string;
  position: { x: number; y: number; w: number; h: number };
  config: any;
}

interface TimeRange {
  label: string;
  value: string;
  days: number;
}

const timeRanges: TimeRange[] = [
  { label: 'Last 24 Hours', value: '24h', days: 1 },
  { label: 'Last 7 Days', value: '7d', days: 7 },
  { label: 'Last 30 Days', value: '30d', days: 30 },
  { label: 'Last 90 Days', value: '90d', days: 90 },
  { label: 'Last Year', value: '1y', days: 365 }
];

const riskCategories = ['Technical', 'Compliance', 'Vendor', 'Human', 'Operational'];

const RISK_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e',
  Info: '#3b82f6'
};

const AnalyticsOverlay: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRanges[1]);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<number>(300000); // 5 minutes
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);

  // Mock data - In production, this would come from integrated tools
  const [analyticsData, setAnalyticsData] = useState<any>({
    threats: [],
    vulnerabilities: [],
    incidents: [],
    compliance: [],
    riskScores: [],
    assets: []
  });

  // Generate mock data
  const generateMockData = () => {
    const now = new Date();
    const threats = [];
    const vulnerabilities = [];
    const incidents = [];
    const riskScores = [];

    // Generate time series data
    for (let i = selectedTimeRange.days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      threats.push({
        date: dateStr,
        blocked: Math.floor(Math.random() * 1000) + 500,
        detected: Math.floor(Math.random() * 500) + 200,
        investigated: Math.floor(Math.random() * 100) + 50
      });

      vulnerabilities.push({
        date: dateStr,
        critical: Math.floor(Math.random() * 10) + 5,
        high: Math.floor(Math.random() * 20) + 10,
        medium: Math.floor(Math.random() * 50) + 20,
        low: Math.floor(Math.random() * 100) + 50
      });

      incidents.push({
        date: dateStr,
        created: Math.floor(Math.random() * 20) + 5,
        resolved: Math.floor(Math.random() * 15) + 3,
        pending: Math.floor(Math.random() * 10) + 2
      });
    }

    // Generate risk scores
    riskCategories.forEach(category => {
      riskScores.push({
        category,
        current: Math.floor(Math.random() * 40) + 60,
        previous: Math.floor(Math.random() * 40) + 60,
        factors: [
          { name: 'Vulnerabilities', value: Math.random() * 100 },
          { name: 'Incidents', value: Math.random() * 100 },
          { name: 'Compliance', value: Math.random() * 100 },
          { name: 'Controls', value: Math.random() * 100 }
        ]
      });
    });

    setAnalyticsData({
      threats,
      vulnerabilities,
      incidents,
      riskScores,
      compliance: [
        { name: 'NIST CSF', value: 78, status: 'Good' },
        { name: 'ISO 27001', value: 82, status: 'Good' },
        { name: 'SOC 2', value: 91, status: 'Excellent' },
        { name: 'PCI DSS', value: 65, status: 'Needs Improvement' }
      ],
      assets: [
        { type: 'Servers', count: 245, secured: 238 },
        { type: 'Workstations', count: 1250, secured: 1180 },
        { type: 'Network Devices', count: 89, secured: 87 },
        { type: 'Cloud Resources', count: 456, secured: 445 }
      ]
    });
  };

  // Initialize default widgets
  const initializeWidgets = () => {
    const defaultWidgets: Widget[] = [
      {
        id: 'threat-trends',
        type: 'line',
        title: 'Threat Trends',
        dataSource: 'threats',
        position: { x: 0, y: 0, w: 6, h: 3 },
        config: { metrics: ['blocked', 'detected', 'investigated'] }
      },
      {
        id: 'vulnerability-breakdown',
        type: 'bar',
        title: 'Vulnerability Statistics',
        dataSource: 'vulnerabilities',
        position: { x: 6, y: 0, w: 6, h: 3 },
        config: { stacked: true }
      },
      {
        id: 'risk-matrix',
        type: 'risk-matrix',
        title: 'Risk Matrix',
        dataSource: 'riskScores',
        position: { x: 0, y: 3, w: 4, h: 3 },
        config: {}
      },
      {
        id: 'compliance-status',
        type: 'radar',
        title: 'Compliance Overview',
        dataSource: 'compliance',
        position: { x: 4, y: 3, w: 4, h: 3 },
        config: {}
      },
      {
        id: 'incident-metrics',
        type: 'metric',
        title: 'Incident Response Metrics',
        dataSource: 'incidents',
        position: { x: 8, y: 3, w: 4, h: 3 },
        config: {}
      }
    ];
    setWidgets(defaultWidgets);
  };

  useEffect(() => {
    generateMockData();
    initializeWidgets();
    setIsLoading(false);

    // Set up auto-refresh
    const interval = setInterval(() => {
      generateMockData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [selectedTimeRange, refreshInterval]);

  // Calculate unified risk score
  const unifiedRiskScore = useMemo(() => {
    if (!analyticsData.riskScores.length) return 0;
    
    const totalScore = analyticsData.riskScores.reduce((acc: number, risk: any) => {
      return acc + risk.current;
    }, 0);
    
    return Math.round(totalScore / analyticsData.riskScores.length);
  }, [analyticsData.riskScores]);

  // Risk level determination
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Critical', color: RISK_COLORS.Critical };
    if (score >= 60) return { level: 'High', color: RISK_COLORS.High };
    if (score >= 40) return { level: 'Medium', color: RISK_COLORS.Medium };
    if (score >= 20) return { level: 'Low', color: RISK_COLORS.Low };
    return { level: 'Info', color: RISK_COLORS.Info };
  };

  // Widget renderer
  const renderWidget = (widget: Widget) => {
    const data = analyticsData[widget.dataSource];
    
    switch (widget.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {widget.config.metrics?.map((metric: string, index: number) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={['#3b82f6', '#ef4444', '#10b981'][index]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="critical" stackId="a" fill={RISK_COLORS.Critical} />
              <Bar dataKey="high" stackId="a" fill={RISK_COLORS.High} />
              <Bar dataKey="medium" stackId="a" fill={RISK_COLORS.Medium} />
              <Bar dataKey="low" stackId="a" fill={RISK_COLORS.Low} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Compliance Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'risk-matrix':
        return (
          <div className="p-4">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['Very Low', 'Low', 'Medium', 'High', 'Very High'].map((label, i) => (
                <div key={label} className="text-center text-xs text-gray-600 dark:text-gray-400">
                  {label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 25 }).map((_, i) => {
                const row = Math.floor(i / 5);
                const col = i % 5;
                const riskValue = (row + 1) * (col + 1);
                const opacity = riskValue / 25;
                
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-lg flex items-center justify-center text-white font-semibold"
                    style={{
                      backgroundColor: riskValue > 15 ? RISK_COLORS.Critical : 
                                     riskValue > 10 ? RISK_COLORS.High :
                                     riskValue > 5 ? RISK_COLORS.Medium : RISK_COLORS.Low,
                      opacity: 0.5 + opacity * 0.5
                    }}
                  >
                    {riskValue}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Impact →</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 -rotate-90 absolute left-0 top-1/2">Likelihood →</div>
            </div>
          </div>
        );

      case 'metric':
        const latestIncidents = data[data.length - 1] || {};
        return (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{latestIncidents.created || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{latestIncidents.resolved || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{latestIncidents.pending || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Mean Time to Resolution</div>
              <div className="text-2xl font-semibold">4.2 hours</div>
            </div>
          </div>
        );

      default:
        return <div>Widget type not supported</div>;
    }
  };

  // Export functionality
  const exportData = (format: 'pdf' | 'csv') => {
    // In production, this would generate actual exports
    console.log(`Exporting data as ${format}`);
    alert(`Export to ${format.toUpperCase()} functionality would be implemented here`);
  };

  return (
    <ToolTemplate
      title="Analytics Overlay"
      description="Unified security analytics and risk aggregation across all integrated tools"
      icon={<BarChart3 />}
      toolId="analytics-overlay"
      isLoading={isLoading}
      error={error}
    >
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <div className="relative">
              <select
                value={selectedTimeRange.value}
                onChange={(e) => {
                  const range = timeRanges.find(r => r.value === e.target.value);
                  if (range) setSelectedTimeRange(range);
                }}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => generateMockData()}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            {/* Auto-refresh Interval */}
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1"
            >
              <option value={60000}>1 min</option>
              <option value={300000}>5 min</option>
              <option value={900000}>15 min</option>
              <option value={1800000}>30 min</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {/* Widget Settings */}
            <button
              onClick={() => setShowWidgetSettings(!showWidgetSettings)}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Widget settings"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>

            {/* Export Options */}
            <button
              onClick={() => exportData('pdf')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="h-4 w-4 inline mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => exportData('csv')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <Download className="h-4 w-4 inline mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Unified Risk Score */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unified Risk Score
            </h2>
            <div className="flex items-baseline space-x-4">
              <div className="text-5xl font-bold" style={{ color: getRiskLevel(unifiedRiskScore).color }}>
                {unifiedRiskScore}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                {getRiskLevel(unifiedRiskScore).level} Risk
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Risk Trend (30 days)
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <span className="text-red-500 font-semibold">+5.2%</span>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="mt-6 grid grid-cols-5 gap-4">
          {analyticsData.riskScores.map((risk: any) => (
            <div key={risk.category} className="text-center">
              <div className="text-2xl font-semibold" style={{ color: getRiskLevel(risk.current).color }}>
                {risk.current}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{risk.category}</div>
              <div className={`text-xs ${risk.current > risk.previous ? 'text-red-500' : 'text-green-500'}`}>
                {risk.current > risk.previous ? '↑' : '↓'} {Math.abs(risk.current - risk.previous)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-12 gap-6">
        {widgets.map(widget => (
          <div
            key={widget.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 col-span-${widget.position.w} row-span-${widget.position.h}`}
            style={{
              gridColumn: `span ${widget.position.w}`,
              minHeight: `${widget.position.h * 120}px`
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {widget.title}
              </h3>
              <button
                onClick={() => setExpandedWidget(expandedWidget === widget.id ? null : widget.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
            <div className="h-full -mt-8 pt-8">
              {renderWidget(widget)}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Widget Modal */}
      {expandedWidget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl h-[80vh] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {widgets.find(w => w.id === expandedWidget)?.title}
              </h2>
              <button
                onClick={() => setExpandedWidget(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]">
              {widgets.find(w => w.id === expandedWidget) && renderWidget(widgets.find(w => w.id === expandedWidget)!)}
            </div>
          </div>
        </div>
      )}

      {/* Widget Settings Panel */}
      {showWidgetSettings && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-40 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Widget Settings</h3>
            <button
              onClick={() => setShowWidgetSettings(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag and drop widgets to rearrange. Click to edit widget settings.
            </p>
            {widgets.map(widget => (
              <div key={widget.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="font-medium">{widget.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{widget.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolTemplate>
  );
};

export default AnalyticsOverlay;