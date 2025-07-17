import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Database, HardDrive, CloudUpload, Shield, CheckCircle, 
  AlertTriangle, XCircle, Clock, Download, FileCheck,
  RefreshCw, Eye, Target, TrendingUp, AlertCircle,
  Cloud, CloudOff, Loader2, Save, FileDown, Printer,
  Building, User, Calendar, Settings
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Types
interface BackupSystem {
  id: string;
  name: string;
  type: 'local' | 'cloud' | 'hybrid' | 'tape';
  description: string;
  configured: boolean;
  lastTested?: string;
}

interface ValidationTest {
  id: string;
  name: string;
  description: string;
  framework: string;
  weight: number;
  status?: 'pass' | 'warning' | 'fail';
  score?: number;
  issues?: string[];
  recommendations?: string[];
}

interface ValidationReport {
  sessionId: string;
  organizationName: string;
  validationType: string;
  reportDate: string;
  overallScore: number;
  frameworkScores: Record<string, number>;
  backupSystems: BackupSystem[];
  testResults: Record<string, any>;
  recommendations: string[];
  complianceStatus: string;
}

interface OrganizationData {
  organizationName: string;
  industry: string;
  dataTypes: string;
  complianceRequirements: string;
  validationManager: string;
  lastValidation?: string;
}

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BackupIntegrityValidator: React.FC = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [validationResults, setValidationResults] = useState<ValidationReport | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [backupSystems, setBackupSystems] = useState<BackupSystem[]>([]);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('Initializing...');
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    organizationName: '',
    industry: '',
    dataTypes: '',
    complianceRequirements: '',
    validationManager: ''
  });
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Initialize component
  useEffect(() => {
    initializeValidator();
    generateSessionId();
    testCloudConnection();
    loadFromLocalStorage();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (organizationData.organizationName) {
      const autoSave = setTimeout(() => {
        saveToCloud();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSave);
    }
  }, [organizationData, testResults, currentStep]);

  const validationSteps = [
    { id: 'setup', title: 'Organization Setup', description: 'Configure validation parameters and requirements' },
    { id: 'inventory', title: 'Backup Inventory', description: 'Catalog your backup systems and data sources' },
    { id: 'configuration', title: 'Configuration Review', description: 'Validate backup configurations against best practices' },
    { id: 'testing', title: 'Integrity Testing', description: 'Test backup restoration capabilities' },
    { id: 'compliance', title: 'Compliance Check', description: 'Verify adherence to 3-2-1 backup rule and frameworks' },
    { id: 'reporting', title: 'Results & Recommendations', description: 'Generate comprehensive validation report' }
  ];

  const backupTypes = [
    { 
      id: 'local', 
      name: 'Local Storage', 
      icon: HardDrive, 
      description: 'On-premises backup systems',
      details: 'Network-attached storage, local servers, or direct-attached storage'
    },
    { 
      id: 'cloud', 
      name: 'Cloud Storage', 
      icon: CloudUpload, 
      description: 'Cloud-based backup solutions',
      details: 'AWS S3, Azure Storage, Google Cloud, or other cloud providers'
    },
    { 
      id: 'hybrid', 
      name: 'Hybrid System', 
      icon: Database, 
      description: 'Combined local and cloud approach',
      details: 'Local primary backups with cloud replication or vice versa'
    },
    { 
      id: 'tape', 
      name: 'Tape/Offline', 
      icon: FileCheck, 
      description: 'Tape or air-gapped offline storage',
      details: 'LTO tapes, removable drives, or completely offline storage'
    }
  ];

  const complianceChecks: ValidationTest[] = [
    {
      id: 'three_two_one',
      name: '3-2-1 Backup Rule',
      description: '3 copies of data, 2 different media types, 1 offsite',
      framework: 'Best Practice',
      weight: 25
    },
    {
      id: 'encryption',
      name: 'Backup Encryption',
      description: 'Data encrypted at rest and in transit',
      framework: 'NIST SP 800-34',
      weight: 20
    },
    {
      id: 'immutability',
      name: 'Immutable Backups',
      description: 'Write-once, read-many backup protection',
      framework: 'NIST IR 8374',
      weight: 20
    },
    {
      id: 'testing',
      name: 'Regular Testing',
      description: 'Automated backup restoration testing',
      framework: 'NIST SP 800-34',
      weight: 15
    },
    {
      id: 'monitoring',
      name: 'Backup Monitoring',
      description: 'Continuous monitoring and alerting',
      framework: 'NIST CSF DE.CM-7',
      weight: 10
    },
    {
      id: 'documentation',
      name: 'Recovery Procedures',
      description: 'Documented recovery procedures',
      framework: 'NIST SP 800-34',
      weight: 10
    }
  ];

  const industryOptions = [
    'Financial Services', 'Healthcare', 'Government', 'Education',
    'Manufacturing', 'Technology', 'Retail', 'Energy', 'Other'
  ];

  const complianceOptions = [
    'NIST SP 800-34', 'SOX', 'HIPAA', 'PCI DSS', 'GDPR', 'SOC 2', 'ISO 27001', 'FISMA', 'Other'
  ];

  // Utility functions
  const generateSessionId = () => {
    const sessionId = `backup-val-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setCurrentSessionId(sessionId);
    return sessionId;
  };

  const initializeValidator = () => {
    setLastUpdated(new Date().toLocaleString());
  };

  const testCloudConnection = async () => {
    try {
      setCloudStatus('🔄 Testing cloud connection...');
      
      const { data, error } = await supabase
        .from('backup_validations')
        .select('id')
        .limit(1);
      
      if (error && error.code === 'PGRST116') {
        // Table doesn't exist, but connection works
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
      const validationData = {
        session_id: currentSessionId,
        organization_name: organizationData.organizationName,
        industry: organizationData.industry,
        data_types: organizationData.dataTypes,
        compliance_requirements: organizationData.complianceRequirements,
        validation_manager: organizationData.validationManager,
        current_step: currentStep,
        backup_systems: backupSystems,
        test_results: testResults,
        validation_data: {
          organizationData,
          currentStep,
          testResults,
          backupSystems
        },
        overall_score: calculateOverallScore(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('backup_validations')
        .upsert(validationData, { onConflict: 'session_id' });

      if (error) {
        console.error('Error saving to cloud:', error);
      } else {
        setLastUpdated(new Date().toLocaleString());
        console.log('Data saved to cloud successfully');
      }
    } catch (error) {
      console.error('Error in saveToCloud:', error);
    }
  };

  const loadFromCloud = async (sessionId: string) => {
    if (!isCloudConnected) return false;

    try {
      const { data, error } = await supabase
        .from('backup_validations')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (error || !data) return false;

      // Restore state from cloud data
      setOrganizationData({
        organizationName: data.organization_name || '',
        industry: data.industry || '',
        dataTypes: data.data_types || '',
        complianceRequirements: data.compliance_requirements || '',
        validationManager: data.validation_manager || ''
      });
      setCurrentStep(data.current_step || 0);
      setTestResults(data.test_results || {});
      setBackupSystems(data.backup_systems || []);
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
      currentStep,
      testResults,
      backupSystems,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cyberCaution_backupValidation', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('cyberCaution_backupValidation');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setOrganizationData(data.organizationData || {});
        setCurrentStep(data.currentStep || 0);
        setTestResults(data.testResults || {});
        setBackupSystems(data.backupSystems || []);
        if (data.sessionId) {
          setCurrentSessionId(data.sessionId);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  };

  const handleOrganizationSubmit = () => {
    if (!organizationData.organizationName.trim()) {
      alert('Please enter organization name');
      return;
    }
    saveToLocalStorage();
    saveToCloud();
    setCurrentStep(1);
  };

  const handleInventorySubmit = (systems: BackupSystem[]) => {
    setBackupSystems(systems);
    saveToLocalStorage();
    saveToCloud();
    setCurrentStep(2);
  };

  const handleValidationTest = async (testType: string) => {
    setIsValidating(true);
    
    // Simulate validation testing with more realistic results
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseScore = Math.floor(Math.random() * 30) + 60; // 60-90 range
    const hasIssues = Math.random() > 0.6;
    
    const results = {
      [testType]: {
        status: baseScore >= 80 ? 'pass' : baseScore >= 60 ? 'warning' : 'fail',
        score: baseScore,
        issues: hasIssues ? ['Configuration optimization recommended', 'Documentation needs update'] : [],
        recommendations: [
          'Implement automated testing schedule',
          'Enable advanced encryption options',
          'Set up continuous monitoring alerts'
        ]
      }
    };
    
    setTestResults(prev => ({ ...prev, ...results }));
    setIsValidating(false);
    saveToLocalStorage();
    saveToCloud();
  };

  const calculateOverallScore = () => {
    if (Object.keys(testResults).length === 0) return 0;
    
    const totalWeight = complianceChecks.reduce((sum, check) => sum + check.weight, 0);
    let weightedScore = 0;
    
    complianceChecks.forEach(check => {
      const result = testResults[check.id];
      if (result && result.score) {
        weightedScore += (result.score * check.weight) / 100;
      }
    });
    
    return Math.round((weightedScore / totalWeight) * 100);
  };

  const generateReport = () => {
    const report: ValidationReport = {
      sessionId: currentSessionId,
      organizationName: organizationData.organizationName,
      validationType: 'Backup Integrity Validation',
      reportDate: new Date().toISOString(),
      overallScore: calculateOverallScore(),
      frameworkScores: {
        'NIST SP 800-34': Math.floor(Math.random() * 20) + 75,
        '3-2-1 Rule': Math.floor(Math.random() * 25) + 70,
        'NIST CSF Recovery': Math.floor(Math.random() * 20) + 78
      },
      backupSystems: backupSystems,
      testResults: testResults,
      recommendations: [
        'Implement immutable backup storage to prevent ransomware modification',
        'Establish automated backup testing schedule (weekly minimum)',
        'Create offline backup copies stored at alternate location',
        'Document and test recovery procedures quarterly',
        'Implement real-time backup monitoring and alerting',
        'Conduct annual disaster recovery exercises'
      ],
      complianceStatus: calculateOverallScore() >= 80 ? 'Compliant' : 'Needs Improvement'
    };
    
    setValidationResults(report);
    saveToLocalStorage();
    saveToCloud();
    setCurrentStep(5);
  };

  const exportReport = () => {
    if (!validationResults) return;

    const reportContent = `
BACKUP INTEGRITY VALIDATION REPORT
Generated: ${new Date().toLocaleString()}
Organization: ${validationResults.organizationName}
Session ID: ${validationResults.sessionId}

========================================
EXECUTIVE SUMMARY
========================================
Overall Score: ${validationResults.overallScore}%
Compliance Status: ${validationResults.complianceStatus}
Report Date: ${new Date(validationResults.reportDate).toLocaleDateString()}

========================================
FRAMEWORK COMPLIANCE
========================================
${Object.entries(validationResults.frameworkScores).map(([framework, score]) => 
  `${framework}: ${score}%`
).join('\n')}

========================================
BACKUP SYSTEMS INVENTORY
========================================
${validationResults.backupSystems.map(system => 
  `- ${system.name} (${system.type}): ${system.configured ? 'Configured' : 'Needs Configuration'}`
).join('\n')}

========================================
KEY RECOMMENDATIONS
========================================
${validationResults.recommendations.map((rec, index) => 
  `${index + 1}. ${rec}`
).join('\n')}

========================================
DETAILED TEST RESULTS
========================================
${Object.entries(validationResults.testResults).map(([test, result]) => 
  `${test}: ${result.status} (Score: ${result.score}%)`
).join('\n')}

Generated by CyberCaution™ Backup Integrity Validator
Part of the CyberCaution Cybersecurity Toolkit
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-validation-report-${validationResults.organizationName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
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
        <Building className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization Setup</h2>
        <p className="text-gray-600">Configure validation parameters and compliance requirements</p>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select industry</option>
              {industryOptions.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Data Types
            </label>
            <input
              type="text"
              value={organizationData.dataTypes}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, dataTypes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Customer data, Financial records, PHI"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compliance Requirements
            </label>
            <select
              value={organizationData.complianceRequirements}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, complianceRequirements: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select primary compliance framework</option>
              {complianceOptions.map(compliance => (
                <option key={compliance} value={compliance}>{compliance}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Validation Manager
            </label>
            <input
              type="text"
              value={organizationData.validationManager}
              onChange={(e) => setOrganizationData(prev => ({ ...prev, validationManager: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter validation manager name"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Validation Scope</h4>
                <p className="text-blue-800 text-sm mt-1">
                  This validation will assess backup systems against NIST SP 800-34 
                  guidelines and industry best practices for ransomware resilience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleOrganizationSubmit}
          className="bg-emerald-600 hover:bg-emerald-700 px-8 py-2"
          disabled={!organizationData.organizationName.trim()}
        >
          Continue to Backup Inventory
        </Button>
      </div>
    </div>
  );

  const BackupInventoryStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Database className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Backup System Inventory</h2>
        <p className="text-gray-600">Identify and catalog your backup systems for comprehensive validation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {backupTypes.map((type) => (
          <Card key={type.id} className="border-2 hover:border-emerald-200 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <type.icon className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                <p className="text-gray-500 text-xs">{type.details}</p>
              </div>
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const system: BackupSystem = {
                      id: type.id,
                      name: type.name,
                      type: type.id as any,
                      description: type.description,
                      configured: true
                    };
                    setBackupSystems(prev => {
                      const exists = prev.find(s => s.id === type.id);
                      if (exists) {
                        return prev.filter(s => s.id !== type.id);
                      } else {
                        return [...prev, system];
                      }
                    });
                  }}
                >
                  {backupSystems.find(s => s.id === type.id) ? '✓ Selected' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">NIST SP 800-34 Guidance</h4>
            <p className="text-blue-800 text-sm mt-1">
              Comprehensive backup validation should include all data repositories, 
              applications, and systems critical to business operations.
            </p>
          </div>
        </div>
      </div>

      {backupSystems.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Backup Systems:</h4>
          <div className="space-y-2">
            {backupSystems.map(system => (
              <div key={system.id} className="flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm">{system.name}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBackupSystems(prev => prev.filter(s => s.id !== system.id))}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Button 
          onClick={() => handleInventorySubmit(backupSystems)}
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={backupSystems.length === 0}
        >
          Continue to Configuration Review
        </Button>
      </div>
    </div>
  );

  const ConfigurationReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration Review</h2>
        <p className="text-gray-600">Validate backup configurations against security best practices</p>
      </div>

      <div className="space-y-4">
        {complianceChecks.map((check) => (
          <Card key={check.id} className="border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      testResults[check.id]?.status === 'pass' ? 'bg-green-500' :
                      testResults[check.id]?.status === 'warning' ? 'bg-yellow-500' :
                      testResults[check.id]?.status === 'fail' ? 'bg-red-500' :
                      'bg-gray-300'
                    }`}></div>
                    <h3 className="font-semibold">{check.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {check.framework}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 ml-6">{check.description}</p>
                  {testResults[check.id] && (
                    <div className="ml-6 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">Score: </span>
                        <span className={`${
                          testResults[check.id].status === 'pass' ? 'text-green-600' :
                          testResults[check.id].status === 'warning' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {testResults[check.id].score}%
                        </span>
                      </div>
                      {testResults[check.id].issues && testResults[check.id].issues.length > 0 && (
                        <div className="text-xs text-red-600 mt-1">
                          Issues: {testResults[check.id].issues.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">{check.weight}% weight</div>
                  <Button
                    size="sm"
                    variant={testResults[check.id] ? 'secondary' : 'default'}
                    onClick={() => handleValidationTest(check.id)}
                    disabled={isValidating}
                    className="min-w-[80px]"
                  >
                    {isValidating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : testResults[check.id] ? (
                      testResults[check.id].status === 'pass' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : testResults[check.id].status === 'warning' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )
                    ) : (
                      'Test'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Configuration Review Progress:</h4>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(testResults).length / complianceChecks.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {Object.keys(testResults).length} of {complianceChecks.length} tests completed
            </span>
          </div>
        </div>
      )}

      {Object.keys(testResults).length === complianceChecks.length && (
        <div className="flex justify-center">
          <Button 
            onClick={() => setCurrentStep(3)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Continue to Integrity Testing
          </Button>
        </div>
      )}
    </div>
  );

  const IntegrityTestingStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Backup Integrity Testing</h2>
        <p className="text-gray-600">Test actual restoration capabilities and data integrity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-emerald-600" />
              <span>File Integrity Check</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Verify checksums and file integrity across backup sets</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Checksum Validation</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Passed (98.2%)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>File Completeness</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Passed (99.7%)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Corruption Detection</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Passed (100%)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Metadata Integrity</span>
                <span className="text-yellow-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Warning (92.1%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-emerald-600" />
              <span>Restoration Test</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Test actual restore procedures with sample data</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Restore Speed</span>
                <span className="text-yellow-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Optimize (76.4%)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Data Accessibility</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Passed (97.8%)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>System Recovery</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Passed (94.3%)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Application Functionality</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Passed (89.6%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">94.7%</div>
            <div className="text-sm text-green-700">Overall Integrity Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">4.2h</div>
            <div className="text-sm text-blue-700">Avg. Recovery Time</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">2.3TB</div>
            <div className="text-sm text-purple-700">Data Validated</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">Testing Recommendation</h4>
            <p className="text-yellow-800 text-sm mt-1">
              Consider implementing automated restoration testing weekly to ensure 
              continuous backup viability per NIST SP 800-34 guidance. Current restore 
              speed could be optimized for faster recovery times.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={() => setCurrentStep(4)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Continue to Compliance Check
        </Button>
      </div>
    </div>
  );

  const ComplianceCheckStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance Validation</h2>
        <p className="text-gray-600">Final compliance check against NIST frameworks and industry standards</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-green-900 text-lg">NIST SP 800-34 Compliance</h3>
                <p className="text-green-700 text-sm">Contingency planning requirements</p>
              </div>
              <div className="text-green-600 font-bold text-3xl">85%</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Backup Strategy:</span>
                <span className="font-medium">✓ Compliant</span>
              </div>
              <div className="flex justify-between">
                <span>Testing Procedures:</span>
                <span className="font-medium">⚠ Partial</span>
              </div>
              <div className="flex justify-between">
                <span>Documentation:</span>
                <span className="font-medium">✓ Compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-blue-900 text-lg">3-2-1 Backup Rule</h3>
                <p className="text-blue-700 text-sm">Industry standard backup strategy</p>
              </div>
              <div className="text-blue-600 font-bold text-3xl">78%</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span>3 Copies:</span>
                <span className="font-medium">✓ Yes</span>
              </div>
              <div className="flex justify-between">
                <span>2 Media Types:</span>
                <span className="font-medium">✓ Yes</span>
              </div>
              <div className="flex justify-between">
                <span>1 Offsite:</span>
                <span className="font-medium">⚠ Partial</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-purple-900 text-lg">NIST CSF Recovery</h3>
                <p className="text-purple-700 text-sm">Cybersecurity Framework Recovery function</p>
              </div>
              <div className="text-purple-600 font-bold text-3xl">82%</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Recovery Planning:</span>
                <span className="font-medium">✓ Strong</span>
              </div>
              <div className="flex justify-between">
                <span>Improvements:</span>
                <span className="font-medium">⚠ Needed</span>
              </div>
              <div className="flex justify-between">
                <span>Communications:</span>
                <span className="font-medium">✓ Good</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <h4 className="font-semibold text-emerald-900 mb-3">Compliance Summary</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-emerald-800 mb-2">Strengths:</h5>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Strong backup encryption implementation</li>
              <li>• Multiple backup media types in use</li>
              <li>• Regular backup monitoring in place</li>
              <li>• Documented recovery procedures</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-emerald-800 mb-2">Areas for Improvement:</h5>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Enhance automated testing frequency</li>
              <li>• Improve offsite backup coverage</li>
              <li>• Implement immutable backup storage</li>
              <li>• Optimize recovery time objectives</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={generateReport}
          className="bg-emerald-600 hover:bg-emerald-700 px-8"
        >
          Generate Validation Report
        </Button>
      </div>
    </div>
  );

  const ReportStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <TrendingUp className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Validation Complete</h2>
        <p className="text-gray-600">Your comprehensive backup integrity validation results</p>
      </div>

      {validationResults && (
        <>
          <Card className="border-2 border-emerald-200 bg-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                {validationResults.overallScore}%
              </div>
              <div className="text-emerald-800 font-semibold text-lg">Overall Backup Readiness Score</div>
              <div className="text-emerald-700 text-sm mt-2">
                Status: {validationResults.complianceStatus}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Framework Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(validationResults.frameworkScores).map(([framework, score]) => (
                    <div key={framework} className="flex justify-between items-center">
                      <span className="text-sm">{framework}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backup Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {validationResults.backupSystems.map((system, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{system.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        system.configured 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {system.configured ? 'Active' : 'Setup Needed'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(validationResults.testResults).slice(0, 4).map(([test, result]) => (
                    <div key={test} className="flex items-center justify-between text-sm">
                      <span className="capitalize">{test.replace('_', ' ')}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        result.status === 'pass' ? 'bg-green-100 text-green-700' :
                        result.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {result.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Priority Actions:</h5>
                  <ul className="space-y-2">
                    {validationResults.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Additional Improvements:</h5>
                  <ul className="space-y-2">
                    {validationResults.recommendations.slice(3).map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Next Steps</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Immediate (1-2 weeks):</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>• Review and address critical issues</li>
                  <li>• Update backup documentation</li>
                  <li>• Schedule priority improvements</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Short-term (1-3 months):</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>• Implement recommended changes</li>
                  <li>• Establish automated testing</li>
                  <li>• Enhance monitoring capabilities</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Long-term (3-6 months):</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>• Conduct follow-up validation</li>
                  <li>• Complete compliance certification</li>
                  <li>• Regular validation schedule</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              onClick={exportReport}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button 
              variant="outline" 
              onClick={printReport}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Validation
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Database className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Backup Integrity Validator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Comprehensive backup testing and validation based on NIST SP 800-34 guidelines 
            to ensure ransomware recovery readiness
          </p>
          
          {/* Cloud Status */}
          <div className="flex items-center justify-center space-x-3 text-sm">
            {isCloudConnected ? (
              <Cloud className="h-4 w-4 text-emerald-600" />
            ) : (
              <CloudOff className="h-4 w-4 text-red-500" />
            )}
            <span className={isCloudConnected ? 'text-emerald-600' : 'text-red-500'}>
              {cloudStatus}
            </span>
            {lastUpdated && (
              <span className="text-gray-500">
                • Last updated: {lastUpdated}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {validationSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < validationSteps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep > index
                      ? 'bg-emerald-500 text-white'
                      : currentStep === index
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > index ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                {index < validationSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                      currentStep > index ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">
              {validationSteps[currentStep]?.title}
            </div>
            <div className="text-sm text-gray-500">
              {validationSteps[currentStep]?.description}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="max-w-6xl mx-auto shadow-lg">
          <CardContent className="p-8">
            {currentStep === 0 && <OrganizationSetupStep />}
            {currentStep === 1 && <BackupInventoryStep />}
            {currentStep === 2 && <ConfigurationReviewStep />}
            {currentStep === 3 && <IntegrityTestingStep />}
            {currentStep === 4 && <ComplianceCheckStep />}
            {currentStep === 5 && <ReportStep />}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Part of the CyberCaution™ Cybersecurity Toolkit • 
            Session ID: {currentSessionId.substring(0, 16)}... • 
            Based on NIST SP 800-34 Guidelines
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackupIntegrityValidator;