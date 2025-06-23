import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, FileText, PieChart, Check, AlertTriangle, XCircle, BarChart3 } from 'lucide-react';

const Compliance = () => {
  const [activeFramework, setActiveFramework] = useState('nist-csf');

  const frameworks = [
    { id: 'nist-csf', name: 'NIST Cybersecurity Framework', compliance: 76 },
    { id: 'iso-27001', name: 'ISO 27001:2022', compliance: 82 },
    { id: 'nist-800-53', name: 'NIST SP 800-53', compliance: 68 },
    { id: 'gdpr', name: 'GDPR', compliance: 85 },
    { id: 'hipaa', name: 'HIPAA', compliance: 72 },
    { id: 'pci-dss', name: 'PCI DSS', compliance: 79 },
  ];

  const frameworkDetails = {
    'nist-csf': {
      categories: [
        { name: 'Identify', compliance: 85, controls: 25, compliant: 21, partial: 3, nonCompliant: 1 },
        { name: 'Protect', compliance: 72, controls: 39, compliant: 28, partial: 8, nonCompliant: 3 },
        { name: 'Detect', compliance: 68, controls: 18, compliant: 12, partial: 4, nonCompliant: 2 },
        { name: 'Respond', compliance: 78, controls: 14, compliant: 11, partial: 2, nonCompliant: 1 },
        { name: 'Recover', compliance: 70, controls: 10, compliant: 7, partial: 2, nonCompliant: 1 },
      ],
      description: 'The NIST Cybersecurity Framework provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
      documentation: [
        { name: 'NIST CSF Policy Document', date: '2025-01-15' },
        { name: 'NIST CSF Implementation Guide', date: '2025-02-01' },
        { name: 'NIST CSF Gap Analysis', date: '2025-03-10' },
      ],
    },
    'iso-27001': {
      categories: [
        { name: 'Security Policy', compliance: 90, controls: 8, compliant: 7, partial: 1, nonCompliant: 0 },
        { name: 'Organization of Information Security', compliance: 85, controls: 12, compliant: 10, partial: 2, nonCompliant: 0 },
        { name: 'Asset Management', compliance: 78, controls: 10, compliant: 8, partial: 1, nonCompliant: 1 },
        { name: 'Access Control', compliance: 82, controls: 14, compliant: 11, partial: 3, nonCompliant: 0 },
        { name: 'Cryptography', compliance: 75, controls: 8, compliant: 6, partial: 2, nonCompliant: 0 },
        { name: 'Physical & Environmental Security', compliance: 88, controls: 15, compliant: 13, partial: 2, nonCompliant: 0 },
      ],
      description: 'ISO/IEC 27001 is an international standard for information security management. It specifies a management system that is intended to bring information security under management control.',
      documentation: [
        { name: 'ISO 27001 Statement of Applicability', date: '2025-01-10' },
        { name: 'ISO 27001 Risk Treatment Plan', date: '2025-02-15' },
        { name: 'ISO 27001 Internal Audit Report', date: '2025-03-05' },
      ],
    },
    'nist-800-53': {
      categories: [
        { name: 'Access Control', compliance: 75, controls: 25, compliant: 19, partial: 4, nonCompliant: 2 },
        { name: 'Awareness and Training', compliance: 82, controls: 12, compliant: 10, partial: 1, nonCompliant: 1 },
        { name: 'Audit and Accountability', compliance: 68, controls: 18, compliant: 12, partial: 5, nonCompliant: 1 },
        { name: 'Security Assessment', compliance: 72, controls: 15, compliant: 11, partial: 3, nonCompliant: 1 },
        { name: 'Configuration Management', compliance: 65, controls: 22, compliant: 14, partial: 6, nonCompliant: 2 },
      ],
      description: 'NIST Special Publication 800-53 provides a catalog of security and privacy controls for all U.S. federal information systems except those related to national security.',
      documentation: [
        { name: 'NIST 800-53 Control Implementation Details', date: '2025-01-20' },
        { name: 'NIST 800-53 System Security Plan', date: '2025-02-10' },
        { name: 'NIST 800-53 Assessment Results', date: '2025-03-15' },
      ],
    },
    'gdpr': {
      categories: [
        { name: 'Data Protection Principles', compliance: 88, controls: 10, compliant: 9, partial: 0, nonCompliant: 1 },
        { name: 'Data Subject Rights', compliance: 85, controls: 12, compliant: 10, partial: 2, nonCompliant: 0 },
        { name: 'Controller & Processor Obligations', compliance: 82, controls: 15, compliant: 12, partial: 3, nonCompliant: 0 },
        { name: 'Data Transfers', compliance: 76, controls: 8, compliant: 6, partial: 2, nonCompliant: 0 },
        { name: 'Data Protection Governance', compliance: 90, controls: 10, compliant: 9, partial: 1, nonCompliant: 0 },
      ],
      description: 'The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy in the European Union and the European Economic Area.',
      documentation: [
        { name: 'GDPR Data Mapping Document', date: '2025-01-05' },
        { name: 'GDPR Data Protection Impact Assessment', date: '2025-02-12' },
        { name: 'GDPR Privacy Notice Review', date: '2025-03-01' },
      ],
    },
    'hipaa': {
      categories: [
        { name: 'Privacy Rule', compliance: 78, controls: 15, compliant: 12, partial: 2, nonCompliant: 1 },
        { name: 'Security Rule', compliance: 72, controls: 22, compliant: 16, partial: 4, nonCompliant: 2 },
        { name: 'Breach Notification Rule', compliance: 85, controls: 10, compliant: 8, partial: 2, nonCompliant: 0 },
        { name: 'Enforcement Rule', compliance: 80, controls: 8, compliant: 6, partial: 2, nonCompliant: 0 },
      ],
      description: 'The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for protecting sensitive patient data. Entities that handle protected health information must ensure that all required physical, network, and process security measures are in place.',
      documentation: [
        { name: 'HIPAA Security Risk Assessment', date: '2025-01-25' },
        { name: 'HIPAA Privacy Policies', date: '2025-02-08' },
        { name: 'HIPAA Business Associate Agreements', date: '2025-03-12' },
      ],
    },
    'pci-dss': {
      categories: [
        { name: 'Build & Maintain Secure Network', compliance: 82, controls: 12, compliant: 10, partial: 1, nonCompliant: 1 },
        { name: 'Protect Cardholder Data', compliance: 78, controls: 10, compliant: 8, partial: 1, nonCompliant: 1 },
        { name: 'Maintain Vulnerability Management', compliance: 75, controls: 8, compliant: 6, partial: 2, nonCompliant: 0 },
        { name: 'Implement Strong Access Control', compliance: 80, controls: 15, compliant: 12, partial: 3, nonCompliant: 0 },
        { name: 'Regular Monitoring & Testing', compliance: 76, controls: 10, compliant: 8, partial: 1, nonCompliant: 1 },
        { name: 'Information Security Policy', compliance: 85, controls: 8, compliant: 7, partial: 1, nonCompliant: 0 },
      ],
      description: 'The Payment Card Industry Data Security Standard (PCI DSS) is an information security standard for organizations that handle branded credit cards from the major card schemes.',
      documentation: [
        { name: 'PCI DSS Self-Assessment Questionnaire', date: '2025-01-30' },
        { name: 'PCI DSS Attestation of Compliance', date: '2025-02-22' },
        { name: 'PCI DSS Penetration Test Report', date: '2025-03-18' },
      ],
    },
  };

  const selectedFramework = frameworkDetails[activeFramework];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Compliance Management</h1>
          <p className="text-muted-foreground">Track and manage compliance with regulatory frameworks and standards</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            View All Controls
          </Button>
        </div>
      </div>

      {/* Framework Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {frameworks.map((framework) => (
          <Card 
            key={framework.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeFramework === framework.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveFramework(framework.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold mb-1">{framework.compliance}%</div>
              <div className="text-sm font-medium">{framework.name}</div>
              
              {/* Simple progress bar */}
              <div className="w-full bg-muted h-1.5 rounded-full mt-2">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${framework.compliance}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Framework Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{frameworks.find(f => f.id === activeFramework)?.name}</CardTitle>
            <CardDescription>{selectedFramework.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32">
                  <circle
                    className="text-muted"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={352}
                    strokeDashoffset={352 * (1 - frameworks.find(f => f.id === activeFramework)!.compliance / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold">
                  {frameworks.find(f => f.id === activeFramework)?.compliance}%
                </span>
              </div>
            </div>
            
            <h3 className="text-sm font-medium mb-2">Compliance Documentation</h3>
            <div className="space-y-2">
              {selectedFramework.documentation.map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded text-sm">
                  <span>{doc.name}</span>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Full Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Control Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedFramework.categories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                        {category.controls} controls
                      </span>
                    </div>
                    <span className="text-sm font-bold">{category.compliance}%</span>
                  </div>
                  
                  {/* Progress bar with segments */}
                  <div className="w-full h-3 bg-muted rounded-full flex overflow-hidden">
                    <div 
                      className="h-full bg-success" 
                      style={{ width: `${(category.compliant / category.controls) * 100}%` }}
                    ></div>
                    <div 
                      className="h-full bg-warning" 
                      style={{ width: `${(category.partial / category.controls) * 100}%` }}
                    ></div>
                    <div 
                      className="h-full bg-destructive" 
                      style={{ width: `${(category.nonCompliant / category.controls) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Compliance status icons */}
                  <div className="flex text-xs mt-1.5 text-muted-foreground">
                    <div className="flex items-center mr-4">
                      <Check className="h-3 w-3 text-success mr-1" />
                      {category.compliant} Compliant
                    </div>
                    <div className="flex items-center mr-4">
                      <AlertTriangle className="h-3 w-3 text-warning mr-1" />
                      {category.partial} Partial
                    </div>
                    <div className="flex items-center">
                      <XCircle className="h-3 w-3 text-destructive mr-1" />
                      {category.nonCompliant} Non-Compliant
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <PieChart className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-2xl font-bold">
                    {selectedFramework.categories.reduce((sum, cat) => sum + cat.compliant, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Compliant Controls</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-warning" />
                  <div className="text-2xl font-bold">
                    {selectedFramework.categories.reduce((sum, cat) => sum + cat.partial, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Partially Compliant</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <XCircle className="h-5 w-5 mx-auto mb-1 text-destructive" />
                  <div className="text-2xl font-bold">
                    {selectedFramework.categories.reduce((sum, cat) => sum + cat.nonCompliant, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Non-Compliant</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Framework Mapping */}
      <Card>
        <CardHeader>
          <CardTitle>Cross-Framework Control Mapping</CardTitle>
          <CardDescription>
            See how controls map across different regulatory frameworks and standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border py-2 px-3 bg-muted/30 text-left">Control Objective</th>
                  <th className="border py-2 px-3 bg-muted/30 text-center">NIST CSF</th>
                  <th className="border py-2 px-3 bg-muted/30 text-center">ISO 27001</th>
                  <th className="border py-2 px-3 bg-muted/30 text-center">NIST 800-53</th>
                  <th className="border py-2 px-3 bg-muted/30 text-center">GDPR</th>
                  <th className="border py-2 px-3 bg-muted/30 text-center">HIPAA</th>
                  <th className="border py-2 px-3 bg-muted/30 text-center">PCI DSS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border py-2 px-3">Access Control</td>
                  <td className="border py-2 px-3 text-center">PR.AC-1,2,3,4</td>
                  <td className="border py-2 px-3 text-center">A.9</td>
                  <td className="border py-2 px-3 text-center">AC-1,2,3,4,5</td>
                  <td className="border py-2 px-3 text-center">Art. 32</td>
                  <td className="border py-2 px-3 text-center">§164.312(a)</td>
                  <td className="border py-2 px-3 text-center">Req. 7, 8</td>
                </tr>
                <tr>
                  <td className="border py-2 px-3">Risk Assessment</td>
                  <td className="border py-2 px-3 text-center">ID.RA-1,2,3</td>
                  <td className="border py-2 px-3 text-center">A.8</td>
                  <td className="border py-2 px-3 text-center">RA-1,2,3</td>
                  <td className="border py-2 px-3 text-center">Art. 35</td>
                  <td className="border py-2 px-3 text-center">§164.308(a)(1)</td>
                  <td className="border py-2 px-3 text-center">Req. 12.2</td>
                </tr>
                <tr>
                  <td className="border py-2 px-3">Data Protection</td>
                  <td className="border py-2 px-3 text-center">PR.DS-1,2</td>
                  <td className="border py-2 px-3 text-center">A.10, A.18</td>
                  <td className="border py-2 px-3 text-center">SC-8, SC-28</td>
                  <td className="border py-2 px-3 text-center">Art. 5, 24, 25</td>
                  <td className="border py-2 px-3 text-center">§164.312(a)(2)(iv)</td>
                  <td className="border py-2 px-3 text-center">Req. 3, 4</td>
                </tr>
                <tr>
                  <td className="border py-2 px-3">Incident Response</td>
                  <td className="border py-2 px-3 text-center">RS.CO-1,2,3</td>
                  <td className="border py-2 px-3 text-center">A.16</td>
                  <td className="border py-2 px-3 text-center">IR-1,2,3,4</td>
                  <td className="border py-2 px-3 text-center">Art. 33, 34</td>
                  <td className="border py-2 px-3 text-center">§164.308(a)(6)</td>
                  <td className="border py-2 px-3 text-center">Req. 12.10</td>
                </tr>
                <tr>
                  <td className="border py-2 px-3">Asset Management</td>
                  <td className="border py-2 px-3 text-center">ID.AM-1,2,3</td>
                  <td className="border py-2 px-3 text-center">A.8</td>
                  <td className="border py-2 px-3 text-center">CM-8</td>
                  <td className="border py-2 px-3 text-center">Art. 30</td>
                  <td className="border py-2 px-3 text-center">§164.310(d)</td>
                  <td className="border py-2 px-3 text-center">Req. 9, 12.3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;