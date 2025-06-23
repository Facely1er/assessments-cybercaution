import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../../utils/AnimatedSection';
import AnimatedItem from '../../utils/AnimatedItem';
import { 
  BookOpen, 
  FileText, 
  Search, 
  ArrowRight, 
  Shield,
  Lock,
  Users,
  Settings,
  Database,
  AlertTriangle,
  ClipboardList,
  Download,
  CheckCircle,
  Network,
  Info,
  MessageSquare,
  Video,
  BookOpen as BookIcon,
  FileCheck
} from 'lucide-react';

const Documentation = () => {
  const navigate = useNavigate();
  const [activeResourceType, setActiveResourceType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      icon: Shield,
      title: "Getting Started",
      description: "Learn the basics of ransomware risk management with CyberCaution",
      articles: [
        { title: "Quick Start Guide", path: "/documentation/quick-start" },
        { title: "Platform Overview", path: "/documentation/platform-overview" },
        { title: "Understanding the Dashboard", path: "/documentation/understanding-dashboard" },
        { title: "Ransomware Defense Guide", path: "/documentation/ransomware-defense" }
      ],
      color: "orange-500"
    },
    {
      icon: AlertTriangle,
      title: "Ransomware Protection",
      description: "Comprehensive ransomware defense strategies and implementation",
      articles: [
        { title: "NIST IR 8374 Guide", path: "/documentation/nist-ir-8374-guide" },
        { title: "Ransomware Defense Guide", path: "/documentation/ransomware-defense" },
        { title: "Tabletop Exercise Guide", path: "/documentation/tabletop-exercise-guide" },
        { title: "Ransomware Playbook Development", path: "/guides/ransomware-protection" }
      ],
      color: "critical-red"
    },
    {
      icon: ClipboardList,
      title: "Risk Register",
      description: "Manage and map ransomware risks to NIST CSF controls",
      articles: [
        { title: "Risk Register Guide", path: "/documentation/risk-register-guide" },
        { title: "NIST CSF ID.RA Mapping", path: "/nist-csf-alignment" },
        { title: "Risk Assessment Methodology", path: "/guides/risk-assessment" },
        { title: "Risk Treatment Planning", path: "/documentation/risk-treatment-planning" }
      ],
      color: "electric-blue"
    },
    {
      icon: Network,
      title: "Supply Chain Security",
      description: "Assess and manage supply chain risks",
      articles: [
        { title: "Supply Chain Risk Guide", path: "/guides/supply-chain" },
        { title: "Vendor Assessment", path: "/documentation/vendor-assessment" },
        { title: "NIST SP 800-161 Overview", path: "/documentation/nist-sp-800-161" },
        { title: "Third-Party Risk Management", path: "/documentation/third-party-risk" }
      ],
      color: "warning-amber"
    },
    {
      icon: Settings,
      title: "Implementation",
      description: "Implement effective ransomware controls",
      articles: [
        { title: "NIST CSF Implementation", path: "/guides/nist-csf" },
        { title: "Security Controls Guide", path: "/guides/security-controls" },
        { title: "Control Testing", path: "/documentation/control-testing" },
        { title: "Automation Setup", path: "/documentation/automation-setup" }
      ],
      color: "secure-green"
    },
    {
      icon: Users,
      title: "Incident Response",
      description: "Prepare for and respond to ransomware incidents",
      articles: [
        { title: "Incident Response Planning", path: "/documentation/incident-response-planning" },
        { title: "Tabletop Exercise Guide", path: "/documentation/tabletop-exercise-guide" },
        { title: "Ransomware Playbooks", path: "/documentation/ransomware-playbooks" },
        { title: "Recovery Procedures", path: "/documentation/recovery-procedures" }
      ],
      color: "primary"
    }
  ];

  // Resource types for filtering
  const resourceTypes = [
    { id: 'all', name: 'All Resources' },
    { id: 'guides', name: 'Guides' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'templates', name: 'Templates' },
    { id: 'whitepapers', name: 'Whitepapers' }
  ];

  // Map resource types to categories for filtering
  const resourceTypeMap = {
    'guides': ['Getting Started', 'Incident Response', 'Implementation'],
    'tutorials': ['Ransomware Protection', 'Supply Chain Security'],
    'templates': ['Risk Register'],
    'whitepapers': ['Incident Response', 'Implementation']
  };

  // Filter categories based on selected resource type
  const filteredCategories = activeResourceType === 'all' 
    ? categories 
    : categories.filter(category => 
        resourceTypeMap[activeResourceType as keyof typeof resourceTypeMap]?.includes(category.title)
      );

  const popularArticles = [
    {
      title: "Ransomware Response Checklist",
      path: "/documentation/ransomware-response-checklist",
      category: "Incident Response",
      type: "Checklist"
    },
    {
      title: "NIST CSF 2.0 Implementation Guide",
      path: "/documentation/nist-csf-implementation",
      category: "Framework",
      type: "Guide"
    },
    {
      title: "Business Impact Analysis Template",
      path: "/documentation/bia-template",
      category: "Risk Management",
      type: "Template"
    },
    {
      title: "Tabletop Exercise Scenarios",
      path: "/documentation/tabletop-scenarios",
      category: "Training",
      type: "Resource"
    }
  ];

  // Filter popular articles based on selected resource type
  const filteredPopularArticles = activeResourceType === 'all'
    ? popularArticles
    : popularArticles.filter(article => 
        article.type.toLowerCase().includes(activeResourceType) ||
        (activeResourceType === 'guides' && article.type === 'Guide') ||
        (activeResourceType === 'templates' && article.type === 'Template') ||
        (activeResourceType === 'tutorials' && article.type === 'Checklist')
      );

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="py-20">
      <AnimatedSection type="fadeIn" className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Documentation</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto">
          Everything you need to know about ransomware defense with CyberCaution by ERMITS®
        </p>
      </AnimatedSection>

      <AnimatedSection type="fadeIn" delay={0.1} className="max-w-6xl mx-auto px-4 mb-16">
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#FF6B00] h-14"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">⌘K</kbd> to search
          </div>
        </div>

        {/* Resource Type Filter */}
        <div className="flex justify-center overflow-x-auto mb-12 pb-2">
          <div className="flex space-x-2 flex-nowrap">
            {resourceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveResourceType(type.id)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
                  type.id === activeResourceType
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {filteredPopularArticles.map((article, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.1}>
                <Link to={article.path}>
                  <Card className="hover:shadow-lg transition-all duration-300 h-full dark:border-muted">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between mb-4">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {article.category}
                        </span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          {article.type}
                        </span>
                      </div>
                      <h3 className="font-medium mb-2 flex-grow">{article.title}</h3>
                      <Button variant="orange" size="sm" className="w-full mt-4">
                        View Article
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedItem>
            ))}
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCategories
            .filter(category => 
              searchQuery === '' || 
              category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              category.articles.some(article => 
                article.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
            .map((category, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <Card className="hover:shadow-lg transition-shadow dark:border-muted h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`mb-4 p-2 rounded-lg bg-${category.color}/10 w-fit`}>
                      <category.icon className={`h-6 w-6 text-${category.color}`} />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-foreground">{category.title}</h2>
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    
                    <ul className="space-y-3 mb-6 flex-grow">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link 
                            to={article.path} 
                            className="flex items-center text-primary hover:text-primary/80 text-sm group"
                          >
                            <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant="outline" 
                      className="w-full mt-auto"
                      onClick={() => {
                        // Navigate to first article in the category or a category index page
                        if (category.articles.length > 0) {
                          navigate(category.articles[0].path);
                        }
                      }}
                    >
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
        </div>

        {filteredCategories.filter(category => 
          searchQuery === '' || 
          category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.articles.some(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        ).length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-warning-amber mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Results Found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any documentation matching your search criteria.
            </p>
            <Button variant="outline" onClick={() => {setSearchQuery(''); setActiveResourceType('all');}}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Resources Section */}
        <AnimatedSection type="fadeIn" delay={0.3} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Video className="h-8 w-8 text-[#FF6B00] mr-3" />
                  <h3 className="text-lg font-medium">Video Tutorials</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Step-by-step video guides for implementing ransomware protection and NIST framework controls.
                </p>
                <Button variant="orange" className="w-full">
                  View Tutorials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Download className="h-8 w-8 text-[#FF6B00] mr-3" />
                  <h3 className="text-lg font-medium">Templates Library</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Download ready-to-use templates for policies, procedures, and assessments.
                </p>
                <Button variant="orange" className="w-full">
                  Browse Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileCheck className="h-8 w-8 text-[#FF6B00] mr-3" />
                  <h3 className="text-lg font-medium">Compliance Checklists</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Comprehensive checklists for regulatory compliance and security frameworks.
                </p>
                <Button variant="orange" className="w-full">
                  View Checklists
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.4} className="mt-12">
          <div className="bg-[#FF6B00] rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Help with Ransomware Defense?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Our team of ransomware defense experts can help you implement NIST-aligned controls, 
                conduct tabletop exercises, and develop comprehensive response plans.
              </p>
              <Button 
                variant="white" 
                className="bg-white text-[#FF6B00] hover:bg-white/90"
                onClick={() => navigate("/support")}
              >
                Contact Our Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </AnimatedSection>
    </div>
  );
};

export default Documentation;