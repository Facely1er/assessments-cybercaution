import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  AlertTriangle, 
  CheckCircle, 
  Circle, 
  Info, 
  Shield, 
  ArrowLeft, 
  ArrowRight, 
  Download,
  ExternalLink,
  Network,
  Lock,
  HelpCircle,
  Clock,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CISA, CISA_ASSESSMENT_FRAMEWORK, AssessmentQuestion } from '../utils/cisaAssessment';

const NetworkSegmentationAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complianceScore, setComplianceScore] = useState(0);
  const [complianceLevel, setComplianceLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Network Segmentation Assessment sections based on CISA guidance
  const sections = [
    {
      title: "Planning & Strategy",
      description: "Evaluate your network segmentation planning process",
      icon: Shield,
      questions: [
        {
          id: "CISA-NS-PS-1",
          question: "Have you documented your network segmentation strategy?",
          guidance: "CISA recommends a documented network segmentation strategy",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 1.1',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-PS-2",
          question: "Have you identified and documented critical assets and systems?",
          guidance: "CISA recommends identifying critical assets to prioritize protection",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 1.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-NS-PS-3",
          question: "Have you mapped data flows between systems and network segments?",
          guidance: "CISA recommends mapping data flows to identify segmentation requirements",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 1.3',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-PS-4",
          question: "Have you defined network security zones based on risk levels?",
          guidance: "CISA recommends defining security zones based on data sensitivity and system criticality",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 1.4',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-PS-5",
          question: "Does your segmentation strategy include consideration for legacy systems?",
          guidance: "CISA recommends addressing legacy systems that may require special handling",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 1.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Implementation",
      description: "Evaluate your network segmentation implementation",
      icon: Network,
      questions: [
        {
          id: "CISA-NS-IM-1",
          question: "Have you implemented physical or logical segmentation between IT and OT networks?",
          guidance: "CISA recommends separating IT and OT networks",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 2.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-NS-IM-2",
          question: "Have you implemented network segmentation for critical systems and sensitive data?",
          guidance: "CISA recommends segmentation for systems with sensitive data",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 2.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-NS-IM-3",
          question: "Do you use firewalls or access control lists between network segments?",
          guidance: "CISA recommends using firewalls or ACLs to control traffic between segments",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 2.3',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-IM-4",
          question: "Have you implemented micro-segmentation where appropriate?",
          guidance: "CISA recommends micro-segmentation for highly sensitive environments",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 2.4',
          priority: 'medium' as const
        },
        {
          id: "CISA-NS-IM-5",
          question: "Have you implemented network access controls (NAC) to enforce segmentation?",
          guidance: "CISA recommends NAC to enforce segmentation policies",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 2.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Access Controls",
      description: "Evaluate access controls between network segments",
      icon: Lock,
      questions: [
        {
          id: "CISA-NS-AC-1",
          question: "Do you enforce the principle of least privilege for traffic between segments?",
          guidance: "CISA recommends only allowing necessary traffic between segments",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 3.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-NS-AC-2",
          question: "Do you require authentication for accessing resources across segments?",
          guidance: "CISA recommends authentication for cross-segment access",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 3.2',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-AC-3",
          question: "Do you implement application-layer filtering for traffic between segments?",
          guidance: "CISA recommends application-layer filtering for enhanced security",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 3.3',
          priority: 'medium' as const
        },
        {
          id: "CISA-NS-AC-4",
          question: "Do you implement encryption for sensitive data transmitted between segments?",
          guidance: "CISA recommends encrypting sensitive data in transit",
          category: 'Prevention' as const,
          controlReference: 'CISA NS 3.4',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-AC-5",
          question: "Do you use security technologies like IDS/IPS between network segments?",
          guidance: "CISA recommends using detection technologies for cross-segment traffic",
          category: 'Detection' as const,
          controlReference: 'CISA NS 3.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Monitoring & Verification",
      description: "Evaluate monitoring and verification of network segmentation",
      icon: Shield,
      questions: [
        {
          id: "CISA-NS-MV-1",
          question: "Do you monitor traffic between network segments to detect policy violations?",
          guidance: "CISA recommends monitoring inter-segment traffic",
          category: 'Detection' as const,
          controlReference: 'CISA NS 4.1',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-MV-2",
          question: "Do you regularly test network segmentation controls to verify effectiveness?",
          guidance: "CISA recommends testing segmentation controls",
          category: 'Detection' as const,
          controlReference: 'CISA NS 4.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-NS-MV-3",
          question: "Do you have detection capabilities for lateral movement attempts?",
          guidance: "CISA recommends detecting lateral movement attempts",
          category: 'Detection' as const,
          controlReference: 'CISA NS 4.3',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-MV-4",
          question: "Do you collect and analyze logs from segmentation enforcement points?",
          guidance: "CISA recommends logging at segmentation boundaries",
          category: 'Detection' as const,
          controlReference: 'CISA NS 4.4',
          priority: 'high' as const
        },
        {
          id: "CISA-NS-MV-5",
          question: "Do you conduct regular security assessments of your network segmentation?",
          guidance: "CISA recommends regular assessments of segmentation effectiveness",
          category: 'Detection' as const,
          controlReference: 'CISA NS 4.5',
          priority: 'medium' as const
        }
      ]
    }
  ];

  // Update compliance score when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const allQuestions = sections.flatMap(section => section.questions) as AssessmentQuestion[];
      const framework = CISA.frameworks.CROSS_SECTOR_CPG;
      
      const score = CISA.calculateScore(answers, framework, allQuestions);
      setComplianceScore(score);
      setComplianceLevel(CISA.getComplianceLevel(score));
    }
  }, [answers]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateSectionScore = (sectionIndex: number) => {
    const sectionQuestions = sections[sectionIndex].questions;
    let score = 0;
    let answered = 0;

    sectionQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer === 'yes') {
        score += 2;
        answered++;
      } else if (answer === 'partial') {
        score += 1;
        answered++;
      } else if (answer === 'no') {
        answered++;
      }
    });

    return {
      score,
      total: sectionQuestions.length * 2,
      completed: answered === sectionQuestions.length,
      percentage: Math.round((score / (sectionQuestions.length * 2)) * 100)
    };
  };

  const getOverallScore = () => {
    return complianceScore || 0;
  };

  const renderAnswerButtons = (questionId: string) => {
    const currentAnswer = answers[questionId];
    
    return (
      <div className="flex gap-2 mt-2">
        <Button
          variant={currentAnswer === 'yes' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'yes')}
          className="flex items-center gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Yes
        </Button>
        <Button
          variant={currentAnswer === 'partial' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'partial')}
          className="flex items-center gap-1"
        >
          <Circle className="w-4 h-4" />
          Partial
        </Button>
        <Button
          variant={currentAnswer === 'no' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'no')}
          className="flex items-center gap-1"
        >
          <AlertTriangle className="w-4 h-4" />
          No
        </Button>
      </div>
    );
  };

  // Determine if we have enough answers to show results
  const hasCompletedMinimumSections = () => {
    let completedSections = 0;
    sections.forEach((_, index) => {
      if (calculateSectionScore(index).completed) {
        completedSections++;
      }
    });
    return completedSections >= Math.ceil(sections.length / 2);
  };

  const handleViewResults = () => {
    // In a real application, this would navigate to a results page
    alert('Results would be displayed here with CISA network segmentation recommendations.');
  };

  const handleExportAssessment = () => {
    // Implementation for exporting assessment data
    alert('Exporting Network Segmentation assessment data to PDF...');
  };

  const renderStartScreen = () => {
    return (
      <>
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">Network Segmentation Assessment</h1>
              <p className="text-muted-foreground mb-2">Based on CISA guidance for securing industrial control systems</p>
              <p className="text-sm text-muted-foreground">
                <a href="https://www.cisa.gov/publication/network-segmentation-guidance" 
                   className="text-primary hover:underline" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Learn more about CISA's Network Segmentation Guidance
                </a>
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Network Segmentation Matters</CardTitle>
            <CardDescription>
              CISA recommends network segmentation as a critical security control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Benefits of Network Segmentation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prevents lateral movement by threat actors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Limits the impact of ransomware and other malware</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Protects critical assets from compromise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Reduces the attack surface of the network</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Helps meet compliance requirements</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">What You'll Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Evaluation of your current network segmentation approach</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Gap analysis against CISA recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prioritized improvement recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>CISA-aligned network segmentation guidance</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="space-x-4">
                <Button 
                  size="lg"
                  onClick={() => setShowStartScreen(false)}
                >
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={handleExportAssessment}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CISA Network Segmentation Resources</CardTitle>
            <CardDescription>
              Additional resources from CISA on network segmentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.cisa.gov/publication/network-segmentation-guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Segmentation Guidance</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA's guidance for network segmentation</p>
                  <div className="text-primary text-sm">View Guide</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/sites/default/files/publications/Securing_Industrial_Control_Systems_S508C.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Securing ICS Systems</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA's guide to securing industrial control systems</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/sites/default/files/publications/Layering%20Network%20Security%20Through%20Segmentation_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Layered Security</h3>
                  <p className="text-sm text-muted-foreground mb-2">Layering network security through segmentation</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  const renderAssessment = () => {
    return (
      <>
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">Network Segmentation Assessment</h1>
              <p className="text-muted-foreground">Based on CISA guidance for network segmentation</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportAssessment}>
                <Download className="mr-2 h-4 w-4" />
                Export Assessment
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 overflow-x-auto">
          {sections.map((section, index) => {
            const score = calculateSectionScore(index);
            return (
              <Card key={index} className={`p-4 cursor-pointer transition-shadow hover:shadow-md ${
                currentSection === index ? 'ring-2 ring-primary' : 'dark:border-muted'
              }`} onClick={() => setCurrentSection(index)}>
                <h3 className="font-semibold mb-2 text-foreground">{section.title}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Score: {score.percentage}%</p>
                    <p className="text-sm text-muted-foreground">
                      {score.completed ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-secure-green mr-1" /> Complete
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 text-warning-amber mr-1" /> Incomplete
                        </span>
                      )}
                    </p>
                  </div>
                  {currentSection === index && (
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 border dark:border-muted mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{sections[currentSection].title}</h2>
              <p className="text-muted-foreground">{sections[currentSection].description}</p>
            </div>
            <div className="text-xl font-semibold text-foreground">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                <span>CISA Compliance: {getOverallScore()}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {sections[currentSection].questions.map((question) => (
              <div key={question.id} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                    {question.controlReference}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{question.question}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full
                        ${question.priority === 'critical' ? 'bg-critical-red/10 text-critical-red' : 
                        question.priority === 'high' ? 'bg-warning-amber/10 text-warning-amber' : 
                        'bg-electric-blue/10 text-electric-blue'}`}
                      >
                        {question.priority.charAt(0).toUpperCase() + question.priority.slice(1)} Priority
                      </span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full ml-2">
                        {question.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded mb-3 ml-9">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">{question.guidance}</p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-9">
                  {renderAnswerButtons(question.id)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
            
            {currentSection < sections.length - 1 ? (
              <Button
                onClick={() => setCurrentSection(prev => prev + 1)}
              >
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleViewResults}
                disabled={!hasCompletedMinimumSections()}
                className="flex items-center gap-2"
              >
                View Results
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>CISA Network Segmentation Guidance</CardTitle>
            <CardDescription>Best practices from CISA for implementing network segmentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Key CISA Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Identify and Inventory Assets</p>
                      <p className="text-sm text-muted-foreground">Document all assets and systems to understand what needs protection</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Group Assets Based on Risk</p>
                      <p className="text-sm text-muted-foreground">Group assets with similar risk profiles and security requirements</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Implement Defense in Depth</p>
                      <p className="text-sm text-muted-foreground">Use multiple layers of controls between critical assets and potential threats</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Monitor Traffic Between Segments</p>
                      <p className="text-sm text-muted-foreground">Implement monitoring at segment boundaries to detect unauthorized access</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <a 
                  href="https://www.cisa.gov/publication/network-segmentation-guidance" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    View CISA Network Segmentation Guide
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return showStartScreen ? renderStartScreen() : renderAssessment();
};

export default NetworkSegmentationAssessment;