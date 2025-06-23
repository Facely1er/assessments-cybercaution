import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Lock, 
  Eye, 
  AlertTriangle, 
  Database, 
  ArrowLeft, 
  FileText,
  Download,
  CheckCircle,
  Info,
  Share2,
  User,
  Bookmark,
  ExternalLink
} from 'lucide-react';

// Mock data for tools to simulate tool fetching
const toolsData = [
  {
    id: 'mfa-analyzer',
    name: 'Multi-Factor Authentication Analyzer',
    category: 'prevention',
    description: 'Analyzes your authentication methods and recommends MFA improvements to prevent unauthorized access that could lead to ransomware attacks.',
    nistCsf: ['PR.AC-1', 'PR.AC-7'],
    version: '1.2.3',
    lastUpdated: 'March 15, 2025',
    longDescription: `
      The Multi-Factor Authentication Analyzer helps organizations assess their current authentication methods and identify opportunities to implement or enhance MFA across systems and applications. MFA is a critical control for preventing unauthorized access that could lead to ransomware deployment.
      
      This tool analyzes your current authentication systems and provides specific recommendations based on NIST standards and best practices for MFA implementation. It prioritizes recommendations based on the criticality of systems and helps create a roadmap for enhancing authentication security.
    `,
    benefits: [
      'Identify authentication vulnerabilities that could lead to ransomware attacks',
      'Prioritize MFA implementation across systems based on risk',
      'Align authentication practices with NIST SP 800-63B Digital Identity Guidelines',
      'Track MFA coverage across your organization',
      'Generate executive reports on authentication security posture'
    ],
    usage: [
      'Run the analyzer against your directory services (Active Directory, LDAP, etc.)',
      'Review the generated report of authentication methods',
      'Prioritize systems for MFA implementation based on recommendations',
      'Create an implementation plan for addressing gaps',
      'Schedule regular reassessments to track progress'
    ],
    requirements: [
      'Directory service access (read-only permissions)',
      'Authentication system configuration details',
      'Inventory of critical systems and applications',
      'Current authentication policies and procedures'
    ],
    resources: [
      {
        name: 'NIST SP 800-63B Digital Identity Guidelines',
        url: 'https://pages.nist.gov/800-63-3/sp800-63b.html'
      },
      {
        name: 'CISA MFA Guidance',
        url: 'https://www.cisa.gov/mfa'
      },
      {
        name: 'Microsoft MFA Deployment Guide',
        url: 'https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks'
      }
    ]
  },
  {
    id: 'backup-validation',
    name: 'Backup Validation Tool',
    category: 'recovery',
    description: 'Tests and validates backup integrity and restoration capabilities to ensure recoverability from ransomware attacks.',
    nistCsf: ['PR.IP-4', 'RC.RP-1'],
    version: '2.0.1',
    lastUpdated: 'March 10, 2025',
    longDescription: `
      The Backup Validation Tool is designed to ensure your backup systems are properly configured and functioning correctly. It performs a series of tests on your backups to validate integrity, completeness, and recoverability—the three critical aspects of effective backup systems.
      
      Regular validation of backups is essential for ransomware protection, as backups are often your last line of defense. This tool helps identify issues before they become problems during an actual recovery scenario.
    `,
    benefits: [
      'Ensure backups are complete and restorable in case of ransomware attacks',
      'Identify backup configuration issues before they impact recovery',
      'Test restoration processes without impacting production systems',
      'Validate offline and air-gapped backup integrity',
      'Generate documentation for compliance and auditing purposes'
    ],
    usage: [
      'Configure the tool with your backup system details',
      'Select the validation tests to perform (integrity check, restoration test, etc.)',
      'Schedule regular automated validation runs',
      'Review detailed validation reports',
      'Address any identified issues with your backup systems'
    ],
    requirements: [
      'Access to backup systems and configurations',
      'Restoration testing environment (isolated from production)',
      'Backup schedules and retention policies',
      'Backup software API access (optional but recommended)'
    ],
    resources: [
      {
        name: 'NIST SP 1800-11 Data Integrity',
        url: 'https://www.nccoe.nist.gov/projects/building-blocks/data-integrity'
      },
      {
        name: '3-2-1 Backup Strategy Guide',
        url: 'https://www.us-cert.gov/ncas/tips/ST04-003'
      },
      {
        name: 'CISA Ransomware Guide - Backup Strategy',
        url: 'https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf'
      }
    ]
  },
  {
    id: 'playbook-generator',
    name: 'Ransomware Response Playbook Generator',
    category: 'response',
    description: 'Creates customized ransomware response playbooks based on your environment.',
    nistCsf: ['RS.RP-1', 'RS.CO-1'],
    version: '3.1.0',
    lastUpdated: 'March 12, 2025',
    longDescription: `
      The Ransomware Response Playbook Generator helps organizations create detailed, specific response plans for ransomware incidents. By answering a series of questions about your environment, the tool generates a comprehensive playbook tailored to your organization's structure, systems, and resources.
      
      Having a well-designed, documented response plan is critical for effectively managing a ransomware incident. This tool ensures your playbook includes all necessary elements and aligns with industry best practices and NIST guidelines.
    `,
    benefits: [
      'Create organization-specific ransomware response procedures',
      'Ensure consistent incident handling across your organization',
      'Align response activities with industry best practices',
      'Clarify roles and responsibilities during incidents',
      'Update and adapt your playbook as your environment changes'
    ],
    usage: [
      'Enter information about your organization, systems, and resources',
      'Define key roles and responsibilities for incident response',
      'Customize response procedures based on your environment',
      'Generate PDF and editable versions of your playbook',
      'Regularly review and update your playbook'
    ],
    requirements: [
      'Organization information and structure',
      'Key contact information for response team',
      'Inventory of critical systems',
      'Current security controls and capabilities',
      'Incident response team structure'
    ],
    resources: [
      {
        name: 'NIST SP 800-61r2 Computer Security Incident Handling Guide',
        url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf'
      },
      {
        name: 'CISA Ransomware Response Checklist',
        url: 'https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf'
      }
    ]
  }
];

const ToolkitDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the tool based on the ID from the URL parameter
  const tool = toolsData.find(t => t.id === toolId);
  
  // Handle case where tool is not found
  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-warning-amber mb-4" />
        <h2 className="text-2xl font-bold mb-2">Tool Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The requested tool could not be found or may have been removed.
        </p>
        <Button onClick={() => navigate('/app/toolkit')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Toolkit
        </Button>
      </div>
    );
  }

  // Get the appropriate icon based on category
  const getCategoryIcon = () => {
    switch (tool.category) {
      case 'prevention':
        return <Lock className="h-6 w-6 text-primary" />;
      case 'detection':
        return <Eye className="h-6 w-6 text-primary" />;
      case 'response':
        return <AlertTriangle className="h-6 w-6 text-primary" />;
      case 'recovery':
        return <Database className="h-6 w-6 text-primary" />;
      default:
        return <FileText className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <Button 
            variant="outline" 
            className="mb-4" 
            onClick={() => navigate('/app/toolkit')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolkit
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              {getCategoryIcon()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{tool.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">
                  {tool.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  Version {tool.version}
                </span>
                <span className="text-xs text-muted-foreground">
                  Updated: {tool.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'usage' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('usage')}
        >
          Usage Guide
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'resources' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {tool.longDescription}
                </p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">NIST CSF Alignment</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.nistCsf.map((item, index) => (
                      <div key={index} className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <Info className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Usage Guide Tab */}
        {activeTab === 'usage' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Use This Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {tool.usage.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configuration Options</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Configuration options will be displayed when you download and run the tool.
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download to Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Example Screenshots/Output */}
            <Card>
              <CardHeader>
                <CardTitle>Example Output</CardTitle>
                <CardDescription>Sample results from the tool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md">
                  {tool.id === 'mfa-analyzer' && (
                    <div className="space-y-4">
                      <div className="p-3 border border-border rounded-md">
                        <h4 className="font-medium mb-2">Authentication Assessment Results</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>Systems with MFA enabled:</span>
                            <span className="font-medium">7/14 (50%)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>Critical systems with MFA:</span>
                            <span className="font-medium text-critical-red">3/6 (50%)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>External-facing systems with MFA:</span>
                            <span className="font-medium text-critical-red">4/5 (80%)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>MFA standards compliance:</span>
                            <span className="font-medium text-warning-amber">Partial</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-border rounded-md">
                        <h4 className="font-medium mb-2">Critical Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-critical-red mr-2 flex-shrink-0 mt-0.5" />
                            <span>Implement MFA for all VPN connections and remote access</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-critical-red mr-2 flex-shrink-0 mt-0.5" />
                            <span>Enable MFA for all administrator accounts</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-warning-amber mr-2 flex-shrink-0 mt-0.5" />
                            <span>Upgrade legacy MFA methods to modern standards</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {tool.id === 'backup-validation' && (
                    <div className="space-y-4">
                      <div className="p-3 border border-border rounded-md">
                        <h4 className="font-medium mb-2">Backup Validation Results</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>Backup integrity check:</span>
                            <span className="font-medium text-secure-green">PASSED</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>Restoration test:</span>
                            <span className="font-medium text-warning-amber">PARTIAL</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>Backup encryption verified:</span>
                            <span className="font-medium text-secure-green">PASSED</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border">
                            <span>Air-gap verification:</span>
                            <span className="font-medium text-critical-red">FAILED</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-border rounded-md">
                        <h4 className="font-medium mb-2">Critical Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-critical-red mr-2 flex-shrink-0 mt-0.5" />
                            <span>Implement true air-gapped backups to prevent ransomware access</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-warning-amber mr-2 flex-shrink-0 mt-0.5" />
                            <span>Resolve partial restoration failures for database systems</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                            <span>Current encryption implementation meets standards</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {tool.id === 'playbook-generator' && (
                    <div className="space-y-4">
                      <div className="p-3 border border-border rounded-md">
                        <h4 className="font-medium mb-2">Generated Playbook Sections</h4>
                        <ol className="space-y-2 text-sm list-decimal ml-4">
                          <li>Roles and Responsibilities</li>
                          <li>Initial Response Procedures</li>
                          <li>Containment Strategy</li>
                          <li>Eradication Procedures</li>
                          <li>Recovery Workflow</li>
                          <li>Communication Templates</li>
                          <li>Decision Trees</li>
                          <li>Contact Information</li>
                          <li>Resource Requirements</li>
                          <li>Post-Incident Activities</li>
                        </ol>
                      </div>
                      
                      <div className="p-3 border border-border rounded-md">
                        <h4 className="font-medium mb-2">Sample: Containment Strategy</h4>
                        <div className="text-sm">
                          <p className="mb-2"><strong>Objective:</strong> Limit the spread of ransomware and prevent further encryption of systems.</p>
                          <p className="mb-2"><strong>Immediate Actions:</strong></p>
                          <ol className="list-decimal ml-4 mb-2">
                            <li>Identify and isolate infected systems</li>
                            <li>Disable affected user accounts</li>
                            <li>Block identified IOCs at network boundaries</li>
                            <li>Implement emergency network segmentation</li>
                          </ol>
                          <p className="mb-2"><strong>Decision Criteria:</strong> Based on the spread and critical systems affected, determine if full network isolation is required.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <FileText className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium mb-1">User Guide</h4>
                          <p className="text-sm text-muted-foreground mb-2">Comprehensive usage instructions and examples</p>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <FileText className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium mb-1">Technical Reference</h4>
                          <p className="text-sm text-muted-foreground mb-2">Advanced configuration and API documentation</p>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>External References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tool.resources.map((resource, index) => (
                    <div key={index} className="flex items-start">
                      <ExternalLink className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">{resource.name}</h4>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {resource.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Need Help with This Tool?</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our team is available to provide assistance with implementation and usage of this tool.
                      </p>
                      <Button>Contact Support</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolkitDetail;