// src/pages/tools/index.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Shield,
  Sparkles,
  CheckCircle,
  Lock
} from 'lucide-react';
import { toolRoutes, getToolsByCategory } from '../../routes';
import type { ToolRoute } from '../../routes';

const ToolsDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Tools', count: toolRoutes.length },
    { id: 'integration', name: 'Integration', count: getToolsByCategory('integration').length },
    { id: 'orchestration', name: 'Orchestration', count: getToolsByCategory('orchestration').length },
    { id: 'governance', name: 'Governance', count: getToolsByCategory('governance').length },
    { id: 'analytics', name: 'Analytics', count: getToolsByCategory('analytics').length },
    { id: 'training', name: 'Training', count: getToolsByCategory('training').length }
  ];

  const filteredTools = useMemo(() => {
    let tools = toolRoutes;

    // Filter by category
    if (selectedCategory !== 'all') {
      tools = tools.filter(tool => tool.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    return tools;
  }, [searchQuery, selectedCategory]);

  const ToolCard: React.FC<{ tool: ToolRoute }> = ({ tool }) => {
    const Icon = tool.icon;
    
    return (
      <Link
        to={tool.path}
        className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400"
      >
        {tool.isPremium && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium
            </span>
          </div>
        )}
        
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${
            tool.category === 'integration' ? 'from-blue-500 to-blue-600' :
            tool.category === 'orchestration' ? 'from-purple-500 to-purple-600' :
            tool.category === 'governance' ? 'from-green-500 to-green-600' :
            tool.category === 'analytics' ? 'from-orange-500 to-orange-600' :
            'from-pink-500 to-pink-600'
          } flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {tool.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  {feature}
                </span>
              ))}
              {tool.features.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{tool.features.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0" />
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Security Orchestration Tools
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Connect, automate, and govern your security operations from a single platform
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools by name, description, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.name}
              <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No tools found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Platform Overview */}
      <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">
            Not Just Another Security Tool
          </h2>
          <p className="text-lg mb-6 text-primary-100">
            CyberCaution is a comprehensive Security Orchestration & Governance Platform that unifies your existing security infrastructure, automates workflows, and ensures compliance—all while keeping your team at the center of security operations.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Integration First</h3>
                <p className="text-sm text-primary-100">Works with your existing SIEM, EDR, and security tools</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Human-Centric</h3>
                <p className="text-sm text-primary-100">Combines automation with human expertise and training</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Compliance Ready</h3>
                <p className="text-sm text-primary-100">Built-in frameworks for NIST, ISO, SOC2, and more</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Enterprise Scale</h3>
                <p className="text-sm text-primary-100">Designed for organizations of all sizes</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Link
              to="/demo"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Request Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsDirectory;