// src/components/layout/ToolLayout.tsx
import React, { useState, useMemo } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  Moon, 
  Sun, 
  Home,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
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
import { toolRoutes, getToolsByCategory } from '../../routes/toolRoutes';

export const ToolLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  
  // Group tools by category
  const groupedTools = useMemo(() => {
    const categories = {
      integration: { name: 'Integration Hub', icon: Network },
      orchestration: { name: 'Workflow Orchestration', icon: Workflow },
      governance: { name: 'Governance & Compliance', icon: Shield },
      analytics: { name: 'Analytics & Intelligence', icon: BarChart3 },
      training: { name: 'Security Training', icon: Users },
      assessment: { name: 'Assessment & Benchmarking', icon: Calculator }
    };

    return Object.entries(categories).map(([categoryKey, categoryInfo]) => ({
      key: categoryKey,
      name: categoryInfo.name,
      icon: categoryInfo.icon,
      tools: getToolsByCategory(categoryKey)
    })).filter(category => category.tools.length > 0);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleCategory = (categoryKey: string) => {
    setOpenCategory(openCategory === categoryKey ? null : categoryKey);
  };

  return (
    <div className="relative flex h-full">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-10 w-64 h-full transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0 flex flex-col`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* All Tools link */}
            <li>
              <Link
                to="/tools"
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive('/tools')
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Home className={`w-5 h-5 ${isActive('/tools') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className="ml-3">All Tools</span>
              </Link>
            </li>

            {/* Category groups */}
            {groupedTools.map((category) => {
              const CategoryIcon = category.icon;
              const isOpen = openCategory === category.key;
              
              return (
                <li key={category.key}>
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(category.key)}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CategoryIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="flex-1 ml-3 text-left">{category.name}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {/* Tools submenu */}
                  {isOpen && (
                    <ul className="mt-2 space-y-1">
                      {category.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const active = isActive(tool.path);
                        
                        return (
                          <li key={tool.path}>
                            <Link
                              to={tool.path}
                              className={`flex items-center p-2 pl-8 rounded-lg transition-colors ${
                                active
                                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <ToolIcon className={`w-4 h-4 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                              <span className="ml-3 text-sm">{tool.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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