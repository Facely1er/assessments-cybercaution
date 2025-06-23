import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Search, 
  Filter, 
  ArrowRight,
  FileText,
  Link as LinkIcon,
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ControlMapping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFramework, setActiveFramework] = useState('identify');
  const [expandedControl, setExpandedControl] = useState<string | null>(null);

  // Define the mapping between NIST CSF and SP 800-53 controls
  const controlMappings = {
    identify: {
      title: "Identify",
      description: "Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities",
      controls: [
        {
          csfId: "ID.AM-1",
          csfName: "Asset Management - Physical Devices",
          csfDescription: "Physical devices and systems within the organization are inventoried",
          sp80053Controls: [
            { id: "CM-8", name: "System Component Inventory" },
            { id: "PM-5", name: "System Inventory" }
          ],
          ransomwareSpecific: true,
          priority: "High",
          implementation: "Maintain accurate inventory of all devices that can access organizational systems"
        },
        {
          csfId: "ID.AM-2",
          csfName: "Asset Management - Software Platforms",
          csfDescription: "Software platforms and applications are inventoried",
          sp80053Controls: [
            { id: "CM-8", name: "System Component Inventory" },
            { id: "CM-10", name: "Software Usage Restrictions" },
            { id: "CM-11", name: "User-Installed Software" }
          ],
          ransomwareSpecific: true,
          priority: "High",
          implementation: "Maintain inventory of authorized software and monitor for unauthorized software"
        }
      ]
    },
    protect: {
      title: "Protect",
      description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
      controls: [
        {
          csfId: "PR.AC-1",
          csfName: "Access Control - Identities and Credentials",
          csfDescription: "Identities and credentials are issued, managed, verified, revoked, and audited",
          sp80053Controls: [
            { id: "AC-2", name: "Account Management" },
            { id: "IA-2", name: "Identification and Authentication" },
            { id: "IA-4", name: "Identifier Management" },
            { id: "IA-5", name: "Authenticator Management" },
            { id: "IA-8", name: "Identification and Authentication (Non-Organizational Users)" }
          ],
          ransomwareSpecific: true,
          priority: "Critical",
          implementation: "Implement strong authentication mechanisms and regular credential auditing"
        },
        {
          csfId: "PR.DS-1",
          csfName: "Data Security - Data-at-rest",
          csfDescription: "Data-at-rest is protected",
          sp80053Controls: [
            { id: "SC-28", name: "Protection of Information at Rest" },
            { id: "SC-28(1)", name: "Cryptographic Protection" }
          ],
          ransomwareSpecific: true,
          priority: "Critical",
          implementation: "Implement encryption for sensitive data storage"
        }
      ]
    },
    detect: {
      title: "Detect",
      description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
      controls: [
        {
          csfId: "DE.CM-1",
          csfName: "Continuous Monitoring",
          csfDescription: "The network is monitored to detect potential cybersecurity events",
          sp80053Controls: [
            { id: "AU-12", name: "Audit Generation" },
            { id: "CA-7", name: "Continuous Monitoring" },
            { id: "IR-5", name: "Incident Monitoring" },
            { id: "SI-4", name: "System Monitoring" }
          ],
          ransomwareSpecific: true,
          priority: "High",
          implementation: "Implement continuous monitoring for ransomware indicators"
        }
      ]
    },
    respond: {
      title: "Respond",
      description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
      controls: [
        {
          csfId: "RS.RP-1",
          csfName: "Response Planning",
          csfDescription: "Response plan is executed during or after an incident",
          sp80053Controls: [
            { id: "IR-4", name: "Incident Handling" },
            { id: "IR-8", name: "Incident Response Plan" }
          ],
          ransomwareSpecific: true,
          priority: "Critical",
          implementation: "Develop and maintain ransomware-specific incident response procedures"
        }
      ]
    },
    recover: {
      title: "Recover",
      description: "Develop and implement appropriate activities to maintain plans for resilience and to restore capabilities or services",
      controls: [
        {
          csfId: "RC.RP-1",
          csfName: "Recovery Planning",
          csfDescription: "Recovery plan is executed during or after a cybersecurity incident",
          sp80053Controls: [
            { id: "CP-10", name: "System Recovery and Reconstitution" },
            { id: "IR-4", name: "Incident Handling" }
          ],
          ransomwareSpecific: true,
          priority: "Critical",
          implementation: "Maintain and test backup restoration procedures"
        }
      ]
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-destructive/10 text-destructive';
      case 'high':
        return 'bg-warning/10 text-warning';
      case 'medium':
        return 'bg-secondary/10 text-secondary';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Control Mapping</h1>
          <p className="text-muted-foreground">NIST CSF to SP 800-53 Control Mapping for Ransomware Protection</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Export Mapping
          </Button>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View References
          </Button>
        </div>
      </div>

      {/* Search and Framework Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search controls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={activeFramework}
                onChange={(e) => setActiveFramework(e.target.value)}
              >
                <option value="identify">Identify Function</option>
                <option value="protect">Protect Function</option>
                <option value="detect">Detect Function</option>
                <option value="respond">Respond Function</option>
                <option value="recover">Recover Function</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Framework Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>{controlMappings[activeFramework as keyof typeof controlMappings].title} Function</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {controlMappings[activeFramework as keyof typeof controlMappings].description}
          </p>
          
          <div className="space-y-6">
            {controlMappings[activeFramework as keyof typeof controlMappings].controls.map((control) => (
              <Card key={control.csfId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                            {control.csfId}
                          </span>
                          {control.ransomwareSpecific && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Ransomware Specific
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(control.priority)}`}>
                            {control.priority} Priority
                          </span>
                        </div>
                        <h3 className="text-lg font-medium">{control.csfName}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedControl(expandedControl === control.csfId ? null : control.csfId)}
                      >
                        {expandedControl === control.csfId ? 'Show Less' : 'Show More'}
                      </Button>
                    </div>

                    <p className="text-muted-foreground">{control.csfDescription}</p>

                    {expandedControl === control.csfId && (
                      <>
                        <div className="border-t border-border pt-4">
                          <h4 className="text-sm font-medium mb-2">SP 800-53 Control Mapping</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {control.sp80053Controls.map((sp800Control) => (
                              <div
                                key={sp800Control.id}
                                className="flex items-center space-x-2 p-2 bg-muted rounded-md"
                              >
                                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-mono">{sp800Control.id}</span>
                                <span className="text-sm text-muted-foreground">
                                  {sp800Control.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-border pt-4">
                          <h4 className="text-sm font-medium mb-2">Implementation Guidance</h4>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Info className="h-5 w-5 text-primary mt-0.5" />
                              <p className="text-sm">{control.implementation}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-success" />
            Implementation Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium">Critical Controls</p>
                  <p className="text-sm text-muted-foreground">High-priority controls implementation status</p>
                </div>
              </div>
              <span className="text-sm font-medium">3/5 Implemented</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium">Required Actions</p>
                  <p className="text-sm text-muted-foreground">Pending control implementations</p>
                </div>
              </div>
              <span className="text-sm font-medium">2 Actions Required</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlMapping;