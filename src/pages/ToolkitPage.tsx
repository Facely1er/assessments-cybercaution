import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Lock, 
  Database, 
  Server, 
  FileText,
  Network,
  ArrowRight,
  Users,
  Mail,
  ExternalLink,
  Eye,
  Zap,
  Download,
  Plus,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolkitPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter categories
  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'prevention', name: 'Prevention Tools' },
    { id: 'detection', name: 'Detection Tools' },
    { id: 'response', name: 'Response Tools' },
    { id: 'recovery', name: 'Recovery Tools' },
  ];
  
  // Tools data with NIST CSF mappings
  const tools = [
    {
      id: 'mfa-analyzer',
      name: 'Multi-Factor Authentication Analyzer',
      category: 'prevention',
      description: 'Analyzes your authentication methods and recommends MFA improvements.',
      nistCsf: ['PR.AC-1', 'PR.AC-7'],
      popularity: 'high',
      format: 'Assessment',
      lastUpdated: '2025-03-15'
    },
    {
      id: 'network-segmentation',
      name: 'Network Segmentation Planner',
      category: 'prevention',
      description: 'Creates network segmentation plans to contain potential ransomware spread.',
      nistCsf: ['PR.AC-5', 'PR.PT-4'],
      popularity: 'medium',
      format: 'Planning',
      lastUpdated: '2025-02-28'
    },
    {
      id: 'backup-validation',
      name: 'Backup Validation Tool',
      category: 'recovery',
      description: 'Tests and validates backup integrity and restoration capabilities.',
      nistCsf: ['PR.IP-4', 'RC.RP-1'],
      popularity: 'high',
      format: 'Testing',
      lastUpdated: '2025-03-10'
    },
    {
      id: 'ransomware-ioc-scanner',
      name: 'Ransomware IOC Scanner',
      category: 'detection',
      description: 'Scans systems for known ransomware indicators of compromise.',
      nistCsf: ['DE.CM-1', 'DE.CM-4'],
      popularity: 'high',
      format: 'Scanning',
      lastUpdated: '2025-03-05'
    },
    {
      id: 'playbook-generator',
      name: 'Ransomware Response Playbook Generator',
      category: 'response',
      description: 'Creates customized ransomware response playbooks based on your environment.',
      nistCsf: ['RS.RP-1', 'RS.CO-1'],
      popularity: 'high',
      format: 'Documentation',
      lastUpdated: '2025-03-12'
    },
    {
      id: 'tabletop-generator',
      name: 'Tabletop Exercise Generator',
      category: 'response',
      description: 'Creates realistic ransomware tabletop exercises for team training.',
      nistCsf: ['PR.IP-10', 'RS.CO-1'],
      popularity: 'medium',
      format: 'Training',
      lastUpdated: '2025-02-20'
    },
    {
      id: 'system-isolation',
      name: 'System Isolation Tool',
      category: 'response',
      description: 'Provides procedures for safely isolating infected systems during an incident.',
      nistCsf: ['RS.MI-1', 'RS.MI-2'],
      popularity: 'medium',
      format: 'Procedure',
      lastUpdated: '2025-02-15'
    },
    {
      id: 'recovery-time-estimator',
      name: 'Recovery Time Estimator',
      category: 'recovery',
      description: 'Estimates recovery time based on system complexity and backup strategy.',
      nistCsf: ['RC.RP-1', 'ID.RA-4'],
      popularity: 'medium',
      format: 'Assessment',
      lastUpdated: '2025-03-01'
    },
    {
      id: 'secure-communications',
      name: 'Secure Communications Kit',
      category: 'response',
      description: 'Provides secure out-of-band communication tools for incident response.',
      nistCsf: ['RS.CO-2', 'RS.CO-4'],
      popularity: 'low',
      format: 'Tool',
      lastUpdated: '2025-01-30'
    },
    {
      id: 'email-protection',
      name: 'Email Protection Configurator',
      category: 'prevention',
      description: 'Configuration templates for email security to prevent phishing and malware.',
      nistCsf: ['PR.DS-2', 'PR.DS-6'],
      popularity: 'high',
      format: 'Configuration',
      lastUpdated: '2025-03-08'
    },
    {
      id: 'endpoint-hardening',
      name: 'Endpoint Hardening Tool',
      category: 'prevention',
      description: 'Creates hardened endpoint configurations to prevent ransomware execution.',
      nistCsf: ['PR.PT-3', 'PR.IP-1'],
      popularity: 'medium',
      format: 'Configuration',
      lastUpdated: '2025-02-25'
    },
    {
      id: 'malicious-activity-monitor',
      name: 'Malicious Activity Monitor',
      category: 'detection',
      description: 'Monitors for suspicious activities indicative of ransomware attacks.',
      nistCsf: ['DE.CM-1', 'DE.CM-4', 'DE.CM-7'],
      popularity: 'medium',
      format: 'Monitoring',
      lastUpdated: '2025-02-10'
    },
    {
      id: 'recovery-documentation',
      name: 'Recovery Documentation Generator',
      category: 'recovery',
      description: 'Creates comprehensive recovery documentation for ransomware incidents.',
      nistCsf: ['RC.RP-1', 'RC.CO-3'],
      popularity: 'low',
      format: 'Documentation',
      lastUpdated: '2025-01-20'
    },
    {
      id: 'risk-assessment',
      name: 'Ransomware Risk Assessment',
      category: 'prevention',
      description: 'Comprehensive ransomware-specific risk assessment aligned with NIST IR 8374.',
      nistCsf: ['ID.RA-1', 'ID.RA-3', 'ID.RA-5'],
      popularity: 'high',
      format: 'Assessment',
      lastUpdated: '2025-03-18'
    },
    {
      id: 'comms-template',
      name: 'Crisis Communications Templates',
      category: 'response',
      description: 'Pre-built templates for internal and external crisis communications.',
      nistCsf: ['RS.CO-1', 'RS.CO-2', 'RS.CO-4', 'RS.CO-5'],
      popularity: 'medium',
      format: 'Templates',
      lastUpdated: '2025-02-05'
    }
  ];

  // Filter tools based on search and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.nistCsf.some(ref => ref.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeFilter === 'all' || tool.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Ransomware Toolkit</h1>
          <p className="text-muted-foreground">Comprehensive tools for ransomware defense and recovery</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Full Toolkit
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Request Tool
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search tools, references..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {/* Category Filter Buttons */}
            <div className="md:col-span-2 overflow-x-auto">
              <div className="flex space-x-2 flex-nowrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-3 py-2 text-sm rounded-md whitespace-nowrap ${
                      activeFilter === category.id
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

      {/* Tool Categories Section */}
      <div>
        {/* Display Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="rounded-lg p-2 bg-primary/10">
                    {tool.category === 'prevention' && <Lock className="h-5 w-5 text-primary" />}
                    {tool.category === 'detection' && <Eye className="h-5 w-5 text-primary" />}
                    {tool.category === 'response' && <AlertTriangle className="h-5 w-5 text-primary" />}
                    {tool.category === 'recovery' && <Database className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">
                      {tool.category}
                    </span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {tool.format}
                    </span>
                    {tool.popularity === 'high' && (
                      <span className="text-xs bg-warning-amber/10 text-warning-amber px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.nistCsf.map((csf, index) => (
                    <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {csf}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Updated: {tool.lastUpdated}
                  </div>
                  <Button variant="outline" size="sm">
                    <Link to={`/app/toolkit/${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No tools found matching your criteria.</p>
            <Button variant="outline" size="sm" onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Framework Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            NIST Ransomware Protection Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our toolkit is aligned with NIST IR 8374, "Cybersecurity Framework Profile for Ransomware Risk Management," 
            which provides specific guidance for ransomware protection within the NIST CSF framework.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Eye className="h-10 w-10 text-electric-blue mb-2" />
                  <h3 className="font-medium mb-1">Identify</h3>
                  <p className="text-xs text-muted-foreground">Asset management, risk assessment</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Lock className="h-10 w-10 text-electric-blue mb-2" />
                  <h3 className="font-medium mb-1">Protect</h3>
                  <p className="text-xs text-muted-foreground">Access control, backups, awareness</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Zap className="h-10 w-10 text-electric-blue mb-2" />
                  <h3 className="font-medium mb-1">Detect</h3>
                  <p className="text-xs text-muted-foreground">Monitoring, anomaly detection</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <AlertTriangle className="h-10 w-10 text-electric-blue mb-2" />
                  <h3 className="font-medium mb-1">Respond</h3>
                  <p className="text-xs text-muted-foreground">Incident handling, communications</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Database className="h-10 w-10 text-electric-blue mb-2" />
                  <h3 className="font-medium mb-1">Recover</h3>
                  <p className="text-xs text-muted-foreground">Restoration, improvements</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline">
              <Link to="/nist-csf-alignment">
                View NIST CSF Alignment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tool Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Tool Collections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Ransomware Defense Bundle</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Complete collection of tools for robust ransomware defense, covering all NIST CSF functions.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Bundle
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Incident Response Kit</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Essential tools for ransomware incident response teams, including playbooks and communication templates.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Kit
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Executive Toolkit</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Decision-making frameworks and executive templates for ransomware incident management.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Toolkit
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* External Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">CISA Ransomware Guide</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  The Cybersecurity and Infrastructure Security Agency's official guide to ransomware protection.
                </p>
                <a 
                  href="https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View Resource
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">NIST IR 8374</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  NIST's Cybersecurity Framework Profile for Ransomware Risk Management.
                </p>
                <a 
                  href="https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8374.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View Resource
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolkitPage;