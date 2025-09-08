import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Recommendations from '../components/assessment/Recommendations';
import { generateRecommendationsPdf } from '../utils/generatePdf';
import { supabase } from '../lib/supabase';

const SupplyChainRecommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real recommendations based on assessment results
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        
        // Get the latest supply chain assessment results
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessment_submissions')
          .select('*')
          .eq('assessment_type', 'supply_chain')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (assessmentError) {
          throw new Error(`Failed to fetch assessment data: ${assessmentError.message}`);
        }

        // Generate recommendations based on assessment results
        const generatedRecommendations = await generateSupplyChainRecommendations(assessmentData);
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
  const generateSupplyChainRecommendations = async (assessmentData: any) => {
    // Analyze assessment results to determine which recommendations are most relevant
    const scores = assessmentData.responses || {};
    const recommendations = [];

    // Critical recommendations based on low scores
    if (scores.supplierRiskTiering < 3) {
      recommendations.push({
        id: "sc1",
        title: "Implement Supplier Risk Tiering System",
        description: "Develop a formal risk-based tiering system for suppliers to prioritize assessment and monitoring activities based on criticality and access to sensitive data or systems.",
        priority: "critical",
        category: "Supplier Risk Management",
        effort: "moderate",
        timeframe: "short-term",
        impact: "A structured supplier tiering system enables efficient allocation of resources to the most critical supplier relationships and helps focus security requirements proportional to risk.",
        steps: [
          "Define criteria for supplier categorization (e.g., access to sensitive data, operational importance, ease of replacement)",
          "Develop a scoring methodology to determine supplier tier assignment",
          "Classify all existing suppliers according to the new system",
          "Document differentiated security requirements for each tier",
          "Implement tier-specific assessment and monitoring processes"
        ],
        references: [
          {
            title: "NIST SP 800-161r1 - Supply Chain Risk Management Practices",
            url: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final"
          },
          {
            title: "ISO 28001:2007 Security management systems for the supply chain",
            url: "https://www.iso.org/standard/45654.html"
          }
        ]
      });
    }

    if (scores.incidentResponse < 3) {
      recommendations.push({
        id: "sc2",
        title: "Establish Supply Chain Incident Response Procedures",
        description: "Develop specific incident response procedures for supply chain security incidents, including third-party breaches, compromised software components, and hardware tampering.",
        priority: "high",
        category: "Incident Response",
        effort: "significant",
        timeframe: "short-term",
        impact: "Dedicated supply chain incident procedures reduce response time and improve coordination during incidents that involve suppliers or third parties.",
        steps: [
          "Identify supply chain incident scenarios specific to your organization",
          "Define roles and responsibilities for supply chain incident response",
          "Establish communication protocols with key suppliers",
          "Create playbooks for common supply chain incident types",
          "Conduct tabletop exercises to test procedures",
          "Document recovery and continuity procedures for critical supplier disruptions"
        ],
        references: [
          {
            title: "NIST SP 800-161r1 - Appendix C: Supply Chain Threat Scenarios",
            url: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final"
          },
          {
            title: "CISA Cyber Supply Chain Risk Management",
            url: "https://www.cisa.gov/cyber-supply-chain-risk-management"
          }
        ]
      });
    }

    if (scores.softwareComponentAnalysis < 3) {
      recommendations.push({
        id: "sc3",
        title: "Implement Software Component Analysis",
        description: "Deploy automated tools to inventory and analyze software dependencies, libraries, and components used in applications to identify potential security vulnerabilities in the software supply chain.",
        priority: "high",
        category: "Vulnerability Management",
        effort: "moderate",
        timeframe: "short-term",
        impact: "Software component analysis enables early identification of vulnerable dependencies and reduces the risk of supply chain compromises through third-party code.",
        steps: [
          "Select and implement a software composition analysis (SCA) tool",
          "Integrate SCA into development and build pipelines",
          "Generate a software bill of materials (SBOM) for all applications",
          "Establish a process to review and remediate identified vulnerabilities",
          "Document acceptable risk thresholds for different component types",
          "Implement continuous monitoring for newly discovered vulnerabilities"
        ],
        references: [
          {
            title: "NIST SP 800-218 - Secure Software Development Framework",
            url: "https://csrc.nist.gov/publications/detail/sp/800-218/final"
          },
          {
            title: "NTIA Software Bill of Materials",
            url: "https://www.ntia.gov/sbom"
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
      'Supply Chain Risk Management Recommendations',
      recommendations,
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      'supply-chain-recommendations.pdf'
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
        title="Supply Chain Risk Management Recommendations"
        subtitle="Based on NIST SP 800-161 Supply Chain Risk Management Practices"
        assessmentType="supplychain"
        recommendations={recommendations}
        onBack={() => navigate('/supply-chain-results')}
        onExport={handleExport}
      />
    </div>
  );
};

export default SupplyChainRecommendations;