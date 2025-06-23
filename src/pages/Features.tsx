import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  FileText, 
  BarChart3, 
  CheckCircle, 
  Zap,
  Users,
  Bell,
  Database,
  LineChart,
  Link2,
  ShieldAlert,
  Building2,
  AlertTriangle,
  ClipboardList,
  Network,
  BookOpen,
  CalendarCheck,
  ArrowRight,
  Eye,
  GraduationCap,
  Settings,
  Heart,
  RefreshCw
} from 'lucide-react';

const Features = () => {
  // Categories for better organization
  const featureCategories = [
    {
      id: 'ransomware',
      title: "Ransomware Protection",
      description: "Industry-leading ransomware prevention, detection and recovery capabilities based on NIST IR 8374",
      icon: ShieldAlert,
      color: 'orange-500',
      features: [
        {
          icon: ShieldAlert,
          title: "Ransomware Readiness Assessment",
          description: "Comprehensive ransomware readiness assessment aligned with NIST IR 8374 and NIST CSF v2.0 to evaluate your organization's defense capabilities.",
          frameworks: ["NIST IR 8374", "NIST CSF"],
          path: "/ransomware-assessment"
        },
        {
          icon: Users,
          title: "Tabletop Exercise Kits",
          description: "Ready-to-use ransomware tabletop exercises based on real-world scenarios and NIST guidance for response team training.",
          frameworks: ["NIST IR 8374", "NIST CSF"],
          path: "/tabletop-exercise"
        },
        {
          icon: FileText,
          title: "Ransomware Playbooks",
          description: "Generate customized ransomware response playbooks aligned with NIST frameworks and tailored to your organization.",
          frameworks: ["NIST CSF", "NIST IR 8374"],
          path: "/app/toolkit/playbook-generator"
        },
        {
          icon: Database,
          title: "Backup Validation Tool",
          description: "Test and verify your backup restoration capabilities to ensure recoverability from ransomware attacks.",
          frameworks: ["NIST SP 800-30", "NIST CSF"],
          path: "/app/toolkit/backup-validation"
        }
      ]
    },
    {
      id: 'risk',
      title: "Risk Management",
      description: "Comprehensive tools to identify, assess, and manage security risks across your organization",
      icon: ClipboardList,
      color: 'electric-blue',
      features: [
        {
          icon: ClipboardList,
          title: "Risk Register Mapping",
          description: "Map ransomware risks to NIST CSF ID.RA controls for comprehensive risk management and prioritization.",
          frameworks: ["NIST CSF", "NIST RMF"],
          path: "/app/risk-register"
        },
        {
          icon: BarChart3,
          title: "Risk Analytics",
          description: "Advanced risk analytics based on NIST risk assessment methodologies and industry best practices.",
          frameworks: ["NIST SP 800-30", "NIST CSF"],
          path: "/app/risk-assessment"
        },
        {
          icon: Building2,
          title: "Business Impact Analysis",
          description: "Evaluate the operational and financial impact of security incidents on critical business functions.",
          frameworks: ["NIST CSF", "ISO 27001"],
          path: "/app/business-impact"
        },
        {
          icon: Heart,
          title: "Business Continuity Planning",
          description: "Develop and maintain business continuity and disaster recovery plans for security incidents.",
          frameworks: ["NIST SP 800-34", "ISO 22301"],
          path: "/app/continuity"
        }
      ]
    },
    {
      id: 'supply-chain',
      title: "Supply Chain Security",
      description: "Secure your supply chain and third-party relationships with comprehensive risk assessment tools",
      icon: Network,
      color: 'warning-amber',
      features: [
        {
          icon: Network,
          title: "Supply Chain Risk Assessment",
          description: "Comprehensive assessment framework for evaluating supply chain security risks based on NIST guidance.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/supply-chain-assessment"
        },
        {
          icon: Eye,
          title: "Vendor Security Monitoring",
          description: "Continuously monitor your critical vendors and suppliers for security risks and vulnerabilities.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/app/supply-chain-risk-dashboard"
        },
        {
          icon: FileText,
          title: "Third-Party Due Diligence",
          description: "Streamlined workflows for vendor security assessments and ongoing due diligence.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/app/supply-chain-risk-dashboard"
        },
        {
          icon: Link2,
          title: "Dependency Risk Mapping",
          description: "Map and visualize dependencies between your systems and third-party services to identify critical risks.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/app/dependency-manager"
        }
      ]
    },
    {
      id: 'compliance',
      title: "Compliance & Governance",
      description: "Maintain regulatory compliance and implement security frameworks with purpose-built tools",
      icon: CheckCircle,
      color: 'secure-green',
      features: [
        {
          icon: Shield,
          title: "NIST CSF Alignment",
          description: "Assess and improve your alignment with the NIST Cybersecurity Framework with guided implementation tools.",
          frameworks: ["NIST CSF"],
          path: "/nist-csf-alignment"
        },
        {
          icon: Link2,
          title: "Control Mapping",
          description: "Cross-framework control mapping between NIST CSF, RMF, ISO 27001, and other major frameworks.",
          frameworks: ["Multiple"],
          path: "/app/control-mapping"
        },
        {
          icon: CheckCircle,
          title: "Compliance Dashboard",
          description: "Real-time visibility into your compliance posture across multiple regulatory frameworks.",
          frameworks: ["Multiple"],
          path: "/app/compliance"
        },
        {
          icon: Lock,
          title: "Risk Management Framework",
          description: "Implement the NIST Risk Management Framework (RMF) with guided workflows and documentation.",
          frameworks: ["NIST RMF"],
          path: "/app/rmf"
        }
      ]
    },
    {
      id: 'resources',
      title: "Resources & Tools",
      description: "Supporting resources to enhance your security program and streamline implementation",
      icon: Zap,
      color: 'cta-orange',
      features: [
        {
          icon: GraduationCap,
          title: "Security Training",
          description: "Role-based security awareness training and educational resources for your entire organization.",
          frameworks: ["NIST SP 800-50", "NIST CSF"],
          path: "/app/training"
        },
        {
          icon: BookOpen,
          title: "Documentation Library",
          description: "Comprehensive template library for security policies, procedures, and controls.",
          frameworks: ["Multiple"],
          path: "/app/documents"
        },
        {
          icon: CalendarCheck,
          title: "Assessment Scheduling",
          description: "Schedule and manage regular security assessments and compliance reviews.",
          frameworks: ["Multiple"],
          path: "/app/toolkit"
        },
        {
          icon: RefreshCw,
          title: "Continuous Monitoring",
          description: "Automated monitoring tools to maintain visibility into your security and compliance posture.",
          frameworks: ["NIST CSF", "NIST RMF"],
          path: "/app/toolkit"
        }
      ]
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <AnimatedSection type="fadeIn" className="mb-16 text-center px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Comprehensive Security & Risk Management</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-8">
          All the tools you need to protect your organization from ransomware and other security threats
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/ransomware-assessment">
            <Button variant="orange" size="lg">
              Start Ransomware Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/nist-csf-alignment">
            <Button variant="outline" size="lg">
              Explore NIST CSF Alignment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <AnimatedSection 
          key={category.id} 
          type="fadeIn" 
          className="mb-24 px-4 md:px-6"
          delay={categoryIndex * 0.1}
        >
          <div className="mb-12 text-center">
            <div className="inline-block p-2 bg-muted mb-4 rounded-xl">
              <div className={`rounded-lg bg-${category.color}/10 text-${category.color} p-3`}>
                <category.icon className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-foreground">{category.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {category.features.map((feature, index) => (
              <AnimatedItem key={index} type="scaleIn" delay={index * 0.05 + 0.2} className="card-hover">
                <Link to={feature.path}>
                  <Card className="hover:shadow-lg transition-shadow h-full dark:border-muted flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <feature.icon className="h-12 w-12 text-[#FF6B00] mb-4" />
                      
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {feature.frameworks.map((framework, i) => (
                          <span key={i} className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                            {framework}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1">{feature.description}</p>

                      <Button variant="orange" className="mt-auto w-full">
                        Explore Feature
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedItem>
            ))}
          </div>
          
          {/* Category-specific CTA based on category */}
          <div className="flex justify-center mt-12">
            <Link to={category.features[0].path}>
              <Button variant="outline" size="lg">
                Explore All {category.title} Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      ))}

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
                  <Link to="/documentation/nist-ir-8374-guide">
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

      {/* Feature Comparison */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Comprehensive Feature Comparison</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CyberCaution™ by ERMITS offers a complete set of tools for every aspect of your security program
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="p-4 text-left font-semibold">Feature Category</th>
                  <th className="p-4 text-center font-semibold">Standard</th>
                  <th className="p-4 text-center font-semibold">Professional</th>
                  <th className="p-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Ransomware Protection</td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Risk Register & Assessment</td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Supply Chain Security</td>
                  <td className="p-4 text-center">Limited</td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Tabletop Exercises</td>
                  <td className="p-4 text-center">1 template</td>
                  <td className="p-4 text-center">5 templates</td>
                  <td className="p-4 text-center">Unlimited + Custom</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">NIST CSF Alignment</td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Business Impact Analysis</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center">Advanced</td>
                  <td className="p-4 text-center">Enterprise-grade</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Multi-Framework Compliance</td>
                  <td className="p-4 text-center">1 framework</td>
                  <td className="p-4 text-center">3 frameworks</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Custom Integrations</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">Limited</td>
                  <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Security Program?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Get started with CyberCaution by ERMITS® today and take control of your security and compliance
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
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Testimonials Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Trusted by Security Leaders</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See why security professionals choose CyberCaution by ERMITS®
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "CyberCaution has transformed our ransomware defense strategy. The NIST alignment makes compliance straightforward.",
                author: "Sarah Johnson",
                title: "CISO, Financial Services",
                avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                quote: "The tabletop exercise kits saved us months of preparation work and helped uncover critical gaps in our response plan.",
                author: "Michael Chen",
                title: "Security Director, Healthcare",
                avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                quote: "Business impact analysis tools helped us prioritize our security investments where they matter most.",
                author: "Jennifer Lopez",
                title: "Risk Manager, Technology",
                avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150"
              }
            ].map((testimonial, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.3}>
                <Card className="dark:border-muted">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-200 dark:text-orange-700">
                          <path d="M13.296 35.736C11.064 35.736 8.952 35.16 6.96 34.008C4.968 32.856 3.336 31.248 2.064 29.184C0.792 27.12 0.156 24.72 0.156 21.984C0.156 19.056 0.876 16.272 2.316 13.632C3.756 10.992 5.724 8.64 8.22 6.576C10.716 4.512 13.512 2.952 16.608 1.896L18.78 5.736C16.332 6.696 14.1 8.136 12.084 10.056C10.068 11.976 8.808 14.016 8.304 16.176C8.4 16.128 8.724 16.104 9.276 16.104C11.34 16.104 13.02 16.776 14.316 18.12C15.612 19.416 16.26 21.144 16.26 23.304C16.26 25.56 15.588 27.36 14.244 28.704C12.9 30.048 11.256 35.736 13.296 35.736ZM31.38 35.736C29.148 35.736 27.036 35.16 25.044 34.008C23.052 32.856 21.42 31.248 20.148 29.184C18.876 27.12 18.24 24.72 18.24 21.984C18.24 19.056 18.96 16.272 20.4 13.632C21.84 10.992 23.808 8.64 26.304 6.576C28.8 4.512 31.596 2.952 34.692 1.896L36.864 5.736C34.416 6.696 32.184 8.136 30.168 10.056C28.152 11.976 26.892 14.016 26.388 16.176C26.484 16.128 26.808 16.104 27.36 16.104C29.424 16.104 31.104 16.776 32.4 18.12C33.696 19.416 34.344 21.144 34.344 23.304C34.344 25.56 33.672 27.36 32.328 28.704C30.984 30.048 29.34 35.736 31.38 35.736Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <p className="text-foreground italic mb-6 flex-1">"{testimonial.quote}"</p>
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Mobile Support */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                  Anywhere Access
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Access Your Security Data Anywhere</h2>
              <p className="text-lg text-muted-foreground mb-6">
                CyberCaution by ERMITS® provides mobile-optimized interfaces, allowing you to:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#FF6B00] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Monitor security status on the go</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#FF6B00] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Respond to security alerts from anywhere</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#FF6B00] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Access incident response plans during emergencies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#FF6B00] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Review and approve security actions remotely</span>
                </li>
              </ul>
              <Link to="/app/dashboard-new">
                <Button variant="orange">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative max-w-xs">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-blue-500/20 rounded-3xl transform rotate-6"></div>
                <img 
                  src="https://images.pexels.com/photos/6893825/pexels-photo-6893825.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Mobile dashboard" 
                  className="relative rounded-3xl shadow-xl z-10 border border-white dark:border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Integration Partners */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Integration Partners</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CyberCaution™ by ERMITS integrates with your existing security tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'Microsoft', 'AWS', 'Google Cloud', 'Splunk', 
              'Crowdstrike', 'Okta', 'Salesforce', 'ServiceNow', 
              'Jamf', 'Slack', 'Teams', 'Jira'
            ].map((partner, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
                <div className="bg-background dark:bg-muted/30 rounded-lg p-4 h-24 flex items-center justify-center border border-border">
                  <span className="text-foreground font-medium">{partner}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Final CTA */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-lg text-orange-500 mb-8 max-w-2xl mx-auto">
            Start your ransomware protection journey with CyberCaution™ by ERMITS today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ransomware-assessment">
              <Button variant="orange" size="lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Features;