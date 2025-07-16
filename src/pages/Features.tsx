import React, { useState } from 'react';
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
  TrendingUp,
  Star,
  Award,
  Smartphone,
  Monitor,
  Globe
} from 'lucide-react';

const Features = () => {
  const [imageError, setImageError] = useState(false);
  
  // Map of Lucide icon names to components
  const LucideIcons = {
    ShieldAlert, Users, FileText, Database, ClipboardList, BarChart3, Building2, Heart, Network, 
    Eye, Link2, CheckCircle, Shield, Lock, GraduationCap, BookOpen, CalendarCheck, RefreshCw,
    Target, Clock, Gauge, TrendingUp, Star, Award, Settings
  };

  // Fetch feature categories from Supabase
  const { data: featureCategoriesData, loading: categoriesLoading, error: categoriesError } = useSupabaseQuery('feature_categories', {
    orderBy: { column: 'order_index', ascending: true }
  });

  // Fetch features list from Supabase
  const { data: featuresListData, loading: featuresLoading, error: featuresError } = useSupabaseQuery('features_list', {
    orderBy: { column: 'order_index', ascending: true }
  });

  // Enhanced loading state with skeleton UI
  if (categoriesLoading || featuresLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Security Features</h2>
          <p className="text-muted-foreground">Preparing your comprehensive cybersecurity toolkit...</p>
        </div>
      </div>
    );
  }

  // Enhanced error handling
  if (categoriesError || featuresError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Unable to Load Features</h2>
          <p className="text-muted-foreground mb-6">
            We're experiencing technical difficulties loading the features. Please try refreshing the page.
          </p>
          <Button 
            variant="orange" 
            onClick={() => window.location.reload()}
            className="mr-4"
          >
            Refresh Page
          </Button>
          <Link to="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </div>
    );
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

  // Enhanced fallback feature categories with more comprehensive content
  const fallbackFeatureCategories = [
    {
      id: 'ransomware',
      title: "Ransomware Protection Suite",
      description: "Industry-leading ransomware prevention, detection and recovery capabilities based on NIST IR 8374 and CISA guidance",
      icon: ShieldAlert,
      color: 'red-500',
      badge: 'Most Popular',
      features: [
        {
          icon: ShieldAlert,
          title: "3-Minute Ransomware Readiness Assessment",
          description: "Comprehensive evaluation of your organization's ransomware defenses aligned with NIST IR 8374 and CISA best practices. Get instant scoring and actionable recommendations.",
          frameworks: ["NIST IR 8374", "CISA", "NIST CSF v2.0"],
          path: "/ransomware-assessment",
          popular: true,
          difficulty: "Beginner",
          time: "3 minutes"
        },
        {
          icon: Users,
          title: "Interactive Tabletop Exercise Platform",
          description: "Ready-to-use ransomware incident response scenarios with guided facilitation tools. Train your team with realistic attack simulations.",
          frameworks: ["NIST IR 8374", "CISA Tabletop"],
          path: "/tabletop-exercise",
          difficulty: "Intermediate", 
          time: "60-90 minutes"
        },
        {
          icon: FileText,
          title: "Automated Response Playbooks",
          description: "Generate customized ransomware response playbooks tailored to your organization's infrastructure and risk profile.",
          frameworks: ["NIST CSF", "NIST IR 8374"],
          path: "/contact",
          difficulty: "Advanced",
          time: "15 minutes"
        },
        {
          icon: Database,
          title: "Backup Recovery Validation",
          description: "Automated testing framework to verify your backup systems can successfully restore operations after a ransomware attack.",
          frameworks: ["NIST SP 800-30", "NIST CSF"],
          path: "/backup-readiness-assessment",
          difficulty: "Expert",
          time: "30 minutes"
        }
      ]
    },
    {
      id: 'compliance',
      title: "Compliance & Governance",
      description: "Streamline regulatory compliance with automated frameworks and continuous monitoring capabilities",
      icon: CheckCircle,
      color: 'green-600',
      badge: 'Comprehensive',
      features: [
        {
          icon: Shield,
          title: "NIST Cybersecurity Framework Assessment",
          description: "Complete assessment tool for NIST CSF v2.0 implementation with gap analysis and implementation roadmap generation.",
          frameworks: ["NIST CSF v2.0"],
          path: "/nist-csf-alignment",
          difficulty: "Intermediate",
          time: "45 minutes"
        },
        {
          icon: Link2,
          title: "Multi-Framework Control Mapping",
          description: "Intelligent mapping between NIST CSF, RMF, ISO 27001, SOC 2, and other frameworks to eliminate duplicate work.",
          frameworks: ["NIST CSF", "ISO 27001", "SOC 2"],
          path: "/contact",
          difficulty: "Advanced",
          time: "20 minutes"
        },
        {
          icon: FileText,
          title: "Automated Policy Generator",
          description: "AI-powered policy creation tool that generates customized security policies based on your industry and requirements.",
          frameworks: ["Multiple"],
          path: "/contact",
          difficulty: "Beginner",
          time: "10 minutes"
        },
        {
          icon: Award,
          title: "Continuous Compliance Monitoring",
          description: "Real-time monitoring dashboard that tracks your compliance posture and alerts you to potential violations.",
          frameworks: ["NIST CSF", "ISO 27001"],
          path: "/contact",
          difficulty: "Expert",
          time: "Ongoing"
        }
      ]
    },
    {
      id: 'risk',
      title: "Enterprise Risk Management",
      description: "Advanced risk assessment and management tools powered by NIST methodologies and industry best practices",
      icon: ClipboardList,
      color: 'blue-600',
      badge: 'Enterprise',
      features: [
        {
          icon: ClipboardList,
          title: "Dynamic Risk Register",
          description: "Intelligent risk management system that automatically maps threats to NIST CSF controls and provides real-time risk scoring.",
          frameworks: ["NIST CSF", "NIST RMF", "ISO 31000"],
          path: "/contact",
          difficulty: "Advanced",
          time: "30 minutes"
        },
        {
          icon: BarChart3,
          title: "Predictive Risk Analytics",
          description: "Advanced analytics platform using machine learning to predict emerging threats and assess risk impact across your organization.",
          frameworks: ["NIST SP 800-30", "FAIR"],
          path: "/contact",
          difficulty: "Expert",
          time: "Ongoing"
        },
        {
          icon: Building2,
          title: "Business Impact Assessment Tool",
          description: "Comprehensive BIA toolkit that evaluates operational and financial impact of security incidents on critical business functions.",
          frameworks: ["NIST CSF", "ISO 27001"],
          path: "/contact",
          difficulty: "Intermediate",
          time: "60 minutes"
        },
        {
          icon: Heart,
          title: "Business Continuity Planner",
          description: "Integrated platform for developing and maintaining business continuity and disaster recovery plans for security incidents.",
          frameworks: ["NIST SP 800-34", "ISO 22301"],
          path: "/contact",
          difficulty: "Advanced",
          time: "120 minutes"
        }
      ]
    },
    {
      id: 'supply-chain',
      title: "Supply Chain Security",
      description: "Comprehensive third-party risk management and supply chain security assessment capabilities",
      icon: Network,
      color: 'purple-600',
      badge: 'Strategic',
      features: [
        {
          icon: Network,
          title: "Supply Chain Risk Assessment",
          description: "Comprehensive framework for evaluating and managing supply chain security risks based on NIST SP 800-161 guidelines.",
          frameworks: ["NIST SP 800-161", "C-SCRM"],
          path: "/supply-chain-assessment",
          difficulty: "Advanced",
          time: "45 minutes"
        },
        {
          icon: Eye,
          title: "Vendor Security Monitoring",
          description: "Continuous monitoring platform that tracks security posture and incidents across your critical vendor ecosystem.",
          frameworks: ["NIST SP 800-161", "Third-Party Risk"],
          path: "/contact",
          difficulty: "Expert",
          time: "Ongoing"
        },
        {
          icon: FileText,
          title: "Third-Party Due Diligence Automation",
          description: "Streamlined workflows for conducting security assessments and ongoing due diligence of third-party vendors.",
          frameworks: ["NIST SP 800-161", "Vendor Risk"],
          path: "/contact",
          difficulty: "Intermediate",
          time: "30 minutes"
        },
        {
          icon: Link2,
          title: "Dependency Risk Mapping",
          description: "Visual mapping tool that identifies and analyzes dependencies between your systems and third-party services.",
          frameworks: ["NIST SP 800-161", "SBOM"],
          path: "/contact",
          difficulty: "Advanced",
          time: "60 minutes"
        }
      ]
    },
    {
      id: 'resources',
      title: "Training & Resources",
      description: "Educational resources and implementation tools to enhance your security program effectiveness",
      icon: GraduationCap,
      color: 'orange-600',
      badge: 'Essential',
      features: [
        {
          icon: GraduationCap,
          title: "Role-Based Security Training",
          description: "Comprehensive training modules tailored to specific roles within your organization, from executives to technical staff.",
          frameworks: ["NIST SP 800-50", "Security Awareness"],
          path: "/security-awareness",
          difficulty: "Beginner",
          time: "30-60 minutes"
        },
        {
          icon: BookOpen,
          title: "Template & Policy Library",
          description: "Extensive collection of customizable security policies, procedures, and implementation templates.",
          frameworks: ["Multiple Frameworks"],
          path: "/contact",
          difficulty: "Beginner",
          time: "5 minutes"
        },
        {
          icon: CalendarCheck,
          title: "Assessment Scheduling & Management",
          description: "Automated scheduling system for regular security assessments, reviews, and compliance audits.",
          frameworks: ["Compliance Management"],
          path: "/contact",
          difficulty: "Intermediate",
          time: "Setup: 15 minutes"
        },
        {
          icon: RefreshCw,
          title: "Implementation Guidance System",
          description: "Step-by-step implementation guides with progress tracking for security frameworks and best practices.",
          frameworks: ["NIST CSF", "Implementation"],
          path: "/contact",
          difficulty: "Intermediate",
          time: "Varies"
        }
      ]
    }
  ];

  // Enhanced mobile dashboard image with fallback handling
  const getMobileDashboardImage = () => {
    // Try to use appAssets first, fallback to CDN image
    try {
      // Dynamic import of appAssets with error handling
      return require('../utils/supabaseAssets').appAssets?.mobileDashboard || 
             'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
    } catch (error) {
      console.warn('Unable to load supabaseAssets, using fallback image');
      return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
    }
  };

  const finalFeatureCategories = featureCategories.length > 0 ? featureCategories : fallbackFeatureCategories;

  return (
    <div className="py-20">
      {/* Enhanced Hero Section */}
      <AnimatedSection type="fadeIn" className="mb-20 text-center px-4 md:px-6">
        <div className="inline-block mb-6">
          <span className="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
            🚀 Comprehensive Security Platform
          </span>
        </div>
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Complete Security & Risk Management
        </h1>
        <p className="text-xl text-orange-500 max-w-4xl mx-auto mb-8 leading-relaxed">
          Transform your cybersecurity posture with industry-leading tools for ransomware protection, 
          compliance automation, and risk management. Trusted by organizations worldwide.
        </p>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Faster Implementation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Security Frameworks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Continuous Monitoring</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/ransomware-assessment">
            <Button variant="orange" size="lg">
              Start Free 3-Minute Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg">
              <Globe className="mr-2 h-5 w-5" />
              See Live Demo
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      {/* Feature Categories */}
      {finalFeatureCategories.map((category, categoryIndex) => (
        <AnimatedSection 
          key={category.id} 
          type="fadeIn" 
          className="mb-24 px-4 md:px-6"
          delay={categoryIndex * 0.1}
        >
          <div className="mb-16 text-center">
            <div className="inline-block p-3 bg-muted mb-6 rounded-2xl">
              <div className={`rounded-xl bg-${category.color}/10 text-${category.color} p-4`}>
                {category.icon && <category.icon className="h-10 w-10" />}
              </div>
            </div>
            
            {category.badge && (
              <div className="inline-block mb-4">
                <span className={`bg-${category.color}/10 text-${category.color} px-3 py-1 rounded-full text-sm font-medium`}>
                  {category.badge}
                </span>
              </div>
            )}
            
            <h2 className="text-4xl font-bold mb-4 text-foreground">{category.title}</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {category.features.map((feature, index) => (
              <AnimatedItem key={index} type="scaleIn" delay={index * 0.05 + 0.2} className="card-hover">
                <Link to={feature.path}>
                  <Card className="hover:shadow-xl transition-all duration-300 h-full dark:border-muted flex flex-col group">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {feature.icon && (
                        <div className="mb-4">
                          <feature.icon className="h-12 w-12 text-[#FF6B00] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {feature.frameworks?.map((framework, i) => (
                          <span key={i} className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                            {framework}
                          </span>
                        )) || []}
                        {feature.popular && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-orange-500 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                        {feature.description}
                      </p>

                      {(feature.difficulty || feature.time) && (
                        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                          {feature.difficulty && (
                            <div className="flex items-center">
                              <Gauge className="h-3 w-3 mr-1" />
                              {feature.difficulty}
                            </div>
                          )}
                          {feature.time && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {feature.time}
                            </div>
                          )}
                        </div>
                      )}

                      <Button variant="orange" className="mt-auto w-full group-hover:shadow-lg transition-shadow">
                        Explore Feature
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedItem>
            ))}
          </div>
          
          {/* Category-specific CTA */}
          <div className="flex justify-center mt-16">
            <Link to={category.features[0]?.path || "/demo"}>
              <Button variant="outline" size="lg">
                <category.icon className="mr-2 h-5 w-5" />
                Explore All {category.title} Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      ))}

      {/* Enhanced Mobile Support Section */}
      <AnimatedSection type="fadeIn" className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile-First Security
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Secure from Anywhere, Anytime
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                CyberCaution by ERMITS® delivers a fully responsive, mobile-optimized experience 
                that ensures your security team stays connected and responsive regardless of location.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Monitor className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Real-Time Dashboard Access</h3>
                    <p className="text-muted-foreground">Monitor your complete security posture with live threat feeds and compliance status updates.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Bell className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Alert Response</h3>
                    <p className="text-muted-foreground">Receive and respond to critical security alerts immediately, even when away from your desk.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Emergency Playbook Access</h3>
                    <p className="text-muted-foreground">Access incident response plans and emergency procedures during critical situations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Team Collaboration Tools</h3>
                    <p className="text-muted-foreground">Coordinate with your security team through integrated communication and task management.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/demo">
                  <Button variant="orange">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Explore Mobile Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/download">
                  <Button variant="outline">
                    Download App Guide
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-blue-500/20 rounded-3xl transform rotate-6 blur-lg"></div>
                <div className="relative">
                  <img 
                    src={getMobileDashboardImage()}
                    alt="CyberCaution Mobile Dashboard" 
                    className="relative rounded-3xl shadow-2xl z-10 border border-white dark:border-gray-800 w-full"
                    onError={(e) => {
                      if (!imageError) {
                        setImageError(true);
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
                      }
                    }}
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced CTA Section */}
      <AnimatedSection type="fadeIn" className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8F40] rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute top-20 right-20 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-block mb-6">
                <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  🎯 Start Your Security Transformation
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Revolutionize Your Security?
              </h2>
              <p className="text-white/90 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
                Join thousands of organizations that have transformed their cybersecurity posture with 
                CyberCaution™ by ERMITS. Get started with our free assessment and see immediate results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/ransomware-assessment">
                  <Button 
                    variant="white" 
                    size="lg"
                    className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90 shadow-xl"
                  >
                    <ShieldAlert className="mr-2 h-5 w-5" />
                    Start Free 3-Minute Assessment
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Schedule Personal Demo
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center text-white/90">
                  <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm">Free Assessment</div>
                </div>
                <div className="text-center text-white/90">
                  <Star className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm">Instant Results</div>
                </div>
                <div className="text-center text-white/90">
                  <Award className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm">Expert Guidance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Features;