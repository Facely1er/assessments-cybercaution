import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Clock, Calculator, Target, TrendingUp, AlertTriangle,
  Server, Database, Network, Shield, BarChart3,
  Download, RefreshCw, CheckCircle, Info, Zap,
  DollarSign, Calendar, Users, Building2, Save,
  Loader2, WifiOff, Wifi, AlertCircle, X, FileText
} from 'lucide-react';

// CONFIGURATION - Update these with your actual Supabase credentials
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

// Supabase client setup
const createSupabaseClient = () => {
  if (typeof window !== 'undefined' && window.supabase) {
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  // For development without Supabase, return mock client
  return {
    from: (table) => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
      upsert: () => Promise.resolve({ data: [], error: null }),
      delete: () => Promise.resolve({ data: null, error: null })
    }),
    channel: () => ({ on: () => ({ subscribe: () => {} }) })
  };
};

const RecoveryTimeCalculator = () => {
  // Core State
  const [currentStep, setCurrentStep] = useState(0);
  const [organizationName, setOrganizationName] = useState('');
  const [businessData, setBusinessData] = useState({});
  const [systemData, setSystemData] = useState({});
  const [requirements, setRequirements] = useState({});
  const [rtoRpoResults, setRtoRpoResults] = useState(null);
  const [costAnalysis, setCostAnalysis] = useState(null);
  
  // System State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [sessionId] = useState(() => `rt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [lastSaved, setLastSaved] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  
  // Supabase client
  const [supabase] = useState(() => createSupabaseClient());

  const calculatorSteps = [
    { id: 'business', title: 'Business Impact', description: 'Define business criticality and impact' },
    { id: 'systems', title: 'System Inventory', description: 'Catalog critical systems and dependencies' },
    { id: 'requirements', title: 'Recovery Requirements', description: 'Set recovery time and point objectives' },
    { id: 'analysis', title: 'Gap Analysis', description: 'Analyze current vs required capabilities' },
    { id: 'recommendations', title: 'Optimization Plan', description: 'Review recommendations and cost analysis' }
  ];

  const businessImpactLevels = [
    {
      level: 'Critical',
      description: 'Mission-critical operations that cannot tolerate outages',
      maxDowntime: '< 1 hour',
      maxDataLoss: '< 15 minutes',
      examples: ['Payment processing', 'Emergency services', 'Life safety systems'],
      color: 'red'
    },
    {
      level: 'High',
      description: 'Important business operations with significant impact',
      maxDowntime: '1-4 hours',
      maxDataLoss: '15 minutes - 1 hour',
      examples: ['Customer service', 'Manufacturing', 'Financial systems'],
      color: 'orange'
    },
    {
      level: 'Medium',
      description: 'Standard business operations with moderate impact',
      maxDowntime: '4-24 hours',
      maxDataLoss: '1-4 hours',
      examples: ['HR systems', 'Marketing', 'Reporting systems'],
      color: 'yellow'
    },
    {
      level: 'Low',
      description: 'Non-critical operations that can tolerate extended outages',
      maxDowntime: '24-72 hours',
      maxDataLoss: '4-24 hours',
      examples: ['Archive systems', 'Development environments', 'Training systems'],
      color: 'green'
    }
  ];

  const systemTypes = [
    {
      id: 'database',
      name: 'Database Systems',
      icon: Database,
      description: 'Primary and secondary databases',
      recoveryComplexity: 'High',
      typicalRTO: '2-8 hours',
      typicalRPO: '15-60 minutes'
    },
    {
      id: 'application',
      name: 'Application Servers',
      icon: Server,
      description: 'Web and application servers',
      recoveryComplexity: 'Medium',
      typicalRTO: '1-4 hours',
      typicalRPO: '15-30 minutes'
    },
    {
      id: 'network',
      name: 'Network Infrastructure',
      icon: Network,
      description: 'Routers, switches, firewalls',
      recoveryComplexity: 'Medium',
      typicalRTO: '30 minutes - 2 hours',
      typicalRPO: '5-15 minutes'
    },
    {
      id: 'storage',
      name: 'Storage Systems',
      icon: Building2,
      description: 'SAN, NAS, and file systems',
      recoveryComplexity: 'High',
      typicalRTO: '1-6 hours',
      typicalRPO: '15-60 minutes'
    },
    {
      id: 'security',
      name: 'Security Systems',
      icon: Shield,
      description: 'SIEM, IDS/IPS, authentication',
      recoveryComplexity: 'Medium',
      typicalRTO: '1-3 hours',
      typicalRPO: '5-30 minutes'
    },
    {
      id: 'workstation',
      name: 'Workstations',
      icon: Users,
      description: 'End-user workstations and devices',
      recoveryComplexity: 'Low',
      typicalRTO: '2-8 hours',
      typicalRPO: '1-4 hours'
    }
  ];

  // Initialize component
  useEffect(() => {
    initializeApp();
    return () => {
      // Cleanup any subscriptions
    };
  }, []);

  const initializeApp = async () => {
    try {
      await testConnection();
      await loadExistingSession();
      setupAutoSave();
    } catch (err) {
      console.error('Initialization failed:', err);
      setError('Failed to initialize recovery time calculator');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setConnectionStatus('connecting');
      
      const { data, error } = await supabase
        .from('recovery_time_sessions')
        .select('id')
        .limit(1);
      
      if (error && error.code === '42P01') {
        throw new Error('Database tables not found. Please run the setup SQL scripts.');
      }
      
      setConnectionStatus('connected');
      console.log('✅ Supabase connection successful');
    } catch (err) {
      console.error('❌ Supabase connection failed:', err);
      setConnectionStatus('error');
      setError(err.message || 'Cloud connection failed. Operating in local mode.');
    }
  };

  const loadExistingSession = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('recovery_time_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        setOrganizationName(data.organization_name || '');
        setCurrentStep(data.current_step || 0);
        setAnalysisId(data.analysis_id);
        
        // Load related data
        await loadBusinessData();
        await loadSystemData();
        await loadRequirements();
        await loadAnalysisResults();
      }
    } catch (err) {
      console.log('No existing session found, will create new one');
    }
  };

  const loadBusinessData = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('recovery_time_business_data')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        setBusinessData({
          impactLevel: data.impact_level,
          annualRevenue: data.annual_revenue,
          hourlyRevenue: data.hourly_revenue,
          dataValue: data.data_value
        });
      }
    } catch (err) {
      console.log('No business data found');
    }
  };

  const loadSystemData = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('recovery_time_systems')
        .select('*')
        .eq('session_id', sessionId);

      if (data && data.length > 0) {
        const systems = {};
        data.forEach(system => {
          systems[system.system_type] = {
            dataSize: system.data_size,
            backupFreq: system.backup_frequency,
            type: system.system_type
          };
        });
        setSystemData(systems);
      }
    } catch (err) {
      console.log('No system data found');
    }
  };

  const loadRequirements = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('recovery_time_requirements')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        setRequirements({
          currentRTO: data.current_rto,
          currentRPO: data.current_rpo,
          targetRTO: data.target_rto,
          targetRPO: data.target_rpo,
          improvementCost: data.improvement_cost
        });
      }
    } catch (err) {
      console.log('No requirements data found');
    }
  };

  const loadAnalysisResults = async () => {
    if (connectionStatus !== 'connected' || !analysisId) return;
    
    try {
      const { data, error } = await supabase
        .from('recovery_time_analysis')
        .select('*')
        .eq('analysis_id', analysisId)
        .single();

      if (data) {
        setRtoRpoResults(data.rto_rpo_results);
        setCostAnalysis(data.cost_analysis);
      }
    } catch (err) {
      console.log('No analysis results found');
    }
  };

  const saveSessionData = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      setSaving(true);
      
      const sessionData = {
        session_id: sessionId,
        organization_name: organizationName,
        current_step: currentStep,
        analysis_id: analysisId,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('recovery_time_sessions')
        .upsert(sessionData);

      if (error) throw error;
      
      setLastSaved(new Date());
      await trackAnalytics('session_saved', sessionData);
    } catch (err) {
      console.error('Failed to save session:', err);
      setError('Failed to save session data');
    } finally {
      setSaving(false);
    }
  };

  const saveBusinessData = async (data) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const businessRecord = {
        session_id: sessionId,
        impact_level: data.impactLevel,
        annual_revenue: data.annualRevenue,
        hourly_revenue: data.hourlyRevenue,
        data_value: data.dataValue,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('recovery_time_business_data')
        .upsert(businessRecord);

      if (error) throw error;
      await trackAnalytics('business_data_saved', data);
    } catch (err) {
      console.error('Failed to save business data:', err);
    }
  };

  const saveSystemData = async (systems) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      // Delete existing systems for this session
      await supabase
        .from('recovery_time_systems')
        .delete()
        .eq('session_id', sessionId);

      // Insert new systems
      const systemRecords = Object.keys(systems).map(systemType => ({
        session_id: sessionId,
        system_type: systemType,
        data_size: systems[systemType].dataSize,
        backup_frequency: systems[systemType].backupFreq,
        system_config: systems[systemType],
        updated_at: new Date().toISOString()
      }));

      if (systemRecords.length > 0) {
        const { error } = await supabase
          .from('recovery_time_systems')
          .insert(systemRecords);

        if (error) throw error;
      }
      
      await trackAnalytics('system_data_saved', { systemCount: systemRecords.length });
    } catch (err) {
      console.error('Failed to save system data:', err);
    }
  };

  const saveRequirements = async (reqs) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const requirementsRecord = {
        session_id: sessionId,
        current_rto: reqs.currentRTO,
        current_rpo: reqs.currentRPO,
        target_rto: reqs.targetRTO,
        target_rpo: reqs.targetRPO,
        improvement_cost: reqs.improvementCost,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('recovery_time_requirements')
        .upsert(requirementsRecord);

      if (error) throw error;
      await trackAnalytics('requirements_saved', reqs);
    } catch (err) {
      console.error('Failed to save requirements:', err);
    }
  };

  const saveAnalysisResults = async (rtoRpo, costs) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const newAnalysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const analysisRecord = {
        analysis_id: newAnalysisId,
        session_id: sessionId,
        rto_rpo_results: rtoRpo,
        cost_analysis: costs,
        analysis_date: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('recovery_time_analysis')
        .insert(analysisRecord);

      if (error) throw error;
      
      setAnalysisId(newAnalysisId);
      await trackAnalytics('analysis_completed', { 
        analysisId: newAnalysisId,
        systemCount: Object.keys(systemData).length 
      });
    } catch (err) {
      console.error('Failed to save analysis results:', err);
    }
  };

  const trackAnalytics = async (action, data = {}) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      await supabase
        .from('recovery_time_analytics')
        .insert({
          session_id: sessionId,
          analysis_id: analysisId,
          action,
          data,
          timestamp: new Date().toISOString()
        });
    } catch (err) {
      console.error('Failed to track analytics:', err);
    }
  };

  const setupAutoSave = () => {
    const interval = setInterval(async () => {
      if (connectionStatus === 'connected' && !saving) {
        await saveSessionData();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  };

  const calculateRTORPO = (businessLevel, systemType, dataSize, backupFreq) => {
    const baseRTO = {
      'Critical': { min: 15, max: 60 },
      'High': { min: 60, max: 240 },
      'Medium': { min: 240, max: 1440 },
      'Low': { min: 1440, max: 4320 }
    };

    const baseRPO = {
      'Critical': { min: 5, max: 15 },
      'High': { min: 15, max: 60 },
      'Medium': { min: 60, max: 240 },
      'Low': { min: 240, max: 1440 }
    };

    const systemComplexity = {
      'database': 1.5,
      'storage': 1.4,
      'application': 1.2,
      'network': 1.1,
      'security': 1.2,
      'workstation': 0.8
    };

    const dataSizeMultiplier = dataSize > 10000 ? 1.3 : dataSize > 1000 ? 1.2 : 1.0;
    const backupFreqMultiplier = backupFreq === 'daily' ? 1.2 : backupFreq === 'hourly' ? 1.0 : 0.9;

    const rtoBase = baseRTO[businessLevel];
    const rpoBase = baseRPO[businessLevel];

    const calculatedRTO = Math.round(
      (rtoBase.min + rtoBase.max) / 2 * 
      systemComplexity[systemType] * 
      dataSizeMultiplier * 
      backupFreqMultiplier
    );

    const calculatedRPO = Math.round(
      (rpoBase.min + rpoBase.max) / 2 * 
      backupFreqMultiplier
    );

    return {
      rto: Math.max(calculatedRTO, rtoBase.min),
      rpo: Math.max(calculatedRPO, rpoBase.min),
      businessLevel,
      systemType
    };
  };

  const calculateCosts = (requirements) => {
    const hourlyDowntimeCost = businessData.hourlyRevenue * 0.1; // Estimate 10% of hourly revenue
    const dataLossCost = businessData.dataValue * 0.05; // Estimate 5% of data value per hour lost

    const scenarios = [
      {
        name: 'Current State',
        description: 'Existing backup and recovery capabilities',
        rto: requirements.currentRTO || 48,
        rpo: requirements.currentRPO || 24,
        cost: 0,
        annualRisk: hourlyDowntimeCost * (requirements.currentRTO || 48) * 2 // Assume 2 incidents per year
      },
      {
        name: 'Optimized',
        description: 'Recommended improvements for optimal RTO/RPO',
        rto: requirements.targetRTO,
        rpo: requirements.targetRPO,
        cost: requirements.improvementCost || 50000,
        annualRisk: hourlyDowntimeCost * requirements.targetRTO * 2
      },
      {
        name: 'Gold Standard',
        description: 'Best-in-class recovery capabilities',
        rto: Math.max(requirements.targetRTO * 0.5, 15),
        rpo: Math.max(requirements.targetRPO * 0.5, 5),
        cost: (requirements.improvementCost || 50000) * 2,
        annualRisk: hourlyDowntimeCost * Math.max(requirements.targetRTO * 0.5, 15) * 2
      }
    ];

    return scenarios.map(scenario => ({
      ...scenario,
      roi: scenario.cost > 0 ? 
        ((scenarios[0].annualRisk - scenario.annualRisk) - scenario.cost) / scenario.cost * 100 : 0,
      totalCostRisk: scenario.cost + scenario.annualRisk
    }));
  };

  const exportAnalysisReport = async () => {
    try {
      const reportData = {
        session_id: sessionId,
        analysis_id: analysisId,
        organization_name: organizationName,
        generated_at: new Date().toISOString(),
        business_data: businessData,
        system_inventory: systemData,
        requirements: requirements,
        rto_rpo_results: rtoRpoResults,
        cost_analysis: costAnalysis,
        current_step: currentStep,
        completion_percentage: Math.round((currentStep / (calculatorSteps.length - 1)) * 100)
      };

      const reportContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([reportContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recovery_time_analysis_${organizationName || 'organization'}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      await trackAnalytics('report_exported', reportData);
    } catch (err) {
      console.error('Failed to export report:', err);
      setError('Failed to export analysis report');
    }
  };

  const handleBusinessImpactSelect = async (level) => {
    const newBusinessData = { ...businessData, impactLevel: level };
    setBusinessData(newBusinessData);
    await saveBusinessData(newBusinessData);
  };

  const handleBusinessContextChange = async (field, value) => {
    const newBusinessData = { 
      ...businessData, 
      [field]: value,
      ...(field === 'annualRevenue' ? { hourlyRevenue: value / (365 * 24) } : {})
    };
    setBusinessData(newBusinessData);
    await saveBusinessData(newBusinessData);
  };

  const handleSystemDataChange = async (systemId, field, value) => {
    const newSystemData = {
      ...systemData,
      [systemId]: { 
        ...systemData[systemId], 
        [field]: field === 'dataSize' ? parseInt(value) || 0 : value,
        type: systemId
      }
    };
    setSystemData(newSystemData);
    await saveSystemData(newSystemData);
  };

  const handleRequirementsChange = async (field, value) => {
    const newRequirements = { 
      ...requirements, 
      [field]: parseInt(value) || 0
    };
    setRequirements(newRequirements);
    await saveRequirements(newRequirements);
  };

  const handleCalculateAnalysis = async () => {
    try {
      const calculations = Object.keys(systemData).map(systemId => {
        const system = systemData[systemId];
        return calculateRTORPO(
          businessData.impactLevel,
          system.type,
          system.dataSize,
          system.backupFreq
        );
      });

      const costs = calculateCosts(requirements);
      
      setRtoRpoResults(calculations);
      setCostAnalysis(costs);
      
      await saveAnalysisResults(calculations, costs);
      setCurrentStep(3);
      await saveSessionData();
    } catch (err) {
      console.error('Failed to calculate analysis:', err);
      setError('Failed to perform analysis calculation');
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected': return <Wifi className="w-4 h-4 text-green-600" />;
      case 'connecting': return <Loader2 className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'error': return <WifiOff className="w-4 h-4 text-red-600" />;
      default: return <WifiOff className="w-4 h-4 text-gray-600" />;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'CONNECTED';
      case 'connecting': return 'CONNECTING';
      case 'error': return 'ERROR';
      default: return 'OFFLINE';
    }
  };

  const BusinessImpactStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Impact Assessment</h2>
        <p className="text-gray-600">Define the business criticality of your systems and operations</p>
      </div>

      {/* Organization Setup */}
      {!organizationName && (
        <Card className="border-blue-200 bg-blue-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Organization Name (Optional)
                </label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Enter your organization name"
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={saveSessionData}
                />
              </div>
              <Button 
                onClick={saveSessionData}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {businessImpactLevels.map((level) => (
          <Card 
            key={level.level}
            className={`border-2 hover:border-${level.color}-200 transition-colors cursor-pointer`}
            onClick={() => handleBusinessImpactSelect(level.level)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 bg-${level.color}-500 rounded-full`}></div>
                    <h3 className="font-semibold text-lg">{level.level} Impact</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{level.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Max Downtime:</span> {level.maxDowntime}
                    </div>
                    <div>
                      <span className="font-medium">Max Data Loss:</span> {level.maxDataLoss}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-medium text-sm">Examples:</span>
                    <div className="text-sm text-gray-600">{level.examples.join(', ')}</div>
                  </div>
                </div>
                {businessData.impactLevel === level.level && (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-900">Business Context</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Annual Revenue ($)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-blue-200 rounded"
                  placeholder="e.g., 10000000"
                  value={businessData.annualRevenue || ''}
                  onChange={(e) => handleBusinessContextChange('annualRevenue', parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Critical Data Value ($)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-blue-200 rounded"
                  placeholder="e.g., 1000000"
                  value={businessData.dataValue || ''}
                  onChange={(e) => handleBusinessContextChange('dataValue', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {businessData.impactLevel && (
        <Button 
          onClick={() => setCurrentStep(1)}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Continue to System Inventory
        </Button>
      )}
    </div>
  );

  const SystemInventoryStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Server className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Inventory</h2>
        <p className="text-gray-600">Catalog your critical systems and their recovery characteristics</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {systemTypes.map((system) => (
          <Card key={system.id} className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <system.icon className="h-6 w-6 text-blue-600" />
                <span>{system.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{system.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Complexity:</span>
                  <span className={`font-medium ${
                    system.recoveryComplexity === 'High' ? 'text-red-600' :
                    system.recoveryComplexity === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {system.recoveryComplexity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Typical RTO:</span>
                  <span>{system.typicalRTO}</span>
                </div>
                <div className="flex justify-between">
                  <span>Typical RPO:</span>
                  <span>{system.typicalRPO}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Size (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="e.g., 1000"
                    value={systemData[system.id]?.dataSize || ''}
                    onChange={(e) => handleSystemDataChange(system.id, 'dataSize', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Backup Frequency
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    value={systemData[system.id]?.backupFreq || ''}
                    onChange={(e) => handleSystemDataChange(system.id, 'backupFreq', e.target.value)}
                  >
                    <option value="">Select frequency</option>
                    <option value="continuous">Continuous</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(systemData).length > 0 && (
        <Button 
          onClick={() => setCurrentStep(2)}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Continue to Recovery Requirements
        </Button>
      )}
    </div>
  );

  const RequirementsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recovery Requirements</h2>
        <p className="text-gray-600">Define your recovery time and point objectives</p>
      </div>

      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-4">NIST SP 800-34 Guidance</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>
                <strong>RTO (Recovery Time Objective):</strong> The maximum acceptable time to restore 
                systems after a disruption
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>
                <strong>RPO (Recovery Point Objective):</strong> The maximum acceptable data loss 
                measured in time
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Current Capabilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current RTO (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 24"
                value={requirements.currentRTO || ''}
                onChange={(e) => handleRequirementsChange('currentRTO', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current RPO (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 8"
                value={requirements.currentRPO || ''}
                onChange={(e) => handleRequirementsChange('currentRPO', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Target Objectives</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target RTO (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 4"
                value={requirements.targetRTO || ''}
                onChange={(e) => handleRequirementsChange('targetRTO', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target RPO (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 1"
                value={requirements.targetRPO || ''}
                onChange={(e) => handleRequirementsChange('targetRPO', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Investment Considerations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Improvement Cost ($)
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 100000"
              value={requirements.improvementCost || ''}
              onChange={(e) => handleRequirementsChange('improvementCost', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Include hardware, software, and implementation costs
            </p>
          </div>
        </CardContent>
      </Card>

      {requirements.targetRTO && requirements.targetRPO && (
        <Button 
          onClick={handleCalculateAnalysis}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Calculator className="h-4 w-4 mr-2" />
          )}
          Calculate RTO/RPO Analysis
        </Button>
      )}
    </div>
  );

  const AnalysisStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gap Analysis</h2>
        <p className="text-gray-600">Analysis of current vs required recovery capabilities</p>
      </div>

      {rtoRpoResults && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Calculated RTO Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                {rtoRpoResults.map((result, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
                    <span className="text-sm text-green-800 capitalize">{result.systemType}</span>
                    <span className="font-semibold text-green-900">{result.rto} minutes</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Calculated RPO Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                {rtoRpoResults.map((result, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                    <span className="text-sm text-blue-800 capitalize">{result.systemType}</span>
                    <span className="font-semibold text-blue-900">{result.rpo} minutes</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {costAnalysis && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Cost-Benefit Analysis</h3>
              <div className="grid gap-4">
                {costAnalysis.map((scenario, index) => (
                  <Card key={index} className={`border-2 ${
                    scenario.name === 'Optimized' ? 'border-green-300 bg-green-50' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{scenario.name}</h4>
                          <p className="text-gray-600 text-sm">{scenario.description}</p>
                        </div>
                        {scenario.name === 'Optimized' && (
                          <div className="text-green-600 font-bold">RECOMMENDED</div>
                        )}
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="font-medium">RTO</div>
                          <div>{scenario.rto} hours</div>
                        </div>
                        <div>
                          <div className="font-medium">RPO</div>
                          <div>{scenario.rpo} hours</div>
                        </div>
                        <div>
                          <div className="font-medium">Investment</div>
                          <div>${scenario.cost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="font-medium">Annual Risk</div>
                          <div>${Math.round(scenario.annualRisk).toLocaleString()}</div>
                        </div>
                      </div>
                      {scenario.roi > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-sm">
                            <span className="font-medium">ROI: </span>
                            <span className={scenario.roi > 0 ? 'text-green-600' : 'text-red-600'}>
                              {scenario.roi.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Button 
        onClick={() => setCurrentStep(4)}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        View Optimization Recommendations
      </Button>
    </div>
  );

  const RecommendationsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Optimization Plan</h2>
        <p className="text-gray-600">Recommendations to achieve your target RTO/RPO objectives</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Priority Improvements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <div className="font-semibold">Implement Immutable Backups</div>
                  <div className="text-sm text-green-700">Protect backups from ransomware encryption</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <div className="font-semibold">Increase Backup Frequency</div>
                  <div className="text-sm text-green-700">Reduce RPO with more frequent backups</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <div className="font-semibold">Automate Recovery Testing</div>
                  <div className="text-sm text-green-700">Verify backup integrity automatically</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <div>
                  <div className="font-semibold">Implement Network Segmentation</div>
                  <div className="text-sm text-green-700">Limit ransomware spread and impact</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Framework Alignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-900">NIST SP 800-34</span>
                  <span className="text-sm text-blue-700">85%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-900">Business Continuity</span>
                  <span className="text-sm text-blue-700">78%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-900">NIST CSF Recovery</span>
                  <span className="text-sm text-blue-700">82%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium">Month 1-2</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
              <div className="text-sm">Immutable backup implementation</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium">Month 2-3</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
              <div className="text-sm">Network segmentation deployment</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium">Month 3-4</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
              <div className="text-sm">Automated testing framework</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button 
          onClick={exportAnalysisReport}
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Analysis Report
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Start New Analysis
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Initializing Recovery Time Calculator...</p>
          <p className="text-sm text-gray-500 mt-2">Session: {sessionId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Recovery Time Calculator</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calculate and optimize RTO/RPO objectives for ransomware recovery scenarios based on 
              NIST SP 800-34 guidelines and business impact analysis
            </p>
            {organizationName && (
              <p className="text-sm text-blue-600 mt-2">Organization: {organizationName}</p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {getConnectionIcon()}
              <span className={`px-2 py-1 rounded text-xs font-medium border ${
                connectionStatus === 'connected' ? 'bg-green-100 text-green-800 border-green-200' :
                connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                'bg-red-100 text-red-800 border-red-200'
              }`}>
                {getConnectionStatusText()}
              </span>
            </div>
            {saving && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
            {lastSaved && (
              <span className="text-xs text-green-600">
                Saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {calculatorSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < calculatorSteps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep > index
                      ? 'bg-blue-500 text-white'
                      : currentStep === index
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > index ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                {index < calculatorSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > index ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-700">
              {calculatorSteps[currentStep]?.title}
            </div>
            <div className="text-xs text-gray-500">
              {calculatorSteps[currentStep]?.description}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-8">
            {currentStep === 0 && <BusinessImpactStep />}
            {currentStep === 1 && <SystemInventoryStep />}
            {currentStep === 2 && <RequirementsStep />}
            {currentStep === 3 && <AnalysisStep />}
            {currentStep === 4 && <RecommendationsStep />}
          </CardContent>
        </Card>

        {/* Session Info */}
        <Card className="bg-gray-50 border-gray-200 mt-6 max-w-6xl mx-auto">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <strong className="text-gray-700">Session:</strong> {sessionId}
              </div>
              <div>
                <strong className="text-gray-700">Connection:</strong> {getConnectionStatusText()}
              </div>
              <div>
                <strong className="text-gray-700">Data Sync:</strong> {connectionStatus === 'connected' ? 'Cloud Active' : 'Local Only'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecoveryTimeCalculator;