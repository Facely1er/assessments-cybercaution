import { 
  User, 
  Framework, 
  Control, 
  Risk, 
  RiskCategory, 
  RiskLikelihood, 
  RiskImpact, 
  RiskSeverity, 
  RiskStatus, 
  RiskTreatment, 
  RiskAssessment, 
  Asset,
  DashboardMetrics,
  Document,
  Evidence,
  Requirement,
  Roadmap,
  ActionItem,
  StakeholderPersona
} from '../types';

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Information Security Policy',
    description: 'Corporate information security policy and guidelines',
    type: 'Policy',
    status: 'Active',
    version: '1.0',
    owner: 'user-1',
    createdAt: '2025-01-15',
    updatedAt: '2025-02-01',
    tags: ['policy', 'security', 'governance'],
    relatedControls: ['control-1', 'control-2'],
    url: 'https://example.com/docs/security-policy.pdf'
  },
  {
    id: 'doc-2',
    title: 'Incident Response Plan',
    description: 'Procedures for handling security incidents',
    type: 'Procedure',
    status: 'Active',
    version: '2.1',
    owner: 'user-2',
    createdAt: '2025-01-20',
    updatedAt: '2025-02-15',
    tags: ['incident-response', 'security', 'procedures'],
    relatedControls: ['control-1'],
    url: 'https://example.com/docs/incident-response.pdf'
  }
];

// Mock Evidence
export const mockEvidences: Evidence[] = [
  {
    id: 'evidence-1',
    title: 'Annual Security Training Records',
    description: 'Employee completion records for security awareness training',
    type: 'Training Record',
    status: 'Valid',
    collectionDate: '2025-01-10',
    validUntil: '2026-01-10',
    collector: 'user-1',
    requirements: ['req-1'],
    url: 'https://example.com/evidence/training-records-2025.pdf'
  },
  {
    id: 'evidence-2',
    title: 'Vulnerability Scan Results',
    description: 'Monthly vulnerability scan results from security tools',
    type: 'Scan Results',
    status: 'Valid',
    collectionDate: '2025-02-01',
    validUntil: '2025-03-01',
    collector: 'user-2',
    requirements: ['req-2'],
    url: 'https://example.com/evidence/vuln-scan-feb2025.pdf'
  }
];

// Mock Requirements
export const mockRequirements: Requirement[] = [
  {
    id: 'req-1',
    title: 'Security Awareness Training',
    description: 'All employees must complete annual security awareness training',
    status: 'Active',
    priority: 'High',
    dueDate: '2025-12-31',
    owner: 'user-1',
    controlId: 'control-1',
    evidenceRequired: true
  },
  {
    id: 'req-2',
    title: 'Monthly Vulnerability Scans',
    description: 'Conduct monthly vulnerability scans of all systems',
    status: 'Active',
    priority: 'High',
    dueDate: '2025-12-31',
    owner: 'user-2',
    controlId: 'control-2',
    evidenceRequired: true
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'risk_manager',
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'auditor',
  },
  {
    id: 'user-4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'viewer',
  },
];

// Mock Frameworks and Controls
const mockFrameworks: Framework[] = [
  {
    id: 'framework-1',
    name: 'NIST Cybersecurity Framework',
    version: '1.1',
    description: 'Framework for improving critical infrastructure cybersecurity',
    controls: [],
  },
  {
    id: 'framework-2',
    name: 'ISO 27001',
    version: '2022',
    description: 'Information security management system standard',
    controls: [],
  },
  {
    id: 'framework-3',
    name: 'NIST SP 800-53',
    version: 'Rev. 5',
    description: 'Security and Privacy Controls for Information Systems and Organizations',
    controls: [],
  },
];

// Mock Controls
const mockControls: Control[] = [
  {
    id: 'control-1',
    code: 'ID.AM-1',
    name: 'Physical devices inventory',
    description: 'Physical devices and systems within the organization are inventoried',
    category: 'Identify',
    frameworkId: 'framework-1',
  },
  {
    id: 'control-2',
    code: 'ID.AM-2',
    name: 'Software platforms inventory',
    description: 'Software platforms and applications within the organization are inventoried',
    category: 'Identify',
    frameworkId: 'framework-1',
  },
  {
    id: 'control-3',
    code: 'A.8.1',
    name: 'Asset Management',
    description: 'Assets shall be identified, and appropriate protection responsibilities shall be defined',
    category: 'Asset Management',
    frameworkId: 'framework-2',
  },
];

