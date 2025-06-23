import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';

const SupplyChainResults = () => {
  const navigate = useNavigate();
  
  // In a real application, this would be passed through the location state
  const mockResults = {
    overallScore: 62,
    sectionScores: [
      { title: "Supplier Risk Management", percentage: 70, completed: true },
      { title: "Supply Chain Threat Management", percentage: 55, completed: true },
      { title: "Vulnerability Management", percentage: 60, completed: true },
      { title: "Information Sharing", percentage: 75, completed: true },
      { title: "Incident Response", percentage: 50, completed: true },
      { title: "Supplier Lifecycle Management", percentage: 65, completed: true }
    ],
    assessmentType: 'supplychain',
    frameworkName: "NIST SP 800-161 Supply Chain Risk Management",
    completedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const handleExport = () => {
    generateResultsPdf(
      'Supply Chain Risk Assessment Results',
      mockResults.overallScore,
      mockResults.sectionScores,
      mockResults.completedDate,
      'supply-chain-assessment-results.pdf'
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Supply Chain Risk Assessment Results</h1>
      
      <AssessmentResults 
        data={mockResults as any}
        onExport={handleExport}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Key Findings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Primary Risk Areas</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Incident response capabilities for supply chain events (50% compliance)</li>
              <li>Supply chain threat management processes (55% compliance)</li>
              <li>Vulnerability management processes need enhancement (60% compliance)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Good information sharing practices with suppliers (75% compliance)</li>
              <li>Solid supplier risk management foundation (70% compliance)</li>
              <li>Adequate supplier lifecycle management processes (65% compliance)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/supply-chain-recommendations')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          View Detailed Recommendations
        </button>
      </div>
    </div>
  );
};

export default SupplyChainResults;