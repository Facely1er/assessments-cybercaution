import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, AlertTriangle, Eye, AlertCircle, Database,
  CheckCircle, XCircle, Clock, Download, FileDown, Printer,
  Cloud, CloudOff, Loader2, Save, Building, User, 
  TrendingUp, Target, RefreshCw, ChevronDown, ChevronUp,
  Phone, Calendar, Settings, BookOpen, FileText
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Types
interface AssessmentQuestion {
  id: string;
  text: string;
  category: string;
  options: {
    value: number;
    label: string;
  }[];
}

interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: AssessmentQuestion[];
  maxScore: number;
}

interface AssessmentAnswer {
  questionId: string;
  value: number;
}

interface RecommendationCard {
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  impact: {
    risk: string;
    time: string;
    cost: string;
  };
  minScore: number;
  framework: string;
}

interface VulnerabilityAlert {
  severity: 'critical' | 'high' | 'medium';
  title: string;
  description: string;
  remediation: string;
}

interface AssessmentData {
  sessionId: string;
  organizationName: string;
  industry: string;
  assessmentType: string;
  assessmentManager: string;
  assessmentDate: string;
  answers: Record<string, number>;
  categoryScores: Record<string, number>;
  overallScore: number;
  riskLevel: string;
  recommendations: string[];
  vulnerabilities: string[];
  createdAt: string;
  updatedAt: string;
}

interface OrganizationData {
  organizationName: string;
  industry: string;
  organizationSize: string;
  assessmentManager: string;
  complianceRequirements: string;
  lastAssessment?: string;
}

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const RansomwareReadinessAssessment: React.FC = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [overallScore, setOverallScore] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string>('');
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('Initializing...');
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    organizationName: '',
    industry: '',
    organizationSize: '',
    assessmentManager: '',
    complianceRequirements: ''
  });

  const industryOptions = [
    'Financial Services', 'Healthcare', 'Government', 'Education',
    'Manufacturing', 'Technology', 'Retail', 'Energy', 'Legal', 'Other'
  ];

  const organizationSizeOptions = [
    'Small (1-50 employees)', 'Medium (51-500 employees)', 
    'Large (501-5000 employees)', 'Enterprise (5000+ employees)'
  ];

  const complianceOptions = [
    'NIST Cybersecurity Framework', 'SOX', 'HIPAA', 'PCI DSS', 
    'GDPR', 'SOC 2', 'ISO 27001', 'FISMA', 'CIS Controls', 'Other'
  ];

  // Assessment data structure
  const assessmentCategories: AssessmentCategory[] = [
    {
      id: 'identity',
      name: 'Identity & Asset Management',
      description: 'Know what you have and who has access',
      icon: '🆔',
      maxScore: 9,
      questions: [
        {
          id: 'q1',
          text: 'Does your organization maintain a complete inventory of all IT assets (computers, servers, network devices)?',
          category: 'identity',
          options: [
            { value: 0, label: 'No inventory exists' },
            { value: 1, label: 'Partial inventory maintained' },
            { value: 3, label: 'Complete, regularly updated inventory' }
          ]
        },
        {
          id: 'q2',
          text: 'How does your organization manage user access rights and permissions?',
          category: 'identity',
          options: [
            { value: 0, label: 'Ad-hoc, no formal process' },
            { value: 2, label: 'Basic access controls in place' },
            { value: 3, label: 'Comprehensive role-based access control' }
          ]
        },
        {
          id: 'q3',
          text: 'Does your organization implement multi-factor authentication (MFA)?',
          category: 'identity',
          options: [
            { value: 0, label: 'No MFA implemented' },
            { value: 2, label: 'MFA for some critical systems' },
            { value: 3, label: 'MFA for all user accounts' }
          ]
        }
      ]
    },
    {
      id: 'protect',
      name: 'Protective Controls',
      description: 'Safeguards to prevent ransomware attacks',
      icon: '🛡️',
      maxScore: 9,
      questions: [
        {
          id: 'q4',
          text: 'What type of endpoint protection does your organization use?',
          category: 'protect',
          options: [
            { value: 0, label: 'Basic antivirus only' },
            { value: 2, label: 'Advanced endpoint protection' },
            { value: 3, label: 'EDR/XDR with behavioral analysis' }
          ]
        },
        {
          id: 'q5',
          text: 'How frequently does your organization update and patch systems?',
          category: 'protect',
          options: [
            { value: 0, label: 'Irregular or manual patching' },
            { value: 2, label: 'Monthly patch cycle' },
            { value: 3, label: 'Automated, priority-based patching' }
          ]
        },
        {
          id: 'q6',
          text: 'Does your organization implement email security controls?',
          category: 'protect',
          options: [
            { value: 0, label: 'Basic spam filtering only' },
            { value: 2, label: 'Advanced threat protection' },
            { value: 3, label: 'Complete email security suite' }
          ]
        }
      ]
    },
    {
      id: 'detect',
      name: 'Detection & Monitoring',
      description: 'Early warning systems for threats',
      icon: '🔍',
      maxScore: 6,
      questions: [
        {
          id: 'q7',
          text: 'Does your organization have security monitoring capabilities?',
          category: 'detect',
          options: [
            { value: 0, label: 'No centralized monitoring' },
            { value: 2, label: 'Basic log collection' },
            { value: 3, label: 'SIEM/SOC with 24/7 monitoring' }
          ]
        },
        {
          id: 'q8',
          text: 'How quickly can your organization detect anomalous network activity?',
          category: 'detect',
          options: [
            { value: 0, label: 'Days or weeks' },
            { value: 2, label: 'Within hours' },
            { value: 3, label: 'Real-time or within minutes' }
          ]
        }
      ]
    },
    {
      id: 'respond',
      name: 'Incident Response',
      description: 'Organized response to security incidents',
      icon: '🚨',
      maxScore: 6,
      questions: [
        {
          id: 'q9',
          text: 'Does your organization have a documented incident response plan?',
          category: 'respond',
          options: [
            { value: 0, label: 'No formal plan exists' },
            { value: 2, label: 'Basic plan documented' },
            { value: 3, label: 'Comprehensive, tested plan' }
          ]
        },
        {
          id: 'q10',
          text: 'How often does your organization conduct incident response exercises?',
          category: 'respond',
          options: [
            { value: 0, label: 'Never or rarely' },
            { value: 2, label: 'Annually' },
            { value: 3, label: 'Quarterly or more frequently' }
          ]
        }
      ]
    },
    {
      id: 'recover',
      name: 'Recovery & Continuity',
      description: 'Business continuity and data recovery',
      icon: '💾',
      maxScore: 9,
      questions: [
        {
          id: 'q11',
          text: 'What backup strategy does your organization implement?',
          category: 'recover',
          options: [
            { value: 0, label: 'No regular backups' },
            { value: 2, label: 'Regular backups, single location' },
            { value: 3, label: '3-2-1 backup strategy implemented' }
          ]
        },
        {
          id: 'q12',
          text: 'How frequently does your organization test backup restoration?',
          category: 'recover',
          options: [
            { value: 0, label: 'Never tested' },
            { value: 2, label: 'Annually or when issues arise' },
            { value: 3, label: 'Quarterly testing schedule' }
          ]
        },
        {
          id: 'q13',
          text: 'Does your organization have a business continuity plan?',
          category: 'recover',
          options: [
            { value: 0, label: 'No formal plan' },
            { value: 2, label: 'Basic continuity planning' },
            { value: 3, label: 'Comprehensive, tested BCP' }
          ]
        }
      ]
    }
  ];

  const recommendations: RecommendationCard[] = [
    {
      priority: 'CRITICAL',
      title: 'Implement Multi-Factor Authentication',
      description: 'Deploy MFA across all user accounts to prevent 99.9% of automated attacks and credential-based breaches.',
      impact: { risk: '80%', time: '2 weeks', cost: 'Low' },
      minScore: 20,
      framework: 'NIST CSF PR.AC-7'
    },
    {
      priority: 'HIGH',
      title: 'Establish 3-2-1 Backup Strategy',
      description: 'Implement comprehensive backup solution with 3 copies, 2 different media types, 1 offsite location.',
      impact: { risk: '70%', time: '4 weeks', cost: 'Medium' },
      minScore: 25,
      framework: 'NIST CSF PR.IP-4'
    },
    {
      priority: 'HIGH',
      title: 'Deploy Advanced Email Security',
      description: 'Implement comprehensive email protection to block 95% of ransomware delivery attempts.',
      impact: { risk: '60%', time: '1 week', cost: 'Low' },
      minScore: 30,
      framework: 'NIST CSF PR.PT-1'
    },
    {
      priority: 'MEDIUM',
      title: 'Create Incident Response Plan',
      description: 'Develop and test comprehensive incident response procedures specifically for ransomware attacks.',
      impact: { risk: '50%', time: '6 weeks', cost: 'Medium' },
      minScore: 35,
      framework: 'NIST CSF RS.RP-1'
    },
    {
      priority: 'MEDIUM',
      title: 'Implement Security Monitoring',
      description: 'Deploy SIEM or security monitoring solution for early threat detection and response.',
      impact: { risk: '40%', time: '8 weeks', cost: 'High' },
      minScore: 30,
      framework: 'NIST CSF DE.CM-1'
    }
  ];

  const vulnerabilityAlerts: VulnerabilityAlert[] = [
    {
      severity: 'critical',
      title: 'No Multi-Factor Authentication',
      description: 'Accounts vulnerable to credential theft and automated attacks',
      remediation: 'Implement MFA for all user accounts immediately'
    },
    {
      severity: 'critical',
      title: 'Insufficient Backup Strategy',
      description: 'Increases ransomware recovery time and costs significantly',
      remediation: 'Deploy 3-2-1 backup strategy with offsite storage'
    },
    {
      severity: 'high',
      title: 'Lack of Security Monitoring',
      description: 'Delays threat detection and incident response',
      remediation: 'Implement centralized security monitoring and alerting'
    },
    {
      severity: 'high',
      title: 'Missing Incident Response Plan',
      description: 'Creates confusion and delays during security incidents',
      remediation: 'Develop and test comprehensive incident response procedures'
    },
    {
      severity: 'medium',
      title: 'Inadequate Email Security',
      description: 'Allows ransomware delivery through email vectors',
      remediation: 'Deploy advanced email threat protection solution'
    }
  ];

  // Initialize component
  useEffect(() => {
    initializeAssessment();
    generateSessionId();
    testCloudConnection();
    loadFromLocalStorage();
    setExpandedCategory('identity'); // Auto-expand first category
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (organizationData.organizationName) {
      const autoSave = setTimeout(() => {
        saveToCloud();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSave);
    }
  }, [organizationData, answers, categoryScores]);

  // Update scores when answers change
  useEffect(() => {
    calculateScores();
  }, [answers]);

  // Utility functions
  const generateSessionId = () => {
    const sessionId = `ransomware-assess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setCurrentSessionId(sessionId);
    return sessionId;
  };

  const initializeAssessment = () => {
    setLastUpdated(new Date().toLocaleString());
  };

  const testCloudConnection = async () => {
    try {
      setCloudStatus('🔄 Testing cloud connection...');
      
      const { data, error } = await supabase
        .from('ransomware_assessments')
        .select('id')
        .limit(1);
      
      if (error && error.code === 'PGRST116') {
        setIsCloudConnected(true);
        setCloudStatus('✅ Connected to CyberCaution Cloud Storage');
      } else if (error) {
        setIsCloudConnected(false);
        setCloudStatus('❌ Cloud connection failed - using local storage');
      } else {
        setIsCloudConnected(true);
        setCloudStatus('✅ Connected to CyberCaution Cloud Storage');
      }
    } catch (error) {
      console.error('Cloud connection test failed:', error);
      setIsCloudConnected(false);
      setCloudStatus('❌ Cloud connection failed - using local storage');
    }
  };

  const saveToCloud = async () => {
    if (!isCloudConnected || !organizationData.organizationName) return;

    try {
      const assessmentData = {
        session_id: currentSessionId,
        organization_name: organizationData.organizationName,
        industry: organizationData.industry,
        organization_size: organizationData.organizationSize,
        assessment_manager: organizationData.assessmentManager,
        compliance_requirements: organizationData.complianceRequirements,
        answers: answers,
        category_scores: categoryScores,
        overall_score: overallScore,
        assessment_data: {
          organizationData,
          answers,
          categoryScores,
          overallScore,
          showResults
        },
        risk_level: getRiskLevel(overallScore),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('ransomware_assessments')
        .upsert(assessmentData, { onConflict: 'session_id' });

      if (error) {
        console.error('Error saving to cloud:', error);
      } else {
        setLastUpdated(new Date().toLocaleString());
        console.log('Assessment data saved to cloud successfully');
      }
    } catch (error) {
      console.error('Error in saveToCloud:', error);
    }
  };

  const loadFromCloud = async (sessionId: string) => {
    if (!isCloudConnected) return false;

    try {
      const { data, error } = await supabase
        .from('ransomware_assessments')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (error || !data) return false;

      setOrganizationData({
        organizationName: data.organization_name || '',
        industry: data.industry || '',
        organizationSize: data.organization_size || '',
        assessmentManager: data.assessment_manager || '',
        complianceRequirements: data.compliance_requirements || ''
      });
      setAnswers(data.answers || {});
      setCategoryScores(data.category_scores || {});
      setOverallScore(data.overall_score || 0);
      setLastUpdated(new Date(data.updated_at).toLocaleString());

      return true;
    } catch (error) {
      console.error('Error loading from cloud:', error);
      return false;
    }
  };

  const saveToLocalStorage = () => {
    const data = {
      sessionId: currentSessionId,
      organizationData,
      answers,
      categoryScores,
      overallScore,
      showResults,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cyberCaution_ransomwareAssessment', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('cyberCaution_ransomwareAssessment');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setOrganizationData(data.organizationData || {});
        setAnswers(data.answers || {});
        setCategoryScores(data.categoryScores || {});
        setOverallScore(data.overallScore || 0);
        setShowResults(data.showResults || false);
        if (data.sessionId) {
          setCurrentSessionId(data.sessionId);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  };

  const calculateScores = () => {
    const totalQuestions = assessmentCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    
    // Calculate category scores
    const newCategoryScores: Record<string, number> = {};
    let totalScore = 0;
    let maxPossibleScore = 0;

    assessmentCategories.forEach(category => {
      let categoryScore = 0;
      category.questions.forEach(question => {
        if (answers[question.id] !== undefined) {
          categoryScore += answers[question.id];
        }
      });
      
      const categoryPercentage = Math.round((categoryScore / category.maxScore) * 100);
      newCategoryScores[category.id] = categoryPercentage;
      
      totalScore += categoryScore;
      maxPossibleScore += category.maxScore;
    });

    setCategoryScores(newCategoryScores);
    
    const newOverallScore = Math.round((totalScore / maxPossibleScore) * 100);
    setOverallScore(newOverallScore);
    
    // Show results when all questions are answered
    if (answeredQuestions === totalQuestions) {
      setShowResults(true);
    }

    saveToLocalStorage();
    saveToCloud();
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleOrganizationSubmit = () => {
    if (!organizationData.organizationName.trim()) {
      alert('Please enter organization name');
      return;
    }
    setCurrentStep(1);
    saveToLocalStorage();
    saveToCloud();
  };

  const getRiskLevel = (score: number): string => {
    if (score < 40) return 'High Risk';
    if (score < 70) return 'Medium Risk';
    return 'Good Protection';
  };

  const getRiskColor = (score: number): string => {
    if (score < 40) return 'from-red-600 to-red-800';
    if (score < 70) return 'from-orange-500 to-orange-700';
    return 'from-green-500 to-green-700';
  };

  const getCategoryScoreColor = (score: number): string => {
    if (score < 40) return 'bg-red-100 text-red-800';
    if (score < 70) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getProgressPercentage = () => {
    const totalQuestions = assessmentCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const exportReport = () => {
    const reportContent = `
RANSOMWARE READINESS ASSESSMENT REPORT
Generated: ${new Date().toLocaleString()}
Organization: ${organizationData.organizationName}
Session ID: ${currentSessionId}

========================================
EXECUTIVE SUMMARY
========================================
Overall Readiness Score: ${overallScore}%
Risk Level: ${getRiskLevel(overallScore)}
Assessment Date: ${new Date().toLocaleDateString()}
Assessment Manager: ${organizationData.assessmentManager}

========================================
CATEGORY BREAKDOWN
========================================
${assessmentCategories.map(category => 
  `${category.name}: ${categoryScores[category.id] || 0}%`
).join('\n')}

========================================
ANSWERS SUMMARY
========================================
${assessmentCategories.map(category => 
  `\n${category.name}:\n${category.questions.map(q => 
    `  Q: ${q.text}\n  A: ${q.options.find(opt => opt.value === answers[q.id])?.label || 'Not answered'}`
  ).join('\n')}`
).join('\n')}

========================================
RISK ASSESSMENT
========================================
${overallScore < 40 ? 'HIGH RISK: Your organization has significant ransomware vulnerabilities that need immediate attention.' :
  overallScore < 70 ? 'MEDIUM RISK: Your organization has basic protections but needs improvement in key areas.' :
  'GOOD PROTECTION: Your organization has strong ransomware protections with room for optimization.'}

========================================
PRIORITY RECOMMENDATIONS
========================================
${recommendations.filter(rec => overallScore < rec.minScore).map((rec, index) => 
  `${index + 1}. ${rec.title} (${rec.priority})\n   ${rec.description}\n   Framework: ${rec.framework}\n   Impact: ${rec.impact.risk} risk reduction, ${rec.impact.time} timeline, ${rec.impact.cost} cost`
).join('\n\n')}

========================================
VULNERABILITY SUMMARY
========================================
${overallScore < 40 ? vulnerabilityAlerts.map(vuln => 
  `• ${vuln.title}: ${vuln.description}\n  Remediation: ${vuln.remediation}`
).join('\n') : 'No critical vulnerabilities identified based on current assessment.'}

Generated by CyberCaution™ Ransomware Readiness Assessment
Part of the CyberCaution Cybersecurity Toolkit
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ransomware-assessment-${organizationData.organizationName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  // Step Components
  const OrganizationSetupStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Setup</h2>
        <p className="text-gray-600">Configure assessment parameters and organizational details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name *
            </label>
            <input
              type="text"
              value={organizationData.organizationName}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, organizationName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter organization name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={organizationData.industry}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select industry</option>
              {industryOptions.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Size
            </label>
            <select
              value={organizationData.organizationSize}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, organizationSize: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select organization size</option>
              {organizationSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Manager
            </label>
            <input
              type="text"
              value={organizationData.assessmentManager}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, assessmentManager: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter assessment manager name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Compliance Requirements
            </label>
            <select
              value={organizationData.complianceRequirements}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, complianceRequirements: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select primary compliance framework</option>
              {complianceOptions.map(compliance => (
                <option key={compliance} value={compliance}>{compliance}</option>
              ))}
            </select>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">Assessment Scope</h4>
                <p className="text-red-800 text-sm mt-1">
                  This assessment evaluates ransomware readiness across 5 critical security 
                  domains based on the NIST Cybersecurity Framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleOrganizationSubmit}
          className="bg-red-600 hover:bg-red-700 px-8 py-2"
          disabled={!organizationData.organizationName.trim()}
        >
          Begin Assessment
        </Button>
      </div>
    </div>
  );

  const AssessmentStep = () => (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">📊 Assessment Progress</h3>
        <p className="text-red-800 text-sm mb-4">
          This comprehensive assessment evaluates your organization across 5 critical security domains 
          based on the NIST Cybersecurity Framework.
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-red-700">
          <span>Assessment Progress</span>
          <span>{getProgressPercentage()}% Complete</span>
        </div>
      </div>

      {/* Assessment Categories */}
      <div className="space-y-4">
        {assessmentCategories.map((category) => (
          <Card key={category.id} className="border-2 hover:border-red-200 transition-colors">
            <CardHeader 
              className="cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100"
              onClick={() => setExpandedCategory(expandedCategory === category.id ? '' : category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white text-xl">
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryScoreColor(categoryScores[category.id] || 0)}`}>
                    {categoryScores[category.id] || 0}%
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            {expandedCategory === category.id && (
              <CardContent className="p-6 space-y-6">
                {category.questions.map((question) => (
                  <div key={question.id} className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-300 hover:border-red-500 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-4">{question.text}</h4>
                    <div className="grid gap-3">
                      {question.options.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={answers[question.id] === option.value}
                            onChange={() => handleAnswerChange(question.id, option.value)}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-gray-900">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {showResults && (
        <div className="flex justify-center">
          <Button 
            onClick={() => setCurrentStep(2)}
            className="bg-red-600 hover:bg-red-700 px-8 py-2"
          >
            View Assessment Results
          </Button>
        </div>
      )}
    </div>
  );

  const ResultsStep = () => (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center">
        <div className={`w-40 h-40 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${getRiskColor(overallScore)}`}>
          <div className="text-center text-white">
            <div className="text-4xl font-bold">{overallScore}</div>
            <div className="text-sm">SCORE</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getRiskLevel(overallScore)}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {overallScore < 40 
            ? 'Your organization has significant ransomware vulnerabilities that need immediate attention.'
            : overallScore < 70 
            ? 'Your organization has basic protections but needs improvement in key areas.'
            : 'Your organization has strong ransomware protections with room for optimization.'
          }
        </p>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Security Domain Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentCategories.map((category) => (
              <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${categoryScores[category.id] >= 70 ? 'bg-green-500' : categoryScores[category.id] >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                      style={{ width: `${categoryScores[category.id] || 0}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-900">{categoryScores[category.id] || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vulnerability Alerts */}
      {overallScore < 40 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Critical Vulnerabilities Identified</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vulnerabilityAlerts.slice(0, 3).map((vuln, index) => (
                <div key={index} className="flex items-start space-x-3 text-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{vuln.title}</div>
                    <div className="text-sm">{vuln.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations
              .filter(rec => overallScore < rec.minScore)
              .slice(0, 4)
              .map((rec, index) => (
              <div key={index} className="bg-white border rounded-lg p-5 border-l-4 border-red-500">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  rec.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {rec.priority}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                <div className="flex justify-between text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{rec.impact.risk}</div>
                    <div className="text-gray-500">Risk Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{rec.impact.time}</div>
                    <div className="text-gray-500">Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{rec.impact.cost}</div>
                    <div className="text-gray-500">Investment</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Framework: {rec.framework}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Immediate (1-2 weeks):</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Address critical vulnerabilities</li>
                <li>• Implement MFA for all accounts</li>
                <li>• Review backup procedures</li>
                <li>• Update incident response contacts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Short-term (1-3 months):</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Deploy security monitoring</li>
                <li>• Establish 3-2-1 backup strategy</li>
                <li>• Conduct IR plan testing</li>
                <li>• Enhance email security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Long-term (3-6 months):</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Complete security awareness training</li>
                <li>• Implement advanced threat detection</li>
                <li>• Conduct regular assessments</li>
                <li>• Achieve compliance certification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 flex-wrap gap-4">
        <Button 
          onClick={exportReport}
          className="bg-red-600 hover:bg-red-700"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button 
          variant="outline" 
          onClick={printReport}
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Results
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            setAnswers({});
            setCategoryScores({});
            setOverallScore(0);
            setShowResults(false);
            setCurrentStep(0);
            setExpandedCategory('identity');
          }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-10 w-10 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Ransomware Readiness Assessment</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Evaluate your organization's cybersecurity posture and get immediate improvement 
            recommendations based on the NIST Cybersecurity Framework
          </p>
          
          {/* Cloud Status */}
          <div className="flex items-center justify-center space-x-3 text-sm">
            {isCloudConnected ? (
              <Cloud className="h-4 w-4 text-green-600" />
            ) : (
              <CloudOff className="h-4 w-4 text-red-500" />
            )}
            <span className={isCloudConnected ? 'text-green-600' : 'text-red-500'}>
              {cloudStatus}
            </span>
            {lastUpdated && (
              <span className="text-gray-500">
                • Last updated: {lastUpdated}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Card className="max-w-6xl mx-auto shadow-lg">
          <CardContent className="p-8">
            {currentStep === 0 && <OrganizationSetupStep />}
            {currentStep === 1 && <AssessmentStep />}
            {currentStep === 2 && <ResultsStep />}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Part of the CyberCaution™ Cybersecurity Toolkit • 
            Session ID: {currentSessionId.substring(0, 16)}... • 
            Based on NIST Cybersecurity Framework
          </p>
        </div>
      </div>
    </div>
  );
};

export default RansomwareReadinessAssessment;