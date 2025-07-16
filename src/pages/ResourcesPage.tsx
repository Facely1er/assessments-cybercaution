import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { SUBDOMAIN_URLS } from '../utils/navigation';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Download,
  ExternalLink,
  FileText, 
  Users,
  GraduationCap,
  Shield,
  Info,
  BarChart3,
  Network,
  AlertTriangle,
  Play,
  Clock,
  Globe,
  Loader,
  RefreshCw,
  CheckCircle,
  Building2,
  Code,
  Video,
  Zap
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  BookOpen, FileText, Download, Users, GraduationCap, Shield, 
  BarChart3, Network, AlertTriangle, Play, Clock, Globe,
  ExternalLink, Code, Video, Building2, Zap
};

// Enhanced fallback data for CyberCaution resource categories
const fallbackResourceCategories = [
  {
    id: 'implementation-guides',
    title: 'Implementation Guides',
    description: 'Step-by-step guides for implementing CyberCaution and security frameworks',
    icon: BookOpen,
    color: 'text-electric-blue',
    bgColor: 'bg-electric-blue/10',
    path: `${SUBDOMAIN_URLS.RESOURCES}/guides`,
    isExternal: true,
    items: [
      'CyberCaution Deployment Guide',
      'NIST CSF Implementation with CyberCaution',
      'Threat Weather System™ Setup',
      'Ransomware Defense Playbook',
      'Supply Chain Security Manual',
      'Incident Response Planning'
    ]
  },
  {
    id: 'technical-documentation',
    title: 'Technical Documentation',
    description: 'Comprehensive documentation for CyberCaution platform features and APIs',
    icon: FileText,
    color: 'text-secure-green',
    bgColor: 'bg-secure-green/10',
    path: `${SUBDOMAIN_URLS.RESOURCES}/documentation`,
    isExternal: true,
    items: [
      'CyberCaution API Documentation',
      'Integration Guides',
      'Configuration Manual',
      'Troubleshooting Guide',
      'Security Controls Reference',
      'Compliance Mapping Guide'
    ]
  },
  {
    id: 'training-materials',
    title: 'Training & Education',
    description: 'Training materials and educational resources for cybersecurity professionals',
    icon: GraduationCap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    path: `${SUBDOMAIN_URLS.RESOURCES}/training`,
    isExternal: true,
    items: [
      'CyberCaution User Training',
      'Security Awareness Programs',
      'Compliance Training Modules',
      'Threat Intelligence Briefings',
      'Executive Security Presentations',
      'Technical Skills Development'
    ]
  },
  {
    id: 'templates-tools',
    title: 'Templates & Tools',
    description: 'Ready-to-use templates, worksheets, and security assessment tools',
    icon: Code,
    color: 'text-purple-600',
    bgColor: 'bg-purple-600/10',
    path: `${SUBDOMAIN_URLS.RESOURCES}/tools`,
    isExternal: true,
    items: [
      'Risk Assessment Templates',
      'Incident Response Checklists',
      'Policy Templates',
      'Vendor Assessment Forms',
      'Security Metrics Dashboards',
      'Compliance Audit Worksheets'
    ]
  }
];

// Enhanced fallback data for featured CyberCaution resources
const fallbackFeaturedResources = [
  {
    title: 'CyberCaution Quick Start Guide',
    description: 'Get up and running with CyberCaution in 24 hours with our comprehensive quick start guide',
    icon: Zap,
    path: `${SUBDOMAIN_URLS.RESOURCES}/quick-start`,
    isExternal: true,
    tag: 'Getting Started'
  },
  {
    title: 'Threat Weather System™ Overview',
    description: 'Learn how CyberCaution\'s Threat Weather System provides real-time industry threat intelligence',
    icon: BarChart3,
    path: `${SUBDOMAIN_URLS.RESOURCES}/threat-weather`,
    isExternal: true,
    tag: 'Core Feature'
  },
  {
    title: 'CISA #StopRansomware Resource Center',
    description: 'Official CISA resources and guidance for ransomware protection',
    icon: Shield,
    url: 'https://www.cisa.gov/stopransomware',
    isExternal: true,
    tag: 'Government'
  },
  {
    title: 'NIST Cybersecurity Framework 2.0',
    description: 'Latest version of the NIST CSF with CyberCaution implementation guidance',
    icon: Building2,
    path: `${SUBDOMAIN_URLS.RESOURCES}/nist-csf`,
    isExternal: true,
    tag: 'Framework'
  },
  {
    title: 'Supply Chain Security Toolkit',
    description: 'Comprehensive resources for managing supply chain risks with Vendor Risk Radar',
    icon: Network,
    path: `${SUBDOMAIN_URLS.RESOURCES}/supply-chain`,
    isExternal: true,
    tag: 'Risk Management'
  },
  {
    title: 'Ransomware Immunity Suite Guide',
    description: 'Detailed guide on implementing CyberCaution\'s ransomware protection capabilities',
    icon: Shield,
    path: `${SUBDOMAIN_URLS.RESOURCES}/ransomware-immunity`,
    isExternal: true,
    tag: 'Security'
  }
];

const ResourcesPage = () => {
  // State for categories, featured resources, loading status and errors
  const [resourceCategories, setResourceCategories] = useState<any[]>([]);
  const [featuredResources, setFeaturedResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch resource categories from Supabase
  const { data: resourceCategoriesData, loading: categoriesLoading, error: categoriesError } = useSupabaseQuery('resource_categories', {
    orderBy: { column: 'order_index', ascending: true }
  });
  
  // Fetch resources list from Supabase
  const { data: resourcesListData, loading: resourcesLoading, error: resourcesError } = useSupabaseQuery('resources_list', {
    orderBy: { column: 'order_index', ascending: true }
  });
  
  // Fetch featured resources from Supabase
  const { data: featuredResourcesData, loading: featuredLoading, error: featuredError } = useSupabaseQuery('resources_list', {
    filter: (query) => query.eq('is_featured', true),
    orderBy: { column: 'order_index', ascending: true },
    limit: 6
  });

  // Process data once loaded
  useEffect(() => {
    if (!categoriesLoading && !resourcesLoading && !featuredLoading) {
      // Helper function to ensure we have data (handles null, undefined, and empty arrays)
      const ensureData = (dbData: any, fallbackData: any) => {
        if (!dbData || (Array.isArray(dbData) && dbData.length === 0)) {
          return fallbackData || [];
        }
        return dbData;
      };

      // Process categories and map resources to categories
      if (resourceCategoriesData && resourcesListData) {
        try {
          const processedCategories = resourceCategoriesData.map(category => {
            // Find resources for this category
            const categoryResources = resourcesListData.filter(resource => resource.category_id === category.id) || [];
            
            // Map icon strings to components
            const processedResources = categoryResources.map(resource => ({
              ...resource,
              icon: LucideIcons[resource.icon as keyof typeof LucideIcons] || FileText
            }));
            
            // Map category icon
            const CategoryIcon = LucideIcons[category.icon as keyof typeof LucideIcons] || BookOpen;
            
            return {
              ...category,
              icon: CategoryIcon,
              items: ensureData(
                processedResources.map(r => r.title),
                fallbackResourceCategories.find(f => f.id === category.id)?.items || []
              )
            };
          });
          
          setResourceCategories(ensureData(processedCategories, fallbackResourceCategories));
        } catch (err) {
          console.error('Error processing resource categories:', err);
          setResourceCategories(fallbackResourceCategories);
        }
      } else {
        setResourceCategories(fallbackResourceCategories);
      }
      
      // Process featured resources
      if (featuredResourcesData && featuredResourcesData.length > 0) {
        try {
          const processed = featuredResourcesData.map(resource => ({
            ...resource,
            icon: LucideIcons[resource.icon as keyof typeof LucideIcons] || Shield
          }));
          
          setFeaturedResources(ensureData(processed, fallbackFeaturedResources));
        } catch (err) {
          console.error('Error processing featured resources:', err);
          setFeaturedResources(fallbackFeaturedResources);
        }
      } else {
        setFeaturedResources(fallbackFeaturedResources);
      }
      
      setLoading(false);
    }
    
    // Handle errors
    if (categoriesError || resourcesError || featuredError) {
      setError(categoriesError || resourcesError || featuredError);
      setLoading(false);
    }
  }, [
    categoriesLoading, resourcesLoading, featuredLoading, 
    resourceCategoriesData, resourcesListData, featuredResourcesData,
    categoriesError, resourcesError, featuredError
  ]);

  // Always use fallback data if database is empty to ensure rich content
  const displayResourceCategories = resourceCategories.length > 0 ? resourceCategories : fallbackResourceCategories;
  const displayFeaturedResources = featuredResources.length > 0 ? featuredResources : fallbackFeaturedResources;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading CyberCaution resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">CyberCaution Resources</h1>
            <p className="text-xl text-orange-500 mb-4">
              Comprehensive library of guides, documentation, and training materials
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to maximize your CyberCaution deployment and strengthen your cybersecurity program
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Resources */}
        <AnimatedSection type="fadeIn" delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayFeaturedResources.slice(0, 6).map((resource, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.1}>
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-muted rounded-full p-2">
                          {React.createElement(resource.icon, { 
                            className: 'h-5 w-5 text-foreground' 
                          })}
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {resource.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{resource.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                      {resource.url ? (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">
                            Visit External
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      ) : (
                        <a href={resource.path} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">
                            View Resource
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Resource Categories */}
        <AnimatedSection type="fadeIn" delay={0.3}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Resource Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayResourceCategories.map((category, index) => (
                <AnimatedItem key={category.id} type="fadeIn" delay={index * 0.1 + 0.2}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${category.bgColor || 'bg-primary/10'} mr-4`}>
                          {React.createElement(category.icon, { 
                            className: `h-6 w-6 ${category.color || 'text-primary'}` 
                          })}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.title}</CardTitle>
                          <p className="text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-6 flex-1">
                        <h4 className="font-medium mb-3 text-foreground">Available Resources:</h4>
                        <ul className="space-y-2">
                          {(category.items && category.items.length > 0 ? category.items : 
                            fallbackResourceCategories.find(f => f.id === category.id)?.items || []
                          ).map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a 
                        href={category.path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button variant="orange" className="w-full">
                          Explore {category.title}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CISA Resources Section */}
        <AnimatedSection type="fadeIn" className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10 mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-1 mb-4">
                <Shield className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">CISA #StopRansomware Resources</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Official CISA Cybersecurity Resources</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Access critical cybersecurity guidance from the Cybersecurity and Infrastructure Security Agency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-critical-red/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-critical-red" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">CISA Alerts & Advisories</h3>
                  <p className="text-muted-foreground mb-4">
                    Stay updated with the latest cybersecurity alerts, vulnerabilities, and advisories from CISA.
                  </p>
                  <a 
                    href="https://www.cisa.gov/news-events/cybersecurity-advisories" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Access Alerts
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Ransomware Guide</h3>
                  <p className="text-muted-foreground mb-4">
                    CISA's comprehensive guide on ransomware prevention, detection, and response for organizations.
                  </p>
                  <a 
                    href="https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Download Guide
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-electric-blue" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Security Assessment</h3>
                  <p className="text-muted-foreground mb-4">
                    Evaluate your organization's ransomware readiness with our CISA-aligned assessment tool.
                  </p>
                  <Link to="/ransomware-assessment">
                    <Button className="mt-2">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <a 
                href="https://www.cisa.gov/stopransomware" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-primary hover:underline"
              >
                Visit CISA #StopRansomware Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Access */}
        <AnimatedSection type="fadeIn" delay={0.4}>
          <Card className="bg-muted/30 dark:bg-muted/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Quick Access Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <a href={`${SUBDOMAIN_URLS.RESOURCES}/blog`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <BookOpen className="h-5 w-5 mb-2" />
                    <span className="text-xs">Security Blog</span>
                  </Button>
                </a>
                <a href={`${SUBDOMAIN_URLS.RESOURCES}/webinars`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Play className="h-5 w-5 mb-2" />
                    <span className="text-xs">Webinars</span>
                  </Button>
                </a>
                <a href={`${SUBDOMAIN_URLS.RESOURCES}/support`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Users className="h-5 w-5 mb-2" />
                    <span className="text-xs">Support Center</span>
                  </Button>
                </a>
                <a href={`${SUBDOMAIN_URLS.RESOURCES}/downloads`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Download className="h-5 w-5 mb-2" />
                    <span className="text-xs">Downloads</span>
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Resources Center Redirect */}
        <AnimatedSection type="fadeIn" delay={0.6}>
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-orange-500/5">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Complete CyberCaution Resources Center</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Access our comprehensive resources portal with hundreds of CyberCaution guides, templates, whitepapers, 
                  training materials, and expert content. Everything you need to maximize your security program.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">500+</div>
                    <p className="text-sm text-muted-foreground">Security Resources</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">50+</div>
                    <p className="text-sm text-muted-foreground">CyberCaution Guides</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                    <p className="text-sm text-muted-foreground">Access Available</p>
                  </div>
                </div>

                <a 
                  href={SUBDOMAIN_URLS.RESOURCES} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="orange" size="lg" className="text-lg px-8 py-4">
                    <Globe className="mr-3 h-5 w-5" />
                    Visit CyberCaution Resources Center
                    <ExternalLink className="ml-3 h-5 w-5" />
                  </Button>
                </a>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Opens in new tab • resources.cybercaution.com
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Information Notice */}
        <AnimatedSection type="fadeIn" delay={0.5}>
          <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30 mt-8">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">About CyberCaution Resources Portal</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300 mb-4">
                    Our comprehensive CyberCaution resources portal contains hundreds of platform-specific documents, implementation guides, 
                    training materials, and best practices. Access specialized content for Threat Weather System™, Ransomware Immunity Suite, 
                    and Vendor Risk Radar features.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      CyberCaution Specific
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Regular Updates
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Expert Curated
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Implementation Ready
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ResourcesPage;