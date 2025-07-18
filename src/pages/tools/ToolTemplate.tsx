// src/pages/tools/ToolTemplate.tsx

import React, { ReactNode, useEffect, useState } from 'react';
import { Sun, Moon, Loader2, AlertCircle, CheckCircle2, WifiOff } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface ToolTemplateProps {
  title: string;
  description: string;
  icon: ReactNode;
  toolId: string;
  children: ReactNode;
  showConnectionStatus?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

interface ConnectionStatus {
  isConnected: boolean;
  message: string;
  lastChecked: Date;
}

const ToolTemplate: React.FC<ToolTemplateProps> = ({
  title,
  description,
  icon,
  toolId,
  children,
  showConnectionStatus = true,
  isLoading = false,
  error = null
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Checking connection...',
    lastChecked: new Date()
  });

  // Initialize Supabase client
  const supabase = createClient(
    process.env.VITE_APP_SUPABASE_URL || '',
    process.env.VITE_APP_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('cybercaution-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Check Supabase connection
    if (showConnectionStatus) {
      checkSupabaseConnection();
    }

    // Set up connection check interval
    const interval = setInterval(() => {
      if (showConnectionStatus) {
        checkSupabaseConnection();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [showConnectionStatus]);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('_test_connection').select('count').single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found" which is fine
        setConnectionStatus({
          isConnected: false,
          message: 'Database connection failed',
          lastChecked: new Date()
        });
      } else {
        setConnectionStatus({
          isConnected: true,
          message: 'Connected to database',
          lastChecked: new Date()
        });
      }
    } catch (err) {
      setConnectionStatus({
        isConnected: false,
        message: 'Unable to connect to database',
        lastChecked: new Date()
      });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cybercaution-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const formatLastChecked = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              {showConnectionStatus && (
                <div className="flex items-center space-x-2 text-sm">
                  {connectionStatus.isConnected ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {connectionStatus.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {connectionStatus.message}
                      </span>
                    </>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    ({formatLastChecked(connectionStatus.lastChecked)})
                  </span>
                </div>
              )}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Loading {title.toLowerCase()}...
            </p>
          </div>
        ) : (
          /* Tool Content */
          <div className="animate-fadeIn">
            {children}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Tool ID: {toolId}</span>
            <span>© 2024 CyberCaution - Security Orchestration & Governance Platform</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ToolTemplate;