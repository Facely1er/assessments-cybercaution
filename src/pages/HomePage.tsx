 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import CisaSecurityBanner from '../components/CisaSecurityBanner';
import TextCarousel from '../components/TextCarousel';
import { SUBDOMAIN_URLS } from '../utils/navigation';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  Link2,
  Building2,
  Users,
  Lock,
  FileText,
  BarChart3,
  Lightbulb,
  Heart,
  Network,
  Target,
  Gauge,
  TrendingUp
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
        globalThis.clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);
    
    return () => globalThis.clearInterval(counter);
  }, [target]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const HomePage = () => {
  // Floating element animation styles
  const floatingElements = [
    { icon: Lock, delay: 0, top: '20%', left: '15%', size: 'h-10 w-10' },
    { icon: CheckCircle, delay: 1000, top: '30%', right: '10%', size: 'h-8 w-8' },
    { icon: BarChart3, delay: 2000, bottom: '25%', left: '10%', size: 'h-12 w-12' },
  ];

  // Fetch dynamic content from database
  const { data: carouselTexts, loading: carouselLoading } = useSupabaseQuery('carousel_texts', {
    filter: (query) => query.eq('active', true),
    orderBy: { column: 'order_index', ascending: true }
  });

  const { data: heroStats, loading: statsLoading } = useSupabaseQuery('hero_statistics', {
    filter: (query) => query.eq('active', true),
    orderBy: { column: 'order_index', ascending: true }
  });

  // Fallback text carousel content if database is not available
  const fallbackCarouselTexts = [
    {
      title: (
        <>
          Proactive <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Ransomware</span> Risk Management
        </>
      ),
      subtitle: "Comprehensive ransomware defense aligned with CISA and NIST recommendations"
    },
    {
      title: (
        <>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">CISA-Aligned</span> Security Framework
        </>
      ),
      subtitle: "Official #StopRansomware alignment providing government-grade protection"
    },
    {
      title: (
        <>
          Enterprise <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Risk Management</span>
        </>
      ),
      subtitle: "Complete visibility and control over your organization's security posture"
    },
    {
      title: (
        <>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Business Continuity</span> Protection
        </>
      ),
      subtitle: "Ensure operational resilience against evolving cyber threats"
    },
    {
      title: (
        <>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">NIST CSF</span> Implementation
        </>
      ),
      subtitle: "Streamlined compliance with industry-standard security frameworks"
    }
  ];

  // Process carousel texts from database or use fallback
  const processedCarouselTexts = !carouselLoading && carouselTexts?.length ? 
    carouselTexts.map(item => ({
      title: (
        <>
          {item.title.split(' ').map((word, index) => {
            // Highlight key security terms
            const highlightWords = ['Ransomware', 'CISA-Aligned', 'Risk', 'Management', 'Security', 'NIST', 'CSF', 'Enterprise', 'Business', 'Continuity'];
            if (highlightWords.some(hw => word.includes(hw))) {
              return (
                <span key={index} className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </>
      ),
      subtitle: item.subtitle
    })) : fallbackCarouselTexts;

  // Fallback hero statistics
  const fallbackHeroStats = [
    {
      target: 98,
      suffix: '%',
      prefix: '',
      description: 'Ransomware Attack Prevention',
      color: 'text-secure-green'
    },
    {
      target: 4,
      suffix: 'h',
      prefix: '',
      description: 'Average Response Time',
      color: 'text-electric-blue'
    },
    {
      target: 100,
      suffix: '',
      prefix: '+',
      description: 'Security Controls',
      color: 'text-warning-amber'
    }
  ];

  // Process hero statistics from database or use fallback
  const processedHeroStats = !statsLoading && heroStats?.length ? heroStats : fallbackHeroStats;

  // Additional dynamic statistics for value proposition section
  const valueStats = [
    {
      label: 'CISA',
      value: 'Compliance Ready',
      description: 'Official #StopRansomware Alignment'
    },
    {
      label: '24/7',
      value: 'Monitoring Available',
      description: 'Continuous threat detection'
    },
    {
      label: 'Enterprise',
      value: 'Grade Security',
      description: 'Fortune 500 trusted'
    }
  ];

  return (
    <div className="animate-in fade-in">
      {/* CISA Security Banner */}
      <CisaSecurityBanner />
      
      {/* Hero Section - Reduced padding */}
      <section className="relative py-16 md:py-24 overflow-hidden">
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
              
              {/* CISA Badge */}
              <AnimatedItem delay={0.1}>
                <div className="inline-block mb-8">
                  <span className="bg-warning-amber/10 text-warning-amber px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                    🛡️ CISA #StopRansomware Alignment
                  </span>
                </div>
              </AnimatedItem>
              
              {/* Text Carousel */}
              <AnimatedItem delay={0.2}>
                <div className="mb-12">
                  <TextCarousel texts={processedCarouselTexts} interval={5000} />
                </div>
              </AnimatedItem>
              
              {/* CTA Buttons with increased top margin */}
              <AnimatedItem delay={0.4} className="mt-16">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/quick-cyber-check">
                    <Button variant="orange" className="w-full sm:w-auto">
                      3 minutes Cyber Check
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/onboarding">
                    <Button variant="outline" className="w-full sm:w-auto">
                      See the Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </AnimatedItem>
              
              {/* Dynamic Stats cards */}
              <AnimatedItem delay={0.6}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                  {processedHeroStats.map((stat, index) => (
                    <div key={index} className="bg-background/70 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-md">
                      <div className={`text-3xl font-bold ${stat.color || 'text-primary'}`}>
                        <AnimatedCounter 
                          target={stat.target} 
                          suffix={stat.suffix} 
                          prefix={stat.prefix} 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                  ))}
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
                <p className="text-xl text-muted-foreground mb-6">
                  Proactive protection saves time, money, and reputation damage from ransomware attacks
                </p>
                <div className="space-y-6">
                  <AnimatedItem delay={0.1} direction="left">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-destructive/5 border-l-4 border-destructive">
                      <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">Ransomware Attacks Continue Rising</h3>
                        <p className="text-muted-foreground">Organizations face increasing sophisticated threats requiring proactive defense strategies.</p>
                      </div>
                    </div>
                  </AnimatedItem>
                  
                  <AnimatedItem delay={0.2} direction="left">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-warning/5 border-l-4 border-warning">
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                        <Network className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">CISA Warns of Increasing Threats</h3>
                        <p className="text-muted-foreground">The Cybersecurity and Infrastructure Security Agency has elevated the ransomware threat level for critical infrastructure.</p>
                      </div>
                    </div>
                  </AnimatedItem>
                  
                  <AnimatedItem delay={0.3} direction="left">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-success/5 border-l-4 border-success">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">Our Solution: CISA-Aligned Defense</h3>
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
                      <h4 className="font-semibold text-foreground">CISA Compliance Dashboard</h4>
                      <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                        🟢 Compliant
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

{/* CyberCaution™ Platform Section */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">CyberCaution™ Platform</h2>
              <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
                Our platform integrates security tools, orchestrates workflows, provides a governance framework, aggregates analytics, and enables human-centric training.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <AnimatedItem delay={0.1}>
                  <div className="flex flex-col items-center bg-muted/30 p-6 rounded-lg">
                    <img src="integrate-icon.png" alt="Integration Icon" className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Integration Hub</h3>
                    <p className="text-muted-foreground text-center">Connect your existing security tools into a unified ecosystem.</p>
                  </div>
                </AnimatedItem>
                {/* ... Other platform features ... */}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

 {/* Professional Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Professional Services</h2>
              <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
                Our team of experts provides end-to-end support to maximize the value of your CyberCaution implementation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <AnimatedItem delay={0.1}>
                  <div className="bg-card p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Assessment Interpretation &amp; Analysis</h3>
                    <p className="text-muted-foreground">Gain actionable insights from your assessment results with expert analysis and recommendations.</p>
                  </div>
                </AnimatedItem>
                {/* ... Other professional services ... */}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    
      {/* Value Proposition Section */}
      <section className="py-20 bg-background to-background">
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Comprehensive Ransomware Defense</h2>
              <p className="text-xl mb-12 text-orange-500 max-w-2xl mx-auto">
                Protect your organization with enterprise-grade security aligned to CISA standards
              </p>
              
              <AnimatedItem delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                  {valueStats.map((stat, index) => (
                    <div key={index} className="text-center p-6 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border">
                      <div className="text-5xl font-bold mb-2 text-foreground">{stat.label}</div>
                      <p className="text-muted-foreground font-medium">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </AnimatedItem>
              
              {/* Additional features grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
                <AnimatedItem delay={0.2} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Shield className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">CISA #StopRansomware Alignment</h3>
                      <p className="text-sm text-muted-foreground">Fully aligned with the latest CISA guidance for preventing and responding to ransomware attacks.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.3} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Link2 className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Supply Chain Risk Mapping</h3>
                      <p className="text-sm text-muted-foreground">Advanced risk mapping to identify third-party and supply chain vulnerabilities.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.4} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Users className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Employee Security Training</h3>
                      <p className="text-sm text-muted-foreground">CISA-recommended security awareness training for your entire organization.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.5} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <FileText className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Ransomware Playbooks</h3>
                      <p className="text-sm text-muted-foreground">Generate customized incident response playbooks based on CISA recommendations.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.6} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Lock className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Proactive Defense</h3>
                      <p className="text-sm text-muted-foreground">Transform from reactive incident response to proactive threat prevention strategies.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.7} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <Building2 className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Critical Infrastructure Protection</h3>
                      <p className="text-sm text-muted-foreground">Specialized security controls for organizations operating critical infrastructure.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.8} direction="up" className="md:col-span-2">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left md:col-span-2">
                    <BarChart3 className="h-6 w-6 flex-shrink-0 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">CISA Compliance Reporting</h3>
                      <p className="text-sm text-muted-foreground">Generate comprehensive compliance reports aligned with CISA requirements for executives and regulators.</p>
                    </div>
                  </div>
                </AnimatedItem>
              </div>
              
              <AnimatedItem delay={0.9} scale={true}>
                <Link to="/ransomware-assessment">
                  <Button variant="orange">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Ransomware Readiness Assessment
                  </Button>
                </Link>
              </AnimatedItem>
            </div>
          </AnimatedSection>
        </div>
      </section>

   
           {/* NIST Compliance Section */}
      <AnimatedSection type="fadeIn" className="bg-muted/30 dark:bg-muted/10 py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                Framework-Aligned Security
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Built on NIST Standards</h2>
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
                  <Link to="/features#compliance">
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
                  <Link to="/features#ransomware">
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
                  <Link to="/features#supply-chain">
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


  {/* Key Benefits Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Key Benefits of CyberCaution</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover why security professionals choose CyberCaution by ERMITS® for comprehensive protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedItem type="fadeIn" delay={0.1}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">CISA Compliance Ready</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    #StopRansomware #comprehensive alignment with CISA recommendations. 
                    Our platform ensures you meet government cybersecurity standards and guidelines.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>CISA #StopRansomware alignment</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Government-grade security controls</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Regulatory compliance reporting</span>
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
                      <Target className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Proactive Defense Strategy</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Move beyond reactive security measures with predictive threat analysis and prevention. 
                    Our proactive approach helps organizations prevent incidents before they occur.
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
            
            <AnimatedItem type="fadeIn" delay={0.3}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Building2 className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Critical Infrastructure Focus</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Specialized protection designed for organizations that maintain critical infrastructure. 
                    Enhanced security measures to protect vital systems and ensure operational continuity.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Critical system protection</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Operational resilience planning</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Business continuity assurance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>

            <AnimatedItem type="fadeIn" delay={0.4}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Gauge className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Rapid Implementation</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Get up and running quickly with our streamlined implementation process. 
                    Pre-configured templates and automated workflows reduce deployment time significantly.
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

            <AnimatedItem type="fadeIn" delay={0.5}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Measurable ROI</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Demonstrate clear return on investment with quantifiable security improvements. 
                    Track metrics that matter to your business and show tangible security value.
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

            <AnimatedItem type="fadeIn" delay={0.6}>
              <Card className="dark:border-muted h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Expert Support</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Access to certified cybersecurity professionals and industry experts. 
                    Get guidance from experienced practitioners who understand real-world security challenges.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Certified security experts</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>24/7 support availability</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Strategic consulting services</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

         {/* Incident Reporting Section */}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Strengthen Your Ransomware Defense?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Get a free CISA-aligned ransomware readiness assessment and detailed recommendations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ransomware-assessment">
                    <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                      Start 3-Minute Readiness Assessment
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;