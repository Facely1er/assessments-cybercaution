import React, { useState, useEffect } from 'react';

// Type definitions
interface OrganizationInfo {
  name: string;
  size: string;
  primaryContact: string;
  contactEmail: string;
}

interface PolicyStats {
  ransomwareProtection: string;
  nistControls: string;
  implementation: string;
}

interface PolicyInfo {
  id: string;
  number: number;
  title: string;
  description: string;
  stats: PolicyStats;
}

interface IndustryInfo {
  focus: string;
  requirements: string;
}

const Big5PolicyGenerator: React.FC = () => {
  // State management
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedPolicies, setSelectedPolicies] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>({
    name: '',
    size: '',
    primaryContact: '',
    contactEmail: ''
  });
  const [selectedCompliance, setSelectedCompliance] = useState<string[]>([]);

  // Policy data
  const policies: PolicyInfo[] = [
    {
      id: 'info-security',
      number: 1,
      title: 'Information Security Policy',
      description: 'Universal governance foundation establishing security roles, responsibilities, and overall framework management.',
      stats: {
        ransomwareProtection: '90%',
        nistControls: '15',
        implementation: '2-4 weeks'
      }
    },
    {
      id: 'incident-response',
      number: 2,
      title: 'Incident Response Policy',
      description: 'Critical for containment and recovery, specifically designed with ransomware attack scenarios and response procedures.',
      stats: {
        ransomwareProtection: '85%',
        nistControls: '12',
        implementation: '3-6 weeks'
      }
    },
    {
      id: 'access-control',
      number: 3,
      title: 'Access Control Policy',
      description: 'Prevents initial access and lateral movement through comprehensive identity and access management controls.',
      stats: {
        ransomwareProtection: '80%',
        nistControls: '8',
        implementation: '4-8 weeks'
      }
    },
    {
      id: 'contingency-planning',
      number: 4,
      title: 'Contingency Planning Policy',
      description: 'Ensures business continuity with comprehensive backup strategies and disaster recovery procedures.',
      stats: {
        ransomwareProtection: '75%',
        nistControls: '6',
        implementation: '6-10 weeks'
      }
    },
    {
      id: 'security-training',
      number: 5,
      title: 'Security Awareness & Training',
      description: 'Human firewall development through comprehensive security awareness and anti-phishing training programs.',
      stats: {
        ransomwareProtection: '70%',
        nistControls: '4',
        implementation: '2-4 weeks'
      }
    }
  ];

  // Industry data
  const industries = [
    { id: 'healthcare', icon: '🏥', name: 'Healthcare' },
    { id: 'financial', icon: '🏦', name: 'Financial' },
    { id: 'education', icon: '🎓', name: 'Education' },
    { id: 'manufacturing', icon: '🏭', name: 'Manufacturing' },
    { id: 'retail', icon: '🛒', name: 'Retail' },
    { id: 'government', icon: '🏛️', name: 'Government' },
    { id: 'general', icon: '🏢', name: 'General Business' }
  ];

  // Industry-specific configurations
  const industrySpecific: Record<string, IndustryInfo> = {
    healthcare: {
      focus: 'Patient Health Information (PHI) protection and HIPAA compliance',
      requirements: 'Healthcare organizations must implement additional safeguards for electronic protected health information (ePHI).'
    },
    financial: {
      focus: 'Financial data protection and regulatory compliance (SOX, PCI-DSS)',
      requirements: 'Financial institutions must maintain strict controls over customer financial information and transaction data.'
    },
    education: {
      focus: 'Student data protection and FERPA compliance',
      requirements: 'Educational institutions must protect student educational records and personally identifiable information.'
    },
    government: {
      focus: 'Classified information protection and FISMA compliance',
      requirements: 'Government agencies must implement security controls appropriate for information classification levels.'
    },
    general: {
      focus: 'General business data protection and industry best practices',
      requirements: 'Organizations must implement appropriate security controls based on business risk assessment.'
    }
  };

  // Event handlers
  const handleOrganizationChange = (field: keyof OrganizationInfo, value: string) => {
    setOrganizationInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    updateProgress(2);
  };

  const handlePolicyToggle = (policyId: string) => {
    const newSelectedPolicies = new Set(selectedPolicies);
    if (newSelectedPolicies.has(policyId)) {
      newSelectedPolicies.delete(policyId);
    } else {
      newSelectedPolicies.add(policyId);
    }
    setSelectedPolicies(newSelectedPolicies);
    
    if (newSelectedPolicies.size > 0) {
      updateProgress(3);
    }
  };

  const handleComplianceChange = (compliance: string, checked: boolean) => {
    if (checked) {
      setSelectedCompliance(prev => [...prev, compliance]);
    } else {
      setSelectedCompliance(prev => prev.filter(item => item !== compliance));
    }
  };

  const updateProgress = (step: number) => {
    setCurrentStep(Math.max(currentStep, step));
  };

  // Generate policy preview
  const generatePolicyPreview = (): string => {
    const orgName = organizationInfo.name || '[Organization Name]';
    const contact = organizationInfo.primaryContact || '[Primary Contact]';
    const email = organizationInfo.contactEmail || '[Contact Email]';
    const currentIndustry = industrySpecific[selectedIndustry] || industrySpecific['general'];
    const complianceText = selectedCompliance.length > 0 ? `This policy aligns with ${selectedCompliance.join(', ')} requirements.` : '';

    const policyNames: Record<string, string> = {
      'info-security': 'Information Security Policy (Foundation)',
      'incident-response': 'Incident Response Policy',
      'access-control': 'Access Control Policy',
      'contingency-planning': 'Contingency Planning Policy',
      'security-training': 'Security Awareness and Training Policy'
    };

    const selectedPolicyList = Array.from(selectedPolicies).map(policy => 
      `<li>${policyNames[policy]}</li>`
    ).join('');

    return `
      <h2>${orgName} Information Security Policy</h2>
      
      <h3>1. Purpose and Scope</h3>
      <p>This Information Security Policy establishes the framework for protecting ${orgName}'s information assets and ensuring compliance with applicable regulations. The policy applies to all employees, contractors, and third parties with access to organizational systems and data.</p>
      
      <p><strong>Industry Focus:</strong> ${currentIndustry.focus}</p>
      <p>${complianceText}</p>
      
      <h3>2. Roles and Responsibilities</h3>
      <p><strong>Primary Security Contact:</strong> ${contact} (${email})</p>
      <ul>
        <li>Executive leadership provides strategic oversight and resource allocation</li>
        <li>IT management implements technical controls and system security</li>
        <li>All personnel are responsible for following security procedures</li>
        <li>Security team monitors compliance and responds to incidents</li>
      </ul>
      
      <h3>3. Policy Framework</h3>
      <p>This policy framework includes the following components:</p>
      <ul>
        ${selectedPolicyList}
      </ul>
      
      <h3>4. Implementation Requirements</h3>
      <p>${currentIndustry.requirements}</p>
      
      <h3>5. Compliance and Review</h3>
      <p>This policy will be reviewed annually and updated as needed to address emerging threats and regulatory changes. Compliance monitoring will be conducted quarterly with formal assessments performed annually.</p>
      
      <h3>6. Enforcement</h3>
      <p>Violations of this policy may result in disciplinary action up to and including termination of employment or contract. All security incidents will be investigated and documented according to the incident response procedures.</p>
      
      <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-style: italic; color: #64748b;">
        Generated by CyberCaution Toolkit | ${new Date().toLocaleDateString()} | Document Version 1.0
      </p>
    `;
  };

  const handleDownload = (format: string) => {
    if (selectedPolicies.size === 0) {
      alert('Please select at least one policy to download.');
      return;
    }

    const formatNames: Record<string, string> = {
      'word': 'Microsoft Word (.docx)',
      'pdf': 'PDF Document',
      'html': 'HTML Web Format',
      'complete': 'Complete Package (All Formats + Guides)'
    };

    const formatDetails: Record<string, string> = {
      'word': 'Editable policy templates ready for customization',
      'pdf': 'Print-ready documents for distribution and training',
      'html': 'Web-ready format for intranet or online policy libraries',
      'complete': 'Complete toolkit including all formats, implementation guides, checklists, and NIST mapping documents'
    };

    // Here you would integrate with your Supabase backend to generate and store the policies
    console.log('Download requested:', {
      format,
      organizationInfo,
      selectedIndustry,
      selectedPolicies: Array.from(selectedPolicies),
      selectedCompliance
    });

    alert(`Download initiated: ${formatNames[format]}\n\nYour customized policy package includes:\n\n• ${selectedPolicies.size} selected Big 5 policies\n• Industry-specific customizations\n• ${formatDetails[format]}\n• Implementation timelines and checklists`);
  };

  // Check if preview should be shown
  useEffect(() => {
    if (selectedPolicies.size > 0) {
      updateProgress(4);
    }
  }, [selectedPolicies, organizationInfo, selectedIndustry, selectedCompliance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-2">🛡️ Big 5 Policy Template Generator</h1>
          <p className="text-xl opacity-90">Create customized cybersecurity policies for your organization</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-5 my-8">
          {[1, 2, 3, 4].map((step, index) => (
            <React.Fragment key={step}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step < currentStep ? 'bg-green-500 text-white' :
                step === currentStep ? 'bg-indigo-600 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {step}
              </div>
              {index < 3 && (
                <div className={`h-0.5 w-12 transition-all duration-300 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Organization Configuration */}
        <div className="p-10 border-b-2 border-gray-100">
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
            <span>🏢</span>
            Step 1: Organization Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-bold text-gray-700 mb-2">Organization Name</label>
              <input
                type="text"
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                placeholder="Enter your organization name"
                value={organizationInfo.name}
                onChange={(e) => handleOrganizationChange('name', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-700 mb-2">Organization Size</label>
              <select
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                value={organizationInfo.size}
                onChange={(e) => handleOrganizationChange('size', e.target.value)}
              >
                <option value="">Select size</option>
                <option value="small">Small (1-50 employees)</option>
                <option value="medium">Medium (51-500 employees)</option>
                <option value="large">Large (501-5000 employees)</option>
                <option value="enterprise">Enterprise (5000+ employees)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-700 mb-2">Primary Contact</label>
              <input
                type="text"
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                placeholder="IT Manager, CISO, etc."
                value={organizationInfo.primaryContact}
                onChange={(e) => handleOrganizationChange('primaryContact', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                placeholder="contact@company.com"
                value={organizationInfo.contactEmail}
                onChange={(e) => handleOrganizationChange('contactEmail', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Industry Selection */}
        <div className="p-10 border-b-2 border-gray-100">
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
            <span>🏭</span>
            Step 2: Industry & Compliance Requirements
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className={`bg-white border-2 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedIndustry === industry.id 
                    ? 'border-indigo-600 bg-blue-50 transform scale-105' 
                    : 'border-gray-300 hover:border-indigo-600'
                }`}
                onClick={() => handleIndustrySelect(industry.id)}
              >
                <div className="text-3xl mb-2">{industry.icon}</div>
                <div className="font-bold text-gray-800 text-sm">{industry.name}</div>
              </div>
            ))}
          </div>

          <div>
            <label className="font-bold text-gray-700 mb-4 block">Compliance Requirements (Select all that apply):</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'nist', label: 'NIST Cybersecurity Framework' },
                { id: 'soc2', label: 'SOC 2 Type II' },
                { id: 'iso27001', label: 'ISO 27001' },
                { id: 'hipaa', label: 'HIPAA' },
                { id: 'pci', label: 'PCI DSS' },
                { id: 'ferpa', label: 'FERPA' }
              ].map((compliance) => (
                <div key={compliance.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={compliance.id}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    onChange={(e) => handleComplianceChange(compliance.id.toUpperCase(), e.target.checked)}
                  />
                  <label htmlFor={compliance.id} className="text-gray-700">{compliance.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policy Selection */}
        <div className="p-10 border-b-2 border-gray-100">
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
            <span>📋</span>
            Step 3: Select Big 5 Policies to Generate
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 relative ${
                  selectedPolicies.has(policy.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-indigo-600 hover:bg-gray-50'
                }`}
                onClick={() => handlePolicyToggle(policy.id)}
              >
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  selectedPolicies.has(policy.id) ? 'bg-green-500' : 'bg-indigo-600'
                }`}>
                  {policy.number}
                </div>
                <div className="text-xl font-bold text-gray-800 mb-2 pr-10">{policy.title}</div>
                <div className="text-gray-600 text-sm mb-4 leading-relaxed">{policy.description}</div>
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-600">{policy.stats.ransomwareProtection}</div>
                    <div className="text-gray-500">Ransomware Protection</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{policy.stats.nistControls}</div>
                    <div className="text-gray-500">NIST Controls</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{policy.stats.implementation}</div>
                    <div className="text-gray-500">Implementation</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        {selectedPolicies.size > 0 && (
          <div className="p-10 bg-gray-50 border-b-2 border-gray-100">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
              <span>👁️</span>
              Step 4: Preview Your Customized Policy
            </div>
            <div className="bg-white rounded-xl p-8 border-2 border-gray-300 max-h-96 overflow-y-auto">
              <div 
                className="policy-preview font-serif leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: generatePolicyPreview() }}
              />
            </div>
          </div>
        )}

        {/* Download Section */}
        <div className="p-10 text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">📥 Download Your Complete Policy Package</h2>
          <p className="text-gray-600 mb-8">Get your customized policies in multiple formats, ready for immediate implementation</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { format: 'word', icon: '📄', title: 'Microsoft Word', desc: 'Editable .docx format for easy customization', button: 'Download .docx' },
              { format: 'pdf', icon: '📑', title: 'PDF Document', desc: 'Print-ready format for distribution', button: 'Download PDF' },
              { format: 'html', icon: '🌐', title: 'Web Format', desc: 'HTML format for intranet publishing', button: 'Download HTML' },
              { format: 'complete', icon: '📦', title: 'Complete Package', desc: 'All formats + implementation guides', button: 'Download All' }
            ].map((download) => (
              <div
                key={download.format}
                className="bg-white rounded-xl p-6 border-2 border-gray-300 cursor-pointer transition-all duration-300 hover:border-indigo-600 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleDownload(download.format)}
              >
                <div className="text-5xl mb-4 text-indigo-600">{download.icon}</div>
                <div className="font-bold text-gray-800 mb-2">{download.title}</div>
                <div className="text-gray-600 text-sm mb-4">{download.desc}</div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                  {download.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Big5PolicyGenerator;