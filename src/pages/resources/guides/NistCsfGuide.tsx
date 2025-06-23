import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { GuideProgress } from '../../../components/guides/GuideProgress';
import { toast } from '../../../components/ui/Toaster';
import AnimatedSection from '../../../utils/AnimatedSection';
import AnimatedItem from '../../../utils/AnimatedItem';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Users,
  Settings,
  AlertTriangle,
  Info,
  Link,
  ArrowLeft,
  ChevronLeft,
  ClipboardList
} from 'lucide-react';

const NistCsfGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'framework-core',
      title: 'Framework Core',
      items: [
        'Identify Function',
        'Protect Function',
        'Detect Function',
        'Respond Function',
        'Recover Function'
      ]
    },
    {
      id: 'implementation-tiers',
      title: 'Implementation Tiers',
      items: [
        'Tier 1: Partial',
        'Tier 2: Risk Informed',
        'Tier 3: Repeatable',
        'Tier 4: Adaptive'
      ]
    },
    {
      id: 'profiles',
      title: 'Profiles',
      items: [
        'Current Profile Assessment',
        'Target Profile Development',
        'Gap Analysis',
        'Action Planning'
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
              <AnimatedSection type="fadeIn">
                <h1>NIST Cybersecurity Framework Implementation Guide</h1>
                <p className="lead">
                  A comprehensive guide to implementing the NIST Cybersecurity Framework (CSF) v2.0 in your organization.
                </p>

                <section>
                  <h2>Framework Core</h2>
                  <p>
                    The Framework Core provides a set of activities to achieve specific cybersecurity outcomes, 
                    and references examples of guidance to achieve those outcomes.
                  </p>

                  <div className="my-8">
                    <h3>Core Functions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedItem type="fadeIn" delay={0.1}>
                        <Card>
                          <CardContent className="p-6">
                            <Shield className="h-8 w-8 text-[#FF6B00] mb-4" />
                            <h4 className="text-lg font-semibold mb-2">Identify</h4>
                            <p className="text-muted-foreground">
                              Develop organizational understanding to manage cybersecurity risk to systems, 
                              people, assets, data, and capabilities.
                            </p>
                          </CardContent>
                        </Card>
                      </AnimatedItem>

                      <AnimatedItem type="fadeIn" delay={0.2}>
                        <Card>
                          <CardContent className="p-6">
                            <Shield className="h-8 w-8 text-[#FF6B00] mb-4" />
                            <h4 className="text-lg font-semibold mb-2">Protect</h4>
                            <p className="text-muted-foreground">
                              Develop and implement appropriate safeguards to ensure delivery of critical services.
                            </p>
                          </CardContent>
                        </Card>
                      </AnimatedItem>

                      <AnimatedItem type="fadeIn" delay={0.3}>
                        <Card>
                          <CardContent className="p-6">
                            <AlertTriangle className="h-8 w-8 text-[#FF6B00] mb-4" />
                            <h4 className="text-lg font-semibold mb-2">Detect</h4>
                            <p className="text-muted-foreground">
                              Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.
                            </p>
                          </CardContent>
                        </Card>
                      </AnimatedItem>

                      <AnimatedItem type="fadeIn" delay={0.4}>
                        <Card>
                          <CardContent className="p-6">
                            <Shield className="h-8 w-8 text-[#FF6B00] mb-4" />
                            <h4 className="text-lg font-semibold mb-2">Respond</h4>
                            <p className="text-muted-foreground">
                              Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.
                            </p>
                          </CardContent>
                        </Card>
                      </AnimatedItem>

                      <AnimatedItem type="fadeIn" delay={0.5} className="md:col-span-2">
                        <Card>
                          <CardContent className="p-6">
                            <Settings className="h-8 w-8 text-[#FF6B00] mb-4" />
                            <h4 className="text-lg font-semibold mb-2">Recover</h4>
                            <p className="text-muted-foreground">
                              Develop and implement appropriate activities to maintain plans for resilience and to restore 
                              any capabilities or services that were impaired due to a cybersecurity incident.
                            </p>
                          </CardContent>
                        </Card>
                      </AnimatedItem>
                    </div>
                  </div>

                  <AnimatedItem type="fadeIn" delay={0.6}>
                    <div className="bg-muted/30 rounded-lg p-6 my-8">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#FF6B00]/10 rounded-lg">
                          <Info className="h-6 w-6 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Implementation Tips</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                              <span>Start with a clear scope definition</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                              <span>Focus on critical assets and services</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                              <span>Involve key stakeholders early</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                              <span>Document decisions and rationale</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AnimatedItem>
                </section>

                <AnimatedSection type="fadeIn" delay={0.7}>
                  <section>
                    <h2>Implementation Tiers</h2>
                    <p>
                      Implementation tiers describe the degree to which an organization's cybersecurity risk management 
                      practices exhibit the characteristics defined in the Framework.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                      {['Partial', 'Risk Informed', 'Repeatable', 'Adaptive'].map((tier, index) => (
                        <AnimatedItem key={tier} type="fadeIn" delay={index * 0.1}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                                  {index + 1}
                                </div>
                                <h4 className="text-lg font-semibold">Tier {index + 1}: {tier}</h4>
                              </div>
                              <p className="text-muted-foreground">
                                {getTierDescription(index + 1)}
                              </p>
                            </CardContent>
                          </Card>
                        </AnimatedItem>
                      ))}
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection type="fadeIn" delay={0.8}>
                  <section>
                    <h2>Profiles</h2>
                    <p>
                      Framework Profiles are used to describe the current state and target state of specific 
                      cybersecurity activities.
                    </p>

                    <div className="space-y-6 my-8">
                      <Card>
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold mb-4">Profile Development Process</h4>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                1
                              </div>
                              <div>
                                <h5 className="font-medium mb-1">Current Profile Assessment</h5>
                                <p className="text-muted-foreground">
                                  Evaluate your organization's current cybersecurity activities and outcomes
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                2
                              </div>
                              <div>
                                <h5 className="font-medium mb-1">Target Profile Development</h5>
                                <p className="text-muted-foreground">
                                  Define the desired outcomes based on business needs and risk management goals
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                3
                              </div>
                              <div>
                                <h5 className="font-medium mb-1">Gap Analysis</h5>
                                <p className="text-muted-foreground">
                                  Compare Current and Target Profiles to identify gaps
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                4
                              </div>
                              <div>
                                <h5 className="font-medium mb-1">Action Planning</h5>
                                <p className="text-muted-foreground">
                                  Develop an action plan to address the identified gaps
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline">
                        Previous Section
                      </Button>
                      <Button variant="orange">
                        Next Section
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </section>
                </AnimatedSection>
              </AnimatedSection>
            </div>
          </div>
          
          {/* Progress sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <GuideProgress
                guideId="nist-csf"
                currentSection="framework-core"
                sections={sections}
                onComplete={handleComplete}
              />

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Additional Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/ransomware-assessment')}>
                        <AlertTriangle className="mr-2 h-4 w-4 text-[#FF6B00]" />
                        Ransomware Assessment
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/tabletop-exercise')}>
                        <Users className="mr-2 h-4 w-4 text-[#FF6B00]" />
                        Tabletop Exercises
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/nist-csf-alignment')}>
                        <Shield className="mr-2 h-4 w-4 text-[#FF6B00]" />
                        NIST CSF Alignment
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/app/risk-register')}>
                        <ClipboardList className="mr-2 h-4 w-4 text-[#FF6B00]" />
                        Risk Register
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get tier descriptions
const getTierDescription = (tier: number): string => {
  switch (tier) {
    case 1:
      return 'Risk management practices are not formalized, and risk is managed in an ad hoc manner.';
    case 2:
      return 'Risk management practices are approved by management but may not be established as organizational-wide policy.';
    case 3:
      return 'Risk management practices are formally approved and expressed as policy, regularly updated.';
    case 4:
      return 'Organization adapts its cybersecurity practices based on previous and current cybersecurity activities.';
    default:
      return '';
  }
};

export default NistCsfGuide;