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
  Database,
  Server,
  HardDrive,
  Lock,
  Clock,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CISA, CISA_ASSESSMENT_FRAMEWORK, AssessmentQuestion } from '../utils/cisaAssessment';

const BackupReadinessAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complianceScore, setComplianceScore] = useState(0);
  const [complianceLevel, setComplianceLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Backup Readiness Assessment sections based on CISA guidance
  const sections = [
    {
      title: "Backup Strategy",
      description: "Evaluate your backup strategy and policies",
      icon: Server,
      questions: [
        {
          id: "CISA-BR-BS-1",
          question: "Do you have a documented backup strategy that includes all critical systems and data?",
          guidance: "CISA recommends a documented backup strategy covering all critical assets",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 1.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-BR-BS-2",
          question: "Does your backup strategy follow the 3-2-1 rule (3 copies, 2 different media, 1 offline)?",
          guidance: "CISA recommends the 3-2-1 backup rule for resilience",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 1.2',
          priority: 'critical' as const
        },
        {
          id: "CISA-BR-BS-3",
          question: "Have you identified and prioritized critical data and systems for backup?",
          guidance: "CISA recommends identifying critical assets to prioritize for backup",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 1.3',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BS-4",
          question: "Have you defined appropriate backup frequencies and retention periods?",
          guidance: "CISA recommends defining backup frequency based on data criticality",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 1.4',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BS-5",
          question: "Does your backup strategy account for various recovery scenarios?",
          guidance: "CISA recommends planning for different recovery scenarios",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 1.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Backup Implementation",
      description: "Evaluate your backup implementation and technologies",
      icon: Database,
      questions: [
        {
          id: "CISA-BR-BI-1",
          question: "Do you maintain offline backups that are disconnected from production networks?",
          guidance: "CISA recommends maintaining offline backups to protect from network-based attacks",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 2.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-BR-BI-2",
          question: "Do you encrypt backup data both in transit and at rest?",
          guidance: "CISA recommends encrypting backup data to protect confidentiality",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 2.2',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BI-3",
          question: "Do you use immutable backups that cannot be altered or deleted?",
          guidance: "CISA recommends immutable backups to prevent tampering",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 2.3',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BI-4",
          question: "Are backup systems and media physically secured?",
          guidance: "CISA recommends physical security controls for backup systems and media",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 2.4',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BI-5",
          question: "Do you use different accounts and authentication for backup systems?",
          guidance: "CISA recommends separate accounts for backup systems to prevent compromise",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 2.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Backup Testing",
      description: "Evaluate your backup testing and validation",
      icon: HardDrive,
      questions: [
        {
          id: "CISA-BR-BT-1",
          question: "Do you regularly test the restoration of backups?",
          guidance: "CISA recommends regular testing of backup restoration",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 3.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-BR-BT-2",
          question: "Do you test complete system recovery, not just file restoration?",
          guidance: "CISA recommends testing full system recovery, not just individual files",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 3.2',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BT-3",
          question: "Do you validate the integrity of backups after creation?",
          guidance: "CISA recommends validating backup integrity",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 3.3',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BT-4",
          question: "Do you document the results of backup testing?",
          guidance: "CISA recommends documenting backup testing results",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 3.4',
          priority: 'medium' as const
        },
        {
          id: "CISA-BR-BT-5",
          question: "Do you test recovery in an isolated environment?",
          guidance: "CISA recommends testing recovery in an isolated environment",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 3.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Backup Security",
      description: "Evaluate security controls for backup systems",
      icon: Lock,
      questions: [
        {
          id: "CISA-BR-BS-1",
          question: "Is access to backup systems restricted to authorized personnel?",
          guidance: "CISA recommends restricting access to backup systems",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 4.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-BR-BS-2",
          question: "Do you implement multi-factor authentication for backup system access?",
          guidance: "CISA recommends MFA for backup system access",
          category: 'Recovery' as const,
          controlReference: 'CISA BR 4.2',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BS-3",
          question: "Do you monitor backup systems for unauthorized access?",
          guidance: "CISA recommends monitoring backup systems",
          category: 'Detection' as const,
          controlReference: 'CISA BR 4.3',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BS-4",
          question: "Are backup systems included in vulnerability management processes?",
          guidance: "CISA recommends including backup systems in vulnerability management",
          category: 'Prevention' as const,
          controlReference: 'CISA BR 4.4',
          priority: 'high' as const
        },
        {
          id: "CISA-BR-BS-5",
          question: "Do you maintain separate credentials for backup systems from production credentials?",
          guidance: "CISA recommends separate credentials for backup systems",
          category: 'Prevention' as const,
          controlReference: 'CISA BR 4.5',
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
    return complianceScore;
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
    alert('Results would be displayed here with CISA backup readiness recommendations.');
  };

  const handleExportAssessment = () => {
    // Implementation for exporting assessment data
    alert('Exporting Backup Readiness assessment data to PDF...');
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
              <h1 className="text-3xl font-bold mb-2 text-foreground">Backup Readiness Assessment</h1>
              <p className="text-muted-foreground mb-2">Based on CISA ransomware protection guidance</p>
              <p className="text-sm text-muted-foreground">
                <a href="https://www.cisa.gov/stopransomware/protect-your-network" 
                   className="text-primary hover:underline" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Learn more about CISA's guidance on backups
                </a>
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>CISA Guidance on Backups</CardTitle>
            <CardDescription>
              CISA identifies resilient backups as a critical defense against ransomware
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Why Backup Readiness Matters</h3>
                <p className="text-muted-foreground mb-4">
                  According to CISA, maintaining secure, tested backups is one of the most effective ways to recover from a ransomware attack. This assessment will help you:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Evaluate your backup strategy against CISA recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Identify gaps in your backup implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Assess the security of your backup systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Verify your backup testing and validation procedures</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">CISA 3-2-1 Backup Rule</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
                    <p className="font-medium mb-2">3 - Keep at least three copies of your data</p>
                    <p className="text-sm text-muted-foreground">This includes the original copy and at least two backups</p>
                  </div>
                  <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
                    <p className="font-medium mb-2">2 - Keep the backed-up data on two different storage types</p>
                    <p className="text-sm text-muted-foreground">This protects against different types of hazards</p>
                  </div>
                  <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
                    <p className="font-medium mb-2">1 - Keep at least one copy of the backups offsite</p>
                    <p className="text-sm text-muted-foreground">This protects against physical disasters</p>
                  </div>
                </div>
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
            <CardTitle>CISA Backup Resources</CardTitle>
            <CardDescription>
              Additional resources from CISA on backup and recovery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Ransomware Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA-MS-ISAC joint ransomware guide with backup guidance</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/sites/default/files/publications/data_backup_options_0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Data Backup Options</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA guidance on data backup options</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/stopransomware/protect-your-network"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Network Protection</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA guidance on protecting your network</p>
                  <div className="text-primary text-sm">View Guide</div>
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
              <h1 className="text-3xl font-bold mb-2 text-foreground">Backup Readiness Assessment</h1>
              <p className="text-muted-foreground">Based on CISA guidance for backup and recovery</p>
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
            <CardTitle>CISA Backup Guidance</CardTitle>
            <CardDescription>Best practices from CISA for backup and recovery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Key CISA Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Maintain Offline Backups</p>
                      <p className="text-sm text-muted-foreground">Maintain offline, encrypted backups of critical data and regularly test backups</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Verify Backup Integrity</p>
                      <p className="text-sm text-muted-foreground">Regularly verify the integrity of backups through testing</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Secure Backup Systems</p>
                      <p className="text-sm text-muted-foreground">Protect backup systems with the same level of security as production systems</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Document Recovery Procedures</p>
                      <p className="text-sm text-muted-foreground">Maintain documented recovery procedures that are regularly tested</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <a 
                  href="https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    View CISA Ransomware Guide
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

export default BackupReadinessAssessment;