// Assign controls to frameworks
mockFrameworks[0].controls = mockControls.filter(c => c.frameworkId === 'framework-1');
mockFrameworks[1].controls = mockControls.filter(c => c.frameworkId === 'framework-2');

// Mock Risk Treatments
const mockTreatments: RiskTreatment[] = [
  {
    id: 'treatment-1',
    riskId: 'risk-1',
    description: 'Implement multi-factor authentication for all admin accounts',
    type: 'Mitigate',
    status: 'Completed',
    owner: 'user-2',
    startDate: '2025-01-15',
    dueDate: '2025-02-15',
    completedDate: '2025-02-10',
    effectiveness: 80,
  },
  {
    id: 'treatment-2',
    riskId: 'risk-2',
    description: 'Purchase cyber insurance policy',
    type: 'Transfer',
    status: 'In Progress',
    owner: 'user-1',
    startDate: '2025-02-01',
    dueDate: '2025-03-15',
  },
];

// Mock Risk Assessments
const mockAssessments: RiskAssessment[] = [
  {
    id: 'assessment-1',
    riskId: 'risk-1',
    assessor: 'user-2',
    date: '2025-01-10',
    notes: 'Initial assessment based on current security posture',
    newLikelihood: RiskLikelihood.High,
    newImpact: RiskImpact.High,
    newScore: 16,
  },
  {
    id: 'assessment-2',
    riskId: 'risk-1',
    assessor: 'user-2',
    date: '2025-02-20',
    notes: 'Post-treatment assessment after implementing MFA',
    previousLikelihood: RiskLikelihood.High,
    previousImpact: RiskImpact.High,
    newLikelihood: RiskLikelihood.Low,
    newImpact: RiskImpact.High,
    previousScore: 16,
    newScore: 8,
  },
];

// Mock Risks
export const mockRisks: Risk[] = [
  {
    id: 'risk-1',
    title: 'Unauthorized Access to Critical Systems',
    description: 'Risk of unauthorized access to critical systems due to weak authentication mechanisms',
    category: RiskCategory.Technology,
    likelihood: RiskLikelihood.Low,
    impact: RiskImpact.High,
    severity: RiskSeverity.Medium,
    status: RiskStatus.Mitigated,
    owner: 'user-2',
    dateIdentified: '2025-01-05',
    dateUpdated: '2025-02-20',
    dueDate: '2025-03-15',
    affectedAssets: ['asset-1', 'asset-2'],
    relatedControls: ['control-1'],
    treatments: [mockTreatments[0]],
    assessments: [mockAssessments[0], mockAssessments[1]],
    inherentRiskScore: 16,
    residualRiskScore: 8,
  },
  {
    id: 'risk-2',
    title: 'Data Breach Due to Insecure API',
    description: 'Risk of data breach due to insecurely implemented APIs exposing sensitive customer data',
    category: RiskCategory.Technology,
    likelihood: RiskLikelihood.Medium,
    impact: RiskImpact.VeryHigh,
    severity: RiskSeverity.High,
    status: RiskStatus.InTreatment,
    owner: 'user-1',
    dateIdentified: '2025-01-15',
    dateUpdated: '2025-02-01',
    dueDate: '2025-03-30',
    affectedAssets: ['asset-3'],
    relatedControls: ['control-2'],
    treatments: [mockTreatments[1]],
    assessments: [],
    inherentRiskScore: 15,
    residualRiskScore: 15,
  },
  {
    id: 'risk-3',
    title: 'Regulatory Non-Compliance',
    description: 'Risk of non-compliance with data protection regulations leading to fines and reputation damage',
    category: RiskCategory.Compliance,
    likelihood: RiskLikelihood.Medium,
    impact: RiskImpact.High,
    severity: RiskSeverity.High,
    status: RiskStatus.New,
    owner: 'user-1',
    dateIdentified: '2025-02-10',
    dateUpdated: '2025-02-10',
    dueDate: '2025-04-15',
    affectedAssets: [],
    relatedControls: [],
    treatments: [],
    assessments: [],
    inherentRiskScore: 12,
    residualRiskScore: 12,
  },
  {
    id: 'risk-4',
    title: 'Business Disruption Due to DDoS Attack',
    description: 'Risk of business disruption due to distributed denial of service attacks on public-facing services',
    category: RiskCategory.Operational,
    likelihood: RiskLikelihood.Medium,
    impact: RiskImpact.High,
    severity: RiskSeverity.High,
    status: RiskStatus.New,
    owner: 'user-2',
    dateIdentified: '2025-02-15',
    dateUpdated: '2025-02-15',
    affectedAssets: ['asset-4'],
    relatedControls: [],
    treatments: [],
    assessments: [],
    inherentRiskScore: 12,
    residualRiskScore: 12,
  },
  {
    id: 'risk-5',
    title: 'Intellectual Property Theft',
    description: 'Risk of intellectual property theft through insider threats or targeted attacks',
    category: RiskCategory.Strategic,
    likelihood: RiskLikelihood.Low,
    impact: RiskImpact.VeryHigh,
    severity: RiskSeverity.Medium,
    status: RiskStatus.Assessed,
    owner: 'user-1',
    dateIdentified: '2025-01-20',
    dateUpdated: '2025-02-05',
    dueDate: '2025-03-20',
    affectedAssets: ['asset-5'],
    relatedControls: [],
    treatments: [],
    assessments: [],
    inherentRiskScore: 10,
    residualRiskScore: 10,
  },
  {
    id: 'risk-6',
    title: 'Critical Supplier Dependency',
    description: 'High dependency on single cloud infrastructure provider creates business continuity risk',
    category: RiskCategory.SupplyChain,
    likelihood: RiskLikelihood.Medium,
    impact: RiskImpact.High,
    severity: RiskSeverity.High,
    status: RiskStatus.InTreatment,
    owner: 'user-1',
    dateIdentified: '2025-02-15',
    dateUpdated: '2025-03-01',
    dueDate: '2025-06-30',
    affectedAssets: ['asset-1', 'asset-2'],
    relatedControls: ['scrm-1'],
    treatments: [],
    assessments: [],
    inherentRiskScore: 16,
    residualRiskScore: 16
  }
];

// Mock Assets
const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Customer Database Server',
    description: 'Primary database server containing customer information',
    type: 'Database Server',
    owner: 'user-1',
    value: 'Critical',
    location: 'Primary Data Center',
    tags: ['database', 'customer-data', 'pii'],
  },
  {
    id: 'asset-2',
    name: 'Admin Portal',
    description: 'Web application for administrative functions',
    type: 'Web Application',
    owner: 'user-2',
    value: 'High',
    tags: ['web', 'admin', 'internal'],
  },
  {
    id: 'asset-3',
    name: 'Customer API Service',
    description: 'API service exposing customer data to authorized applications',
    type: 'API Service',
    owner: 'user-2',
    value: 'High',
    tags: ['api', 'customer-data'],
  },
  {
    id: 'asset-4',
    name: 'Public Website',
    description: 'Company public-facing website',
    type: 'Web Application',
    owner: 'user-1',
    value: 'Medium',
    tags: ['web', 'public'],
  },
  {
    id: 'asset-5',
    name: 'Product Source Code Repository',
    description: 'Source code repository for the main product',
    type: 'Source Code',
    owner: 'user-1',
    value: 'Critical',
    tags: ['source-code', 'intellectual-property'],
  },
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalRisks: mockRisks.length,
  risksByCategory: {
    [RiskCategory.Strategic]: mockRisks.filter(r => r.category === RiskCategory.Strategic).length,
    [RiskCategory.Operational]: mockRisks.filter(r => r.category === RiskCategory.Operational).length,
    [RiskCategory.Financial]: mockRisks.filter(r => r.category === RiskCategory.Financial).length,
    [RiskCategory.Compliance]: mockRisks.filter(r => r.category === RiskCategory.Compliance).length,
    [RiskCategory.Reputational]: mockRisks.filter(r => r.category === RiskCategory.Reputational).length,
    [RiskCategory.Technology]: mockRisks.filter(r => r.category === RiskCategory.Technology).length,
    [RiskCategory.Legal]: mockRisks.filter(r => r.category === RiskCategory.Legal).length,
    [RiskCategory.Environmental]: mockRisks.filter(r => r.category === RiskCategory.Environmental).length,
    [RiskCategory.People]: mockRisks.filter(r => r.category === RiskCategory.People).length,
    [RiskCategory.Other]: mockRisks.filter(r => r.category === RiskCategory.Other).length,
  },
  risksBySeverity: {
    [RiskSeverity.VeryLow]: mockRisks.filter(r => r.severity === RiskSeverity.VeryLow).length,
    [RiskSeverity.Low]: mockRisks.filter(r => r.severity === RiskSeverity.Low).length,
    [RiskSeverity.Medium]: mockRisks.filter(r => r.severity === RiskSeverity.Medium).length,
    [RiskSeverity.High]: mockRisks.filter(r => r.severity === RiskSeverity.High).length,
    [RiskSeverity.VeryHigh]: mockRisks.filter(r => r.severity === RiskSeverity.VeryHigh).length,
    [RiskSeverity.Critical]: mockRisks.filter(r => r.severity === RiskSeverity.Critical).length,
  },
  risksByStatus: {
    [RiskStatus.New]: mockRisks.filter(r => r.status === RiskStatus.New).length,
    [RiskStatus.Assessed]: mockRisks.filter(r => r.status === RiskStatus.Assessed).length,
    [RiskStatus.InTreatment]: mockRisks.filter(r => r.status === RiskStatus.InTreatment).length,
    [RiskStatus.Mitigated]: mockRisks.filter(r => r.status === RiskStatus.Mitigated).length,
    [RiskStatus.Accepted]: mockRisks.filter(r => r.status === RiskStatus.Accepted).length,
    [RiskStatus.Transferred]: mockRisks.filter(r => r.status === RiskStatus.Transferred).length,
    [RiskStatus.Closed]: mockRisks.filter(r => r.status === RiskStatus.Closed).length,
  },
  openRisks: mockRisks.filter(r => 
    r.status !== RiskStatus.Closed && 
    r.status !== RiskStatus.Mitigated
  ).length,
  mitigatedRisks: mockRisks.filter(r => r.status === RiskStatus.Mitigated).length,
  acceptedRisks: mockRisks.filter(r => r.status === RiskStatus.Accepted).length,
  highSeverityRisks: mockRisks.filter(r => 
    r.severity === RiskSeverity.High || 
    r.severity === RiskSeverity.VeryHigh || 
    r.severity === RiskSeverity.Critical
  ).length,
  averageRiskScore: 
    mockRisks.reduce((sum, risk) => sum + risk.inherentRiskScore, 0) / mockRisks.length,
  risksOverTime: [
    { date: '2025-01-01', count: 1 },
    { date: '2025-01-15', count: 3 },
    { date: '2025-02-01', count: 4 },
    { date: '2025-02-15', count: 5 },
  ],
  topRisks: mockRisks
    .sort((a, b) => b.inherentRiskScore - a.inherentRiskScore)
    .slice(0, 3),
  recentAssessments: mockAssessments.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ),
};

// Mock Roadmaps
const mockRoadmaps: Roadmap[] = [
  {
    id: 'roadmap-1',
    title: 'Security Program Enhancement',
    description: 'Strategic roadmap for enhancing our security program',
    status: 'Active',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    owner: 'user-1',
    stakeholders: [
      { role: 'CISO', responsibilities: ['Program Oversight', 'Strategic Direction'] },
      { role: 'Security Manager', responsibilities: ['Implementation', 'Team Management'] }
    ],
    objectives: [
      {
        id: 'obj-1',
        title: 'Implement Zero Trust Architecture',
        description: 'Transition to a zero trust security model',
        status: 'In Progress',
        priority: 'High',
        dueDate: '2025-06-30',
        actionItems: ['action-1', 'action-2']
      }
    ],
    dependencies: [],
    progress: 25
  }
];

// Mock Action Items
const mockActionItems: ActionItem[] = [
  {
    id: 'action-1',
    title: 'Identity Provider Integration',
    description: 'Integrate enterprise identity provider for centralized authentication',
    status: 'In Progress',
    priority: 'High',
    category: 'Technical',
    assignee: 'user-2',
    dueDate: '2025-03-31',
    progress: 30,
    dependencies: []
  },
  {
    id: 'action-2',
    title: 'Network Segmentation',
    description: 'Implement network micro-segmentation',
    status: 'Planned',
    priority: 'High',
    category: 'Technical',
    assignee: 'user-2',
    dueDate: '2025-04-30',
    progress: 0,
    dependencies: ['action-1']
  }
];

// Mock Stakeholder Personas
const mockStakeholderPersonas: StakeholderPersona[] = [
  {
    id: 'persona-1',
    role: 'CISO',
    description: 'Chief Information Security Officer',
    responsibilities: ['Security Strategy', 'Risk Management', 'Program Oversight'],
    interests: ['Risk Metrics', 'Compliance Status', 'Security Incidents'],
    preferences: {
      reportingFrequency: 'Weekly',
      metricsPriority: ['Risk Trends', 'Compliance Status', 'Incident Statistics']
    }
  },
  {
    id: 'persona-2',
    role: 'Security Manager',
    description: 'Security Operations Manager',
    responsibilities: ['Team Management', 'Operations Oversight', 'Incident Response'],
    interests: ['Security Operations', 'Team Performance', 'Incident Details'],
    preferences: {
      reportingFrequency: 'Daily',
      metricsPriority: ['Operation Metrics', 'Team Metrics', 'Incident Response Time']
    }
  }
];

// Mock Supply Chain Controls aligned with NIST SCRM
const mockSupplyChainControls: SupplyChainControl[] = [
  {
    id: 'scrm-1',
    code: 'SCRM-ID.1',
    name: 'Supply Chain Risk Management Strategy',
    description: 'Establish and implement a comprehensive supply chain risk management strategy',
    category: 'Identify',
    subCategory: 'Risk Management Strategy',
    framework: ['NIST SCRM', 'ISO 28001'],
    applicability: 'Required',
    assessment: {
      method: ['Documentation Review', 'Interview'],
      frequency: 'Annual',
      evidence: ['Strategy Document', 'Risk Assessment Reports']
    },
    references: {
      nist: ['SP 800-161r1', 'CSF ID.SC-1'],
      iso: ['ISO 28001:2007'],
      other: {
        'CMMC': ['SC.1.175']
      }
    }
  },
  {
    id: 'scrm-2',
    code: 'SCRM-PR.1',
    name: 'Supplier Assessment Process',
    description: 'Implement a formal process for assessing and monitoring suppliers',
    category: 'Protect',
    subCategory: 'Supply Chain Protection',
    framework: ['NIST SCRM', 'ISO 28001'],
    applicability: 'Required',
    assessment: {
      method: ['Process Review', 'Documentation Review'],
      frequency: 'Continuous',
      evidence: ['Assessment Reports', 'Monitoring Logs']
    },
    references: {
      nist: ['SP 800-161r1', 'CSF PR.SC-3'],
      iso: ['ISO 28001:2007'],
      other: {
        'CMMC': ['SC.2.179']
      }
    }
  }
];

// Mock Suppliers
const mockSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'TechSecure Solutions',
    category: 'Critical',
    services: ['Cloud Infrastructure', 'Security Services'],
    riskLevel: RiskSeverity.High,
    onboardingDate: '2024-01-15',
    lastAssessmentDate: '2025-02-01',
    contacts: [
      {
        name: 'Sarah Johnson',
        role: 'Security Officer',
        email: 'sarah@techsecure.example.com',
        phone: '+1-555-0123'
      }
    ],
    documents: ['doc-1', 'doc-2'],
    status: 'Active',
    compliance: {
      certifications: ['ISO 27001', 'SOC 2 Type II'],
      expirations: {
        'ISO 27001': '2026-01-15',
        'SOC 2': '2025-12-31'
      }
    }
  }
];

// Mock Supply Chain Assessments
const mockSupplyChainAssessments: SupplyChainAssessment[] = [
  {
    id: 'sca-1',
    supplierId: 'sup-1',
    assessmentDate: '2025-02-01',
    assessor: 'user-2',
    framework: 'NIST SCRM',
    status: 'Completed',
    score: 85,
    findings: [
      {
        id: 'finding-1',
        category: 'Access Control',
        description: 'Insufficient access controls for third-party systems',
        severity: RiskSeverity.High,
        recommendation: 'Implement MFA and role-based access control'
      }
    ],
    controls: [
      {
        id: 'ctrl-1',
        controlId: 'scrm-1',
        status: 'Partially Compliant',
        evidence: ['evidence-1'],
        notes: 'Strategy exists but needs updating'
      }
    ],
    nextAssessmentDate: '2026-02-01',
    documents: ['doc-1'],
    mitigationPlan: {
      actions: ['Implement MFA', 'Review access policies'],
      timeline: '90 days',
      owner: 'user-1'
    }
  }
];