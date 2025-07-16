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
  TrendingUp,
  ClipboardList,
  Building2,
  Heart,
  Eye,
  Bell,
  Award,
  Link2,
  Database,
  Brain,
  Activity,
  Zap,
  Globe,
  Layers,
  Monitor
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  Settings, Shield, FileText, BarChart3, Download, Users, CheckCircle, 
  Network, Lock, AlertTriangle, BookOpen, GraduationCap, Wrench, 
  Target, Calendar, Play, ExternalLink, TrendingUp, ClipboardList,
  Building2, Heart, Eye, Bell, Award, Link2, Database, Brain,
  Activity, Zap, Globe, Layers, Monitor
};

// Enhanced data processing utility
const ensureData = (data: any[], fallback: any[]): any[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return fallback;
  }
  return data.map(item => ({
    ...item,
    tools: ensureArray(item.tools, [])
  }));
};

const ensureArray = (arr: any[], fallback: any[] = []): any[] => {
  return Array.isArray(arr) && arr.length > 0 ? arr : fallback;
};

// Comprehensive CyberCaution Toolkit Categories with authentic content
const cyberCautionToolCategories = [
  {
    id: 'threat-intelligence',
    title: 'Threat Weather System™',
    description: 'Real-time threat intelligence and predictive analytics to forecast security risks before they materialize',
    icon: TrendingUp,
    color: 'text-critical-red',
    bgColor: 'bg-critical-red/10',
    badge: 'AI-Powered',
    tools: [
      {
        name: 'Threat Weather Dashboard',
        description: 'Real-time threat climate monitoring for your industry with predictive risk forecasting and early warning alerts',
        type: 'Intelligence Platform',
        path: '/threat-weather',
        icon: TrendingUp,
        frameworks: ['MITRE ATT&CK', 'Threat Intelligence'],
        time: '5 min setup'
      },
      {
        name: 'Predictive Breach Analytics',
        description: 'AI-powered analysis to identify vulnerabilities before attackers exploit them using machine learning algorithms',
        type: 'AI Analytics',
        path: '/predictive-analytics',
        icon: Brain,
        frameworks: ['NIST CSF', 'AI/ML Security'],
        time: '15 min analysis'
      },
      {
        name: 'Industry Threat Profiler',
        description: 'Customized threat intelligence specific to your industry sector with actor profiling and attack pattern analysis',
        type: 'Threat Analysis',
        path: '/industry-threats',
        icon: Eye,
        frameworks: ['Sector-Specific Intelligence'],
        time: '10 min'
      },
      {
        name: 'Dark Web Monitoring',
        description: 'Continuous monitoring of dark web activities for credentials, data leaks, and attack planning discussions',
        type: 'Monitoring Tool',
        path: '/dark-web-monitor',
        icon: Globe,
        frameworks: ['Threat Intelligence', 'OSINT'],
        time: 'Continuous'
      }
    ]
  },
  {
    id: 'ransomware-immunity',
    title: 'Ransomware Immunity Suite',
    description: 'Comprehensive protection and recovery tools designed to prevent, detect, and recover from ransomware attacks',
    icon: Shield,
    color: 'text-secure-green',
    bgColor: 'bg-secure-green/10',
    badge: 'Featured',
    tools: [
      {
        name: 'Ransomware Readiness Assessment',
        description: 'Comprehensive evaluation of your ransomware preparedness with actionable remediation guidance and NIST alignment',
        type: 'Assessment Tool',
        path: '/ransomware-assessment',
        icon: Shield,
        frameworks: ['NIST CSF', 'NIST IR 8374'],
        time: '15 min',
        featured: true
      },
      {
        name: 'Backup Integrity Validator',
        description: 'Automated testing and validation of backup systems to ensure rapid recovery capabilities during ransomware incidents',
        type: 'Validation Tool',
        path: '/backup-validator',
        icon: Database,
        frameworks: ['NIST SP 800-34', 'Business Continuity'],
        time: '30 min'
      },
      {
        name: 'Incident Response Playbooks',
        description: 'Pre-built ransomware response playbooks with step-by-step procedures for containment, eradication, and recovery',
        type: 'Response Kit',
        path: '/ransomware-playbooks',
        icon: FileText,
        frameworks: ['NIST SP 800-61', 'Incident Response'],
        time: '45 min setup'
      },
      {
        name: 'Recovery Time Calculator',
        description: 'Calculate and optimize your recovery time objectives (RTO) and recovery point objectives (RPO) for ransomware scenarios',
        type: 'Planning Tool',
        path: '/recovery-calculator',
        icon: Clock,
        frameworks: ['Business Continuity', 'Disaster Recovery'],
        time: '20 min'
      }
    ]
  },
  {
    id: 'vendor-risk-radar',
    title: 'Vendor Risk Radar',
    description: 'Continuous monitoring and assessment of third-party security risks throughout the vendor lifecycle',
    icon: Network,
    color: 'text-warning-amber',
    bgColor: 'bg-warning-amber/10',
    badge: 'Supply Chain',
    tools: [
      {
        name: 'Vendor Security Scorecard',
        description: 'Automated security assessment of vendors and suppliers with continuous monitoring and risk scoring',
        type: 'Risk Assessment',
        path: '/vendor-scorecard',
        icon: BarChart3,
        frameworks: ['NIST SP 800-161', 'Supply Chain Security'],
        time: '25 min'
      },
      {
        name: 'Supply Chain Mapper',
        description: 'Visual mapping of your entire supply chain with risk analysis and critical dependency identification',
        type: 'Mapping Tool',
        path: '/supply-chain-map',
        icon: Network,
        frameworks: ['Supply Chain Risk Management'],
        time: '40 min'
      },
      {
        name: 'Third-Party Breach Monitor',
        description: 'Real-time monitoring of security incidents affecting your vendors and supply chain partners',
        type: 'Monitoring System',
        path: '/vendor-breach-monitor',
        icon: AlertTriangle,
        frameworks: ['Continuous Monitoring'],
        time: 'Real-time'
      },
      {
        name: 'Vendor Onboarding Wizard',
        description: 'Streamlined security assessment process for new vendors with automated questionnaires and risk evaluation',
        type: 'Onboarding Tool',
        path: '/vendor-onboarding',
        icon: Users,
        frameworks: ['Vendor Management'],
        time: '35 min'
      }
    ]
  },
  {
    id: 'compliance-automation',
    title: 'Compliance Automation Center',
    description: 'Automated compliance management tools for maintaining adherence to security frameworks and regulations',
    icon: CheckCircle,
    color: 'text-electric-blue',
    bgColor: 'bg-electric-blue/10',
    badge: 'Automated',
    tools: [
      {
        name: 'NIST CSF Implementation Toolkit',
        description: 'Complete implementation guide for NIST Cybersecurity Framework with templates, procedures, and validation tools',
        type: 'Implementation Kit',
        path: '/nist-csf-toolkit',
        icon: Award,
        frameworks: ['NIST CSF', 'NIST SP 800-53'],
        time: '60 min setup'
      },
      {
        name: 'Multi-Framework Control Mapper',
        description: 'Cross-reference security controls between NIST CSF, ISO 27001, SOC 2, and other major frameworks',
        type: 'Mapping Tool',
        path: '/control-mapper',
        icon: Link2,
        frameworks: ['Multiple Frameworks'],
        time: '30 min'
      },
      {
        name: 'Compliance Gap Analyzer',
        description: 'Identify compliance gaps and generate remediation roadmaps with prioritized action items',
        type: 'Analysis Tool',
        path: '/compliance-gaps',
        icon: Target,
        frameworks: ['Compliance Management'],
        time: '45 min'
      },
      {
        name: 'Audit Readiness Dashboard',
        description: 'Real-time compliance posture monitoring with audit trail generation and evidence collection',
        type: 'Dashboard',
        path: '/audit-dashboard',
        icon: Monitor,
        frameworks: ['Audit Management'],
        time: 'Continuous'
      }
    ]
  },
  {
    id: 'risk-management',
    title: 'Advanced Risk Analytics',
    description: 'AI-powered risk assessment and management tools for comprehensive organizational risk visibility',
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    badge: 'Analytics',
    tools: [
      {
        name: 'Risk Register Intelligence',
        description: 'AI-enhanced risk identification and management with automated risk scoring and treatment recommendations',
        type: 'Risk Platform',
        path: '/risk-register',
        icon: ClipboardList,
        frameworks: ['NIST RMF', 'ISO 31000'],
        time: '50 min'
      },
      {
        name: 'Business Impact Calculator',
        description: 'Quantify the financial and operational impact of security incidents on critical business functions',
        type: 'Impact Analysis',
        path: '/business-impact',
        icon: Building2,
        frameworks: ['Business Continuity', 'Risk Assessment'],
        time: '35 min'
      },
      {
        name: 'Risk Heat Map Generator',
        description: 'Visual risk mapping with interactive heat maps for executive reporting and decision making',
        type: 'Visualization Tool',
        path: '/risk-heatmap',
        icon: Activity,
        frameworks: ['Risk Visualization'],
        time: '20 min'
      },
      {
        name: 'Scenario Planning Workshop',
        description: 'Guided scenario planning exercises for testing organizational resilience and response capabilities',
        type: 'Planning Tool',
        path: '/scenario-planning',
        icon: Layers,
        frameworks: ['Scenario Analysis', 'Crisis Management'],
        time: '90 min'
      }
    ]
  },
  {
    id: 'incident-response',
    title: 'Rapid Response Toolkit',
    description: 'Pre-configured incident response tools and playbooks for swift containment and recovery',
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    badge: 'Rapid Deploy',
    tools: [
      {
        name: 'Incident Response Orchestrator',
        description: 'Centralized platform for managing security incidents with automated workflows and team coordination',
        type: 'Orchestration Platform',
        path: '/incident-orchestrator',
        icon: Settings,
        frameworks: ['NIST SP 800-61', 'Incident Response'],
        time: '20 min setup'
      },
      {
        name: 'Crisis Communication Templates',
        description: 'Pre-approved communication templates for stakeholders, media, and regulatory notifications',
        type: 'Communication Kit',
        path: '/crisis-comms',
        icon: Mail,
        frameworks: ['Crisis Management'],
        time: '15 min'
      },
      {
        name: 'Tabletop Exercise Builder',
        description: 'Create and conduct cybersecurity tabletop exercises with realistic scenarios and evaluation metrics',
        type: 'Training Tool',
        path: '/tabletop-exercises',
        icon: GraduationCap,
        frameworks: ['NIST IR 8374', 'Training'],
        time: '120 min'
      },
      {
        name: 'Evidence Collection Toolkit',
        description: 'Digital forensics tools and procedures for proper evidence collection and chain of custody',
        type: 'Forensics Kit',
        path: '/evidence-collection',
        icon: Search,
        frameworks: ['Digital Forensics', 'Legal'],
        time: '60 min'
      }
    ]
  }
];

// Featured CyberCaution Tools
const cyberCautionFeaturedTools = [
  {
    title: 'Ransomware Readiness Assessment',
    description: 'Industry-leading ransomware preparedness evaluation with NIST-aligned recommendations and actionable insights',
    icon: Shield,
    color: 'text-critical-red',
    path: '/ransomware-assessment',
    badge: 'Most Popular',
    isNew: false,
    isPopular: true,
    isUpdated: false,
    time: '15 min'
  },
  {
    title: 'Threat Weather Dashboard',
    description: 'Real-time threat intelligence platform providing predictive risk analytics for your industry sector',
    icon: TrendingUp,
    color: 'text-warning-amber',
    path: '/threat-weather',
    badge: 'AI-Powered',
    isNew: true,
    isPopular: false,
    isUpdated: false,
    time: '5 min'
  },
  {
    title: 'NIST CSF Implementation Toolkit',
    description: 'Complete cybersecurity framework implementation guide with automated gap analysis and roadmap generation',
    icon: Award,
    color: 'text-electric-blue',
    path: '/nist-csf-toolkit',
    badge: 'Updated',
    isNew: false,
    isPopular: false,
    isUpdated: true,
    time: '60 min'
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
    filter: (query) => query.or('is_new.eq.true,is_popular.eq.true,is_updated.eq.true'),
    orderBy: { column: 'order_index', ascending: true },
    limit: 3
  });

  // Process data once loaded
  useEffect(() => {
    if (!categoriesLoading && !toolsLoading && !featuredLoading) {
      // Process categories and map tools to categories
      if (toolCategoriesData && toolsListData && toolCategoriesData.length > 0) {
        try {
          const processedCategories = toolCategoriesData.map(category => {
            // Find tools for this category
            const categoryTools = toolsListData.filter(tool => tool.category_id === category.id) || [];
            
            // Map icon strings to components
            const processedTools = categoryTools.map(tool => ({
              ...tool,
              icon: LucideIcons[tool.icon as keyof typeof LucideIcons] || Settings,
              name: tool.title || tool.name,
              type: tool.type || 'Tool',
              frameworks: ensureArray(tool.frameworks, []),
              time: tool.time || '15 min'
            }));
            
            // Map category icon
            const CategoryIcon = LucideIcons[category.icon as keyof typeof LucideIcons] || Settings;
            
            return {
              ...category,
              icon: CategoryIcon,
              tools: processedTools,
              tools_count: processedTools.length
            };
          });
          
          setToolCategories(processedCategories);
        } catch (err) {
          console.error('Error processing tool categories:', err);
          setToolCategories(cyberCautionToolCategories);
        }
      } else {
        setToolCategories(cyberCautionToolCategories);
      }
      
      // Process featured tools
      if (featuredToolsData && featuredToolsData.length > 0) {
        try {
          const processed = featuredToolsData.map(tool => ({
            ...tool,
            icon: LucideIcons[tool.icon as keyof typeof LucideIcons] || Shield,
            isNew: tool.is_new || false,
            isPopular: tool.is_popular || false,
            isUpdated: tool.is_updated || false,
            time: tool.time || '15 min'
          }));
          
          setFeaturedTools(processed);
        } catch (err) {
          console.error('Error processing featured tools:', err);
          setFeaturedTools(cyberCautionFeaturedTools);
        }
      } else {
        setFeaturedTools(cyberCautionFeaturedTools);
      }
      
      setLoading(false);
    }
    
    // Handle errors
    if (categoriesError || toolsError || featuredError) {
      console.error('Supabase errors:', { categoriesError, toolsError, featuredError });
      // Use fallback data on error
      setToolCategories(cyberCautionToolCategories);
      setFeaturedTools(cyberCautionFeaturedTools);
      setError(null); // Don't show error to user, just use fallback
      setLoading(false);
    }
  }, [
    categoriesLoading, toolsLoading, featuredLoading, 
    toolCategoriesData, toolsListData, featuredToolsData,
    categoriesError, toolsError, featuredError
  ]);

  // Use processed data with bulletproof fallback
  const displayToolCategories = ensureData(toolCategories, cyberCautionToolCategories);
  const displayFeaturedTools = ensureArray(featuredTools, cyberCautionFeaturedTools);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading CyberCaution Toolkit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">CyberCaution Security Toolkit</h1>
            <p className="text-xl text-orange-500">Advanced cybersecurity tools and resources<br />powered by threat intelligence and AI analytics</p>
          </div>
        </AnimatedSection>

        {/* Featured Tools */}
        <AnimatedSection type="fadeIn" delay={0.1}>
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Featured CyberCaution Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayFeaturedTools.map((tool, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.1}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-2 border-primary/20 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
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
                      <p className="text-muted-foreground mb-4 flex-1">{tool.description}</p>
                      {tool.time && (
                        <p className="text-sm text-primary mb-4">⏱️ {tool.time}</p>
                      )}
                      <Link to={tool.path || '/login'} className="mt-auto">
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
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                    {category.badge && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                        {category.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ensureArray(category.tools, []).map((tool, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {tool.type || 'Tool'}
                        </span>
                        {tool.path === '/login' && (
                          <Lock className="h-4 w-4 text-warning-amber" />
                        )}
                        {tool.featured && (
                          <span className="text-xs bg-secure-green/10 text-secure-green px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {tool.icon && React.createElement(tool.icon, { className: "h-5 w-5" })}
                        {tool.name || tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1">{tool.description}</p>
                      
                      {/* Frameworks */}
                      {tool.frameworks && tool.frameworks.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {tool.frameworks.slice(0, 2).map((framework, idx) => (
                              <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                {framework}
                              </span>
                            ))}
                            {tool.frameworks.length > 2 && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                +{tool.frameworks.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Time estimate */}
                      {tool.time && (
                        <p className="text-sm text-primary mb-4">⏱️ {tool.time}</p>
                      )}
                      
                      <div className="flex gap-2">
                        <Link to={tool.path || '/login'} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Wrench className="mr-2 h-4 w-4" />
                            {tool.path === '/login' ? 'Premium Tool' : 'Launch Tool'}
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

        {/* Toolkit Benefits */}
        <AnimatedSection type="fadeIn" delay={0.5}>
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">CyberCaution Advantage</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Brain className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">AI-Powered Intelligence</h3>
                        <p className="text-sm text-muted-foreground">Predictive analytics and machine learning enhance threat detection</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Zap className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Rapid Deployment</h3>
                        <p className="text-sm text-muted-foreground">Deploy enterprise-grade security in hours, not months</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Threat Weather System™</h3>
                        <p className="text-sm text-muted-foreground">Real-time threat climate monitoring with predictive forecasting</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Network className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Supply Chain Visibility</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive third-party risk monitoring and management</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Custom Implementation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Need customized tools for your specific industry or requirements? Our experts can develop tailored solutions.
                    </p>
                    <Link to="/contact">
                      <Button variant="primary">
                        Request Custom Solution
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
              <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Quick Launch</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/ransomware-assessment">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Shield className="h-5 w-5 mb-2" />
                    <span className="text-xs">Ransomware Check</span>
                  </Button>
                </Link>
                <Link to="/threat-weather">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <TrendingUp className="h-5 w-5 mb-2" />
                    <span className="text-xs">Threat Weather</span>
                  </Button>
                </Link>
                <Link to="/vendor-scorecard">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Network className="h-5 w-5 mb-2" />
                    <span className="text-xs">Vendor Risk</span>
                  </Button>
                </Link>
                <Link to="/nist-csf-toolkit">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Award className="h-5 w-5 mb-2" />
                    <span className="text-xs">NIST CSF</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Incident Reporting Section - Enhanced */}
        <AnimatedSection type="fadeIn" delay={0.8} className="py-16 bg-muted/20 dark:bg-dark-surface/30 mt-12 mb-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Incident Response & Reporting</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Immediate access to incident response resources and reporting channels
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-background dark:bg-dark-surface rounded-lg p-6 border border-border shadow-sm">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-warning-amber mr-2" />
                  Official Reporting Channels
                </h3>
                <p className="text-muted-foreground mb-6">
                  Report cybersecurity incidents to appropriate authorities and get expert assistance.
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
                  <Zap className="h-5 w-5 text-warning-amber mr-2" />
                  CyberCaution Response Tools
                </h3>
                <p className="text-muted-foreground mb-6">
                  Access our rapid response tools for immediate incident containment and recovery.
                </p>
                
                <div className="space-y-3">
                  <Link to="/incident-orchestrator" className="block">
                    <div className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Settings className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Incident Orchestrator</p>
                        <p className="text-sm text-muted-foreground">Centralized incident management</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/crisis-comms" className="block">
                    <div className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Mail className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Crisis Communications</p>
                        <p className="text-sm text-muted-foreground">Pre-approved notification templates</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/evidence-collection" className="block">
                    <div className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Search className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Evidence Collection</p>
                        <p className="text-sm text-muted-foreground">Digital forensics toolkit</p>
                      </div>
                    </div>
                  </Link>
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
                  Ready to Deploy CyberCaution?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Start with our most popular assessment tools and build your comprehensive security program
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ransomware-assessment">
                    <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                      Start Ransomware Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                    >
                      Get Expert Consultation
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