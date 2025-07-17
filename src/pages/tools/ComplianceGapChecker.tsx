import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  CheckCircle, FileText, AlertTriangle, Shield, BarChart3,
  Download, RefreshCw, Info, Users, Building2, Calendar,
  Target, TrendingUp, Clock, Settings, BookOpen, Award,
  Loader2, WifiOff, Wifi, AlertCircle, X, Plus, Eye,
  ClipboardCheck, Scale, Gavel, Lock, Database
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

const ComplianceGapChecker = () => {
  // Core State
  const [currentStep, setCurrentStep] = useState(0);
  const [organizationName, setOrganizationName] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [assessmentData, setAssessmentData] = useState({});
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  
  // System State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [sessionId] = useState(() => `cg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Supabase client
  const [supabase] = useState(() => createSupabaseClient());

  const assessmentSteps = [
    { id: 'frameworks', title: 'Framework Selection', description: 'Choose applicable compliance frameworks' },
    { id: 'maturity', title: 'Maturity Assessment', description: 'Evaluate current security maturity' },
    { id: 'gaps', title: 'Gap Analysis', description: 'Identify compliance gaps and deficiencies' },
    { id: 'action-plan', title: 'Action Plan', description: 'Develop remediation roadmap' },
    { id: 'results', title: 'Results & Export', description: 'Review findings and export reports' }
  ];

  const complianceFrameworks = [
    {
      id: 'sox',
      name: 'SOX (Sarbanes-Oxley)',
      description: 'Financial reporting and internal controls',
      icon: Scale,
      industry: 'Financial Services',
      color: 'blue',
      requirements: [
        'Internal controls over financial reporting',
        'Management assessment of controls',
        'External auditor attestation',
        'CEO/CFO certifications',
        'Real-time disclosure requirements'
      ]
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: 'Healthcare data protection requirements',
      icon: Shield,
      industry: 'Healthcare',
      color: 'green',
      requirements: [
        'Administrative safeguards',
        'Physical safeguards',
        'Technical safeguards',
        'Risk assessment and management',
        'Business associate agreements'
      ]
    },
    {
      id: 'pci',
      name: 'PCI DSS',
      description: 'Payment card industry data security',
      icon: Lock,
      industry: 'Retail/E-commerce',
      color: 'purple',
      requirements: [
        'Secure network and systems',
        'Protect cardholder data',
        'Vulnerability management',
        'Access control measures',
        'Regular monitoring and testing'
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'European data protection regulation',
      icon: Gavel,
      industry: 'All (EU operations)',
      color: 'orange',
      requirements: [
        'Lawful basis for processing',
        'Data subject rights',
        'Privacy by design',
        'Data protection impact assessments',
        'Breach notification requirements'
      ]
    },
    {
      id: 'nist',
      name: 'NIST Cybersecurity Framework',
      description: 'Comprehensive cybersecurity framework',
      icon: Target,
      industry: 'All Industries',
      color: 'red',
      requirements: [
        'Identify assets and risks',
        'Protect critical infrastructure',
        'Detect cybersecurity events',
        'Respond to incidents',
        'Recover from disruptions'
      ]
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information security management systems',
      icon: Award,
      industry: 'All Industries',
      color: 'indigo',
      requirements: [
        'Information security policies',
        'Risk management process',
        'Security controls implementation',
        'Management review',
        'Continuous improvement'
      ]
    }
  ];

  const maturityLevels = [
    {
      level: 1,
      name: 'Initial',
      description: 'Ad-hoc processes, reactive approach',
      characteristics: ['Minimal documentation', 'Informal processes', 'Limited awareness']
    },
    {
      level: 2,
      name: 'Managed',
      description: 'Basic processes documented and followed',
      characteristics: ['Basic policies exist', 'Some training provided', 'Reactive monitoring']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Standardized processes across organization',
      characteristics: ['Documented procedures', 'Regular training', 'Proactive monitoring']
    },
    {
      level: 4,
      name: 'Quantitatively Managed',
      description: 'Processes measured and controlled',
      characteristics: ['Metrics and KPIs', 'Risk-based approach', 'Automated controls']
    },
    {
      level: 5,
      name: 'Optimizing',
      description: 'Continuous improvement and innovation',
      characteristics: ['Continuous optimization', 'Advanced analytics', 'Predictive capabilities']
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
      setError('Failed to initialize compliance gap checker');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setConnectionStatus('connecting');
      
      const { data, error } = await supabase
        .from('compliance_gap_sessions')
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
        .from('compliance_gap_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        setOrganizationName(data.organization_name || '');
        setCurrentStep(data.current_step || 0);
        setAssessmentId(data.assessment_id);
        
        // Load related data
        await loadFrameworkSelections();
        await loadAssessmentData();
        await loadGapAnalysis();
        await loadActionPlan();
      }
    } catch (err) {
      console.log('No existing session found, will create new one');
    }
  };

  const loadFrameworkSelections = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('compliance_framework_selections')
        .select('*')
        .eq('session_id', sessionId);

      if (data && data.length > 0) {
        setSelectedFrameworks(data.map(item => item.framework_id));
      }
    } catch (err) {
      console.log('No framework selections found');
    }
  };

  const loadAssessmentData = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('compliance_assessments')
        .select('*')
        .eq('session_id', sessionId);

      if (data && data.length > 0) {
        const assessments = {};
        data.forEach(assessment => {
          assessments[assessment.framework_id] = {
            maturityLevel: assessment.maturity_level,
            lastAudit: assessment.last_audit_result,
            auditDate: assessment.last_audit_date,
            controlsImplemented: assessment.controls_implemented,
            controlsTotal: assessment.controls_total,
            findings: assessment.audit_findings
          };
        });
        setAssessmentData(assessments);
      }
    } catch (err) {
      console.log('No assessment data found');
    }
  };

  const loadGapAnalysis = async () => {
    if (connectionStatus !== 'connected' || !assessmentId) return;
    
    try {
      const { data, error } = await supabase
        .from('compliance_gap_analysis')
        .select('*')
        .eq('assessment_id', assessmentId)
        .single();

      if (data) {
        setGapAnalysis(data.gap_analysis_results);
      }
    } catch (err) {
      console.log('No gap analysis found');
    }
  };

  const loadActionPlan = async () => {
    if (connectionStatus !== 'connected' || !assessmentId) return;
    
    try {
      const { data, error } = await supabase
        .from('compliance_action_plans')
        .select('*')
        .eq('assessment_id', assessmentId)
        .single();

      if (data) {
        setActionPlan(data.action_plan);
      }
    } catch (err) {
      console.log('No action plan found');
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
        assessment_id: assessmentId,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('compliance_gap_sessions')
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

  const saveFrameworkSelections = async (frameworks) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      // Delete existing selections
      await supabase
        .from('compliance_framework_selections')
        .delete()
        .eq('session_id', sessionId);

      // Insert new selections
      if (frameworks.length > 0) {
        const selections = frameworks.map(frameworkId => ({
          session_id: sessionId,
          framework_id: frameworkId,
          selected_at: new Date().toISOString()
        }));

        const { error } = await supabase
          .from('compliance_framework_selections')
          .insert(selections);

        if (error) throw error;
      }
      
      await trackAnalytics('frameworks_selected', { frameworks, count: frameworks.length });
    } catch (err) {
      console.error('Failed to save framework selections:', err);
    }
  };

  const saveAssessmentData = async (frameworkId, data) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const assessmentRecord = {
        session_id: sessionId,
        framework_id: frameworkId,
        maturity_level: data.maturityLevel,
        last_audit_result: data.lastAudit,
        last_audit_date: data.auditDate,
        controls_implemented: data.controlsImplemented,
        controls_total: data.controlsTotal,
        audit_findings: data.findings,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('compliance_assessments')
        .upsert(assessmentRecord);

      if (error) throw error;
      await trackAnalytics('assessment_saved', { frameworkId, data });
    } catch (err) {
      console.error('Failed to save assessment data:', err);
    }
  };

  const performGapAnalysis = async () => {
    try {
      const newAssessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Calculate gaps for each framework
      const frameworkGaps = selectedFrameworks.map(frameworkId => {
        const framework = complianceFrameworks.find(f => f.id === frameworkId);
        const assessment = assessmentData[frameworkId] || {};
        
        // Calculate compliance score
        let score = (assessment.maturityLevel || 1) * 20; // Base score from maturity
        
        // Adjust for audit results
        const auditAdjustment = {
          'passed': 15,
          'minor': 5,
          'major': -15,
          'failed': -25,
          'none': -10
        };
        
        score += auditAdjustment[assessment.lastAudit] || 0;
        
        // Adjust for controls implementation
        if (assessment.controlsImplemented && assessment.controlsTotal) {
          const controlsPercentage = (assessment.controlsImplemented / assessment.controlsTotal) * 100;
          score = (score * 0.7) + (controlsPercentage * 0.3);
        }
        
        score = Math.max(0, Math.min(100, score));
        
        // Determine risk level
        let riskLevel = 'Low';
        let riskColor = 'green';
        if (score < 60) {
          riskLevel = 'High';
          riskColor = 'red';
        } else if (score < 80) {
          riskLevel = 'Medium';
          riskColor = 'yellow';
        }
        
        // Generate specific gaps
        const gaps = [];
        if (score < 70) {
          gaps.push('Insufficient documentation of processes');
          gaps.push('Lack of regular monitoring and testing');
        }
        if (assessment.lastAudit === 'failed' || assessment.lastAudit === 'major') {
          gaps.push('Critical audit findings requiring immediate attention');
        }
        if (!assessment.maturityLevel || assessment.maturityLevel < 3) {
          gaps.push('Immature security processes and controls');
        }
        
        return {
          frameworkId,
          frameworkName: framework.name,
          score,
          riskLevel,
          riskColor,
          gaps,
          recommendations: generateRecommendations(frameworkId, score, assessment)
        };
      });
      
      const overallScore = frameworkGaps.reduce((sum, gap) => sum + gap.score, 0) / frameworkGaps.length;
      
      const analysis = {
        overallScore: Math.round(overallScore),
        frameworkResults: frameworkGaps,
        criticalGaps: frameworkGaps.filter(g => g.riskLevel === 'High').length,
        analysisDate: new Date().toISOString()
      };
      
      setGapAnalysis(analysis);
      
      // Save to database
      if (connectionStatus === 'connected') {
        const { error } = await supabase
          .from('compliance_gap_analysis')
          .insert({
            assessment_id: newAssessmentId,
            session_id: sessionId,
            gap_analysis_results: analysis,
            created_at: new Date().toISOString()
          });

        if (error) throw error;
        setAssessmentId(newAssessmentId);
      }
      
      await trackAnalytics('gap_analysis_completed', { 
        assessmentId: newAssessmentId,
        overallScore: analysis.overallScore,
        frameworkCount: selectedFrameworks.length 
      });
      
    } catch (err) {
      console.error('Failed to perform gap analysis:', err);
      setError('Failed to complete gap analysis');
    }
  };

  const generateRecommendations = (frameworkId, score, assessment) => {
    const recommendations = [];
    
    if (score < 60) {
      recommendations.push('Immediate security program overhaul required');
      recommendations.push('Engage external compliance consultants');
    } else if (score < 80) {
      recommendations.push('Strengthen existing controls and processes');
      recommendations.push('Implement regular compliance monitoring');
    }
    
    if (!assessment.maturityLevel || assessment.maturityLevel < 3) {
      recommendations.push('Develop formal security policies and procedures');
      recommendations.push('Establish regular security training program');
    }
    
    // Framework-specific recommendations
    switch (frameworkId) {
      case 'sox':
        if (score < 80) {
          recommendations.push('Enhance financial reporting controls');
          recommendations.push('Implement SOX compliance automation tools');
        }
        break;
      case 'hipaa':
        if (score < 80) {
          recommendations.push('Strengthen PHI protection mechanisms');
          recommendations.push('Conduct regular risk assessments');
        }
        break;
      case 'pci':
        if (score < 80) {
          recommendations.push('Enhance cardholder data protection');
          recommendations.push('Implement network segmentation');
        }
        break;
      case 'gdpr':
        if (score < 80) {
          recommendations.push('Improve data subject rights processes');
          recommendations.push('Enhance privacy impact assessments');
        }
        break;
    }
    
    return recommendations;
  };

  const generateActionPlan = async () => {
    if (!gapAnalysis) return;
    
    try {
      const actionItems = [];
      let priority = 1;
      
      // Generate action items from gaps
      gapAnalysis.frameworkResults.forEach(framework => {
        framework.gaps.forEach(gap => {
          actionItems.push({
            id: `action_${priority}`,
            priority: framework.riskLevel === 'High' ? 'Critical' : framework.riskLevel === 'Medium' ? 'High' : 'Medium',
            title: `Address ${gap}`,
            framework: framework.frameworkName,
            description: gap,
            estimatedEffort: framework.riskLevel === 'High' ? '4-8 weeks' : '2-4 weeks',
            responsible: 'Security Team',
            status: 'Not Started'
          });
          priority++;
        });
      });
      
      const plan = {
        actionItems,
        timeline: generateTimeline(actionItems),
        estimatedCost: calculateEstimatedCost(actionItems),
        createdAt: new Date().toISOString()
      };
      
      setActionPlan(plan);
      
      // Save to database
      if (connectionStatus === 'connected' && assessmentId) {
        const { error } = await supabase
          .from('compliance_action_plans')
          .upsert({
            assessment_id: assessmentId,
            session_id: sessionId,
            action_plan: plan,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }
      
      await trackAnalytics('action_plan_generated', { 
        assessmentId,
        actionItemCount: actionItems.length 
      });
      
    } catch (err) {
      console.error('Failed to generate action plan:', err);
      setError('Failed to generate action plan');
    }
  };

  const generateTimeline = (actionItems) => {
    const phases = [];
    let currentPhase = 1;
    let phaseItems = [];
    
    actionItems.forEach((item, index) => {
      phaseItems.push(item);
      
      if (phaseItems.length >= 3 || index === actionItems.length - 1) {
        phases.push({
          phase: currentPhase,
          title: `Phase ${currentPhase}`,
          duration: '4-6 weeks',
          items: [...phaseItems]
        });
        phaseItems = [];
        currentPhase++;
      }
    });
    
    return phases;
  };

  const calculateEstimatedCost = (actionItems) => {
    const baseCosts = {
      'Critical': 25000,
      'High': 15000,
      'Medium': 8000,
      'Low': 3000
    };
    
    return actionItems.reduce((total, item) => {
      return total + (baseCosts[item.priority] || 5000);
    }, 0);
  };

  const trackAnalytics = async (action, data = {}) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      await supabase
        .from('compliance_gap_analytics')
        .insert({
          session_id: sessionId,
          assessment_id: assessmentId,
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

  const exportComplianceReport = async () => {
    try {
      const reportData = {
        session_id: sessionId,
        assessment_id: assessmentId,
        organization_name: organizationName,
        generated_at: new Date().toISOString(),
        selected_frameworks: selectedFrameworks,
        assessment_data: assessmentData,
        gap_analysis: gapAnalysis,
        action_plan: actionPlan,
        current_step: currentStep,
        completion_percentage: Math.round((currentStep / (assessmentSteps.length - 1)) * 100)
      };

      const reportContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([reportContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compliance_gap_analysis_${organizationName || 'organization'}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      await trackAnalytics('report_exported', reportData);
    } catch (err) {
      console.error('Failed to export report:', err);
      setError('Failed to export compliance report');
    }
  };

  const handleFrameworkToggle = async (frameworkId) => {
    const newSelection = selectedFrameworks.includes(frameworkId)
      ? selectedFrameworks.filter(id => id !== frameworkId)
      : [...selectedFrameworks, frameworkId];
    
    setSelectedFrameworks(newSelection);
    await saveFrameworkSelections(newSelection);
  };

  const handleAssessmentChange = async (frameworkId, field, value) => {
    const newAssessmentData = {
      ...assessmentData,
      [frameworkId]: {
        ...assessmentData[frameworkId],
        [field]: value
      }
    };
    setAssessmentData(newAssessmentData);
    await saveAssessmentData(frameworkId, newAssessmentData[frameworkId]);
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

  const FrameworkSelectionStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <ClipboardCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Framework Selection</h2>
        <p className="text-gray-600">Choose the compliance frameworks applicable to your organization</p>
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

      <div className="grid md:grid-cols-2 gap-6">
        {complianceFrameworks.map((framework) => (
          <Card 
            key={framework.id}
            className={`border-2 hover:border-${framework.color}-200 transition-colors cursor-pointer ${
              selectedFrameworks.includes(framework.id) ? `border-${framework.color}-300 bg-${framework.color}-50` : ''
            }`}
            onClick={() => handleFrameworkToggle(framework.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <framework.icon className={`h-6 w-6 text-${framework.color}-600`} />
                  <span>{framework.name}</span>
                </div>
                {selectedFrameworks.includes(framework.id) && (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{framework.description}</p>
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500">Primary Industry:</span>
                <span className="ml-2 text-sm font-medium text-gray-700">{framework.industry}</span>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 mb-2 block">Key Requirements:</span>
                <ul className="text-xs text-gray-600 space-y-1">
                  {framework.requirements.slice(0, 3).map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFrameworks.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Selected Frameworks</h3>
                <p className="text-green-700 text-sm">
                  {selectedFrameworks.length} framework{selectedFrameworks.length !== 1 ? 's' : ''} selected for assessment
                </p>
              </div>
              <Button 
                onClick={() => setCurrentStep(1)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Continue to Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const MaturityAssessmentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Maturity Assessment</h2>
        <p className="text-gray-600">Evaluate your current security maturity for each framework</p>
      </div>

      {selectedFrameworks.map((frameworkId) => {
        const framework = complianceFrameworks.find(f => f.id === frameworkId);
        const assessment = assessmentData[frameworkId] || {};
        
        return (
          <Card key={frameworkId} className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <framework.icon className={`h-6 w-6 text-${framework.color}-600`} />
                <span>{framework.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Maturity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Maturity Level
                </label>
                <div className="grid gap-3">
                  {maturityLevels.map((level) => (
                    <div
                      key={level.level}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        assessment.maturityLevel === level.level
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAssessmentChange(frameworkId, 'maturityLevel', level.level)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-sm">Level {level.level} - {level.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                        </div>
                        {assessment.maturityLevel === level.level && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Audit */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Audit Result
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={assessment.lastAudit || ''}
                    onChange={(e) => handleAssessmentChange(frameworkId, 'lastAudit', e.target.value)}
                  >
                    <option value="">Select result</option>
                    <option value="passed">Passed</option>
                    <option value="minor">Minor Issues</option>
                    <option value="major">Major Issues</option>
                    <option value="failed">Failed</option>
                    <option value="none">Never Audited</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audit Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={assessment.auditDate || ''}
                    onChange={(e) => handleAssessmentChange(frameworkId, 'auditDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Controls Implementation */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Controls Implemented
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 45"
                    value={assessment.controlsImplemented || ''}
                    onChange={(e) => handleAssessmentChange(frameworkId, 'controlsImplemented', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Required Controls
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 60"
                    value={assessment.controlsTotal || ''}
                    onChange={(e) => handleAssessmentChange(frameworkId, 'controlsTotal', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {Object.keys(assessmentData).length > 0 && (
        <Button 
          onClick={() => setCurrentStep(2)}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Continue to Gap Analysis
        </Button>
      )}
    </div>
  );

  const GapAnalysisStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gap Analysis</h2>
        <p className="text-gray-600">Identify compliance gaps and risk areas</p>
      </div>

      {!gapAnalysis && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6 text-center">
            <p className="text-blue-900 mb-4">Ready to analyze compliance gaps across selected frameworks</p>
            <Button 
              onClick={performGapAnalysis}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <BarChart3 className="h-4 w-4 mr-2" />
              )}
              Perform Gap Analysis
            </Button>
          </CardContent>
        </Card>
      )}

      {gapAnalysis && (
        <>
          {/* Overall Score */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">{gapAnalysis.overallScore}%</div>
                <div className="text-blue-700 mb-4">Overall Compliance Score</div>
                <div className="flex justify-center items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>{gapAnalysis.criticalGaps} Critical Gaps</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>{selectedFrameworks.length} Frameworks Assessed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Framework Results */}
          <div className="grid gap-6">
            {gapAnalysis.frameworkResults.map((result) => (
              <Card key={result.frameworkId} className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{result.frameworkName}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold">{result.score}%</span>
                      <span className={`px-3 py-1 rounded text-sm font-medium border ${
                        result.riskColor === 'red' ? 'bg-red-100 text-red-800 border-red-200' :
                        result.riskColor === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-green-100 text-green-800 border-green-200'
                      }`}>
                        {result.riskLevel} Risk
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Identified Gaps</h4>
                      <ul className="space-y-2">
                        {result.gaps.map((gap, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            onClick={() => setCurrentStep(3)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Generate Action Plan
          </Button>
        </>
      )}
    </div>
  );

  const ActionPlanStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Action Plan</h2>
        <p className="text-gray-600">Develop a comprehensive remediation roadmap</p>
      </div>

      {!actionPlan && gapAnalysis && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <p className="text-green-900 mb-4">Ready to generate an action plan based on identified gaps</p>
            <Button 
              onClick={generateActionPlan}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4 mr-2" />
              )}
              Generate Action Plan
            </Button>
          </CardContent>
        </Card>
      )}

      {actionPlan && (
        <>
          {/* Summary */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-900">{actionPlan.actionItems.length}</div>
                  <div className="text-green-700 text-sm">Action Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-900">{actionPlan.timeline.length}</div>
                  <div className="text-green-700 text-sm">Implementation Phases</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-900">${actionPlan.estimatedCost.toLocaleString()}</div>
                  <div className="text-green-700 text-sm">Estimated Cost</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {actionPlan.timeline.map((phase) => (
                  <div key={phase.phase} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{phase.title}</h4>
                      <span className="text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="space-y-2">
                      {phase.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            item.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.priority}
                          </span>
                          <span>{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => setCurrentStep(4)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            View Results & Export
          </Button>
        </>
      )}
    </div>
  );

  const ResultsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance Assessment Complete</h2>
        <p className="text-gray-600">Review your compliance gap analysis and export reports</p>
      </div>

      {gapAnalysis && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-blue-900 mb-2">{gapAnalysis.overallScore}%</div>
              <div className="text-blue-700 text-lg">Overall Compliance Score</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-xl font-bold text-gray-900">{selectedFrameworks.length}</div>
                <div className="text-gray-600 text-sm">Frameworks Assessed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-600">{gapAnalysis.criticalGaps}</div>
                <div className="text-gray-600 text-sm">Critical Gaps</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">
                  {actionPlan ? actionPlan.actionItems.length : 0}
                </div>
                <div className="text-gray-600 text-sm">Action Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              onClick={exportComplianceReport}
              className="bg-green-600 hover:bg-green-700 text-white justify-start"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Complete Report
            </Button>
            <Button 
              variant="outline"
              className="justify-start"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Gap Analysis Summary
            </Button>
            <Button 
              variant="outline"
              className="justify-start"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Export Action Plan
            </Button>
            <Button 
              variant="outline"
              className="justify-start"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Export Implementation Timeline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <div className="font-semibold">Review Action Plan</div>
                <div className="text-sm text-gray-600">Prioritize critical gaps and assign ownership</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="font-semibold">Engage Stakeholders</div>
                <div className="text-sm text-gray-600">Present findings to leadership and get buy-in</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <div className="font-semibold">Begin Implementation</div>
                <div className="text-sm text-gray-600">Start with critical priority items first</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <div>
                <div className="font-semibold">Schedule Follow-up Assessment</div>
                <div className="text-sm text-gray-600">Re-assess in 6-12 months to track progress</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Start New Assessment
        </Button>
        <Button 
          onClick={exportComplianceReport}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Initializing Compliance Gap Checker...</p>
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
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Compliance Gap Checker</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive compliance gap analysis across multiple frameworks with actionable remediation plans
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
            {assessmentSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < assessmentSteps.length - 1 ? 'flex-1' : ''}`}
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
                {index < assessmentSteps.length - 1 && (
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
              {assessmentSteps[currentStep]?.title}
            </div>
            <div className="text-xs text-gray-500">
              {assessmentSteps[currentStep]?.description}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-8">
            {currentStep === 0 && <FrameworkSelectionStep />}
            {currentStep === 1 && <MaturityAssessmentStep />}
            {currentStep === 2 && <GapAnalysisStep />}
            {currentStep === 3 && <ActionPlanStep />}
            {currentStep === 4 && <ResultsStep />}
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

export default ComplianceGapChecker;