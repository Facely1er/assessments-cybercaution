import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  FileText, AlertTriangle, Shield, Users, Clock, 
  Database, Lock, Key, Mail, CreditCard, ArrowLeft,
  ExternalLink, Play, Pause, RotateCcw, ChevronRight,
  AlertCircle, Info, Eye, Settings, BookOpen, Flag,
  Loader2, WifiOff, Wifi, X, Plus, Save, Timer,
  Building, User, Calendar, Target, Activity, Phone, Download
} from 'lucide-react';

const IncidentResponsePlaybooks = () => {
  // Core State
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [organizationName, setOrganizationName] = useState('');
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentSeverity, setIncidentSeverity] = useState('Medium');
  const [responseTeamLead, setResponseTeamLead] = useState('');
  
  // System State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [sessionId] = useState(() => `ir_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [lastSaved, setLastSaved] = useState(null);
  const [incidentStartTime, setIncidentStartTime] = useState(new Date());
  const [activeIncidentId, setActiveIncidentId] = useState(null);
  
  // Timing State
  const [stepTimers, setStepTimers] = useState({});
  const [phaseStartTimes, setPhaseStartTimes] = useState({});
  
  // Playbook definitions
  const getPlaybooks = () => [
    {
      id: 'initial-detection',
      title: 'Initial Ransomware Detection',
      description: 'First response actions when ransomware is suspected or detected',
      framework: 'NIST SP 800-61 Phase 1-2',
      priority: 'Critical',
      estimatedTime: '15-30 minutes',
      icon: AlertTriangle,
      color: 'red',
      phases: [
        {
          id: 'detection',
          title: 'Detection & Analysis',
          description: 'Confirm and assess the ransomware incident',
          estimatedTime: '5-10 minutes'
        },
        {
          id: 'containment',
          title: 'Immediate Containment',
          description: 'Isolate affected systems to prevent spread',
          estimatedTime: '10-15 minutes'
        },
        {
          id: 'notification',
          title: 'Initial Notification',
          description: 'Alert key stakeholders and law enforcement',
          estimatedTime: '5-10 minutes'
        }
      ]
    },
    {
      id: 'containment-eradication',
      title: 'Containment & Eradication',
      description: 'Stop ransomware spread and remove malicious presence',
      framework: 'NIST SP 800-61 Phase 2',
      priority: 'High',
      estimatedTime: '2-6 hours',
      icon: Shield,
      color: 'orange',
      phases: [
        {
          id: 'network-isolation',
          title: 'Network Isolation',
          description: 'Segment networks and isolate compromised systems',
          estimatedTime: '30-60 minutes'
        },
        {
          id: 'threat-hunting',
          title: 'Threat Hunting',
          description: 'Identify all affected systems and persistence mechanisms',
          estimatedTime: '1-3 hours'
        },
        {
          id: 'malware-removal',
          title: 'Malware Removal',
          description: 'Remove ransomware and associated malware',
          estimatedTime: '1-2 hours'
        }
      ]
    },
    {
      id: 'recovery-operations',
      title: 'Recovery Operations',
      description: 'Restore systems and resume business operations',
      framework: 'NIST SP 800-61 Phase 3',
      priority: 'Medium',
      estimatedTime: '4-24 hours',
      icon: Database,
      color: 'blue',
      phases: [
        {
          id: 'backup-restoration',
          title: 'Backup Restoration',
          description: 'Restore systems from clean backups',
          estimatedTime: '2-12 hours'
        },
        {
          id: 'system-hardening',
          title: 'System Hardening',
          description: 'Apply security improvements before reconnection',
          estimatedTime: '1-4 hours'
        },
        {
          id: 'validation',
          title: 'Validation & Testing',
          description: 'Verify system integrity and functionality',
          estimatedTime: '1-8 hours'
        }
      ]
    },
    {
      id: 'lessons-learned',
      title: 'Post-Incident Activities',
      description: 'Document lessons learned and improve defenses',
      framework: 'NIST SP 800-61 Phase 4',
      priority: 'Medium',
      estimatedTime: '2-4 hours',
      icon: BookOpen,
      color: 'green',
      phases: [
        {
          id: 'documentation',
          title: 'Incident Documentation',
          description: 'Compile comprehensive incident report',
          estimatedTime: '1-2 hours'
        },
        {
          id: 'lessons-learned',
          title: 'Lessons Learned',
          description: 'Conduct post-incident review meeting',
          estimatedTime: '1 hour'
        },
        {
          id: 'improvements',
          title: 'Security Improvements',
          description: 'Implement recommended security enhancements',
          estimatedTime: '1+ hours'
        }
      ]
    }
  ];

  // Initialize component
  useEffect(() => {
    initializeApp();
    return () => {
      // Cleanup any timers or subscriptions
    };
  }, []);

  const initializeApp = async () => {
    try {
      await testConnection();
      await loadExistingSession();
      setupAutoSave();
    } catch (err) {
      console.error('Initialization failed:', err);
      setError('Failed to initialize incident response system');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setConnectionStatus('connecting');
      
      const { data, error } = await supabase
        .from('incident_response_sessions')
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
        .from('incident_response_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        setOrganizationName(data.organization_name || '');
        setIncidentTitle(data.incident_title || '');
        setIncidentSeverity(data.incident_severity || 'Medium');
        setResponseTeamLead(data.response_team_lead || '');
        setActiveIncidentId(data.active_incident_id);
        if (data.incident_start_time) {
          setIncidentStartTime(new Date(data.incident_start_time));
        }
        
        // Load completed steps
        await loadCompletedSteps();
      }
    } catch (err) {
      console.log('No existing session found, will create new one');
    }
  };

  const loadCompletedSteps = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      const { data, error } = await supabase
        .from('incident_response_steps')
        .select('step_id')
        .eq('session_id', sessionId)
        .eq('completed', true);

      if (data) {
        setCompletedSteps(new Set(data.map(step => step.step_id)));
      }
    } catch (err) {
      console.error('Failed to load completed steps:', err);
    }
  };

  const saveSessionData = async () => {
    if (connectionStatus !== 'connected') return;
    
    try {
      setSaving(true);
      
      const sessionData = {
        session_id: sessionId,
        organization_name: organizationName,
        incident_title: incidentTitle,
        incident_severity: incidentSeverity,
        response_team_lead: responseTeamLead,
        active_incident_id: activeIncidentId,
        incident_start_time: incidentStartTime.toISOString(),
        selected_playbook_id: selectedPlaybook?.id,
        current_phase: currentPhase,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('incident_response_sessions')
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

  const markStepComplete = async (stepId) => {
    const newCompletedSteps = new Set([...completedSteps, stepId]);
    setCompletedSteps(newCompletedSteps);
    
    if (connectionStatus === 'connected') {
      try {
        const stepData = {
          session_id: sessionId,
          incident_id: activeIncidentId,
          step_id: stepId,
          playbook_id: selectedPlaybook?.id,
          phase_id: selectedPlaybook?.phases[currentPhase]?.id,
          completed: true,
          completed_at: new Date().toISOString(),
          completion_time_seconds: stepTimers[stepId] || 0
        };

        await supabase
          .from('incident_response_steps')
          .upsert(stepData);
          
        await trackAnalytics('step_completed', { 
          stepId, 
          playbookId: selectedPlaybook?.id,
          phaseId: selectedPlaybook?.phases[currentPhase]?.id 
        });
      } catch (err) {
        console.error('Failed to save step completion:', err);
      }
    }
  };

  const startIncident = async () => {
    if (!incidentTitle.trim()) {
      setError('Please provide an incident title');
      return;
    }

    try {
      const incidentId = `inc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const incidentData = {
        incident_id: incidentId,
        session_id: sessionId,
        title: incidentTitle,
        severity: incidentSeverity,
        organization_name: organizationName,
        response_team_lead: responseTeamLead,
        status: 'active',
        start_time: new Date().toISOString()
      };

      if (connectionStatus === 'connected') {
        await supabase
          .from('incident_response_incidents')
          .insert(incidentData);
      }
      
      setActiveIncidentId(incidentId);
      setIncidentStartTime(new Date());
      await saveSessionData();
      await trackAnalytics('incident_started', incidentData);
    } catch (err) {
      console.error('Failed to start incident:', err);
      setError('Failed to start incident tracking');
    }
  };

  const trackAnalytics = async (action, data = {}) => {
    if (connectionStatus !== 'connected') return;
    
    try {
      await supabase
        .from('incident_response_analytics')
        .insert({
          session_id: sessionId,
          incident_id: activeIncidentId,
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

  const exportIncidentReport = async () => {
    try {
      const reportData = {
        incident_id: activeIncidentId,
        session_id: sessionId,
        organization_name: organizationName,
        incident_title: incidentTitle,
        incident_severity: incidentSeverity,
        response_team_lead: responseTeamLead,
        start_time: incidentStartTime.toISOString(),
        generated_at: new Date().toISOString(),
        playbook_used: selectedPlaybook?.title,
        current_phase: selectedPlaybook?.phases[currentPhase]?.title,
        completed_steps: Array.from(completedSteps),
        total_steps: selectedPlaybook ? getPlaybookSteps(selectedPlaybook.id, selectedPlaybook.phases[currentPhase].id).length : 0,
        completion_percentage: getProgressPercent()
      };

      const reportContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([reportContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `incident_report_${incidentTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      await trackAnalytics('report_exported', reportData);
    } catch (err) {
      console.error('Failed to export report:', err);
      setError('Failed to export incident report');
    }
  };

  const getPlaybookSteps = (playbookId, phaseId) => {
    const stepMap = {
      'initial-detection': {
        'detection': [
          {
            id: 'verify-incident',
            title: 'Verify Ransomware Incident',
            description: 'Confirm the presence of ransomware through indicators',
            priority: 'Critical',
            timeLimit: '2 minutes',
            checklist: [
              'Check for ransom notes or encrypted file extensions',
              'Verify unusual file encryption activity',
              'Confirm system performance degradation',
              'Check security alerts and monitoring systems'
            ],
            frameworks: ['NIST IR 8374 2.6.1'],
            tools: ['SIEM', 'EDR', 'File System Monitoring']
          },
          {
            id: 'assess-scope',
            title: 'Assess Incident Scope',
            description: 'Determine the extent of the ransomware infection',
            priority: 'Critical',
            timeLimit: '5 minutes',
            checklist: [
              'Identify number of affected systems',
              'Determine data types that may be compromised',
              'Assess business process impact',
              'Evaluate potential data exfiltration'
            ],
            frameworks: ['NIST SP 800-61'],
            tools: ['Network Monitoring', 'Asset Management']
          },
          {
            id: 'classify-incident',
            title: 'Classify Incident Severity',
            description: 'Determine incident classification and response level',
            priority: 'High',
            timeLimit: '3 minutes',
            checklist: [
              'Assign incident severity level (1-4)',
              'Determine required response team size',
              'Assess regulatory notification requirements',
              'Evaluate business continuity impact'
            ],
            frameworks: ['NIST SP 800-61'],
            tools: ['Incident Classification Matrix']
          }
        ],
        'containment': [
          {
            id: 'isolate-systems',
            title: 'Isolate Affected Systems',
            description: 'Immediately disconnect compromised systems from network',
            priority: 'Critical',
            timeLimit: '2 minutes',
            checklist: [
              'Physically disconnect network cables if necessary',
              'Disable wireless connections',
              'Isolate at network switch/router level',
              'Maintain system power to preserve evidence'
            ],
            frameworks: ['NIST IR 8374 2.3.5'],
            tools: ['Network Management', 'Switch Configuration']
          },
          {
            id: 'preserve-evidence',
            title: 'Preserve Digital Evidence',
            description: 'Secure systems for forensic analysis',
            priority: 'High',
            timeLimit: '10 minutes',
            checklist: [
              'Image system memory (RAM dump)',
              'Document system state and visible indicators',
              'Photograph ransom notes and screens',
              'Secure log files and artifacts'
            ],
            frameworks: ['NIST SP 800-86'],
            tools: ['Memory Imaging Tools', 'Digital Cameras']
          },
          {
            id: 'backup-protection',
            title: 'Protect Backup Systems',
            description: 'Secure backup infrastructure from compromise',
            priority: 'Critical',
            timeLimit: '5 minutes',
            checklist: [
              'Verify backup system integrity',
              'Isolate backup networks if necessary',
              'Check for lateral movement to backup systems',
              'Secure offline/air-gapped backups'
            ],
            frameworks: ['NIST IR 8374 2.6.2'],
            tools: ['Backup Management', 'Network Segmentation']
          }
        ],
        'notification': [
          {
            id: 'notify-team',
            title: 'Notify Incident Response Team',
            description: 'Alert all required incident response personnel',
            priority: 'Critical',
            timeLimit: '3 minutes',
            checklist: [
              'Contact IR team lead',
              'Notify technical specialists',
              'Alert management and legal counsel',
              'Activate communication channels'
            ],
            frameworks: ['NIST SP 800-61'],
            tools: ['Emergency Contact Lists', 'Secure Communications']
          },
          {
            id: 'law-enforcement',
            title: 'Consider Law Enforcement Notification',
            description: 'Evaluate need for law enforcement involvement',
            priority: 'Medium',
            timeLimit: '5 minutes',
            checklist: [
              'Contact local FBI cyber division if significant impact',
              'Report to IC3.gov for documentation',
              'Coordinate with legal counsel',
              'Document decision rationale'
            ],
            frameworks: ['FBI Ransomware Guidance'],
            tools: ['Legal Contacts', 'FBI Cyber Division']
          },
          {
            id: 'stakeholder-update',
            title: 'Initial Stakeholder Update',
            description: 'Provide initial situation report to key stakeholders',
            priority: 'Medium',
            timeLimit: '5 minutes',
            checklist: [
              'Brief executive leadership on situation',
              'Notify affected business units',
              'Coordinate with communications team',
              'Establish regular update schedule'
            ],
            frameworks: ['NIST SP 800-61'],
            tools: ['Stakeholder Contact Lists', 'Situation Report Templates']
          }
        ]
      }
    };

    return stepMap[playbookId]?.[phaseId] || [];
  };

  const getProgressPercent = () => {
    if (!selectedPlaybook) return 0;
    const totalSteps = selectedPlaybook.phases.reduce((total, phase) => {
      return total + getPlaybookSteps(selectedPlaybook.id, phase.id).length;
    }, 0);
    const completedCount = Array.from(completedSteps).length;
    return Math.round((completedCount / totalSteps) * 100);
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const PlaybookCard = ({ playbook }) => (
    <Card 
      className={`border-2 hover:border-${playbook.color}-200 transition-colors cursor-pointer`}
      onClick={() => {
        setSelectedPlaybook(playbook);
        setCurrentPhase(0);
        trackAnalytics('playbook_selected', { playbookId: playbook.id });
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-${playbook.color}-100 rounded-lg`}>
              <playbook.icon className={`h-6 w-6 text-${playbook.color}-600`} />
            </div>
            <div>
              <CardTitle className="text-lg">{playbook.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded bg-${playbook.color}-100 text-${playbook.color}-700`}>
                  {playbook.priority}
                </span>
                <span className="text-xs text-gray-500">{playbook.framework}</span>
              </div>
            </div>
          </div>
          <Clock className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3">{playbook.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Estimated: {playbook.estimatedTime}</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );

  const PlaybookDetail = ({ playbook }) => {
    const currentPhaseData = playbook.phases[currentPhase];
    const steps = getPlaybookSteps(playbook.id, currentPhaseData.id);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setSelectedPlaybook(null)}>
              ← Back to Playbooks
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{playbook.title}</h2>
              <p className="text-gray-600">{playbook.framework}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-2xl font-bold text-emerald-600">
              {getProgressPercent()}%
            </div>
          </div>
        </div>

        {/* Phase Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Incident Response Phases</h3>
              <span className="text-sm text-gray-500">
                Phase {currentPhase + 1} of {playbook.phases.length}
              </span>
            </div>
            <div className="flex space-x-2">
              {playbook.phases.map((phase, index) => (
                <Button
                  key={phase.id}
                  variant={currentPhase === index ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setCurrentPhase(index);
                    trackAnalytics('phase_changed', { phaseId: phase.id, playbookId: playbook.id });
                  }}
                  className="flex-1"
                >
                  {phase.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Phase Steps */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Flag className="h-5 w-5 text-emerald-600" />
                  <span>{currentPhaseData.title}</span>
                </CardTitle>
                <p className="text-gray-600 mt-1">{currentPhaseData.description}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Estimated Time</div>
                <div className="font-semibold">{currentPhaseData.estimatedTime}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {steps.map((step, stepIndex) => (
                <Card key={step.id} className="border-l-4 border-l-emerald-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-700">
                              Step {stepIndex + 1}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded border ${
                              step.priority === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
                              step.priority === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                              'bg-blue-100 text-blue-700 border-blue-200'
                            }`}>
                              {step.priority}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            <Timer className="h-3 w-3 inline mr-1" />
                            {step.timeLimit}
                          </div>
                        </div>
                        <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{step.description}</p>

                        {/* Checklist */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Action Items:</h5>
                          {step.checklist.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start space-x-2">
                              <div className="w-4 h-4 border border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Framework References */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {step.frameworks.join(', ')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Settings className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                Tools: {step.tools.join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={completedSteps.has(step.id) ? 'secondary' : 'default'}
                        onClick={() => markStepComplete(step.id)}
                        className="ml-4"
                        disabled={completedSteps.has(step.id)}
                      >
                        {completedSteps.has(step.id) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          'Complete'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Phase Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
                disabled={currentPhase === 0}
              >
                Previous Phase
              </Button>
              <Button
                onClick={() => setCurrentPhase(Math.min(playbook.phases.length - 1, currentPhase + 1))}
                disabled={currentPhase === playbook.phases.length - 1}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Next Phase
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const IncidentSetup = () => (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <AlertTriangle className="h-5 w-5" />
          <span>Incident Setup</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Incident Title *
            </label>
            <input
              type="text"
              value={incidentTitle}
              onChange={(e) => setIncidentTitle(e.target.value)}
              placeholder="e.g., Ransomware Attack - Production Systems"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Incident Severity
            </label>
            <select
              value={incidentSeverity}
              onChange={(e) => setIncidentSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Response Team Lead
            </label>
            <input
              type="text"
              value={responseTeamLead}
              onChange={(e) => setResponseTeamLead(e.target.value)}
              placeholder="Team lead name"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Organization
            </label>
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Organization name"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={startIncident}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!incidentTitle.trim()}
          >
            <Play className="h-4 w-4 mr-2" />
            Start Incident Response
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PlaybookOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ransomware Response Playbooks</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pre-built incident response procedures based on NIST SP 800-61 framework 
          and NIST IR 8374 ransomware guidance
        </p>
      </div>

      {/* Incident Setup */}
      {!activeIncidentId && <IncidentSetup />}

      {/* Active Incident Status */}
      {activeIncidentId && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">Active Incident: {incidentTitle}</h4>
                  <div className="flex items-center space-x-4 text-sm text-green-800 mt-1">
                    <span>Severity: {incidentSeverity}</span>
                    <span>Lead: {responseTeamLead}</span>
                    <span>Started: {incidentStartTime.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={exportIncidentReport}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Reference */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">NIST SP 800-61 Incident Response Process</h4>
              <p className="text-blue-800 text-sm mt-1">
                These playbooks follow the four-phase incident response lifecycle: 
                Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-2 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-900">
            <Phone className="h-5 w-5" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold text-red-900">Law Enforcement</div>
              <div className="text-sm text-red-800">FBI Cyber Division: Local Field Office</div>
              <div className="text-sm text-red-800">IC3.gov for reporting</div>
            </div>
            <div>
              <div className="font-semibold text-red-900">CISA</div>
              <div className="text-sm text-red-800">Report: us-cert.cisa.gov</div>
              <div className="text-sm text-red-800">Phone: 1-888-282-0870</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Playbook Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {getPlaybooks().map((playbook) => (
          <PlaybookCard key={playbook.id} playbook={playbook} />
        ))}
      </div>

      {/* Download Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Downloadable Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Incident Report Template
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Contact List Template
            </Button>
            <Button variant="outline" className="justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              NIST SP 800-61 Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Initializing Incident Response System...</p>
          <p className="text-sm text-gray-500 mt-2">Session: {sessionId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Toolkit Button */}
        <Link to="/toolkit" className="inline-flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Incident Response Playbooks</h1>
            <p className="text-gray-600">NIST-based ransomware response procedures with real-time tracking</p>
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

        {/* Main Content */}
        {selectedPlaybook ? (
          <PlaybookDetail playbook={selectedPlaybook} />
        ) : (
          <PlaybookOverview />
        )}

        {/* Session Info */}
        <Card className="bg-gray-50 border-gray-200 mt-6">
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

export default IncidentResponsePlaybooks;