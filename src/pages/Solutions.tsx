import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  Shield, AlertTriangle, Network, Globe, HeartPulse, Briefcase, 
  Factory, Building2, Landmark, GraduationCap, ArrowRight, CheckCircle, 
  FileText, Lock, BookOpen, Users, Download, Scale, CloudCog, 
  RefreshCw, FileCheck, Eye, TrendingUp, Zap, Brain, Activity
} from 'lucide-react';

// Map of Lucide icon names to components for dynamic icon loading
const LucideIcons: Record<string, React.FC<any>> = {
  Shield, AlertTriangle, Network, Globe, HeartPulse, Briefcase, Factory, 
  Building2, Landmark, GraduationCap, CheckCircle, FileText, Lock, BookOpen, 
  Users, Scale, CloudCog, RefreshCw, FileCheck, Eye, TrendingUp, Zap, Brain, Activity
};

// Real CyberCaution solutions based on actual product portfolio
const realSolutions = [
  {
    solution_id: 'healthcare',
    title: 'Healthcare Security',
    description: 'HIPAA-aligned compliance toolkit and medical data protection platform for healthcare providers. Complete PHI protection with specialized ransomware defense.',
    icon: HeartPulse,
    tagline: 'Healthcare. Compliance. Simple.',
    compliance_frameworks: ['HIPAA', 'HITRUST', 'NIST CSF', 'HITECH'],
    compliance_features: [
      'HIPAA Risk Assessment automation',
      'PHI inventory and classification',
      'Medical device security monitoring',
      'Business associate management',
      'Breach notification workflows',
      'Telehealth privacy controls'
    ],
    compliance_benefits: [
      'Streamlined HIPAA compliance with automated controls',
      'Ransomware protection for patient data systems',
      'Real-time PHI monitoring and alerting',
      'Simplified business associate assessments',
      'Reduced audit preparation time by 80%',
      'Enhanced patient trust through data protection'
    ],
    unique_features: [
      'Threat Weather System™ for healthcare-specific threats',
      'Medical device vulnerability scanning',
      'Patient data encryption at rest and in transit',
      'HIPAA-compliant incident response playbooks'
    ],
    value_proposition_problems: [
      {
        pain: 'Complex HIPAA compliance requirements',
        impact: 'Risk of violations and patient trust erosion'
      },
      {
        pain: 'Growing ransomware targeting healthcare',
        impact: 'Patient care disruption and data breaches'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'Automated HIPAA compliance management',
        benefit: 'Reduce compliance overhead while ensuring full regulatory adherence'
      },
      {
        capability: 'Healthcare-specific threat intelligence',
        benefit: 'Proactive protection against medical sector cyber threats'
      }
    ]
  },
  {
    solution_id: 'financial',
    title: 'Financial Services',
    description: 'Solutions for financial compliance, cyber risk modeling, and fraud prevention. Multi-regulatory compliance management for banks and financial institutions.',
    icon: Scale,
    tagline: 'Optimize Financial Resilience',
    compliance_frameworks: ['PCI DSS', 'GLBA', 'SOX', 'NIST CSF', 'FFIEC'],
    compliance_features: [
      'Multi-regulatory compliance dashboard',
      'Financial transaction monitoring',
      'Customer data protection controls',
      'Fraud detection and prevention',
      'Regulatory reporting automation',
      'Third-party risk assessment'
    ],
    compliance_benefits: [
      'Consolidated compliance across multiple regulations',
      'Advanced fraud protection with AI detection',
      'Automated regulatory reporting capabilities',
      'Enhanced customer financial data security',
      'Reduced compliance costs by 60%',
      'Improved audit readiness and results'
    ],
    unique_features: [
      'Predictive Breach Analytics for financial threats',
      'Automated SOX controls testing',
      'Real-time transaction security monitoring',
      'Financial sector threat intelligence feeds'
    ],
    value_proposition_problems: [
      {
        pain: 'Multiple overlapping regulatory requirements',
        impact: 'Complex compliance management and penalty risks'
      },
      {
        pain: 'Sophisticated financial cyber threats',
        impact: 'Customer data breaches and financial losses'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'Unified regulatory compliance platform',
        benefit: 'Single system for GLBA, SOX, PCI DSS, and FFIEC requirements'
      },
      {
        capability: 'Financial-specific threat detection',
        benefit: 'AI-powered protection against banking and fintech attacks'
      }
    ]
  },
  {
    solution_id: 'manufacturing',
    title: 'Manufacturing & Industrial',
    description: 'OT/IT convergence security with industrial control system protection and intellectual property safeguards for manufacturing organizations.',
    icon: Factory,
    tagline: 'Secure Operations Technology',
    compliance_frameworks: ['NIST CSF', 'IEC 62443', 'ISO 27001', 'NERC CIP'],
    compliance_features: [
      'OT/IT network security integration',
      'Industrial control system monitoring',
      'Supply chain risk assessment',
      'Intellectual property protection',
      'Production continuity planning',
      'Safety system security'
    ],
    compliance_benefits: [
      'Unified IT and OT security management',
      'Protection of critical production systems',
      'Supply chain cyber risk visibility',
      'Intellectual property theft prevention',
      'Reduced production downtime from cyber incidents',
      'Enhanced industrial safety through cybersecurity'
    ],
    unique_features: [
      'Industrial Threat Weather System™',
      'OT asset discovery and inventory',
      'Production-aware incident response',
      'Manufacturing sector threat intelligence'
    ],
    value_proposition_problems: [
      {
        pain: 'IT/OT security integration challenges',
        impact: 'Blind spots in industrial system protection'
      },
      {
        pain: 'Production system vulnerability to cyber attacks',
        impact: 'Operational disruption and safety risks'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'Integrated OT/IT security platform',
        benefit: 'Comprehensive protection across all manufacturing systems'
      },
      {
        capability: 'Production-continuity focused security',
        benefit: 'Cyber protection that maintains operational availability'
      }
    ]
  },
  {
    solution_id: 'education',
    title: 'Education & Academic',
    description: 'Privacy education, secure remote learning, and academic compliance for K-12 and higher education institutions.',
    icon: GraduationCap,
    tagline: 'Privacy and Security Education for All',
    compliance_frameworks: ['FERPA', 'COPPA', 'NIST CSF', 'State Privacy Laws'],
    compliance_features: [
      'Student data privacy protection',
      'Secure remote learning platforms',
      'FERPA compliance automation',
      'Educational technology security',
      'Campus network protection',
      'Research data safeguards'
    ],
    compliance_benefits: [
      'Simplified FERPA compliance management',
      'Secure online learning environments',
      'Student privacy protection across systems',
      'Enhanced campus cybersecurity posture',
      'Protection of research and academic data',
      'Improved incident response for educational settings'
    ],
    unique_features: [
      'Educational sector threat intelligence',
      'Age-appropriate privacy controls',
      'Academic calendar-aware security',
      'Student device management'
    ],
    value_proposition_problems: [
      {
        pain: 'Complex student privacy regulations',
        impact: 'FERPA violations and student data exposure'
      },
      {
        pain: 'Remote learning security challenges',
        impact: 'Educational continuity and privacy risks'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'Automated FERPA compliance',
        benefit: 'Ensure student privacy while enabling educational innovation'
      },
      {
        capability: 'Secure digital learning environment',
        benefit: 'Safe online education with privacy protection'
      }
    ]
  },
  {
    solution_id: 'government',
    title: 'Government & Critical Infrastructure',
    description: 'Government-grade security with NIST RMF alignment, ATO support, and critical infrastructure protection for public sector organizations.',
    icon: Landmark,
    tagline: 'Securing Critical Infrastructure',
    compliance_frameworks: ['NIST RMF', 'FISMA', 'FedRAMP', 'CISA Directives'],
    compliance_features: [
      'NIST RMF implementation support',
      'Authority to Operate (ATO) documentation',
      'Critical infrastructure protection',
      'Government-specific threat monitoring',
      'Supply chain risk management (SCRM)',
      'Incident response coordination'
    ],
    compliance_benefits: [
      'Streamlined ATO processes and documentation',
      'Enhanced critical infrastructure resilience',
      'Government-specific threat intelligence',
      'Improved inter-agency coordination',
      'Accelerated FISMA compliance',
      'Robust supply chain security'
    ],
    unique_features: [
      'Government threat intelligence integration',
      'Critical infrastructure mapping',
      'Inter-agency coordination tools',
      'Government-specific incident playbooks'
    ],
    value_proposition_problems: [
      {
        pain: 'Complex federal security requirements',
        impact: 'Delayed ATO and operational limitations'
      },
      {
        pain: 'Critical infrastructure threat targeting',
        impact: 'National security and public safety risks'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'NIST RMF automation and support',
        benefit: 'Accelerated compliance and ATO processes'
      },
      {
        capability: 'Critical infrastructure threat protection',
        benefit: 'Enhanced national security and public safety'
      }
    ]
  },
  {
    solution_id: 'technology',
    title: 'Technology & Software',
    description: 'DevSecOps integration, cloud security, and software supply chain protection for technology companies and software development organizations.',
    icon: CloudCog,
    tagline: 'Secure Innovation at Speed',
    compliance_frameworks: ['SOC 2', 'ISO 27001', 'NIST CSF', 'Cloud Security'],
    compliance_features: [
      'DevSecOps pipeline integration',
      'Cloud security posture management',
      'Software supply chain security',
      'API security and monitoring',
      'Container and Kubernetes security',
      'Code vulnerability scanning'
    ],
    compliance_benefits: [
      'Security integrated into development lifecycle',
      'Automated cloud security monitoring',
      'Enhanced software supply chain protection',
      'Rapid security feedback for developers',
      'Scalable security for agile environments',
      'Improved time-to-market with security'
    ],
    unique_features: [
      'Development-integrated threat monitoring',
      'Automated security testing in CI/CD',
      'Technology sector threat intelligence',
      'Developer-friendly security tools'
    ],
    value_proposition_problems: [
      {
        pain: 'Security slowing down development cycles',
        impact: 'Delayed releases and reduced competitiveness'
      },
      {
        pain: 'Complex cloud and container security',
        impact: 'Security gaps in modern infrastructure'
      }
    ],
    value_proposition_solutions: [
      {
        capability: 'DevSecOps automation and integration',
        benefit: 'Security at the speed of development'
      },
      {
        capability: 'Cloud-native security platform',
        benefit: 'Comprehensive protection for modern tech stacks'
      }
    ]
  }
];

