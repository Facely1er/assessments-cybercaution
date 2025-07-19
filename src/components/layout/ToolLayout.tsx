// src/components/layout/ToolLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  Moon, 
  Sun, 
  Home,
  ChevronLeft,
  Network,
  Workflow,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  GitBranch,
  Database,
  Zap,
  Activity,
  FileText,
  CheckCircle,
  Gauge,
  ClipboardCheck,
  Brain,
  TrendingUp,
  BookOpen,
  Eye,
  UserCheck,
  Calculator,
  Building2,
  Globe,
  Server
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { toolRoutes, ToolRoute } from '../../routes/toolRoutes';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
  category?: string;
}

export const ToolLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  // Sidebar items - individual tools for easy navigation
  const sidebarItems: SidebarItem[] = [
    { name: 'All Tools', path: '/tools', icon: Home },
    // Integration Hub Tools
    { name: 'Integration Manager', path: '/tools/integration-manager', icon: Network, category: 'integration' },
    { name: 'API Connector Studio', path: '/tools/api-connector', icon: GitBranch, category: 'integration' },
    { name: 'Data Normalization Engine', path: '/tools/data-normalization-engine', icon: Database, category: 'integration' },
    // Workflow Orchestration Tools
    { name: 'Security Workflow Designer', path: '/tools/workflow-designer', icon: Workflow, category: 'orchestration' },
    { name: 'Playbook Automation Engine', path: '/tools/playbook-automation', icon: Zap, category: 'orchestration' },
    { name: 'Orchestration Dashboard', path: '/tools/orchestration-dashboard', icon: Activity, category: 'orchestration' },
    // Governance & Compliance Tools
    { name: 'Policy Orchestrator', path: '/tools/policy-orchestrator', icon: FileText, category: 'governance' },
    { name: 'Compliance Mapping Engine', path: '/tools/compliance-mapper', icon: CheckCircle, category: 'governance' },
    { name: 'Governance Framework', path: '/tools/governance-framework', icon: Shield, category: 'governance' },
    { name: 'Governance Scorecard', path: '/tools/governance-scorecard', icon: Gauge, category: 'governance' },
    { name: 'Audit Automation Suite', path: '/tools/audit-automation', icon: ClipboardCheck, category: 'governance' },
    // Analytics & Intelligence Tools  
    { name: 'Unified Security Analytics', path: '/tools/unified-analytics', icon: BarChart3, category: 'analytics' },
    { name: 'Threat Correlation Engine', path: '/tools/threat-correlation', icon: Brain, category: 'analytics' },
    { name: 'Risk Score Aggregator', path: '/tools/risk-aggregator', icon: TrendingUp, category: 'analytics' },
    { name: 'Analytics Overlay', path: '/tools/analytics-overlay', icon: BarChart3, category: 'analytics' },
    { name: 'Executive Reporting Suite', path: '/tools/executive-reporting', icon: FileText, category: 'analytics' },
    // Training Tools
    { name: 'Training Orchestrator', path: '/tools/training-orchestrator', icon: BookOpen, category: 'training' },
    { name: 'Security Training Platform', path: '/tools/security-training', icon: Users, category: 'training' },
    { name: 'Phishing Simulation Platform', path: '/tools/phishing-simulator', icon: Eye, category: 'training' },
    { name: 'Role-Based Training Engine', path: '/tools/role-based-training', icon: UserCheck, category: 'training' },
    // Assessment & Benchmarking Tools
    { name: 'Security Maturity Assessment', path: '/tools/maturity-assessment', icon: Shield, category: 'assessment' },
    { name: 'Gap Analysis Engine', path: '/tools/gap-analysis', icon: Calculator, category: 'assessment' },
    { name: 'VendorIQ Enterprise Platform', path: '/tools/vendor-assessment', icon: Building2, category: 'assessment' },
    { name: 'Vendor Security Scorecard', path: '/tools/vendor-security-scorecard', icon: Building2, category: 'assessment' },
    { name: 'Industry Threat Profiler', path: '/tools/industry-threat-profiler', icon: Globe, category: 'assessment' },
    { name: 'Asset Manager', path: '/tools/asset-manager', icon: Server, category: 'governance' },
    { name: 'Recovery Time Calculator', path: '/tools/recovery-time-calculator', icon: Calculator, category: 'assessment' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative flex h-full">
      {/* Sidebar */}
      <aside
        className={`absolute top-0 left-0 z-10 w-64 h-full transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className="ml-3">{item.name}</span>
                    {item.category && (
                      <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {item.category}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/support"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HelpCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="ml-3">Help & Support</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="ml-3">Settings</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronLeft className="w-4 h-4 text-gray-400 transform rotate-180" />
                  <Link
                    to="/tools"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Tools
                  </Link>
                </div>
              </li>
              {location.pathname !== '/tools' && (
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronLeft className="w-4 h-4 text-gray-400 transform rotate-180" />
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                      {toolRoutes.find(tool => tool.path === location.pathname)?.name || 'Tool'}
                    </span>
                  </div>
                </li>
              )}
            </ol>
          </nav>

          {/* Page Content */}
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Add default export as well for flexibility
export default ToolLayout;