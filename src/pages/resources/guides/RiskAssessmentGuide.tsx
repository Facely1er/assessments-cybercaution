import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { GuideProgress } from '../../../components/guides/GuideProgress';
import { toast } from '../../../components/ui/Toaster';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Users,
  Settings,
  AlertTriangle,
  Info,
  Target,
  BarChart2,
  Scale,
  ArrowLeft,
  LineChart,
  Sliders,
  FileCheck
} from 'lucide-react';

const RiskAssessmentGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'methodology',
      title: 'Assessment Methodology',
      items: [
        'Risk Identification',
        'Risk Analysis',
        'Risk Evaluation',
        'Risk Treatment'
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation',
      items: [
        'Assessment Planning',
        'Data Collection',
        'Analysis Methods',
        'Documentation'
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Review',
      items: [
        'Risk Monitoring',
        'Control Effectiveness',
        'Metrics & KPIs',
        'Program Review'
      ]
    }
  ];

  const handleComplete = () => {
    toast.success('Section completed!', 'Keep going to complete the guide');
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/resources/guides')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guides
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              <h1>Risk Assessment Methodology Guide</h1>
              <p className="lead">
                A comprehensive guide to implementing effective risk assessment methodologies aligned with industry standards.
              </p>

              <section>
                <h2>Assessment Methodology</h2>
                <p>
                  A structured approach to identifying, analyzing, and evaluating risks across your organization.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Target className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Risk Identification</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Asset identification
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Threat assessment
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Vulnerability analysis
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <BarChart2 className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Risk Analysis</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Impact assessment
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Likelihood evaluation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Risk scoring
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Scale className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Risk Evaluation</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Risk prioritization
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Risk acceptance criteria
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Treatment decisions
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Settings className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Risk Treatment</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Treatment options
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Control selection
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Implementation planning
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Assessment Best Practices</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Use standardized methodology
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Involve key stakeholders
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Document all decisions
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Regular review and updates
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2>Implementation Process</h2>
                <p>
                  Practical steps for implementing risk assessment methodology in your organization.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <FileText className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Assessment Planning</h4>
                      <p className="text-muted-foreground mb-4">
                        Plan and prepare for risk assessment
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Define scope
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Identify resources
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Set timeline
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Sliders className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Analysis Methods</h4>
                      <p className="text-muted-foreground mb-4">
                        Risk analysis techniques and tools
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Qualitative analysis
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Quantitative analysis
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Hybrid approaches
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2>Monitoring & Review</h2>
                <p>
                  Establish ongoing monitoring and review processes for continuous improvement.
                </p>

                <div className="space-y-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-4">Monitoring Framework</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Risk Monitoring</h5>
                            <p className="text-muted-foreground">
                              Track risk levels and changes
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Control Effectiveness</h5>
                            <p className="text-muted-foreground">
                              Evaluate control performance
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Program Review</h5>
                            <p className="text-muted-foreground">
                              Regular program assessment
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <LineChart className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Metrics & KPIs</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Risk metrics
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Performance indicators
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Trend analysis
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <FileCheck className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Documentation</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Assessment reports
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Review findings
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Action tracking
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline">
                    Previous Section
                  </Button>
                  <Button>
                    Next Section
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </section>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <GuideProgress
              guideId="risk-assessment"
              currentSection="methodology"
              sections={sections}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentGuide;