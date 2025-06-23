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
  Lock,
  Database,
  Network,
  Eye,
  Server,
  Key,
  ArrowLeft
} from 'lucide-react';

const SecurityControlsGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'access-controls',
      title: 'Access Controls',
      items: [
        'Authentication Methods',
        'Authorization Framework',
        'Access Reviews',
        'Privileged Access'
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      items: [
        'Data Classification',
        'Encryption Standards',
        'Data Handling',
        'Data Lifecycle'
      ]
    },
    {
      id: 'monitoring',
      title: 'Security Monitoring',
      items: [
        'Monitoring Strategy',
        'Alert Configuration',
        'Incident Detection',
        'Response Procedures'
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
              <h1>Security Controls Implementation Guide</h1>
              <p className="lead">
                A comprehensive guide to implementing effective security controls aligned with industry standards and best practices.
              </p>

              <section>
                <h2>Access Control Implementation</h2>
                <p>
                  Implement robust access controls to protect resources and ensure appropriate access levels.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Lock className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Authentication</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Multi-factor authentication
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Password policies
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          SSO integration
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Key className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Authorization</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Role-based access control
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Least privilege principle
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Access matrices
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Users className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Access Reviews</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Regular access reviews
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Privilege auditing
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Access certification
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Shield className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Privileged Access</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          PAM implementation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Just-in-time access
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Session monitoring
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
                      <h4 className="text-lg font-semibold mb-2">Implementation Best Practices</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Document access policies
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Regular policy reviews
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Automated provisioning
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Access monitoring
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2>Data Protection Controls</h2>
                <p>
                  Implement comprehensive data protection controls to secure sensitive information throughout its lifecycle.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Database className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Data Classification</h4>
                      <p className="text-muted-foreground mb-4">
                        Classify data based on sensitivity and requirements
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Classification levels
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Handling requirements
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Data inventory
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Lock className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Encryption</h4>
                      <p className="text-muted-foreground mb-4">
                        Implement encryption for data protection
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Data at rest
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Data in transit
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          Key management
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2>Security Monitoring</h2>
                <p>
                  Implement comprehensive security monitoring to detect and respond to security events.
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
                            <h5 className="font-medium mb-1">Monitoring Strategy</h5>
                            <p className="text-muted-foreground">
                              Define monitoring scope and objectives
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Alert Configuration</h5>
                            <p className="text-muted-foreground">
                              Set up effective alerting mechanisms
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Incident Detection</h5>
                            <p className="text-muted-foreground">
                              Implement detection capabilities
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Response Procedures</h5>
                            <p className="text-muted-foreground">
                              Define and document response procedures
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <Eye className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Monitoring Systems</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            SIEM implementation
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Log management
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Real-time monitoring
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <AlertTriangle className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Incident Response</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Response procedures
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Team roles
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Communication plan
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
              guideId="security-controls"
              currentSection="access-controls"
              sections={sections}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityControlsGuide;