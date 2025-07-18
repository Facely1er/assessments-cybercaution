import React, { useState } from 'react';
import { 
  GitBranch, 
  Play, 
  Pause, 
  Settings, 
  Zap, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Activity,
  ChevronRight,
  Plus,
  Edit3,
  Copy,
  Trash2,
  Filter,
  Search,
  Download
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'notification';
  name: string;
  description: string;
  status?: 'active' | 'inactive' | 'processing';
  icon: React.ReactNode;
}

interface PlaybookTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  steps: number;
  automationLevel: 'full' | 'partial' | 'manual';
  lastUsed?: string;
}

const WorkflowOrchestrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'playbooks' | 'rules' | 'triggers'>('builder');
  const [selectedPlaybook, setSelectedPlaybook] = useState<string | null>(null);

  const workflowSteps: WorkflowStep[] = [
    {
      id: '1',
      type: 'trigger',
      name: 'Security Alert Detected',
      description: 'SIEM detects suspicious login activity',
      status: 'active',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: '2',
      type: 'condition',
      name: 'Severity Check',
      description: 'If severity >= High AND source = external',
      status: 'processing',
      icon: <Filter className="w-5 h-5" />
    },
    {
      id: '3',
      type: 'action',
      name: 'Isolate Endpoint',
      description: 'EDR isolates affected endpoint',
      status: 'inactive',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: '4',
      type: 'notification',
      name: 'Alert Security Team',
      description: 'Send alert to on-call security analyst',
      status: 'inactive',
      icon: <Users className="w-5 h-5" />
    }
  ];

  const playbookTemplates: PlaybookTemplate[] = [
    {
      id: '1',
      name: 'Phishing Response Automation',
      category: 'Email Security',
      description: 'Automated response to reported phishing emails including analysis, containment, and remediation',
      steps: 8,
      automationLevel: 'full',
      lastUsed: '2 hours ago'
    },
    {
      id: '2',
      name: 'Ransomware Containment',
      category: 'Malware',
      description: 'Rapid isolation and containment procedures for ransomware detection',
      steps: 12,
      automationLevel: 'partial',
      lastUsed: '1 day ago'
    },
    {
      id: '3',
      name: 'Suspicious Login Investigation',
      category: 'Identity & Access',
      description: 'Investigate and respond to anomalous authentication events',
      steps: 6,
      automationLevel: 'full',
      lastUsed: '3 hours ago'
    },
    {
      id: '4',
      name: 'Data Exfiltration Response',
      category: 'Data Protection',
      description: 'Detect and respond to potential data exfiltration attempts',
      steps: 10,
      automationLevel: 'partial',
      lastUsed: '5 days ago'
    }
  ];

  const automationRules = [
    {
      name: 'Auto-Isolate Critical Threats',
      description: 'Automatically isolate endpoints when critical malware is detected',
      enabled: true,
      lastTriggered: '45 minutes ago',
      triggerCount: 23
    },
    {
      name: 'Block Suspicious IPs',
      description: 'Add IPs to firewall block list based on threat intelligence feeds',
      enabled: true,
      lastTriggered: '2 hours ago',
      triggerCount: 156
    },
    {
      name: 'Password Reset on Compromise',
      description: 'Force password reset when account compromise is detected',
      enabled: false,
      lastTriggered: '3 days ago',
      triggerCount: 8
    }
  ];

  const triggerTypes = [
    { type: 'SIEM Alert', count: 145, icon: <Activity className="w-5 h-5 text-blue-500" /> },
    { type: 'EDR Detection', count: 89, icon: <Shield className="w-5 h-5 text-purple-500" /> },
    { type: 'Threat Intel Feed', count: 234, icon: <Zap className="w-5 h-5 text-yellow-500" /> },
    { type: 'Manual Trigger', count: 12, icon: <Users className="w-5 h-5 text-green-500" /> }
  ];

  const renderWorkflowBuilder = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Visual Workflow Builder</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Workflow
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 min-h-[400px]">
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`
                  flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-sm border-2 
                  ${step.status === 'active' ? 'border-green-500' : 
                    step.status === 'processing' ? 'border-yellow-500' : 'border-gray-200'}
                  hover:shadow-md transition-all cursor-pointer flex-1
                `}>
                  <div className={`
                    p-2 rounded-lg
                    ${step.type === 'trigger' ? 'bg-blue-100 text-blue-600' :
                      step.type === 'condition' ? 'bg-purple-100 text-purple-600' :
                      step.type === 'action' ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'}
                  `}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.name}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit3 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Settings className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Execution Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Running</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Workflows</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Executions Today</span>
              <span className="font-medium">847</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg Response Time</span>
              <span className="font-medium text-green-600">1.2s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-medium">99.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-2">Time Saved</h4>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">42.5 hrs</div>
            <div className="text-sm text-gray-600">This week through automation</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaybooks = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Playbook Templates</h3>
            <p className="text-sm text-gray-600 mt-1">Pre-built automation workflows for common security scenarios</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search playbooks..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Playbook
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playbookTemplates.map((playbook) => (
            <div
              key={playbook.id}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all
                ${selectedPlaybook === playbook.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => setSelectedPlaybook(playbook.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{playbook.name}</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
                    {playbook.category}
                  </span>
                </div>
                <div className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${playbook.automationLevel === 'full' ? 'bg-green-100 text-green-700' :
                    playbook.automationLevel === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'}
                `}>
                  {playbook.automationLevel === 'full' ? 'Fully Automated' :
                   playbook.automationLevel === 'partial' ? 'Semi-Automated' : 'Manual'}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{playbook.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{playbook.steps} steps</span>
                {playbook.lastUsed && (
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {playbook.lastUsed}
                  </span>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                  <Copy className="w-3 h-3" />
                  Clone
                </button>
                <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                  <Play className="w-3 h-3" />
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Integration Support</h4>
        <p className="text-blue-800 text-sm mb-4">
          All playbooks seamlessly integrate with your connected security tools through our Integration Hub.
        </p>
        <div className="flex flex-wrap gap-2">
          {['SIEM', 'SOAR', 'EDR', 'XDR', 'Email Security', 'Firewall', 'Identity Provider'].map((tool) => (
            <span key={tool} className="bg-white px-3 py-1 rounded-full text-sm text-blue-700 border border-blue-200">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAutomationRules = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Automation Rules Engine</h3>
            <p className="text-sm text-gray-600 mt-1">Configure automated responses based on conditions and thresholds</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Rule
          </button>
        </div>

        <div className="space-y-4">
          {automationRules.map((rule, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{rule.name}</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={rule.enabled}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Last triggered: {rule.lastTriggered}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {rule.triggerCount} executions
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Rule Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Rules</span>
              <span className="font-medium">{automationRules.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Rules</span>
              <span className="font-medium text-green-600">
                {automationRules.filter(r => r.enabled).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <span className="font-medium">0.8s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">False Positive Rate</span>
              <span className="font-medium text-green-600">2.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Rule Categories</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Threat Response</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Access Control</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Data Protection</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm font-medium">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTriggers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Trigger Configuration</h3>
            <p className="text-sm text-gray-600 mt-1">Configure events that initiate automated workflows</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Configure Trigger
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {triggerTypes.map((trigger, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {trigger.icon}
                  <h4 className="font-medium text-gray-900">{trigger.type}</h4>
                </div>
                <span className="text-2xl font-bold text-gray-900">{trigger.count}</span>
              </div>
              <div className="text-sm text-gray-600">Active triggers this week</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(trigger.count / 250) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Recent Trigger Events</h4>
          <div className="space-y-3">
            {[
              { time: '10:23 AM', trigger: 'SIEM Alert', action: 'Phishing Response Playbook', status: 'success' },
              { time: '10:15 AM', trigger: 'EDR Detection', action: 'Endpoint Isolation', status: 'success' },
              { time: '09:47 AM', trigger: 'Threat Intel Feed', action: 'IP Block List Update', status: 'processing' },
              { time: '09:30 AM', trigger: 'Manual Trigger', action: 'Security Scan', status: 'success' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{event.time}</span>
                  <span className="font-medium text-gray-900">{event.trigger}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{event.action}</span>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${event.status === 'success' ? 'bg-green-100 text-green-700' :
                    event.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'}
                `}>
                  {event.status === 'success' ? 'Completed' :
                   event.status === 'processing' ? 'Processing' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <h4 className="font-medium text-green-900 mb-1">Integration Benefits</h4>
            <p className="text-green-800 text-sm">
              All triggers seamlessly connect with your existing security tools through our Integration Hub, 
              ensuring no alerts are missed and enabling comprehensive automated response across your entire security stack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <GitBranch className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workflow Orchestrator</h1>
            <p className="text-gray-600 mt-1">Automate security operations and incident response</p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="font-medium text-gray-900">Rapid Response</h3>
          </div>
          <p className="text-sm text-gray-600">Reduce incident response time from hours to seconds</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium text-gray-900">Consistent Security</h3>
          </div>
          <p className="text-sm text-gray-600">Ensure standardized response across all incidents</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-medium text-gray-900">Improved Efficiency</h3>
          </div>
          <p className="text-sm text-gray-600">Free up security team for strategic initiatives</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-purple-500" />
            <h3 className="font-medium text-gray-900">24/7 Operations</h3>
          </div>
          <p className="text-sm text-gray-600">Automated response even outside business hours</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {(['builder', 'playbooks', 'rules', 'triggers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm capitalize
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab === 'builder' ? 'Workflow Builder' : tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'builder' && renderWorkflowBuilder()}
        {activeTab === 'playbooks' && renderPlaybooks()}
        {activeTab === 'rules' && renderAutomationRules()}
        {activeTab === 'triggers' && renderTriggers()}
      </div>
    </div>
  );
};

export default WorkflowOrchestrator;