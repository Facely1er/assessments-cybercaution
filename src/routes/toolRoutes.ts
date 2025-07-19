// src/routes/toolRoutes.ts
import { 
  Link2, 
  Shield, 
  Workflow, 
  BarChart3, 
  Users,
  Database,
  Cloud,
  Lock,
  FileSearch,
  Zap,
  GitBranch,
  Settings,
  Eye,
  AlertCircle,
  BookOpen,
  Target,
  Brain,
  Layers,
  Activity,
  Puzzle
} from 'lucide-react';

export interface ToolRoute {
  id: string;
  name: string;
  path: string;
  description: string;
  category: 'integration' | 'orchestration' | 'governance' | 'analytics' | 'training';
  features: string[];
  icon: React.ComponentType<any>;
  isPremium?: boolean;
  bgColorClass?: string;
  iconColorClass?: string;
}

export const toolRoutes: ToolRoute[] = [
  // Integration Tools
  {
    id: 'siem-connector',
    name: 'SIEM Connector',
    path: '/tools/siem-connector',
    description: 'Unified integration for Splunk, QRadar, and Sentinel',
    category: 'integration',
    features: ['Real-time sync', 'Bi-directional data flow', 'Custom field mapping', 'Alert correlation'],
    icon: Database,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'edr-orchestrator',
    name: 'EDR Orchestrator',
    path: '/tools/edr-orchestrator',
    description: 'Connect CrowdStrike, SentinelOne, and Carbon Black',
    category: 'integration',
    features: ['Unified endpoint view', 'Cross-platform response', 'Threat hunting', 'IOC distribution'],
    icon: Shield,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white',
    isPremium: true
  },
  {
    id: 'cloud-security-hub',
    name: 'Cloud Security Hub',
    path: '/tools/cloud-security-hub',
    description: 'Multi-cloud security integration (AWS, Azure, GCP)',
    category: 'integration',
    features: ['CSPM integration', 'CWPP connectors', 'Cloud asset inventory', 'Compliance mapping'],
    icon: Cloud,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'api-gateway',
    name: 'Universal API Gateway',
    path: '/tools/api-gateway',
    description: 'RESTful API integration for any security tool',
    category: 'integration',
    features: ['Custom connectors', 'Rate limiting', 'Authentication', 'Webhook support'],
    icon: Link2,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },

  // Orchestration Tools
  {
    id: 'incident-workflow',
    name: 'Incident Workflow Engine',
    path: '/tools/incident-workflow',
    description: 'Automated incident response and escalation',
    category: 'orchestration',
    features: ['Visual workflow builder', 'Conditional logic', 'Auto-remediation', 'Approval flows'],
    icon: Workflow,
    bgColorClass: 'from-purple-500 to-purple-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'threat-response',
    name: 'Threat Response Automation',
    path: '/tools/threat-response',
    description: 'Coordinate responses across security stack',
    category: 'orchestration',
    features: ['Playbook templates', 'Cross-tool actions', 'Response tracking', 'Rollback capability'],
    icon: Zap,
    bgColorClass: 'from-purple-500 to-purple-600',
    iconColorClass: 'text-white',
    isPremium: true
  },
  {
    id: 'soar-playbooks',
    name: 'SOAR Playbook Manager',
    path: '/tools/soar-playbooks',
    description: 'Create and manage security orchestration playbooks',
    category: 'orchestration',
    features: ['Drag-drop designer', 'Version control', 'Testing framework', 'Performance metrics'],
    icon: GitBranch,
    bgColorClass: 'from-purple-500 to-purple-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'alert-orchestrator',
    name: 'Alert Orchestration',
    path: '/tools/alert-orchestrator',
    description: 'Intelligent alert routing and prioritization',
    category: 'orchestration',
    features: ['ML-based triage', 'Deduplication', 'Context enrichment', 'Smart routing'],
    icon: AlertCircle,
    bgColorClass: 'from-purple-500 to-purple-600',
    iconColorClass: 'text-white'
  },

  // Governance Tools
  {
    id: 'policy-engine',
    name: 'Policy Enforcement Engine',
    path: '/tools/policy-engine',
    description: 'Centralized security policy management',
    category: 'governance',
    features: ['Policy templates', 'Compliance mapping', 'Exception handling', 'Audit trails'],
    icon: Lock,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'compliance-tracker',
    name: 'Compliance Tracker',
    path: '/tools/compliance-tracker',
    description: 'Track adherence to SOC2, ISO27001, NIST',
    category: 'governance',
    features: ['Framework mapping', 'Gap analysis', 'Evidence collection', 'Report generation'],
    icon: FileSearch,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white',
    isPremium: true
  },
  {
    id: 'access-governance',
    name: 'Access Governance Suite',
    path: '/tools/access-governance',
    description: 'Unified access control and privilege management',
    category: 'governance',
    features: ['Role mining', 'Access reviews', 'Segregation of duties', 'Privilege analytics'],
    icon: Settings,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'risk-manager',
    name: 'Risk Assessment Manager',
    path: '/tools/risk-manager',
    description: 'Continuous risk scoring and management',
    category: 'governance',
    features: ['Risk scoring', 'Threat modeling', 'Control mapping', 'Risk reporting'],
    icon: Target,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },

  // Analytics Tools
  {
    id: 'security-dashboard',
    name: 'Unified Security Dashboard',
    path: '/tools/security-dashboard',
    description: 'Executive-level security metrics and KPIs',
    category: 'analytics',
    features: ['Custom widgets', 'Real-time metrics', 'Trend analysis', 'Export capabilities'],
    icon: BarChart3,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence Aggregator',
    path: '/tools/threat-intelligence',
    description: 'Correlate threats across all security tools',
    category: 'analytics',
    features: ['IOC correlation', 'Threat feeds', 'Attack patterns', 'Predictive analytics'],
    icon: Eye,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white',
    isPremium: true
  },
  {
    id: 'performance-analytics',
    name: 'Security Performance Analytics',
    path: '/tools/performance-analytics',
    description: 'Measure security tool effectiveness and ROI',
    category: 'analytics',
    features: ['Tool benchmarking', 'ROI calculation', 'Coverage analysis', 'Optimization tips'],
    icon: Activity,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'behavioral-analytics',
    name: 'Behavioral Analytics Engine',
    path: '/tools/behavioral-analytics',
    description: 'ML-powered anomaly detection across tools',
    category: 'analytics',
    features: ['Baseline learning', 'Anomaly detection', 'Pattern recognition', 'Predictive alerts'],
    icon: Brain,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white'
  },

  // Training Tools
  {
    id: 'phishing-simulator',
    name: 'Phishing Simulation Platform',
    path: '/tools/phishing-simulator',
    description: 'Integrated with email security tools',
    category: 'training',
    features: ['Campaign management', 'Click tracking', 'Training modules', 'Progress reporting'],
    icon: Users,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'security-awareness',
    name: 'Security Awareness Hub',
    path: '/tools/security-awareness',
    description: 'Role-based security training aligned with tools',
    category: 'training',
    features: ['Custom curricula', 'Interactive content', 'Completion tracking', 'Compliance reporting'],
    icon: BookOpen,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'incident-drill',
    name: 'Incident Response Drills',
    path: '/tools/incident-drill',
    description: 'Tabletop exercises using real tool data',
    category: 'training',
    features: ['Scenario library', 'Live tool integration', 'Performance scoring', 'After-action reports'],
    icon: Layers,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white',
    isPremium: true
  },
  {
    id: 'skill-assessment',
    name: 'Security Skills Assessment',
    path: '/tools/skill-assessment',
    description: 'Measure team proficiency with security tools',
    category: 'training',
    features: ['Skill mapping', 'Gap analysis', 'Certification tracking', 'Learning paths'],
    icon: Puzzle,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white'
  }
];

export const getToolsByCategory = (category: string): ToolRoute[] => {
  if (category === 'all') return toolRoutes;
  return toolRoutes.filter(tool => tool.category === category);
};

export const getToolById = (id: string): ToolRoute | undefined => {
  return toolRoutes.find(tool => tool.id === id);
};

export const getToolByPath = (path: string): ToolRoute | undefined => {
  return toolRoutes.find(tool => tool.path === path);
};

export const getPremiumTools = (): ToolRoute[] => {
  return toolRoutes.filter(tool => tool.isPremium);
};

export const searchTools = (query: string): ToolRoute[] => {
  const lowerQuery = query.toLowerCase();
  return toolRoutes.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.features.some(feature => feature.toLowerCase().includes(lowerQuery))
  );
};