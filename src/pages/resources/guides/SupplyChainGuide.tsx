import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { GuideProgress } from '../../../components/guides/GuideProgress';
import { toast } from '../../../components/ui/Toaster';
import { 
  CheckCircle, 
  ArrowRight,
  FileText,
  Users,
  Settings,
  AlertTriangle,
  Info,
  Link,
  Building2,
  ShieldCheck,
  FileSearch,
  GitBranch,
  RefreshCw,
  Scale,
  Shield,
  ArrowLeft
} from 'lucide-react';

const SupplyChainGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      items: [
        'Supplier Identification',
        'Risk Categorization',
        'Threat Analysis',
        'Impact Assessment'
      ]
    },
    {
      id: 'controls',
      title: 'Security Controls',
      items: [
        'Access Management',
        'Data Protection',
        'Monitoring Systems',
        'Incident Response'
      ]
    },
    {
      id: 'monitoring',
      title: 'Continuous Monitoring',
      items: [
        'Performance Metrics',
        'Security Assessments',
        'Compliance Verification',
        'Risk Reporting'
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
              <h1>Supply Chain Risk Assessment Guide</h1>
              <p className="lead">
                A comprehensive guide to assessing and managing supply chain risks using NIST's supply chain security framework.
              </p>

              <section>
                <h2>Risk Assessment Process</h2>
                <p>
                  A systematic approach to identifying and evaluating risks in your supply chain ecosystem.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Building2 className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Supplier Identification</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Map supply chain ecosystem
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Identify critical suppliers
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Document dependencies
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Scale className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Risk Categorization</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Define risk categories
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Assess supplier criticality
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Evaluate risk exposure
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <AlertTriangle className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Threat Analysis</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Identify potential threats
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Assess likelihood
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Evaluate vulnerabilities
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <FileSearch className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Impact Assessment</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Business impact analysis
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Operational dependencies
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Financial implications
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
                          Use standardized assessment criteria
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Document assessment methodology
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Regular review and updates
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Maintain assessment records
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2>Security Controls Implementation</h2>
                <p>
                  Implement appropriate security controls to manage identified risks in your supply chain.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Shield className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Access Controls</h4>
                      <p className="text-muted-foreground mb-4">
                        Manage access to supply chain systems and data
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Identity verification
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Access management
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Privilege control
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <ShieldCheck className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Data Protection</h4>
                      <p className="text-muted-foreground mb-4">
                        Secure sensitive supply chain data
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Data classification
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Encryption requirements
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Data handling procedures
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2>Continuous Monitoring</h2>
                <p>
                  Establish ongoing monitoring processes to maintain visibility into supply chain risks.
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
                            <h5 className="font-medium mb-1">Performance Metrics</h5>
                            <p className="text-muted-foreground">
                              Define and track key performance indicators
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Security Assessments</h5>
                            <p className="text-muted-foreground">
                              Regular security reviews and assessments
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Compliance Verification</h5>
                            <p className="text-muted-foreground">
                              Ensure ongoing compliance with requirements
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Risk Reporting</h5>
                            <p className="text-muted-foreground">
                              Regular risk status reporting and updates
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <GitBranch className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Continuous Assessment</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Regular assessments
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Performance tracking
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Risk level monitoring
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <RefreshCw className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Review Process</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Regular reviews
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Update procedures
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Stakeholder feedback
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
              guideId="supply-chain"
              currentSection="risk-assessment"
              sections={sections}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainGuide;