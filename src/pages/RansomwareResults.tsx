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
  
  // In a real application, this would be passed through the location state
  // We're mocking it here for demonstration purposes
  const mockResults = {
    overallScore: 68,
    sectionScores: [
      { title: "Risk Management", percentage: 75, completed: true },
      { title: "Identity Management & Access Control", percentage: 60, completed: true },
      { title: "Protective Technology", percentage: 80, completed: true },
      { title: "Email & Phishing Defense", percentage: 85, completed: true },
      { title: "Detection & Monitoring", percentage: 55, completed: true },
      { title: "Incident Response & Recovery", percentage: 50, completed: true },
      { title: "Tabletop Exercise Readiness", percentage: 45, completed: true }
    ],
    assessmentType: 'ransomware',
    frameworkName: "NIST Ransomware Risk Management (IR 8374)",
    completedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const handleExport = () => {
    generateResultsPdf(
      'Ransomware Readiness Assessment Results',
      mockResults.overallScore,
      mockResults.sectionScores,
      mockResults.completedDate,
      'ransomware-assessment-results.pdf'
    );
  };

  const handleDownloadPlaybook = () => {
    // In a real application, this would generate and download a customized playbook
    alert('Generating and downloading your customized NIST-aligned ransomware playbook');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Ransomware Readiness Assessment Results</h1>
      
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
              <li>Tabletop exercise readiness needs significant improvement (45% compliance)</li>
              <li>Incident response capabilities need improvement (50% compliance)</li>
              <li>Detection and monitoring systems have critical gaps (55% compliance)</li>
              <li>Identity and access management controls require strengthening (60% compliance)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Strong email and phishing defenses (85% compliance)</li>
              <li>Effective protective technologies implemented (80% compliance)</li>
              <li>Good risk management foundation (75% compliance)</li>
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