// Real capability showcases based on actual CyberCaution features
const capabilityShowcases = [
  {
    industry: 'Cross-Industry',
    title: 'Threat Weather System™ Implementation',
    challenge: 'Organizations need real-time threat intelligence tailored to their specific industry and risk profile.',
    solution: 'CyberCaution\'s Threat Weather System™ provides industry-specific threat climate monitoring with predictive analytics.',
    capabilities: [
      'Real-time threat landscape analysis for your industry',
      'Predictive threat modeling and early warning systems',
      'Automated threat intelligence integration',
      'Industry-specific attack pattern recognition'
    ]
  },
  {
    industry: 'Healthcare',
    title: 'Rapid HIPAA Compliance Achievement',
    challenge: 'Healthcare organizations struggle with complex HIPAA requirements and need rapid compliance implementation.',
    solution: 'Deployed CyberCaution\'s Healthcare Security Suite with automated HIPAA compliance management.',
    capabilities: [
      'Automated HIPAA risk assessments and gap analysis',
      'PHI discovery and classification automation',
      'Medical device security monitoring integration',
      'Streamlined business associate agreement management'
    ]
  },
  {
    industry: 'Financial',
    title: 'Multi-Regulatory Compliance Consolidation',
    challenge: 'Financial institutions need unified compliance management across multiple overlapping regulatory frameworks.',
    solution: 'Implemented CyberCaution\'s Financial Services platform with integrated regulatory compliance.',
    capabilities: [
      'Unified dashboard for PCI DSS, GLBA, and SOX compliance',
      'Automated regulatory reporting and documentation',
      'Financial sector threat intelligence integration',
      'Advanced fraud detection and prevention systems'
    ]
  }
];

const Solutions = () => {
  const navigate = useNavigate();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [solutions, setSolutions] = useState<any[]>(realSolutions);
  const [loading, setLoading] = useState(false);

  // Set initial active section
 const fallbackData = {
  compliance_frameworks: {
    'healthcare': ['HIPAA', 'HITRUST', 'NIST CSF', 'HITECH'],
    'financial': ['PCI DSS', 'GLBA', 'SOX', 'NIST CSF', 'FFIEC'],
    'manufacturing': ['NIST CSF', 'IEC 62443', 'ISO 27001', 'NERC CIP'],
    'education': ['FERPA', 'COPPA', 'NIST CSF', 'State Privacy Laws'],
    'government': ['NIST RMF', 'FISMA', 'FedRAMP', 'CISA Directives'],
    'technology': ['SOC 2', 'ISO 27001', 'NIST CSF', 'Cloud Security']
  },
  compliance_features: {
    'healthcare': [
      'HIPAA Risk Assessment automation',
      'PHI inventory and classification', 
      'Medical device security monitoring',
      'Business associate management',
      'Breach notification workflows',
      'Telehealth privacy controls'
    ],
    'financial': [
      'Multi-regulatory compliance dashboard',
      'Financial transaction monitoring',
      'Customer data protection controls',
      'Fraud detection and prevention',
      'Regulatory reporting automation',
      'Third-party risk assessment'
    ],
    'manufacturing': [
      'OT/IT network security integration',
      'Industrial control system monitoring',
      'Supply chain risk assessment',
      'Intellectual property protection',
      'Production continuity planning',
      'Safety system security'
    ],
    'education': [
      'Student data privacy protection',
      'Secure remote learning platforms',
      'FERPA compliance automation',
      'Educational technology security',
      'Campus network protection',
      'Research data safeguards'
    ],
    'government': [
      'NIST RMF implementation support',
      'Authority to Operate (ATO) documentation',
      'Critical infrastructure protection',
      'Government-specific threat monitoring',
      'Supply chain risk management (SCRM)',
      'Incident response coordination'
    ],
    'technology': [
      'DevSecOps pipeline integration',
      'Cloud security posture management',
      'Software supply chain security',
      'API security and monitoring',
      'Container and Kubernetes security',
      'Code vulnerability scanning'
    ]
  },
  compliance_benefits: {
    'healthcare': [
      'Streamlined HIPAA compliance with automated controls',
      'Ransomware protection for patient data systems',
      'Real-time PHI monitoring and alerting',
      'Simplified business associate assessments',
      'Reduced audit preparation time by 80%',
      'Enhanced patient trust through data protection'
    ],
    'financial': [
      'Consolidated compliance across multiple regulations',
      'Advanced fraud protection with AI detection',
      'Automated regulatory reporting capabilities',
      'Enhanced customer financial data security',
      'Reduced compliance costs by 60%',
      'Improved audit readiness and results'
    ],
    'manufacturing': [
      'Unified IT and OT security management',
      'Protection of critical production systems',
      'Supply chain cyber risk visibility',
      'Intellectual property theft prevention',
      'Reduced production downtime from cyber incidents',
      'Enhanced industrial safety through cybersecurity'
    ],
    'education': [
      'Simplified FERPA compliance management',
      'Secure online learning environments',
      'Student privacy protection across systems',
      'Enhanced campus cybersecurity posture',
      'Protection of research and academic data',
      'Improved incident response for educational settings'
    ],
    'government': [
      'Streamlined ATO processes and documentation',
      'Enhanced critical infrastructure resilience',
      'Government-specific threat intelligence',
      'Improved inter-agency coordination',
      'Accelerated FISMA compliance',
      'Robust supply chain security'
    ],
    'technology': [
      'Security integrated into development lifecycle',
      'Automated cloud security monitoring',
      'Enhanced software supply chain protection',
      'Rapid security feedback for developers',
      'Scalable security for agile environments',
      'Improved time-to-market with security'
    ]
  },
  features: {
    'healthcare': [
      'Threat Weather System™ for healthcare-specific threats',
      'Medical device vulnerability scanning',
      'Patient data encryption at rest and in transit',
      'HIPAA-compliant incident response playbooks'
    ],
    'financial': [
      'Predictive Breach Analytics for financial threats',
      'Automated SOX controls testing',
      'Real-time transaction security monitoring',
      'Financial sector threat intelligence feeds'
    ],
    'manufacturing': [
      'Industrial Threat Weather System™',
      'OT asset discovery and inventory',
      'Production-aware incident response',
      'Manufacturing sector threat intelligence'
    ],
    'education': [
      'Educational sector threat intelligence',
      'Age-appropriate privacy controls',
      'Academic calendar-aware security',
      'Student device management'
    ],
    'government': [
      'Government threat intelligence integration',
      'Critical infrastructure mapping',
      'Inter-agency coordination tools',
      'Government-specific incident playbooks'
    ],
    'technology': [
      'Development-integrated threat monitoring',
      'Automated security testing in CI/CD',
      'Technology sector threat intelligence',
      'Developer-friendly security tools'
    ]
  },
  value_proposition_problems: {
    'healthcare': [
      { pain: "Complex HIPAA compliance requirements", impact: "Risk of violations and patient trust erosion" },
      { pain: "Growing ransomware targeting healthcare", impact: "Patient care disruption and data breaches" }
    ],
    'financial': [
      { pain: "Multiple overlapping regulatory requirements", impact: "Complex compliance management and penalty risks" },
      { pain: "Sophisticated financial cyber threats", impact: "Customer data breaches and financial losses" }
    ],
    'manufacturing': [
      { pain: "IT/OT security integration challenges", impact: "Blind spots in industrial system protection" },
      { pain: "Production system vulnerability to cyber attacks", impact: "Operational disruption and safety risks" }
    ],
    'education': [
      { pain: "Complex student privacy regulations", impact: "FERPA violations and student data exposure" },
      { pain: "Remote learning security challenges", impact: "Educational continuity and privacy risks" }
    ],
    'government': [
      { pain: "Complex federal security requirements", impact: "Delayed ATO and operational limitations" },
      { pain: "Critical infrastructure threat targeting", impact: "National security and public safety risks" }
    ],
    'technology': [
      { pain: "Security slowing down development cycles", impact: "Delayed releases and reduced competitiveness" },
      { pain: "Complex cloud and container security", impact: "Security gaps in modern infrastructure" }
    ]
  },
  value_proposition_solutions: {
    'healthcare': [
      { capability: "Automated HIPAA compliance management", benefit: "Reduce compliance overhead while ensuring full regulatory adherence" },
      { capability: "Healthcare-specific threat intelligence", benefit: "Proactive protection against medical sector cyber threats" }
    ],
    'financial': [
      { capability: "Unified regulatory compliance platform", benefit: "Single system for GLBA, SOX, PCI DSS, and FFIEC requirements" },
      { capability: "Financial-specific threat detection", benefit: "AI-powered protection against banking and fintech attacks" }
    ],
    'manufacturing': [
      { capability: "Integrated OT/IT security platform", benefit: "Comprehensive protection across all manufacturing systems" },
      { capability: "Production-continuity focused security", benefit: "Cyber protection that maintains operational availability" }
    ],
    'education': [
      { capability: "Automated FERPA compliance", benefit: "Ensure student privacy while enabling educational innovation" },
      { capability: "Secure digital learning environment", benefit: "Safe online education with privacy protection" }
    ],
    'government': [
      { capability: "NIST RMF automation and support", benefit: "Accelerated compliance and ATO processes" },
      { capability: "Critical infrastructure threat protection", benefit: "Enhanced national security and public safety" }
    ],
    'technology': [
      { capability: "DevSecOps automation and integration", benefit: "Security at the speed of development" },
      { capability: "Cloud-native security platform", benefit: "Comprehensive protection for modern tech stacks" }
    ]
  }
};

// Updated useEffect for processing data
useEffect(() => {
  if (!solutionsLoading && !caseStudiesLoading) {
    try {
      if (solutionsData && solutionsData.length > 0) {
        const processedSolutions = solutionsData.map(solution => {
          const IconComponent = LucideIcons[solution.icon as keyof typeof LucideIcons] || Building2;
          
          return {
            ...solution,
            icon: IconComponent,
            // Use fallback data for missing complex columns
            compliance_frameworks: solution.compliance_frameworks || fallbackData.compliance_frameworks[solution.solution_id] || [],
            compliance_features: solution.compliance_features || fallbackData.compliance_features[solution.solution_id] || [],
            compliance_benefits: solution.compliance_benefits || fallbackData.compliance_benefits[solution.solution_id] || [],
            features: solution.features || fallbackData.features[solution.solution_id] || [],
            value_proposition_problems: solution.value_proposition_problems || fallbackData.value_proposition_problems[solution.solution_id] || [],
            value_proposition_solutions: solution.value_proposition_solutions || fallbackData.value_proposition_solutions[solution.solution_id] || []
          };
        });
        setSolutions(processedSolutions);
      } else {
        setSolutions(realSolutions);
      }
      
      // Process case studies with fallback for results array
      if (caseStudiesData && caseStudiesData.length > 0) {
        const processedCaseStudies = caseStudiesData.map(study => ({
          ...study,
          results: study.results || [
            'Implementation completed successfully',
            'Enhanced security posture achieved',
            'Compliance requirements met',
            'Stakeholder satisfaction improved'
          ]
        }));
        setCaseStudies(processedCaseStudies);
      } else {
        setCaseStudies(capabilityShowcases);
      }
      
    } catch (error) {
      console.error("Error processing data:", error);
      setSolutions(realSolutions);
      setCaseStudies(capabilityShowcases);
    }
    
    setLoading(false);
  }
}, [solutionsLoading, caseStudiesLoading, solutionsData, caseStudiesData]);
 
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

    solutions.forEach((solution) => {
      const element = sectionRefs.current[solution.solution_id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [solutions]);

  return (
    <div className="py-20">
      {/* Hero Section */}
      <AnimatedSection type="fadeIn" className="mb-16 text-center px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Industry Solutions</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-4">
          CyberCaution™ by ERMITS - Your Early Warning Defense System
        </p>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
          Industry-specific cybersecurity solutions with Threat Weather System™, Rapid Response Playbooks, 
          and Predictive Breach Analytics tailored to your sector's unique threat landscape.
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

      {/* Core CyberCaution Features */}
      <AnimatedSection type="fadeIn" className="mb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Core CyberCaution™ Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Advanced cybersecurity intelligence that acts as your organization's immune system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="font-semibold mb-2">Threat Weather System™</h3>
                <p className="text-sm text-muted-foreground">Real-time risk climate for your industry</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="font-semibold mb-2">Rapid Response Playbooks</h3>
                <p className="text-sm text-muted-foreground">Reduce response time by 90% with pre-approved plans</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="font-semibold mb-2">Vendor Risk Radar</h3>
                <p className="text-sm text-muted-foreground">Continuous monitoring of your entire supply chain</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="font-semibold mb-2">Predictive Breach Analytics</h3>
                <p className="text-sm text-muted-foreground">AI identifies vulnerabilities before attackers do</p>
              </CardContent>
            </Card>
          </div>
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
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">{solution.title}</h2>
                      <p className="text-[#FF6B00] font-medium">{solution.tagline}</p>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8">
                    {solution.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Core Capabilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {solution.unique_features && solution.unique_features.map((feature: string, idx: number) => (
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
                      {solution.compliance_frameworks && solution.compliance_frameworks.map((framework: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary">
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Value Proposition */}
                  {solution.value_proposition_problems && solution.value_proposition_solutions && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-foreground">Why Choose CyberCaution for {solution.title}?</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#FF6B00]">Industry Challenges We Address:</h4>
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
                          <h4 className="text-lg font-medium mb-4 text-[#FF6B00]">CyberCaution Solutions:</h4>
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
                      Explore {solution.title} Solutions
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
                      <CardTitle>Compliance Features</CardTitle>
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
                        {solution.icon && <solution.icon className="h-6 w-6 text-[#FF6B00] mr-3" />}
                        <h3 className="font-semibold text-foreground">Rapid Deployment</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        CyberCaution deploys in hours, not months, delivering enterprise-grade protection tailored to {solution.title.toLowerCase()} environments.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                          <span>48-hour initial deployment</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                          <span>Industry-specific threat intelligence</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                          <span>Automated compliance monitoring</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Capability Showcases Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">CyberCaution in Action</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-world implementations demonstrating CyberCaution's industry-specific capabilities and rapid deployment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {capabilityShowcases.map((showcase, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <Card className="h-full hover:shadow-lg transition-shadow dark:border-muted">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {showcase.industry}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{showcase.title}</h3>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground">Challenge:</p>
                      <p className="text-sm text-muted-foreground">{showcase.challenge}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground">CyberCaution Solution:</p>
                      <p className="text-sm text-muted-foreground">{showcase.solution}</p>
                    </div>
                    
                    <div className="mb-4 flex-grow">
                      <p className="text-sm font-medium text-foreground">Key Capabilities:</p>
                      <ul className="space-y-2 mt-2">
                        {showcase.capabilities && showcase.capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="mt-auto">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Framework Alignment */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Framework Alignment</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CyberCaution is built on industry-standard security frameworks with specialized focus on ransomware protection
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
                    Comprehensive implementation of the NIST Cybersecurity Framework with enhanced focus on Identify, Protect, Detect, Respond, and Recover functions.
                  </p>
                  <Link to="/demo">
                    <Button variant="orange" className="w-full">
                      View Framework Mapping
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
                    Specialized controls for ransomware protection following NIST's Ransomware Risk Management guidance with CyberCaution's Ransomware Immunity Suite.
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
                    Supply chain security controls with CyberCaution's Vendor Risk Radar for continuous monitoring of your entire supply chain ecosystem.
                  </p>
                  <Link to="/demo">
                    <Button variant="orange" className="w-full">
                      Explore Supply Chain Security
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-6">
              Additional framework support includes ISO 27001, SOC 2, HIPAA, PCI DSS, FISMA, and other industry-specific standards.
            </p>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Complete Framework Guide
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Experience CyberCaution?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Discover how our Threat Weather System™ and industry-specific solutions can protect your organization
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