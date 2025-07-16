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
  Smartphone
} from 'lucide-react';

const Features = () => {
  const [imageError, setImageError] = useState(false);

  // Map of Lucide icon names to components
  const LucideIcons = {
    ShieldAlert, Users, FileText, Database, ClipboardList, BarChart3, Building2, Heart, Network, 
    Eye, Link2, CheckCircle, Shield, Lock, GraduationCap, BookOpen, CalendarCheck, RefreshCw,
    Zap, Target, Clock, Gauge, TrendingUp
  };

  // Fetch feature categories from Supabase
  const { data: featureCategoriesData, loading: categoriesLoading, error: categoriesError } = useSupabaseQuery('feature_categories', {
    orderBy: { column: 'order_index', ascending: true }
  });

  // Fetch features list from Supabase
  const { data: featuresListData, loading: featuresLoading, error: featuresError } = useSupabaseQuery('features_list', {
    orderBy: { column: 'order_index', ascending: true }
  });

  // Enhanced loading state
  if (categoriesLoading || featuresLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Loading CyberCaution Features</h2>
          <p className="text-muted-foreground">Preparing your security toolkit...</p>
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
            We're experiencing technical difficulties. Please try refreshing the page.
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

  // Safe image loading
  const getMobileDashboardImage = () => {
    try {
      const { appAssets } = require('../utils/supabaseAssets');
      return appAssets?.mobileDashboard || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
    } catch (error) {
      console.warn('Asset loading error:', error);
      return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
    }
  };

  // If no categories found, show setup message
  if (!featureCategories || featureCategories.length === 0) {
    return (
      <div className="py-20">
        <AnimatedSection type="fadeIn" className="mb-16 text-center px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-6 text-foreground">CyberCaution Security Platform</h1>
          <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-8">
            Your comprehensive cybersecurity solution
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
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-blue-50 dark:bg-blue-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Setting Up Your Features</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your database is ready! Please add your feature categories and features to see them displayed here.
            </p>
            <Link to="/contact">
              <Button variant="orange">Contact Support for Setup</Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

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

      {/* Feature Categories - Now from Database */}
      {featureCategories.map((category, categoryIndex) => (
        <AnimatedSection 
          key={category.id} 
          type="fadeIn" 
          className="mb-24 px-4 md:px-6"
          delay={categoryIndex * 0.1}
        >
          <div className="mb-12 text-center">
            <div className="inline-block p-2 bg-muted mb-4 rounded-xl">
              <div className={`rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600 p-3`}>
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
              <AnimatedItem key={feature.id} type="scaleIn" delay={index * 0.05 + 0.2} className="card-hover">
                <Link to={feature.path}>
                  <Card className="hover:shadow-lg transition-shadow h-full dark:border-muted flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {feature.icon && <feature.icon className="h-12 w-12 text-[#FF6B00] mb-4" />}
                      
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {feature.frameworks?.map((framework, i) => (
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
          
          {/* Category-specific CTA */}
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

      {/* Final CTA */}
      <AnimatedSection type="fadeIn" className="py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-lg text-orange-500 mb-8 max-w-2xl mx-auto">
            Start your ransomware protection journey with CyberCaution™ by ERMITS today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button variant="orange">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline">
                Request Personalized Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
                  <Smartphone className="mr-2 h-4 w-4" />
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
                  src={getMobileDashboardImage()}
                  alt="Mobile dashboard" 
                  className="relative rounded-3xl shadow-xl z-10 border border-white dark:border-gray-800"
                  onError={(e) => {
                    if (!imageError) {
                      setImageError(true);
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
                    }
                  }}
                />
              </div>
            </div>
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
                Ready to Transform Your Security Program?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Get started with CyberCaution™ by ERMITS today and take control of your security and compliance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ransomware-assessment">
                  <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                    Start 3-Minute Ransomware Readiness Assessment
                  </Button>
                </Link>
                <Link to="/contact">
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
    </div>
  );
};

export default Features;