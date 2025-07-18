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
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { toolRoutes } from '../../routes';

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

  const sidebarItems: SidebarItem[] = [
    { name: 'All Tools', path: '/tools', icon: Home },
    { name: 'Integration Hub', path: '/tools/integration-hub', icon: Network, category: 'integration' },
    { name: 'Workflow Orchestrator', path: '/tools/workflow-orchestrator', icon: Workflow, category: 'orchestration' },
    { name: 'Governance Framework', path: '/tools/governance-framework', icon: Shield, category: 'governance' },
    { name: 'Analytics Overlay', path: '/tools/analytics-overlay', icon: BarChart3, category: 'analytics' },
    { name: 'Security Training', path: '/tools/security-training', icon: Users, category: 'training' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center ml-2 lg:ml-0">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ml-2">
                  CyberCaution
                </span>
              </Link>
              <span className="hidden lg:inline-flex items-center ml-3 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full">
                Security Orchestration Platform
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link
                to="/dashboard"
                className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
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
      <div className="lg:ml-64">
        <main className="pt-20 px-4 sm:px-6 lg:px-8 py-8">
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