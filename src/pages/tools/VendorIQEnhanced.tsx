import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { 
  Building2,
  Upload,
  Download,
  FileText,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Globe,
  Zap,
  Lock,
  Eye,
  Users,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Award,
  Database,
  Network,
  Activity,
  Settings,
  Save,
  Send,
  Clock,
  DollarSign,
  Share2,
  GitCompare,
  LineChart,
  PieChart,
  Layers,
  Cloud,
  UserPlus,
  Bell,
  Mail,
  ExternalLink,
  Archive,
  Star
  } from 'lucide-react';

import { Alert, AlertDescription } from '../../components/ui/alert';

const VendorIQEnhanced = () => {
  // Core state management
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentData, setAssessmentData] = useState({});
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  
  // Advanced features state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [viewMode, setViewMode] = useState('grid');
  
  // Integration state
  const [integrationData, setIntegrationData] = useState({
    scorecardResults: [],
    onboardingStatuses: [],
    breachAlerts: []
  });
  
  // Collaboration state
  const [collaborators, setCollaborators] = useState([]);
  const [sharedAssessments, setSharedAssessments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Analytics state
  const [portfolioAnalytics, setPortfolioAnalytics] = useState({
    riskTrends: [],
    industryBenchmarks: {},
    complianceScores: {},
    riskDistribution: {}
  });

  // Supabase-like data persistence simulation
  const supabaseClient = {
    // Vendors table operations
    vendors: {
      async insert(data) {
        const newVendor = {
          id: Date.now(),
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 'current_user_id',
          organization_id: 'org_123'
        };
        setVendors(prev => [...prev, newVendor]);
        return { data: newVendor, error: null };
      },
      
      async select(query = '*') {
        // Simulate filtering based on organization and user permissions
        return { 
          data: vendors.filter(v => v.organization_id === 'org_123'), 
          error: null 
        };
      },
      
      async update(id, updates) {
        const updatedVendor = {
          ...updates,
          updated_at: new Date().toISOString()
        };
        setVendors(prev => prev.map(v => 
          v.id === id ? { ...v, ...updatedVendor } : v
        ));
        return { data: updatedVendor, error: null };
      },
      
      async delete(id) {
        setVendors(prev => prev.filter(v => v.id !== id));
        return { error: null };
      }
    },
    
    // Assessments table operations
    assessments: {
      async insert(data) {
        // Store detailed assessment responses
        const assessment = {
          id: Date.now(),
          ...data,
          created_at: new Date().toISOString(),
          created_by: 'current_user_id'
        };
        return { data: assessment, error: null };
      }
    },
    
    // Real-time subscriptions
    channel(tableName) {
      return {
        on(event, callback) {
          // Simulate real-time updates
          // Subscribed to table changes
          return this;
        },
        subscribe() {
          // Subscription active
        }
      };
    }
  };

  // NIST Framework Mappings (from previous version)
  const nistMappings = {
    financial: {
      framework: 'NIST CSF',
      functions: ['ID.RA', 'ID.SC'],
      description: 'Identify supply chain risks and business environment'
    },
    operational: {
      framework: 'NIST SP 800-161',
      controls: ['SA-9', 'SA-12', 'CP-2'],
      description: 'Supply chain risk management and business continuity'
    },
    cyber: {
      framework: 'NIST CSF',
      functions: ['PR.AC', 'PR.DS', 'DE.CM', 'RS.RP'],
      description: 'Protect, detect, and respond to cybersecurity events'
    },
    compliance: {
      framework: 'NIST SP 800-53',
      controls: ['CA-2', 'CA-7', 'SA-4'],
      description: 'Security assessment, monitoring, and acquisition'
    },
    geographic: {
      framework: 'NIST SP 800-161',
      controls: ['SA-14', 'SA-15'],
      description: 'Geographic and geopolitical supply chain risks'
    },
    strategic: {
      framework: 'NIST CSF',
      functions: ['ID.RA', 'ID.RM'],
      description: 'Risk assessment and risk management strategy'
    },
    reputation: {
      framework: 'NIST CSF',
      functions: ['ID.RA', 'RC.IM'],
      description: 'Risk assessment and improvement communications'
    },
    supplyChain: {
      framework: 'NIST SP 800-161',
      controls: ['SA-9', 'SA-10', 'SA-11'],
      description: 'Supply chain protection and risk management'
    }
  };

  // Cross-tool integration functions
  const integrateWithScorecard = async (vendorId) => {
    try {
      // Fetch scorecard results for vendor
      const scorecardData = await fetch(`/api/vendor-scorecard/${vendorId}`);
      const results = await scorecardData.json();
      
      // Update VendorIQ with scorecard security scores
      if (results.securityScore) {
        await supabaseClient.vendors.update(vendorId, {
          integrated_security_score: results.securityScore,
          last_scorecard_update: new Date().toISOString()
        });
      }
      
      return results;
    } catch (error) {
      console.error('Scorecard integration error:', error);
      return null;
    }
  };

  const exportToOnboarding = async (vendor) => {
    try {
      // Prepare onboarding data from VendorIQ assessment
      const onboardingData = {
        vendor_id: vendor.id,
        vendor_name: vendor.name,
        risk_score: vendor.overallScore,
        risk_level: vendor.riskLevel,
        dimension_scores: vendor.dimensionScores,
        recommended_actions: generateRecommendations(vendor),
        approval_required: vendor.overallScore > 3.0,
        priority_level: vendor.overallScore > 4.0 ? 'High' : vendor.overallScore > 2.5 ? 'Medium' : 'Low'
      };
      
      // Send to onboarding wizard
      const response = await fetch('/api/onboarding/import-vendoriq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardingData)
      });
      
      if (response.ok) {
        // Update vendor with onboarding status
        await supabaseClient.vendors.update(vendor.id, {
          onboarding_status: 'In Progress',
          onboarding_initiated: new Date().toISOString()
        });
        
        return true;
      }
    } catch (error) {
      console.error('Onboarding integration error:', error);
      return false;
    }
  };

