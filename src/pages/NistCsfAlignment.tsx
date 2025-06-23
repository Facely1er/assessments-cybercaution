import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ArrowLeft, 
  ArrowRight,
  FileText,
  Settings,
  Download
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const NistCsfAlignment = () => {
  const csfFunctions = [
    {
      id: 'identify',
      name: "Identify",
      description: "Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities",
      categories: [
        {
          id: 'id.am',
          name: 'Asset Management',
          subcategories: [
            { id: 'ID.AM-1', name: 'Physical devices inventory', ransomwareRelevance: 'high' },
            { id: 'ID.AM-2', name: 'Software platforms inventory', ransomwareRelevance: 'high' },
            { id: 'ID.AM-3', name: 'Organizational communication and data flows', ransomwareRelevance: 'medium' },
            { id: 'ID.AM-4', name: 'External information systems catalog', ransomwareRelevance: 'medium' },
            { id: 'ID.AM-5', name: 'Resources prioritization', ransomwareRelevance: 'high' },
          ]
        },
        {
          id: 'id.ra',
          name: 'Risk Assessment',
          subcategories: [
            { id: 'ID.RA-1', name: 'Asset vulnerabilities are identified and documented', ransomwareRelevance: 'critical' },
            { id: 'ID.RA-2', name: 'Cyber threat intelligence is received', ransomwareRelevance: 'high' },
            { id: 'ID.RA-3', name: 'Threats are identified and documented', ransomwareRelevance: 'critical' },
            { id: 'ID.RA-4', name: 'Potential business impacts and likelihoods are identified', ransomwareRelevance: 'high' },
            { id: 'ID.RA-5', name: 'Threats, vulnerabilities, likelihoods, and impacts are used to determine risk', ransomwareRelevance: 'high' },
            { id: 'ID.RA-6', name: 'Risk responses are identified and prioritized', ransomwareRelevance: 'critical' },
          ]
        }
      ]
    },
    {
      id: 'protect',
      name: "Protect",
      description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
      categories: [
        {
          id: 'pr.ac',
          name: 'Access Control',
          subcategories: [
            { id: 'PR.AC-1', name: 'Identities and credentials are managed', ransomwareRelevance: 'critical' },
            { id: 'PR.AC-3', name: 'Remote access is managed', ransomwareRelevance: 'critical' },
            { id: 'PR.AC-4', name: 'Access permissions are managed', ransomwareRelevance: 'high' },
            { id: 'PR.AC-5', name: 'Network integrity is protected', ransomwareRelevance: 'critical' },
          ]
        },
        {
          id: 'pr.ds',
          name: 'Data Security',
          subcategories: [
            { id: 'PR.DS-1', name: 'Data-at-rest is protected', ransomwareRelevance: 'high' },
            { id: 'PR.DS-2', name: 'Data-in-transit is protected', ransomwareRelevance: 'medium' },
            { id: 'PR.DS-5', name: 'Protections against data leaks are implemented', ransomwareRelevance: 'high' },
            { id: 'PR.DS-6', name: 'Integrity checking mechanisms are used', ransomwareRelevance: 'high' },
          ]
        },
        {
          id: 'pr.ip',
          name: 'Information Protection Processes and Procedures',
          subcategories: [
            { id: 'PR.IP-4', name: 'Backups of information are conducted, maintained, and tested', ransomwareRelevance: 'critical' },
            { id: 'PR.IP-9', name: 'Response plans and recovery plans are in place and managed', ransomwareRelevance: 'critical' },
            { id: 'PR.IP-10', name: 'Response and recovery plans are tested', ransomwareRelevance: 'critical' },
          ]
        }
      ]
    },
    {
      id: 'detect',
      name: "Detect",
      description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
      categories: [
        {
          id: 'de.cm',
          name: 'Security Continuous Monitoring',
          subcategories: [
            { id: 'DE.CM-1', name: 'The network is monitored to detect potential cybersecurity events', ransomwareRelevance: 'high' },
            { id: 'DE.CM-4', name: 'Malicious code is detected', ransomwareRelevance: 'critical' },
            { id: 'DE.CM-5', name: 'Unauthorized mobile code is detected', ransomwareRelevance: 'medium' },
          ]
        },
        {
          id: 'de.dp',
          name: 'Detection Processes',
          subcategories: [
            { id: 'DE.DP-4', name: 'Event detection information is communicated', ransomwareRelevance: 'high' },
            { id: 'DE.DP-5', name: 'Detection processes are continuously improved', ransomwareRelevance: 'medium' },
          ]
        }
      ]
    },
    {
      id: 'respond',
      name: "Respond",
      description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
      categories: [
        {
          id: 'rs.rp',
          name: 'Response Planning',
          subcategories: [
            { id: 'RS.RP-1', name: 'Response plan is executed during or after an incident', ransomwareRelevance: 'critical' },
          ]
        },
        {
          id: 'rs.co',
          name: 'Communications',
          subcategories: [
            { id: 'RS.CO-1', name: 'Personnel know their roles and order of operations when a response is needed', ransomwareRelevance: 'critical' },
            { id: 'RS.CO-2', name: 'Incidents are reported consistent with established criteria', ransomwareRelevance: 'high' },
            { id: 'RS.CO-4', name: 'Coordination with stakeholders occurs consistent with response plans', ransomwareRelevance: 'high' },
          ]
        }
      ]
    },
    {
      id: 'recover',
      name: "Recover",
      description: "Develop and implement appropriate activities to maintain plans for resilience and to restore capabilities or services",
      categories: [
        {
          id: 'rc.rp',
          name: 'Recovery Planning',
          subcategories: [
            { id: 'RC.RP-1', name: 'Recovery plan is executed during or after a cybersecurity incident', ransomwareRelevance: 'critical' },
          ]
        },
        {
          id: 'rc.im',
          name: 'Improvements',
          subcategories: [
            { id: 'RC.IM-1', name: 'Recovery plans incorporate lessons learned', ransomwareRelevance: 'high' },
            { id: 'RC.IM-2', name: 'Recovery strategies are updated', ransomwareRelevance: 'high' },
          ]
        }
      ]
    }
  ];

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'critical':
        return 'bg-destructive/10 text-destructive';
      case 'high':
        return 'bg-warning/10 text-warning';
      case 'medium':
        return 'bg-electric-blue/10 text-electric-blue';
      case 'low':
        return 'bg-secure-green/10 text-secure-green';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRelevanceIcon = (relevance: string) => {
    switch (relevance) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Info className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <RouterLink to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </RouterLink>
        <h1 className="text-3xl font-bold mb-2 text-foreground">NIST CSF Ransomware Alignment</h1>
        <p className="text-muted-foreground mb-6">Mapping ransomware controls to NIST Cybersecurity Framework v2.0</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>NIST IR 8374 Overview</CardTitle>
          <CardDescription>Cybersecurity Framework Profile for Ransomware Risk Management</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            NIST Interagency Report 8374 provides a ransomware-specific overlay of the NIST Cybersecurity Framework, 
            highlighting the CSF controls that are most critical for preventing, responding to, and recovering from 
            ransomware attacks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-electric-blue" />
                Key Focus Areas
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identify and protect critical data, systems, and backups</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Implement robust access controls and authentication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Maintain awareness of ransomware threats and vulnerabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Develop and test response and recovery capabilities</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-electric-blue" />
                How to Use This Guide
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identify the most critical controls for ransomware defense</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Prioritize implementation based on ransomware relevance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Map your existing controls to the framework</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identify and address gaps in your ransomware defenses</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button variant="orange">
              <Download className="mr-2 h-4 w-4" />
              Download NIST IR 8374 Guide
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {csfFunctions.map((func) => (
          <Card key={func.id} className="overflow-hidden">
            <CardHeader className={`bg-${func.id}/5`}>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                {func.name} Function
              </CardTitle>
              <CardDescription>{func.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {func.categories.map((category) => (
                  <div key={category.id} className="p-6">
                    <h3 className="text-lg font-medium mb-4">{category.name}</h3>
                    
                    <div className="space-y-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded mr-2">
                                {subcategory.id}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getRelevanceColor(subcategory.ransomwareRelevance)}`}>
                                {getRelevanceIcon(subcategory.ransomwareRelevance)}
                                <span className="ml-1">{subcategory.ransomwareRelevance.charAt(0).toUpperCase() + subcategory.ransomwareRelevance.slice(1)} Relevance</span>
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Map Risks
                            </Button>
                          </div>
                          
                          <p className="text-sm">{subcategory.name}</p>
                          
                          {subcategory.id === 'ID.RA-1' && (
                            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                              <div className="flex items-start">
                                <Info className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium">Ransomware Implementation</p>
                                  <p className="text-xs text-muted-foreground">Identify and document vulnerabilities that could be exploited by ransomware, including unpatched systems, insecure configurations, and weak authentication.</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {subcategory.id === 'PR.IP-4' && (
                            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                              <div className="flex items-start">
                                <Info className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium">Ransomware Implementation</p>
                                  <p className="text-xs text-muted-foreground">Maintain offline, encrypted backups and regularly test restoration procedures to ensure recovery from ransomware attacks.</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {subcategory.id === 'RS.RP-1' && (
                            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                              <div className="flex items-start">
                                <Info className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium">Ransomware Implementation</p>
                                  <p className="text-xs text-muted-foreground">Develop and maintain a ransomware-specific incident response plan with clear decision-making procedures.</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Assessment Tools</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Evaluate your organization's alignment with NIST CSF ransomware controls.
            </p>
            <RouterLink to="/ransomware-assessment">
              <Button className="w-full" variant="orange">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Risk Mapping</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Map your organization's ransomware risks to NIST CSF controls.
            </p>
            <RouterLink to="/app/risk-register">
              <Button className="w-full" variant="orange">
                Map Risks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Download className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Resources</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Download NIST CSF ransomware implementation guides and templates.
            </p>
            <Button variant="orange" className="w-full">
              Download Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NistCsfAlignment;