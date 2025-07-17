import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Globe, Eye, AlertTriangle, Shield, Search, Clock, 
  Database, Users, Lock, Key, Mail, CreditCard,
  TrendingUp, Activity, BarChart3, RefreshCw, Download,
  ArrowUp, ArrowDown, Filter, Settings, Bell, MapPin,
  FileText, Server, Network, Zap, CheckCircle, XCircle,
  Loader2, WifiOff, Wifi, AlertCircle, Plus, X
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, 
  Bar, ScatterChart, Scatter
} from 'recharts';

// CONFIGURATION - Update these with your actual Supabase credentials
const SUPABASE_URL = 'https://bzpgnzkjqeczksbqzsba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cGduemtqcWVjemtzYnF6c2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTE5NTEsImV4cCI6MjA2NzA4Nzk1MX0.YA73tH3ClmLIUofBg1NQ8xl78LXi7tOM9VSQpYtueKo';

// Supabase client setup (you'll need to install @supabase/supabase-js)
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

const DarkWebMonitoring = () => {
  // Core State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastScan, setLastScan] = useState(new Date());
  
  // Data State
  const [findings, setFindings] = useState([]);
  const [monitoredSources, setMonitoredSources] = useState([]);
  const [trendingThreats, setTrendingThreats] = useState([]);
  const [alertConfig, setAlertConfig] = useState([]);
  const [organizationName, setOrganizationName] = useState('');
  const [monitoringStats, setMonitoringStats] = useState({
    activeSources: 0,
    newMentions: 0,
    credentialLeaks: 0,
    dataBreaches: 0,
    riskScore: 0
  });
  
  // System State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [sessionId] = useState(() => `dw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Supabase client
  const [supabase] = useState(() => createSupabaseClient());

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
      await initializeDefaultData();
      setupAutoSave();
      setupRealTimeMonitoring();
    } catch (err) {
      console.error('Initialization failed:', err);
      setError('Failed to initialize monitoring system');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('dark_web_sessions')
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
        .from('dark_web_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        setOrganizationName(data.organization_name || '');
        setIsMonitoring(data.is_monitoring || false);
        setMonitoringStats(data.monitoring_stats || getDefaultStats());
        if (data.last_scan) {
          setLastScan(new Date(data.last_scan));
        }
      }
    } catch (err) {
      console.log('No existing session found, will create new one');
    }
  };

  const initializeDefaultData = async () => {
    // Initialize default sources if none exist
    if (monitoredSources.length === 0) {
      const defaultSources = getDefaultSources();
      setMonitoredSources(defaultSources);
      await saveSourcesData(defaultSources);
    }

    // Initialize default alerts if none exist
    if (alertConfig.length === 0) {
      const defaultAlerts = getDefaultAlerts();
      setAlertConfig(defaultAlerts);
      await saveAlertsData(defaultAlerts);
    }

    // Initialize default trending threats
    if (trendingThreats.length === 0) {
      const defaultThreats = getDefaultThreats();
      setTrendingThreats(defaultThreats);
      await saveTrendingThreats(defaultThreats);
    }

    // Set default stats if empty
    if (monitoringStats.activeSources === 0) {
      const defaultStats = getDefaultStats();
      setMonitoringStats(defaultStats);
      await saveSessionData(defaultStats);
    }
  };

  const saveSessionData = async (stats = monitoringStats) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      setSaving(true);
      
      const sessionData = {
        session_id: sessionId,
        organization_name: organizationName,
        is_monitoring: isMonitoring,
        monitoring_stats: stats,
        last_scan: lastScan.toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('dark_web_sessions')
        .upsert(sessionData);

      if (error) throw error;
      
      setLastSaved(new Date());
      trackAnalytics('session_saved', { stats });
    } catch (err) {
      console.error('Failed to save session:', err);
      setError('Failed to save session data');
    } finally {
      setSaving(false);
    }
  };

  const saveSourcesData = async (sources) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      // Delete existing sources for this session
      await supabase
        .from('dark_web_sources')
        .delete()
        .eq('session_id', sessionId);

      // Insert new sources
      const sourcesWithSession = sources.map(source => ({
        ...source,
        session_id: sessionId
      }));

      const { error } = await supabase
        .from('dark_web_sources')
        .insert(sourcesWithSession);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to save sources:', err);
    }
  };

  const saveAlertsData = async (alerts) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      // Delete existing alerts for this session
      await supabase
        .from('dark_web_alerts')
        .delete()
        .eq('session_id', sessionId);

      // Insert new alerts
      const alertsWithSession = alerts.map(alert => ({
        ...alert,
        session_id: sessionId
      }));

      const { error } = await supabase
        .from('dark_web_alerts')
        .insert(alertsWithSession);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to save alerts:', err);
    }
  };

  const saveTrendingThreats = async (threats) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      // Delete existing threats for this session
      await supabase
        .from('dark_web_trending_threats')
        .delete()
        .eq('session_id', sessionId);

      // Insert new threats
      const threatsWithSession = threats.map(threat => ({
        ...threat,
        session_id: sessionId
      }));

      const { error } = await supabase
        .from('dark_web_trending_threats')
        .insert(threatsWithSession);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to save trending threats:', err);
    }
  };

  const addFinding = async (finding) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const findingData = {
        session_id: sessionId,
        finding_type: finding.type,
        severity: finding.severity,
        source: finding.source,
        description: finding.description,
        domain: finding.domain,
        confidence_score: finding.confidence,
        status: finding.status,
        affected_accounts: finding.affectedAccounts,
        affected_records: finding.affectedRecords,
        metadata: finding.metadata || {}
      };

      const { data, error } = await supabase
        .from('dark_web_findings')
        .insert(findingData)
        .select()
        .single();

      if (error) throw error;
      
      setFindings(prev => [data, ...prev]);
      
      // Update stats
      const newStats = { ...monitoringStats };
      newStats.newMentions += 1;
      if (finding.type === 'Credential Leak') {
        newStats.credentialLeaks += 1;
      } else if (finding.type === 'Data Breach') {
        newStats.dataBreaches += 1;
      }
      
      setMonitoringStats(newStats);
      await saveSessionData(newStats);
      
      trackAnalytics('finding_added', { type: finding.type, severity: finding.severity });
    } catch (err) {
      console.error('Failed to add finding:', err);
    }
  };

  const loadFindings = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('dark_web_findings')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Transform data to match component expectations
      const transformedFindings = data.map(finding => ({
        id: finding.id,
        type: finding.finding_type,
        severity: finding.severity,
        source: finding.source,
        description: finding.description,
        timestamp: finding.created_at,
        domain: finding.domain,
        confidence: finding.confidence_score,
        status: finding.status,
        affectedAccounts: finding.affected_accounts,
        affectedRecords: finding.affected_records,
        metadata: finding.metadata
      }));
      
      setFindings(transformedFindings);
    } catch (err) {
      console.error('Failed to load findings:', err);
    }
  };

  const trackAnalytics = async (action, data = {}) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      await supabase
        .from('dark_web_analytics')
        .insert({
          session_id: sessionId,
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

  const setupRealTimeMonitoring = () => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setLastScan(new Date());
      
      // Simulate occasional new mentions/findings
      if (Math.random() < 0.1) {
        setMonitoringStats(prev => ({
          ...prev,
          newMentions: prev.newMentions + Math.floor(Math.random() * 3)
        }));
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  };

  const toggleMonitoring = async () => {
    const newStatus = !isMonitoring;
    setIsMonitoring(newStatus);
    
    if (newStatus) {
      setLastScan(new Date());
    }
    
    await saveSessionData();
    await trackAnalytics('monitoring_toggled', { action: newStatus ? 'started' : 'stopped' });
  };

  const forceScan = async () => {
    setLastScan(new Date());
    
    // Simulate scan results
    const scanResults = {
      newMentions: Math.floor(Math.random() * 5),
      newSources: Math.floor(Math.random() * 2),
      updatedStats: true
    };
    
    setMonitoringStats(prev => ({
      ...prev,
      newMentions: prev.newMentions + scanResults.newMentions,
      activeSources: prev.activeSources + scanResults.newSources
    }));
    
    await saveSessionData();
    await trackAnalytics('manual_scan', scanResults);
  };

  const exportReport = async () => {
    try {
      const reportData = {
        session_id: sessionId,
        organization_name: organizationName,
        generated_at: new Date().toISOString(),
        monitoring_stats: monitoringStats,
        findings_summary: {
          total: findings.length,
          critical: findings.filter(f => f.severity === 'CRITICAL').length,
          high: findings.filter(f => f.severity === 'HIGH').length,
          medium: findings.filter(f => f.severity === 'MEDIUM').length,
          low: findings.filter(f => f.severity === 'LOW').length
        },
        active_sources: monitoredSources.filter(s => s.status === 'active').length,
        is_monitoring: isMonitoring,
        last_scan: lastScan.toISOString()
      };

      const reportContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([reportContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dark_web_report_${organizationName || 'unknown'}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      await trackAnalytics('report_exported', { organization: organizationName });
    } catch (err) {
      console.error('Failed to export report:', err);
      setError('Failed to export report');
    }
  };

  const toggleAlert = async (alertId) => {
    const updatedAlerts = alertConfig.map(alert => 
      alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
    );
    setAlertConfig(updatedAlerts);
    await saveAlertsData(updatedAlerts);
    await trackAnalytics('alert_toggled', { alertId, enabled: !alertConfig.find(a => a.id === alertId)?.enabled });
  };

  // Default data functions
  const getDefaultStats = () => ({
    activeSources: 247,
    newMentions: 0,
    credentialLeaks: 0,
    dataBreaches: 0,
    riskScore: 7.3
  });

  const getDefaultSources = () => [
    { id: 1, name: 'Tor Markets', source_type: 'marketplace', sites_count: 34, status: 'active', findings_count: 156 },
    { id: 2, name: 'Ransomware Forums', source_type: 'forum', sites_count: 12, status: 'active', findings_count: 89 },
    { id: 3, name: 'Carding Forums', source_type: 'forum', sites_count: 18, status: 'active', findings_count: 67 },
    { id: 4, name: 'Hacker Communities', source_type: 'community', sites_count: 45, status: 'active', findings_count: 234 },
    { id: 5, name: 'Data Breach Sites', source_type: 'leak_site', sites_count: 23, status: 'active', findings_count: 123 },
    { id: 6, name: 'Paste Sites', source_type: 'paste', sites_count: 67, status: 'active', findings_count: 345 },
    { id: 7, name: 'Telegram Channels', source_type: 'messaging', sites_count: 89, status: 'active', findings_count: 456 },
    { id: 8, name: 'Discord Servers', source_type: 'messaging', sites_count: 34, status: 'active', findings_count: 178 }
  ];

  const getDefaultThreats = () => [
    { id: 1, threat_name: 'RaaS (Ransomware-as-a-Service)', mentions_count: 1247, change_percentage: 23 },
    { id: 2, threat_name: 'Stealer Logs', mentions_count: 987, change_percentage: 15 },
    { id: 3, threat_name: 'Corporate VPN Access', mentions_count: 756, change_percentage: -8 },
    { id: 4, threat_name: 'Cloud Credentials', mentions_count: 634, change_percentage: 31 },
    { id: 5, threat_name: 'Database Dumps', mentions_count: 523, change_percentage: 12 },
    { id: 6, threat_name: 'API Keys', mentions_count: 445, change_percentage: 18 }
  ];

  const getDefaultAlerts = () => [
    { id: 1, alert_type: 'Domain Mentions', enabled: true, threshold_config: 'Any mention' },
    { id: 2, alert_type: 'Credential Leaks', enabled: true, threshold_config: '5+ accounts' },
    { id: 3, alert_type: 'Data Breaches', enabled: true, threshold_config: 'Any breach' },
    { id: 4, alert_type: 'Financial Fraud', enabled: true, threshold_config: '10+ cards' },
    { id: 5, alert_type: 'Threat Discussions', enabled: false, threshold_config: 'High confidence' },
    { id: 6, alert_type: 'Malware Mentions', enabled: true, threshold_config: 'Company-specific' }
  ];

  // UI Helper Functions
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-100 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-red-600 bg-red-100 border-red-200';
      case 'investigating': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'monitoring': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'mitigated': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Credential Leak': return <Key className="w-4 h-4" />;
      case 'Data Breach': return <Database className="w-4 h-4" />;
      case 'Threat Intelligence': return <Eye className="w-4 h-4" />;
      case 'Financial Fraud': return <CreditCard className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
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

  // Load findings when tab changes
  useEffect(() => {
    if (activeTab === 'findings' && connectionStatus === 'connected') {
      loadFindings();
    }
  }, [activeTab, connectionStatus]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Initializing Dark Web Monitoring...</p>
          <p className="text-sm text-gray-500 mt-2">Session: {sessionId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dark Web Monitoring</h1>
            <p className="text-gray-600">Continuous surveillance for credential leaks, data breaches, and organizational threats</p>
            {organizationName && (
              <p className="text-sm text-blue-600 mt-1">Organization: {organizationName}</p>
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
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last scan: {lastScan.toLocaleTimeString()}</span>
              {saving && <Loader2 className="w-3 h-3 animate-spin" />}
            </div>
            <Button variant="outline" size="sm" onClick={exportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Card className="border-red-200 bg-red-50">
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

        {/* Organization Setup */}
        {!organizationName && (
          <Card className="border-blue-200 bg-blue-50">
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

        {/* Monitoring Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Monitoring Status</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  isMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {isMonitoring ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{monitoringStats.activeSources}</div>
                <p className="text-sm text-gray-600">Active Sources</p>
                <div className="flex items-center justify-center mt-1">
                  <Network className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="text-xs text-blue-500">Monitoring</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{monitoringStats.newMentions}</div>
                <p className="text-sm text-gray-600">New Mentions (24h)</p>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-3 h-3 text-orange-500 mr-1" />
                  <span className="text-xs text-orange-500">Tracking</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{monitoringStats.credentialLeaks}</div>
                <p className="text-sm text-gray-600">Credential Leaks</p>
                <div className="flex items-center justify-center mt-1">
                  <Key className="w-3 h-3 text-red-500 mr-1" />
                  <span className="text-xs text-red-500">Detected</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{monitoringStats.dataBreaches}</div>
                <p className="text-sm text-gray-600">Data Breaches</p>
                <div className="flex items-center justify-center mt-1">
                  <Database className="w-3 h-3 text-purple-500 mr-1" />
                  <span className="text-xs text-purple-500">Identified</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{monitoringStats.riskScore}</div>
                <p className="text-sm text-gray-600">Risk Score /10</p>
                <div className="flex items-center justify-center mt-1">
                  <Shield className="w-3 h-3 text-yellow-500 mr-1" />
                  <span className="text-xs text-yellow-500">Calculated</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'findings', label: 'Recent Findings', icon: Eye, count: findings.length },
              { id: 'sources', label: 'Monitored Sources', icon: Network, count: monitoredSources.length },
              { id: 'alerts', label: 'Alert Configuration', icon: Bell, count: alertConfig.filter(a => a.enabled).length }
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
                {tab.count !== undefined && (
                  <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Trending Threats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending Dark Web Threats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingThreats.map((threat) => (
                    <div key={threat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-gray-900 text-sm">{threat.threat_name}</span>
                        <div className="flex items-center">
                          {threat.change_percentage > 0 ? 
                            <ArrowUp className="w-3 h-3 text-red-500" /> : 
                            <ArrowDown className="w-3 h-3 text-green-500" />
                          }
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-700">{threat.mentions_count.toLocaleString()}</span>
                        <span className={`text-sm font-medium ${
                          threat.change_percentage > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {threat.change_percentage > 0 ? '+' : ''}{threat.change_percentage}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">mentions this week</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={forceScan}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-16"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Scan
                  </Button>
                  <Button 
                    onClick={exportReport}
                    variant="outline"
                    className="h-16"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('alerts')}
                    variant="outline"
                    className="h-16"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Alerts
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('findings')}
                    variant="outline"
                    className="h-16"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Findings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'findings' && (
          <div className="space-y-6">
            {/* Findings List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Recent Findings ({findings.length})</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={loadFindings}
                    variant="outline"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {findings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No findings detected yet</p>
                      <p className="text-sm">Monitoring is active and scanning for threats</p>
                      <div className="mt-4">
                        <Button onClick={forceScan} variant="outline">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Run Manual Scan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    findings.map((finding) => (
                      <div key={finding.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(finding.type)}
                            <div>
                              <h4 className="font-semibold text-gray-900">{finding.type}</h4>
                              <p className="text-sm text-gray-600">{finding.source}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(finding.severity)}`}>
                              {finding.severity}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(finding.status)}`}>
                              {finding.status?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{finding.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {finding.domain && (
                            <div>
                              <span className="font-medium text-gray-700">Domain:</span>
                              <span className="ml-2">{finding.domain}</span>
                            </div>
                          )}
                          {finding.confidence && (
                            <div>
                              <span className="font-medium text-gray-700">Confidence:</span>
                              <span className="ml-2">{finding.confidence}%</span>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Detected:</span>
                            <span className="ml-2">{new Date(finding.timestamp).toLocaleDateString()}</span>
                          </div>
                          {(finding.affectedAccounts || finding.affectedRecords) && (
                            <div>
                              <span className="font-medium text-gray-700">Impact:</span>
                              <span className="ml-2">
                                {finding.affectedAccounts && `${finding.affectedAccounts} accounts`}
                                {finding.affectedRecords && `${finding.affectedRecords.toLocaleString()} records`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'sources' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>Monitored Dark Web Sources ({monitoredSources.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {monitoredSources.map((source) => (
                  <div key={source.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{source.name}</h4>
                      <span className={`w-3 h-3 rounded-full ${
                        source.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium capitalize">{source.source_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sites:</span>
                        <span className="font-medium">{source.sites_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Findings:</span>
                        <span className="font-medium">{source.findings_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'alerts' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Alert Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertConfig.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          alert.enabled 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {alert.enabled && <CheckCircle className="w-3 h-3" />}
                      </button>
                      <div>
                        <h4 className="font-medium text-gray-900">{alert.alert_type}</h4>
                        <p className="text-sm text-gray-600">Threshold: {alert.threshold_config}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {alert.enabled ? 'ACTIVE' : 'DISABLED'}
                      </span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Control Panel */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={toggleMonitoring}
                  disabled={saving}
                  className={`${
                    isMonitoring 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  {isMonitoring ? 'Pause Monitoring' : 'Start Monitoring'}
                </Button>
                <Button variant="outline" onClick={forceScan} disabled={saving}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Force Scan
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('sources')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Sources
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={exportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Intelligence
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setActiveTab('findings')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Findings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session & Status Info */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <strong className="text-gray-700">Session:</strong> {sessionId}
              </div>
              <div>
                <strong className="text-gray-700">Connection:</strong> {getConnectionStatusText()}
                {lastSaved && (
                  <span className="ml-2 text-green-600">
                    (Saved: {lastSaved.toLocaleTimeString()})
                  </span>
                )}
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

export default DarkWebMonitoring;