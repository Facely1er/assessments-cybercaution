import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../../../utils/AnimatedSection';
import AnimatedItem from '../../../utils/AnimatedItem';
import { 
  ArrowRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  FileText,
  Download,
  Link,
  Eye,
  Lock,
  Database,
  RefreshCw
} from 'lucide-react';

const NistIr8374Guide = () => {
  const navigate = useNavigate();

  const frameworkSections = [
    {
      title: "Identify",
      description: "Develop organizational understanding of ransomware risks",
      controls: [
        "ID.AM: Asset Management - Inventory systems vulnerable to ransomware",
        "ID.RA: Risk Assessment - Identify and document ransomware threats",
        "ID.SC: Supply Chain Risk Management - Assess third-party ransomware risks"
      ]
    },
    {
      title: "Protect",
      description: "Implement safeguards to prevent ransomware attacks",
      controls: [
        "PR.AC: Access Control - Implement MFA and least privilege",
        "PR.DS: Data Security - Encrypt sensitive data and maintain backups",
        "PR.IP: Information Protection - Patch systems and secure configurations",
        "PR.AT: Awareness and Training - Conduct phishing awareness training"
      ]
    },
    {
      title: "Detect",
      description: "Implement activities to identify ransomware events",
      controls: [
        "DE.CM: Security Continuous Monitoring - Monitor for ransomware indicators",
        "DE.AE: Anomalies and Events - Detect unusual file activity",
        "DE.DP: Detection Processes - Maintain ransomware detection capabilities"
      ]
    },
    {
      title: "Respond",
      description: "Develop capabilities to respond to ransomware incidents",
      controls: [
        "RS.RP: Response Planning - Develop ransomware-specific response plans",
        "RS.CO: Communications - Establish internal and external communication procedures",
        "RS.AN: Analysis - Investigate and understand the ransomware incident"
      ]
    },
    {
      title: "Recover",
      description: "Develop capabilities to restore from ransomware attacks",
      controls: [
        "RC.RP: Recovery Planning - Implement recovery procedures from backups",
        "RC.IM: Improvements - Update recovery plans based on lessons learned",
        "RC.CO: Communications - Coordinate restoration activities"
      ]
    }
  ];

  const criticalControls = [
    {
      id: "PR.AC-1",
      name: "Implement MFA for all remote access",
      description: "Multi-factor authentication should be required for all remote access to systems, including VPN, email, and cloud services."
    },
    {
      id: "PR.IP-4",
      name: "Maintain offline, encrypted backups",
      description: "Maintain offline, encrypted backups of critical data and regularly test restoration procedures."
    },
    {
      id: "PR.IP-12",
      name: "Keep systems patched and updated",
      description: "Maintain a vulnerability management program with timely patching of operating systems and applications."
    },
    {
      id: "PR.PT-3",
      name: "Implement application allowlisting",
      description: "Use application allowlisting to prevent unauthorized code execution on systems."
    },
    {
      id: "PR.AC-5",
      name: "Implement network segmentation",
      description: "Segment networks to contain the spread of ransomware and limit lateral movement."
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/resources/documentation')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documentation
        </Button>
        
        <AnimatedSection type="fadeIn">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-foreground">NIST IR 8374 Guide</h1>
            <p className="text-xl text-orange-500 max-w-3xl mx-auto">
              Understanding and implementing the NIST Cybersecurity Framework Profile for Ransomware Risk Management
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.1} className="mb-16">
          <Card className="dark:border-muted mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#FF6B00]/10 p-2 rounded-lg">
                  <Shield className="h-8 w-8 text-[#FF6B00]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-foreground">NIST IR 8374</h3>
                  <p className="text-muted-foreground mb-4">
                    NIST Interagency Report 8374, "Cybersecurity Framework Profile for Ransomware Risk Management," 
                    provides a prioritized subset of NIST Cybersecurity Framework controls that organizations should 
                    implement to help prevent, respond to, and recover from ransomware attacks.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-[#FF6B00]/10 text-[#FF6B00] px-2 py-0.5 rounded-full">
                      Published: February 2021
                    </span>
                    <span className="text-xs bg-[#FF6B00]/10 text-[#FF6B00] px-2 py-0.5 rounded-full">
                      Framework: NIST CSF
                    </span>
                    <span className="text-xs bg-[#FF6B00]/10 text-[#FF6B00] px-2 py-0.5 rounded-full">
                      Focus: Ransomware
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworkSections.map((section) => (
              <AnimatedItem key={section.title} type="fadeIn" className="hover:shadow-lg transition-shadow">
                <Card className="h-full dark:border-muted">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{section.title}</h3>
                    <p className="text-muted-foreground mb-4">{section.description}</p>
                    
                    <ul className="space-y-2 flex-grow">
                      {section.controls.map((control, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{control}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.2} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Critical Controls for Ransomware Defense</h2>
          <p className="text-muted-foreground mb-8">
            NIST IR 8374 highlights these controls as particularly important for ransomware defense:
          </p>
          
          <div className="space-y-6">
            {criticalControls.map((control, index) => (
              <AnimatedItem key={control.id} type="fadeIn" delay={index * 0.1}>
                <Card className="dark:border-muted hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#FF6B00]/10 p-2 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-[#FF6B00]" />
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded mr-2">
                            {control.id}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-foreground">{control.name}</h3>
                        <p className="text-muted-foreground">{control.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.3} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Implementation Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedItem type="fadeIn" delay={0.1}>
              <Card className="dark:border-muted hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-[#FF6B00] mr-3" />
                    <h3 className="text-lg font-medium">NIST IR 8374 Document</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    The official NIST Interagency Report 8374 document.
                  </p>
                  <Button variant="orange" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Document
                  </Button>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.2}>
              <Card className="dark:border-muted hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-8 w-8 text-[#FF6B00] mr-3" />
                    <h3 className="text-lg font-medium">Implementation Checklist</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Step-by-step checklist for implementing NIST IR 8374 controls.
                  </p>
                  <Button variant="orange" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Checklist
                  </Button>
                </CardContent>
              </Card>
            </AnimatedItem>
            
            <AnimatedItem type="fadeIn" delay={0.3}>
              <Card className="dark:border-muted hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="h-8 w-8 text-[#FF6B00] mr-3" />
                    <h3 className="text-lg font-medium">Assessment Tool</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Tool to assess your organization's alignment with NIST IR 8374.
                  </p>
                  <Button variant="orange" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Tool
                  </Button>
                </CardContent>
              </Card>
            </AnimatedItem>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.4}>
          <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#FF6B00]/10 rounded-lg">
                <Info className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Implementation Approach</h3>
                <p className="text-muted-foreground mb-4">
                  NIST recommends a phased approach to implementing the ransomware risk management profile:
                </p>
                <ol className="space-y-2">
                  <li className="flex items-start text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mr-2 flex-shrink-0">
                      1
                    </div>
                    <span className="text-foreground">Identify and prioritize critical systems and data</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mr-2 flex-shrink-0">
                      2
                    </div>
                    <span className="text-foreground">Implement basic protections for all systems</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mr-2 flex-shrink-0">
                      3
                    </div>
                    <span className="text-foreground">Apply enhanced controls to critical systems</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mr-2 flex-shrink-0">
                      4
                    </div>
                    <span className="text-foreground">Develop and test response and recovery capabilities</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mr-2 flex-shrink-0">
                      5
                    </div>
                    <span className="text-foreground">Continuously improve based on lessons learned and evolving threats</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button 
              onClick={() => navigate('/ransomware-assessment')}
              className="mr-4"
              variant="orange"
            >
              Start Ransomware Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/app/nist-csf-alignment')}
            >
              View NIST CSF Alignment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NistIr8374Guide;