import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useSupabaseQuery } from '../hooks/useSupabase';
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
  RefreshCw,
  Target,
  Clock,
  Gauge,
  TrendingUp
} from 'lucide-react';

const Features = () => {
  // Map of Lucide icon names to components
  const LucideIcons = {
    ShieldAlert, Users, FileText, Database, ClipboardList, BarChart3, Building2, Heart, Network, 
    Eye, Link2, CheckCircle, Shield, Lock, GraduationCap, BookOpen, CalendarCheck, RefreshCw
  };

  // Fetch feature categories from Supabase
  const { data: featureCategoriesData, loading: categoriesLoading, error: categoriesError } = useSupabaseQuery('feature_categories', {
    orderBy: { column: 'order_index', ascending: true }
  });

  // Fetch features list from Supabase
  const { data: featuresListData, loading: featuresLoading, error: featuresError } = useSupabaseQuery('features_list', {
    orderBy: { column: 'order_index', ascending: true }
  });

  if (categoriesLoading || featuresLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading features...</div>;
  }

  if (categoriesError || featuresError) {
    return <div className="min-h-screen flex items-center justify-center text-critical-red">Error loading features: {categoriesError || featuresError}</div>;
  }

  // Process the data - map icon strings to actual components
  const featureCategories = featureCategoriesData?.map(category => {
    const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] || Shield;
    return {
      ...category,
      icon: IconComponent,
      features: featuresListData?.filter(feature => feature.category_id === category.id).map(feature => {
        const FeatureIconComponent = LucideIcons[feature.icon as keyof typeof LucideIcons] || FileText;
        return {
          ...feature,
          icon: FeatureIconComponent
        };
      }) || []
    };
  }) || [];

  // Fallback if no data is fetched (should not happen if loading/error handled)
  const fallbackFeatureCategories = [

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
          path: "/demo"
        },
        {
          icon: Link2,
          title: "Control Mapping",
          description: "Cross-framework control mapping between NIST CSF, RMF, ISO 27001, and other major frameworks.",
          frameworks: ["Multiple"],
          path: "/demo"
        },
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
          path: "/demo"
        },
        {
          icon: FileText,
          title: "Ransomware Playbooks",
          description: "Generate customized ransomware response playbooks aligned with NIST frameworks and tailored to your organization.",
          frameworks: ["NIST CSF", "NIST IR 8374"],
          path: "/demo"
        },
        {
          icon: Database,
          title: "Backup Validation Tool",
          description: "Test and verify your backup restoration capabilities to ensure recoverability from ransomware attacks.",
          frameworks: ["NIST SP 800-30", "NIST CSF"],
          path: "/demo"
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
          path: "/demo"
        },
        {
          icon: BarChart3,
          title: "Risk Analytics",
          description: "Advanced risk analytics based on NIST risk assessment methodologies and industry best practices.",
          frameworks: ["NIST SP 800-30", "NIST CSF"],
          path: "/demo"
        },
        {
          icon: Building2,
          title: "Business Impact Analysis",
          description: "Evaluate the operational and financial impact of security incidents on critical business functions.",
          frameworks: ["NIST CSF", "ISO 27001"],
          path: "/demo"
        },
        {
          icon: Heart,
          title: "Business Continuity Planning",
          description: "Develop and maintain business continuity and disaster recovery plans for security incidents.",
          frameworks: ["NIST SP 800-34", "ISO 22301"],
          path: "/demo"
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
          path: "/demo"
        },
        {
          icon: Eye,
          title: "Vendor Security Monitoring",
          description: "Continuously monitor your critical vendors and suppliers for security risks and vulnerabilities.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/demo"
        },
        {
          icon: FileText,
          title: "Third-Party Due Diligence",
          description: "Streamlined workflows for vendor security assessments and ongoing due diligence.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/demo"
        },
        {
          icon: Link2,
          title: "Dependency Risk Mapping",
          description: "Map and visualize dependencies between your systems and third-party services to identify critical risks.",
          frameworks: ["NIST SP 800-161", "Supply Chain"],
          path: "/demo"
        }
      ]
    },
  
        {
          icon: CheckCircle,
          title: "Compliance Dashboard",
          description: "Real-time visibility into your compliance posture across multiple regulatory frameworks.",
          frameworks: ["Multiple"],
          path: "/demo"
        },
        {
          icon: Lock,
          title: "Risk Management Framework",
          description: "Implement the NIST Risk Management Framework (RMF) with guided workflows and documentation.",
          frameworks: ["NIST RMF"],
          path: "/demo"
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
          path: "/demo"
        },
        {
          icon: BookOpen,
          title: "Documentation Library",
          description: "Comprehensive template library for security policies, procedures, and controls.",
          frameworks: ["Multiple"],
          path: "/demo"
        },
        {
          icon: CalendarCheck,
          title: "Assessment Scheduling",
          description: "Schedule and manage regular security assessments and compliance reviews.",
          frameworks: ["Multiple"],
          path: "/demo"
        },
        {
          icon: RefreshCw,
          title: "Continuous Monitoring",
          description: "Automated monitoring tools to maintain visibility into your security and compliance posture.",
          frameworks: ["NIST CSF", "NIST RMF"],
          path: "/demo"
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
            <Button variant="orange">
              Start Ransomware Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline">
              See the Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
              <Link to="/demo">
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
      
      
      {/* Feature Categories */}
      {(featureCategories.length > 0 ? featureCategories : fallbackFeatureCategories).map((category, categoryIndex) => (
        <AnimatedSection 
          key={category.id} 
          type="fadeIn" 
          className="mb-24 px-4 md:px-6"
          delay={categoryIndex * 0.1}
        >
          <div className="mb-12 text-center">
            <div className="inline-block p-2 bg-muted mb-4 rounded-xl">
              <div className={`rounded-lg bg-${category.color}/10 text-${category.color} p-3`}>
                {category.icon && <category.icon className="h-8 w-8" />}
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
                      {feature.icon && <feature.icon className="h-12 w-12 text-[#FF6B00] mb-4" />}
                      
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
            <Link to={category.features[0]?.path || "/demo"}>
              <Button variant="outline">
                Explore All {category.title} Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      ))}

    
    

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Security Program?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Get started with CyberCaution™ by ERMITS today and take control of your security and compliance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ransomware-assessment">
                  <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                    Start Free Assessment
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
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
              <Button variant="orange">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline">
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