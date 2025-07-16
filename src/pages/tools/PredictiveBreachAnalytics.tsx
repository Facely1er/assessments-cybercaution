import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { 
  Brain, TrendingUp, AlertTriangle, Shield, Target, Zap,
  BarChart3, Activity, Clock, Users, Server, Lock,
  ArrowUp, ArrowDown, Eye, RefreshCw, Download, 
  Gauge, LineChart, PieChart, Settings, AlertCircle,
  CheckCircle, XCircle, Calendar, Database, Network
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, 
  Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ScatterChart, Scatter
} from 'recharts';

interface Model {
  id: string;
  name: string;
  accuracy: number;
  type: string;
}

interface Prediction {
  category: string;
  probability: number;
  confidence: number;
  timeframe: string;
  riskFactors: string[];
  mitigation: string;
  trend: string;
}

interface RiskFactor {
  factor: string;
  impact: number;
  prevalence: number;
  controllability: number;
}

interface TimelineData {
  month: string;
  probability: number;
  confidence: number;
}

interface AttackVector {
  name: string;
  likelihood: number;
  color: string;
}

interface ModelPerformance {
  metric: string;
  value: number;
  benchmark: number;
}

const PredictiveBreachAnalytics: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('ensemble');
  const [timeHorizon, setTimeHorizon] = useState<string>('30');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);
  const [activeTab, setActiveTab] = useState<string>('predictions');
  const [lastAnalysis, setLastAnalysis] = useState<Date>(new Date());

  // Risk prediction models
  const models: Model[] = [
    { id: 'ensemble', name: 'Ensemble Model', accuracy: 94.3, type: 'Combined ML' },
    { id: 'neural', name: 'Neural Network', accuracy: 92.1, type: 'Deep Learning' },
    { id: 'gradient', name: 'Gradient Boosting', accuracy: 89.7, type: 'Tree-based' },
    { id: 'svm', name: 'Support Vector Machine', accuracy: 87.4, type: 'Classification' }
  ];

  // Breach probability predictions
  const predictions: Prediction[] = [
    {
      category: 'Email-based Attacks',
      probability: 87.3,
      confidence: 94,
      timeframe: '15-30 days',
      riskFactors: ['Phishing susceptibility', 'Email security gaps', 'User training deficits'],
      mitigation: 'HIGH',
      trend: 'increasing'
    },
    {
      category: 'Web Application Exploits',
      probability: 72.1,
      confidence: 89,
      timeframe: '30-60 days',
      riskFactors: ['Unpatched vulnerabilities', 'SQL injection vectors', 'XSS exposure'],
      mitigation: 'MEDIUM',
      trend: 'stable'
    },
    {
      category: 'Insider Threats',
      probability: 45.6,
      confidence: 78,
      timeframe: '60-90 days',
      riskFactors: ['Privileged access sprawl', 'Monitoring gaps', 'Policy violations'],
      mitigation: 'LOW',
      trend: 'decreasing'
    },
    {
      category: 'Supply Chain Compromise',
      probability: 38.9,
      confidence: 82,
      timeframe: '90+ days',
      riskFactors: ['Third-party dependencies', 'Vendor assessments', 'Update mechanisms'],
      mitigation: 'MEDIUM',
      trend: 'increasing'
    }
  ];

  // Risk factor analysis
  const riskFactors: RiskFactor[] = [
    { factor: 'Technical Vulnerabilities', impact: 85, prevalence: 78, controllability: 92 },
    { factor: 'Human Factors', impact: 79, prevalence: 84, controllability: 65 },
    { factor: 'Process Gaps', impact: 71, prevalence: 69, controllability: 88 },
    { factor: 'Technology Debt', impact: 66, prevalence: 73, controllability: 70 },
    { factor: 'Third-party Risk', impact: 58, prevalence: 61, controllability: 45 },
    { factor: 'Regulatory Changes', impact: 52, prevalence: 44, controllability: 35 }
  ];

  // Breach prediction timeline
  const timelineData: TimelineData[] = [
    { month: 'Jul', probability: 23.4, confidence: 78 },
    { month: 'Aug', probability: 31.7, confidence: 81 },
    { month: 'Sep', probability: 45.2, confidence: 85 },
    { month: 'Oct', probability: 58.9, confidence: 88 },
    { month: 'Nov', probability: 67.3, confidence: 91 },
    { month: 'Dec', probability: 72.1, confidence: 89 }
  ];

  // Attack vector likelihood
  const attackVectors: AttackVector[] = [
    { name: 'Social Engineering', likelihood: 34, color: '#ef4444' },
    { name: 'Technical Exploitation', likelihood: 28, color: '#f97316' },
    { name: 'Credential Abuse', likelihood: 22, color: '#eab308' },
    { name: 'Malware Installation', likelihood: 12, color: '#22c55e' },
    { name: 'Physical Access', likelihood: 4, color: '#3b82f6' }
  ];

  // Model performance metrics
  const modelPerformance: ModelPerformance[] = [
    { metric: 'Precision', value: 0.943, benchmark: 0.850 },
    { metric: 'Recall', value: 0.891, benchmark: 0.800 },
    { metric: 'F1-Score', value: 0.916, benchmark: 0.825 },
    { metric: 'AUC-ROC', value: 0.967, benchmark: 0.900 }
  ];

  const getProbabilityColor = (probability: number): string => {
    if (probability >= 80) return 'text-red-600 bg-red-100';
    if (probability >= 60) return 'text-orange-600 bg-orange-100';
    if (probability >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <ArrowDown className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastAnalysis(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Predictive Breach Analytics (TypeScript)</h1>
            <p className="text-gray-600">AI-powered vulnerability prediction and risk forecasting</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Brain className="w-4 h-4" />
              <span>Model: {models.find(m => m.id === selectedModel)?.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last analysis: {lastAnalysis.toLocaleTimeString()}</span>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Model Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Analysis Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prediction Model</label>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.accuracy}%)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon (days)</label>
                <select 
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Threshold</label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">{confidenceThreshold}%</span>
              </div>
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Run Analysis</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'predictions', label: 'Breach Predictions', icon: Target },
              { id: 'risk-factors', label: 'Risk Factors', icon: AlertTriangle },
              { id: 'model-performance', label: 'Model Performance', icon: BarChart3 }
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
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {/* Breach Predictions Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Breach Probability Predictions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {predictions.map((prediction: Prediction, index: number) => (
                        <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="font-semibold text-gray-900">{prediction.category}</span>
                              {getTrendIcon(prediction.trend)}
                            </div>
                            <span className={`px-3 py-1 rounded-lg font-bold text-lg ${getProbabilityColor(prediction.probability)}`}>
                              {prediction.probability}%
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Confidence:</span>
                              <span className={`ml-2 font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                                {prediction.confidence}%
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Timeframe:</span>
                              <span className="ml-2">{prediction.timeframe}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Mitigation Priority:</span>
                              <span className={`ml-2 font-semibold ${
                                prediction.mitigation === 'HIGH' ? 'text-red-600' :
                                prediction.mitigation === 'MEDIUM' ? 'text-orange-600' :
                                'text-green-600'
                              }`}>
                                {prediction.mitigation}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="font-medium text-gray-700">Key Risk Factors:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {prediction.riskFactors.map((factor: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Attack Vector Likelihood */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Attack Vector Likelihood</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={attackVectors}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="likelihood"
                      >
                        {attackVectors.map((entry: AttackVector, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {attackVectors.map((vector, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: vector.color }}></div>
                          <span>{vector.name}</span>
                        </div>
                        <span className="font-medium">{vector.likelihood}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prediction Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Breach Probability Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="probability" stroke="#ef4444" fill="#ef444440" />
                    <Line type="monotone" dataKey="confidence" stroke="#3b82f6" strokeDasharray="3 3" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'risk-factors' && (
          <div className="space-y-6">
            {/* Risk Factor Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Risk Factor Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={riskFactors}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" />
                    <PolarRadiusAxis angle={0} domain={[0, 100]} />
                    <Radar
                      name="Impact"
                      dataKey="impact"
                      stroke="#ef4444"
                      fill="#ef444440"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Prevalence"
                      dataKey="prevalence"
                      stroke="#f97316"
                      fill="#f9731640"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Controllability"
                      dataKey="controllability"
                      stroke="#22c55e"
                      fill="#22c55e40"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Factor Details */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskFactors.map((factor: RiskFactor, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{factor.factor}</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Impact</span>
                            <span>{factor.impact}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${factor.impact}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Prevalence</span>
                            <span>{factor.prevalence}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${factor.prevalence}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Controllability</span>
                            <span>{factor.controllability}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${factor.controllability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'model-performance' && (
          <div className="space-y-6">
            {/* Model Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Model Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {modelPerformance.map((metric: ModelPerformance, index: number) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{metric.value.toFixed(3)}</div>
                      <div className="text-sm text-gray-600">{metric.metric}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Benchmark: {metric.benchmark.toFixed(3)}
                        <span className={`ml-1 ${metric.value > metric.benchmark ? 'text-green-600' : 'text-red-600'}`}>
                          ({metric.value > metric.benchmark ? '+' : ''}{((metric.value - metric.benchmark) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Model Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Model Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Model</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Accuracy</th>
                        <th className="text-left py-2">Training Time</th>
                        <th className="text-left py-2">Prediction Speed</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((model: Model, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 font-medium">{model.name}</td>
                          <td className="py-2">{model.type}</td>
                          <td className="py-2">{model.accuracy}%</td>
                          <td className="py-2">{Math.floor(Math.random() * 120) + 30}min</td>
                          <td className="py-2">{Math.floor(Math.random() * 50) + 10}ms</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              model.id === selectedModel 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {model.id === selectedModel ? 'Active' : 'Available'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 pt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View Detailed Predictions</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>Configure Alerts</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictiveBreachAnalytics;