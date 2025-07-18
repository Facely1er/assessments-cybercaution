// src/pages/tools/SecurityTraining.tsx
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Shield, 
  Users, 
  Calendar, 
  AlertTriangle,
  Mail,
  Target,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Settings,
  PlayCircle,
  Globe,
  Lock,
  User,
  Building,
  ArrowRight,
  RefreshCw,
  Download,
  Eye,
  Edit3,
  Trash2,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Plus,
  Save,
  Send,
  TestTube,
  MousePointer,
  Link,
  Code,
  Zap,
  Sun,
  Moon,
  Loader2,
  WifiOff,
  CheckCircle2
} from 'lucide-react';

// ToolTemplate Component - Matching your provided template
const ToolTemplate = ({
  title,
  description,
  icon,
  toolId,
  children,
  showConnectionStatus = true,
  isLoading = false,
  error = null
}) => {
  const [theme, setTheme] = useState('light');
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    message: 'Checking connection...',
    lastChecked: new Date()
  });

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('cybercaution-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Mock connection check for demo
    if (showConnectionStatus) {
      checkConnection();
    }

    const interval = setInterval(() => {
      if (showConnectionStatus) {
        checkConnection();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [showConnectionStatus]);

  const checkConnection = async () => {
    // Mock connection check
    setTimeout(() => {
      setConnectionStatus({
        isConnected: true,
        message: 'Connected to database',
        lastChecked: new Date()
      });
    }, 1000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cybercaution-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const formatLastChecked = (date) => {
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
    </div>
  );
};

// Main Training Platform Component
const TrainingPlatformContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);
  const [showTrainingAssignment, setShowTrainingAssignment] = useState(false);

  // Sample data structures
  const trainingMetrics = {
    totalAssigned: 347,
    completed: 298,
    inProgress: 49,
    overdue: 12,
    averageScore: 87,
    completionRate: 86
  };

  const phishingMetrics = {
    activeCampaigns: 3,
    totalSent: 1250,
    clickRate: 15.2,
    reportRate: 45.8,
    trainingAssigned: 190,
    riskReduction: 72
  };

  const renderOverviewDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Learners</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{trainingMetrics.totalAssigned}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% this month
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{trainingMetrics.completionRate}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{trainingMetrics.completed} completed</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phishing Click Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{phishingMetrics.clickRate}%</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                -8% improvement
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Mail className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Risk Reduction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{phishingMetrics.riskReduction}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Since implementation</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Training Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Chen completed Phishing Recognition</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Score: 92% • 10 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">45 users assigned Data Protection training</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Triggered by policy update • 2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">12 users have overdue training</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Reminder sent • 3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Phishing Campaign Performance</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Q1 2025 Security Awareness</p>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Click rate: 15.1%
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Report rate: 45.9%
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => {
              setActiveTab('overview');
              setActiveSubTab('dashboard');
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('training');
              setActiveSubTab('automation');
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'training'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Training Orchestrator
          </button>
          <button
            onClick={() => {
              setActiveTab('phishing');
              setActiveSubTab('campaigns');
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'phishing'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Phishing Simulator
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverviewDashboard()}
      
      {activeTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Training Orchestrator</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automated training assignment based on security events, policy updates, and compliance requirements.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === 'phishing' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Phishing Simulation Platform</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage phishing simulation campaigns with automated training assignment for users who click.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Main SecurityTraining Component
const SecurityTraining: React.FC = () => {
  return (
    <ToolTemplate
      title="Training & Awareness Platform"
      description="Security awareness training orchestration and phishing simulation platform"
      icon={<GraduationCap className="w-8 h-8 text-blue-600" />}
      toolId="training-awareness-platform"
      showConnectionStatus={true}
      isLoading={false}
      error={null}
    >
      <TrainingPlatformContent />
    </ToolTemplate>
  );
};

// Export both named and default
export { SecurityTraining };
export default SecurityTraining;