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
  ClipboardCheck,
  FileSearch,
  BarChart2,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

const ComplianceGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'program-setup',
      title: 'Program Setup',
      items: [
        'Compliance Strategy',
        'Framework Selection',
        'Policy Development',
        'Control Implementation'
      ]
    },
    {
      id: 'assessment',
      title: 'Assessment & Monitoring',
      items: [
        'Gap Analysis',
        'Control Testing',
        'Evidence Collection',
        'Continuous Monitoring'
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting & Improvement',
      items: [
        'Compliance Reporting',
        'Metrics & KPIs',
        'Program Review',
        'Continuous Improvement'
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
          {/* Main content - 3 columns */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              <h1>Compliance Management Guide</h1>
              <p className="lead">
                A comprehensive guide to establishing and maintaining an effective compliance management program.
              </p>

              <section>
                <h2>Program Setup</h2>
                <p>
                  Establish a strong foundation for your compliance program with proper structure and governance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Shield className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Compliance Strategy</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Define objectives
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Set program scope
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Establish governance
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <FileText className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Framework Selection</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Identify requirements
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Select frameworks
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Map controls
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <ClipboardCheck className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Policy Development</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Create policies
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Define procedures
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Document standards
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Settings className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Control Implementation</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Design controls
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Implement measures
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Validate effectiveness
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
                      <h4 className="text-lg font-semibold mb-2">Program Setup Best Practices</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Establish clear ownership and responsibilities
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Ensure executive support and commitment
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Align with business objectives
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Document all decisions and rationale
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2>Assessment & Monitoring</h2>
                <p>
                  Implement robust assessment and monitoring processes to ensure ongoing compliance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <FileSearch className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Gap Analysis</h4>
                      <p className="text-muted-foreground mb-4">
                        Identify compliance gaps and areas for improvement
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Assessment methodology
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Control evaluation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Gap documentation
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <BarChart2 className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Control Testing</h4>
                      <p className="text-muted-foreground mb-4">
                        Verify control effectiveness through testing
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Test planning
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Test execution
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Results analysis
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2>Reporting & Improvement</h2>
                <p>
                  Establish effective reporting mechanisms and continuous improvement processes.
                </p>

                <div className="space-y-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-4">Reporting Framework</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Compliance Reporting</h5>
                            <p className="text-muted-foreground">
                              Regular compliance status reporting
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Metrics & KPIs</h5>
                            <p className="text-muted-foreground">
                              Track and report on key metrics
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
                              Regular program effectiveness reviews
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Continuous Improvement</h5>
                            <p className="text-muted-foreground">
                              Ongoing program enhancement
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <BarChart2 className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Performance Tracking</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Define metrics
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Track progress
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Report results
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <RefreshCw className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Program Evolution</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Review findings
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Update program
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Enhance controls
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
          
          {/* Progress sidebar - 1 column */}
          <div className="lg:col-span-1">
            <GuideProgress
              guideId="compliance"
              currentSection="program-setup"
              sections={sections}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceGuide;