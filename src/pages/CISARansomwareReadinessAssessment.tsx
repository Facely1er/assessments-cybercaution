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
  Server,
  Database,
  Lock,
  Users,
  HelpCircle,
  Clock,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CISA, CISA_ASSESSMENT_FRAMEWORK, AssessmentQuestion } from '../utils/cisaAssessment';

const CISARansomwareReadinessAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complianceScore, setComplianceScore] = useState(0);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // CISA Ransomware Readiness Assessment Sections
  const sections = [
    {
      title: "Backup Practices",
      description: "Evaluate your backup practices against ransomware threats",
      icon: Database,
      questions: [
        {
          id: "CISA-RR-BP-1",
          question: "Do you maintain offline, encrypted backups of critical data?",
          guidance: "CISA recommends maintaining offline, encrypted backups that cannot be accessed from the network",
          category: 'Recovery' as const,
          controlReference: 'CISA RR 1.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-BP-2",
          question: "Do you regularly test backup restoration procedures?",
          guidance: "CISA recommends regularly testing backup restoration to verify integrity and reliability",
          category: 'Recovery' as const,
          controlReference: 'CISA RR 1.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-BP-3",
          question: "Are backup systems and media physically secured?",
          guidance: "CISA recommends physical security controls for backup systems and media",
          category: 'Recovery' as const,
          controlReference: 'CISA RR 1.3',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-BP-4",
          question: "Do you have immutable backups that cannot be altered or deleted?",
          guidance: "CISA recommends immutable backups to prevent tampering by attackers",
          category: 'Recovery' as const,
          controlReference: 'CISA RR 1.4',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-BP-5",
          question: "Is access to backup systems restricted to authorized personnel?",
          guidance: "CISA recommends strict access controls for backup systems and media",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 1.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Access Controls",
      description: "Evaluate access controls to prevent unauthorized access",
      icon: Lock,
      questions: [
        {
          id: "CISA-RR-AC-1",
          question: "Do you use multi-factor authentication for all remote access?",
          guidance: "CISA recommends MFA for all remote network access, VPNs, and external-facing applications",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 2.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-AC-2",
          question: "Do you use multi-factor authentication for all administrator accounts?",
          guidance: "CISA recommends MFA for all administrative or privileged accounts",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 2.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-AC-3",
          question: "Do you enforce strong password policies across the organization?",
          guidance: "CISA recommends enforcing secure passwords of sufficient length and complexity",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 2.3',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-AC-4",
          question: "Do you implement the principle of least privilege for all accounts?",
          guidance: "CISA recommends restricting user permissions to only what is required for their role",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 2.4',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-AC-5",
          question: "Do you regularly audit and remove inactive or unnecessary accounts?",
          guidance: "CISA recommends regular account reviews and prompt disabling of unused accounts",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 2.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Network Security",
      description: "Evaluate network security measures to prevent and detect ransomware",
      icon: Server,
      questions: [
        {
          id: "CISA-RR-NS-1",
          question: "Have you implemented network segmentation to limit lateral movement?",
          guidance: "CISA recommends segmenting networks to prevent ransomware from spreading",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 3.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-NS-2",
          question: "Do you implement email security controls to filter malicious content?",
          guidance: "CISA recommends email filtering to block malicious attachments and links",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 3.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-NS-3",
          question: "Do you block known malicious IP addresses and domains?",
          guidance: "CISA recommends blocking connections to known malicious IP addresses and domains",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 3.3',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-NS-4",
          question: "Do you restrict the use of Remote Desktop Protocol (RDP)?",
          guidance: "CISA recommends limiting or securing RDP access, which is a common ransomware vector",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 3.4',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-NS-5",
          question: "Do you have network monitoring in place to detect suspicious activities?",
          guidance: "CISA recommends continuous monitoring for unusual network traffic and activities",
          category: 'Detection' as const,
          controlReference: 'CISA RR 3.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Endpoint Protection",
      description: "Evaluate endpoint security controls to prevent ransomware",
      icon: Shield,
      questions: [
        {
          id: "CISA-RR-EP-1",
          question: "Do you use endpoint protection with anti-ransomware capabilities?",
          guidance: "CISA recommends modern endpoint protection with specific ransomware defenses",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 4.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-EP-2",
          question: "Do you keep operating systems and applications updated with security patches?",
          guidance: "CISA recommends timely patching of known vulnerabilities",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 4.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-EP-3",
          question: "Do you implement application allowlisting to prevent unauthorized code execution?",
          guidance: "CISA recommends allowlisting to prevent unauthorized programs from running",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 4.3',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-EP-4",
          question: "Do you restrict use of administrative privileges on endpoints?",
          guidance: "CISA recommends limiting administrative rights on user workstations",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 4.4',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-EP-5",
          question: "Do you disable or control the use of scripting environments (PowerShell, VBA, etc.)?",
          guidance: "CISA recommends controlling access to scripting tools often used in ransomware attacks",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 4.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "User Awareness",
      description: "Evaluate security awareness and training programs",
      icon: Users,
      questions: [
        {
          id: "CISA-RR-UA-1",
          question: "Do you conduct regular security awareness training for all employees?",
          guidance: "CISA recommends security awareness training for all users",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 5.1',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-UA-2",
          question: "Does your security awareness training include specific content on ransomware?",
          guidance: "CISA recommends including ransomware-specific content in awareness training",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 5.2',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-UA-3",
          question: "Do you conduct phishing simulations to test and train employees?",
          guidance: "CISA recommends phishing exercises to improve employee awareness",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 5.3',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-UA-4",
          question: "Do you have a process for employees to report suspicious emails or activities?",
          guidance: "CISA recommends clear procedures for reporting suspicious activities",
          category: 'Detection' as const,
          controlReference: 'CISA RR 5.4',
          priority: 'medium' as const
        },
        {
          id: "CISA-RR-UA-5",
          question: "Are executives and IT staff given specialized security training?",
          guidance: "CISA recommends role-specific training for key personnel",
          category: 'Prevention' as const,
          controlReference: 'CISA RR 5.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Incident Response",
      description: "Evaluate ransomware incident response capabilities",
      icon: AlertTriangle,
      questions: [
        {
          id: "CISA-RR-IR-1",
          question: "Do you have a specific response plan for ransomware incidents?",
          guidance: "CISA recommends a documented ransomware-specific incident response plan",
          category: 'Response' as const,
          controlReference: 'CISA RR 6.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-RR-IR-2",
          question: "Have you identified and documented key contacts for ransomware incident response?",
          guidance: "CISA recommends documenting all internal and external contacts needed during an incident",
          category: 'Response' as const,
          controlReference: 'CISA RR 6.2',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-IR-3",
          question: "Have you conducted tabletop exercises for ransomware scenarios?",
          guidance: "CISA recommends conducting exercises to test ransomware response capabilities",
          category: 'Response' as const,
          controlReference: 'CISA RR 6.3',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-IR-4",
          question: "Do you have procedures to contact law enforcement and CISA in case of ransomware?",
          guidance: "CISA recommends establishing procedures for notifying appropriate authorities",
          category: 'Response' as const,
          controlReference: 'CISA RR 6.4',
          priority: 'high' as const
        },
        {
          id: "CISA-RR-IR-5",
          question: "Do you have procedures for system recovery after a ransomware incident?",
          guidance: "CISA recommends documented procedures for system restoration after ransomware",
          category: 'Recovery' as const,
          controlReference: 'CISA RR 6.5',
          priority: 'critical' as const
        }
      ]
    }
  ];

  // Update compliance score when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const allQuestions = sections.flatMap(section => section.questions) as AssessmentQuestion[];
      const framework = CISA.frameworks.RANSOMWARE_READINESS;
      
      const score = CISA.calculateScore(answers, framework, allQuestions);
      setComplianceScore(score);
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
    alert('Results would be displayed here with CISA recommendations.');
  };

  const handleExportAssessment = () => {
    // Implementation for exporting assessment data
    alert('Exporting CISA Ransomware Readiness assessment data to PDF...');
  };

  const renderStartScreen = () => {
    return (
      <>
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">CISA Ransomware Readiness Assessment</h1>
              <p className="text-muted-foreground mb-2">Based on CISA's Ransomware Readiness Assessment (RRA)</p>
              <p className="text-sm text-muted-foreground">
                <a href="https://www.cisa.gov/stopransomware/ransomware-readiness-assessment-rra" 
                   className="text-primary hover:underline" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Learn more about CISA's Ransomware Readiness Assessment
                </a>
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About CISA's Ransomware Readiness Assessment</CardTitle>
            <CardDescription>
              Evaluate your organization's operational resilience against ransomware attacks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Why Use CISA's RRA</h3>
                <p className="text-muted-foreground mb-4">
                  CISA's Ransomware Readiness Assessment (RRA) will help your organization:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Evaluate preparedness against ransomware attacks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Identify security gaps based on government expertise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prioritize security enhancements to reduce risk</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Align with federal government security recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">What You'll Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Comprehensive assessment of ransomware readiness</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prioritized list of security improvement recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>CISA-aligned remediation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ransomware readiness score based on CISA methodology</span>
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
            <CardTitle>CISA StopRansomware Resources</CardTitle>
            <CardDescription>
              Additional resources from CISA to help protect against ransomware
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.cisa.gov/stopransomware/ransomware-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Ransomware Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA-MS-ISAC joint ransomware guide</p>
                  <div className="text-primary text-sm">View Guide</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/sites/default/files/publications/CISA_Fact_Sheet-Protecting_Sensitive_and_Personal_Information_from_Ransomware-Caused_Data_Breaches-508C.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Data Protection</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA fact sheet on protecting data from ransomware</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/stopransomware/report-ransomware-0"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Report Ransomware</h3>
                  <p className="text-sm text-muted-foreground mb-2">How to report ransomware incidents to CISA</p>
                  <div className="text-primary text-sm">View guidance</div>
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
              <h1 className="text-3xl font-bold mb-2 text-foreground">CISA Ransomware Readiness Assessment</h1>
              <p className="text-muted-foreground">Based on CISA's Ransomware Readiness Assessment (RRA)</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportAssessment}>
                <Download className="mr-2 h-4 w-4" />
                Export Assessment
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 overflow-x-auto">
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
                <span>CISA Readiness: {getOverallScore()}%</span>
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
                      <a 
                        href="https://www.cisa.gov/stopransomware/ransomware-guide" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center mt-1"
                      >
                        CISA Guidance
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
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
            <CardTitle>CISA Ransomware Guidance</CardTitle>
            <CardDescription>CISA recommendations for protecting against ransomware</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Key CISA Recommendations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Back Up Your Data, System Images, and Configurations</p>
                      <p className="text-sm text-muted-foreground">Ensure backups are regularly tested and isolated from network connections</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Keep Your Systems Updated</p>
                      <p className="text-sm text-muted-foreground">Regularly patch operating systems, applications, and firmware</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Implement Multi-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Especially for remote access and administrative accounts</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">In Case of an Incident</h3>
                <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-critical-red mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Report to CISA</p>
                      <p className="text-sm mb-2">CISA encourages reporting ransomware incidents to federal authorities</p>
                      <a 
                        href="https://www.cisa.gov/stopransomware/report-ransomware-0" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm inline-flex items-center"
                      >
                        Report Ransomware
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return showStartScreen ? renderStartScreen() : renderAssessment();
};

export default CISARansomwareReadinessAssessment;