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
  FileText, 
  Download,
  ExternalLink,
  Users,
  GraduationCap,
  Shield,
  BarChart3,
  Network,
  AlertTriangle,
  Play,
  Clock,
  Globe,
  Loader,
  RefreshCw
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  BookOpen, FileText, Download, Users, GraduationCap, Shield, 
  BarChart3, Network, AlertTriangle, Play, Clock, Globe,
  ExternalLink
};

// Fallback data for resource categories
const fallbackResourceCategories = [
  {
    id: 'guides',
    title: 'Implementation Guides',
    description: 'Step-by-step guides for implementing security frameworks',
    icon: BookOpen,
    color: 'text-electric-blue',
    bgColor: 'bg-electric-blue/10',
    path: `${SUBDOMAIN_URLS.RESOURCES}/guides`,
    isExternal: true,
    items: [
      'NIST CSF Implementation Guide',
      'Ransomware Defense Playbook',
      'Supply Chain Security Manual',
      'Incident Response Planning'
    ]
  },
  {
    id: 'documentation',
    title: 'Technical Documentation',
    description: 'Comprehensive documentation for all platform features',
    icon: FileText,
    color: 'text-secure-green',
    bgColor: 'bg-secure-green/10',
    path: `${SUBDOMAIN_URLS.RESOURCES}/documentation`,
    isExternal: true,
    items: [
      'API Documentation',
      'Integration Guides',
      'Configuration Manual',
      'Troubleshooting Guide'
    ]
  }
];

// Fallback data for featured resources
const fallbackFeaturedResources = [
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
    description: 'Latest version of the NIST CSF with implementation guidance',
    icon: BarChart3,
    path: `${SUBDOMAIN_URLS.RESOURCES}/nist-csf`,
    isExternal: true,
    tag: 'Framework'
  },
  {
    title: 'Supply Chain Security Toolkit',
    description: 'Comprehensive resources for managing supply chain risks',
    icon: Network,
    path: `${SUBDOMAIN_URLS.RESOURCES}/supply-chain`,
    isExternal: true,
    tag: 'Risk Management'
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
    limit: 3
  });

  // Process data once loaded
  useEffect(() => {
    if (!categoriesLoading && !resourcesLoading && !featuredLoading) {
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
              items: processedResources.map(r => r.title)
            };
          });
          
          setResourceCategories(processedCategories);
        } catch (err) {
          console.error('Error processing resource categories:', err);
          setResourceCategories([]);
        }
      } else {
        setResourceCategories([]);
      }
      
      // Process featured resources
      if (featuredResourcesData && featuredResourcesData.length > 0) {
        try {
          const processed = featuredResourcesData.map(resource => ({
            ...resource,
            icon: LucideIcons[resource.icon as keyof typeof LucideIcons] || Shield
          }));
          
          setFeaturedResources(processed);
        } catch (err) {
          console.error('Error processing featured resources:', err);
          setFeaturedResources([]);
        }
      } else {
        setFeaturedResources([]);
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

  // Use fetched data or fallback if empty
  const displayResourceCategories = resourceCategories.length > 0 ? resourceCategories : fallbackResourceCategories;
  const displayFeaturedResources = featuredResources.length > 0 ? featuredResources : fallbackFeaturedResources;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Security Resources</h1>
            <p className="text-xl text-orange-500">Comprehensive library of guides, documentation, and training materials</p>
          </div>
        </AnimatedSection>

        {/* Featured Resources */}
        <AnimatedSection type="fadeIn" delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayFeaturedResources.map((resource, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.1}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
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
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
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
                          {category.items.map((item: string, idx: number) => (
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
                <h2 className="text-3xl font-bold mb-4 text-foreground">Complete Resources Center</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Access our comprehensive resources portal with hundreds of guides, templates, whitepapers, 
                  training materials, and expert content. Everything you need to strengthen your security program.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">500+</div>
                    <p className="text-sm text-muted-foreground">Security Resources</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">50+</div>
                    <p className="text-sm text-muted-foreground">Expert Guides</p>
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
                    Visit Resources Center
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
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">About Our Resources Portal</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300 mb-4">
                    Our comprehensive resources portal contains hundreds of documents, guides, templates, and training materials. 
                    Access our internal resource sections for platform-specific content and guides.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      500+ Documents
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Regular Updates
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Expert Curated
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