import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  GitBranch, 
  Link2, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle,
  Shield,
  CheckCircle,
  FileText,
  Settings,
  Share2,
  ExternalLink,
  Package,
  ArrowDownUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DependencyManagerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('software');
  const [viewType, setViewType] = useState('list');

  // Mock data for demonstration
  const dependencies = {
    software: [
      {
        id: 'dep-1',
        name: 'CoreDatabase',
        type: 'Database',
        version: '14.2.3',
        vendor: 'PostgreSQL',
        criticality: 'High',
        lastUpdated: '2025-03-01',
        status: 'Healthy',
        vulnerabilities: 0,
        assets: ['Order Processing', 'Customer Database', 'Inventory System']
      },
      {
        id: 'dep-2',
        name: 'AuthProvider',
        type: 'Service',
        version: '3.5.0',
        vendor: 'Auth0',
        criticality: 'Critical',
        lastUpdated: '2025-02-15',
        status: 'Warning',
        vulnerabilities: 2,
        assets: ['User Authentication', 'Access Control', 'Single Sign-On']
      },
      {
        id: 'dep-3',
        name: 'PaymentGateway',
        type: 'Service',
        version: '2.0.1',
        vendor: 'Stripe',
        criticality: 'Critical',
        lastUpdated: '2025-01-20',
        status: 'Healthy',
        vulnerabilities: 0,
        assets: ['Payment Processing', 'Subscription Management']
      },
      {
        id: 'dep-4',
        name: 'ContentDelivery',
        type: 'Service',
        version: '1.8.7',
        vendor: 'Cloudflare',
        criticality: 'Medium',
        lastUpdated: '2025-02-10',
        status: 'Healthy',
        vulnerabilities: 0,
        assets: ['Website', 'Image Storage', 'Document Storage']
      },
      {
        id: 'dep-5',
        name: 'EmailService',
        type: 'Service',
        version: '2.4.0',
        vendor: 'SendGrid',
        criticality: 'Medium',
        lastUpdated: '2025-02-28',
        status: 'Warning',
        vulnerabilities: 1,
        assets: ['Notification System', 'Customer Communications']
      }
    ],
    hardware: [
      {
        id: 'hdw-1',
        name: 'Primary Web Servers',
        type: 'Server',
        model: 'Dell PowerEdge R740',
        vendor: 'Dell',
        criticality: 'Critical',
        lastUpdated: '2024-12-15',
        status: 'Healthy',
        firmware: 'v2.6.1',
        assets: ['Web Application', 'API Gateway']
      },
      {
        id: 'hdw-2',
        name: 'Database Cluster',
        type: 'Server',
        model: 'HPE ProLiant DL380 Gen10',
        vendor: 'HPE',
        criticality: 'Critical',
        lastUpdated: '2024-11-30',
        status: 'Healthy',
        firmware: 'v3.2.0',
        assets: ['Main Database', 'Analytics Database']
      },
      {
        id: 'hdw-3',
        name: 'Network Switches',
        type: 'Network',
        model: 'Cisco Catalyst 9300',
        vendor: 'Cisco',
        criticality: 'High',
        lastUpdated: '2025-01-10',
        status: 'Warning',
        firmware: 'v17.3.4',
        assets: ['Internal Network', 'DMZ']
      }
    ],
    services: [
      {
        id: 'svc-1',
        name: 'Cloud Hosting',
        type: 'Cloud',
        vendor: 'AWS',
        criticality: 'Critical',
        lastUpdated: '2025-03-05',
        status: 'Healthy',
        sla: '99.99%',
        assets: ['Website', 'Application Backend', 'Data Storage']
      },
      {
        id: 'svc-2',
        name: 'DNS Service',
        type: 'Network',
        vendor: 'Cloudflare',
        criticality: 'Critical',
        lastUpdated: '2025-02-20',
        status: 'Healthy',
        sla: '100%',
        assets: ['Domain Resolution', 'Traffic Management']
      },
      {
        id: 'svc-3',
        name: 'Internet Provider',
        type: 'Connectivity',
        vendor: 'Comcast Business',
        criticality: 'Critical',
        lastUpdated: '2025-01-15',
        status: 'Healthy',
        sla: '99.9%',
        assets: ['Internet Connectivity', 'VPN Access']
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-secure-green/10 text-secure-green';
      case 'Warning':
        return 'bg-warning-amber/10 text-warning-amber';
      case 'Critical':
        return 'bg-critical-red/10 text-critical-red';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <CheckCircle className="h-4 w-4" />;
      case 'Warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Critical':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'Critical':
        return 'bg-critical-red/10 text-critical-red';
      case 'High':
        return 'bg-warning-amber/10 text-warning-amber';
      case 'Medium':
        return 'bg-electric-blue/10 text-electric-blue';
      case 'Low':
        return 'bg-secure-green/10 text-secure-green';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const currentDependencies = dependencies[activeTab as keyof typeof dependencies] || [];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Dependency Manager</h1>
          <p className="text-muted-foreground">Track and manage dependencies across your systems</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Dependency
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search dependencies..."
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
                <option value="">All Criticality</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Status</option>
                <option value="Healthy">Healthy</option>
                <option value="Warning">Warning</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dependency Categories */}
      <div className="flex border-b border-border mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'software' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('software')}
        >
          Software Dependencies
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'hardware' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('hardware')}
        >
          Hardware Dependencies
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'services' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('services')}
        >
          Service Dependencies
        </button>

        <div className="ml-auto flex items-center">
          <button
            className={`p-1 rounded ${viewType === 'list' ? 'bg-muted' : ''}`}
            onClick={() => setViewType('list')}
            aria-label="List view"
          >
            <FileText className="h-4 w-4" />
          </button>
          <button
            className={`p-1 rounded ml-1 ${viewType === 'graph' ? 'bg-muted' : ''}`}
            onClick={() => setViewType('graph')}
            aria-label="Graph view"
          >
            <GitBranch className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewType === 'list' ? (
        <div className="space-y-4">
          {currentDependencies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No dependencies found matching your criteria.</p>
            </div>
          ) : (
            currentDependencies.map((dependency: any) => (
              <Card key={dependency.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium">{dependency.name}</h3>
                        <span className={`ml-3 text-xs rounded-full px-2 py-0.5 ${getCriticalityColor(dependency.criticality)}`}>
                          {dependency.criticality}
                        </span>
                        <span className={`ml-2 text-xs rounded-full px-2 py-0.5 flex items-center ${getStatusColor(dependency.status)}`}>
                          {getStatusIcon(dependency.status)}
                          <span className="ml-1">{dependency.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {dependency.vendor} • {dependency.type} 
                        {dependency.version && ` • Version ${dependency.version}`}
                        {dependency.model && ` • ${dependency.model}`}
                        {dependency.firmware && ` • Firmware ${dependency.firmware}`}
                        {dependency.sla && ` • SLA: ${dependency.sla}`}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-xs mb-4">
                        {'vulnerabilities' in dependency && (
                          <div>
                            <span className="text-muted-foreground">Vulnerabilities:</span>
                            <span className="ml-1 font-medium">
                              {dependency.vulnerabilities > 0 ? (
                                <span className="text-warning-amber">{dependency.vulnerabilities}</span>
                              ) : (
                                <span className="text-secure-green">None</span>
                              )}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Last Updated:</span>
                          <span className="ml-1 font-medium">{dependency.lastUpdated}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dependent Assets:</span>
                          <span className="ml-1 font-medium">{dependency.assets.length}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Dependent Assets:</p>
                        <div className="flex flex-wrap gap-2">
                          {dependency.assets.map((asset: string, index: number) => (
                            <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                              {asset}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                      <Link to={`/app/dependency-manager/details/${dependency.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                      <Link to={`/app/dependency-manager/dependencies/${dependency.id}`} className="flex items-center text-primary hover:underline">
                        <Link2 className="h-4 w-4 mr-2" />
                        View Dependencies
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        <Card className="h-[500px] flex items-center justify-center">
          <CardContent>
            <div className="text-center">
              <GitBranch className="h-12 w-12 text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Dependency Graph</h3>
              <p className="text-muted-foreground mb-4">
                The interactive dependency graph visualization would be displayed here.
              </p>
              <Button>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                Switch to Hierarchical View
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dependency Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Dependency Scanner</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Scan your environment to discover and track dependencies automatically.
            </p>
            <Button variant="outline" className="w-full">
              Run Scan
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Vulnerability Scanner</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Check dependencies for known vulnerabilities and security issues.
            </p>
            <Button variant="outline" className="w-full">
              Check Vulnerabilities
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Dependency Policies</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Configure automated policies for dependency management and updates.
            </p>
            <Button variant="outline" className="w-full">
              Configure Policies
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DependencyManagerPage;