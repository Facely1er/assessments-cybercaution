import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  AlertTriangle, 
  Network, 
  Clock, 
  CheckCircle, 
  Lock,
  FileText,
  Users,
  Database,
  Server,
  ArrowRight,
  Eye,
  ExternalLink,
  Zap
} from 'lucide-react';

const AssessmentsLanding = () => {
  const assessmentTools = [
    {
      id: 'ransomware',
      title: 'CISA Ransomware Readiness Assessment',
      description: 'Evaluate your organization\'s readiness to prevent, detect, respond to, and recover from ransomware attacks based on CISA guidance.',
      icon: AlertTriangle,
      path: '/ransomware-assessment',
      time: '30-45 minutes',
      framework: 'NIST IR 8374',
      popular: true,
      category: 'security'
    },
    {
      id: 'zero-trust',
      title: 'Zero Trust Maturity Assessment',
      description: 'Assess your organization\'s zero trust implementation maturity across the five pillars defined in CISA\'s Zero Trust Maturity Model.',
      icon: Lock,
      path: '/zero-trust-maturity-assessment',
      time: '25-35 minutes',
      framework: 'CISA Zero Trust Maturity Model',
      popular: true,
      category: 'security'
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Risk Assessment',
      description: 'Evaluate your organization\'s supply chain security posture and identify areas for improvement based on NIST SP 800-161.',
      icon: Network,
      path: '/supply-chain-assessment',
      time: '30-40 minutes',
      framework: 'NIST SP 800-161',
      popular: true,
      category: 'risk'
    },
    {
      id: 'network-segmentation',
      title: 'Network Segmentation Assessment',
      description: 'Assess your network segmentation practices to limit lateral movement during security incidents based on CISA guidance.',
      icon: Server,
      path: '/network-segmentation-assessment',
      time: '20-30 minutes',
      framework: 'CISA Network Segmentation Guide',
      popular: false,
      category: 'security'
    },
    {
      id: 'backup-readiness',
      title: 'Backup Readiness Assessment',
      description: 'Evaluate your backup systems and procedures to ensure recoverability from ransomware and other security incidents.',
      icon: Database,
      path: '/backup-readiness-assessment',
      time: '15-25 minutes',
      framework: 'CISA Ransomware Guide',
      popular: false,
      category: 'recovery'
    },
    {
      id: 'incident-response',
      title: 'Incident Response Plan Assessment',
      description: 'Assess the maturity and effectiveness of your organization\'s incident response capabilities.',
      icon: Zap,
      path: '/incident-response-plan-assessment',
      time: '25-35 minutes',
      framework: 'CISA Incident Response Guide',
      popular: false,
      category: 'response'
    },
    {
      id: 'vulnerability-management',
      title: 'Vulnerability Management Assessment',
      description: 'Evaluate your vulnerability management program against CISA best practices and guidance.',
      icon: Eye,
      path: '/vulnerability-management-assessment',
      time: '20-30 minutes',
      framework: 'CISA Vulnerability Management Guide',
      popular: false,
      category: 'security'
    },
    {
      id: 'tabletop',
      title: 'Tabletop Exercise Generator',
      description: 'Create and run tabletop exercises to test your incident response capabilities for ransomware and other security incidents.',
      icon: Users,
      path: '/tabletop-exercise',
      time: 'Varies',
      framework: 'CISA Tabletop Exercise Package',
      popular: true,
      category: 'training'
    },
    {
      id: 'nist-csf',
      title: 'NIST CSF Alignment Assessment',
      description: 'Evaluate your organization\'s alignment with the NIST Cybersecurity Framework and identify improvement areas.',
      icon: Shield,
      path: '/nist-csf-alignment',
      time: '40-60 minutes',
      framework: 'NIST CSF 2.0',
      popular: true,
      category: 'compliance'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Assessments' },
    { id: 'security', name: 'Security' },
    { id: 'risk', name: 'Risk Management' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'response', name: 'Incident Response' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'training', name: 'Training' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background/0 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">CyberCaution Assessment Portal</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Comprehensive assessment tools aligned with CISA and NIST guidance to strengthen your security posture.
            </p>
            
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-lg p-3 mb-8">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm text-primary font-medium">Official CISA Guidance Aligned</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm max-w-3xl mx-auto">
              <div className="bg-muted/30 rounded-lg p-3 flex items-center">
                <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0" />
                <span>NIST Framework Aligned</span>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 flex items-center">
                <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0" />
                <span>Interactive Evaluations</span>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 flex items-center">
                <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0" />
                <span>Detailed Reports</span>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 flex items-center">
                <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0" />
                <span>Actionable Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${category.id === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted hover:bg-muted/70 text-foreground'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Assessments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Assessments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assessmentTools
              .filter(tool => tool.popular)
              .map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow overflow-hidden border border-border">
                  <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-1">
                    <div className="bg-card p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-lg">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          <span>{tool.time}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      
                      <div className="flex items-center text-xs text-primary/80 mb-4">
                        <Shield className="h-3.5 w-3.5 mr-1.5" />
                        <span>{tool.framework}</span>
                      </div>
                      
                      <Link to={tool.path}>
                        <Button className="w-full">
                          Start Assessment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* All Assessments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">All Assessment Tools</h2>
          <div className="space-y-4">
            {assessmentTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-lg md:mt-1">
                      <tool.icon className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          <span>{tool.time}</span>
                        </div>
                        <div className="flex items-center text-primary/80">
                          <Shield className="h-3.5 w-3.5 mr-1.5" />
                          <span>{tool.framework}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 w-full md:w-auto">
                      <Link to={tool.path}>
                        <Button className="w-full md:w-auto">
                          Start Assessment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CISA Resources Section */}
        <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold mb-4 text-foreground">CISA Resources</h2>
              <p className="text-muted-foreground mb-4">
                These assessment tools are based on official guidance from the Cybersecurity and Infrastructure Security Agency (CISA) 
                and the National Institute of Standards and Technology (NIST).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <a 
                  href="https://www.cisa.gov/stopransomware" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-primary hover:underline"
                >
                  <span>CISA StopRansomware</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
                <a 
                  href="https://www.cisa.gov/zero-trust-maturity-model" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-primary hover:underline"
                >
                  <span>CISA Zero Trust</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
                <a 
                  href="https://www.cisa.gov/cross-sector-cybersecurity-performance-goals" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-primary hover:underline"
                >
                  <span>Cross-Sector CPGs</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
                <a 
                  href="https://www.nist.gov/cyberframework" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-primary hover:underline"
                >
                  <span>NIST Cybersecurity Framework</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white dark:bg-dark-surface shadow-sm dark:shadow-none p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Need Assistance?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Our team can help you interpret assessment results and implement recommended improvements.
                </p>
                <a href="https://www.cisa.gov/contact-us" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact CISA
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Process Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Assessment Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-5">
                <div className="bg-primary/10 dark:bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Select an Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the assessment tool that best fits your security needs and concerns.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="bg-primary/10 dark:bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Complete Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Answer a series of questions about your organization's security controls and practices.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="bg-primary/10 dark:bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Review Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get a detailed assessment of your security posture with strengths and improvement areas.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="bg-primary/10 dark:bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Implement Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Follow actionable recommendations to improve your security controls and reduce risk.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsLanding;