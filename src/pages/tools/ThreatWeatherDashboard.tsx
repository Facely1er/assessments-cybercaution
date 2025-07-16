import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
  TrendingUp, TrendingDown, AlertTriangle, Shield, Globe, 
  Activity, Zap, Eye, Clock, BarChart3, Map, Target,
  ArrowUp, ArrowDown, Minus, RefreshCw, Download,
  MapPin, Users, Server, Lock, Settings, Database,
  Wifi, WifiOff
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Configuration interfaces for data sources
interface ThreatFeedConfig {
  name: string;
  endpoint: string;
  apiKey?: string;
  enabled: boolean;
  lastSync?: Date;
  status: 'connected' | 'disconnected' | 'error';
}

interface ThreatData {
  globalThreatLevel: string;
  activeCampaigns: number;
  newIOCs: number;
  affectedRegions: number;
  dataSourcesConnected: number;
  lastUpdate?: Date;
}

interface Campaign {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  affectedCountries: number;
  firstSeen: string;
  attackVector: string;
  mitreId: string;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  source: string;
}

interface RegionData {
  region: string;
  threats: number;
  change: number;
}

interface TimeSeriesData {
  time: string;
  threats: number;
  critical: number;
}

interface AttackVector {
  name: string;
  value: number;
  color: string;
}

interface MitreData {
  technique: string;
  count: number;
  change: number;
}

const ThreatIntelligenceDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('global');
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [dataSourcesConfigured, setDataSourcesConfigured] = useState<boolean>(false);

  // Configuration for threat intelligence feeds
  const [threatFeeds] = useState<ThreatFeedConfig[]>([
    {
      name: 'CISA Alerts',
      endpoint: '/api/feeds/cisa',
      enabled: false,
      status: 'disconnected'
    },
    {
      name: 'MITRE ATT&CK',
      endpoint: '/api/feeds/mitre',
      enabled: false,
      status: 'disconnected'
    },
    {
      name: 'Commercial Intel Feed',
      endpoint: '/api/feeds/commercial',
      enabled: false,
      status: 'disconnected',
      apiKey: 'required'
    },
    {
      name: 'Custom IOC Feed',
      endpoint: '/api/feeds/custom',
      enabled: false,
      status: 'disconnected'
    }
  ]);

  // Initialize with empty/placeholder data structure
  const [threatData, setThreatData] = useState<ThreatData>({
    globalThreatLevel: 'UNKNOWN',
    activeCampaigns: 0,
    newIOCs: 0,
    affectedRegions: 0,
    dataSourcesConnected: 0
  });

  // Empty data structures - will be populated from real feeds
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);

  // Placeholder regional data structure
  const regionData: RegionData[] = [
    { region: 'North America', threats: 0, change: 0 },
    { region: 'Europe', threats: 0, change: 0 },
    { region: 'Asia-Pacific', threats: 0, change: 0 },
    { region: 'Middle East', threats: 0, change: 0 },
    { region: 'Africa', threats: 0, change: 0 },
    { region: 'South America', threats: 0, change: 0 }
  ];

  // Empty time series data
  const timeSeriesData: TimeSeriesData[] = Array.from({ length: 7 }, (_, i) => ({
    time: `${i * 4}:00`,
    threats: 0,
    critical: 0
  }));

  // Standard attack vector categories (not fictional data)
  const attackVectors: AttackVector[] = [
    { name: 'Email-based', value: 0, color: '#ef4444' },
    { name: 'Web-based', value: 0, color: '#f97316' },
    { name: 'Network-based', value: 0, color: '#eab308' },
    { name: 'Application', value: 0, color: '#22c55e' },
    { name: 'Physical', value: 0, color: '#3b82f6' }
  ];

  // MITRE ATT&CK common techniques (real framework)
  const mitreData: MitreData[] = [
    { technique: 'T1566 Phishing', count: 0, change: 0 },
    { technique: 'T1190 Exploit Public-Facing App', count: 0, change: 0 },
    { technique: 'T1078 Valid Accounts', count: 0, change: 0 },
    { technique: 'T1055 Process Injection', count: 0, change: 0 },
    { technique: 'T1059 Command/Scripting', count: 0, change: 0 }
  ];

  const getThreatLevelColor = (level: string): string => {
    switch (level) {
      case 'CRITICAL': return 'text-red-600 bg-red-100';
      case 'HIGH': return 'text-orange-600 bg-orange-100';
      case 'ELEVATED': return 'text-yellow-600 bg-yellow-100';
      case 'MODERATE': return 'text-blue-600 bg-blue-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'HIGH': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'ELEVATED': return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'MODERATE': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-3 h-3 text-red-500" />;
      case 'decreasing': return <ArrowDown className="w-3 h-3 text-green-500" />;
      default: return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getDataSourceStatus = () => {
    const connectedFeeds = threatFeeds.filter(feed => feed.status === 'connected').length;
    setThreatData(prev => ({ ...prev, dataSourcesConnected: connectedFeeds }));
    setDataSourcesConfigured(connectedFeeds > 0);
  };

  useEffect(() => {
    getDataSourceStatus();
  }, [threatFeeds]);

  useEffect(() => {
    if (isLive && dataSourcesConfigured) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // Here you would fetch real data from configured threat intelligence feeds
        // Example: fetchThreatData(), fetchActiveCampaigns(), etc.
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isLive, dataSourcesConfigured]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CyberCaution Threat Intelligence Dashboard</h1>
            <p className="text-gray-600">Real-time threat intelligence monitoring and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              <button
                onClick={() => setIsLive(!isLive)}
                disabled={!dataSourcesConfigured}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isLive && dataSourcesConfigured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                } ${!dataSourcesConfigured ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLive && dataSourcesConfigured ? 'LIVE' : 'OFFLINE'}
              </button>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configure Sources</span>
            </button>
          </div>
        </div>

        {/* Data Source Configuration Alert */}
        {!dataSourcesConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Threat Intelligence Sources Not Configured</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Connect your threat intelligence feeds to begin receiving real-time data. Configure CISA feeds, MITRE ATT&CK data, or custom intelligence sources.
                </p>
                <button className="mt-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors">
                  Configure Data Sources
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Source Status */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Intelligence Feed Status</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {threatFeeds.map((feed, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{feed.name}</span>
                  {feed.status === 'connected' ? 
                    <Wifi className="w-4 h-4 text-green-600" /> : 
                    <WifiOff className="w-4 h-4 text-gray-400" />
                  }
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  feed.status === 'connected' ? 'bg-green-100 text-green-800' :
                  feed.status === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {feed.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Threat Status */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Global Threat Status</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-lg font-bold text-lg ${getThreatLevelColor(threatData.globalThreatLevel)}`}>
                {getSeverityIcon(threatData.globalThreatLevel)}
                <span className="ml-2">{threatData.globalThreatLevel}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Current Threat Level</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{threatData.activeCampaigns}</div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <div className="flex items-center justify-center mt-1">
                <Minus className="w-3 h-3 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">No data</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{threatData.newIOCs.toLocaleString()}</div>
              <p className="text-sm text-gray-600">New IOCs (24h)</p>
              <div className="flex items-center justify-center mt-1">
                <Minus className="w-3 h-3 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">No data</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{threatData.dataSourcesConnected}</div>
              <p className="text-sm text-gray-600">Connected Sources</p>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-gray-500">of {threatFeeds.length} total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Threat Campaigns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Active Threat Campaigns</span>
                </h3>
              </div>
              {activeCampaigns.length === 0 ? (
                <div className="text-center py-8">
                  <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No threat campaigns detected</p>
                  <p className="text-sm text-gray-500 mt-1">Configure threat intelligence sources to view active campaigns</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCampaigns.map((campaign: Campaign, index: number) => (
                    <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-gray-900">Campaign {campaign.id}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              campaign.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                              campaign.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {campaign.severity}
                            </span>
                            {getTrendIcon(campaign.trend)}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Attack Vector:</span> {campaign.attackVector}
                            </div>
                            <div>
                              <span className="font-medium">MITRE ID:</span> {campaign.mitreId}
                            </div>
                            <div>
                              <span className="font-medium">Source:</span> {campaign.source}
                            </div>
                            <div>
                              <span className="font-medium">Confidence:</span> {campaign.confidence}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Attack Vector Distribution */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Attack Vectors (24h)</span>
              </h3>
            </div>
            {dataSourcesConfigured ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={attackVectors}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {attackVectors.map((entry: AttackVector, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {attackVectors.map((vector: AttackVector, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: vector.color }}></div>
                        <span>{vector.name}</span>
                      </div>
                      <span className="font-medium">{vector.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No vector data</p>
                <p className="text-sm text-gray-500 mt-1">Connect data sources</p>
              </div>
            )}
          </div>
        </div>

        {/* Threat Timeline and Regional Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Volume Timeline */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Threat Volume (24h)</span>
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="threats" stackId="1" stroke="#3b82f6" fill="#3b82f680" />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Threat Distribution */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Map className="w-5 h-5" />
                <span>Regional Threats</span>
              </h3>
            </div>
            <div className="space-y-3">
              {regionData.map((region: RegionData, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{region.region}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold">{region.threats}</span>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Minus className="w-3 h-3" />
                      <span className="text-sm">-</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MITRE ATT&CK Techniques */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>MITRE ATT&CK Techniques (7 days)</span>
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mitreData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="technique" type="category" width={200} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 pt-6">
          <button 
            disabled={!dataSourcesConfigured}
            className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
              dataSourcesConfigured 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>View Detailed Analysis</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Configure Data Sources</span>
          </button>
          <button 
            disabled={!dataSourcesConfigured}
            className={`px-4 py-2 border border-gray-300 rounded-md font-medium transition-colors flex items-center space-x-2 ${
              dataSourcesConfigured 
                ? 'text-gray-700 bg-white hover:bg-gray-50' 
                : 'text-gray-400 bg-gray-100 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export Intelligence</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatIntelligenceDashboard;