export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'risk_manager' | 'auditor' | 'viewer';
  avatar?: string;
};

export type Framework = {
  id: string;
  name: string;
  version: string;
  description: string;
  controls: Control[];
};

export type Control = {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  frameworkId: string;
};

export enum RiskSeverity {
  VeryLow = 'Very Low',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  VeryHigh = 'Very High',
  Critical = 'Critical',
}

export enum RiskLikelihood {
  VeryLow = 'Very Low',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  VeryHigh = 'Very High',
}

export enum RiskImpact {
  VeryLow = 'Very Low',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  VeryHigh = 'Very High',
}

export enum RiskStatus {
  New = 'New',
  Assessed = 'Assessed',
  InTreatment = 'In Treatment',
  Mitigated = 'Mitigated',
  Accepted = 'Accepted',
  Transferred = 'Transferred',
  Closed = 'Closed',
}

export enum RiskCategory {
  Strategic = 'Strategic',
  Operational = 'Operational',
  Financial = 'Financial',
  Compliance = 'Compliance',
  Reputational = 'Reputational',
  Technology = 'Technology',
  Legal = 'Legal',
  Environmental = 'Environmental',
  People = 'People',
  SupplyChain = 'Supply Chain',
  ThirdParty = 'Third Party',
  Other = 'Other',
}

export type Risk = {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  likelihood: RiskLikelihood;
  impact: RiskImpact;
  severity: RiskSeverity;
  status: RiskStatus;
  owner: string; // User ID
  dateIdentified: string;
  dateUpdated: string;
  dueDate?: string;
  affectedAssets: string[];
  relatedControls: string[]; // Control IDs
  treatments: RiskTreatment[];
  assessments: RiskAssessment[];
  inherentRiskScore: number;
  residualRiskScore: number;
};

export type RiskTreatment = {
  id: string;
  riskId: string;
  description: string;
  type: 'Mitigate' | 'Accept' | 'Transfer' | 'Avoid';
  status: 'Planned' | 'In Progress' | 'Completed' | 'Canceled';
  owner: string; // User ID
  startDate?: string;
  dueDate?: string;
  completedDate?: string;
  notes?: string;
  attachments?: string[];
  effectiveness?: number; // 0-100
};

export type RiskAssessment = {
  id: string;
  riskId: string;
  assessor: string; // User ID
  date: string;
  notes: string;
  previousLikelihood?: RiskLikelihood;
  previousImpact?: RiskImpact;
  newLikelihood: RiskLikelihood;
  newImpact: RiskImpact;
  previousScore?: number;
  newScore: number;
};

export type Asset = {
  id: string;
  name: string;
  description: string;
  type: AssetType;
  owner: string;
  vendor: string;
  importance: ImportanceLevel;
  lifecycleStatus: LifecycleStatus;
  createdAt: string;
  updatedAt: string;
};

export type AssetType = 'hardware' | 'software' | 'service' | 'infrastructure' | 'data';
export type ImportanceLevel = 'critical' | 'high' | 'medium' | 'low';
export type LifecycleStatus = 'planning' | 'active' | 'deprecated' | 'retired';

type Dependency = {
  id: string;
  sourceId: string; // Asset ID
  targetId: string; // Asset ID
  type: string;
  strength: 'critical' | 'high' | 'medium' | 'low';
  description?: string;
};

type MitigationAction = {
  id: string;
  riskId: string;
  name: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
};

export type DashboardMetrics = {
  totalRisks: number;
  risksByCategory: Record<RiskCategory, number>;
  risksBySeverity: Record<RiskSeverity, number>;
  risksByStatus: Record<RiskStatus, number>;
  openRisks: number;
  mitigatedRisks: number;
  acceptedRisks: number;
  highSeverityRisks: number;
  averageRiskScore: number;
  risksOverTime: { date: string; count: number }[];
  topRisks: Risk[];
  recentAssessments: RiskAssessment[];
};

type ReportType = 
  | 'RiskRegister'
  | 'RiskAssessment'
  | 'Compliance'
  | 'ExecutiveSummary'
  | 'AuditReport'
  | 'Custom';

type Report = {
  id: string;
  name: string;
  type: ReportType;
  createdBy: string; // User ID
  createdAt: string;
  parameters?: Record<string, any>;
  status: 'Generating' | 'Ready' | 'Failed';
  url?: string;
};

export type Document = {
  id: string;
  title: string;
  description: string;
  type: 'Policy' | 'Procedure' | 'Evidence' | 'Report' | 'Template';
  category?: string;
  tags: string[];
  status: 'Draft' | 'In Review' | 'Approved' | 'Archived';
  version: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  url: string;
  relatedControls: string[];
  relatedRisks?: string[];
  metadata?: Record<string, any>;
};

export type Evidence = {
  id: string;
  title: string;
  description: string;
  type: 'Document' | 'Screenshot' | 'Log' | 'Report' | 'Certification' | 'Other';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Expired';
  collectedBy: string;
  collectedAt: string;
  validUntil?: string;
  url: string;
  controls?: string[];
  requirements?: string[];
  metadata?: Record<string, any>;
};

export type Requirement = {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'Privacy' | 'Security' | 'Supply Chain' | 'Ransomware' | 'CUI' | 'Other';
  status: 'Not Started' | 'In Progress' | 'Compliant' | 'Non Compliant' | 'Not Applicable';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate?: string;
  owner: string;
  assignedTo: string;
  evidences: string[];
  controls: string[];
  dependencies?: string[];
  notes: string;
};

export type ActionItem = {
  id: string;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Canceled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Technical' | 'Process' | 'People' | 'Documentation';
  assignedTo: string;
  startDate?: string;
  dueDate: string;
  completedDate?: string;
  dependencies: string[];
  blockers: string[];
  progress: number;
  notes: string;
  relatedControls: string[];
  relatedRisks: string[];
};

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Planning' | 'Active' | 'Completed' | 'On Hold';
  owner: string;
  objectives: {
    id: string;
    title: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    priority: string;
    dueDate: string;
    actionItems: string[];
  }[];
  stakeholders: {
    role: string;
    responsibilities: string[];
  }[];
  dependencies: string[];
  progress: number;
};

export type StakeholderPersona = {
  id: string;
  role: 'CISO' | 'Security Manager';
  description: string;
  responsibilities: string[];
  interests: string[];
  preferences: {
    reportingFrequency: string;
    metricsPriority: string[];
  };
};

type SupplyChainAssessment = {
  id: string;
  supplierId: string;
  assessmentDate: string;
  assessor: string;
  framework: 'NIST SCRM' | 'ISO 28001' | 'CMMC';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Expired';
  score: number;
  findings: {
    id: string;
    category: string;
    description: string;
    severity: RiskSeverity;
    recommendation: string;
  }[];
  controls: {
    id: string;
    controlId: string;
    status: 'Compliant' | 'Partially Compliant' | 'Non Compliant' | 'Not Applicable';
    evidence: string[];
    notes: string;
  }[];
  nextAssessmentDate: string;
  documents: string[];
  mitigationPlan?: {
    actions: string[];
    timeline: string;
    owner: string;
  };
};

type Supplier = {
  id: string;
  name: string;
  category: 'Critical' | 'Strategic' | 'Standard';
  services: string[];
  riskLevel: RiskSeverity;
  onboardingDate: string;
  lastAssessmentDate?: string;
  contacts: {
    name: string;
    role: string;
    email: string;
    phone?: string;
  }[];
  documents: string[];
  status: 'Active' | 'Pending Review' | 'Suspended' | 'Terminated';
  incidents?: {
    id: string;
    date: string;
    description: string;
    impact: string;
    resolution: string;
  }[];
  compliance: {
    certifications: string[];
    expirations: Record<string, string>;
  };
};

type SupplyChainControl = {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'Identify' | 'Protect' | 'Detect' | 'Respond' | 'Recover';
  subCategory: string;
  framework: string[];
  applicability: 'Required' | 'Recommended' | 'Optional';
  assessment: {
    method: string[];
    frequency: string;
    evidence: string[];
  };
  references: {
    nist: string[];
    iso: string[];
    other: Record<string, string[]>;
  };
};