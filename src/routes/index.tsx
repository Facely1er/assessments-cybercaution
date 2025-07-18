// src/routes/index.tsx
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Shield, Network, FileSearch, Workflow, Users, BarChart3 } from 'lucide-react';

// Route types
export interface ToolRoute {
  id: string;
  path: string;
  name: string;
  description: string;
  category: 'integration' | 'orchestration' | 'governance' | 'analytics' | 'training';
  icon: React.ElementType;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  features: string[];
  isPremium?: boolean;
}

export interface RouteConfig {
  tools: ToolRoute[];
  assessments: RouteObject[];
  main: RouteObject[];
  auth: RouteObject[];
}

// Tool routes configuration
export const toolRoutes: ToolRoute[] = [
  {
    id: 'integration-manager',
    path: '/tools/integration-manager',
    name: 'Integration Manager',
    description: 'Connect and unify your existing security tools into a single orchestration platform',
    category: 'integration',
    icon: Network,
    component: React.lazy(() => import('../pages/tools/IntegrationManager')),
    features: [
      'SIEM/SOAR integration',
      'EDR/XDR connectivity',
      'API management',
      'Real-time data sync'
    ]
  },
  {
    id: 'workflow-orchestrator',
    path: '/tools/workflow-orchestrator',
    name: 'Workflow Orchestrator',
    description: 'Automate security operations with intelligent workflow design and execution',
    category: 'orchestration',
    icon: Workflow,
    component: React.lazy(() => import('../pages/tools/WorkflowOrchestrator')),
    features: [
      'Visual workflow builder',
      'Automated incident response',
      'Playbook execution',
      'Custom trigger rules'
    ]
  },
  {
    id: 'governance-framework',
    path: '/tools/governance-framework',
    name: 'Governance Framework',
    description: 'Comprehensive policy and compliance management aligned with industry standards',
    category: 'governance',
    icon: Shield,
    component: React.lazy(() => import('../pages/tools/GovernanceFramework')),
    features: [
      'Policy lifecycle management',
      'Compliance tracking',
      'Risk assessment',
      'Audit trail'
    ]
  },
  {
    id: 'analytics-overlay',
    path: '/tools/analytics-overlay',
    name: 'Analytics Overlay',
    description: 'Aggregate and analyze data from all connected security tools in one dashboard',
    category: 'analytics',
    icon: BarChart3,
    component: React.lazy(() => import('../pages/tools/AnalyticsOverlay')),
    features: [
      'Unified metrics dashboard',
      'Threat correlation',
      'Predictive analytics',
      'Custom reporting'
    ]
  },
  {
    id: 'security-training',
    path: '/tools/security-training',
    name: 'Security Training',
    description: 'Human-centric security awareness integrated with technical controls',
    category: 'training',
    icon: Users,
    component: React.lazy(() => import('../pages/tools/SecurityTraining')),
    features: [
      'Role-based training paths',
      'Phishing simulations',
      'Progress tracking',
      'Certification management'
    ]
  }
];

// Legacy route mappings
export const legacyRouteMappings: Record<string, string> = {
  '/tools/predictive-analytics': '/tools/analytics-overlay',
  '/tools/dark-web-monitor': '/tools/analytics-overlay',
  '/tools/vendor-iq-enhanced': '/tools/governance-framework',
  '/tools/vendor-scorecard': '/tools/governance-framework',
  '/tools/industry-threats': '/tools/analytics-overlay',
  '/tools/compliance-gap-checker': '/tools/governance-framework',
  '/tools/nist-csf-wizard': '/tools/governance-framework',
  '/tools/policy-generator': '/tools/governance-framework',
  '/tools/business-impact': '/tools/analytics-overlay',
  '/tools/recovery-time-calculator': '/tools/workflow-orchestrator',
  '/tools/backup-integrity-validator': '/tools/workflow-orchestrator',
  '/tools/incident-orchestrator': '/tools/workflow-orchestrator',
  '/tools/threat-correlation': '/tools/analytics-overlay',
  '/tools/compliance-mapper': '/tools/governance-framework',
  '/tools/vendor-assessment': '/tools/governance-framework',
  '/tools/gap-analysis': '/tools/governance-framework',
  '/tools/unified-analytics': '/tools/analytics-overlay',
  '/tools/playbook-automation': '/tools/workflow-orchestrator',
  '/tools/workflow-designer': '/tools/workflow-orchestrator',
  '/tools/risk-aggregator': '/tools/analytics-overlay',
  '/tools/policy-orchestrator': '/tools/governance-framework'
};

// Assessment routes
export const assessmentRoutes = [
  {
    id: 'ransomware',
    name: 'Ransomware Readiness',
    basePath: '/ransomware',
    routes: ['assessment', 'results', 'recommendations']
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Security',
    basePath: '/supply-chain',
    routes: ['assessment', 'results', 'recommendations']
  },
  {
    id: 'zero-trust',
    name: 'Zero Trust Maturity',
    basePath: '/zero-trust-maturity',
    routes: ['assessment', 'results']
  },
  {
    id: 'network-segmentation',
    name: 'Network Segmentation',
    basePath: '/network-segmentation',
    routes: ['assessment', 'results']
  },
  {
    id: 'backup-readiness',
    name: 'Backup Readiness',
    basePath: '/backup-readiness',
    routes: ['assessment', 'results']
  },
  {
    id: 'incident-response',
    name: 'Incident Response Plan',
    basePath: '/incident-response',
    routes: ['plan-assessment', 'results']
  },
  {
    id: 'vulnerability-management',
    name: 'Vulnerability Management',
    basePath: '/vulnerability-management',
    routes: ['assessment', 'results']
  }
];

// Main navigation routes
export const mainNavigationRoutes = [
  { path: '/', name: 'Home' },
  { path: '/features', name: 'Features' },
  { path: '/solutions', name: 'Solutions' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/resources', name: 'Resources' },
  { path: '/tools', name: 'Tools', hasDropdown: true },
  { path: '/assessments', name: 'Assessments', hasDropdown: true }
];

// Helper functions
export const getToolByPath = (path: string): ToolRoute | undefined => {
  return toolRoutes.find(tool => tool.path === path);
};

export const getToolsByCategory = (category: string): ToolRoute[] => {
  return toolRoutes.filter(tool => tool.category === category);
};

export const isProtectedRoute = (path: string): boolean => {
  const protectedPaths = ['/dashboard', '/tools', '/assessments'];
  return protectedPaths.some(protectedPath => path.startsWith(protectedPath));
};