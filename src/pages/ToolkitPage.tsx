import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  ArrowRight, 
  Settings, 
  Shield, 
  FileText, 
  BarChart3,
  Download,
  Users,
  CheckCircle,
  Network,
  Lock,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Wrench,
  Target,
  Calendar,
  Play,
  ExternalLink,
  RefreshCw,
  Search,
  Phone,
  Mail,
  Clock,
  Loader,
  Eye,
  Link2
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  Settings, Shield, FileText, BarChart3, Download, Users, CheckCircle, 
  Network, Lock, AlertTriangle, BookOpen, GraduationCap, Wrench, 
  Target, Calendar, Play, ExternalLink, Eye, Search, Link2
};

// Fallback data for categories
const fallbackToolCategories = [
  {
    id: 'assessment-tools', 
    title: 'Assessment Tools',
    description: 'Interactive tools to evaluate your security posture',
    icon: BarChart3,
    color: 'text-electric-blue',
    bgColor: 'bg-electric-blue/10',
    tools: [
      {
        name: 'Risk Assessment Calculator',
        description: 'Calculate and prioritize security risks based on impact and likelihood',
        type: 'Interactive Tool',
        path: '/login',
        icon: Target
      },
      {
        name: 'Compliance Gap Analyzer',
        description: 'Identify gaps in your compliance with various frameworks',
        type: 'Assessment',
        path: '/login',
        icon: CheckCircle
      },
      {
        name: 'Vendor Risk Scorecard',
        description: 'Evaluate third-party security risks with our scoring system',
        type: 'Evaluation Tool',
        path: '/login',
        icon: Network
      }
    ]
  },
  {
    id: 'planning-tools', 
    title: 'Planning & Strategy',
    description: 'Tools to help plan and implement your security program',
    icon: Target,
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    tools: [
      {
        name: 'Security Roadmap Builder',
        description: 'Create a strategic roadmap for your cybersecurity initiatives',
        type: 'Planning Tool',
        path: '/login',
        icon: Calendar
      },
      {
        name: 'Budget Planning Calculator',
        description: 'Plan and allocate your cybersecurity budget effectively',
        type: 'Financial Tool',
        path: '/login',
        icon: BarChart3
      },
      {
        name: 'Incident Response Planner',
        description: 'Build comprehensive incident response plans and playbooks',
        type: 'Planning Tool',
        path: '/login',
        icon: FileText
      }
    ]
  },
  {
    id: 'monitoring-tools',
    title: 'Monitoring Tools',
    description: 'Real-time security monitoring and threat detection tools',
    icon: Eye,
    color: 'text-critical-red',
    bgColor: 'bg-critical-red/10',
    tools: [
      {
        name: 'Security Log Analyzer',
        description: 'Analyze security logs to identify patterns and anomalies',
        type: 'Monitoring',
        path: '/login',
        icon: BarChart3
      },
      {
        name: 'Threat Intelligence Dashboard',
        description: 'Real-time dashboard of current threats and vulnerabilities',
        type: 'Intelligence',
        path: '/login',
        icon: AlertTriangle
      },
      {
        name: 'Network Traffic Monitor',
        description: 'Monitor network traffic for suspicious activities',
        type: 'Monitoring',
        path: '/login',
        icon: Network
      }
    ]
  },
  {
    id: 'analysis-tools',
    title: 'Analysis Tools',
    description: 'Advanced tools for security data analysis and reporting',
    icon: BarChart3,
    color: 'text-electric-blue',
    bgColor: 'bg-electric-blue/10',
    tools: [
      {
        name: 'Security Metrics Dashboard',
        description: 'Comprehensive dashboard for tracking security metrics',
        type: 'Analytics',
        path: '/login',
        icon: BarChart3
      },
      {
        name: 'Incident Investigation Toolkit',
        description: 'Tools for investigating security incidents and breaches',
        type: 'Analysis',
        path: '/login',
        icon: Search
      },
      {
        name: 'Attack Surface Analyzer',
        description: 'Visualize and analyze your organization\'s attack surface',
        type: 'Analysis',
        path: '/login',
        icon: Target
      }
    ]
  },
  {
    id: 'compliance-tools',
    title: 'Compliance Tools',
    description: 'Tools to assist with regulatory compliance and security frameworks',
    icon: CheckCircle,
    color: 'text-secure-green',
    bgColor: 'bg-secure-green/10',
    tools: [
      {
        name: 'Compliance Gap Analyzer',
        description: 'Identify gaps in compliance with various security frameworks',
        type: 'Compliance',
        path: '/login',
        icon: FileText
      },
      {
        name: 'Policy Generator',
        description: 'Generate security policies aligned with industry standards',
        type: 'Documentation',
        path: '/login',
        icon: FileText
      },
      {
        name: 'Control Mapping Tool',
        description: 'Map controls across different compliance frameworks',
        type: 'Compliance',
        path: '/login',
        icon: Link2
      }
    ]
  }
];

// Fallback data for featured tools
const fallbackFeaturedTools = [
  {
    title: 'Ransomware Readiness Checker',
    description: 'Quick assessment tool to evaluate your ransomware preparedness',
    icon: Shield,
    color: 'text-critical-red',
    path: '/ransomware-assessment',
    isNew: true
  },
  {
    title: 'CISA Controls Mapper',
    description: 'Map your security controls to CISA recommendations',
    icon: Network,
    color: 'text-warning-amber',
    path: '/login',
    isPopular: true
  },
  {
    title: 'Supply Chain Risk Monitor',
    description: 'Track and assess risks in your supply chain relationships',
    icon: AlertTriangle,
    color: 'text-electric-blue',
    path: '/login',
    isUpdated: true
  }
];

const ToolkitPage = () => {
  // State for categories, featured tools, loading status and errors
  const [toolCategories, setToolCategories] = useState<any[]>([]);
  const [featuredTools, setFeaturedTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tool categories from Supabase
  const { data: toolCategoriesData, loading: categoriesLoading, error: categoriesError } = useSupabaseQuery('tool_categories', {
    orderBy: { column: 'order_index', ascending: true }
  });
  
  // Fetch tools list from Supabase
  const { data: toolsListData, loading: toolsLoading, error: toolsError } = useSupabaseQuery('tools_list', {
    orderBy: { column: 'order_index', ascending: true }
  });
  
  // Fetch featured tools from Supabase
  const { data: featuredToolsData, loading: featuredLoading, error: featuredError } = useSupabaseQuery('tools_list', {
    filter: (query) => query.or('is_new.eq.true,is_popular.eq.true'),
    orderBy: { column: 'order_index', ascending: true },
    limit: 3
  });

  // Process data once loaded
  useEffect(() => {
    if (!categoriesLoading && !toolsLoading && !featuredLoading) {
      // Process categories and map tools to categories
      if (toolCategoriesData && toolsListData) {
        try {
          const processedCategories = toolCategoriesData.map(category => {
            // Find tools for this category
            const categoryTools = toolsListData.filter(tool => tool.category_id === category.id) || [];
            
            // Map icon strings to components
            const processedTools = categoryTools.map(tool => ({
              ...tool,
              icon: LucideIcons[tool.icon as keyof typeof LucideIcons] || Settings
            }));
            
            // Map category icon
            const CategoryIcon = LucideIcons[category.icon as keyof typeof LucideIcons] || Settings;
            
            return {
              ...category,
              icon: CategoryIcon,
              tools: processedTools
            };
          });
          
          setToolCategories(processedCategories);
        } catch (err) {
          console.error('Error processing tool categories:', err);
          setToolCategories([]);
        }
      } else {
        setToolCategories([]);
      }
      
      // Process featured tools
      if (featuredToolsData && featuredToolsData.length > 0) {
        try {
          const processed = featuredToolsData.map(tool => ({
            ...tool,
            icon: LucideIcons[tool.icon as keyof typeof LucideIcons] || Shield,
            isNew: tool.is_new,
            isPopular: tool.is_popular
          }));
          
          setFeaturedTools(processed);
        } catch (err) {
          console.error('Error processing featured tools:', err);
          setFeaturedTools([]);
        }
      } else {
        setFeaturedTools([]);
      }
      
      setLoading(false);
    }
    
    // Handle errors
    if (categoriesError || toolsError || featuredError) {
      setError(categoriesError || toolsError || featuredError);
      setLoading(false);
    }
  }, [
    categoriesLoading, toolsLoading, featuredLoading, 
    toolCategoriesData, toolsListData, featuredToolsData,
    categoriesError, toolsError, featuredError
  ]);

  // Use fetched data or fallback if empty
  const displayToolCategories = toolCategories.length > 0 ? toolCategories : fallbackToolCategories;
  const displayFeaturedTools = featuredTools.length > 0 ? featuredTools : fallbackFeaturedTools;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading toolkit resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Security Toolkit</h1>
            <p className="text-xl text-orange-500">Comprehensive collection of tools, templates, and resources<br />for cybersecurity professionals</p>
          </div>
        </AnimatedSection>

        {/* Featured Tools */}
        <AnimatedSection type="fadeIn" delay={0.1}>
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayFeaturedTools.map((tool, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.1}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-muted`}>
                          {React.createElement(tool.icon, { 
                            className: `h-6 w-6 ${tool.color || 'text-primary'}` 
                          })}
                        </div>
                        {tool.isNew && (
                          <span className="bg-secure-green/10 text-secure-green px-2 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                        {tool.isPopular && (
                          <span className="bg-warning-amber/10 text-warning-amber px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                        {tool.isUpdated && (
                          <span className="bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full text-xs font-medium">
                            Updated
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{tool.title}</h3>
                      <p className="text-muted-foreground mb-4">{tool.description}</p>
                      <Link to={tool.path || '/login'}>
                        <Button variant="orange" className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          Launch Tool
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Tool Categories */}
        {displayToolCategories.map((category, categoryIndex) => (
          <AnimatedSection key={category.id} type="fadeIn" delay={categoryIndex * 0.1 + 0.2} className="mb-16">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${category.bgColor || 'bg-primary/10'} mr-4`}>
                  {React.createElement(category.icon, { 
                    className: `h-6 w-6 ${category.color || 'text-primary'}` 
                  })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.tools.map((tool, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {tool.type}
                        </span>
                        {tool.path === '/login' && (
                          <Lock className="h-4 w-4 text-warning-amber" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1">{tool.description}</p>
                      <div className="flex gap-2">
                        <Link to={tool.path || '/login'} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Wrench className="mr-2 h-4 w-4" />
                            {tool.path === '/login' ? 'Premium Tool' : 'Use Tool'}
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedSection>
        ))}

        {/* Toolkit Resources */}
        <AnimatedSection type="fadeIn" delay={0.5}>
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Toolkit Benefits</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Save Time and Resources</h3>
                        <p className="text-sm text-muted-foreground">Pre-built tools and templates reduce development time</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Industry Best Practices</h3>
                        <p className="text-sm text-muted-foreground">All tools follow established security frameworks</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Regular Updates</h3>
                        <p className="text-sm text-muted-foreground">Tools are updated to reflect latest threats and standards</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Expert Support</h3>
                        <p className="text-sm text-muted-foreground">Get help from our cybersecurity experts when needed</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Custom Tools</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Need a custom tool for your specific requirements? Our team can develop tailored solutions.
                    </p>
                    <Link to="/contact">
                      <Button variant="primary">
                        Request Custom Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Quick Access */}
        <AnimatedSection type="fadeIn" delay={0.6}>
          <Card className="bg-muted/30 dark:bg-muted/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to={'/ransomware-assessment'}>
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Shield className="h-5 w-5 mb-2" />
                    <span className="text-xs">Ransomware Check</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center relative">
                    <BarChart3 className="h-5 w-5 mb-2" />
                    <span className="text-xs">Risk Calculator</span>
                    <Lock className="absolute top-1 right-1 h-3 w-3 text-warning-amber" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center relative">
                    <FileText className="h-5 w-5 mb-2" />
                    <span className="text-xs">Policy Templates</span>
                    <Lock className="absolute top-1 right-1 h-3 w-3 text-warning-amber" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center relative">
                    <Users className="h-5 w-5 mb-2" />
                    <span className="text-xs">Training Kit</span>
                    <Lock className="absolute top-1 right-1 h-3 w-3 text-warning-amber" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Incident Reporting Section */}
        <AnimatedSection type="fadeIn" delay={0.8} className="py-16 bg-muted/20 dark:bg-dark-surface/30 mt-12 mb-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Incident Reporting</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Report cybersecurity incidents and get expert assistance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-background dark:bg-dark-surface rounded-lg p-6 border border-border shadow-sm">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-warning-amber mr-2" />
                  Report to CISA
                </h3>
                <p className="text-muted-foreground mb-6">
                  The Cybersecurity and Infrastructure Security Agency (CISA) encourages proactive reporting of cybersecurity incidents.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">CISA Central</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+18882672583" className="hover:underline">
                          +1 (888) 267-2583
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">Email Reporting</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:central@cisa.gov" className="hover:underline">
                          central@cisa.gov
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">Online Reporting</p>
                      <p className="text-sm text-muted-foreground">
                        <a 
                          href="https://www.cisa.gov/report" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:underline"
                        >
                          Submit report online
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background dark:bg-dark-surface rounded-lg p-6 border border-border shadow-sm">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-warning-amber mr-2" />
                  Ransomware Response
                </h3>
                <p className="text-muted-foreground mb-6">
                  If your organization is experiencing a ransomware attack, follow these immediate steps:
                </p>
                
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">1</span>
                    <div>
                      <p className="font-medium">Isolate affected systems</p>
                      <p className="text-sm text-muted-foreground">Disconnect infected computers from the network</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">2</span>
                    <div>
                      <p className="font-medium">Report the incident</p>
                      <p className="text-sm text-muted-foreground">Contact CISA, FBI, and local authorities</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">3</span>
                    <div>
                      <p className="font-medium">Preserve evidence</p>
                      <p className="text-sm text-muted-foreground">Take system images and preserve logs</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">4</span>
                    <div>
                      <p className="font-medium">Implement response plan</p>
                      <p className="text-sm text-muted-foreground">Follow your incident response plan</p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-6">
                  <a 
                    href="https://www.cisa.gov/stopransomware/ransomware-guide" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Download CISA Ransomware Response Checklist
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection type="fadeIn" delay={0.7}>
          <div className="text-center mt-16">
            <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Enhance Your Security Program?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Explore our comprehensive toolkit and start improving your cybersecurity posture today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={'/ransomware-assessment'}>
                    <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                      Start with Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to={'/contact'}>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                    >
                      Get Expert Help
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ToolkitPage;