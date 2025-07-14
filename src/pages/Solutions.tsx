import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  Building2, Globe, Briefcase, ShieldCheck, Server, Building, ArrowRight, CheckCircle, 
  FileText, Lock, Shield, AlertTriangle, Network, BookOpen, Users, HeartPulse, FileCheck, 
  Guitar as Hospital, Factory, Landmark, Download, Scale, CloudCog, RefreshCw 
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  Building2, Landmark, HeartPulse, Briefcase, Server, Factory, Scale, CloudCog, 
  RefreshCw, FileCheck, FileText, CheckCircle, Shield, AlertTriangle, Network, 
  BookOpen, Users, Lock, Globe, ShieldCheck, Building
};

// Default solutions data for fallback
const defaultSolutions = [
  {
    solution_id: 'healthcare',
    title: 'Healthcare',
    description: 'Security and compliance solutions for healthcare organizations',
    icon: HeartPulse,
    compliance_frameworks: ['HIPAA', 'HITRUST', 'NIST CSF'],
    compliance_features: [
      'Patient data protection',
      'Medical device security',
      'Telehealth privacy controls',
      'Business associate management'
    ],
    compliance_benefits: [
      'Reduce risk of patient data breaches',
      'Simplify HIPAA compliance',
      'Protect medical devices',
      'Secure telehealth operations'
    ],
    features: [
      'HIPAA Risk Assessment',
      'PHI Inventory Management',
      'Medical Device Security',
      'Business Associate Assessment'
    ],
    value_proposition_problems: [
      {
        pain: 'Growing patient data breach risks',
        impact: 'Potential HIPAA violations and patient trust erosion'
      },
      {
        pain: 'Complex regulatory environment',
        impact: 'Difficulty maintaining compliance across operations'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'HIPAA-aligned security management',
        benefit: 'Streamlined compliance with automated controls and assessments'
      },
      {
        capability: 'Complete PHI protection',
        benefit: 'End-to-end security for patient data across all systems'
      }
    ]
  },
  {
    solution_id: 'financial',
    title: 'Financial Services',
    description: 'Risk management solutions for banks and financial institutions',
    icon: Briefcase,
    compliance_frameworks: ['PCI DSS', 'GLBA', 'SOX', 'NIST CSF'],
    compliance_features: [
      'Financial data protection',
      'Transaction security',
      'Fraud prevention',
      'Regulatory reporting'
    ],
    compliance_benefits: [
      'Maintain regulatory compliance',
      'Protect customer financial data',
      'Prevent fraud and financial crime',
      'Ensure business continuity'
    ],
    features: [
      'Financial Risk Assessment',
      'Customer Data Protection',
      'Fraud Detection',
      'Regulatory Compliance'
    ],
    value_proposition_problems: [
      {
        pain: 'Evolving regulatory requirements',
        impact: 'Risk of non-compliance penalties and reputation damage'
      },
      {
        pain: 'Sophisticated financial fraud',
        impact: 'Financial losses and customer trust erosion'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'Multi-regulation compliance framework',
        benefit: 'Single platform for GLBA, SOX, PCI DSS, and other requirements'
      },
      {
        capability: 'Advanced fraud protection',
        benefit: 'AI-powered detection of suspicious activities and transactions'
      }
    ]
  }
];

// Default case studies data for fallback
const defaultCaseStudies = [
  {
    industry: 'Healthcare',
    company: 'Regional Medical Center',
    challenge: 'Needed to strengthen HIPAA compliance and protect patient data across 12 facilities',
    solution: 'Implemented CyberCaution\'s Healthcare Security Suite with specialized PHI protection',
    results: [
      'Achieved 98% HIPAA compliance score, up from 65%',
      'Reduced security incidents by 76%',
      'Streamlined security assessments, saving 120 hours monthly',
      'Secured telehealth operations during COVID-19 expansion'
    ]
  },
  {
    industry: 'Financial',
    company: 'First National Bank',
    challenge: 'Struggled with multi-regulatory compliance and third-party risk management',
    solution: 'Deployed CyberCaution\'s Financial Services platform with vendor risk module',
    results: [
      'Consolidated compliance across PCI-DSS, GLBA, and SOX',
      'Reduced vendor assessment time by 82%',
      'Identified and remediated critical vulnerabilities in legacy systems',
      'Achieved clean audit reports for two consecutive years'
    ]
  },
  {
    industry: 'Manufacturing',
    company: 'Precision Industrial Products',
    challenge: 'Needed to secure OT/IT environments and protect intellectual property',
    solution: 'Implemented CyberCaution\'s Manufacturing Security Solution with OT protection',
    results: [
      'Secured industrial control systems without disrupting operations',
      'Prevented two attempted ransomware attacks',
      'Reduced mean time to detect threats by 67%',
      'Achieved compliance with industrial security standards'
    ]
  }
];

const Solutions = () => {
  const navigate = useNavigate();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [solutions, setSolutions] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch solution data from Supabase
  const { data: solutionsData, loading: solutionsLoading, error: solutionsError } = useSupabaseQuery('solutions', {
    orderBy: { column: 'order_index', ascending: true }
  });
  
  // Fetch case studies data from Supabase
  const { data: caseStudiesData, loading: caseStudiesLoading, error: caseStudiesError } = useSupabaseQuery('case_studies', {
    orderBy: { column: 'order_index', ascending: true }
  });

  // Process solutions data when it's loaded
  useEffect(() => {
    if (!solutionsLoading && !caseStudiesLoading) {
      // Process solutions data - map icon string to actual Lucide component
      try {
        if (solutionsData && solutionsData.length > 0) {
          const processedSolutions = solutionsData.map(solution => {
            const IconComponent = LucideIcons[solution.icon as keyof typeof LucideIcons] || Building2;
            return {
              ...solution,
              icon: IconComponent,
              features: Array.isArray(solution.features) ? solution.features : [],
              value_proposition_problems: Array.isArray(solution.value_proposition_problems) ? 
                solution.value_proposition_problems : [],
              value_proposition_solutions: Array.isArray(solution.value_proposition_solutions) ? 
                solution.value_proposition_solutions : []
            };
          });
          setSolutions(processedSolutions);
        } else {
          setSolutions(defaultSolutions);
        }
        
        // Process case studies data
        setCaseStudies(caseStudiesData && caseStudiesData.length > 0 ? caseStudiesData : defaultCaseStudies);
        
      } catch (error) {
        console.error("Error processing data:", error);
        setSolutions(defaultSolutions);
        setCaseStudies(defaultCaseStudies);
      }
      
      setLoading(false);
    }
  }, [solutionsLoading, caseStudiesLoading, solutionsData, caseStudiesData]);

  // Set initial active section
  useEffect(() => {
    if (!activeSectionId && solutions.length > 0) {
      setActiveSectionId(solutions[0].solution_id);
    }
  }, [activeSectionId, solutions]);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSectionId(id);
    }
  };

  // Set up IntersectionObserver to track which section is visible
  useEffect(() => {
    if (solutions.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0.1
      }
    );

    // Observe all solution sections
    solutions.forEach((solution) => {
      const element = sectionRefs.current[solution.solution_id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [solutions]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading solutions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      {/* Hero Section */}
      <AnimatedSection type="fadeIn" className="mb-16 text-center px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Industry Solutions</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-8">
          Tailored security and risk management solutions for your industry challenges
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/ransomware-assessment">
            <Button variant="orange">
              Start Free Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline">
              Request Solution Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      {/* Sticky Navigation Menu */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-3 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {solutions.map((solution) => (
              <Button
                key={solution.solution_id}
                variant={activeSectionId === solution.solution_id ? "orange" : "outline"}
                size="sm"
                onClick={() => scrollToSection(solution.solution_id)}
                className="flex items-center"
              >
                {solution.icon && <solution.icon className="h-4 w-4 mr-2" />}
                {solution.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Solutions */}
      <div className="space-y-24">
        {solutions.map((solution, index) => (
          <AnimatedSection 
            key={solution.solution_id} 
            type="fadeIn" 
            className="px-4 md:px-6" 
            delay={index * 0.1}
          >
            <div 
              id={solution.solution_id}
              ref={(el) => (sectionRefs.current[solution.solution_id] = el)}
              className="max-w-7xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-[#FF6B00]/10 rounded-lg mr-4">
                      {solution.icon && <solution.icon className="h-8 w-8 text-[#FF6B00]" />}
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{solution.title} Solutions</h2>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8">
                    {solution.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {solution.features && solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Compliance Frameworks</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.compliance_frameworks && solution.compliance_frameworks.map((framework, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary">
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Value Proposition - Problem/Solution Format */}
                  {solution.value_proposition_problems && solution.value_proposition_solutions && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-foreground">Why {solution.title} Organizations Choose CyberCaution</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#FF6B00]">Key Challenges We Solve:</h4>
                          <div className="space-y-4">
                            {solution.value_proposition_problems.map((problem: any, idx: number) => (
                              <div key={idx} className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                                <p className="font-medium text-red-900 dark:text-red-200 mb-1">{problem.pain}</p>
                                <p className="text-sm text-red-700 dark:text-red-300">{problem.impact}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#FF6B00]">How CyberCaution Delivers Value:</h4>
                          <div className="space-y-4">
                            {solution.value_proposition_solutions.map((solutionItem: any, idx: number) => (
                              <div key={idx} className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                                <p className="font-medium text-green-900 dark:text-green-200 mb-1">{solutionItem.capability}</p>
                                <p className="text-sm text-green-700 dark:text-green-300">{solutionItem.benefit}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Link to="/demo">
                    <Button variant="orange">
                      Learn More About {solution.title} Solutions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-6">
                  <Card className="border dark:border-muted">
                    <CardHeader>
                      <CardTitle>Solution Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {solution.compliance_benefits && solution.compliance_benefits.map((benefit: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <div className="bg-[#FF6B00]/10 rounded-full p-1 mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-[#FF6B00]" />
                            </div>
                            <span className="text-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border dark:border-muted">
                    <CardHeader>
                      <CardTitle>Key Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {solution.compliance_features && solution.compliance_features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start">
                            <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                              <Shield className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Industry-specific callout */}
                  <Card className="bg-[#FF6B00]/5 border-[#FF6B00]/20 border">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {solution.solution_id === 'enterprise' && (
                          <Building2 className="h-6 w-6 text-[#FF6B00] mr-3" />
                        )}
                        {solution.solution_id === 'government' && (
                          <Landmark className="h-6 w-6 text-[#FF6B00] mr-3" />
                        )}
                        {solution.solution_id === 'healthcare' && (
                          <HeartPulse className="h-6 w-6 text-[#FF6B00] mr-3" />
                        )}
                        {solution.solution_id === 'financial' && (
                          <Scale className="h-6 w-6 text-[#FF6B00] mr-3" />
                        )}
                        {solution.solution_id === 'technology' && (
                          <CloudCog className="h-6 w-6 text-[#FF6B00] mr-3" />
                        )}
                        {solution.solution_id === 'manufacturing' && (
                          <Factory className="h-6 w-6 text-[#FF6B00] mr-3" />
                        )}
                        <h3 className="font-semibold text-foreground">Why CyberCaution for {solution.title}?</h3>
                      </div>

                      <div className="space-y-3">
                        {solution.solution_id === 'enterprise' && (
                          <>
                            <p className="text-sm text-muted-foreground">Enterprise organizations need comprehensive risk management that scales with complexity. Our solution provides:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Enterprise-wide visibility into security and compliance</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Advanced risk quantification and analysis</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Integrated third-party risk management</span>
                              </li>
                            </ul>
                          </>
                        )}

                        {solution.solution_id === 'government' && (
                          <>
                            <p className="text-sm text-muted-foreground">Government agencies face unique security challenges and strict compliance requirements. We offer:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Complete alignment with NIST RMF and FISMA</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Streamlined ATO documentation and processes</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Supply chain risk management for SCRM compliance</span>
                              </li>
                            </ul>
                          </>
                        )}

                        {solution.solution_id === 'healthcare' && (
                          <>
                            <p className="text-sm text-muted-foreground">Healthcare organizations must protect patient data while ensuring regulatory compliance:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>HIPAA-aligned security controls and assessments</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Ransomware protection for patient data systems</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Business associate security assessment</span>
                              </li>
                            </ul>
                          </>
                        )}

                        {solution.solution_id === 'financial' && (
                          <>
                            <p className="text-sm text-muted-foreground">Financial institutions face stringent regulatory requirements and sophisticated threats:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Multi-regulatory compliance management</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Advanced threat detection and response</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Customer data protection controls</span>
                              </li>
                            </ul>
                          </>
                        )}

                        {solution.solution_id === 'technology' && (
                          <>
                            <p className="text-sm text-muted-foreground">Technology companies need security that moves at the speed of development:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Security built into the CI/CD pipeline</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Container and cloud security controls</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>API security assessment and monitoring</span>
                              </li>
                            </ul>
                          </>
                        )}

                        {solution.solution_id === 'manufacturing' && (
                          <>
                            <p className="text-sm text-muted-foreground">Manufacturing organizations must secure both IT and OT environments:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Integrated IT/OT security management</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Supply chain security assessment</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                                <span>Industrial control system protection</span>
                              </li>
                            </ul>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Case Studies Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how organizations across industries have strengthened their security posture with CyberCaution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <Card className="h-full hover:shadow-lg transition-shadow dark:border-muted">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{study.company}</h3>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground">Challenge:</p>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground">Solution:</p>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                    
                    <div className="mb-4 flex-grow">
                      <p className="text-sm font-medium text-foreground">Results:</p>
                      <ul className="space-y-2 mt-2">
                        {study.results && study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="mt-auto">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Implementation Methodology */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Implementation Approach</h2>
            <p className="text-lg text-orange-500 max-w-3xl mx-auto">
              A structured methodology for deploying CyberCaution™ by ERMITS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Assessment",
                description: "Comprehensive evaluation of your current security posture, risks, and requirements",
                icon: FileCheck
              },
              {
                step: 2,
                title: "Planning",
                description: "Detailed implementation plan tailored to your organization's specific needs",
                icon: FileText
              },
              {
                step: 3,
                title: "Implementation",
                description: "Structured deployment with regular checkpoints and validation",
                icon: CheckCircle
              },
              {
                step: 4,
                title: "Optimization",
                description: "Continuous improvement and refinement based on your evolving requirements",
                icon: RefreshCw
              }
            ].map((phase, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <Card className="hover:shadow-lg transition-shadow dark:border-muted h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-[#FF6B00]">{phase.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{phase.title}</h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                    
                    <div className="mt-4 flex-grow">
                      <phase.icon className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Framework Alignment */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Framework Alignment</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              All our solutions are built on industry-standard security frameworks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedItem type="fadeIn" delay={0.1}>
              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-10 w-10 text-[#FF6B00] mr-3" />
                    <h3 className="text-xl font-semibold">NIST CSF 2.0</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Comprehensive implementation of the NIST Cybersecurity Framework functions: Identify, Protect, Detect, Respond, and Recover.
                  </p>
                  <Link to="/demo">
                    <Button variant="orange" className="w-full">
                      View Framework Details
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
                    <AlertTriangle className="h-10 w-10 text-[#FF6B00] mr-3" />
                    <h3 className="text-xl font-semibold">NIST IR 8374</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Specialized controls for ransomware protection following NIST's Ransomware Risk Management guidance.
                  </p>
                  <Link to="/ransomware-assessment">
                    <Button variant="orange" className="w-full">
                      Start Ransomware Assessment
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
                    <Network className="h-10 w-10 text-[#FF6B00] mr-3" />
                    <h3 className="text-xl font-semibold">NIST SP 800-161</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Supply chain security controls aligned with NIST's Supply Chain Risk Management practices.
                  </p>
                  <Link to="/demo">
                    <Button variant="orange" className="w-full">
                      Assess Supply Chain Risk
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-6">
              We also support other major frameworks including ISO 27001, SOC 2, HIPAA, PCI DSS, GDPR, and more.
            </p>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Framework Mapping Guide
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Resources Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Solution Resources</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore resources to help you get the most from CyberCaution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-10 w-10 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Solution Briefs</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Detailed descriptions of our industry-specific solutions and capabilities.
                </p>
                <Button variant="outline" className="w-full">
                  Download Solution Briefs
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-10 w-10 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Implementation Guides</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Step-by-step guides for implementing CyberCaution in your environment.
                </p>
                <Button variant="outline" className="w-full">
                  View Implementation Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-10 w-10 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Customer Stories</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  See how organizations like yours have succeeded with our solutions.
                </p>
                <Button variant="outline" className="w-full">
                  Read Customer Stories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to See CyberCaution in Action?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Get a personalized demo of our solution tailored to your industry needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"> 
                <Link to="/demo"> 
                  <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                    Request Demo
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

export default Solutions;