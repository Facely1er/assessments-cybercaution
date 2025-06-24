import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, FileText, Shield } from 'lucide-react';

const RansomwareResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve assessment results from navigation state or use fallback
  const assessmentResults = location.state?.assessmentResults || {
    overall_score: 0,
    section_scores: [],
    assessment_type: 'ransomware',
    framework_name: "NIST Ransomware Risk Management (IR 8374)",
    completed_at: new Date().toISOString()
  };

  const handleExport = () => {
    generateResultsPdf(
      'Ransomware Readiness Assessment Results',
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
      'ransomware-assessment-results.pdf'
    );
  };

  const handleDownloadPlaybook = () => {
    // In a real application, this would generate and download a customized playbook
    alert('Generating and downloading your customized NIST-aligned ransomware playbook');
  };

  // Transform the data to match the expected format for AssessmentResults component
  const resultsData = {
    overallScore: assessmentResults.overall_score,
    sectionScores: assessmentResults.section_scores,
    assessmentType: assessmentResults.assessment_type as 'ransomware',
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
      <h1 className="text-3xl font-bold mb-6 text-foreground">Ransomware Readiness Assessment Results</h1>
      
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
              {assessmentResults.section_scores?.length > 0 ? (
                assessmentResults.section_scores
                  .filter((section: any) => section.percentage < 70)
                  .map((section: any, index: number) => (
                    <li key={index}>{section.title} needs improvement ({section.percentage}% compliance)</li>
                  ))
              ) : (
                <>
                  <li>Complete the assessment to see detailed risk analysis</li>
                  <li>Recommendations will be generated based on your responses</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {assessmentResults.section_scores?.length > 0 ? (
                assessmentResults.section_scores
                  .filter((section: any) => section.percentage >= 70)
                  .map((section: any, index: number) => (
                    <li key={index}>{section.title} shows good compliance ({section.percentage}%)</li>
                  ))
              ) : (
                <>
                  <li>Complete the assessment to see your organizational strengths</li>
                  <li>NIST-aligned controls will be evaluated</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">NIST-Aligned Ransomware Playbook</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Generate a customized ransomware response playbook based on your assessment results and aligned with NIST IR 8374 guidance.
            </p>
            <Button onClick={handleDownloadPlaybook} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Generate Playbook
            </Button>
          </CardContent>
        </Card>

        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Tabletop Exercise Kit</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Download a ready-to-use ransomware tabletop exercise kit with scenarios, facilitation guides, and evaluation metrics.
            </p>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Exercise Kit
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/ransomware-recommendations')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          View Detailed Recommendations
        </button>
      </div>
    </div>
  );
};

export default RansomwareResults;