import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
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
  Save,
  Clock,
  HelpCircle,
  BarChart3,
  FileText,
  RefreshCw,
  Users,
  Lock,
  Database
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toaster';

const RansomwareAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Load saved progress on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('ransomwareAssessment');
    if (savedProgress) {
      try {
        const { answers: savedAnswers, section } = JSON.parse(savedProgress);
        setAnswers(savedAnswers || {});
        setCurrentSection(section || 0);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Error loading saved progress', error);
      }
    }
  }, []);

  // Autosave progress when answers or current section changes
  useEffect(() => {
    const saveProgress = async () => {
      if (Object.keys(answers).length > 0) {
        setIsSaving(true);
        try {
          localStorage.setItem('ransomwareAssessment', JSON.stringify({
            answers,
            section: currentSection,
            timestamp: new Date().toISOString()
          }));
          setLastSaved(new Date());
        } catch (error) {
          console.error('Error saving progress', error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    const timer = setTimeout(saveProgress, 2000);
    return () => clearTimeout(timer);
  }, [answers, currentSection]);

  const sections = [
    {
      title: "Risk Management",
      description: "Ransomware risk management and governance",
      complexity: "Medium",
      estimatedTime: "5-10 min",
      icon: Shield,
      questions: [
        {
          id: "RM-1",
          question: "Has your organization performed a ransomware-specific risk assessment?",
          control: "NIST IR 8374 2.1 | CSF ID.RA-1",
          guidance: "Perform a ransomware-specific risk assessment aligned with CSF Identify function"
        },
        {
          id: "RM-2",
          question: "Are ransomware risks included in your overall cybersecurity risk register?",
          control: "NIST IR 8374 2.1.1 | CSF ID.RM-1",
          guidance: "Integrate ransomware risks into enterprise risk management processes"
        },
        {
          id: "RM-3",
          question: "Have you identified critical systems and data that would be high-value ransomware targets?",
          control: "NIST IR 8374 2.1.2 | CSF ID.AM-5",
          guidance: "Identify and prioritize critical systems and data according to criticality and business value"
        },
        {
          id: "RM-4",
          question: "Do you have a specific ransomware prevention strategy with executive support?",
          control: "NIST IR 8374 2.1.3 | CSF ID.GV-1",
          guidance: "Develop and maintain a comprehensive ransomware prevention strategy with leadership support"
        },
        {
          id: "RM-5",
          question: "Are third-party and supply chain ransomware risks evaluated?",
          control: "NIST IR 8374 2.1.4 | CSF ID.SC-2",
          guidance: "Assess ransomware risks from third-party suppliers and business partners"
        }
      ]
    },
    {
      title: "Identity Management & Access Control",
      description: "Authentication and access control practices",
      complexity: "High",
      estimatedTime: "5-10 min",
      icon: Lock,
      questions: [
        {
          id: "AC-1",
          question: "Is multi-factor authentication (MFA) implemented for all remote access?",
          control: "NIST IR 8374 2.2.1 | CSF PR.AC-1",
          guidance: "Implement MFA for all remote access to enterprise resources"
        },
        {
          id: "AC-2",
          question: "Is MFA implemented for all privileged user accounts?",
          control: "NIST IR 8374 2.2.2 | CSF PR.AC-4",
          guidance: "Require MFA for all administrators and privileged users"
        },
        {
          id: "AC-3",
          question: "Are privileged accounts managed with just-enough and just-in-time access principles?",
          control: "NIST IR 8374 2.2.3 | CSF PR.AC-4",
          guidance: "Implement just-in-time and just-enough access for privileges"
        },
        {
          id: "AC-4",
          question: "Do you regularly audit user accounts and remove unused accounts?",
          control: "NIST IR 8374 2.2.4 | CSF PR.AC-1",
          guidance: "Regularly audit and remove unnecessary accounts"
        },
        {
          id: "AC-5",
          question: "Are administrator accounts separated from user accounts?",
          control: "NIST IR 8374 2.2.5 | CSF PR.AC-4",
          guidance: "Maintain separation between user and administrator accounts to limit privilege escalation"
        }
      ]
    },
    {
      title: "Protective Technology",
      description: "Technical controls to prevent ransomware",
      complexity: "High",
      estimatedTime: "5-10 min",
      icon: Shield,
      questions: [
        {
          id: "PT-1",
          question: "Do you maintain offline, encrypted backups of data?",
          control: "NIST IR 8374 2.3.1 | CSF PR.IP-4",
          guidance: "Maintain offline, encrypted backups of critical data with integrity verification"
        },
        {
          id: "PT-2",
          question: "Is anti-malware/anti-ransomware software deployed and kept updated?",
          control: "NIST IR 8374 2.3.2 | CSF PR.DS-5",
          guidance: "Deploy and maintain anti-malware solutions that include ransomware protection"
        },
        {
          id: "PT-3",
          question: "Are all operating systems and applications kept updated with security patches?",
          control: "NIST IR 8374 2.3.3 | CSF PR.IP-12",
          guidance: "Implement a vulnerability management program with timely patching"
        },
        {
          id: "PT-4",
          question: "Do you use application allowlisting to prevent unauthorized code execution?",
          control: "NIST IR 8374 2.3.4 | CSF PR.PT-3",
          guidance: "Implement application allowlisting to prevent unauthorized code execution"
        },
        {
          id: "PT-5",
          question: "Are network segments isolated to limit lateral movement?",
          control: "NIST IR 8374 2.3.5 | CSF PR.AC-5",
          guidance: "Implement network segmentation and micro-segmentation to limit propagation"
        }
      ]
    },
    {
      title: "Email & Phishing Defense",
      description: "Controls to prevent phishing-based ransomware attacks",
      complexity: "Medium",
      estimatedTime: "4-8 min",
      icon: Shield,
      questions: [
        {
          id: "EP-1",
          question: "Is email filtering technology implemented to detect malicious attachments and links?",
          control: "NIST IR 8374 2.4.1 | CSF PR.DS-2",
          guidance: "Implement email filtering and scanning solutions to detect malware and phishing"
        },
        {
          id: "EP-2",
          question: "Do you block macros in documents from the internet?",
          control: "NIST IR 8374 2.4.2 | CSF PR.PT-3",
          guidance: "Block or restrict macros from Internet-sourced documents"
        },
        {
          id: "EP-3",
          question: "Are users trained regularly on phishing awareness?",
          control: "NIST IR 8374 2.4.3 | CSF PR.AT-1",
          guidance: "Conduct regular phishing awareness training and simulations"
        },
        {
          id: "EP-4",
          question: "Do you have a process for users to report suspicious emails?",
          control: "NIST IR 8374 2.4.4 | CSF DE.CM-8",
          guidance: "Establish a streamlined process for reporting suspicious emails and phishing attempts"
        }
      ]
    },
    {
      title: "Detection & Monitoring",
      description: "Capabilities to detect ransomware activity",
      complexity: "High",
      estimatedTime: "5-10 min",
      icon: AlertTriangle,
      questions: [
        {
          id: "DM-1",
          question: "Do you have monitoring in place to detect unusual file activity (encryption, renaming)?",
          control: "NIST IR 8374 2.5.1 | CSF DE.CM-1",
          guidance: "Monitor for mass file changes and encryption attempts characteristic of ransomware"
        },
        {
          id: "DM-2",
          question: "Are system logs centralized and monitored for suspicious activities?",
          control: "NIST IR 8374 2.5.2 | CSF DE.CM-6",
          guidance: "Implement centralized logging and monitoring with ransomware-specific detection rules"
        },
        {
          id: "DM-3",
          question: "Do you monitor for unauthorized encryption tools or processes?",
          control: "NIST IR 8374 2.5.3 | CSF DE.CM-4",
          guidance: "Monitor for unauthorized encryption processes or tools that may indicate ransomware"
        },
        {
          id: "DM-4",
          question: "Is there a 24/7 monitoring capability for ransomware detection?",
          control: "NIST IR 8374 2.5.4 | CSF DE.CM-7",
          guidance: "Establish continuous security monitoring for ransomware indicators"
        },
        {
          id: "DM-5",
          question: "Do you conduct regular vulnerability scanning for ransomware vulnerabilities?",
          control: "NIST IR 8374 2.5.5 | CSF DE.CM-8",
          guidance: "Perform regular vulnerability scanning with focus on ransomware vectors"
        }
      ]
    },
    {
      title: "Incident Response & Recovery",
      description: "Readiness to respond to ransomware incidents",
      complexity: "High",
     estimatedTime: "6-12 min",
      icon: RefreshCw,
      questions: [
        {
          id: "IR-1",
          question: "Do you have a ransomware-specific incident response plan?",
          control: "NIST IR 8374 2.6.1 | CSF RS.RP-1",
          guidance: "Develop a ransomware-specific incident response plan that defines roles and procedures"
        },
        {
          id: "IR-2",
          question: "Are backups tested regularly to ensure they can be successfully restored?",
          control: "NIST IR 8374 2.6.2 | CSF RC.RP-1",
          guidance: "Test backup restoration procedures regularly to verify integrity and reliability"
        },
        {
          id: "IR-3",
          question: "Do you conduct tabletop exercises for ransomware scenarios?",
          control: "NIST IR 8374 2.6.3 | CSF PR.IP-10",
          guidance: "Conduct exercises simulating ransomware incidents to test response capabilities"
        },
        {
          id: "IR-4",
          question: "Is there a clear decision-making framework for ransomware response?",
          control: "NIST IR 8374 2.6.4 | CSF RS.CO-1",
          guidance: "Establish clear incident decision-making processes including ransom payment considerations"
        },
        {
          id: "IR-5",
          question: "Do you have offline copies of recovery procedures?",
          control: "NIST IR 8374 2.6.5 | CSF RC.CO-3",
          guidance: "Maintain offline, accessible recovery documentation that cannot be compromised in an attack"
        },
        {
          id: "IR-6",
          question: "Is there a communication plan for internal and external stakeholders during an incident?",
          control: "NIST IR 8374 2.6.6 | CSF RS.CO-4",
          guidance: "Develop communication templates and procedures for ransomware incidents"
        }
      ]
    },
    {
      title: "Tabletop Exercise Readiness",
      description: "Preparation for ransomware tabletop exercises",
      complexity: "Medium",
     estimatedTime: "5-10 min",
      icon: Users,
      questions: [
        {
          id: "TT-1",
          question: "Have you conducted a ransomware-specific tabletop exercise in the past 12 months?",
          control: "NIST IR 8374 | CSF PR.IP-10",
          guidance: "Regularly conduct tabletop exercises specifically focused on ransomware scenarios"
        },
        {
          id: "TT-2",
          question: "Does your tabletop exercise include both technical and business stakeholders?",
          control: "NIST IR 8374 | CSF PR.IP-10",
          guidance: "Include representatives from IT, security, legal, communications, and executive leadership"
        },
        {
          id: "TT-3",
          question: "Do your exercises include scenarios based on current ransomware tactics?",
          control: "NIST IR 8374 | CSF PR.IP-10",
          guidance: "Update exercise scenarios based on current threat intelligence and TTPs"
        },
        {
          id: "TT-4",
          question: "Are lessons learned from exercises documented and used to improve defenses?",
          control: "NIST IR 8374 | CSF PR.IP-10",
          guidance: "Document findings and implement improvements based on exercise results"
        },
        {
          id: "TT-5",
          question: "Do exercises include decision points about ransom payment considerations?",
          control: "NIST IR 8374 | CSF RS.CO-1",
          guidance: "Practice decision-making processes for potential ransom payment scenarios"
        }
      ]
    }
  ];

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
    let totalScore = 0;
    let totalPossible = 0;

    sections.forEach((_, index) => {
      const sectionScore = calculateSectionScore(index);
      totalScore += sectionScore.score;
      totalPossible += sectionScore.total;
    });

    return Math.round((totalScore / totalPossible) * 100);
  };

  const renderAnswerButtons = (questionId: string) => {
    const currentAnswer = answers[questionId];
    
    return (
      <div className="flex gap-2 mt-2">
        <Button
          variant={currentAnswer === 'yes' ? 'orange' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'yes')}
          className="flex items-center gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Yes
        </Button>
        <Button
          variant={currentAnswer === 'partial' ? 'orange' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'partial')}
          className="flex items-center gap-1"
        >
          <Circle className="w-4 h-4" />
          Partial
        </Button>
        <Button
          variant={currentAnswer === 'no' ? 'orange' : 'outline'}
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
    setIsLoading(true);
    
    // In a real application, you would save the assessment results to a backend here
    setTimeout(() => {
      navigate('/ransomware-results');
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadTemplate = () => {
    toast.info('Downloading template', 'NIST-aligned ransomware assessment template is being prepared for download');
    // In a real application, this would download a template
  };

  const handleSaveProgress = () => {
    setIsSaving(true);
    
    // Save to local storage
    localStorage.setItem('ransomwareAssessment', JSON.stringify({
      answers,
      section: currentSection,
      timestamp: new Date().toISOString()
    }));

    // Show success message
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      toast.success('Progress saved', 'Your assessment progress has been saved');
    }, 800);
  };

  const getTotalEstimatedTime = () => {
    return sections.reduce((total, section) => {
      const timeRange = section.estimatedTime.split('-');
      const maxTime = parseInt(timeRange[1] || timeRange[0]);
      return total + maxTime;
    }, 0);
  };

  const getComplexityLevel = (complexity: string) => {
    switch(complexity) {
      case 'Low':
        return <span className="text-secure-green flex items-center"><Circle className="h-2 w-2 mr-1" /> Low</span>;
      case 'Medium':
        return <span className="text-warning-amber flex items-center"><Circle className="h-2 w-2 mr-1" /><Circle className="h-2 w-2 mr-1" /> Medium</span>;
      case 'High':
        return <span className="text-critical-red flex items-center"><Circle className="h-2 w-2 mr-1" /><Circle className="h-2 w-2 mr-1" /><Circle className="h-2 w-2 mr-1" /> High</span>;
      default:
        return <span className="text-muted-foreground">Unknown</span>;
    }
  };

  const renderStartScreen = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/assessments" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ransomware Readiness Assessment</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on NIST IR 8374 and NIST Cybersecurity Framework v2.0
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="md:col-span-1 bg-muted/10">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Clock className="h-12 w-12 text-primary mb-3" />
                <h2 className="text-xl font-semibold mb-2">Assessment Overview</h2>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated time:</span>
                    <span className="font-medium">35-70 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total sections:</span>
                    <span className="font-medium">{sections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total questions:</span>
                    <span className="font-medium">{sections.reduce((sum, section) => sum + section.questions.length, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frameworks:</span>
                    <span className="font-medium">NIST CSF, NIST IR 8374</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowStartScreen(false)} 
                className="w-full"
                size="lg"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Assessment Categories</h2>
              <div className="space-y-5">
                {sections.map((section, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 hover:bg-muted/20 rounded-lg transition-colors">
                    <div className="bg-primary/10 rounded-full p-2">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{section.description}</p>
                      <div className="flex flex-wrap text-xs gap-x-4">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span>{section.estimatedTime}</span>
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span>Complexity: {getComplexityLevel(section.complexity)}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span>{section.questions.length} questions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Why This Assessment Matters</h3>
                    <p className="text-sm text-muted-foreground">
                      This assessment follows NIST's recommended controls for ransomware protection. By completing it, you'll identify specific gaps in your defenses and receive tailored recommendations aligned with NIST frameworks to strengthen your ransomware resilience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Offline Backups</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Evaluate your backup strategies and recovery capabilities.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in sections: Protective Technology, Incident Response & Recovery
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Lock className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Access Controls</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Assess authentication and authorization protections.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in section: Identity Management & Access Control
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Response Planning</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Evaluate incident response capabilities and exercises.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in sections: Incident Response & Recovery, Tabletop Exercise Readiness
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showStartScreen ? (
        renderStartScreen()
      ) : (
        <>
          <div className="mb-6">
            <Link to="/assessments" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">Ransomware Readiness Assessment</h1>
                <p className="text-muted-foreground mb-2">Based on NIST IR 8374 and NIST Cybersecurity Framework</p>
                <p className="text-sm text-muted-foreground">Complete this assessment to evaluate your organization's ransomware defense posture</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveProgress} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Progress'}
                </Button>
                <Button variant="outline" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8 overflow-x-auto">
            {sections.map((section, index) => {
              const score = calculateSectionScore(index);
              return (
                <Card key={index} className={`p-4 border cursor-pointer transition-shadow hover:shadow-md ${
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
                Overall Score: {getOverallScore()}%
              </div>
            </div>

            <div className="space-y-8">
              {sections[currentSection].questions.map((question) => {
                const csfCategory = getCsfCategory(question.control);
                return (
                  <div key={question.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                        {question.id}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{question.question}</p>
                        {csfCategory && (
                          <div className="mt-1">
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                              NIST CSF: {csfCategory}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded mb-3 ml-9">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{question.control}</p>
                          <p className="text-sm text-muted-foreground">{question.guidance}</p>
                        </div>
                        <div className="ml-auto self-start">
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-9">
                      {renderAnswerButtons(question.id)}
                    </div>
                  </div>
                );
              })}
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
                  disabled={!hasCompletedMinimumSections() || isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">
                        <RefreshCw className="h-4 w-4" />
                      </span>
                      Processing...
                    </>
                  ) : (
                    <>
                      View Results
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
          
          {/* Progress Overview */}
          <Card className="border dark:border-muted">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Assessment Progress</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <span className="font-medium mr-2">{getOverallScore()}% Complete</span>
                  <BarChart3 className="h-4 w-4" />
                </div>
              </div>
              
              <div className="space-y-4">
                {sections.map((section, index) => {
                  const score = calculateSectionScore(index);
                  return (
                    <div key={index} onClick={() => setCurrentSection(index)} className="cursor-pointer">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-foreground">{section.title}</span>
                          {score.completed && <CheckCircle className="ml-2 h-3.5 w-3.5 text-secure-green" />}
                        </div>
                        <span className="text-sm font-medium">{score.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            score.percentage >= 80 ? 'bg-secure-green' :
                            score.percentage >= 60 ? 'bg-warning-amber' :
                            score.percentage > 0 ? 'bg-critical-red' : 'bg-muted'
                          }`}
                          style={{ width: `${score.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Assessment Info</h4>
                    <p className="text-sm text-muted-foreground">
                      This assessment is based on NIST IR 8374 "Cybersecurity Framework Profile for Ransomware Risk Management" 
                      and maps to NIST CSF controls. Complete all sections for a comprehensive evaluation of your ransomware readiness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

const getCsfCategory = (controlRef: string) => {
  if (!controlRef.includes('CSF')) return null;
  
  const csfPart = controlRef.split('CSF')[1].trim();
  const category = csfPart.split('.')[0];
  
  switch (category) {
    case 'ID': return 'Identify';
    case 'PR': return 'Protect';
    case 'DE': return 'Detect';
    case 'RS': return 'Respond';
    case 'RC': return 'Recover';
    default: return null;
  }
};

export default RansomwareAssessment;