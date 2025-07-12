import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Award, 
  Users,
  Smile,
  Globe,
  Heart,
  Zap,
  CheckCircle,
  BookOpen,
  Lock,
  FileCheck,
  Building,
  Clock,
  Star,
  Trophy,
  BarChart,
  Lightbulb,
  Calendar,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize security in everything we do, ensuring your data is protected."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Our customers' success is our success. We're dedicated to delivering value."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to stay ahead of emerging risks and threats."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We operate with transparency and maintain the highest ethical standards."
    }
  ];

  const expertise = [
    {
      category: "Risk Management",
      certifications: [
        "CRISC (Certified in Risk and Information Systems Control)",
        "CISM (Certified Information Security Manager)",
        "ISO 31000 Risk Manager",
        "CISRM (Certified Information Security Risk Manager)"
      ],
      icon: Shield
    },
    {
      category: "Security & Compliance",
      certifications: [
        "CISSP (Certified Information Systems Security Professional)",
        "CISA (Certified Information Systems Auditor)",
        "CompTIA Security+",
        "CEH (Certified Ethical Hacker)"
      ],
      icon: Lock
    },
    {
      category: "Project Management",
      certifications: [
        "PMP (Project Management Professional)",
        "PMI-RMP (Risk Management Professional)",
        "PMI-ACP (Agile Certified Practitioner)",
        "PRINCE2 Practitioner"
      ],
      icon: BookOpen
    },
    {
      category: "Quality & Standards",
      certifications: [
        "ISO 27001 Lead Auditor",
        "ISO 27001 Lead Implementer",
        "ISO 22301 Business Continuity",
        "ITIL Expert"
      ],
      icon: FileCheck
    }
  ];

  const timeline = [
    {
      year: "2016",
      title: "Company Founded",
      description: "ERMITS® was established with a mission to transform security and risk management"
    },
    {
      year: "2018",
      title: "CyberCaution by ERMITS®",
      description: "First version released focusing on enterprise risk management capabilities"
    },
    {
      year: "2021",
      title: "NIST CSF Alignment",
      description: "Added comprehensive support for NIST framework implementation"
    },
    {
      year: "2023",
      title: "Supply Chain Module",
      description: "Expanded to include supply chain risk management capabilities"
    },
    {
      year: "2024",
      title: "Ransomware Defense Focus",
      description: "Enhanced ransomware protection with NIST IR 8374 alignment"
    },
    {
      year: "2025",
      title: "CyberCaution 1.0",
      description: "Complete platform overhaul with enhanced user experience and capabilities"
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <AnimatedSection type="fadeIn" className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-foreground">About CyberCaution™ by ERMITS</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto">
          Empowering organizations to manage risk and ensure compliance effectively
        </p>
      </AnimatedSection>

      {/* Company Overview */}
      <AnimatedSection type="fadeIn" delay={0.1} className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6 p-2 bg-muted/30 rounded-lg">
                <img 
                  src="/favicon.png" 
                  alt="CyberCaution Logo" 
                  className="h-16 w-16" 
                />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2016, ERMITS LLC was built on a mission: to make enterprise-grade cybersecurity, risk management, and compliance simple, scalable, and globally accessible. Born out of frustration with fragmented frameworks and underwhelming vendor tools, we set out to build solutions that speak the language of both security leaders and business owners.
              </p>
              <p className="text-muted-foreground mb-6">
                Our flagship platform, CyberCaution, was created to help organizations align rapidly with the NIST Cybersecurity Framework—without complexity or cost overruns. From ransomware readiness to vendor risk assessments, CyberCaution empowers teams to assess, act, and accelerate compliance in days, not months. With the launch of CyberCaution 2.0, we've introduced new modules for ransomware playbooks, real-time dashboarding, and executive reporting—co-designed with feedback from risk professionals in 50+ countries.
              </p>
              <p className="text-muted-foreground">
                ERMITS is now an ecosystem: from CyberCorrect (privacy compliance) to VendorSoluce (supply chain assurance), our integrated tools help over a thousand organizations worldwide shift from reactive to proactive security.
Our promise: framework-aligned. field-tested. future-ready.
              </p>
            </div>
            
            <AnimatedItem type="fadeIn" delay={0.2}>
              <div className="bg-muted/20 rounded-lg p-6 border border-muted dark:border-muted">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Company Timeline</h3>
                <div className="space-y-6">
                  {timeline.map((event, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0 border-l-2 border-[#FF6B00]">
                      <div className="absolute left-[-8px] top-0 w-3.5 h-3.5 rounded-full bg-[#FF6B00]"></div>
                      <div className="text-sm font-mono bg-[#FF6B00]/10 text-[#FF6B00] py-1 px-2 rounded-full inline-block mb-2">{event.year}</div>
                      <h4 className="font-medium mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection type="fadeIn" delay={0.2} className="mb-20 bg-muted/30 dark:bg-muted/10 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
          <div className="bg-[#FF6B00]/10 dark:bg-[#FF6B00]/20 rounded-lg p-8 max-w-3xl mx-auto">
            <Target className="h-12 w-12 text-[#FF6B00] mx-auto mb-4" />
            <p className="text-lg text-foreground">
              To simplify risk management and empower organizations to build resilient security programs through innovative technology and expert guidance.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection type="fadeIn" delay={0.3} className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedItem key={index} type="scaleIn" delay={index * 0.1} className="card-hover">
                <Card className="h-full dark:border-muted hover:border-[#FF6B00]/50">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground flex-grow">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team Expertise */}
      <AnimatedSection type="fadeIn" delay={0.4} className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Team Expertise & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1} className="card-hover">
                <Card className="hover:shadow-lg transition-shadow dark:border-muted h-full">
                  <CardContent className="p-6 h-full">
                    <div className="flex items-center mb-6">
                      <div className="rounded-full p-3 bg-[#FF6B00]/10">
                        <area.icon className="h-6 w-6 text-[#FF6B00]" />
                      </div>
                      <h3 className="text-xl font-semibold ml-4 text-foreground">{area.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {area.certifications.map((cert, certIndex) => (
                        <div key={certIndex} className="flex items-start">
                          <Award className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Global Impact */}
      <AnimatedSection type="fadeIn" delay={0.5} className="mb-20 bg-muted/30 dark:bg-muted/10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">Global Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <AnimatedItem type="fadeIn" delay={0.1} className="animate-count-up">
              <Card className="dark:border-muted">
                <CardContent className="p-6">
                  <Globe className="h-12 w-12 text-[#FF6B00] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">1000+</div>
                  <p className="text-muted-foreground">Organizations Protected</p>
                </CardContent>
              </Card>
            </AnimatedItem>
            <AnimatedItem type="fadeIn" delay={0.2} className="animate-count-up">
              <Card className="dark:border-muted">
                <CardContent className="p-6">
                  <Globe className="h-12 w-12 text-[#FF6B00] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">50+</div>
                  <p className="text-muted-foreground">Countries Served</p>
                </CardContent>
              </Card>
            </AnimatedItem>
            <AnimatedItem type="fadeIn" delay={0.3} className="animate-count-up">
              <Card className="dark:border-muted">
                <CardContent className="p-6">
                  <Trophy className="h-12 w-12 text-[#FF6B00] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">99.9%</div>
                  <p className="text-muted-foreground">Uptime Guarantee</p>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

  

      {/* Commitment to Security */}
      <AnimatedSection type="fadeIn" delay={0.8} className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Commitment</h2>
          
          <Card className="dark:border-muted">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">Continuous Innovation</h3>
                  <p className="text-muted-foreground mb-4">
                    At ERMITS®, we're committed to staying at the forefront of security innovation. We actively 
                    research emerging threats and evolving best practices to ensure CyberCaution provides cutting-edge 
                    protection for our customers.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our dedicated research team works closely with industry partners, security researchers, and 
                    standards bodies to continuously enhance our products and services.
                  </p>
                  <p className="text-muted-foreground">
                    This commitment ensures that our customers always have access to the most effective tools 
                    and strategies to defend against evolving threats like ransomware.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#FF6B00]/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Quarterly Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular platform updates incorporating the latest security research and customer feedback
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#FF6B00]/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <Users className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Customer Advisory Board</h4>
                      <p className="text-sm text-muted-foreground">
                        Active customer participation in our product roadmap and strategy
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#FF6B00]/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <Shield className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Security Research</h4>
                      <p className="text-sm text-muted-foreground">
                        Dedicated team studying emerging threats and developing countermeasures
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" delay={0.9} className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Security Program?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Start your journey with CyberCaution by ERMITS® today and take the first step towards comprehensive security and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ransomware-assessment">
                  <Button className="w-full sm:w-auto" variant="white">
                    <span className="text-[#FF6B00]">Start Free Assessment</span>
                    <ArrowRight className="ml-2 h-5 w-5 text-[#FF6B00]" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Contact Us
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

export default About;