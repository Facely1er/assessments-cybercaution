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
          Proactive <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Cyber Risk Orchestration &amp; Governance</span>
        </>
      ),
      subtitle: "An Integrated Platform Aligned with NIST Frameworks"
    },
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
      label: 'Not SIEM/EDR',
      value: 'Security Orchestration',
      description: 'CyberCaution integrates existing tools'
    },
    {
      label: 'Human-Centric',
      value: 'Training Integration',
      description: 'Combines human and technical controls'
    },
    {
      label: 'Analytics',
      value: 'Overlay Existing Tools',
      description: 'Aggregate data for comprehensive visibility'
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
                  <span className="bg-success/10 text-success px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                    🛡️ NIST CSF 2.0 Aligned Platform
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
                      Start 3-Minute Cyber Check
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
              <h2 className="text-4xl font-bold mb-6 text-foreground">Integrated Cyber Risk Platform</h2>
              <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
                CyberCaution is not a SIEM/EDR replacement, but a Security Orchestration & Governance Platform that complements your existing tools:
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
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1 text-success" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Web-Based Assessment Portal</h3>
                      <p className="text-sm text-muted-foreground">Interactive assessment questionnaires with automated scoring and analysis.</p>
                    </div>
                  </div>
                </AnimatedItem>

                <AnimatedItem delay={0.3} direction="right">  
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1 text-success" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">CISA/NIST-Aligned Frameworks</h3>  
                      <p className="text-sm text-muted-foreground">Industry-specific customizations and regulatory compliance mappings.</p>
                    </div>
                  </div>
                </AnimatedItem>CISA/NIST-Aligned Frameworks</h3>
                      <p className="text-sm text-muted-foreground">Industry-specific customizations and regulatory compliance mappings.</p>
                    </div>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem delay={0.4} direction="left">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1 text-success" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">Professional Reporting System</h3>
                      <p className="text-sm text-muted-foreground">Generate executive-level reports and dashboards from assessment data.</p>
                    </div>
                  </div>  
                </AnimatedItem>
                
                <AnimatedItem delay={0.5} direction="right">
                  <div className="flex items-start space-x-3 bg-muted/30 backdrop-blur-sm p-4 rounded-lg border border-border text-left">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1 text-success" />  
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">API for Integrations</h3>
                      <p className="text-sm text-muted-foreground">Integrate security data into existing enterprise systems and workflows.</p>
                    </div>
                  </div>
                </AnimatedItem>
              </div>
              
              <AnimatedItem delay={0.6} scale={true}>
                <Link to="/free-trial">
                  <Button variant="orange">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </Button>
                </Link>
              </AnimatedItem>
            </div>
          </AnimatedSection>  
        </div>
      </section>

      {/* Key Benefits Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Why CyberCaution?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover why security professionals choose CyberCaution by ERMITS® for comprehensive cyber risk management
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
                    <h3 className="text-xl font-semibold text-foreground">NIST CSF 2.0 Alignment</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Align your security program with the latest NIST Cybersecurity Framework.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Framework-based assessments</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Tailored implementation guidance</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Compliance status tracking</span>
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
                      <TrendingUp className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Measurable Risk Reduction</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Demonstrate clear ROI with quantifiable security improvements.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Security KPI dashboards</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Risk reduction analytics</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Executive reporting</span>
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
                      <Users className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Human-Centric Approach</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Integrate security training and awareness into technical controls.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>User-focused training modules</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Behavior-driven analytics</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                      <span>Tailored awareness campaigns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>  
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Uplevel Your Cyber Risk Management?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Get a free NIST CSF assessment and detailed recommendations tailored to your organization
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/free-trial">
                    <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                      Start Free Trial  
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