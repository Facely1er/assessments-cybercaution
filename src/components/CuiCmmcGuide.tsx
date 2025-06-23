import React from 'react';
import { 
  Clock, 
  Eye, 
  Download, 
  BookOpen,
  Shield,
  Lock,
  FileText,
  CheckCircle,
  ChevronLeft,
  AlertCircle,
  Building,
  Key
} from 'lucide-react';

interface CMMCLevel {
  level: number;
  name: string;
  description: string;
  practices: number;
  processes: string;
  focus: string;
}

const cmmcLevels: CMMCLevel[] = [
  {
    level: 1,
    name: 'Foundational',
    description: 'Safeguard Federal Contract Information (FCI)',
    practices: 17,
    processes: 'Performed',
    focus: 'Basic cyber hygiene'
  },
  {
    level: 2,
    name: 'Advanced',
    description: 'Serve as transition to protect CUI',
    practices: 110,
    processes: 'Documented',
    focus: 'Intermediate cyber hygiene'
  },
  {
    level: 3,
    name: 'Expert',
    description: 'Protect CUI and reduce APT risk',
    practices: 130,
    processes: 'Managed',
    focus: 'Good cyber hygiene'
  }
];

interface CUICategory {
  category: string;
  description: string;
  examples: string[];
  controls: string[];
}

const cuiCategories: CUICategory[] = [
  {
    category: 'Critical Infrastructure',
    description: 'Information related to critical infrastructure sectors',
    examples: ['Power grid data', 'Water system diagrams', 'Transportation networks'],
    controls: ['Encryption at rest', 'Access restrictions', 'Audit logging']
  },
  {
    category: 'Defense Industrial Base',
    description: 'Information from defense contractors',
    examples: ['Technical specifications', 'Manufacturing processes', 'Supply chain data'],
    controls: ['NIST 800-171 compliance', 'Incident reporting', 'Flow down requirements']
  },
  {
    category: 'Law Enforcement',
    description: 'Sensitive law enforcement information',
    examples: ['Investigation data', 'Witness information', 'Tactical procedures'],
    controls: ['Need-to-know basis', 'Secure communications', 'Data retention policies']
  },
  {
    category: 'Privacy',
    description: 'Personally identifiable information',
    examples: ['SSNs', 'Medical records', 'Financial data'],
    controls: ['Data minimization', 'Consent management', 'Breach notification']
  }
];

interface NIST800171Family {
  id: string;
  name: string;
  requirements: number;
  keyControls: string[];
}

const nist800171Families: NIST800171Family[] = [
  {
    id: '3.1',
    name: 'Access Control',
    requirements: 22,
    keyControls: ['Limit system access', 'Control CUI flows', 'Separate duties', 'Least privilege']
  },
  {
    id: '3.2',
    name: 'Awareness and Training',
    requirements: 3,
    keyControls: ['Security awareness', 'Role-based training', 'Insider threat awareness']
  },
  {
    id: '3.3',
    name: 'Audit and Accountability',
    requirements: 9,
    keyControls: ['Audit events', 'Protect audit logs', 'Review logs', 'Correlate records']
  },
  {
    id: '3.4',
    name: 'Configuration Management',
    requirements: 9,
    keyControls: ['Baseline configurations', 'Change control', 'Security settings', 'Least functionality']
  },
  {
    id: '3.5',
    name: 'Identification and Authentication',
    requirements: 11,
    keyControls: ['Multi-factor authentication', 'Unique identifiers', 'Password policies']
  },
  {
    id: '3.6',
    name: 'Incident Response',
    requirements: 5,
    keyControls: ['Response plan', 'Incident tracking', 'Testing', 'Reporting']
  },
  {
    id: '3.7',
    name: 'Maintenance',
    requirements: 6,
    keyControls: ['Maintenance procedures', 'Remote maintenance', 'Maintenance personnel']
  },
  {
    id: '3.8',
    name: 'Media Protection',
    requirements: 9,
    keyControls: ['Media marking', 'Media access', 'Media sanitization', 'Media transport']
  },
  {
    id: '3.9',
    name: 'Personnel Security',
    requirements: 2,
    keyControls: ['Screen personnel', 'Termination procedures']
  },
  {
    id: '3.10',
    name: 'Physical Protection',
    requirements: 6,
    keyControls: ['Physical access', 'Monitor access', 'Visitor control', 'Device controls']
  },
  {
    id: '3.11',
    name: 'Risk Assessment',
    requirements: 3,
    keyControls: ['Risk assessments', 'Vulnerability scanning', 'Risk remediation']
  },
  {
    id: '3.12',
    name: 'Security Assessment',
    requirements: 4,
    keyControls: ['Security assessments', 'Plan of action', 'Continuous monitoring']
  },
  {
    id: '3.13',
    name: 'System and Communications Protection',
    requirements: 16,
    keyControls: ['Boundary protection', 'Encryption', 'Network segregation', 'DLP']
  },
  {
    id: '3.14',
    name: 'System and Information Integrity',
    requirements: 7,
    keyControls: ['Flaw remediation', 'Malware protection', 'System monitoring', 'Security alerts']
  }
];

const implementationSteps = [
  {
    phase: 'Scoping',
    activities: [
      'Identify CUI within your environment',
      'Determine system boundaries',
      'Document data flows',
      'Identify all storage locations'
    ]
  },
  {
    phase: 'Gap Assessment',
    activities: [
      'Review current security posture',
      'Map to NIST 800-171 requirements',
      'Identify missing controls',
      'Prioritize remediation efforts'
    ]
  },
  {
    phase: 'Implementation',
    activities: [
      'Deploy technical controls',
      'Update policies and procedures',
      'Implement monitoring solutions',
      'Configure security tools'
    ]
  },
  {
    phase: 'Documentation',
    activities: [
      'Create System Security Plan (SSP)',
      'Develop POA&M',
      'Document control implementations',
      'Maintain evidence'
    ]
  },
  {
    phase: 'Assessment',
    activities: [
      'Self-assessment',
      'Third-party assessment',
      'Address findings',
      'Continuous improvement'
    ]
  }
];

const CuiCmmcGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <a href="/resources/guides" className="text-gray-400 hover:text-gray-200 flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Guides
              </a>
              <span className="text-gray-600">/</span>
              <span className="text-gray-200">CUI & CMMC Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">CUI & CMMC Compliance Guide</h1>
            <p className="text-xl text-gray-300 mb-6">
              Handle Controlled Unclassified Information and achieve CMMC compliance
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full">Advanced</span>
              <span className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                70 minutes
              </span>
              <span className="flex items-center text-gray-400">
                <Eye className="h-4 w-4 mr-1" />
                1,654 views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-300 mb-4">
                  The Cybersecurity Maturity Model Certification (CMMC) is a framework designed to ensure 
                  defense contractors adequately protect Controlled Unclassified Information (CUI) that 
                  resides on their networks.
                </p>
                <p className="text-gray-300 mb-4">
                  This guide provides comprehensive information on understanding CUI, implementing NIST 800-171 
                  controls, and achieving CMMC certification.
                </p>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-semibold text-blue-500">Who Needs CMMC?</h3>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Defense Industrial Base (DIB) contractors</li>
                    <li>• Subcontractors handling CUI</li>
                    <li>• Organizations in the DoD supply chain</li>
                    <li>• Future: All federal contractors handling CUI</li>
                  </ul>
                </div>
              </section>

              {/* Understanding CUI */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">1. Understanding Controlled Unclassified Information</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                  <h3 className="text-lg font-semibold mb-3">What is CUI?</h3>
                  <p className="text-gray-300 mb-3">
                    CUI is information that requires safeguarding or dissemination controls pursuant to and 
                    consistent with applicable law, regulations, and government-wide policies but is not classified.
                  </p>
                  <div className="bg-gray-700 p-4 rounded">
                    <p className="text-sm text-gray-300">
                      <strong>Key Point:</strong> CUI must be marked, handled, stored, transmitted, and 
                      destroyed according to specific requirements.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {cuiCategories.map((category, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <h3 className="font-medium text-amber-500 mb-2">{category.category}</h3>
                      <p className="text-sm text-gray-300 mb-3">{category.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-200 mb-2">Examples:</h4>
                          <ul className="space-y-1">
                            {category.examples.map((example, idx) => (
                              <li key={idx} className="text-xs text-gray-400 flex items-start">
                                <span className="mr-2">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-200 mb-2">Key Controls:</h4>
                          <ul className="space-y-1">
                            {category.controls.map((control, idx) => (
                              <li key={idx} className="text-xs text-gray-400 flex items-start">
                                <span className="mr-2">•</span>
                                {control}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CMMC Levels */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">2. CMMC Model Overview</h2>
                <p className="text-gray-300 mb-6">
                  CMMC 2.0 streamlines cybersecurity compliance into three levels:
                </p>
                
                <div className="space-y-4">
                  {cmmcLevels.map((level) => (
                    <div key={level.level} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            L{level.level}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">Level {level.level}: {level.name}</h3>
                            <p className="text-sm text-gray-400">{level.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-700 p-3 rounded">
                          <p className="text-gray-400">Practices</p>
                          <p className="text-lg font-semibold">{level.practices}</p>
                        </div>
                        <div className="bg-gray-700 p-3 rounded">
                          <p className="text-gray-400">Processes</p>
                          <p className="text-lg font-semibold">{level.processes}</p>
                        </div>
                        <div className="bg-gray-700 p-3 rounded">
                          <p className="text-gray-400">Focus</p>
                          <p className="font-medium">{level.focus}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* NIST 800-171 Requirements */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">3. NIST 800-171 Requirements</h2>
                <p className="text-gray-300 mb-6">
                  CMMC Level 2 aligns with NIST SP 800-171, which contains 110 security requirements 
                  organized into 14 families:
                </p>
                
                <div className="grid gap-3">
                  {nist800171Families.map((family) => (
                    <div key={family.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          <span className="text-orange-500">{family.id}</span> {family.name}
                        </h3>
                        <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                          {family.requirements} requirements
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {family.keyControls.map((control, idx) => (
                          <span key={idx} className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Implementation Process */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">4. Implementation Process</h2>
                
                <div className="space-y-6">
                  {implementationSteps.map((step, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold mb-3">{step.phase}</h3>
                          <ul className="space-y-2">
                            {step.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Documents */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">5. Key Documentation</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-orange-500 mr-2" />
                      <h3 className="font-medium">System Security Plan (SSP)</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      Comprehensive documentation of security controls implementation
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• System boundaries and components</li>
                      <li>• Control implementation details</li>
                      <li>• Roles and responsibilities</li>
                      <li>• Interconnections and data flows</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-orange-500 mr-2" />
                      <h3 className="font-medium">Plan of Action & Milestones (POA&M)</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      Document for tracking remediation of security deficiencies
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Identified weaknesses</li>
                      <li>• Remediation plans</li>
                      <li>• Resource requirements</li>
                      <li>• Milestone dates</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Common Challenges */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">6. Common Implementation Challenges</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-amber-500/30">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="text-lg font-semibold text-amber-500">Key Challenges</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Scoping Complexity</h4>
                      <p className="text-sm text-gray-300">Determining exact boundaries of CUI environment</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Technical Debt</h4>
                      <p className="text-sm text-gray-300">Legacy systems that cannot meet requirements</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Supply Chain Requirements</h4>
                      <p className="text-sm text-gray-300">Flowing down requirements to subcontractors</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Documentation Burden</h4>
                      <p className="text-sm text-gray-300">Maintaining comprehensive security documentation</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Download Section */}
              <section className="mb-12">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Download Resources</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-md flex items-center justify-between">
                      <span>NIST 800-171 Assessment Guide</span>
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md flex items-center justify-between">
                      <span>SSP Template</span>
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md flex items-center justify-between">
                      <span>POA&M Template</span>
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Table of Contents */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-gray-400 hover:text-white">Introduction</a>
                  <a href="#cui" className="block text-gray-400 hover:text-white">1. Understanding CUI</a>
                  <a href="#cmmc" className="block text-gray-400 hover:text-white">2. CMMC Model</a>
                  <a href="#nist" className="block text-gray-400 hover:text-white">3. NIST 800-171</a>
                  <a href="#implementation" className="block text-gray-400 hover:text-white">4. Implementation</a>
                  <a href="#documentation" className="block text-gray-400 hover:text-white">5. Documentation</a>
                  <a href="#challenges" className="block text-gray-400 hover:text-white">6. Challenges</a>
                </nav>
              </div>

              {/* Related Guides */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <a href="/resources/guides/compliance" className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium mb-1">Compliance Guide</h4>
                    <p className="text-sm text-gray-400">General compliance management</p>
                  </a>
                  <a href="/resources/guides/security-controls" className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium mb-1">Security Controls Guide</h4>
                    <p className="text-sm text-gray-400">Control implementation</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuiCmmcGuide;