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
  Monitor,
  Calculator,
  Gauge
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  Settings, Shield, FileText, BarChart3, Download, Users, CheckCircle, 
  Network, Lock, AlertTriangle, BookOpen, GraduationCap, Wrench, 
  Target, Calendar, Play, ExternalLink, TrendingUp, ClipboardList,
  Building2, Heart, Eye, Bell, Award, Link2, Database, Brain,
  Activity, Zap, Globe, Layers, Monitor, Calculator, Gauge, Search, 
  Clock, Mail
};

// INTERACTIVE TOOLS - Assessments, Calculators, Dashboards, Automation Platforms
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
        description: 'Real-time threat climate monitoring with predictive risk forecasting and early warning alerts',
        type: 'Intelligence Platform',
        path: '/tools/threat-weather',
        icon: TrendingUp,
        frameworks: ['MITRE ATT&CK', 'Threat Intelligence'],
        time: '5 min setup',
        interactive: true
      },
      {
        name: 'Predictive Breach Analytics',
        description: 'AI-powered analysis to identify vulnerabilities before attackers exploit them using machine learning algorithms',
        type: 'AI Analytics',
        path: '/tools/predictive-analytics',
        icon: Brain,
        frameworks: ['NIST CSF', 'AI/ML Security'],
        time: '15 min analysis',
        interactive: true
      },
      {
        name: 'Industry Threat Profiler',
        description: 'Customized threat intelligence specific to your industry sector with actor profiling and attack pattern analysis',
        type: 'Threat Analysis Tool',
        path: '/tools/industry-threats',
        icon: Eye,
        frameworks: ['Sector-Specific Intelligence'],
        time: '10 min',
        interactive: true
      },
      {
        name: 'Dark Web Monitoring Dashboard',
        description: 'Continuous monitoring dashboard for dark web activities, credentials, data leaks, and attack planning discussions',
        type: 'Monitoring Platform',
        path: '/tools/dark-web-monitor',
        icon: Globe,
        frameworks: ['Threat Intelligence', 'OSINT'],
        time: 'Continuous',
        interactive: true
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
        description: 'Interactive assessment tool evaluating your ransomware preparedness with actionable remediation guidance',
        type: 'Assessment Tool',
        path: '/tools/ransomware-assessment',
        icon: Shield,
        frameworks: ['NIST CSF', 'NIST IR 8374'],
        time: '15 min',
        featured: true,
        interactive: true
      },
      {
        name: 'Backup Integrity Validator',
        description: 'Automated testing platform for validating backup systems to ensure rapid recovery capabilities',
        type: 'Validation Platform',
        path: '/tools/backup-validator',
        icon: Database,
        frameworks: ['NIST SP 800-34', 'Business Continuity'],
        time: '30 min',
        interactive: true
      },
      {
        name: 'Recovery Time Calculator',
        description: 'Interactive calculator to optimize your recovery time objectives (RTO) and recovery point objectives (RPO)',
        type: 'Planning Calculator',
        path: '/tools/recovery-calculator',
        icon: Calculator,
        frameworks: ['Business Continuity', 'Disaster Recovery'],
        time: '20 min',
        interactive: true
      },
      {
        name: 'Incident Response Simulator',
        description: 'Interactive ransomware incident simulation for response team training and preparedness testing',
        type: 'Simulation Tool',
        path: '/tools/incident-simulator',
        icon: Zap,
        frameworks: ['NIST SP 800-61', 'Incident Response'],
        time: '45 min',
        interactive: true
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
        description: 'Automated security assessment dashboard for vendors and suppliers with continuous monitoring and risk scoring',
        type: 'Risk Assessment Platform',
        path: '/tools/vendor-scorecard',
        icon: BarChart3,
        frameworks: ['NIST SP 800-161', 'Supply Chain Security'],
        time: '25 min',
        interactive: true
      },
      {
        name: 'Supply Chain Risk Calculator',
        description: 'Interactive calculator for quantifying supply chain risks and critical dependency identification',
        type: 'Risk Calculator',
        path: '/tools/supply-chain-calculator',
        icon: Calculator,
        frameworks: ['Supply Chain Risk Management'],
        time: '30 min',
        interactive: true
      },
      {
        name: 'Third-Party Breach Monitor',
        description: 'Real-time monitoring dashboard for security incidents affecting your vendors and supply chain partners',
        type: 'Monitoring Dashboard',
        path: '/tools/vendor-breach-monitor',
        icon: AlertTriangle,
        frameworks: ['Continuous Monitoring'],
        time: 'Real-time',
        interactive: true
      },
      {
        name: 'Vendor Onboarding Wizard',
        description: 'Interactive workflow system for streamlined security assessment of new vendors with automated questionnaires',
        type: 'Workflow Platform',
        path: '/tools/vendor-onboarding',
        icon: Users,
        frameworks: ['Vendor Management'],
        time: '35 min',
        interactive: true
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
        name: 'NIST CSF Implementation Wizard',
        description: 'Interactive implementation wizard for NIST Cybersecurity Framework with guided workflows and automated setup',
        type: 'Implementation Platform',
        path: '/tools/nist-csf-wizard',
        icon: Award,
        frameworks: ['NIST CSF', 'NIST SP 800-53'],
        time: '60 min setup',
        interactive: true
      },
      {
        name: 'Compliance Gap Analyzer',
        description: 'Interactive analysis tool to identify compliance gaps and generate prioritized remediation roadmaps',
        type: 'Analysis Platform',
        path: '/tools/compliance-gaps',
        icon: Target,
        frameworks: ['Compliance Management'],
        time: '45 min',
        interactive: true
      },
      {
        name: 'Multi-Framework Control Mapper',
        description: 'Interactive mapping platform for cross-referencing security controls between NIST CSF, ISO 27001, SOC 2, and other frameworks',
        type: 'Mapping Platform',
        path: '/tools/control-mapper',
        icon: Link2,
        frameworks: ['Multiple Frameworks'],
        time: '30 min',
        interactive: true
      },
      {
        name: 'Audit Readiness Dashboard',
        description: 'Real-time compliance posture monitoring dashboard with automated audit trail generation and evidence collection',
        type: 'Monitoring Dashboard',
        path: '/tools/audit-dashboard',
        icon: Monitor,
        frameworks: ['Audit Management'],
        time: 'Continuous',
        interactive: true
      }
    ]
  },
  {
    id: 'risk-analytics',
    title: 'Advanced Risk Analytics',
    description: 'AI-powered risk assessment and management tools for comprehensive organizational risk visibility',
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    badge: 'Analytics',
    tools: [
      {
        name: 'Risk Register Intelligence',
        description: 'AI-enhanced risk identification and management platform with automated risk scoring and treatment recommendations',
        type: 'Risk Management Platform',
        path: '/tools/risk-register',
        icon: ClipboardList,
        frameworks: ['NIST RMF', 'ISO 31000'],
        time: '50 min',
        interactive: true
      },
      {
        name: 'Business Impact Calculator',
        description: 'Interactive calculator to quantify the financial and operational impact of security incidents on critical business functions',
        type: 'Impact Calculator',
        path: '/tools/business-impact',
        icon: Building2,
        frameworks: ['Business Continuity', 'Risk Assessment'],
        time: '35 min',
        interactive: true
      },
      {
        name: 'Risk Heat Map Generator',
        description: 'Interactive risk visualization platform with dynamic heat maps for executive reporting and decision making',
        type: 'Visualization Platform',
        path: '/tools/risk-heatmap',
        icon: Activity,
        frameworks: ['Risk Visualization'],
        time: '20 min',
        interactive: true
      },
      {
        name: 'Scenario Planning Simulator',
        description: 'Interactive scenario planning platform for testing organizational resilience and response capabilities',
        type: 'Planning Simulator',
        path: '/tools/scenario-planning',
        icon: Layers,
        frameworks: ['Scenario Analysis', 'Crisis Management'],
        time: '90 min',
        interactive: true
      }
    ]
  },
  {
    id: 'incident-response',
    title: 'Rapid Response Toolkit',
    description: 'Pre-configured incident response tools and automated workflow systems for swift containment and recovery',
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    badge: 'Rapid Deploy',
    tools: [
      {
        name: 'Incident Response Orchestrator',
        description: 'Centralized platform for managing security incidents with automated workflows and team coordination',
        type: 'Orchestration Platform',
        path: '/tools/incident-orchestrator',
        icon: Settings,
        frameworks: ['NIST SP 800-61', 'Incident Response'],
        time: '20 min setup',
        interactive: true
      },
      {
        name: 'Tabletop Exercise Builder',
        description: 'Interactive platform for creating and conducting cybersecurity tabletop exercises with realistic scenarios',
        type: 'Training Platform',
        path: '/tools/tabletop-exercises',
        icon: GraduationCap,
        frameworks: ['NIST IR 8374', 'Training'],
        time: '120 min',
        interactive: true
      },
      {
        name: 'Crisis Communication Hub',
        description: 'Interactive communication platform for stakeholders, media, and regulatory notifications during incidents',
        type: 'Communication Platform',
        path: '/tools/crisis-comms',
        icon: Mail,
        frameworks: ['Crisis Management'],
        time: '15 min',
        interactive: true
      },
      {
        name: 'Evidence Collection Tracker',
        description: 'Digital forensics platform for evidence collection and chain of custody management',
        type: 'Forensics Platform',
        path: '/tools/evidence-collection',
        icon: Search,
        frameworks: ['Digital Forensics', 'Legal'],
        time: '60 min',
        interactive: true
      }
    ]
  }
];

