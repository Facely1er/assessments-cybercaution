import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  History,
  Users,
  Calendar,
  ArrowUpRight
} from 'lucide-react';

const Policies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('policies');

  const templates = [
    {
      id: 'temp-1',
      name: 'Information Security Policy',
      type: 'Policy',
      category: 'Security',
      description: 'Template for creating comprehensive information security policies.',
      lastUpdated: '2025-03-15',
      status: 'Published',
      version: '2.1',
      downloads: 156,
      framework: ['NIST SP 800-53', 'ISO 27001'],
      sections: 12,
      pages: 25,
    },
    {
      id: 'temp-2',
      name: 'Incident Response Procedure',
      type: 'Procedure',
      category: 'Security',
      description: 'Step-by-step procedure for handling security incidents and breaches.',
      lastUpdated: '2025-03-10',
      status: 'Under Review',
      version: '1.8',
      downloads: 98,
      framework: ['NIST SP 800-61', 'ISO 27001'],
      sections: 8,
      pages: 15,
    },
    // Add more templates as needed
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Under Review':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'Draft':
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-success/10 text-success';
      case 'Under Review':
        return 'bg-warning/10 text-warning';
      case 'Draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Policy & Procedure Templates</h1>
          <p className="text-muted-foreground">Access and customize pre-built templates for your organization</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
          <Button variant="outline">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Submit Template
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Types</option>
                <option value="policy">Policies</option>
                <option value="procedure">Procedures</option>
                <option value="standard">Standards</option>
                <option value="guideline">Guidelines</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                <option value="security">Security</option>
                <option value="privacy">Privacy</option>
                <option value="compliance">Compliance</option>
                <option value="operations">Operations</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                25 templates
              </span>
            </div>
            <h3 className="font-medium">Security Policies</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Core security policies and standards
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-secondary" />
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                18 templates
              </span>
            </div>
            <h3 className="font-medium">HR Procedures</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Employee-related procedures
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">
                12 templates
              </span>
            </div>
            <h3 className="font-medium">Incident Response</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Security incident handling
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <History className="h-8 w-8 text-accent" />
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                15 templates
              </span>
            </div>
            <h3 className="font-medium">Business Continuity</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Continuity and recovery plans
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium bg-muted px-2 py-0.5 rounded mr-2">
                      {template.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                    <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                      v{template.version}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.framework.map((fw, index) => (
                      <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                        {fw}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Updated:</span>
                      <span className="ml-1 font-medium">
                        {new Date(template.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="ml-1 font-medium">{template.downloads}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Pages:</span>
                      <span className="ml-1 font-medium">{template.pages}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Sections:</span>
                      <span className="ml-1 font-medium">{template.sections}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">Preview</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Policies;