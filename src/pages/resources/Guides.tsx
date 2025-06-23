import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../utils/AnimatedSection';
import AnimatedItem from '../../utils/AnimatedItem';
import {
  BookOpen, 
  Shield, 
  FileCheck, 
  ClipboardList, 
  FileText, 
  Lock,
  Users,
  Network,
  ArrowRight,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart2
} from 'lucide-react';

const Guides = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const guideCategories = [
    { id: 'all', name: 'All Guides' },
    { id: 'framework', name: 'Framework' },
    { id: 'risk', name: 'Risk Management' },
    { id: 'security', name: 'Security' },
    { id: 'compliance', name: 'Compliance' },
  ];

  const guides = [
    {
      title: 'NIST CSF Guide',
      description: 'Learn about the NIST Cybersecurity Framework and how to implement it.',
      icon: Shield as any,
      category: 'framework',
      link: '/guides/nist-csf',
      popular: true,
      complexity: 'medium',
      estimatedTime: '45 min'
    },
    {
      title: 'Risk Assessment Guide',
      description: 'Step-by-step guidance on conducting effective risk assessments.',
      icon: FileCheck as any,
      category: 'risk',
      link: '/guides/risk-assessment',
      popular: true,
      complexity: 'high',
      estimatedTime: '60 min'
    },
    {
      title: 'Compliance Guide',
      description: 'Navigate compliance requirements and maintain regulatory adherence.',
      icon: FileText as any,
      category: 'compliance',
      link: '/guides/compliance',
      popular: false,
      complexity: 'medium',
      estimatedTime: '50 min'
    },
    {
      title: 'Security Controls Guide',
      description: 'Implement and manage security controls effectively.',
      icon: Lock as any,
      category: 'security',
      link: '/guides/security-controls',
      popular: true,
      complexity: 'high',
      estimatedTime: '55 min'
    },
    {
      title: 'Supply Chain Guide',
      description: 'Manage and secure your supply chain operations.',
      icon: Network as any,
      category: 'security',
      link: '/guides/supply-chain',
      popular: false,
      complexity: 'high',
      estimatedTime: '65 min'
    },
    {
      title: 'Ransomware Protection Guide',
      description: 'Comprehensive guide to protect against ransomware threats.',
      icon: Shield as any,
      category: 'security',
      link: '/guides/ransomware-guide',
      popular: true,
      complexity: 'medium',
      estimatedTime: '40 min'
    },
    {
      title: 'CUI & CMMC Guide',
      description: 'Handle Controlled Unclassified Information and CMMC compliance.',
      icon: BookOpen as any,
      category: 'compliance',
      link: '/guides/cui-cmmc',
      popular: false,
      complexity: 'high',
      estimatedTime: '70 min'
    },
    {
      title: 'Tabletop Exercise Guide',
      description: 'Design and run effective security incident tabletop exercises.',
      icon: Users as any,
      category: 'security',
      link: '/guides/tabletop-guide',
      popular: true,
      complexity: 'medium',
      estimatedTime: '35 min'
    }
  ];

  const filteredGuides = guides.filter(guide => {
    return (activeFilter === 'all' || guide.category === activeFilter) && 
      (searchQuery === '' || 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Popular guides for featured section
  const popularGuides = guides.filter(guide => guide.popular);

  // Get complexity badge
  const getComplexityBadge = (complexity: string) => {
    switch(complexity) {
      case 'low':
        return <span className="text-xs bg-secure-green/10 text-secure-green px-2 py-0.5 rounded-full">Easy</span>;
      case 'medium':
        return <span className="text-xs bg-warning-amber/10 text-warning-amber px-2 py-0.5 rounded-full">Medium</span>;
      case 'high':
        return <span className="text-xs bg-critical-red/10 text-critical-red px-2 py-0.5 rounded-full">Advanced</span>;
      default:
        return <span className="text-xs bg-muted px-2 py-0.5 rounded-full">Unknown</span>;
    }
  };

  return (
    <div className="py-20">
      <AnimatedSection type="fadeIn" className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Implementation Guides</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto">
          Step-by-step guidance to implement security controls and best practices
        </p>
      </AnimatedSection>

      {/* Featured Guides */}
      <AnimatedSection type="fadeIn" delay={0.1} className="mb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGuides.slice(0, 3).map((guide, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-all duration-300 h-full dark:border-muted">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                      <guide.icon className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {getComplexityBadge(guide.complexity)}
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {guide.estimatedTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-foreground">{guide.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{guide.description}</p>

                    <Link to={guide.link}>
                      <Button variant="orange" className="w-full">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Search and Filters */}
      <AnimatedSection type="fadeIn" delay={0.2} className="max-w-6xl mx-auto px-4 mb-12">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>
              
              <div className="md:col-span-2 overflow-x-auto">
                <div className="flex space-x-2">
                  {guideCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`px-3 py-2 text-sm rounded-md whitespace-nowrap ${
                        activeFilter === category.id
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide, index) => (
            <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
              <Card className="hover:shadow-lg transition-all duration-300 h-full dark:border-muted">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                      <guide.icon className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div className="flex items-center gap-2">
                      {getComplexityBadge(guide.complexity)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{guide.title}</h3>
                  <p className="text-muted-foreground mb-3 flex-grow">{guide.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="bg-muted px-2 py-1 rounded-full">
                      {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {guide.estimatedTime}
                    </span>
                  </div>

                  <Link to={guide.link}>
                    <Button variant="outline" className="w-full">
                      View Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
        
        {filteredGuides.length === 0 && (
          <Card className="p-12 text-center">
            <CardContent>
              <AlertTriangle className="h-12 w-12 text-warning-amber mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Guides Found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any guides matching your search criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </AnimatedSection>

      {/* Guide Collections */}
      <AnimatedSection type="fadeIn" delay={0.3} className="py-16 bg-muted/30 dark:bg-muted/10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Guide Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive sets of guides organized by topic for more in-depth learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-10 w-10 text-[#FF6B00] mr-3" />
                  <h3 className="text-xl font-semibold">NIST CSF 2.0</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Align your security program with the NIST Cybersecurity Framework to build a comprehensive security foundation.
                </p>
                <Link to="/app/nist-csf-alignment">
                  <Button variant="orange" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-10 w-10 text-[#FF6B00] mr-3" />
                  <h3 className="text-xl font-semibold">NIST IR 8374</h3>
                </div>
                <p className="text-muted-foreground mb-6">
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
            
            <Card className="hover:shadow-lg transition-all duration-300 dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Network className="h-10 w-10 text-[#FF6B00] mr-3" />
                  <h3 className="text-xl font-semibold">NIST SP 800-161</h3>
                </div>
                <p className="text-muted-foreground mb-6">
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
          </div>
        </div>
      </AnimatedSection>

      {/* Download Resources */}
      <AnimatedSection type="fadeIn" delay={0.4} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Downloadable Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Templates, checklists, and tools to implement security and compliance measures
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Ransomware Response Playbook", icon: AlertTriangle, format: "DOCX", size: "2.3 MB" },
              { title: "NIST CSF Assessment Checklist", icon: FileCheck, format: "XLSX", size: "1.8 MB" },
              { title: "Tabletop Exercise Templates", icon: Users, format: "ZIP", size: "4.2 MB" },
              { title: "Security Policy Templates", icon: FileText, format: "DOCX", size: "3.5 MB" },
              { title: "Business Impact Analysis", icon: BarChart2, format: "XLSX", size: "1.4 MB" },
              { title: "Risk Register Template", icon: ClipboardList, format: "XLSX", size: "2.1 MB" },
              { title: "Vendor Assessment Questionnaire", icon: Network, format: "DOCX", size: "1.9 MB" },
              { title: "Incident Response Checklists", icon: CheckCircle, format: "PDF", size: "1.2 MB" }
            ].map((resource, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
                <Card className="hover:shadow-md transition-shadow dark:border-muted">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-[#FF6B00]/10 rounded-lg mr-2">
                        <resource.icon className="h-4 w-4 text-[#FF6B00]" />
                      </div>
                      <h3 className="font-medium truncate">{resource.title}</h3>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {resource.format}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {resource.size}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-1 h-3 w-3" />
                      Download Resource
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" delay={0.5} className="py-16 px-4 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-[#FF6B00] rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Need Personalized Guidance?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Our experts can help you implement frameworks, validate your security controls, 
                and develop customized strategies for your specific needs
              </p>
              <Button 
                variant="white" 
                className="bg-white text-[#FF6B00] hover:bg-white/90"
              >
                Request Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Guides;