import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  AlertTriangle, 
  Shield, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Network,
  Database,
  Server,
  Lock,
  Mail
} from 'lucide-react';
import { toast } from '../components/ui/Toaster';

const Playbooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Playbooks' },
    { id: 'ransomware', name: 'Ransomware' },
    { id: 'incident', name: 'Incident Response' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'communication', name: 'Communication' },
  ];
  
  const playbooks = [
    {
      id: 'playbook-1',
      title: 'Ransomware Response Playbook',
      description: 'Comprehensive guide for responding to ransomware incidents',
      category: 'ransomware',
      pages: 32,
      lastUpdated: 'March 15, 2025',
      popular: true,
      nistControls: ['RS.RP-1', 'RS.CO-1', 'RS.AN-1', 'RS.MI-1', 'RC.RP-1'],
      sections: [
        'Initial Response',
        'Containment Strategies',
        'Eradication Procedures',
        'Recovery Process',
        'Post-Incident Activities'
      ]
    },
    {
      id: 'playbook-2',
      title: 'Phishing Incident Response',
      description: 'Step-by-step guide for handling phishing attacks',
      category: 'incident',
      pages: 24,
      lastUpdated: 'February 28, 2025',
      popular: false,
      nistControls: ['RS.RP-1', 'RS.CO-2', 'RS.AN-2', 'RS.MI-2'],
      sections: [
        'Phishing Identification',
        'User Communication',
        'Credential Reset Procedures',
        'System Scanning',
        'Preventive Measures'
      ]
    },
    {
      id: 'playbook-3',
      title: 'Data Breach Communication Plan',
      description: 'Templates and procedures for communicating during a data breach',
      category: 'communication',
      pages: 18,
      lastUpdated: 'March 5, 2025',
      popular: true,
      nistControls: ['RS.CO-1', 'RS.CO-2', 'RS.CO-3', 'RS.CO-4', 'RS.CO-5'],
      sections: [
        'Internal Communication',
        'Customer Notification',
        'Regulatory Reporting',
        'Media Response',
        'Stakeholder Updates'
      ]
    },
    {
      id: 'playbook-4',
      title: 'System Recovery Playbook',
      description: 'Procedures for recovering systems after a security incident',
      category: 'recovery',
      pages: 28,
      lastUpdated: 'March 10, 2025',
      popular: false,
      nistControls: ['RC.RP-1', 'RC.IM-1', 'RC.IM-2', 'RC.CO-1', 'RC.CO-2'],
      sections: [
        'Backup Restoration',
        'System Verification',
        'Data Integrity Checks',
        'Service Resumption',
        'Post-Recovery Monitoring'
      ]
    },
    {
      id: 'playbook-5',
      title: 'Ransomware Prevention Guide',
      description: 'Proactive measures to prevent ransomware attacks',
      category: 'ransomware',
      pages: 22,
      lastUpdated: 'February 20, 2025',
      popular: true,
      nistControls: ['PR.AC-1', 'PR.AC-4', 'PR.DS-5', 'PR.IP-4', 'PR.PT-3'],
      sections: [
        'Email Security',
        'Endpoint Protection',
        'User Training',
        'Backup Strategies',
        'Network Segmentation'
      ]
    },
    {
      id: 'playbook-6',
      title: 'Executive Communication Templates',
      description: 'Templates for communicating with executives during security incidents',
      category: 'communication',
      pages: 15,
      lastUpdated: 'January 30, 2025',
      popular: false,
      nistControls: ['RS.CO-1', 'RS.CO-4', 'RC.CO-3'],
      sections: [
        'Initial Notification',
        'Situation Updates',
        'Decision Requests',
        'Resolution Summary',
        'Lessons Learned'
      ]
    },
    {
      id: 'playbook-7',
      title: 'Supply Chain Incident Response',
      description: 'Procedures for responding to supply chain security incidents',
      category: 'incident',
      pages: 26,
      lastUpdated: 'March 8, 2025',
      popular: false,
      nistControls: ['RS.RP-1', 'RS.CO-2', 'RS.AN-5', 'RS.MI-3', 'RC.RP-1'],
      sections: [
        'Vendor Notification',
        'Impact Assessment',
        'Containment Strategies',
        'Alternative Supplier Activation',
        'Recovery Coordination'
      ]
    },
    {
      id: 'playbook-8',
      title: 'Tabletop Exercise Scenarios',
      description: 'Ready-to-use scenarios for security incident tabletop exercises',
      category: 'incident',
      pages: 30,
      lastUpdated: 'February 15, 2025',
      popular: true,
      nistControls: ['PR.IP-10', 'RS.CO-1'],
      sections: [
        'Ransomware Scenarios',
        'Data Breach Scenarios',
        'Business Email Compromise',
        'DDoS Attack Scenarios',
        'Insider Threat Scenarios'
      ]
    }
  ];

  const handleDownload = (playbookId: string) => {
    const playbook = playbooks.find(p => p.id === playbookId);
    if (playbook) {
      toast.success(`Downloading ${playbook.title}`, 'Your download will begin shortly');
    }
  };

  // Filter playbooks based on search and category
  const filteredPlaybooks = playbooks.filter(playbook => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playbook.nistControls.some(control => control.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || playbook.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ransomware':
        return <AlertTriangle className="h-5 w-5 text-critical-red" />;
      case 'incident':
        return <Shield className="h-5 w-5 text-electric-blue" />;
      case 'recovery':
        return <Database className="h-5 w-5 text-secure-green" />;
      case 'communication':
        return <Mail className="h-5 w-5 text-warning-amber" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Response Playbooks</h1>
        <p className="text-muted-foreground">Comprehensive guides for security incident response and recovery</p>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search playbooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="md:col-span-2 overflow-x-auto">
              <div className="flex space-x-2 flex-nowrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-2 text-sm rounded-md whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/90 text-foreground'
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

      {/* Featured Playbooks */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Playbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playbooks
            .filter(playbook => playbook.popular)
            .map((playbook) => (
              <Card key={playbook.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-lg p-2 bg-primary/10">
                      {getCategoryIcon(playbook.category)}
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">
                        {playbook.category}
                      </span>
                      <span className="text-xs bg-warning-amber/10 text-warning-amber px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">{playbook.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{playbook.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {playbook.nistControls.slice(0, 3).map((control, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {control}
                      </span>
                    ))}
                    {playbook.nistControls.length > 3 && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        +{playbook.nistControls.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      {playbook.pages} pages • Updated: {playbook.lastUpdated}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(playbook.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* All Playbooks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Playbooks</h2>
        
        {filteredPlaybooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No playbooks found matching your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlaybooks.map((playbook) => (
              <Card key={playbook.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-40 h-32 flex-shrink-0 bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="p-4 bg-primary/10 rounded-full">
                        {getCategoryIcon(playbook.category)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-2">
                          {playbook.category.charAt(0).toUpperCase() + playbook.category.slice(1)}
                        </span>
                        {playbook.popular && (
                          <span className="text-xs bg-warning-amber/10 text-warning-amber px-2 py-0.5 rounded-full flex items-center">
                            Popular
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-1">{playbook.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{playbook.description}</p>
                      
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        <span>{playbook.pages} pages</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>Updated: {playbook.lastUpdated}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {playbook.nistControls.map((control, index) => (
                          <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-end gap-2">
                      <Button onClick={() => handleDownload(playbook.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline">Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Playbook Resources */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Tabletop Exercises
              </CardTitle>
              <CardDescription>
                Practice your incident response with realistic scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our tabletop exercise kits help you test your incident response procedures with realistic scenarios.
              </p>
              <Link to="/tabletop-exercise">
                <Button className="w-full">
                  View Exercises
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Security Controls
              </CardTitle>
              <CardDescription>
                Implement preventive controls to reduce risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about security controls that can help prevent incidents before they occur.
              </p>
              <Link to="/resources/guides/security-controls">
                <Button className="w-full">
                  View Controls Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Recovery Planning
              </CardTitle>
              <CardDescription>
                Develop effective recovery strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive guides for developing and testing recovery plans for various scenarios.
              </p>
              <Link to="/app/continuity">
                <Button className="w-full">
                  View Recovery Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom Playbook Section */}
      <div className="mt-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="rounded-full p-6 bg-primary/10">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Need a Custom Playbook?</h3>
                <p className="text-muted-foreground mb-4">
                  We can help you develop custom playbooks tailored to your organization's specific needs and environment.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="orange">
                    Request Custom Playbook
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link to="/app/toolkit/playbook-generator">
                    <Button variant="outline">
                      Use Playbook Generator
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Playbooks;