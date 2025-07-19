// src/pages/resources/ResourceTemplate.tsx

import React, { ReactNode, useEffect, useState } from 'react';
import { 
  Sun, 
  Moon, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  WifiOff,
  BookOpen,
  Download,
  Share2,
  Bookmark,
  Clock,
  User,
  Tag,
  ChevronRight,
  Menu,
  X,
  Search,
  Filter,
  FileText,
  CheckSquare,
  AlertTriangle,
  Info
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface ResourceTemplateProps {
  title: string;
  description: string;
  category: 'guide' | 'checklist' | 'framework' | 'template' | 'whitepaper' | 'policy';
  resourceId: string;
  author?: string;
  lastUpdated?: string;
  readTime?: string;
  tags?: string[];
  children: ReactNode;
  showConnectionStatus?: boolean;
  isLoading?: boolean;
  error?: string | null;
  tableOfContents?: TOCItem[];
  relatedResources?: RelatedResource[];
  downloadable?: boolean;
  downloadUrl?: string;
  complianceFrameworks?: string[];
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

interface RelatedResource {
  id: string;
  title: string;
  type: string;
  url: string;
}

interface ConnectionStatus {
  isConnected: boolean;
  message: string;
  lastChecked: Date;
}

const ResourceTemplate: React.FC<ResourceTemplateProps> = ({
  title,
  description,
  category,
  resourceId,
  author = 'CyberCaution Team',
  lastUpdated,
  readTime,
  tags = [],
  children,
  showConnectionStatus = true,
  isLoading = false,
  error = null,
  tableOfContents = [],
  relatedResources = [],
  downloadable = false,
  downloadUrl,
  complianceFrameworks = []
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Checking connection...',
    lastChecked: new Date()
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Initialize Supabase client
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || '',
    process.env.REACT_APP_SUPABASE_ANON_KEY || ''
  );

  // Category icons mapping
  const categoryIcons = {
    guide: <BookOpen className="h-6 w-6" />,
    checklist: <CheckSquare className="h-6 w-6" />,
    framework: <FileText className="h-6 w-6" />,
    template: <FileText className="h-6 w-6" />,
    whitepaper: <FileText className="h-6 w-6" />,
    policy: <AlertTriangle className="h-6 w-6" />
  };

  // Category colors mapping
  const categoryColors = {
    guide: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    checklist: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    framework: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    template: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
    whitepaper: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
    policy: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  };

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('cybercaution-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Check if resource is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('cybercaution-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(resourceId));

    // Check Supabase connection
    if (showConnectionStatus) {
      checkSupabaseConnection();
    }

    // Set up connection check interval
    const interval = setInterval(() => {
      if (showConnectionStatus) {
        checkSupabaseConnection();
      }
    }, 30000);

    // Track active section on scroll
    const handleScroll = () => {
      const sections = tableOfContents.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showConnectionStatus, resourceId, tableOfContents]);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('_test_connection').select('count').single();
      
      if (error && error.code !== 'PGRST116') {
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

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('cybercaution-bookmarks') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== resourceId);
      localStorage.setItem('cybercaution-bookmarks', JSON.stringify(updated));
    } else {
      bookmarks.push(resourceId);
      localStorage.setItem('cybercaution-bookmarks', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowMobileMenu(false);
    }
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

  const renderTOC = (items: TOCItem[], level = 0) => {
    return items.map(item => (
      <div key={item.id} style={{ marginLeft: `${level * 16}px` }}>
        <button
          onClick={() => scrollToSection(item.id)}
          className={`block w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
            activeSection === item.id
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          {item.title}
        </button>
        {item.children && renderTOC(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${categoryColors[category]}`}>
                  {categoryIcons[category]}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                      {title}
                    </h1>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[category]}`}>
                      {category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 hidden sm:block">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

              {/* Connection Status - Hidden on mobile */}
              {showConnectionStatus && (
                <div className="hidden lg:flex items-center space-x-2 text-sm">
                  {connectionStatus.isConnected ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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

          {/* Search Bar */}
          {showSearch && (
            <div className="pb-4 animate-slideDown">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search within this resource..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">Table of Contents</h2>
            </div>
            <div className="p-4 overflow-y-auto max-h-screen">
              {renderTOC(tableOfContents)}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
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
              Loading resource...
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                {/* Resource Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resource Info</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4 mr-2" />
                      <span>{author}</span>
                    </div>
                    
                    {lastUpdated && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{lastUpdated}</span>
                      </div>
                    )}
                    
                    {readTime && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{readTime} read</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={toggleBookmark}
                      className={`w-full flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
                        isBookmarked
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </button>
                    
                    {downloadable && (
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    )}
                  </div>
                </div>

                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                    <nav className="space-y-1">
                      {renderTOC(tableOfContents)}
                    </nav>
                  </div>
                )}

                {/* Compliance Frameworks */}
                {complianceFrameworks.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Compliance Frameworks</h3>
                    <div className="flex flex-wrap gap-2">
                      {complianceFrameworks.map((framework, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 rounded-full"
                        >
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              {/* Mobile Resource Info */}
              <div className="lg:hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {author}
                    </span>
                    {readTime && (
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {readTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleBookmark}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current text-blue-600' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {downloadable && (
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resource
                  </button>
                )}
              </div>

              {/* Resource Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:p-8 animate-fadeIn">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {children}
                </div>
              </div>

              {/* Related Resources */}
              {relatedResources.length > 0 && (
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Related Resources
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedResources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {resource.type}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About CyberCaution</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Security Orchestration & Governance Platform providing comprehensive assessment tools, 
                frameworks, and resources for modern cybersecurity management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/resources" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    All Resources
                  </a>
                </li>
                <li>
                  <a href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Assessment Tools
                  </a>
                </li>
                <li>
                  <a href="/frameworks" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Compliance Frameworks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Resource Info</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600 dark:text-gray-400 inline">Resource ID: </dt>
                  <dd className="inline font-mono text-gray-900 dark:text-white">{resourceId}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 dark:text-gray-400 inline">Category: </dt>
                  <dd className="inline text-gray-900 dark:text-white capitalize">{category}</dd>
                </div>
                {lastUpdated && (
                  <div>
                    <dt className="text-gray-600 dark:text-gray-400 inline">Last Updated: </dt>
                    <dd className="inline text-gray-900 dark:text-white">{lastUpdated}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © 2024 CyberCaution - Empowering Security Excellence Through Integration and Orchestration
            </p>
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        .prose h1::before,
        .prose h2::before,
        .prose h3::before {
          content: '';
          display: block;
          height: 80px;
          margin-top: -80px;
          visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default ResourceTemplate;