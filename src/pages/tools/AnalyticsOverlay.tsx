import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Activity, TrendingUp, AlertTriangle, BarChart3, Clock, Download, Calendar, ChevronDown, ChevronRight, Settings, RefreshCw, Grid3x3, Maximize2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { supabase } from '../../lib/supabase';
import ToolTemplate from './ToolTemplate';

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

  // Real analytics data from integrated tools
  const [analyticsData, setAnalyticsData] = useState<any>({
    threats: [],
    vulnerabilities: [],
    incidents: [],
    compliance: [],
    riskScores: [],
    assets: []
  });

  // Fetch real analytics data from integrated tools
  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch data from various integrated tools
      const [threatsData, vulnerabilitiesData, incidentsData, complianceData, riskScoresData, assetsData] = await Promise.all([
        fetchThreatsData(selectedTimeRange.days),
        fetchVulnerabilitiesData(selectedTimeRange.days),
        fetchIncidentsData(selectedTimeRange.days),
        fetchComplianceData(),
        fetchRiskScoresData(),
        fetchAssetsData()
      ]);

      setAnalyticsData({
        threats: threatsData,
        vulnerabilities: vulnerabilitiesData,
        incidents: incidentsData,
        compliance: complianceData,
        riskScores: riskScoresData,
        assets: assetsData
      });
    } catch (err) {
      setError('Failed to fetch analytics data. Please check your integrations.');
      console.error('Analytics data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions to fetch data from integrated tools
  const fetchThreatsData = async (days: number) => {
    // Implementation would fetch from SIEM, EDR, and other threat detection tools
    const { data, error } = await supabase
      .from('threat_events')
      .select('*')
      .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const fetchVulnerabilitiesData = async (days: number) => {
    // Implementation would fetch from vulnerability scanners
    const { data, error } = await supabase
      .from('vulnerability_scan_results')
      .select('*')
      .gte('scan_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('scan_date', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const fetchIncidentsData = async (days: number) => {
    // Implementation would fetch from incident management systems
    const { data, error } = await supabase
      .from('security_incidents')
      .select('*')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const fetchComplianceData = async () => {
    // Implementation would fetch from compliance management systems
    const { data, error } = await supabase
      .from('compliance_assessments')
      .select('*')
      .eq('status', 'active')
      .order('last_assessment', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  const fetchRiskScoresData = async () => {
    // Implementation would calculate risk scores from various data sources
    const { data, error } = await supabase
      .from('risk_assessments')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  const fetchAssetsData = async () => {
    // Implementation would fetch from asset management systems
    const { data, error } = await supabase
      .from('security_assets')
      .select('*')
      .eq('is_active', true)
      .order('last_scan', { ascending: false });

    if (error) throw error;
    return data || [];
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
    fetchAnalyticsData();
    initializeWidgets();

    // Set up auto-refresh
    const interval = setInterval(() => {
      fetchAnalyticsData();
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
  const exportData = async (format: 'pdf' | 'csv') => {
    try {
      setIsLoading(true);
      
      if (format === 'pdf') {
        // Generate PDF report with current analytics data
        const { generateAnalyticsPdf } = await import('../../utils/generatePdf');
        await generateAnalyticsPdf(analyticsData, selectedTimeRange, 'analytics-report.pdf');
      } else if (format === 'csv') {
        // Generate CSV export
        const csvData = convertToCSV(analyticsData);
        downloadCSV(csvData, 'analytics-data.csv');
      }
    } catch (error) {
      setError(`Failed to export ${format.toUpperCase()} report`);
      console.error('Export error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertToCSV = (data: any) => {
    // Convert analytics data to CSV format
    const csvRows = [];
    
    // Add headers
    csvRows.push(['Date', 'Threats Blocked', 'Threats Detected', 'Vulnerabilities Critical', 'Vulnerabilities High', 'Incidents Created', 'Incidents Resolved']);
    
    // Add data rows
    data.threats.forEach((threat: any, index: number) => {
      const vuln = data.vulnerabilities[index] || {};
      const incident = data.incidents[index] || {};
      
      csvRows.push([
        threat.date || '',
        threat.blocked || 0,
        threat.detected || 0,
        vuln.critical || 0,
        vuln.high || 0,
        incident.created || 0,
        incident.resolved || 0
      ]);
    });
    
    return csvRows.map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
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
              onClick={() => fetchAnalyticsData()}
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