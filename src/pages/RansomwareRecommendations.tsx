import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Recommendations from '../components/assessment/Recommendations';
import { generateRecommendationsPdf } from '../utils/generatePdf';
import { supabase } from '../lib/supabase';

const RansomwareRecommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real recommendations based on assessment results
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        
        // Get the latest ransomware assessment results
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessment_submissions')
          .select('*')
          .eq('assessment_type', 'ransomware')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (assessmentError) {
          throw new Error(`Failed to fetch assessment data: ${assessmentError.message}`);
        }

        // Generate recommendations based on assessment results
        const generatedRecommendations = await generateRansomwareRecommendations(assessmentData);
        setRecommendations(generatedRecommendations);
      } catch (err) {
        setError('Failed to load recommendations. Please try again.');
        console.error('Recommendations fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Generate recommendations based on assessment data
  const generateRansomwareRecommendations = async (assessmentData: any) => {
    // Analyze assessment results to determine which recommendations are most relevant
    const scores = assessmentData.responses || {};
    const recommendations = [];

    // Critical recommendations based on low scores
    if (scores.mfaImplementation < 3) {
      recommendations.push({
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
      });
    }

    if (scores.backupStrategy < 3) {
      recommendations.push({
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
      });
    }

    if (scores.incidentResponse < 3) {
      recommendations.push({
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
      });
    }

    // Add more recommendations based on assessment scores...
    // This would be expanded based on the actual assessment structure

    return recommendations;
  };

  const handleExport = () => {
    generateRecommendationsPdf(
      'Ransomware Protection Recommendations',
      recommendations,
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      'ransomware-recommendations.pdf'
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Recommendations</h3>
          <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Recommendations
        title="Ransomware Protection Recommendations"
        subtitle="Based on NIST IR 8374 Ransomware Risk Management framework"
        assessmentType="ransomware"
        recommendations={recommendations}
        onBack={() => navigate('/ransomware-results')}
        onExport={handleExport}
      />
    </div>
  );
};

export default RansomwareRecommendations;