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
  Save,
  Clock,
  HelpCircle,
  BarChart3,
  FileText,
  RefreshCw,
  Users,
  Settings,
  AlertCircle,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toaster';
import { supabase, assessmentSubmissions } from '../lib/supabase';
import { CISA, CISA_ASSESSMENT_FRAMEWORK, AssessmentQuestion } from '../utils/cisaAssessment';

const IncidentResponsePlanAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Load saved progress on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('incidentResponseAssessment');
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
          localStorage.setItem('incidentResponseAssessment', JSON.stringify({
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
      title: "Incident Response Planning",
      description: "Evaluate your incident response planning and documentation",
      complexity: "Medium",
      estimatedTime: "8-12 min",
      icon: FileText,
      questions: [
        {
          id: "IRP-1",
          question: "Do you have a documented incident response plan?",
          control: "NIST SP 800-61r2 2.3.1 | CSF RS.RP-1",
          guidance: "CISA recommends maintaining a formal incident response plan that defines roles, procedures, and communication protocols",
          category: 'Response' as const,
          controlReference: 'CISA IR 1.1',
          priority: 'critical' as const
        },
        {
          id: "IRP-2",
          question: "Is your incident response plan aligned with industry standards like NIST SP 800-61?",
          control: "NIST SP 800-61r2 | CSF RS.RP-1",
          guidance: "CISA recommends aligning incident response procedures with established frameworks like NIST SP 800-61",
          category: 'Response' as const,
          controlReference: 'CISA IR 1.2',
          priority: 'high' as const
        },
        {
          id: "IRP-3",
          question: "Do you have incident classification and prioritization procedures?",
          control: "NIST SP 800-61r2 2.3.2 | CSF RS.AN-1",
          guidance: "CISA recommends establishing incident classification tiers based on severity and impact",
          category: 'Response' as const,
          controlReference: 'CISA IR 1.3',
          priority: 'high' as const
        },
        {
          id: "IRP-4",
          question: "Is your incident response plan reviewed and updated regularly?",
          control: "NIST SP 800-61r2 2.3.4 | CSF RS.IM-1",
          guidance: "CISA recommends updating your IR plan at least annually and after major incidents",
          category: 'Response' as const,
          controlReference: 'CISA IR 1.4',
          priority: 'medium' as const
        },
        {
          id: "IRP-5",
          question: "Do you have procedures for evidence collection and preservation?",
          control: "NIST SP 800-61r2 3.3.2 | CSF RS.AN-3",
          guidance: "CISA recommends documented procedures for collecting and preserving incident evidence",
          category: 'Response' as const,
          controlReference: 'CISA IR 1.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Incident Response Team",
      description: "Evaluate your incident response team structure and capabilities",
      complexity: "Medium",
      estimatedTime: "8-12 min",
      icon: Users,
      questions: [
        {
          id: "IRT-1",
          question: "Do you have a designated incident response team?",
          control: "NIST SP 800-61r2 2.4.1 | CSF RS.RP-1",
          guidance: "CISA recommends having a dedicated team for incident response with clearly defined roles",
          category: 'Response' as const,
          controlReference: 'CISA IR 2.1',
          priority: 'critical' as const
        },
        {
          id: "IRT-2",
          question: "Are roles and responsibilities clearly defined for incident response?",
          control: "NIST SP 800-61r2 2.4.2 | CSF RS.CO-1",
          guidance: "CISA recommends clearly defined IR roles including incident commander, analysts, and communicators",
          category: 'Response' as const,
          controlReference: 'CISA IR 2.2',
          priority: 'high' as const
        },
        {
          id: "IRT-3",
          question: "Does your incident response team receive specialized training?",
          control: "NIST SP 800-61r2 2.4.3 | CSF PR.AT-1",
          guidance: "CISA recommends regular training for IR team members on current threats and procedures",
          category: 'Response' as const,
          controlReference: 'CISA IR 2.3',
          priority: 'high' as const
        },
        {
          id: "IRT-4",
          question: "Do you have access to external incident response support if needed?",
          control: "NIST SP 800-61r2 2.4.4 | CSF RS.CO-4",
          guidance: "CISA recommends establishing relationships with external IR resources and law enforcement",
          category: 'Response' as const,
          controlReference: 'CISA IR 2.4',
          priority: 'medium' as const
        },
        {
          id: "IRT-5",
          question: "Is there 24/7 availability for incident response team members?",
          control: "NIST SP 800-61r2 2.4.1 | CSF DE.CM-7",
          guidance: "CISA recommends ensuring incident response capabilities are available around the clock",
          category: 'Response' as const,
          controlReference: 'CISA IR 2.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Detection & Analysis",
      description: "Evaluate your incident detection and analysis capabilities",
      complexity: "High",
      estimatedTime: "10-15 min",
      icon: AlertCircle,
      questions: [
        {
          id: "IDA-1",
          question: "Do you have monitoring systems in place to detect security incidents?",
          control: "NIST SP 800-61r2 3.2.1 | CSF DE.CM-1",
          guidance: "CISA recommends comprehensive monitoring for incident detection including SIEM, IDS/IPS",
          category: 'Detection' as const,
          controlReference: 'CISA IR 3.1',
          priority: 'critical' as const
        },
        {
          id: "IDA-2",
          question: "Do you have procedures for incident analysis and validation?",
          control: "NIST SP 800-61r2 3.2.4 | CSF DE.AE-2",
          guidance: "CISA recommends established procedures for analyzing and validating potential incidents",
          category: 'Response' as const,
          controlReference: 'CISA IR 3.2',
          priority: 'high' as const
        },
        {
          id: "IDA-3",
          question: "Do you collect and preserve evidence for incident investigation?",
          control: "NIST SP 800-61r2 3.3.2 | CSF RS.AN-3",
          guidance: "CISA recommends evidence collection and preservation procedures for forensic analysis",
          category: 'Response' as const,
          controlReference: 'CISA IR 3.3',
          priority: 'high' as const
        },
        {
          id: "IDA-4",
          question: "Do you have tools for forensic analysis?",
          control: "NIST SP 800-61r2 3.3.3 | CSF RS.AN-1",
          guidance: "CISA recommends having forensic analysis capabilities for incident investigation",
          category: 'Response' as const,
          controlReference: 'CISA IR 3.4',
          priority: 'medium' as const
        },
        {
          id: "IDA-5",
          question: "Do you maintain threat intelligence feeds to support incident analysis?",
          control: "NIST SP 800-61r2 3.2.2 | CSF DE.AE-5",
          guidance: "CISA recommends using threat intelligence to enhance incident detection and analysis",
          category: 'Detection' as const,
          controlReference: 'CISA IR 3.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Containment & Eradication",
      description: "Evaluate your incident containment and eradication capabilities",
      complexity: "High",
      estimatedTime: "10-15 min",
      icon: Shield,
      questions: [
        {
          id: "ICE-1",
          question: "Do you have documented containment procedures for different types of incidents?",
          control: "NIST SP 800-61r2 3.4.1 | CSF RS.RP-1",
          guidance: "CISA recommends having incident-specific containment procedures (malware, DDoS, insider threat, etc.)",
          category: 'Response' as const,
          controlReference: 'CISA IR 4.1',
          priority: 'critical' as const
        },
        {
          id: "ICE-2",
          question: "Do you have procedures to identify and eradicate root causes of incidents?",
          control: "NIST SP 800-61r2 3.4.2 | CSF RS.MI-2",
          guidance: "CISA recommends procedures for identifying and eliminating root causes to prevent recurrence",
          category: 'Response' as const,
          controlReference: 'CISA IR 4.2',
          priority: 'high' as const
        },
        {
          id: "ICE-3",
          question: "Do you have procedures to validate that incidents have been fully eradicated?",
          control: "NIST SP 800-61r2 3.4.3 | CSF RS.MI-3",
          guidance: "CISA recommends verification procedures to ensure complete incident eradication",
          category: 'Response' as const,
          controlReference: 'CISA IR 4.3',
          priority: 'high' as const
        },
        {
          id: "ICE-4",
          question: "Do you have business continuity procedures during incident handling?",
          control: "NIST SP 800-61r2 3.4.1 | CSF RS.RP-1",
          guidance: "CISA recommends business continuity planning to maintain operations during incidents",
          category: 'Response' as const,
          controlReference: 'CISA IR 4.4',
          priority: 'medium' as const
        },
        {
          id: "ICE-5",
          question: "Can you isolate affected systems without disrupting business operations?",
          control: "NIST SP 800-61r2 3.4.1 | CSF RS.MI-1",
          guidance: "CISA recommends having isolation procedures that minimize business impact",
          category: 'Response' as const,
          controlReference: 'CISA IR 4.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Recovery & Lessons Learned",
      description: "Evaluate your incident recovery and improvement processes",
      complexity: "Medium",
      estimatedTime: "8-12 min",
      icon: Settings,
      questions: [
        {
          id: "IRL-1",
          question: "Do you have documented recovery procedures?",
          control: "NIST SP 800-61r2 3.5.1 | CSF RC.RP-1",
          guidance: "CISA recommends having documented recovery procedures for different incident types",
          category: 'Recovery' as const,
          controlReference: 'CISA IR 5.1',
          priority: 'critical' as const
        },
        {
          id: "IRL-2",
          question: "Do you conduct post-incident reviews after major incidents?",
          control: "NIST SP 800-61r2 3.6.1 | CSF RS.IM-1",
          guidance: "CISA recommends conducting post-incident reviews to identify improvements",
          category: 'Recovery' as const,
          controlReference: 'CISA IR 5.2',
          priority: 'high' as const
        },
        {
          id: "IRL-3",
          question: "Do you update your incident response plan based on lessons learned?",
          control: "NIST SP 800-61r2 3.6.2 | CSF RS.IM-2",
          guidance: "CISA recommends using lessons learned to improve IR processes and procedures",
          category: 'Recovery' as const,
          controlReference: 'CISA IR 5.3',
          priority: 'high' as const
        },
        {
          id: "IRL-4",
          question: "Do you share incident information with relevant stakeholders and authorities?",
          control: "NIST SP 800-61r2 2.3.2 | CSF RS.CO-4",
          guidance: "CISA recommends information sharing with appropriate stakeholders including CISA",
          category: 'Recovery' as const,
          controlReference: 'CISA IR 5.4',
          priority: 'medium' as const
        },
        {
          id: "IRL-5",
          question: "Do you track metrics to measure incident response effectiveness?",
          control: "NIST SP 800-61r2 3.6.1 | CSF RS.IM-1",
          guidance: "CISA recommends tracking metrics like mean time to detection and response",
          category: 'Recovery' as const,
          controlReference: 'CISA IR 5.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Communication & Coordination",
      description: "Evaluate your incident communication and coordination procedures",
      complexity: "Medium",
      estimatedTime: "8-10 min",
      icon: Zap,
      questions: [
        {
          id: "ICC-1",
          question: "Do you have communication templates for different incident types?",
          control: "NIST SP 800-61r2 2.3.2 | CSF RS.CO-2",
          guidance: "CISA recommends pre-written communication templates for consistent messaging",
          category: 'Response' as const,
          controlReference: 'CISA IR 6.1',
          priority: 'high' as const
        },
        {
          id: "ICC-2",
          question: "Do you have escalation procedures for critical incidents?",
          control: "NIST SP 800-61r2 2.3.2 | CSF RS.CO-3",
          guidance: "CISA recommends clear escalation procedures including executive and legal notification",
          category: 'Response' as const,
          controlReference: 'CISA IR 6.2',
          priority: 'high' as const
        },
        {
          id: "ICC-3",
          question: "Do you have procedures for coordinating with law enforcement?",
          control: "NIST SP 800-61r2 2.3.2 | CSF RS.CO-4",
          guidance: "CISA recommends establishing procedures for law enforcement coordination when appropriate",
          category: 'Response' as const,
          controlReference: 'CISA IR 6.3',
          priority: 'medium' as const
        },
        {
          id: "ICC-4",
          question: "Do you have procedures for external communication during incidents?",
          control: "NIST SP 800-61r2 2.3.2 | CSF RS.CO-2",
          guidance: "CISA recommends procedures for communicating with customers, media, and regulators",
          category: 'Response' as const,
          controlReference: 'CISA IR 6.4',
          priority: 'medium' as const
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

  const handleViewResults = async () => {
    setIsLoading(true);
    
    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error('Authentication error', 'Please log in to save your assessment results.');
        setIsLoading(false);
        return;
      }

      // Calculate scores
      const overallScore = getOverallScore();
      const sectionScores = sections.map((section, index) => {
        const score = calculateSectionScore(index);
        return {
          title: section.title,
          percentage: score.percentage,
          completed: score.completed
        };
      });

      // Prepare assessment data
      const assessmentData = {
        user_id: user.id,
        assessment_type: 'incident-response',
        framework_name: 'NIST SP 800-61r2 Incident Response',
        overall_score: overallScore,
        section_scores: sectionScores,
        answers: answers,
        completed_at: new Date().toISOString()
      };

      // Save to Supabase
      const savedAssessment = await assessmentSubmissions.create(assessmentData);
      
      // Clear local storage since we've saved to database
      localStorage.removeItem('incidentResponseAssessment');
      
      toast.success('Assessment saved!', 'Your incident response assessment results have been saved successfully.');
      
      // Navigate to results page with the saved data
      navigate('/incident-response-results', { 
        state: { 
          assessmentResults: savedAssessment 
        } 
      });
      
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Error saving assessment', 'Failed to save your assessment results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    toast.info('Downloading template', 'NIST-aligned incident response assessment template is being prepared for download');
  };

  const handleSaveProgress = () => {
    setIsSaving(true);
    
    localStorage.setItem('incidentResponseAssessment', JSON.stringify({
      answers,
      section: currentSection,
      timestamp: new Date().toISOString()
    }));

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
            Back to Assessments
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Incident Response Plan Assessment</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on NIST SP 800-61r2 Computer Security Incident Handling Guide
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
                    <span className="font-medium">50-75 min</span>
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
                    <span className="text-muted-foreground">Framework:</span>
                    <span className="font-medium">NIST SP 800-61r2</span>
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
                      This assessment follows NIST SP 800-61r2 guidance for incident response. A well-prepared incident response plan can significantly reduce the impact of security incidents and help meet regulatory requirements for incident handling and reporting.
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
                <Users className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Team Readiness</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Evaluate your incident response team structure and training.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in section: Incident Response Team
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Detection & Analysis</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Assess your capabilities to detect and analyze security incidents.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in section: Detection & Analysis
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Response & Recovery</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Evaluate containment, eradication, and recovery procedures.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in sections: Containment & Eradication, Recovery & Lessons Learned
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
              Back to Assessments
            </Link>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">Incident Response Plan Assessment</h1>
                <p className="text-muted-foreground mb-2">Based on NIST SP 800-61r2 Computer Security Incident Handling Guide</p>
                <p className="text-sm text-muted-foreground">Evaluate your organization's incident response capabilities and readiness</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 overflow-x-auto">
            {sections.map((section, index) => {
              const score = calculateSectionScore(index);
              return (
                <Card key={index} className={`p-4 border cursor-pointer transition-shadow hover:shadow-md ${
                  currentSection === index ? 'ring-2 ring-primary' : 'dark:border-muted'
                }`} onClick={() => setCurrentSection(index)}>
                  <h3 className="font-semibold mb-2 text-foreground text-sm">{section.title}</h3>
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
              {sections[currentSection].questions.map((question) => (
                <div key={question.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                      {question.id}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{question.question}</p>
                      <div className="mt-1">
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
                        <p className="text-sm font-medium text-foreground">{question.control}</p>
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
                  disabled={!hasCompletedMinimumSections() || isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">
                        <RefreshCw className="h-4 w-4" />
                      </span>
                      Saving Assessment...
                    </>
                  ) : (
                    <>
                      Save & View Results
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
                    <h4 className="text-sm font-medium text-foreground">Assessment Framework</h4>
                    <p className="text-sm text-muted-foreground">
                      This assessment is based on NIST SP 800-61r2 "Computer Security Incident Handling Guide" 
                      and evaluates your incident response capabilities across six critical areas. Complete all sections 
                      for a comprehensive evaluation of your incident response readiness.
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

export default IncidentResponsePlanAssessment;