const syncWithBreachMonitor = async () => {
  try {
    // Get breach alerts for all vendors
    const response = await fetch('/api/breach-monitor/vendor-alerts');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let breachData = [];

    try {
      breachData = await response.json();
    } catch (parseError) {
      // No breach data available or invalid JSON response
      // Handle the case when the response is not a valid JSON or empty
      // You can set a default value for breachData or update the state accordingly
      setIntegrationData(prev => ({ ...prev, breachAlerts: [] }));
      return;
    }

    // Update vendor risk scores based on recent breaches
    for (const alert of breachData) {
      const vendor = vendors.find(v => v.name.toLowerCase().includes(alert.vendorName.toLowerCase()));
      if (vendor) {
        const riskIncrease = alert.severity === 'Critical' ? 0.5 : alert.severity === 'High' ? 0.3 : 0.1;
        await supabaseClient.vendors.update(vendor.id, {
          current_risk_adjustment: riskIncrease,
          last_breach_alert: alert.date,
          breach_alert_count: (vendor.breach_alert_count || 0) + 1
        });
      }
    }

    setIntegrationData(prev => ({ ...prev, breachAlerts: breachData }));
  } catch (error) {
    console.error('Breach monitor sync error:', error);
  }
};

  // Advanced analytics functions
  const calculatePortfolioAnalytics = () => {
    if (vendors.length === 0) return;

    // Risk trend analysis
    const riskTrends = vendors.map(vendor => ({
      date: vendor.assessmentDate,
      riskScore: vendor.overallScore,
      vendorName: vendor.name
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Industry benchmarking
    const industryGroups = vendors.reduce((acc, vendor) => {
      const industry = vendor.category || 'Other';
      if (!acc[industry]) acc[industry] = [];
      acc[industry].push(vendor.overallScore);
      return acc;
    }, {});

    const industryBenchmarks = Object.entries(industryGroups).reduce((acc, [industry, scores]) => {
      acc[industry] = {
        average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
        count: scores.length,
        min: Math.min(...scores),
        max: Math.max(...scores)
      };
      return acc;
    }, {});

    // Risk distribution analysis
    const riskDistribution = vendors.reduce((acc, vendor) => {
      const level = vendor.riskLevel || 'Unknown';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    setPortfolioAnalytics({
      riskTrends,
      industryBenchmarks,
      riskDistribution,
      complianceScores: calculateComplianceScores()
    });
  };

  const calculateComplianceScores = () => {
    const frameworks = ['NIST CSF', 'NIST SP 800-161', 'NIST SP 800-53'];
    return frameworks.reduce((acc, framework) => {
      const frameworkScores = vendors.map(vendor => {
        // Calculate framework-specific compliance based on dimension scores
        const relevantDimensions = Object.entries(nistMappings)
          .filter(([_, mapping]) => mapping.framework === framework)
          .map(([dimension]) => vendor.dimensionScores?.[dimension] || 0);
        
        if (relevantDimensions.length === 0) return 0;
        const avgScore = relevantDimensions.reduce((sum, score) => sum + score, 0) / relevantDimensions.length;
        return Math.max(0, 100 - (avgScore / 5 * 100)); // Convert to compliance percentage
      });

      acc[framework] = {
        average: frameworkScores.reduce((sum, score) => sum + score, 0) / frameworkScores.length,
        distribution: frameworkScores
      };
      return acc;
    }, {});
  };

  // Generate recommendations based on risk scores
  const generateRecommendations = (vendor) => {
    const recommendations = [];
    
    if (vendor.overallScore > 4.0) {
      recommendations.push({
        priority: 'Critical',
        action: 'Require immediate risk mitigation plan before contract execution',
        timeline: 'Immediate'
      });
    }
    
    if (vendor.dimensionScores?.cyber > 3.5) {
      recommendations.push({
        priority: 'High',
        action: 'Conduct detailed cybersecurity assessment and require security attestations',
        timeline: '30 days'
      });
    }
    
    if (vendor.dimensionScores?.financial > 3.0) {
      recommendations.push({
        priority: 'Medium',
        action: 'Require financial guarantees or insurance coverage increases',
        timeline: '60 days'
      });
    }
    
    return recommendations;
  };

  // Component initialization
  useEffect(() => {
    // Initialize real-time subscriptions
    const vendorSubscription = supabaseClient
      .channel('vendors')
      .on('INSERT', (payload) => {
        setVendors(prev => [...prev, payload.new]);
      })
      .on('UPDATE', (payload) => {
        setVendors(prev => prev.map(v => 
          v.id === payload.new.id ? payload.new : v
        ));
      })
      .on('DELETE', (payload) => {
        setVendors(prev => prev.filter(v => v.id !== payload.old.id));
      })
      .subscribe();

    // Load initial data
    loadVendorData();
    calculatePortfolioAnalytics();
    syncWithBreachMonitor();

    return () => {
      vendorSubscription?.unsubscribe?.();
    };
  }, [vendors.length]);

  const loadVendorData = async () => {
    try {
      const { data, error } = await supabaseClient.vendors.select();
      if (!error && data) {
        setVendors(data);
      }
    } catch (error) {
      console.error('Error loading vendor data:', error);
    }
  };

  // Risk calculation functions (from previous version)
  const calculateRiskScore = (responses, category) => {
    // Implementation from previous version
    return 2.5; // Default score
  };

  const calculateOverallRisk = (responses) => {
    // Implementation from previous version
    return 2.5; // Default score
  };

  const getRiskLevel = (score) => {
    if (score <= 2.0) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (score <= 3.5) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  // Progress component
  const Progress = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      ></div>
    </div>
  );

  // Enhanced Dashboard with Analytics
  const renderEnhancedDashboard = () => (
    <div className="space-y-6">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold">{vendors.length}</p>
              </div>
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {vendors.filter(v => v.riskLevel === 'High').length}
                </p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Risk</p>
                <p className="text-2xl font-bold text-orange-600">
                  {vendors.length > 0 ? 
                    (vendors.reduce((sum, v) => sum + (v.overallScore || 0), 0) / vendors.length).toFixed(1) : 
                    '0.0'
                  }
                </p>
              </div>
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">NIST Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {portfolioAnalytics.complianceScores['NIST CSF']?.average?.toFixed(0) || '0'}%
                </p>
              </div>
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Integrations</p>
                <p className="text-2xl font-bold text-purple-600">
                  {integrationData.breachAlerts.length}
                </p>
              </div>
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Enhanced */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('analytics')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Analytics →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setCurrentView('assessment')}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-3"
            >
              <Plus className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">New Assessment</div>
                <div className="text-sm opacity-90">NIST-aligned evaluation</div>
              </div>
            </button>
            
            <button
              onClick={() => setCurrentView('comparison')}
              className="border border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <GitCompare className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Compare Vendors</div>
                <div className="text-sm text-gray-600">Side-by-side analysis</div>
              </div>
            </button>
            
            <button
              onClick={syncWithBreachMonitor}
              className="border border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <RefreshCw className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Sync Integrations</div>
                <div className="text-sm text-gray-600">Update breach alerts</div>
              </div>
            </button>
            
            <button
              onClick={() => setCurrentView('collaboration')}
              className="border border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Collaborate</div>
                <div className="text-sm text-gray-600">Share assessments</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Portfolio Risk Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Risk trend visualization would appear here</p>
              <p className="text-sm text-gray-500">Showing {vendors.length} vendors over time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Vendor List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Vendor Portfolio ({vendors.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {viewMode === 'grid' ? <Layers className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {vendors.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Vendor Assessments</h3>
              <p className="text-gray-500 mb-6">Start with your first NIST-aligned vendor risk assessment.</p>
              <button
                onClick={() => setCurrentView('assessment')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                Start First Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {vendors
                .filter(vendor => {
                  const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      (vendor.category || '').toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesRisk = filterRisk === 'All' || vendor.riskLevel === filterRisk;
                  return matchesSearch && matchesRisk;
                })
                .map((vendor) => {
                  const riskLevel = getRiskLevel(vendor.overallScore || 0);
                  return (
                    <div 
                      key={vendor.id} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedVendor(vendor)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedVendors.includes(vendor.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                if (e.target.checked) {
                                  setSelectedVendors([...selectedVendors, vendor.id]);
                                } else {
                                  setSelectedVendors(selectedVendors.filter(id => id !== vendor.id));
                                }
                              }}
                              className="text-blue-600"
                            />
                            <h4 className="font-semibold">{vendor.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevel.bg} ${riskLevel.color} ${riskLevel.border} border`}>
                              {riskLevel.level} Risk
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              NIST Aligned
                            </span>
                            {vendor.breach_alert_count > 0 && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                {vendor.breach_alert_count} Alerts
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span>{vendor.category}</span>
                            <span>Assessed: {vendor.assessmentDate}</span>
                            <span>Updated: {vendor.updated_at?.split('T')[0]}</span>
                            {vendor.onboarding_status && (
                              <span className="text-green-600">Onboarding: {vendor.onboarding_status}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${riskLevel.color}`}>
                              {vendor.overallScore?.toFixed(1) || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600">Risk Score</div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                exportToOnboarding(vendor);
                              }}
                              className="text-blue-500 hover:text-blue-700 p-1"
                              title="Export to Onboarding"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                integrateWithScorecard(vendor.id);
                              }}
                              className="text-green-500 hover:text-green-700 p-1"
                              title="Sync with Scorecard"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Multi-select actions */}
      {selectedVendors.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{selectedVendors.length} vendors selected</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentView('comparison')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <GitCompare className="h-4 w-4" />
                  Compare Selected
                </button>
                <button
                  onClick={() => setCurrentView('bulk-export')}
                  className="border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-100 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Bulk Export
                </button>
                <button
                  onClick={() => setSelectedVendors([])}
                  className="text-gray-600 hover:text-gray-800 px-2"
                >
                  Clear
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Vendor Comparison Dashboard
  const renderComparisonDashboard = () => {
    const compareVendors = selectedVendors.length > 0 
      ? vendors.filter(v => selectedVendors.includes(v.id))
      : vendors.slice(0, 3); // Default to first 3 vendors

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Vendor Comparison Dashboard</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Dimension Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Risk Dimension</th>
                    {compareVendors.map(vendor => (
                      <th key={vendor.id} className="text-center p-3">{vendor.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(nistMappings).map(dimension => (
                    <tr key={dimension} className="border-b">
                      <td className="p-3 font-medium capitalize">
                        {dimension.replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      {compareVendors.map(vendor => {
                        const score = vendor.dimensionScores?.[dimension] || 0;
                        const riskLevel = getRiskLevel(score);
                        return (
                          <td key={vendor.id} className="p-3 text-center">
                            <span className={`font-bold ${riskLevel.color}`}>
                              {score.toFixed(1)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-bold">Overall Risk Score</td>
                    {compareVendors.map(vendor => {
                      const riskLevel = getRiskLevel(vendor.overallScore || 0);
                      return (
                        <td key={vendor.id} className="p-3 text-center">
                          <span className={`text-xl font-bold ${riskLevel.color}`}>
                            {vendor.overallScore?.toFixed(1) || 'N/A'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Visual Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Profile Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Risk comparison charts would appear here</p>
                <p className="text-sm text-gray-500">Comparing {compareVendors.length} vendors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Advanced Analytics Dashboard
  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Portfolio Analytics</h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      {/* Industry Benchmarking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Industry Risk Benchmarking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(portfolioAnalytics.industryBenchmarks).map(([industry, data]) => (
              <div key={industry} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{industry}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Risk:</span>
                    <span className="font-medium">{data.average?.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vendors:</span>
                    <span className="font-medium">{data.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Range:</span>
                    <span className="font-medium">{data.min?.toFixed(1)} - {data.max?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* NIST Compliance Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            NIST Framework Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(portfolioAnalytics.complianceScores).map(([framework, data]) => (
              <div key={framework}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{framework}</span>
                  <span className="text-lg font-bold text-blue-600">{data.average?.toFixed(0)}%</span>
                </div>
                <Progress value={data.average || 0} className="h-3" />
                <div className="text-xs text-gray-500 mt-1">
                  Portfolio average compliance score
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Risk Level Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(portfolioAnalytics.riskDistribution).map(([level, count]) => {
              const percentage = vendors.length > 0 ? (count / vendors.length * 100) : 0;
              const config = getRiskLevel(level === 'High' ? 4 : level === 'Medium' ? 3 : 1);
              
              return (
                <div key={level} className="text-center p-4 border rounded-lg">
                  <div className={`text-2xl font-bold ${config.color}`}>{count}</div>
                  <div className="text-sm text-gray-600">{level} Risk</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Collaboration Dashboard
  const renderCollaborationDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Collaboration Center</h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-600">Risk Analyst</div>
                  </div>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Team Member
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Shared Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Shared Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center py-8 text-gray-500">
                <Share2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p>No shared assessments yet</p>
                <p className="text-sm">Share vendor assessments with team members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">New vendor assessment completed</p>
                <p className="text-sm text-gray-600">TechCorp Solutions - Risk Score: 2.4</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Breach alert received</p>
                <p className="text-sm text-gray-600">DataFlow Analytics - Security incident reported</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back to Toolkit Button */}
        <Link to="/toolkit" className="inline-flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VendorIQ Enterprise Platform
          </h1>
          <p className="text-lg text-gray-600">
            NIST-aligned vendor risk management with real-time collaboration and advanced analytics
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: BarChart3 },
            { id: 'assessment', label: '📝 Assessment', icon: FileText },
            { id: 'comparison', label: '⚖️ Compare', icon: GitCompare },
            { id: 'analytics', label: '📈 Analytics', icon: LineChart },
            { id: 'collaboration', label: '👥 Collaborate', icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentView(tab.id);
                setSelectedVendor(null);
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                currentView === tab.id && !selectedVendor 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {currentView === 'dashboard' && !selectedVendor && renderEnhancedDashboard()}
        {currentView === 'comparison' && renderComparisonDashboard()}
        {currentView === 'analytics' && renderAnalyticsDashboard()}
        {currentView === 'collaboration' && renderCollaborationDashboard()}
        
        {/* Assessment and other views would be rendered here */}
        {currentView === 'assessment' && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Assessment Wizard</h3>
            <p className="text-gray-500">NIST-aligned vendor risk assessment would be rendered here</p>
          </div>
        )}

        {/* Vendor Detail View */}
        {selectedVendor && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedVendor.name}</h2>
                <p className="text-gray-600">
                  {selectedVendor.category} • Risk Score: {selectedVendor.overallScore?.toFixed(1)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={() => exportToOnboarding(selectedVendor)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Export to Onboarding
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Vendor details would be rendered here */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Vendor Details & Risk Analysis</h3>
                  <p className="text-gray-600">Comprehensive vendor assessment results would be displayed here with NIST framework mappings, dimension scores, and integration status.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="fixed bottom-4 right-4 space-y-2">
            {notifications.map((notification, index) => (
              <div key={index} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm opacity-90">{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorIQEnhanced;