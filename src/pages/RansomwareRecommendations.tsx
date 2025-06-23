import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recommendations from '../components/assessment/Recommendations';
import { generateRecommendationsPdf } from '../utils/generatePdf';

const RansomwareRecommendations = () => {
  const navigate = useNavigate();
  
  const mockRecommendations = [
    {
      id: "r1",
      title: "Implement Multi-Factor Authentication (MFA) for All Remote Access",
      description: "Deploy MFA for all remote network access, VPN connections, and privileged account access to significantly reduce the risk of unauthorized access that could lead to ransomware attacks.",
      priority: "critical",
      category: "Access Control",
      effort: "moderate",
      timeframe: "immediate",
      impact: "Implementing MFA can reduce the risk of successful account compromise by more than 99% compared to password-only authentication.",
      steps: [
        "Inventory all remote access pathways including VPN, RDP, and cloud services",
        "Select an MFA solution compatible with your environment (hardware tokens, authenticator apps, etc.)",
        "Implement MFA for privileged accounts first",
        "Extend MFA to all remote access and all user accounts",
        "Enforce MFA policy through technical controls and monitor for bypass attempts"
      ],
      references: [
        {
          title: "NIST SP 800-63B Digital Identity Guidelines",
          url: "https://pages.nist.gov/800-63-3/sp800-63b.html"
        },
        {
          title: "CISA MFA Guidance",
          url: "https://www.cisa.gov/mfa"
        }
      ]
    },
    {
      id: "r2",
      title: "Implement Offline, Encrypted Backup Strategy",
      description: "Establish and maintain offline, encrypted backups of critical data to ensure recoverability in case of a ransomware attack. These backups should be physically disconnected from the network when not actively being updated.",
      priority: "critical",
      category: "Data Protection",
      effort: "significant",
      timeframe: "immediate",
      impact: "Offline backups provide the most reliable recovery option in case of a successful ransomware attack, potentially eliminating the need to pay ransom.",
      steps: [
        "Identify and classify critical data assets that require backup",
        "Implement the 3-2-1 backup strategy (3 copies, 2 different media, 1 offline)",
        "Configure encryption for all backup data at rest",
        "Establish regular backup schedule with verification procedures",
        "Develop and test restoration procedures",
        "Secure backup credentials with separate authentication and access control"
      ],
      references: [
        {
          title: "NIST SP 1800-11 Data Integrity",
          url: "https://www.nccoe.nist.gov/projects/building-blocks/data-integrity"
        },
        {
          title: "CISA Ransomware Guide",
          url: "https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf"
        }
      ]
    },
    {
      id: "r3",
      title: "Develop Ransomware-Specific Incident Response Plan",
      description: "Create a dedicated incident response plan specifically for ransomware incidents that outlines detailed containment, eradication, and recovery procedures.",
      priority: "high",
      category: "Incident Response",
      effort: "moderate",
      timeframe: "short-term",
      impact: "A well-developed response plan can significantly reduce recovery time and minimize the impact of ransomware incidents.",
      steps: [
        "Assemble a cross-functional incident response team with clear roles and responsibilities",
        "Develop specific playbooks for different ransomware scenarios",
        "Create decision trees for containment actions based on the spread of encryption",
        "Define internal and external communication procedures including legal reporting requirements",
        "Establish relationships with law enforcement and incident response vendors before incidents occur",
        "Conduct regular tabletop exercises to test the plan"
      ],
      references: [
        {
          title: "NIST SP 800-61r2 Computer Security Incident Handling Guide",
          url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf"
        },
        {
          title: "CISA Ransomware Response Checklist",
          url: "https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf"
        }
      ]
    },
    {
      id: "r4",
      title: "Implement Network Segmentation",
      description: "Segment networks to contain the spread of ransomware and limit an attacker's lateral movement capabilities.",
      priority: "high",
      category: "Network",
      effort: "significant",
      timeframe: "medium-term",
      impact: "Effective network segmentation can contain ransomware to limited portions of the network, preventing enterprise-wide encryption events.",
      steps: [
        "Map data flows between systems to understand connectivity requirements",
        "Define security zones based on function, data sensitivity, and compliance requirements",
        "Implement technical controls (VLANs, firewalls, ACLs) between segments",
        "Configure logging and monitoring at segment boundaries",
        "Test segmentation effectiveness through security validation exercises"
      ],
      references: [
        {
          title: "NIST SP 800-207 Zero Trust Architecture",
          url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf"
        },
        {
          title: "NSA Network Segmentation Guidance",
          url: "https://media.defense.gov/2019/Sep/09/2002180319/-1/-1/0/Segment%20Networks%20and%20Deploy%20Application%20Aware%20Defenses.pdf"
        }
      ]
    },
    {
      id: "r5",
      title: "Implement Email Filtering and User Training",
      description: "Enhance email security through advanced filtering technology and regular user phishing awareness training.",
      priority: "medium",
      category: "Email Security",
      effort: "moderate",
      timeframe: "short-term",
      impact: "Since email remains the primary ransomware delivery vector, improved filtering and user awareness can significantly reduce successful attacks.",
      steps: [
        "Deploy email security gateway with advanced threat protection features",
        "Configure SPF, DKIM, and DMARC for enhanced email authentication",
        "Block executable attachments and macro-enabled documents by default",
        "Conduct regular phishing awareness training for all employees",
        "Implement simulated phishing exercises to test effectiveness",
        "Create easy-to-use mechanisms for users to report suspicious emails"
      ],
      references: [
        {
          title: "CISA Email Security Recommendations",
          url: "https://www.cisa.gov/sites/default/files/publications/Capacity_Enhancement_Guide-Securing_Web_Browsers_and_Email.pdf"
        },
        {
          title: "NIST SP 800-177r1 Trustworthy Email",
          url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-177r1.pdf"
        }
      ]
    },
    {
      id: "r6",
      title: "Conduct Regular Ransomware Tabletop Exercises",
      description: "Implement a program of regular tabletop exercises specifically focused on ransomware scenarios to test and improve response capabilities.",
      priority: "high",
      category: "Incident Response",
      effort: "moderate",
      timeframe: "short-term",
      impact: "Regular exercises improve organizational readiness, identify gaps in response capabilities, and build muscle memory for incident response.",
      steps: [
        "Develop realistic ransomware scenarios based on current threat intelligence",
        "Include representatives from IT, security, legal, communications, and executive leadership",
        "Create exercise materials including scenario injects and evaluation metrics",
        "Conduct exercises at least twice annually with different scenarios",
        "Document findings and lessons learned from each exercise",
        "Implement improvements based on exercise results"
      ],
      references: [
        {
          title: "NIST IR 8374 - Cybersecurity Framework Profile for Ransomware Risk Management",
          url: "https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8374.pdf"
        },
        {
          title: "CISA Tabletop Exercise Packages",
          url: "https://www.cisa.gov/cisa-tabletop-exercises-packages"
        }
      ]
    },
    {
      id: "r7",
      title: "Restrict Remote Desktop Protocol (RDP) Access",
      description: "Secure or disable Remote Desktop Protocol (RDP) access, which is a common entry point for ransomware attacks.",
      priority: "high",
      category: "Access Control",
      effort: "moderate",
      timeframe: "immediate",
      impact: "RDP is frequently exploited for initial access in ransomware attacks. Securing this vector can significantly reduce organizational risk.",
      steps: [
        "Inventory all systems with RDP enabled",
        "Disable RDP where not business-critical",
        "Place all systems requiring RDP behind a VPN or zero trust access solution",
        "Implement MFA for all RDP access",
        "Restrict RDP access to specific IP addresses where possible",
        "Enable RDP logging and monitor for brute force attempts"
      ],
      references: [
        {
          title: "CISA Alert (AA22-320A): Targeted Ransomware Attacks on Critical Infrastructure",
          url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-320a"
        },
        {
          title: "Microsoft Security Guidance for RDP",
          url: "https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/secure-the-remote-desktop-services-session"
        }
      ]
    },
    {
      id: "r8",
      title: "Document Ransomware Recovery Procedures",
      description: "Create detailed recovery documentation that can be accessed during a ransomware incident, including offline copies.",
      priority: "medium",
      category: "Documentation",
      effort: "minimal",
      timeframe: "short-term",
      impact: "Well-documented procedures reduce recovery time and ensure consistent handling of ransomware incidents.",
      steps: [
        "Document step-by-step recovery procedures for critical systems",
        "Include detailed backup restoration instructions",
        "Maintain offline copies of recovery documentation",
        "Include contact information for all relevant parties",
        "Regularly review and update documentation",
        "Train IT staff on recovery procedures"
      ],
      references: [
        {
          title: "NIST SP 1800-26: Data Integrity Recovery",
          url: "https://www.nccoe.nist.gov/projects/building-blocks/data-integrity/recovery"
        },
        {
          title: "NIST IR 8374 - Cybersecurity Framework Profile for Ransomware Risk Management",
          url: "https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8374.pdf"
        }
      ]
    }
  ];

  const handleExport = () => {
    generateRecommendationsPdf(
      'Ransomware Protection Recommendations',
      mockRecommendations as any,
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      'ransomware-recommendations.pdf'
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Recommendations
        title="Ransomware Protection Recommendations"
        subtitle="Based on NIST IR 8374 Ransomware Risk Management framework"
        assessmentType="ransomware"
        recommendations={mockRecommendations as any}
        onBack={() => navigate('/ransomware-results')}
        onExport={handleExport}
      />
    </div>
  );
};

export default RansomwareRecommendations;