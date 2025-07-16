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
  Database,
  Link2,
  ShieldAlert,
  Building2,
  ClipboardList,
  Network,
  BookOpen,
  CalendarCheck,
  ArrowRight,
  Eye,
  GraduationCap,
  Heart,
  RefreshCw,
  AlertTriangle,
  Smartphone,
  Globe
} from 'lucide-react';

const Features = () => {
  const [imageError, setImageError] = useState(false);
  
  // Map of Lucide icon names to components for Supabase data
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

  // Loading state
  if (categoriesLoading || featuresLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Features</h2>
          <p className="text-muted-foreground">Please wait while we load your content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (categoriesError || featuresError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Unable to Load Features</h2>
          <p className="text-muted-foreground mb-6">
            Please check your connection and try again.
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

  // Process real data from Supabase
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

  // Safe image loading with proper fallback
  const getMobileDashboardImage = () => {
    try {
      const { appAssets } = require('../utils/supabaseAssets');
      return appAssets?.mobileDashboard || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
    } catch (error) {
      console.warn('Asset loading error:', error);
      return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80';
    }
  };

  // Only render if we have real data
  if (!featureCategories || featureCategories.length === 0) {
    return (
      <div className="py-20">
        <AnimatedSection type="fadeIn" className="mb-16 text-center px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Security Features</h1>
          <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-8">
            Comprehensive cybersecurity solutions for your organization
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ransomware-assessment">
              <Button variant="orange">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                Request Demo
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Loading Your Security Platform</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Please ensure your Supabase database is configured with feature categories and features data.
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
      {/* Hero Section - Dynamic based on real data */}
      <AnimatedSection type="fadeIn" className="mb-20 text-center px-4 md:px-6">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          {featureCategoriesData?.[0]?.title || 'Security & Risk Management'}
        </h1>
        <p className="text-xl text-orange-500 max-w-4xl mx-auto mb-8 leading-relaxed">
          Professional cybersecurity solutions designed for your organization's needs
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/ransomware-assessment">
            <Button variant="orange" size="lg">
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg">
              <Globe className="mr-2 h-5 w-5" />
              Request Demo
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      {/* Real Feature Categories from Supabase */}
      {featureCategories.map((category, categoryIndex) => (
        <AnimatedSection 
          key={category.id} 
          type="fadeIn" 
          className="mb-24 px-4 md:px-6"
          delay={categoryIndex * 0.1}
        >
          <div className="mb-16 text-center">
            <div className="inline-block p-3 bg-muted mb-6 rounded-2xl">
              <div className={`rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 p-4`}>
                {category.icon && <category.icon className="h-10 w-10" />}
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 text-foreground">{category.title}</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {category.features.map((feature, index) => (
              <AnimatedItem key={feature.id} type="scaleIn" delay={index * 0.05 + 0.2} className="card-hover">
                <Link to={feature.path || "/contact"}>
                  <Card className="hover:shadow-xl transition-all duration-300 h-full dark:border-muted flex flex-col group">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {feature.icon && (
                        <div className="mb-4">
                          <feature.icon className="h-12 w-12 text-[#FF6B00] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      
                      {feature.frameworks && (
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {feature.frameworks.map((framework, i) => (
                            <span key={i} className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                              {framework}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-orange-500 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                        {feature.description}
                      </p>

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
          
          {/* Category CTA */}
          <div className="flex justify-center mt-16">
            <Link to={category.features[0]?.path || "/contact"}>
              <Button variant="outline" size="lg">
                <category.icon className="mr-2 h-5 w-5" />
                Explore {category.title}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      ))}

      {/* Mobile Access Section */}
      <AnimatedSection type="fadeIn" className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile Access
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Access Your Security Platform Anywhere
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                CyberCaution by ERMITS® provides mobile-optimized access to your security tools and data.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Real-Time Monitoring</h3>
                    <p className="text-muted-foreground">Monitor your security posture from anywhere with live updates and alerts.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Team Collaboration</h3>
                    <p className="text-muted-foreground">Coordinate with your team through integrated communication tools.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/demo">
                  <Button variant="orange">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
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
                    alt="Security Platform Mobile Access" 
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

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8F40] rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Enhance Your Security?
              </h2>
              <p className="text-white/90 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
                Get started with CyberCaution™ by ERMITS and strengthen your cybersecurity posture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/ransomware-assessment">
                  <Button 
                    variant="white" 
                    size="lg"
                    className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90 shadow-xl"
                  >
                    <ShieldAlert className="mr-2 h-5 w-5" />
                    Start Assessment
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
                  >
                    <Users className="mr-2 h-5 w-5" />
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

export default Features;