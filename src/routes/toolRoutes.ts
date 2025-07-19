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
  Puzzle,
  Building2,
  Calculator,
  TrendingUp,
  Network,
  FileText,
  CheckCircle,
  Gauge,
  ClipboardCheck,
  UserCheck,
  Search,
  Globe,
  Server,
  HardDrive
} from 'lucide-react';

export interface ToolRoute {
  id: string;
  name: string;
  path: string;
  description: string;
  category: 'integration' | 'orchestration' | 'governance' | 'analytics' | 'training' | 'assessment';
  features: string[];
  icon: React.ComponentType<any>;
  isPremium?: boolean;
  bgColorClass?: string;
  iconColorClass?: string;
}

export const toolRoutes: ToolRoute[] = [
  // Integration Hub Tools
  {
    id: 'integration-manager',
    name: 'Integration Manager',
    path: '/tools/integration-manager',
    description: 'Connect SIEM, EDR, vulnerability scanners, and other security tools into a unified platform',
    category: 'integration',
    features: ['Multi-tool connectivity', 'Real-time sync', 'API management', 'Data normalization'],
    icon: Link2,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'api-connector',
    name: 'API Connector Studio',
    path: '/tools/api-connector',
    description: 'Build custom integrations with your security tools using our visual API builder',
    category: 'integration',
    features: ['Visual API builder', 'Custom connectors', 'Testing framework', 'Documentation'],
    icon: GitBranch,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'data-normalization-engine',
    name: 'Data Normalization Engine',
    path: '/tools/data-normalization-engine',
    description: 'Advanced data normalization and transformation engine',
    category: 'integration',
    features: ['Advanced normalization', 'Real-time processing', 'Custom rules', 'Batch operations'],
    icon: Database,
    bgColorClass: 'from-purple-500 to-purple-600',
    iconColorClass: 'text-white'
  },

  // Workflow Orchestration Tools
  {
    id: 'workflow-designer',
    name: 'Security Workflow Designer',
    path: '/tools/workflow-designer',
    description: 'Visual workflow builder for automated incident response and security operations',
    category: 'orchestration',
    features: ['Visual workflow builder', 'Drag-drop interface', 'Template library', 'Testing framework'],
    icon: Workflow,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'workflow-orchestrator',
    name: 'Workflow Orchestrator',
    path: '/tools/workflow-orchestrator',
    description: 'Advanced workflow orchestration and automation engine',
    category: 'orchestration',
    features: ['Complex workflows', 'Conditional logic', 'Parallel execution', 'Error handling'],
    icon: Workflow,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'playbook-automation',
    name: 'Playbook Automation Engine',
    path: '/tools/playbook-automation',
    description: 'Pre-built and customizable security playbooks aligned with NIST incident response',
    category: 'orchestration',
    features: ['NIST-aligned playbooks', 'Custom procedures', 'Automated execution', 'Progress tracking'],
    icon: Zap,
    bgColorClass: 'from-amber-500 to-amber-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'orchestration-dashboard',
    name: 'Orchestration Dashboard',
    path: '/tools/orchestration-dashboard',
    description: 'Real-time monitoring and control of automated security workflows',
    category: 'orchestration',
    features: ['Real-time monitoring', 'Workflow control', 'Performance metrics', 'Alert management'],
    icon: Activity,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },

  // Governance & Compliance Tools
  {
    id: 'policy-orchestrator',
    name: 'Policy Orchestrator',
    path: '/tools/policy-orchestrator',
    description: 'Centralized policy creation, distribution, and enforcement across your organization',
    category: 'governance',
    features: ['Policy templates', 'Distribution management', 'Compliance tracking', 'Version control'],
    icon: FileText,
    bgColorClass: 'from-teal-500 to-teal-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'governance-framework',
    name: 'Governance Framework',
    path: '/tools/governance-framework',
    description: 'Comprehensive governance framework for security policy management',
    category: 'governance',
    features: ['Framework templates', 'Policy hierarchy', 'Governance workflows', 'Audit trails'],
    icon: Shield,
    bgColorClass: 'from-teal-500 to-teal-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'compliance-mapper',
    name: 'Compliance Mapping Engine',
    path: '/tools/compliance-mapper',
    description: 'Map controls across NIST, ISO, SOC2, HIPAA, and other frameworks',
    category: 'governance',
    features: ['Framework mapping', 'Gap analysis', 'Control correlation', 'Compliance reports'],
    icon: CheckCircle,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'governance-scorecard',
    name: 'Governance Scorecard',
    path: '/tools/governance-scorecard',
    description: 'Track policy adherence and compliance metrics across your security program',
    category: 'governance',
    features: ['Compliance scoring', 'Trend analysis', 'Risk metrics', 'Executive dashboards'],
    icon: Gauge,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'audit-automation',
    name: 'Audit Automation Suite',
    path: '/tools/audit-automation',
    description: 'Automated evidence collection and audit preparation across integrated tools',
    category: 'governance',
    features: ['Evidence collection', 'Audit preparation', 'Report generation', 'Compliance validation'],
    icon: ClipboardCheck,
    bgColorClass: 'from-pink-500 to-pink-600',
    iconColorClass: 'text-white'
  },

  // Analytics & Intelligence Tools
  {
    id: 'unified-analytics',
    name: 'Unified Security Analytics',
    path: '/tools/unified-analytics',
    description: 'Cross-platform analytics dashboard aggregating data from all integrated tools',
    category: 'analytics',
    features: ['Cross-platform analytics', 'Custom dashboards', 'Real-time monitoring', 'Trend analysis'],
    icon: BarChart3,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'analytics-overlay',
    name: 'Analytics Overlay',
    path: '/tools/analytics-overlay',
    description: 'Advanced analytics overlay for comprehensive security intelligence',
    category: 'analytics',
    features: ['Advanced analytics', 'Machine learning', 'Predictive insights', 'Custom metrics'],
    icon: BarChart3,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'threat-correlation',
    name: 'Threat Correlation Engine',
    path: '/tools/threat-correlation',
    description: 'AI-powered correlation of threats across multiple security data sources',
    category: 'analytics',
    features: ['AI-powered correlation', 'Multi-source analysis', 'Pattern recognition', 'Threat hunting'],
    icon: Brain,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'risk-aggregator',
    name: 'Risk Score Aggregator',
    path: '/tools/risk-aggregator',
    description: 'Consolidated risk scoring across vulnerabilities, threats, and compliance gaps',
    category: 'analytics',
    features: ['Risk scoring', 'Multi-factor analysis', 'Risk visualization', 'Priority ranking'],
    icon: TrendingUp,
    bgColorClass: 'from-amber-500 to-amber-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'executive-reporting',
    name: 'Executive Reporting Suite',
    path: '/tools/executive-reporting',
    description: 'Automated board-ready reports with data from all integrated security tools',
    category: 'analytics',
    features: ['Executive reports', 'Board presentations', 'Automated generation', 'Custom branding'],
    icon: FileText,
    bgColorClass: 'from-purple-500 to-purple-600',
    iconColorClass: 'text-white'
  },

  // Training Tools
  {
    id: 'training-orchestrator',
    name: 'Training Orchestrator',
    path: '/tools/training-orchestrator',
    description: 'Automated security awareness training triggered by security events and policy changes',
    category: 'training',
    features: ['Automated training', 'Event-triggered', 'Progress tracking', 'Compliance reporting'],
    icon: BookOpen,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'security-training',
    name: 'Security Training Platform',
    path: '/tools/security-training',
    description: 'Comprehensive security training and awareness platform',
    category: 'training',
    features: ['Training modules', 'Awareness campaigns', 'Simulation exercises', 'Certification tracking'],
    icon: Users,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'phishing-simulator',
    name: 'Phishing Simulation Platform',
    path: '/tools/phishing-simulator',
    description: 'Integrated phishing tests with automated training for failed attempts',
    category: 'training',
    features: ['Phishing simulations', 'Automated training', 'Campaign management', 'Performance analytics'],
    icon: Eye,
    bgColorClass: 'from-orange-500 to-orange-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'role-based-training',
    name: 'Role-Based Training Engine',
    path: '/tools/role-based-training',
    description: 'Customized security training paths based on job roles and access levels',
    category: 'training',
    features: ['Role-based content', 'Customized paths', 'Skills assessment', 'Progress tracking'],
    icon: UserCheck,
    bgColorClass: 'from-teal-500 to-teal-600',
    iconColorClass: 'text-white'
  },

  // Assessment & Benchmarking Tools
  {
    id: 'maturity-assessment',
    name: 'Security Maturity Assessment',
    path: '/tools/maturity-assessment',
    description: 'NIST CSF-aligned maturity assessment with industry benchmarking',
    category: 'assessment',
    features: ['NIST CSF alignment', 'Maturity scoring', 'Industry benchmarks', 'Improvement roadmaps'],
    icon: Shield,
    bgColorClass: 'from-green-500 to-green-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'gap-analysis',
    name: 'Gap Analysis Engine',
    path: '/tools/gap-analysis',
    description: 'Automated gap identification across technical controls and governance',
    category: 'assessment',
    features: ['Gap identification', 'Control mapping', 'Risk assessment', 'Remediation planning'],
    icon: Calculator,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'vendor-assessment',
    name: 'Vendor Risk Assessment',
    path: '/tools/vendor-assessment',
    description: 'Third-party risk assessment integrated with your vendor management systems',
    category: 'assessment',
    features: ['Vendor scoring', 'Risk assessment', 'Compliance tracking', 'Relationship management'],
    icon: Building2,
    bgColorClass: 'from-pink-500 to-pink-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'vendor-security-scorecard',
    name: 'Vendor Security Scorecard',
    path: '/tools/vendor-security-scorecard',
    description: 'Comprehensive vendor security assessment and scoring platform',
    category: 'assessment',
    features: ['Security scorecards', 'Risk ratings', 'Assessment workflows', 'Vendor comparison'],
    icon: Building2,
    bgColorClass: 'from-pink-500 to-pink-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'industry-threat-profiler',
    name: 'Industry Threat Profiler',
    path: '/tools/industry-threat-profiler',
    description: 'Industry-specific threat intelligence and risk profiling',
    category: 'analytics',
    features: ['Industry analysis', 'Threat profiling', 'Risk benchmarking', 'Sector intelligence'],
    icon: Globe,
    bgColorClass: 'from-indigo-500 to-indigo-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'asset-manager',
    name: 'Asset Manager',
    path: '/tools/asset-manager',
    description: 'Comprehensive asset inventory and management platform',
    category: 'governance',
    features: ['Asset inventory', 'Configuration tracking', 'Vulnerability correlation', 'Risk assessment'],
    icon: Server,
    bgColorClass: 'from-blue-500 to-blue-600',
    iconColorClass: 'text-white'
  },
  {
    id: 'recovery-time-calculator',
    name: 'Recovery Time Calculator',
    path: '/tools/recovery-time-calculator',
    description: 'Calculate and optimize business recovery time objectives',
    category: 'assessment',
    features: ['RTO calculation', 'RPO analysis', 'Business impact', 'Recovery planning'],
    icon: Calculator,
    bgColorClass: 'from-green-500 to-green-600',
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