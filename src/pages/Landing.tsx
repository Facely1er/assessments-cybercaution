import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  Link2,
  Building2,
  Globe,
  Users,
  Lock,
  FileText,
  BarChart3,
  Fingerprint,
  Database,
  ClipboardList,
  Target,
  TrendingUp,
  Heart
} from 'lucide-react';

// Simple animated counter component for statistics
const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(progress * target);
      
      if (frame === totalFrames) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [target]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Landing = () => {
  // Floating element animation styles
  const floatingElements = [
    { icon: Lock, delay: 0, top: '20%', left: '15%', size: 'h-10 w-10' },
    { icon: CheckCircle, delay: 1000, top: '30%', right: '10%', size: 'h-8 w-8' },
    { icon: BarChart3, delay: 2000, bottom: '25%', left: '10%', size: 'h-12 w-12' },
  ];

  return (
    <div className="animate-in fade-in">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background dark:from-primary/15 dark:to-background z-10"></div>
          <div className="hero-background"></div>
        </div>
        
        {/* Floating animated elements */}
        {floatingElements.map((element, index) => (
          <div 
            key={index}
            className={`absolute ${element.size} text-primary/30 dark:text-primary/40 animate-pulse`}
            style={{ 
              top: element.top || 'auto', 
              left: element.left || 'auto',
              right: element.right || 'auto', 
              bottom: element.bottom || 'auto',
              animationDelay: `${element.delay}ms`,
              animationDuration: '3s'
            }}
          >
            <element.icon className="w-full h-full" />
          </div>
        ))}
        
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              {/* NIST Badge */}
              <AnimatedItem delay={0.1}>
                <div className="inline-block mb-6">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                    🛡️ NIST CSF 2.0 Aligned
                  </span>
                </div>
              </AnimatedItem>
              
              <AnimatedItem delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                  Proactive <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Ransomware</span> Risk Management
                </h1>
              </AnimatedItem>
              
              <AnimatedItem delay={0.3}>
                <p className="text-xl text-orange-500 mb-8">
                  Comprehensive ransomware defense aligned with NIST CSF and IR 8374 frameworks
                </p>
              </AnimatedItem>
              
              <AnimatedItem delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ransomware-assessment">
                    <Button size="lg" variant="orange" className="w-full sm:w-auto">
                      Assess Your Ransomware Posture
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/nist-csf-alignment">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Get NIST-Aligned Playbook
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </AnimatedItem>
              
              {/* Stats cards */}
              <AnimatedItem delay={0.6}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                  <div className="bg-background/70 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-md">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter target={98} suffix="%" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Ransomware Attack Prevention</p>
                  </div>
                  <div className="bg-background/70 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-md">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter target={4} suffix="h" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Average Response Time</p>
                  </div>
                  <div className="bg-background/70 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-md">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter target={100} prefix="+" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Security Controls</p>
                  </div>
                </div>
              </AnimatedItem>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div>
                <h2 className="text-4xl font-bold mb-6">Don't Wait for the Next Attack</h2>
                <p className="text-xl text-orange-500 mb-6">
                  Proactive protection saves time, money, and reputation damage from ransomware attacks
                </p>
                <div className="space-y-6">
                  <AnimatedItem delay={0.1} direction="left">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-destructive/5 border-l-4 border-destructive">
                      <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Ransomware Attacks Continue Rising</h3>
                        <p className="text-muted-foreground">Organizations face increasing sophisticated threats requiring proactive defense strategies.</p>
                      </div>
                    </div>
                  </AnimatedItem>
                  
                  <AnimatedItem delay={0.2} direction="left">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-warning/5 border-l-4 border-warning">
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                        <Target className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Many Organizations Lack Adequate Preparedness</h3>
                        <p className="text-muted-foreground">Reactive approaches leave critical gaps in ransomware defense and incident response.</p>
                      </div>
                    </div>
                  </AnimatedItem>
                  
                  <AnimatedItem delay={0.3} direction="left">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-success/5 border-l-4 border-success">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Our Solution: Proactive NIST-Aligned Defense</h3>
                        <p className="text-muted-foreground">Comprehensive framework that prevents, detects, and responds to threats before damage occurs.</p>
                      </div>
                    </div>
                  </AnimatedItem>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-foreground">Security Posture Dashboard</h4>
                      <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                        🟢 Active Monitoring
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
                        <span className="text-sm font-medium">Email Security</span>
                        <span className="text-success font-bold">Protected</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <span className="text-sm font-medium">Network Monitoring</span>
                        <span className="text-primary font-bold">Active</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
                        <span className="text-sm font-medium">Backup Status</span>
                        <span className="text-accent font-bold">Verified</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-background to-background">
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Comprehensive Ransomware Defense</h2>
              <p className="text-xl mb-12 text-orange-500 max-w-2xl mx-auto">
                Protect your organization with enterprise-grade security aligned to industry standards
              </p>
              
              <AnimatedItem delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                  <div className="text-center p-6 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border">
                    <div className="text-5xl font-bold mb-2 text-foreground">NIST</div>
                    <p className="text-muted-foreground">Framework Aligned</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border">
                    <div className="text-5xl font-bold mb-2 text-foreground">24/7</div>
                    <p className="text-muted-foreground">Monitoring Available</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border">
                    <div className="text-5xl font-bold mb-2 text-foreground">Enterprise</div>
                    <p className="text-muted-foreground">Grade Security</p>
                  </div>
                </div>
              </AnimatedItem>
              
              {/* Additional features grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
                <AnimatedItem delay={0.2} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Shield className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Complete Ransomware Defense Suite</h3>
                      <p className="text-sm text-muted-foreground">Everything you need to identify, protect, detect, respond, and recover from ransomware threats</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.3} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <ClipboardList className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">NIST CSF Alignment</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive alignment with NIST Cybersecurity Framework v2.0 for standardized security practices</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.4} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Users className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Tabletop Exercise Kits</h3>
                      <p className="text-sm text-muted-foreground">Ready-to-use ransomware simulation exercises based on NIST IR 8374 best practices</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.5} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <FileText className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Ransomware Playbooks</h3>
                      <p className="text-sm text-muted-foreground">Generate customized incident response playbooks tailored to your organization's needs</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.6} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Link2 className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Risk Mapping</h3>
                      <p className="text-sm text-muted-foreground">Advanced risk mapping to NIST CSF ID.RA controls for comprehensive threat coverage</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.7} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Lock className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Proactive Defense</h3>
                      <p className="text-sm text-muted-foreground">Transform from reactive incident response to proactive threat prevention strategies</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.8} direction="up" className="md:col-span-2">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left md:col-span-2">
                    <BarChart3 className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Automated Reporting</h3>
                      <p className="text-sm text-muted-foreground">Generate comprehensive compliance reports for executives and regulatory requirements</p>
                    </div>
                  </div>
                </AnimatedItem>
              </div>
              
              <AnimatedItem delay={0.9} scale={true}>
                <Button size="lg" variant="orange">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Learn More About Our Approach
                </Button>
              </AnimatedItem>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="py-20 bg-muted/30 dark:bg-muted/15">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose CyberCaution</h2>
              <p className="text-xl text-orange-500 max-w-2xl mx-auto">
                Built specifically for cybersecurity professionals who demand excellence
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedItem delay={0.1} direction="up">
              <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">NIST CSF 2.0 Compliance</h3>
                <p className="text-muted-foreground">
                  Full alignment with the latest NIST Cybersecurity Framework for comprehensive protection.
                </p>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem delay={0.2} direction="up">
              <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Proactive Approach</h3>
                <p className="text-muted-foreground">
                  Move beyond reactive measures with predictive threat analysis and prevention.
                </p>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem delay={0.3} direction="up">
              <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Executive Reporting</h3>
                <p className="text-muted-foreground">
                  Clear, actionable insights for both technical teams and executive leadership.
                </p>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </section>

      {/* Primary Assessment CTAs Section - Enhanced */}
      <section className="py-16 bg-muted/30 dark:bg-muted/15">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Ransomware Defense Tools</h2>
            <p className="text-xl text-orange-500 text-center mb-12 max-w-2xl mx-auto">
              Essential tools to protect, detect, and recover from ransomware threats
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto primary-assessments">
            <AnimatedItem delay={0.1} direction="left">
              <Card className="hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-l-4 border-l-destructive">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-destructive/10 dark:bg-destructive/20 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Ransomware Assessment</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Evaluate your organization's readiness against ransomware threats using NIST's ransomware risk management guidelines (IR 8374).
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-sm">Identify security control gaps</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-sm">Benchmark against industry standards</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-sm">Get actionable recommendations</span>
                    </div>
                  </div>
                  
                  <Link to="/ransomware-assessment">
                    <Button className="w-full group" variant="orange">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>

            <AnimatedItem delay={0.2} direction="right">
              <Card className="hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <ClipboardList className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Risk Register Tool</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Map and manage ransomware risks using NIST CSF ID.RA controls for comprehensive risk management.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-sm">Structured risk documentation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-sm">Automated risk scoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-sm">Treatment tracking</span>
                    </div>
                  </div>
                  
                  <Link to="/app/risk-register">
                    <Button className="w-full group" variant="orange">
                      Manage Risks
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>

          {/* Additional Tools Section */}
          <div className="mt-16 additional-tools">
            <AnimatedSection delay={0.3}>
              <h3 className="text-xl font-semibold text-center mb-6 text-foreground">Additional Enterprise Risk Tools</h3>
            </AnimatedSection>
            
            <AnimatedItem delay={0.4} direction="up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-l-4 border-l-secondary assessment-card">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                        <Link2 className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">Supply Chain Assessment</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Assess and manage risks in your supply chain using NIST SP 800-161 guidelines.
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        <span className="text-sm">Vendor risk assessment</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        <span className="text-sm">Continuous monitoring</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        <span className="text-sm">Compliance verification</span>
                      </div>
                    </div>
                    
                    <Link to="/supply-chain-assessment">
                      <Button className="w-full group" variant="orange">
                        Start Assessment
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      For comprehensive supply chain assessments, visit <a href="https://vendortal.com" className="text-primary hover:underline">vendortal.com</a>
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-l-4 border-l-electric-blue assessment-card">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-electric-blue/10 dark:bg-electric-blue/20 rounded-lg">
                        <Building2 className="h-8 w-8 text-electric-blue" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">Business Impact Analysis</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Evaluate ransomware impact on business functions and operations to improve resilience.
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        <span className="text-sm">Critical function identification</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        <span className="text-sm">Impact quantification</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        <span className="text-sm">Recovery prioritization</span>
                      </div>
                    </div>
                    
                    <Link to="/app/business-impact">
                      <Button className="w-full group" variant="orange">
                        Analyze Business Impact
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </AnimatedItem>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="bg-[#FF6B00] rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Strengthen Your Ransomware Defense?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Assess your ransomware readiness in 30 minutes and get a customized NIST-aligned playbook
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ransomware-assessment">
                    <Button size="lg" variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                      Start Free Assessment
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Landing;