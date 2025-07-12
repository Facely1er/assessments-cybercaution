import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import CisaSecurityBanner from '../components/CisaSecurityBanner';
import CisaResourcesSection from '../components/CisaResourcesSection';
import IncidentReportingSection from '../components/IncidentReportingSection';
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
  Network
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

const Landing = () => {
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
      subtitle: "Official #StopRansomware partner providing government-grade protection"
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
      description: 'Official #StopRansomware Partner'
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
                  <Link to="/ransomware-assessment">
                    <Button variant="orange" className="w-full sm:w-auto">
                     3 minutes Cyber Check 
                    
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/demo">
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

      {/* CISA Resources Section */}
      <CisaResourcesSection />

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
                    Start 3-Minute Ransomware Readiness Assessment
                  </Button>
                </Link>
              </AnimatedItem>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Incident Reporting Section */}
      <IncidentReportingSection />

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
                <h3 className="text-xl font-semibold mb-4 text-foreground">CISA Compliance</h3>
                <p className="text-muted-foreground">
                  Full alignment with CISA #StopRansomware guidelines and recommended security practices.
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
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Critical Infrastructure Focus</h3>
                <p className="text-muted-foreground">
                  Specialized protection for organizations that maintain critical infrastructure.
                </p>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </section>

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

export default Landing;