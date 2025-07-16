import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNistCsfAssessment } from '../hooks/useSupabase';
import { 
  Award,
  CheckCircle,
  AlertTriangle,
  Target,
  FileText,
  Download,
  BarChart3,
  Settings,
  Shield,
  Eye,
  Users,
  Database,
  Lock,
  RefreshCw,
  ArrowRight,
  Clock,
  TrendingUp,
  Save,
  Cloud,
  Loader
} from 'lucide-react';

const NISTCSFToolkit = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [organizationInfo, setOrganizationInfo] = useState({
    name: '',
    industry: '',
    size: ''
  });

  // Supabase integration
  const { 
    sessionId, 
    assessment, 
    loading, 
    error, 
    saveAssessment, 
    loadAssessment,
    generateReport 
  } = useNistCsfAssessment();

  const [assessmentData, setAssessmentData] = useState({});
  const [lastSaved, setLastSaved] = useState(null);

  // Load saved data when component mounts
  useEffect(() => {
    if (assessment) {
      setAssessmentData(assessment.assessment_data || {});
      setOrganizationInfo({
        name: assessment.organization_name || '',
        industry: assessment.industry || '',
        size: assessment.organization_size || ''
      });
      setLastSaved(assessment.updated_at);
    }
  }, [assessment]);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(assessmentData).length > 0 || organizationInfo.name) {
        handleSave(false); // Silent save
      }
    }, 5000); // Auto-save every 5 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [assessmentData, organizationInfo]);

  const nistFunctions = [
    {
      id: 'identify',
      name: 'Identify (ID)',
      icon: Eye,
      color: 'bg-blue-500',
      description: 'Develop organizational understanding to manage cybersecurity risk',
      categories: [
        { 
          id: 'ID.AM', 
          name: 'Asset Management',
          controls: [
            'ID.AM-1: Physical devices and systems are inventoried',
            'ID.AM-2: Software platforms and applications are inventoried',
            'ID.AM-3: Organizational communication and data flows are mapped',
            'ID.AM-4: External information systems are catalogued',
            'ID.AM-5: Resources are prioritized based on classification',
            'ID.AM-6: Cybersecurity roles and responsibilities are established'
          ]
        },
        {
          id: 'ID.BE',
          name: 'Business Environment',
          controls: [
            'ID.BE-1: Organizational mission and objectives are defined',
            'ID.BE-2: Business processes supporting mission delivery are understood',
            'ID.BE-3: Priorities for organizational mission are established',
            'ID.BE-4: Dependencies and critical functions are established',
            'ID.BE-5: Resilience requirements are determined'
          ]
        },
        {
          id: 'ID.GV',
          name: 'Governance',
          controls: [
            'ID.GV-1: Organizational cybersecurity policy is established',
            'ID.GV-2: Cybersecurity roles & responsibilities are coordinated',
            'ID.GV-3: Legal and regulatory requirements are understood',
            'ID.GV-4: Governance and risk management processes address cybersecurity'
          ]
        },
        {
          id: 'ID.RA',
          name: 'Risk Assessment',
          controls: [
            'ID.RA-1: Asset vulnerabilities are identified and documented',
            'ID.RA-2: Cyber threat intelligence is received from sources',
            'ID.RA-3: Threats are identified and documented',
            'ID.RA-4: Potential business impacts and likelihoods are identified',
            'ID.RA-5: Threats, vulnerabilities, and impacts are used to determine risk',
            'ID.RA-6: Risk responses are identified and prioritized'
          ]
        }
      ]
    },
    {
      id: 'protect',
      name: 'Protect (PR)',
      icon: Shield,
      color: 'bg-green-500',
      description: 'Develop and implement appropriate safeguards',
      categories: [
        {
          id: 'PR.AC',
          name: 'Identity Management & Access Control',
          controls: [
            'PR.AC-1: Identities and credentials are issued and managed',
            'PR.AC-2: Physical access to assets is managed',
            'PR.AC-3: Remote access is managed',
            'PR.AC-4: Access permissions and authorizations are managed',
            'PR.AC-5: Network integrity is protected',
            'PR.AC-6: Identities are proofed and bound to credentials',
            'PR.AC-7: Users and devices are authenticated'
          ]
        },
        {
          id: 'PR.AT',
          name: 'Awareness and Training',
          controls: [
            'PR.AT-1: All users are informed and trained',
            'PR.AT-2: Privileged users understand roles & responsibilities',
            'PR.AT-3: Third-party stakeholders understand roles',
            'PR.AT-4: Senior executives understand roles & responsibilities',
            'PR.AT-5: Physical and cybersecurity personnel understand roles'
          ]
        },
        {
          id: 'PR.DS',
          name: 'Data Security',
          controls: [
            'PR.DS-1: Data-at-rest is protected',
            'PR.DS-2: Data-in-transit is protected',
            'PR.DS-3: Assets are formally managed throughout removal',
            'PR.DS-4: Adequate capacity to ensure availability is maintained',
            'PR.DS-5: Protections against data leaks are implemented',
            'PR.DS-6: Integrity checking mechanisms are used',
            'PR.DS-7: Development and testing environment(s) are separate',
            'PR.DS-8: Integrity checking mechanisms are used'
          ]
        }
      ]
    },
    {
      id: 'detect',
      name: 'Detect (DE)',
      icon: Eye,
      color: 'bg-yellow-500',
      description: 'Develop and implement activities to identify cybersecurity events',
      categories: [
        {
          id: 'DE.AE',
          name: 'Anomalies and Events',
          controls: [
            'DE.AE-1: A baseline of network operations is established',
            'DE.AE-2: Detected events are analyzed',
            'DE.AE-3: Event data are collected and correlated',
            'DE.AE-4: Impact of events is determined',
            'DE.AE-5: Incident alert thresholds are established'
          ]
        },
        {
          id: 'DE.CM',
          name: 'Security Continuous Monitoring',
          controls: [
            'DE.CM-1: The network is monitored to detect potential events',
            'DE.CM-2: The physical environment is monitored',
            'DE.CM-3: Personnel activity is monitored',
            'DE.CM-4: Malicious code is detected',
            'DE.CM-5: Unauthorized mobile code is detected',
            'DE.CM-6: External service provider activity is monitored',
            'DE.CM-7: Monitoring for unauthorized personnel access',
            'DE.CM-8: Vulnerability scans are performed'
          ]
        }
      ]
    },
    {
      id: 'respond',
      name: 'Respond (RS)',
      icon: RefreshCw,
      color: 'bg-orange-500',
      description: 'Develop and implement appropriate activities regarding detected cybersecurity incident',
      categories: [
        {
          id: 'RS.RP',
          name: 'Response Planning',
          controls: [
            'RS.RP-1: Response plan is executed during or after an incident'
          ]
        },
        {
          id: 'RS.CO',
          name: 'Communications',
          controls: [
            'RS.CO-1: Personnel know their roles and order of operations',
            'RS.CO-2: Incidents are reported consistent with requirements',
            'RS.CO-3: Information is shared with designated stakeholders',
            'RS.CO-4: Coordination with stakeholders occurs',
            'RS.CO-5: Voluntary information sharing occurs'
          ]
        },
        {
          id: 'RS.AN',
          name: 'Analysis',
          controls: [
            'RS.AN-1: Notifications from detection systems are investigated',
            'RS.AN-2: The impact of the incident is understood',
            'RS.AN-3: Forensics are performed',
            'RS.AN-4: Incidents are categorized',
            'RS.AN-5: Processes are established to receive analysis'
          ]
        }
      ]
    },
    {
      id: 'recover',
      name: 'Recover (RC)',
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'Develop and implement appropriate activities to maintain resilience plans',
      categories: [
        {
          id: 'RC.RP',
          name: 'Recovery Planning',
          controls: [
            'RC.RP-1: Recovery plan is executed during or after a cybersecurity incident'
          ]
        },
        {
          id: 'RC.IM',
          name: 'Improvements',
          controls: [
            'RC.IM-1: Recovery plans incorporate lessons learned',
            'RC.IM-2: Recovery strategies are updated'
          ]
        },
        {
          id: 'RC.CO',
          name: 'Communications',
          controls: [
            'RC.CO-1: Public relations are managed',
            'RC.CO-2: Reputation is repaired after an incident',
            'RC.CO-3: Recovery activities are communicated'
          ]
        }
      ]
    }
  ];

  const assessmentQuestions = {
    identify: [
      {
        id: 'asset_inventory',
        question: 'Do you maintain a comprehensive inventory of all physical devices and systems?',
        subcategory: 'ID.AM-1',
        options: [
          { value: 0, label: 'No inventory exists' },
          { value: 1, label: 'Partial inventory, manually maintained' },
          { value: 2, label: 'Comprehensive inventory, manually maintained' },
          { value: 3, label: 'Automated inventory with regular updates' }
        ]
      },
      {
        id: 'software_inventory',
        question: 'Do you maintain an inventory of software platforms and applications?',
        subcategory: 'ID.AM-2',
        options: [
          { value: 0, label: 'No software inventory' },
          { value: 1, label: 'Basic software list' },
          { value: 2, label: 'Detailed software inventory with versions' },
          { value: 3, label: 'Automated software discovery and management' }
        ]
      },
      {
        id: 'data_flows',
        question: 'Are organizational communication and data flows mapped?',
        subcategory: 'ID.AM-3',
        options: [
          { value: 0, label: 'No mapping exists' },
          { value: 1, label: 'Basic understanding of critical flows' },
          { value: 2, label: 'Documented data flow diagrams' },
          { value: 3, label: 'Comprehensive, regularly updated data flow maps' }
        ]
      }
    ],
    protect: [
      {
        id: 'access_control',
        question: 'How are user identities and credentials managed?',
        subcategory: 'PR.AC-1',
        options: [
          { value: 0, label: 'No formal identity management' },
          { value: 1, label: 'Basic user account management' },
          { value: 2, label: 'Centralized identity management system' },
          { value: 3, label: 'Advanced identity governance with automation' }
        ]
      },
      {
        id: 'mfa',
        question: 'Is multi-factor authentication implemented?',
        subcategory: 'PR.AC-7',
        options: [
          { value: 0, label: 'No MFA implemented' },
          { value: 1, label: 'MFA for some administrative accounts' },
          { value: 2, label: 'MFA for all administrative and remote access' },
          { value: 3, label: 'MFA for all users and systems' }
        ]
      }
    ],
    detect: [
      {
        id: 'monitoring',
        question: 'Is the network monitored to detect potential cybersecurity events?',
        subcategory: 'DE.CM-1',
        options: [
          { value: 0, label: 'No network monitoring' },
          { value: 1, label: 'Basic logging and alerting' },
          { value: 2, label: 'Security monitoring tools deployed' },
          { value: 3, label: 'Advanced threat detection and response' }
        ]
      }
    ],
    respond: [
      {
        id: 'incident_response',
        question: 'Do you have a documented incident response plan?',
        subcategory: 'RS.RP-1',
        options: [
          { value: 0, label: 'No formal incident response plan' },
          { value: 1, label: 'Basic incident response procedures' },
          { value: 2, label: 'Comprehensive, tested incident response plan' },
          { value: 3, label: 'Mature incident response with regular exercises' }
        ]
      }
    ],
    recover: [
      {
        id: 'recovery_planning',
        question: 'Do you have a formal recovery plan for cybersecurity incidents?',
        subcategory: 'RC.RP-1',
        options: [
          { value: 0, label: 'No recovery plan' },
          { value: 1, label: 'Basic business continuity plan' },
          { value: 2, label: 'Documented recovery procedures' },
          { value: 3, label: 'Comprehensive, tested recovery plan' }
        ]
      }
    ]
  };

  const handleAssessmentResponse = (questionId, value, subcategory) => {
    const newData = {
      ...assessmentData,
      [questionId]: { value, subcategory }
    };
    setAssessmentData(newData);
  };

  const handleSave = async (showNotification = true) => {
    const data = {
      organizationName: organizationInfo.name,
      industry: organizationInfo.industry,
      responses: assessmentData,
      maturityScores: calculateMaturityScores(),
      overallScore: calculateMaturityScore(),
      implementationTier: getMaturityLevel(calculateMaturityScore()).tier,
      recommendations: generateRecommendations(),
      completedFunctions: getCompletedFunctions()
    };

    const result = await saveAssessment(data);
    
    if (result.success) {
      setLastSaved(new Date().toISOString());
      if (showNotification) {
        // You could add a toast notification here
        console.log('Assessment saved successfully');
      }
    }
  };

  const calculateMaturityScore = () => {
    const responses = Object.values(assessmentData);
    if (responses.length === 0) return 0;
    
    const totalScore = responses.reduce((sum, response) => sum + response.value, 0);
    const maxPossibleScore = responses.length * 3;
    return Math.round((totalScore / maxPossibleScore) * 100);
  };

  const calculateMaturityScores = () => {
    const scores = {};
    
    nistFunctions.forEach(func => {
      const functionResponses = Object.entries(assessmentData)
        .filter(([_, response]) => response.subcategory.startsWith(func.id.substring(0, 2)))
        .map(([_, response]) => response.value);
      
      scores[func.id] = functionResponses.length > 0 
        ? Math.round((functionResponses.reduce((a, b) => a + b, 0) / (functionResponses.length * 3)) * 100)
        : 0;
    });
    
    return scores;
  };

  const getMaturityLevel = (score) => {
    if (score >= 80) return { level: 'Advanced', color: 'text-green-600', tier: 4 };
    if (score >= 60) return { level: 'Developing', color: 'text-blue-600', tier: 3 };
    if (score >= 40) return { level: 'Basic', color: 'text-yellow-600', tier: 2 };
    return { level: 'Initial', color: 'text-red-600', tier: 1 };
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    Object.entries(assessmentData).forEach(([questionId, response]) => {
      if (response.value < 2) {
        switch (response.subcategory) {
          case 'ID.AM-1':
            recommendations.push({
              priority: 'High',
              category: 'Asset Management',
              action: 'Implement automated asset discovery and inventory management system',
              timeframe: '30-60 days'
            });
            break;
          case 'PR.AC-7':
            recommendations.push({
              priority: 'Critical',
              category: 'Access Control',
              action: 'Deploy multi-factor authentication for all user accounts',
              timeframe: '15-30 days'
            });
            break;
          case 'DE.CM-1':
            recommendations.push({
              priority: 'High',
              category: 'Detection',
              action: 'Implement security monitoring and SIEM solution',
              timeframe: '60-90 days'
            });
            break;
        }
      }
    });

    return recommendations.slice(0, 5);
  };

  const getCompletedFunctions = () => {
    return nistFunctions
      .filter(func => {
        const questions = assessmentQuestions[func.id] || [];
        return questions.every(q => assessmentData[q.id]);
      })
      .map(func => func.id);
  };

  const renderHeader = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NIST CSF Implementation Toolkit</h1>
          <p className="text-lg text-gray-600">
            Complete implementation guide for the NIST Cybersecurity Framework
          </p>
        </div>
        
        {/* Cloud Status & Save Info */}
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            {loading ? (
              <div className="flex items-center gap-2 text-blue-600">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="text-sm">Syncing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <Cloud className="h-4 w-4" />
                <span className="text-sm">Cloud Connected</span>
              </div>
            )}
          </div>
          {lastSaved && (
            <p className="text-xs text-gray-500">
              Last saved: {new Date(lastSaved).toLocaleTimeString()}
            </p>
          )}
          <p className="text-xs text-gray-400">Session: {sessionId?.slice(-8)}</p>
        </div>
      </div>

      {/* Organization Info */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Organization Name</label>
              <input
                type="text"
                value={organizationInfo.name}
                onChange={(e) => setOrganizationInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <select
                value={organizationInfo.industry}
                onChange={(e) => setOrganizationInfo(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">Select industry</option>
                <option value="healthcare">Healthcare</option>
                <option value="financial">Financial Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="retail">Retail</option>
                <option value="government">Government</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Organization Size</label>
              <select
                value={organizationInfo.size}
                onChange={(e) => setOrganizationInfo(prev => ({ ...prev, size: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">Select size</option>
                <option value="small">Small (1-50 employees)</option>
                <option value="medium">Medium (51-500 employees)</option>
                <option value="large">Large (501+ employees)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error: {error}. Your data is being saved locally and will sync when connection is restored.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderAssessment = () => {
    const currentQuestions = assessmentQuestions[selectedFunction?.id] || [];
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              NIST CSF Maturity Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Select a function to assess your organization's maturity level:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {nistFunctions.map((func) => (
                  <Button
                    key={func.id}
                    onClick={() => setSelectedFunction(func)}
                    variant={selectedFunction?.id === func.id ? "default" : "outline"}
                    className="text-xs"
                  >
                    {func.name.split(' (')[0]}
                  </Button>
                ))}
              </div>
            </div>

            {selectedFunction && (
              <div className="space-y-6">
                <Alert>
                  <selectedFunction.icon className="h-4 w-4" />
                  <AlertDescription>
                    Assessing: <strong>{selectedFunction.name}</strong> - {selectedFunction.description}
                  </AlertDescription>
                </Alert>

                {currentQuestions.map((question) => (
                  <Card key={question.id} className="border-l-4 border-blue-500">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{question.question}</h4>
                      <p className="text-sm text-gray-500 mb-3">Control: {question.subcategory}</p>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={assessmentData[question.id]?.value === option.value}
                              onChange={() => handleAssessmentResponse(question.id, option.value, question.subcategory)}
                              className="text-blue-600"
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex gap-4">
                  <Button 
                    onClick={() => setShowResults(true)} 
                    disabled={Object.keys(assessmentData).length === 0}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Assessment Report
                  </Button>
                  <Button variant="outline" onClick={() => handleSave(true)}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Progress
                  </Button>
                  <Button variant="outline" onClick={() => setAssessmentData({})}>
                    Reset Assessment
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {showResults && Object.keys(assessmentData).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-green-600" />
                Assessment Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const overallScore = calculateMaturityScore();
                const maturityLevel = getMaturityLevel(overallScore);
                const functionScores = calculateMaturityScores();
                const recommendations = generateRecommendations();
                
                return (
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
                        <span className="text-2xl font-bold text-blue-600">{overallScore}%</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Overall Maturity: <span className={maturityLevel.color}>{maturityLevel.level}</span>
                      </h3>
                      <p className="text-gray-600">
                        Implementation Tier: {maturityLevel.tier}
                      </p>
                    </div>

                    {/* Function Scores */}
                    <div>
                      <h4 className="font-semibold mb-4">Function Maturity Breakdown</h4>
                      <div className="space-y-3">
                        {Object.entries(functionScores).map(([funcId, score]) => {
                          const func = nistFunctions.find(f => f.id === funcId);
                          return (
                            <div key={funcId}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{func?.name}</span>
                                <span className="text-sm text-gray-600">{score}%</span>
                              </div>
                              <Progress value={score} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold mb-4">Priority Recommendations</h4>
                      <div className="space-y-3">
                        {recommendations.map((rec, idx) => (
                          <div key={idx} className="border-l-4 border-orange-500 pl-4 py-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                rec.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                rec.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {rec.priority}
                              </span>
                              <span className="text-sm font-medium">{rec.category}</span>
                            </div>
                            <p className="text-sm text-gray-700">{rec.action}</p>
                            <p className="text-xs text-gray-500">Target completion: {rec.timeframe}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={() => generateReport({ organizationName: organizationInfo.name })}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Full Report
                      </Button>
                      <Button variant="outline" onClick={() => handleSave(true)}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Results
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Navigation and other render methods remain the same...
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {renderHeader()}

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => {setCurrentView('overview'); setSelectedFunction(null);}}
              variant={currentView === 'overview' ? 'default' : 'outline'}
            >
              Overview
            </Button>
            <Button
              onClick={() => setCurrentView('assessment')}
              variant={currentView === 'assessment' ? 'default' : 'outline'}
            >
              Maturity Assessment
            </Button>
            <Button
              onClick={() => setCurrentView('controls')}
              variant={currentView === 'controls' ? 'default' : 'outline'}
            >
              Controls Browser
            </Button>
            <Button
              onClick={() => setCurrentView('implementation')}
              variant={currentView === 'implementation' ? 'default' : 'outline'}
            >
              Implementation Guide
            </Button>
          </div>
        </div>

        {/* Content */}
        {currentView === 'assessment' && renderAssessment()}
        {/* Other views remain the same... */}
      </div>
    </div>
  );
};

export default NISTCSFToolkit;