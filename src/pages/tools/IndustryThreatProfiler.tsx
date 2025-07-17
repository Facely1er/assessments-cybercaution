import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Building2, TrendingUp, AlertTriangle, Shield, Target, ArrowLeft,
  BarChart3, Activity, Clock, Users, Server, Factory,
  HeartPulse, Landmark, GraduationCap, Briefcase, Globe,
  ArrowUp, ArrowDown, RefreshCw, Download, Search,
  Filter, ChevronRight, Calendar, MapPin, Zap, Lock
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, 
  Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, TreemapChart, ScatterChart, Scatter
} from 'recharts';

interface Industry {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  threatLevel: string;
  primaryTargets: string[];
  regulatoryFrameworks: string[];
}

interface ThreatActor {
  name: string;
  type: string;
  activity: string;
  specialty: string;
}

interface AttackPattern {
  technique: string;
  frequency: number;
  trend: string;
}

interface VulnerabilityTrend {
  month: string;
  healthcare: number;
  financial: number;
  manufacturing: number;
  technology: number;
}

interface IndustryMetric {
  industry: string;
  incidents: number;
  avgCost: number;
  avgDays: number;
  riskScore: number;
}

interface ThreatLandscape {
  malwareTypes: {
    name: string;
    percentage: number;
    color: string;
  }[];
}

const IndustryThreatProfiler: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('healthcare');
  const [timeRange, setTimeRange] = useState<string>('6months');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Industry sectors with their specific characteristics
  const industries: Industry[] = [
    { 
      id: 'healthcare', 
      name: 'Healthcare', 
      icon: HeartPulse, 
      color: '#dc2626',
      threatLevel: 'CRITICAL',
      primaryTargets: ['Patient Data', 'Medical Devices', 'Research Data'],
      regulatoryFrameworks: ['HIPAA', 'HITRUST', 'FDA Guidelines']
    },
    { 
      id: 'financial', 
      name: 'Financial Services', 
      icon: Landmark, 
      color: '#059669',
      threatLevel: 'HIGH',
      primaryTargets: ['Customer Data', 'Transaction Systems', 'Trading Platforms'],
      regulatoryFrameworks: ['PCI DSS', 'GLBA', 'SOX', 'FFIEC']
    },
    { 
      id: 'manufacturing', 
      name: 'Manufacturing', 
      icon: Factory, 
      color: '#7c3aed',
      threatLevel: 'HIGH',
      primaryTargets: ['Industrial Control Systems', 'Intellectual Property', 'Supply Chain'],
      regulatoryFrameworks: ['IEC 62443', 'NIST Manufacturing Profile']
    },
    { 
      id: 'education', 
      name: 'Education', 
      icon: GraduationCap, 
      color: '#ea580c',
      threatLevel: 'MODERATE',
      primaryTargets: ['Student Records', 'Research Data', 'Administrative Systems'],
      regulatoryFrameworks: ['FERPA', 'COPPA', 'State Privacy Laws']
    },
    { 
      id: 'government', 
      name: 'Government', 
      icon: Building2, 
      color: '#1d4ed8',
      threatLevel: 'CRITICAL',
      primaryTargets: ['Classified Information', 'Citizen Data', 'Critical Infrastructure'],
      regulatoryFrameworks: ['FISMA', 'FedRAMP', 'NIST RMF', 'CISA Directives']
    },
    { 
      id: 'technology', 
      name: 'Technology', 
      icon: Server, 
      color: '#0891b2',
      threatLevel: 'HIGH',
      primaryTargets: ['Source Code', 'Customer Data', 'Cloud Infrastructure'],
      regulatoryFrameworks: ['SOC 2', 'ISO 27001', 'Cloud Security Alliance']
    }
  ];

  // Industry-specific threat actors
  const threatActors: Record<string, ThreatActor[]> = {
    healthcare: [
      { name: 'FIN7', type: 'Cybercriminal', activity: 'HIGH', specialty: 'Payment Card Data' },
      { name: 'APT1', type: 'Nation-state', activity: 'MODERATE', specialty: 'Healthcare Research' },
      { name: 'Conti', type: 'Ransomware', activity: 'HIGH', specialty: 'Hospital Systems' },
      { name: 'WIZARD SPIDER', type: 'Cybercriminal', activity: 'MODERATE', specialty: 'Ryuk Ransomware' }
    ],
    financial: [
      { name: 'Carbanak', type: 'Cybercriminal', activity: 'HIGH', specialty: 'ATM Networks' },
      { name: 'Lazarus Group', type: 'Nation-state', activity: 'HIGH', specialty: 'SWIFT Networks' },
      { name: 'FIN6', type: 'Cybercriminal', activity: 'MODERATE', specialty: 'POS Systems' },
      { name: 'Silence', type: 'Cybercriminal', activity: 'MODERATE', specialty: 'Banking Trojans' }
    ],
    manufacturing: [
      { name: 'APT1', type: 'Nation-state', activity: 'HIGH', specialty: 'Industrial Espionage' },
      { name: 'TEMP.Veles', type: 'Nation-state', activity: 'MODERATE', specialty: 'ICS/SCADA' },
      { name: 'Dragonfly', type: 'Nation-state', activity: 'HIGH', specialty: 'Energy Sector' },
      { name: 'XENOTIME', type: 'Nation-state', activity: 'LOW', specialty: 'Safety Systems' }
    ],
    education: [
      { name: 'Vice Society', type: 'Ransomware', activity: 'HIGH', specialty: 'Educational Data' },
      { name: 'BlackCat', type: 'Ransomware', activity: 'MODERATE', specialty: 'Research Systems' },
      { name: 'APT28', type: 'Nation-state', activity: 'LOW', specialty: 'Academic Research' },
      { name: 'Scattered Spider', type: 'Cybercriminal', activity: 'MODERATE', specialty: 'Social Engineering' }
    ],
    government: [
      { name: 'APT29', type: 'Nation-state', activity: 'HIGH', specialty: 'Government Networks' },
      { name: 'APT40', type: 'Nation-state', activity: 'HIGH', specialty: 'Maritime Industries' },
      { name: 'Volt Typhoon', type: 'Nation-state', activity: 'MODERATE', specialty: 'Critical Infrastructure' },
      { name: 'APT28', type: 'Nation-state', activity: 'HIGH', specialty: 'Political Intelligence' }
    ],
    technology: [
      { name: 'APT1', type: 'Nation-state', activity: 'HIGH', specialty: 'Technology Theft' },
      { name: 'Lapsus$', type: 'Cybercriminal', activity: 'MODERATE', specialty: 'Source Code Theft' },
      { name: 'APT41', type: 'Nation-state', activity: 'HIGH', specialty: 'Supply Chain' },
      { name: 'FIN11', type: 'Cybercriminal', activity: 'MODERATE', specialty: 'Cloud Infrastructure' }
    ]
  };

  // Attack patterns by industry
  const attackPatterns: Record<string, AttackPattern[]> = {
    healthcare: [
      { technique: 'T1566.001 Spearphishing Attachment', frequency: 34, trend: 'increasing' },
      { technique: 'T1190 Exploit Public-Facing Application', frequency: 28, trend: 'stable' },
      { technique: 'T1078 Valid Accounts', frequency: 22, trend: 'increasing' },
      { technique: 'T1486 Data Encrypted for Impact', frequency: 16, trend: 'decreasing' }
    ],
    financial: [
      { technique: 'T1566.002 Spearphishing Link', frequency: 38, trend: 'increasing' },
      { technique: 'T1078 Valid Accounts', frequency: 31, trend: 'stable' },
      { technique: 'T1055 Process Injection', frequency: 19, trend: 'increasing' },
      { technique: 'T1041 Exfiltration Over C2 Channel', frequency: 12, trend: 'stable' }
    ],
    manufacturing: [
      { technique: 'T1190 Exploit Public-Facing Application', frequency: 42, trend: 'increasing' },
      { technique: 'T1566.001 Spearphishing Attachment', frequency: 26, trend: 'stable' },
      { technique: 'T1078 Valid Accounts', frequency: 21, trend: 'increasing' },
      { technique: 'T1082 System Information Discovery', frequency: 11, trend: 'stable' }
    ],
    education: [
      { technique: 'T1566.001 Spearphishing Attachment', frequency: 45, trend: 'increasing' },
      { technique: 'T1078 Valid Accounts', frequency: 29, trend: 'stable' },
      { technique: 'T1190 Exploit Public-Facing Application', frequency: 18, trend: 'increasing' },
      { technique: 'T1486 Data Encrypted for Impact', frequency: 8, trend: 'decreasing' }
    ],
    government: [
      { technique: 'T1566.002 Spearphishing Link', frequency: 40, trend: 'increasing' },
      { technique: 'T1078 Valid Accounts', frequency: 35, trend: 'stable' },
      { technique: 'T1055 Process Injection', frequency: 15, trend: 'increasing' },
      { technique: 'T1041 Exfiltration Over C2 Channel', frequency: 10, trend: 'stable' }
    ],
    technology: [
      { technique: 'T1190 Exploit Public-Facing Application', frequency: 48, trend: 'increasing' },
      { technique: 'T1078 Valid Accounts', frequency: 27, trend: 'stable' },
      { technique: 'T1566.001 Spearphishing Attachment', frequency: 16, trend: 'decreasing' },
      { technique: 'T1055 Process Injection', frequency: 9, trend: 'increasing' }
    ]
  };

  // Vulnerability trends by industry
  const vulnerabilityTrends: VulnerabilityTrend[] = [
    { month: 'Feb', healthcare: 245, financial: 189, manufacturing: 156, technology: 203 },
    { month: 'Mar', healthcare: 267, financial: 201, manufacturing: 178, technology: 198 },
    { month: 'Apr', healthcare: 298, financial: 224, manufacturing: 195, technology: 215 },
    { month: 'May', healthcare: 334, financial: 198, manufacturing: 167, technology: 189 },
    { month: 'Jun', healthcare: 356, financial: 245, manufacturing: 203, technology: 234 },
    { month: 'Jul', healthcare: 378, financial: 267, manufacturing: 221, technology: 245 }
  ];

  // Industry comparison metrics
  const industryMetrics: IndustryMetric[] = [
    { industry: 'Healthcare', incidents: 1247, avgCost: 9780000, avgDays: 287, riskScore: 8.7 },
    { industry: 'Financial', incidents: 892, avgCost: 5850000, avgDays: 233, riskScore: 7.9 },
    { industry: 'Manufacturing', incidents: 645, avgCost: 4450000, avgDays: 245, riskScore: 7.2 },
    { industry: 'Technology', incidents: 789, avgCost: 4240000, avgDays: 197, riskScore: 6.8 },
    { industry: 'Government', incidents: 534, avgCost: 4380000, avgDays: 312, riskScore: 8.1 },
    { industry: 'Education', incidents: 423, avgCost: 3790000, avgDays: 274, riskScore: 6.9 }
  ];

  // Threat landscape analysis for selected industry
  const threatLandscape: ThreatLandscape = {
    malwareTypes: [
      { name: 'Ransomware', percentage: 35, color: '#ef4444' },
      { name: 'Banking Trojans', percentage: 22, color: '#f97316' },
      { name: 'RATs', percentage: 18, color: '#eab308' },
      { name: 'Wipers', percentage: 15, color: '#84cc16' },
      { name: 'Other', percentage: 10, color: '#6b7280' }
    ]
  };

  const currentIndustry: Industry | undefined = industries.find(ind => ind.id === selectedIndustry);
  const currentThreats: ThreatActor[] = threatActors[selectedIndustry] || [];
  const currentPatterns: AttackPattern[] = attackPatterns[selectedIndustry] || [];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-3 h-3 text-red-500" />;
      case 'decreasing': return <ArrowDown className="w-3 h-3 text-green-500" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const getActivityColor = (activity: string): string => {
    switch (activity) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MODERATE': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back to Toolkit Button */}
        <Link to="/toolkit" className="inline-flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Threat Profiler</h1>
            <p className="text-gray-600">Sector-specific threat intelligence and attack pattern analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Profile</span>
            </button>
          </div>
        </div>

        {/* Industry Selection */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Select Industry Sector</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(industry => {
              const IconComponent = industry.icon;
              return (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedIndustry === industry.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent 
                    className="w-8 h-8 mx-auto mb-2" 
                    style={{ color: industry.color }}
                  />
                  <div className="text-sm font-medium text-center">{industry.name}</div>
                  <div className={`text-xs px-2 py-1 rounded mt-2 ${
                    industry.threatLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                    industry.threatLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {industry.threatLevel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Overview */}
        {currentIndustry && (
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <currentIndustry.icon className="w-5 h-5" style={{ color: currentIndustry.color }} />
                <span>{currentIndustry.name} Threat Profile</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Primary Attack Targets</h4>
                <div className="space-y-1">
                  {currentIndustry.primaryTargets.map((target, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Target className="w-3 h-3 text-gray-500" />
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Regulatory Frameworks</h4>
                <div className="space-y-1">
                  {currentIndustry.regulatoryFrameworks.map((framework, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Shield className="w-3 h-3 text-gray-500" />
                      <span>{framework}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Threat Level</h4>
                <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${
                  currentIndustry.threatLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                  currentIndustry.threatLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {currentIndustry.threatLevel}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Threat Overview', icon: Eye },
              { id: 'actors', label: 'Threat Actors', icon: Users },
              { id: 'patterns', label: 'Attack Patterns', icon: Activity },
              { id: 'comparison', label: 'Industry Comparison', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vulnerability Trends */}
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Vulnerability Trends (6 months)</span>
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vulnerabilityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey={selectedIndustry} 
                    stroke={currentIndustry?.color || '#3b82f6'} 
                    strokeWidth={3}
                  />
                  <Line type="monotone" dataKey="technology" stroke="#d1d5db" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="financial" stroke="#d1d5db" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Malware Distribution */}
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Malware Types Distribution</span>
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={threatLandscape.malwareTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="percentage"
                  >
                    {threatLandscape.malwareTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {threatLandscape.malwareTypes.map((malware, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: malware.color }}></div>
                      <span>{malware.name}</span>
                    </div>
                    <span className="font-medium">{malware.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'actors' && (
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Active Threat Actors Targeting {currentIndustry?.name}</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentThreats.map((actor, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{actor.name}</h4>
                      <p className="text-sm text-gray-600">{actor.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getActivityColor(actor.activity)}`}>
                      {actor.activity}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Specialty:</span>
                    <span className="ml-2">{actor.specialty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>MITRE ATT&CK Techniques - {currentIndustry?.name}</span>
              </h3>
            </div>
            <div className="space-y-4">
              {currentPatterns.map((pattern, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{pattern.technique}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Frequency:</span>
                          <span className="font-semibold">{pattern.frequency}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Trend:</span>
                          {getTrendIcon(pattern.trend)}
                          <span className="text-sm capitalize">{pattern.trend}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${pattern.frequency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Industry Comparison Metrics</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Industry</th>
                    <th className="text-left py-3">Security Incidents</th>
                    <th className="text-left py-3">Avg Breach Cost</th>
                    <th className="text-left py-3">Avg Recovery Time</th>
                    <th className="text-left py-3">Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {industryMetrics.map((metric, index) => (
                    <tr 
                      key={index} 
                      className={`border-b ${
                        metric.industry === currentIndustry?.name ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="py-3 font-medium">{metric.industry}</td>
                      <td className="py-3">{metric.incidents.toLocaleString()}</td>
                      <td className="py-3">${(metric.avgCost / 1000000).toFixed(1)}M</td>
                      <td className="py-3">{metric.avgDays} days</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${
                            metric.riskScore >= 8 ? 'text-red-600' :
                            metric.riskScore >= 7 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {metric.riskScore}/10
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                metric.riskScore >= 8 ? 'bg-red-500' :
                                metric.riskScore >= 7 ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${(metric.riskScore / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 pt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View Detailed Intelligence</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Configure Industry Alerts</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Industry Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryThreatProfiler;