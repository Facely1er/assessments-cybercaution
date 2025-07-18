
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  BookOpen,
  Users,  
  FileText, 
  Settings2,
  Book,
  AlertTriangle,
  ExternalLink,
  Download,
  Rss,
  Video,
  User 
} from 'lucide-react';

// Map of Lucide icon names to components
const LucideIcons: Record<string, React.FC<any>> = {
  BookOpen, FileText, Users, Settings2, Book, AlertTriangle, Rss, Video, User
};

// Fallback data for resource categories and featured resources
const fallbackResourceCategories = [
  {
    id: 'platform-guides',
    title: 'Platform Guides',
    description: 'Comprehensive guides for deploying and using the CyberCaution platform',
    icon: 'BookOpen',
    color: 'text-electric-blue',
    bgColor: 'bg-electric-blue/10',
    items: []
  },
  {
    id: 'assessment-frameworks',
    title: 'Assessment Frameworks', 
    description: 'Industry-standard security assessment frameworks and methodologies',
    icon: 'Book',
    color: 'text-secure-green',
    bgColor: 'bg-secure-green/10',
    items: []
  },
  {
    id: 'best-practices',
    title: 'Best Practices & Guidance',
    description: 'Expert-curated best practices for improving security posture',
    icon: 'Book',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    items: []
  },
  {
    id: 'api-documentation',
    title: 'API & Integration Docs',
    description: 'Technical documentation for CyberCaution APIs and integration capabilities',
    icon: 'FileText', 
    color: 'text-purple-600',
    bgColor: 'bg-purple-600/10',
    items: []
  }
];

const fallbackFeaturedResources = [];

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
              items: processedResources.map(r => r.title)
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
            icon: LucideIcons[resource.icon as keyof typeof LucideIcons] || FileText  
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

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">CyberCaution Resources</h1>
            <p className="text-xl text-orange-500 mb-4">
              Comprehensive library to maximize your security orchestration and governance
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Expert guides, documentation, best practices, and training materials to help you 
              get the most out of the CyberCaution platform and strengthen your security program
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
                      <a href={resource.path} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full">
                          View Resource 
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
                          {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a 
                        href={`/resources/${category.id}`}
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

        {/* Community Resources */} 
        <AnimatedSection type="fadeIn" delay={0.4}>
          <Card className="bg-muted/30 dark:bg-muted/10">
            <CardContent className="p-8"> 
              <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Connect with the CyberCaution Community</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/blog" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">  
                    <Rss className="h-5 w-5 mb-2" />
                    <span className="text-xs">Security Blog</span>  
                  </Button>
                </a>
                <a href="/webinars" target="_blank" rel="noopener noreferrer">  
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Video className="h-5 w-5 mb-2" />  
                    <span className="text-xs">Webinars</span>
                  </Button>
                </a>
                <a href="/community" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                    <Users className="h-5 w-5 mb-2" /> 
                    <span className="text-xs">Community Forum</span>
                  </Button>  
                </a>
              </div>
            </CardContent>
          </Card>  
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ResourcesPage;