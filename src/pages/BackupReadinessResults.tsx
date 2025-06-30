import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, FileText, Shield, Database } from 'lucide-react';

const BackupReadinessResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve assessment results from navigation state or use fallback
  const assessmentResults = location.state?.assessmentResults || {
    overall_score: 0,
    section_scores: [],
    assessment_type: 'backup-readiness',
    framework_name: "CISA Ransomware Guide",
    completed_at: new Date().toISOString()
  };

  const handleExport = () => {
    generateResultsPdf(
      'Backup Readiness Assessment Results',
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
      'backup-readiness-assessment-results.pdf'
    );
  };

  const handleDownloadPlaybook = () => {
    // In a real application, this would generate and download a customized playbook
    alert('Generating and downloading your customized CISA-aligned backup readiness playbook');
  };

  const handleDownloadTemplates = () => {
    // In a real application, this would generate backup readiness templates
    alert('Downloading backup readiness templates and checklists');
  };

  // Transform the data to match the expected format for AssessmentResults component
  const resultsData = {
    overallScore: assessmentResults.overall_score,
    sectionScores: assessmentResults.section_scores,
    assessmentType: 'backup-readiness' as 'ransomware',
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
      <h1 className="text-3xl font-bold mb-6 text-foreground">Backup Readiness Assessment Results</h1>
      
      <AssessmentResults 
        data={resultsData}
        onExport={handleExport}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Key Findings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Primary Areas for Improvement</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {assessmentResults.section_scores?.length > 0 ? (
                assessmentResults.section_scores
                  .filter((section: any) => section.percentage < 70)
                  .map((section: any, index: number) => (
                    <li key={index}>{section.title} needs enhancement ({section.percentage}% compliance)</li>
                  ))
              ) : (
                <>
                  <li>Complete the assessment to see detailed analysis of your backup readiness</li>
                  <li>Recommendations will be generated based on CISA guidance</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Backup Readiness Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {assessmentResults.section_scores?.length > 0 ? (
                assessmentResults.section_scores
                  .filter((section: any) => section.percentage >= 70)
                  .map((section: any, index: number) => (
                    <li key={index}>{section.title} shows good implementation ({section.percentage}%)</li>
                  ))
              ) : (
                <>
                  <li>Complete the assessment to identify your backup readiness strengths</li>
                  <li>CISA-aligned controls will be evaluated across four key areas</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">CISA 3-2-1 Backup Rule</h3>
            <p className="text-muted-foreground text-sm">
              This assessment evaluates your backup capabilities against CISA's 3-2-1 backup rule and other 
              ransomware protection guidance. A score of 70% or higher indicates good alignment with CISA 
              recommended practices for backup and recovery resilience.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Backup Playbook Generator</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Generate a customized backup and recovery playbook based on your assessment results and CISA guidance.
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
              <h3 className="text-xl font-semibold">Backup Templates & Checklists</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Download ready-to-use backup procedures, recovery checklists, and testing templates.
            </p>
            <Button variant="outline" className="w-full" onClick={handleDownloadTemplates}>
              <Download className="mr-2 h-4 w-4" />
              Download Templates
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-muted/20 rounded-lg">
        <h3 className="font-medium mb-2 text-foreground">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Immediate Actions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Review and address critical priority gaps</li>
              <li>• Test backup restoration procedures</li>
              <li>• Implement offline backup storage</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Long-term Improvements</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Establish regular backup testing schedule</li>
              <li>• Implement the CISA 3-2-1 backup rule</li>
              <li>• Review and update backup procedures quarterly</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/backup-readiness-recommendations')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          disabled
        >
          View Detailed Recommendations (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default BackupReadinessResults;