// Featured interactive tools
const cyberCautionFeaturedTools = [
  {
    title: 'Ransomware Readiness Assessment',
    description: 'Industry-leading interactive ransomware preparedness evaluation with NIST-aligned recommendations and actionable insights',
    icon: Shield,
    color: 'text-critical-red',
    path: '/tools/ransomware-assessment',
    badge: 'Most Popular',
    isNew: false,
    isPopular: true,
    isUpdated: false,
    time: '15 min',
    interactive: true
  },
  {
    title: 'Threat Weather Dashboard',
    description: 'Real-time threat intelligence platform providing predictive risk analytics for your industry sector',
    icon: TrendingUp,
    color: 'text-warning-amber',
    path: '/tools/threat-weather',
    badge: 'AI-Powered',
    isNew: true,
    isPopular: false,
    isUpdated: false,
    time: '5 min',
    interactive: true
  },
  {
    title: 'NIST CSF Implementation Wizard',
    description: 'Interactive cybersecurity framework implementation wizard with automated gap analysis and roadmap generation',
    icon: Award,
    color: 'text-electric-blue',
    path: '/tools/nist-csf-wizard',
    badge: 'Updated',
    isNew: false,
    isPopular: false,
    isUpdated: true,
    time: '60 min',
    interactive: true
  }
];

const ToolkitPage = () => {
  // Remove all complex database logic and use simple fallback
  const [loading, setLoading] = useState(true);

  // Simple timeout to simulate loading, then show content
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Always use the CyberCaution interactive tools content
  const displayToolCategories = cyberCautionToolCategories;
  const displayFeaturedTools = cyberCautionFeaturedTools;

  console.log('ToolkitPage: Using CyberCaution interactive tools content');
  console.log('Tool Categories:', displayToolCategories.length);
  console.log('Featured tools:', displayFeaturedTools.length);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading CyberCaution Security Toolkit...</p>
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
            <p className="text-xl text-orange-500 mb-4">
              Interactive cybersecurity tools and assessments<br />powered by threat intelligence and AI analytics
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hands-on security tools, calculators, dashboards, and automation platforms for comprehensive risk management
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Tools */}
        <AnimatedSection type="fadeIn" delay={0.1}>
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Interactive Tools</h2>
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
                        <div className="flex flex-col items-end space-y-1">
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
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{tool.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1">{tool.description}</p>
                      {tool.time && (
                        <div className="flex items-center text-sm text-primary mb-4">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{tool.time}</span>
                        </div>
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
              {(category.tools || []).map((tool, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {tool.type || 'Interactive Tool'}
                        </span>
                        <div className="flex items-center space-x-2">
                          {tool.interactive && (
                            <div className="flex items-center text-xs text-secure-green">
                              <Gauge className="h-3 w-3 mr-1" />
                              Interactive
                            </div>
                          )}
                          {tool.path === '/login' && (
                            <Lock className="h-4 w-4 text-warning-amber" />
                          )}
                          {tool.featured && (
                            <span className="text-xs bg-secure-green/10 text-secure-green px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
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
                        <div className="flex items-center text-sm text-primary mb-4">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{tool.time}</span>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Link to={tool.path || '/login'} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Wrench className="mr-2 h-4 w-4" />
                            {tool.path === '/login' ? 'Premium Tool' : 'Launch Tool'}
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" title="Export Results">
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

        {/* Quick Launch */}
        <AnimatedSection type="fadeIn" delay={0.6}>
          <Card className="bg-muted/30 dark:bg-muted/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Quick Launch Tools</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/tools/ransomware-assessment">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Shield className="h-5 w-5 mb-2" />
                    <span className="text-xs">Ransomware Check</span>
                  </Button>
                </Link>
                <Link to="/tools/threat-weather">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <TrendingUp className="h-5 w-5 mb-2" />
                    <span className="text-xs">Threat Weather</span>
                  </Button>
                </Link>
                <Link to="/tools/vendor-scorecard">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Network className="h-5 w-5 mb-2" />
                    <span className="text-xs">Vendor Risk</span>
                  </Button>
                </Link>
                <Link to="/tools/nist-csf-wizard">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Award className="h-5 w-5 mb-2" />
                    <span className="text-xs">NIST CSF</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Tool Benefits Section */}
        <AnimatedSection type="fadeIn" delay={0.7}>
          <Card className="bg-gradient-to-r from-primary/5 to-orange-500/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose CyberCaution Tools?</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our interactive security tools are designed for immediate impact and continuous improvement
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Gauge className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Interactive & Real-Time</h3>
                  <p className="text-muted-foreground">
                    All tools provide immediate results with interactive dashboards, real-time analytics, and actionable insights
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered Intelligence</h3>
                  <p className="text-muted-foreground">
                    Machine learning algorithms provide predictive analytics, automated risk scoring, and intelligent recommendations
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Framework-Aligned</h3>
                  <p className="text-muted-foreground">
                    Every tool aligns with industry frameworks like NIST CSF, ensuring compliance and best practices
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection type="fadeIn" delay={0.8}>
          <div className="text-center mt-16">
            <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Launch Your Security Tools?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Start with our most popular interactive assessment tools and build your comprehensive security program
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/tools/ransomware-assessment">
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