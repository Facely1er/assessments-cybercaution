import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Shield, Globe, 
  Activity, Zap, Eye, Clock, BarChart3, Map, Target,
  ArrowUp, ArrowDown, Minus, RefreshCw, Download,
  MapPin, Users, Server, Lock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const ThreatWeatherDashboard = () => {
  const [activeView, setActiveView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState('24h');
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time threat data simulation
  const [threatData, setThreatData] = useState({
    globalThreatLevel: 'ELEVATED',
    activeCampaigns: 47,
    newIOCs: 1,284,
    affectedRegions: 23
  });

  // Current active threat campaigns based on real threat intelligence patterns
  const activeCampaigns = [
    {
      name: 'AsyncRAT Distribution',
      severity: 'HIGH',
      affectedCountries: 12,
      firstSeen: '2024-07-14',
      attackVector: 'Phishing Email',
      mitreId: 'T1566.001',
      confidence: 95,
      trend: 'increasing'
    },
    {
      name: 'BazarLoader Campaign',
      severity: 'CRITICAL',
      affectedCountries: 8,
      firstSeen: '2024-07-13',
      attackVector: 'Malicious Attachments',
      mitreId: 'T1204.002',
      confidence: 88,
      trend: 'stable'
    },
    {
      name: 'QakBot Resurgence',
      severity: 'HIGH',
      affectedCountries: 15,
      firstSeen: '2024-07-12',
      attackVector: 'Email Thread Hijacking',
      mitreId: 'T1534',
      confidence: 92,
      trend: 'decreasing'
    }
  ];

  // Global threat distribution by region
  const regionData = [
    { region: 'North America', threats: 324, change: 12 },
    { region: 'Europe', threats: 298, change: -8 },
    { region: 'Asia-Pacific', threats: 445, change: 23 },
    { region: 'Middle East', threats: 156, change: 5 },
    { region: 'Africa', threats: 89, change: -3 },
    { region: 'South America', threats: 134, change: 18 }
  ];

  // Threat volume over time
  const timeSeriesData = [
    { time: '00:00', threats: 245, critical: 12 },
    { time: '04:00', threats: 189, critical: 8 },
    { time: '08:00', threats: 298, critical: 15 },
    { time: '12:00', threats: 445, critical: 23 },
    { time: '16:00', threats: 389, critical: 18 },
    { time: '20:00', threats: 356, critical: 14 },
    { time: '24:00', threats: 298, critical: 11 }
  ];

  // Attack vector distribution
  const attackVectors = [
    { name: 'Email Phishing', value: 42, color: '#ef4444' },
    { name: 'Malicious Downloads', value: 28, color: '#f97316' },
    { name: 'Web Exploits', value: 18, color: '#eab308' },
    { name: 'Network Intrusion', value: 8, color: '#22c55e' },
    { name: 'Supply Chain', value: 4, color: '#3b82f6' }
  ];

  // MITRE ATT&CK technique trends
  const mitreData = [
    { technique: 'T1566 Phishing', count: 89, change: 15 },
    { technique: 'T1190 Exploit Public-Facing Application', count: 67, change: -5 },
    { technique: 'T1078 Valid Accounts', count: 54, change: 8 },
    { technique: 'T1055 Process Injection', count: 43, change: 12 },
    { technique: 'T1059 Command and Scripting Interpreter', count: 38, change: -3 }
  ];

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-600 bg-red-100';
      case 'HIGH': return 'text-orange-600 bg-orange-100';
      case 'ELEVATED': return 'text-yellow-600 bg-yellow-100';
      case 'MODERATE': return 'text-blue-600 bg-blue-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'HIGH': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'ELEVATED': return <Activity className="w-4 h-4 text-yellow-600" />;
      default: return <Shield className="w-4 h-4 text-green-600" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-3 h-3 text-red-500" />;
      case 'decreasing': return <ArrowDown className="w-3 h-3 text-green-500" />;
      default: return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // Simulate real-time updates
        setThreatData(prev => ({
          ...prev,
          newIOCs: prev.newIOCs + Math.floor(Math.random() * 50),
          activeCampaigns: prev.activeCampaigns + Math.floor(Math.random() * 3) - 1
        }));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Threat Weather Dashboard</h1>
            <p className="text-gray-600">Real-time global threat intelligence monitoring and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isLive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isLive ? 'LIVE' : 'PAUSED'}
              </button>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Global Threat Status */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Global Threat Climate</span>
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
                <div className="text-3xl font-bold text-red-600">{threatData.activeCampaigns}</div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-3 h-3 text-red-500 mr-1" />
                  <span className="text-xs text-red-500">+3 in 24h</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{threatData.newIOCs.toLocaleString()}</div>
                <p className="text-sm text-gray-600">New IOCs (24h)</p>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="text-xs text-blue-500">+12% vs avg</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{threatData.affectedRegions}</div>
                <p className="text-sm text-gray-600">Affected Regions</p>
                <div className="flex items-center justify-center mt-1">
                  <Minus className="w-3 h-3 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Stable</span>
                </div>
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
              <div className="space-y-4">
                  {activeCampaigns.map((campaign, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-gray-900">{campaign.name}</span>
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
                              <span className="font-medium">Affected Countries:</span> {campaign.affectedCountries}
                            </div>
                            <div>
                              <span className="font-medium">Confidence:</span> {campaign.confidence}%
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                    {attackVectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {attackVectors.map((vector, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: vector.color }}></div>
                      <span>{vector.name}</span>
                    </div>
                    <span className="font-medium">{vector.value}%</span>
                  </div>
                ))}
              </div>
            </div>
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
                {regionData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">{region.region}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold">{region.threats}</span>
                      <div className={`flex items-center space-x-1 ${
                        region.change > 0 ? 'text-red-600' : region.change < 0 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {region.change > 0 ? <ArrowUp className="w-3 h-3" /> : 
                         region.change < 0 ? <ArrowDown className="w-3 h-3" /> : 
                         <Minus className="w-3 h-3" />}
                        <span className="text-sm">{Math.abs(region.change)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MITRE ATT&CK Techniques */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Top MITRE ATT&CK Techniques (7 days)</span>
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
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 pt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View Detailed Analysis</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Configure Alerts</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Intelligence</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatWeatherDashboard;