// src/pages/tools/index.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  Filter,
  ArrowRight,
  Shield,
  Link2,
  Workflow,
  BarChart3,
  Users,
  Sparkles,
  CheckCircle,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { toolRoutes, getToolsByCategory } from '../../routes/toolRoutes';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AnimatedSection from '../../utils/AnimatedSection';
import AnimatedItem from '../../utils/AnimatedItem';

const ToolsDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Tools', count: toolRoutes.length },
    { id: 'integration', name: 'Integration', count: getToolsByCategory?.('integration')?.length || 0 },
    { id: 'orchestration', name: 'Orchestration', count: getToolsByCategory?.('orchestration')?.length || 0 },
    { id: 'governance', name: 'Governance', count: getToolsByCategory?.('governance')?.length || 0 },
    { id: 'analytics', name: 'Analytics', count: getToolsByCategory?.('analytics')?.length || 0 },
    { id: 'training', name: 'Training', count: getToolsByCategory?.('training')?.length || 0 }
  ];

  const filteredTools = useMemo(() => {
    if (!toolRoutes || !Array.isArray(toolRoutes)) {
      return [];
    }

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
        tool.features?.some(feature => feature.toLowerCase().includes(query))
      );
    }

    return tools;
  }, [searchQuery, selectedCategory]);

  const ToolCard: React.FC<{ tool: any }> = ({ tool }) => {
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
            tool.bgColorClass} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${tool.iconColorClass || 'text-white'}`} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {tool.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.features?.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  {feature}
                </span>
              ))}
              {tool.features?.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{tool.features?.length - 3} more
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
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-foreground">CyberCaution Security Orchestration Toolkit</h1>
          <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-4">
            Orchestrate, Govern, and Optimize Your Security Infrastructure
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            CyberCaution is not a SIEM/EDR replacement - it's the orchestration layer that unifies your existing 
            security tools, automates workflows, enforces governance, and provides actionable analytics across 
            your entire security ecosystem.
          </p>
        </div>
      </AnimatedSection>

      {/* Core Capabilities Section */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-4 text-center">
              <Link2 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm">Integration Hub</h4>
              <p className="text-xs text-muted-foreground mt-1">Connect all tools</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-4 text-center">
              <Workflow className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm">Workflow Engine</h4>
              <p className="text-xs text-muted-foreground mt-1">Automate operations</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm">Governance</h4>
              <p className="text-xs text-muted-foreground mt-1">Policy & compliance</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm">Analytics</h4>
              <p className="text-xs text-muted-foreground mt-1">Unified insights</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm">Training</h4>
              <p className="text-xs text-muted-foreground mt-1">Human-centric</p>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

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

      {/* Loading/Error States */}
      {!toolRoutes && (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Loading Tools...
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please wait while we load the security tools
          </p>
        </div>
      )}

      {/* Categorized Tools Grid */}
      {toolRoutes && (() => {
        const categorizedTools = [
          { id: 'integration', name: "Security Tool Integration Hub", description: "Connect and orchestrate your existing security infrastructure" },
          { id: 'orchestration', name: "Workflow Orchestration", description: "Automate and streamline security operations" },
          { id: 'governance', name: "Governance & Compliance Framework", description: "Policy management and regulatory compliance tools" },
          { id: 'analytics', name: "Analytics & Intelligence Overlay", description: "Aggregate and analyze data from all connected security tools" },
          { id: 'training', name: "Human-Centric Security Training", description: "Integrated training aligned with technical controls" },
        ];

        return categorizedTools.map((category, categoryIndex) => {
          const toolsInCategory = filteredTools.filter(tool => tool.category === category.id);
          if (toolsInCategory.length === 0) return null;

          return (
            <AnimatedSection key={category.id} type="fadeIn" delay={categoryIndex * 0.1 + 0.2}>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-foreground">{category.name}</h2>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toolsInCategory.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        });
      })()}

      {/* Fallback for no tools found */}
      {toolRoutes && filteredTools.length === 0 && (
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

      {/* Why CyberCaution? CTA Section */}
      <AnimatedSection delay={0.3}>
        <Card className="bg-gradient-to-r from-primary/5 to-orange-500/5 border border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-medium">Why CyberCaution?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-foreground">What We Are NOT:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Not another SIEM or EDR solution</li>
                  <li>• Not a replacement for your security tools</li>
                  <li>• Not just another dashboard</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-foreground">What We ARE:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• The orchestration layer for your security stack</li>
                  <li>• Your automated workflow engine</li>
                  <li>• Your governance and compliance hub</li>
                  <li>• Your unified analytics platform</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                <strong className="text-foreground">Integration Partners:</strong> Seamlessly connect with Splunk, 
                CrowdStrike, Palo Alto Networks, Microsoft Sentinel, Qualys, Rapid7, ServiceNow, and 100+ other 
                security tools through our Integration Hub.
              </p>
              <Link to="/demo">
                <Button className="bg-primary hover:bg-primary/90">
                  Schedule Platform Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
};

export default ToolsDirectory;