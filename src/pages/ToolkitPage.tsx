import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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
  Activity
} from 'lucide-react';

const ToolkitPage = () => {
  // Simple fade-in animation component using Tailwind classes
  const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <div 
      className="opacity-0 animate-fade-in-up"
      style={{ 
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );

  // Tool categories aligned with CyberCaution's core capabilities
  const toolCategories = [
    {
      name: "Security Tool Integration Hub",
      description: "Connect and orchestrate your existing security infrastructure",
      tools: [
        {
          id: 'integration-manager',
          title: 'Integration Manager',
          description: 'Connect SIEM, EDR, vulnerability scanners, and other security tools into a unified platform',
          icon: Link2,
          path: '/tools/integration-manager',
          color: 'bg-blue-500/10',
          iconColor: 'text-blue-500'
        },
        {
          id: 'api-connector',
          title: 'API Connector Studio',
          description: 'Build custom integrations with your security tools using our visual API builder',
          icon: GitBranch,
          path: '/tools/api-connector',
          color: 'bg-indigo-500/10',
          iconColor: 'text-indigo-500'
        },
        {
          id: 'data-normalizer',
          title: 'Data Normalization Engine',
          description: 'Standardize data formats across different security tools for unified analytics',
          icon: Database,
          path: '/tools/data-normalizer',
          color: 'bg-purple-500/10',
          iconColor: 'text-purple-500'
        }
      ]
    },
    {
      name: "Workflow Orchestration",
      description: "Automate and streamline security operations",
      tools: [
        {
          id: 'workflow-designer',
          title: 'Security Workflow Designer',
          description: 'Visual workflow builder for automated incident response and security operations',
          icon: Workflow,
          path: '/tools/workflow-designer',
          color: 'bg-orange-500/10',
          iconColor: 'text-orange-500'
        },
        {
          id: 'playbook-automation',
          title: 'Playbook Automation Engine',
          description: 'Pre-built and customizable security playbooks aligned with NIST incident response',
          icon: Zap,
          path: '/tools/playbook-automation',
          color: 'bg-amber-500/10',
          iconColor: 'text-amber-500'
        },
        {
          id: 'orchestration-dashboard',
          title: 'Orchestration Dashboard',
          description: 'Real-time monitoring and control of automated security workflows',
          icon: Activity,
          path: '/tools/orchestration-dashboard',
          color: 'bg-green-500/10',
          iconColor: 'text-green-500'
        }
      ]
    },
    {
      name: "Governance & Compliance Framework",
      description: "Policy management and regulatory compliance tools",
      tools: [
        {
          id: 'policy-orchestrator',
          title: 'Policy Orchestrator',
          description: 'Centralized policy creation, distribution, and enforcement across your organization',
          icon: FileText,
          path: '/tools/policy-orchestrator',
          color: 'bg-teal-500/10',
          iconColor: 'text-teal-500'
        },
        {
          id: 'compliance-mapper',
          title: 'Compliance Mapping Engine',
          description: 'Map controls across NIST, ISO, SOC2, HIPAA, and other frameworks',
          icon: CheckCircle,
          path: '/tools/compliance-mapper',
          color: 'bg-green-500/10',
          iconColor: 'text-green-500'
        },
        {
          id: 'governance-scorecard',
          title: 'Governance Scorecard',
          description: 'Track policy adherence and compliance metrics across your security program',
          icon: Gauge,
          path: '/tools/governance-scorecard',
          color: 'bg-blue-500/10',
          iconColor: 'text-blue-500'
        },
        {
          id: 'audit-automation',
          title: 'Audit Automation Suite',
          description: 'Automated evidence collection and audit preparation across integrated tools',
          icon: ClipboardCheck,
          path: '/tools/audit-automation',
          color: 'bg-pink-500/10',
          iconColor: 'text-pink-500'
        }
      ]
    },
    {
      name: "Analytics & Intelligence Overlay",
      description: "Aggregate and analyze data from all connected security tools",
      tools: [
        {
          id: 'unified-analytics',
          title: 'Unified Security Analytics',
          description: 'Cross-platform analytics dashboard aggregating data from all integrated tools',
          icon: BarChart3,
          path: '/tools/unified-analytics',
          color: 'bg-blue-500/10',
          iconColor: 'text-blue-500'
        },
        {
          id: 'threat-correlation',
          title: 'Threat Correlation Engine',
          description: 'AI-powered correlation of threats across multiple security data sources',
          icon: Brain,
          path: '/tools/threat-correlation',
          color: 'bg-indigo-500/10',
          iconColor: 'text-indigo-500'
        },
        {
          id: 'risk-aggregator',
          title: 'Risk Score Aggregator',
          description: 'Consolidated risk scoring across vulnerabilities, threats, and compliance gaps',
          icon: TrendingUp,
          path: '/tools/risk-aggregator',
          color: 'bg-amber-500/10',
          iconColor: 'text-amber-500'
        },
        {
          id: 'executive-reporting',
          title: 'Executive Reporting Suite',
          description: 'Automated board-ready reports with data from all integrated security tools',
          icon: FileText,
          path: '/tools/executive-reporting',
          color: 'bg-purple-500/10',
          iconColor: 'text-purple-500'
        }
      ]
    },
    {
      name: "Human-Centric Security Training",
      description: "Integrated training aligned with technical controls",
      tools: [
        {
          id: 'training-orchestrator',
          title: 'Training Orchestrator',
          description: 'Automated security awareness training triggered by security events and policy changes',
          icon: BookOpen,
          path: '/tools/training-orchestrator',
          color: 'bg-green-500/10',
          iconColor: 'text-green-500'
        },
        {
          id: 'phishing-simulator',
          title: 'Phishing Simulation Platform',
          description: 'Integrated phishing tests with automated training for failed attempts',
          icon: Eye,
          path: '/tools/phishing-simulator',
          color: 'bg-orange-500/10',
          iconColor: 'text-orange-500'
        },
        {
          id: 'role-based-training',
          title: 'Role-Based Training Engine',
          description: 'Customized security training paths based on job roles and access levels',
          icon: UserCheck,
          path: '/tools/role-based-training',
          color: 'bg-teal-500/10',
          iconColor: 'text-teal-500'
        }
      ]
    },
    {
      name: "Assessment & Benchmarking",
      description: "Professional assessment tools with industry benchmarks",
      tools: [
        {
          id: 'maturity-assessment',
          title: 'Security Maturity Assessment',
          description: 'NIST CSF-aligned maturity assessment with industry benchmarking',
          icon: Shield,
          path: '/tools/maturity-assessment',
          color: 'bg-green-500/10',
          iconColor: 'text-green-500'
        },
        {
          id: 'gap-analysis',
          title: 'Gap Analysis Engine',
          description: 'Automated gap identification across technical controls and governance',
          icon: Calculator,
          path: '/tools/gap-analysis',
          color: 'bg-blue-500/10',
          iconColor: 'text-blue-500'
        },
        {
          id: 'vendor-assessment',
          title: 'Vendor Risk Assessment',
          description: 'Third-party risk assessment integrated with your vendor management systems',
          icon: Building2,
          path: '/tools/vendor-assessment',
          color: 'bg-pink-500/10',
          iconColor: 'text-pink-500'
        }
      ]
    }
  ];

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
                  <div key={tool.id} className="cursor-pointer" onClick={() => console.log(`Navigate to ${tool.path}`)}>
                    <Card className="h-full hover:shadow-lg transition-shadow border dark:border-muted">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                          <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-foreground">{tool.title}</h3>
                        <p className="text-muted-foreground mb-4">{tool.description}</p>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="mt-auto">
                            Open Tool
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
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