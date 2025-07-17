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
  ArrowRight
} from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';

const ToolkitPage = () => {
  const tools = [
    {
      id: 'threat-weather',
      title: 'Threat Weather Dashboard',
      description: 'Real-time threat intelligence monitoring and analysis for your industry',
      icon: Eye,
      path: '/tools/threat-weather',
      color: 'bg-critical-red/10',
      iconColor: 'text-critical-red'
    },
    {
      id: 'predictive-analytics',
      title: 'Predictive Breach Analytics',
      description: 'AI-powered vulnerability prediction and risk forecasting',
      icon: Brain,
      path: '/tools/predictive-analytics',
      color: 'bg-electric-blue/10',
      iconColor: 'text-electric-blue'
    },
    {
      id: 'nist-csf-wizard',
      title: 'NIST CSF Toolkit',
      description: 'Comprehensive framework implementation guidance and tracking',
      icon: Shield,
      path: '/tools/nist-csf-wizard',
      color: 'bg-secure-green/10',
      iconColor: 'text-secure-green'
    },
    {
      id: 'vendor-scorecard',
      title: 'Vendor Security Scorecard',
      description: 'Assess and monitor third-party security risks',
      icon: Building2,
      path: '/tools/vendor-scorecard',
      color: 'bg-warning-amber/10',
      iconColor: 'text-warning-amber'
    },
    {
      id: 'business-impact',
      title: 'Business Impact Calculator',
      description: 'Quantify financial impact of cybersecurity incidents',
      icon: Calculator,
      path: '/tools/business-impact',
      color: 'bg-purple-500/10',
      iconColor: 'text-purple-500'
    },
    {
      id: 'industry-threats',
      title: 'Industry Threat Profiler',
      description: 'Sector-specific threat intelligence and attack pattern analysis',
      icon: Network,
      path: '/tools/industry-threats',
      color: 'bg-pink-500/10',
      iconColor: 'text-pink-500'
    },
    {
      id: 'dark-web-monitor',
      title: 'Dark Web Monitoring',
      description: 'Continuous surveillance for credential leaks and organizational threats',
      icon: Eye,
      path: '/tools/dark-web-monitor',
      color: 'bg-indigo-500/10',
      iconColor: 'text-indigo-500'
    },
    {
      id: 'policy-generator',
      title: 'Big 5 Policy Generator',
      description: 'Create customized cybersecurity policies for your organization',
      icon: FileText,
      path: '/tools/policy-generator',
      color: 'bg-teal-500/10',
      iconColor: 'text-teal-500'
    },
    {
      id: 'incident-orchestrator',
      title: 'Incident Response Playbooks',
      description: 'NIST-based ransomware response procedures with real-time tracking',
      icon: Zap,
      path: '/tools/incident-orchestrator',
      color: 'bg-orange-500/10',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection type="fadeIn">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-foreground">CyberCaution Security Toolkit</h1>
          <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-4">
            Professional-grade cybersecurity tools for every organization
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This comprehensive toolkit provides powerful security assessment, monitoring, 
            and planning capabilities aligned with NIST and CISA frameworks.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection type="fadeIn" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <Link to={tool.path} key={tool.id}>
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
            </Link>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection type="fadeIn" delay={0.2}>
        <Card className="bg-primary/5 border border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-medium">CISA-Aligned Security Tools</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              These tools are aligned with CISA's Cross-Sector Cybersecurity Performance Goals (CPGs) 
              and NIST frameworks to help organizations improve their security posture against evolving threats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2 text-foreground">Assessment</h4>
                <p className="text-sm text-muted-foreground">Evaluate your current security posture and identify gaps</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2 text-foreground">Monitoring</h4>
                <p className="text-sm text-muted-foreground">Real-time threat detection and intelligence gathering</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2 text-foreground">Response</h4>
                <p className="text-sm text-muted-foreground">Preparation and planning for security incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
};

export default ToolkitPage;