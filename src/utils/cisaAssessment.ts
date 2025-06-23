// CISA Assessment Framework Definitions
// Based on CISA Cross-Sector Cybersecurity Performance Goals (CPGs)

export type AssessmentCategory = 'Prevention' | 'Detection' | 'Response' | 'Recovery';
export type AssessmentPriority = 'critical' | 'high' | 'medium' | 'low';

export interface AssessmentQuestion {
  id: string;
  question: string;
  guidance: string;
  category: AssessmentCategory;
  controlReference: string;
  priority: AssessmentPriority;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  scoringMethod: (answers: Record<string, string>, questions: AssessmentQuestion[]) => number;
  complianceLevels: {
    low: number;
    medium: number;
    high: number;
  };
}

// CISA Assessment Utility
export const CISA = {
  frameworks: {
    CROSS_SECTOR_CPG: {
      id: 'CROSS_SECTOR_CPG',
      name: 'CISA Cross-Sector Cybersecurity Performance Goals',
      description: 'Voluntary baseline cybersecurity performance goals that are applicable across all critical infrastructure sectors',
      scoringMethod: (answers: Record<string, string>, questions: AssessmentQuestion[]) => {
        // Weighted scoring based on priority
        const weights = {
          critical: 4,
          high: 3,
          medium: 2,
          low: 1
        };

        let totalPoints = 0;
        let earnedPoints = 0;

        questions.forEach(question => {
          const weight = weights[question.priority];
          totalPoints += weight * 2; // Maximum 2 points per question

          const answer = answers[question.id];
          if (answer === 'yes') {
            earnedPoints += weight * 2;
          } else if (answer === 'partial') {
            earnedPoints += weight * 1;
          }
        });

        return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
      },
      complianceLevels: {
        low: 40,
        medium: 70,
        high: 85
      }
    },
    RANSOMWARE_READINESS: {
      id: 'RANSOMWARE_READINESS',
      name: 'CISA Ransomware Readiness Assessment',
      description: 'Assessment designed to evaluate an organization\'s preparedness to defend against and recover from ransomware attacks',
      scoringMethod: (answers: Record<string, string>, questions: AssessmentQuestion[]) => {
        // Standard scoring for RRA
        let totalQuestions = 0;
        let completedQuestions = 0;

        questions.forEach(question => {
          totalQuestions += 1;
          const answer = answers[question.id];
          if (answer === 'yes') {
            completedQuestions += 1;
          } else if (answer === 'partial') {
            completedQuestions += 0.5;
          }
        });

        return totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
      },
      complianceLevels: {
        low: 50,
        medium: 75,
        high: 90
      }
    },
    ZERO_TRUST_MATURITY: {
      id: 'ZERO_TRUST_MATURITY',
      name: 'CISA Zero Trust Maturity Model',
      description: 'Model to help organizations implement zero trust architecture based on CISA guidance',
      scoringMethod: (answers: Record<string, string>, questions: AssessmentQuestion[]) => {
        // Balanced scoring across pillars for Zero Trust
        const pillars = {
          'Identity': { total: 0, earned: 0 },
          'Device': { total: 0, earned: 0 },
          'Network': { total: 0, earned: 0 },
          'Application': { total: 0, earned: 0 },
          'Data': { total: 0, earned: 0 }
        };

        // Categorize questions by pillar using tags
        questions.forEach(question => {
          const pillarTag = question.controlReference.split('.')[0];
          const pillar = Object.keys(pillars).find(p => pillarTag.includes(p)) || 'Identity';
          
          pillars[pillar].total += 2; // Max 2 points per question
          
          const answer = answers[question.id];
          if (answer === 'yes') {
            pillars[pillar].earned += 2;
          } else if (answer === 'partial') {
            pillars[pillar].earned += 1;
          }
        });
        
        // Calculate overall score (average of pillar scores)
        let totalPoints = 0;
        let earnedPoints = 0;
        
        Object.values(pillars).forEach(pillar => {
          totalPoints += pillar.total;
          earnedPoints += pillar.earned;
        });

        return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
      },
      complianceLevels: {
        low: 45,
        medium: 70,
        high: 90
      }
    }
  },
  
  // Calculate score using the framework's scoring method
  calculateScore: (
    answers: Record<string, string>, 
    framework: any,
    questions: AssessmentQuestion[]
  ): number => {
    return framework.scoringMethod(answers, questions);
  },
  
  // Determine compliance level based on score
  getComplianceLevel: (score: number): 'low' | 'medium' | 'high' => {
    if (score >= 85) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
  },
  
  // Get CISA priority-based recommendations
  getPriorityRecommendations: (
    answers: Record<string, string>,
    questions: AssessmentQuestion[]
  ): AssessmentQuestion[] => {
    const missingControls = questions.filter(q => 
      answers[q.id] !== 'yes' && 
      (answers[q.id] === 'no' || answers[q.id] === 'partial' || !answers[q.id])
    );
    
    // Sort by priority (critical first, then high, etc.)
    const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
    return missingControls.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }
};

// CISA Assessment Framework
export const CISA_ASSESSMENT_FRAMEWORK = {
  RANSOMWARE_READINESS: {
    categories: ['Prevention', 'Detection', 'Response', 'Recovery'],
    scoring: 'CISA_RRA_Standard',
    compliance: 'Cross_Sector_CPG'
  },
  ZERO_TRUST: {
    pillars: ['Identity', 'Device', 'Network', 'Application', 'Data'],
    maturity_levels: ['Traditional', 'Advanced', 'Optimal']
  },
  NETWORK_SEGMENTATION: {
    categories: ['Planning', 'Implementation', 'Verification', 'Maintenance'],
    compliance: 'Cross_Sector_CPG'
  },
  BACKUP_READINESS: {
    categories: ['Backup Strategy', 'Implementation', 'Testing', 'Recovery'],
    compliance: 'Cross_Sector_CPG'
  },
  INCIDENT_RESPONSE: {
    categories: ['Planning', 'Detection', 'Analysis', 'Containment', 'Eradication', 'Recovery', 'Post-Incident'],
    compliance: 'Federal_Incident_Response_Playbook'
  },
  VULNERABILITY_MANAGEMENT: {
    categories: ['Asset Management', 'Discovery', 'Prioritization', 'Remediation', 'Verification'],
    compliance: 'Federal_Vulnerability_Response_Playbook'
  }
};