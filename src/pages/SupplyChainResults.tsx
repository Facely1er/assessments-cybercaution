import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, FileText, Shield, Network } from 'lucide-react';

const SupplyChainResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve assessment results from navigation state or use fallback
  const assessmentResults = location.state?.assessmentResults || {
    overall_score: 62,
    section_scores: [
      { title: "Supplier Risk Management", percentage: 70, completed: true },
      { title: "Supply Chain Threat Management", percentage: 55, completed: true },
      { title: "Vulnerability Management", percentage: 60, completed: true },
      { title: "Information Sharing", percentage: 75, completed: true },
      { title: "Incident Response", percentage: 50, completed: true },
      { title: "Supplier Lifecycle Management", percentage: 65, completed: true }
    ],
    assessment_type: 'supply-chain',
    framework_name: "NIST SP 800-161 Supply Chain Risk Management",
    completed_at: new Date().toISOString()
  };

  const handleExport = () => {
    generateResultsPdf(
      'Supply Chain Risk Assessment Results',
      assessmentResults.overall_score,
      assessmentResults.section_scores,
      assessmentResults.completed_at ? 
        new Date(assessmentResults.completed_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : 
        new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
      'supply-chain-assessment-results.pdf'
    );
  };

  // Transform the data to match the expected format for AssessmentResults component
  const resultsData = {
    overallScore: assessmentResults.overall_score,
    sectionScores: assessmentResults.section_scores,
    assessmentType: 'supplychain' as 'ransomware',
    frameworkName: assessmentResults.framework_name,
    completedDate: assessmentResults.completed_at ? 
      new Date(assessmentResults.completed_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : 
      new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Supply Chain Risk Assessment Results</h1>
      
      <AssessmentResults 
        data={resultsData}
        onExport={handleExport}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Key Findings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Primary Risk Areas</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {assessmentResults.section_scores
                .filter((section: any) => section.percentage < 60)
                .map((section: any, index: number) => (
                  <li key={index}>{section.title} needs improvement ({section.percentage}% compliance)</li>
                ))}
              {assessmentResults.section_scores
                .filter((section: any) => section.percentage >= 60 && section.percentage < 70)
                .map((section: any, index: number) => (
                  <li key={index}>{section.title} requires enhancement ({section.percentage}% compliance)</li>
                ))}
            </ul>
          </div>
          
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {assessmentResults.section_scores
                .filter((section: any) => section.percentage >= 70)
                .map((section: any, index: number) => (
                  <li key={index}>{section.title} shows good implementation ({section.percentage}% compliance)</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Supply Chain Risk Playbook</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Generate a customized supply chain risk management playbook based on your assessment results and NIST guidance.
            </p>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Generate Playbook
            </Button>
          </CardContent>
        </Card>

        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Supplier Assessment Templates</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Download ready-to-use supplier assessment questionnaires and risk evaluation templates.
            </p>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Templates
            </Button>
          </CardContent>
        </Card>
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