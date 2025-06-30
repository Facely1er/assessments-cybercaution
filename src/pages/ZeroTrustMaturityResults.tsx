import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, FileText, Shield, User, Lock, Network, Globe, Database } from 'lucide-react';

const ZeroTrustMaturityResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve assessment results from navigation state or use fallback
  const assessmentResults = location.state?.assessmentResults || {
    overall_score: 0,
    section_scores: [],
    assessment_type: 'zero-trust',
    framework_name: "CISA Zero Trust Maturity Model",
    completed_at: new Date().toISOString()
  };

  const handleExport = () => {
    generateResultsPdf(
      'Zero Trust Maturity Assessment Results',
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
      'zero-trust-maturity-assessment-results.pdf'
    );
  };

  const handleDownloadRoadmap = () => {
    // In a real application, this would generate and download a customized roadmap
    alert('Generating and downloading your customized Zero Trust implementation roadmap');
  };

  const handleDownloadArchitecture = () => {
    // In a real application, this would generate architecture templates
    alert('Downloading Zero Trust architecture templates and reference designs');
  };

  // Determine maturity level based on score
  const getMaturityLevel = (score: number) => {
    if (score >= 80) return 'Optimal';
    if (score >= 50) return 'Advanced';
    return 'Traditional';
  };

  const maturityLevel = getMaturityLevel(assessmentResults.overall_score);

  // Transform the data to match the expected format for AssessmentResults component
  const resultsData = {
    overallScore: assessmentResults.overall_score,
    sectionScores: assessmentResults.section_scores,
    assessmentType: 'zero-trust' as 'ransomware',
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
      <h1 className="text-3xl font-bold mb-6 text-foreground">Zero Trust Maturity Assessment Results</h1>
      
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">Zero Trust Maturity Level: {maturityLevel}</h3>
          </div>
          <div className="text-sm font-medium">
            Overall Score: {assessmentResults.overall_score}%
          </div>
        </div>
        <div className="w-full bg-muted h-2 rounded-full mt-2">
          <div 
            className={`h-2 rounded-full ${
              maturityLevel === 'Optimal' ? 'bg-secure-green' :
              maturityLevel === 'Advanced' ? 'bg-electric-blue' :
              'bg-warning-amber'
            }`} 
            style={{ width: `${assessmentResults.overall_score}%` }}
          />
        </div>
      </div>
      
      <AssessmentResults 
        data={resultsData}
        onExport={handleExport}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Pillar Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {assessmentResults.section_scores?.map((section: any, index: number) => {
            const icons = [User, Lock, Network, Globe, Database];
            const Icon = icons[index % icons.length];
            
            return (
              <Card key={index} className="border dark:border-muted">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-primary/10 rounded-full mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">{section.title}</h3>
                    <div className={`text-lg font-bold ${
                      section.percentage >= 80 ? 'text-secure-green' :
                      section.percentage >= 50 ? 'text-electric-blue' :
                      'text-warning-amber'
                    }`}>
                      {section.percentage}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {section.percentage >= 80 ? 'Optimal' :
                       section.percentage >= 50 ? 'Advanced' :
                       'Traditional'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Zero Trust Roadmap</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Generate a customized Zero Trust implementation roadmap based on your maturity assessment results and CISA guidance.
            </p>
            <Button onClick={handleDownloadRoadmap} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Generate Roadmap
            </Button>
          </CardContent>
        </Card>

        <Card className="border dark:border-muted">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Reference Architecture</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Download Zero Trust reference architecture templates and implementation guides.
            </p>
            <Button variant="outline" className="w-full" onClick={handleDownloadArchitecture}>
              <Download className="mr-2 h-4 w-4" />
              Download Architecture
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
              <li>• Implement MFA for all users</li>
              <li>• Begin network segmentation planning</li>
              <li>• Inventory and classify sensitive data</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Long-term Strategy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Develop comprehensive Zero Trust architecture</li>
              <li>• Implement continuous monitoring and validation</li>
              <li>• Transition to risk-based access controls</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/zero-trust-maturity-recommendations')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          disabled
        >
          View Detailed Recommendations (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ZeroTrustMaturityResults;