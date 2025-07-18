import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { 
  Shield, 
  AlertTriangle, 
  BarChart3, 
  Network, 
  FileText, 
  Users, 
  Lock, 
  Database, 
  Eye,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Clock,
  Lightbulb
} from 'lucide-react';

const Features = () => {
  return (
    <div className="py-20">
      
      {/* Hero Section */}
<AnimatedSection type="fadeIn" className="mb-16 text-center px-4 md:px-6">
  <h1 className="text-4xl font-bold mb-4 text-foreground">CyberCaution™ Features</h1>
  <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-4">
    Security Orchestration &amp; Governance Platform for Proactive Risk Management
  </p>
  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
    NIST-Aligned, Integrated Platform for Cyber Risk Orchestration &amp; Governance
  </p>
</AnimatedSection>
     

      {/* Core Capabilities Section */}
      <AnimatedSection type="fadeIn" delay={0.1} className="mb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Core Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform delivers integrated security assessment, monitoring, and response capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedItem type="fadeIn" delay={0.2}>
              <Card className="h-full hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="bg-orange-500/10 p-3 rounded-lg inline-block mb-4">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Ransomware Readiness</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive assessment and protection against ransomware threats with CISA-aligned controls.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>NIST-aligned assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Customized defense playbooks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tabletop exercises</span>
                    </li>
                  </ul>
                  <Link to="/ransomware-assessment">
                    <Button variant="orange" size="sm" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.3}>
              <Card className="h-full hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="bg-electric-blue/10 p-3 rounded-lg inline-block mb-4">
                    <Network className="h-6 w-6 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Vendor Risk Radar</h3>
                  <p className="text-muted-foreground mb-4">
                    Continuous monitoring and assessment of your third-party vendor security posture.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Supply chain risk assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Vendor security scorecards</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Continuous monitoring</span>
                    </li>
                  </ul>
                  <Link to="/supply-chain-assessment">
                    <Button variant="orange" size="sm" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.4}>
              <Card className="h-full hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="bg-secure-green/10 p-3 rounded-lg inline-block mb-4">
                    <BarChart3 className="h-6 w-6 text-secure-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Compliance Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Streamlined compliance management with framework mapping and gap analysis.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>NIST CSF 2.0 alignment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Compliance gap analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Policy management</span>
                    </li>
                  </ul>
                  <Link to="/nist-csf-alignment">
                    <Button variant="orange" size="sm" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* NIST Framework Section */}
      <AnimatedSection type="fadeIn" delay={0.2} className="bg-muted/30 dark:bg-muted/10 py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                Framework-Aligned Security
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">NIST Framework Alignment</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              All features are aligned with NIST frameworks and industry best practices to ensure comprehensive and effective security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedItem type="slideInLeft" delay={0.1}>
              <Card className="hover:shadow-lg transition-all duration-300 dark:border-muted">
                <CardContent className="p-6">
                  <Shield className="h-10 w-10 text-[#FF6B00] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground">NIST CSF 2.0</h3>
                  <p className="text-muted-foreground mb-4">
                    Align your security program with the NIST Cybersecurity Framework to build a comprehensive security foundation.
                  </p>
                  <Link to="/nist-csf-alignment">
                    <Button variant="orange" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="slideInLeft" delay={0.2}>
              <Card className="hover:shadow-lg transition-all duration-300 dark:border-muted">
                <CardContent className="p-6">
                  <AlertTriangle className="h-10 w-10 text-[#FF6B00] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground">NIST IR 8374</h3>
                  <p className="text-muted-foreground mb-4">
                    Implement specific controls to protect against ransomware following NIST's specialized guidance.
                  </p>
                  <Link to="/ransomware-assessment">
                    <Button variant="orange" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="slideInLeft" delay={0.3}>
              <Card className="hover:shadow-lg transition-all duration-300 dark:border-muted">
                <CardContent className="p-6">
                  <Network className="h-10 w-10 text-[#FF6B00] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground">NIST SP 800-161</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure your supply chain following NIST's supply chain risk management practices.
                  </p>
                  <Link to="/supply-chain-assessment">
                    <Button variant="orange" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* Advanced Security Tools Section */}
      <AnimatedSection type="fadeIn" delay={0.3} className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Advanced Security Tools</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade security tools to assess, monitor, and protect your organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedItem type="fadeIn" delay={0.1}>
              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-electric-blue/10 p-3 rounded-lg mr-4">
                      <Lock className="h-6 w-6 text-electric-blue" />
                    </div>
                    <h3 className="text-xl font-semibold">Zero Trust Maturity</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Assess and improve your zero trust implementation across identity, device, network, application, and data pillars.
                  </p>
                  <Link to="/zero-trust-maturity-assessment">
                    <Button variant="outline" className="w-full">
                      Evaluate Maturity
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.2}>
              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-warning-amber/10 p-3 rounded-lg mr-4">
                      <Database className="h-6 w-6 text-warning-amber" />
                    </div>
                    <h3 className="text-xl font-semibold">Backup Readiness</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Evaluate your backup and recovery capabilities against ransomware threats following CISA's guidance.
                  </p>
                  <Link to="/backup-readiness-assessment">
                    <Button variant="outline" className="w-full">
                      Check Readiness
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.3}>
              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-critical-red/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-critical-red" />
                    </div>
                    <h3 className="text-xl font-semibold">Incident Response</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Develop and test comprehensive incident response plans for various cybersecurity scenarios.
                  </p>
                  <Link to="/incident-response-plan-assessment">
                    <Button variant="outline" className="w-full">
                      Build Response Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.4}>
              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-secure-green/10 p-3 rounded-lg mr-4">
                      <Eye className="h-6 w-6 text-secure-green" />
                    </div>
                    <h3 className="text-xl font-semibold">Vulnerability Management</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Implement a robust vulnerability management program aligned with CISA BOD 22-01 requirements.
                  </p>
                  <Link to="/vulnerability-management-assessment">
                    <Button variant="outline" className="w-full">
                      Assess Vulnerability Management
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* Key Benefits Section */}
      <AnimatedSection type="fadeIn" delay={0.4} className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Key Benefits of CyberCaution</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover why security professionals choose CyberCaution for comprehensive protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedItem type="fadeIn" delay={0.1}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Proactive Defense</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Move beyond reactive security measures with predictive threat analysis and prevention. Our proactive approach helps organizations prevent incidents before they occur.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Predictive threat intelligence</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Automated risk detection</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Continuous monitoring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.2}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Rapid Implementation</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Get up and running quickly with our streamlined implementation process. Pre-configured templates and automated workflows reduce deployment time significantly.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Quick-start templates</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Automated configuration</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Expert implementation support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.3}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Zap className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Measurable ROI</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Demonstrate clear return on investment with quantifiable security improvements. Track metrics that matter to your business and show tangible security value.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Cost reduction analytics</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Risk reduction measurement</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Executive reporting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" delay={0.5} className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Strengthen Your Cybersecurity Posture?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Start with a free assessment or schedule a demo to see our features in action
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/demo">
                  <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/ransomware-assessment">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Start Free Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Features;