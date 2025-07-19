import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { toolRoutes, getToolsByCategory, ToolRoute } from '../routes/toolRoutes';
import { 
  AlertTriangle, 
  Eye, 
  Brain, 
  Shield, 
  Network, 
  Building2, 
  Users, 
  FileText, 
  Calculator, 
  Database,
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  GitBranch,
  Workflow,
  BarChart3,
  Link2,
  Settings,
  BookOpen,
  UserCheck,
  ClipboardCheck,
  TrendingUp,
  Gauge,
  Globe,
  Lock,
  Activity,
  Server,
  HardDrive
} from 'lucide-react';

const ToolkitPage = () => {
  // Simple fade-in animation component
  const AnimatedSection = ({ children, delay = 0 }) => (
    <div 
      className="opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards]"
      style={{ 
        animationDelay: `${delay}s`,
        animation: `fadeIn 0.6s ease-in-out ${delay}s forwards`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  // Dynamic tool categories from toolRoutes
  const categoryConfig = {
    integration: {
      name: "Security Tool Integration Hub",
      description: "Connect and orchestrate your existing security infrastructure",
      colorMap: {
        'integration-manager': { color: 'bg-blue-500/10', iconColor: 'text-blue-500' },
        'api-connector': { color: 'bg-indigo-500/10', iconColor: 'text-indigo-500' },
        'data-normalization-engine': { color: 'bg-purple-500/10', iconColor: 'text-purple-500' },
        'data-normalizer': { color: 'bg-purple-500/10', iconColor: 'text-purple-500' }
      }
    },
    orchestration: {
      name: "Workflow Orchestration",
      description: "Automate and streamline security operations",
      colorMap: {
        'workflow-designer': { color: 'bg-orange-500/10', iconColor: 'text-orange-500' },
        'workflow-orchestrator': { color: 'bg-orange-500/10', iconColor: 'text-orange-500' },
        'playbook-automation': { color: 'bg-amber-500/10', iconColor: 'text-amber-500' },
        'orchestration-dashboard': { color: 'bg-green-500/10', iconColor: 'text-green-500' }
      }
    },
    governance: {
      name: "Governance & Compliance Framework",
      description: "Policy management and regulatory compliance tools",
      colorMap: {
        'policy-orchestrator': { color: 'bg-teal-500/10', iconColor: 'text-teal-500' },
        'compliance-mapper': { color: 'bg-green-500/10', iconColor: 'text-green-500' },
        'governance-framework': { color: 'bg-blue-500/10', iconColor: 'text-blue-500' },
        'governance-scorecard': { color: 'bg-blue-500/10', iconColor: 'text-blue-500' },
        'audit-automation': { color: 'bg-pink-500/10', iconColor: 'text-pink-500' },
        'asset-manager': { color: 'bg-gray-500/10', iconColor: 'text-gray-500' }
      }
    },
    analytics: {
      name: "Analytics & Intelligence Overlay",
      description: "Aggregate and analyze data from all connected security tools",
      colorMap: {
        'unified-analytics': { color: 'bg-blue-500/10', iconColor: 'text-blue-500' },
        'analytics-overlay': { color: 'bg-blue-500/10', iconColor: 'text-blue-500' },
        'threat-correlation': { color: 'bg-indigo-500/10', iconColor: 'text-indigo-500' },
        'risk-aggregator': { color: 'bg-amber-500/10', iconColor: 'text-amber-500' },
        'executive-reporting': { color: 'bg-purple-500/10', iconColor: 'text-purple-500' },
        'industry-threat-profiler': { color: 'bg-indigo-500/10', iconColor: 'text-indigo-500' }
      }
    },
    training: {
      name: "Human-Centric Security Training",
      description: "Integrated training aligned with technical controls",
      colorMap: {
        'training-orchestrator': { color: 'bg-green-500/10', iconColor: 'text-green-500' },
        'security-training': { color: 'bg-green-500/10', iconColor: 'text-green-500' },
        'phishing-simulator': { color: 'bg-orange-500/10', iconColor: 'text-orange-500' },
        'role-based-training': { color: 'bg-teal-500/10', iconColor: 'text-teal-500' }
      }
    },
    assessment: {
      name: "Assessment & Benchmarking",
      description: "Professional assessment tools with industry benchmarks",
      colorMap: {
        'maturity-assessment': { color: 'bg-green-500/10', iconColor: 'text-green-500' },
        'gap-analysis': { color: 'bg-blue-500/10', iconColor: 'text-blue-500' },
        'vendor-assessment': { color: 'bg-pink-500/10', iconColor: 'text-pink-500' },
        'vendor-security-scorecard': { color: 'bg-pink-500/10', iconColor: 'text-pink-500' },
        'recovery-time-calculator': { color: 'bg-green-500/10', iconColor: 'text-green-500' }
      }
    }
  };

  // Generate tool categories dynamically from toolRoutes
  const toolCategories = Object.entries(categoryConfig).map(([categoryKey, config]) => {
    const tools = getToolsByCategory(categoryKey).map(toolRoute => {
      const colorConfig = config.colorMap[toolRoute.id] || { color: 'bg-gray-500/10', iconColor: 'text-gray-500' };
      return {
        id: toolRoute.id,
        title: toolRoute.name,
        description: toolRoute.description,
        icon: toolRoute.icon,
        path: toolRoute.path,
        color: colorConfig.color,
        iconColor: colorConfig.iconColor
      };
    });

    return {
      name: config.name,
      description: config.description,
      tools
    };
  }).filter(category => category.tools.length > 0); // Only include categories with tools

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
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

        <AnimatedSection delay={0.2}>
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{category.name}</h2>
              <p className="text-muted-foreground mb-6">{category.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool) => (
                  <div key={tool.id}>
                    <Card className="h-full hover:shadow-lg transition-shadow border dark:border-muted">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                          <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-foreground">{tool.title}</h3>
                        <p className="text-muted-foreground mb-4">{tool.description}</p>
                        <div className="flex justify-end">
                          <Link to={tool.path}>
                            <Button variant="ghost" size="sm" className="mt-auto">
                              Open Tool
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </AnimatedSection>

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
                <Button className="bg-primary hover:bg-primary/90">
                  Schedule Platform Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ToolkitPage;