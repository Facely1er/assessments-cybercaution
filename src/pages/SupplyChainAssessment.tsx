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
  ExternalLink,
  Save,
  Clock,
  HelpCircle,
  BarChart3,
  FileText,
  RefreshCw,
  Link2,
  Network,
  Building2,
  Users,
  Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toaster';
import { supabase, assessmentSubmissions } from '../lib/supabase';

const SupplyChainAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Load saved progress on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('supplyChainAssessment');
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
          localStorage.setItem('supplyChainAssessment', JSON.stringify({
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
      title: "Supplier Risk Management",
      description: "Evaluate supplier assessment and risk management practices",
      complexity: "Medium",
      estimatedTime: "10-15 min",
      icon: Building2,
      questions: [
        {
          id: "SR-1",
          question: "Do you have a formal process to assess suppliers before onboarding?",
          control: "NIST SP 800-161 2.2.1",
          guidance: "Implement a supplier risk assessment process before establishing relationships"
        },
        {
          id: "SR-2",
          question: "Are security requirements explicitly included in supplier contracts?",
          control: "NIST SP 800-161 2.2.5",
          guidance: "Define and document security requirements in supplier agreements"
        },
        {
          id: "SR-3",
          question: "Do you maintain a prioritized inventory of critical suppliers?",
          control: "NIST SP 800-161 2.2.2",
          guidance: "Identify and document critical suppliers and supply chain elements"
        },
        {
          id: "SR-4",
          question: "Is supplier access to systems, networks, and data monitored and controlled?",
          control: "NIST SP 800-161 2.2.6",
          guidance: "Implement controls for supplier access to organizational systems"
        }
      ]
    },
    {
      title: "Supply Chain Threat Management",
      description: "Evaluate threat detection and management across the supply chain",
      complexity: "High",
      estimatedTime: "12-15 min",
      icon: AlertTriangle,
      questions: [
        {
          id: "TM-1",
          question: "Do you have a process to identify and analyze threats specific to the supply chain?",
          control: "NIST SP 800-161 2.3.1",
          guidance: "Implement threat modeling specific to supply chain risks"
        },
        {
          id: "TM-2",
          question: "Is there a process to verify the integrity and provenance of software components?",
          control: "NIST SP 800-161 3.4.1",
          guidance: "Verify the integrity and authenticity of software and components"
        },
        {
          id: "TM-3",
          question: "Are suppliers required to notify you of security incidents that could affect your organization?",
          control: "NIST SP 800-161 2.2.14",
          guidance: "Establish notification requirements for supply chain incidents"
        },
        {
          id: "TM-4",
          question: "Do you validate that critical components and code are free of tampering before use?",
          control: "NIST SP 800-161 3.3.1",
          guidance: "Implement component validation processes before deployment"
        }
      ]
    },
    {
      title: "Vulnerability Management",
      description: "Evaluate vulnerability management processes across the supply chain",
      complexity: "Medium",
      estimatedTime: "10-12 min",
      icon: Shield,
      questions: [
        {
          id: "VM-1",
          question: "Do you have a process to regularly assess vulnerabilities in supply chain components?",
          control: "NIST SP 800-161 3.4.2",
          guidance: "Implement vulnerability scanning for supply chain components"
        },
        {
          id: "VM-2",
          question: "Are vulnerability management responsibilities defined between your organization and suppliers?",
          control: "NIST SP 800-161 2.7.1",
          guidance: "Define and document responsibilities for vulnerability management"
        },
        {
          id: "VM-3",
          question: "Is there a process to verify that suppliers address identified vulnerabilities?",
          control: "NIST SP 800-161 2.7.3",
          guidance: "Implement supplier vulnerability remediation tracking"
        },
        {
          id: "VM-4",
          question: "Do you maintain contingency plans for critical component vulnerabilities?",
          control: "NIST SP 800-161 3.6.2",
          guidance: "Develop contingency plans for addressing critical vulnerabilities"
        }
      ]
    },
    {
      title: "Information Sharing",
      description: "Evaluate information sharing practices with supply chain partners",
      complexity: "Low",
      estimatedTime: "8-10 min",
      icon: Link2,
      questions: [
        {
          id: "IS-1",
          question: "Do you have formal processes for sharing security information with suppliers?",
          control: "NIST SP 800-161 3.8.1",
          guidance: "Establish secure information sharing practices with suppliers"
        },
        {
          id: "IS-2",
          question: "Are there confidentiality agreements in place for sharing sensitive information?",
          control: "NIST SP 800-161 3.8.3",
          guidance: "Implement confidentiality protections for shared information"
        },
        {
          id: "IS-3",
          question: "Is there a process for suppliers to report potential supply chain risks to your organization?",
          control: "NIST SP 800-161 3.8.5",
          guidance: "Establish channel for suppliers to report potential risks or issues"
        },
        {
          id: "IS-4",
          question: "Do you participate in information sharing communities for supply chain threats?",
          control: "NIST SP 800-161 3.8.6",
          guidance: "Participate in supply chain threat intelligence sharing"
        }
      ]
    },
    {
      title: "Incident Response",
      description: "Evaluate incident response capabilities for supply chain disruptions",
      complexity: "High",
      estimatedTime: "12-15 min",
      icon: AlertTriangle,
      questions: [
        {
          id: "IR-1",
          question: "Do you have an incident response plan specifically addressing supply chain incidents?",
          control: "NIST SP 800-161 2.8.4",
          guidance: "Develop and maintain supply chain incident response plans"
        },
        {
          id: "IR-2",
          question: "Are roles and responsibilities defined for supply chain incidents?",
          control: "NIST SP 800-161 2.8.5",
          guidance: "Define roles and responsibilities for supply chain incident response"
        },
        {
          id: "IR-3",
          question: "Do you conduct exercises that include supply chain incident scenarios?",
          control: "NIST SP 800-161 2.8.8",
          guidance: "Test incident response capabilities with supply chain scenarios"
        },
        {
          id: "IR-4",
          question: "Are there communication plans for notifying stakeholders of supply chain incidents?",
          control: "NIST SP 800-161 2.8.9",
          guidance: "Establish communication procedures for supply chain incidents"
        }
      ]
    },
    {
      title: "Supplier Lifecycle Management",
      description: "Evaluate supplier management throughout the relationship lifecycle",
      complexity: "Medium",
      estimatedTime: "10-12 min",
      icon: Settings,
      questions: [
        {
          id: "SL-1",
          question: "Do you perform periodic reassessments of existing suppliers?",
          control: "NIST SP 800-161 2.2.16",
          guidance: "Implement a process for regular supplier reassessments"
        },
        {
          id: "SL-2",
          question: "Is there a formal offboarding process for suppliers to prevent security issues?",
          control: "NIST SP 800-161 2.2.17",
          guidance: "Establish secure supplier offboarding procedures"
        },
        {
          id: "SL-3",
          question: "Do you maintain alternate suppliers for critical components or services?",
          control: "NIST SP 800-161 2.6.3",
          guidance: "Identify and maintain alternate supply chain paths for critical elements"
        },
        {
          id: "SL-4",
          question: "Are there transition plans for critical supplier changes?",
          control: "NIST SP 800-161 2.6.4",
          guidance: "Develop transition plans for critical supplier changes"
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
        assessment_type: 'supply-chain',
        framework_name: 'NIST SP 800-161 Supply Chain Risk Management',
        overall_score: overallScore,
        section_scores: sectionScores,
        answers: answers,
        completed_at: new Date().toISOString()
      };

      // Save to Supabase
      const savedAssessment = await assessmentSubmissions.create(assessmentData);
      
      // Clear local storage since we've saved to database
      localStorage.removeItem('supplyChainAssessment');
      
      toast.success('Assessment saved!', 'Your supply chain assessment results have been saved successfully.');
      
      // Navigate to results page with the saved data
      navigate('/supply-chain-results', { 
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
    toast.info('Downloading template', 'NIST-aligned supply chain assessment template is being prepared for download');
  };

  const handleSaveProgress = () => {
    setIsSaving(true);
    
    localStorage.setItem('supplyChainAssessment', JSON.stringify({
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Supply Chain Risk Assessment</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on NIST SP 800-161 Supply Chain Risk Management Practices
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
                    <span className="font-medium">{getTotalEstimatedTime()}-{getTotalEstimatedTime() + 10} min</span>
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
                    <span className="font-medium">NIST SP 800-161</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowStartScreen(false)} 
                className="w-full"
                size="lg"
                variant="orange"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-4">
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 text-primary mr-2" />
                    <a 
                      href="https://vendortal.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      For comprehensive supply chain assessments, visit VendorTal
                    </a>
                  </div>
                </div>
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
                      This assessment follows NIST's supply chain risk management practices outlined in SP 800-161. 
                      By completing it, you'll identify specific gaps in your supply chain security and receive 
                      tailored recommendations to strengthen your defenses against supply chain attacks and disruptions.
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
                <Building2 className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Supplier Management</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Evaluate your supplier assessment and risk management processes.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in sections: Supplier Risk Management, Supplier Lifecycle Management
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Threat Management</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Assess threat detection and vulnerability management across your supply chain.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in sections: Supply Chain Threat Management, Vulnerability Management
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-medium">Incident Response</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Evaluate incident response capabilities for supply chain disruptions.
              </p>
              <div className="text-xs text-muted-foreground">
                Covered in sections: Incident Response, Information Sharing
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
                <h1 className="text-3xl font-bold mb-2 text-foreground">Supply Chain Risk Assessment</h1>
                <p className="text-muted-foreground mb-6">Based on NIST SP 800-161 Supply Chain Risk Management Practices</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {sections.map((section, index) => {
              const score = calculateSectionScore(index);
              return (
                <Card key={index} className="p-4 border dark:border-muted">
                  <h3 className="font-semibold mb-2 text-foreground">{section.title}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Score: {score.percentage}%</p>
                      <p className="text-sm text-muted-foreground">
                        {score.completed ? 'Complete' : 'Incomplete'}
                      </p>
                    </div>
                    <Button
                      variant={currentSection === index ? 'orange' : 'outline'}
                      onClick={() => setCurrentSection(index)}
                      size="sm"
                    >
                      {currentSection === index ? 'Current' : 'View'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-6 border dark:border-muted">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{sections[currentSection].title}</h2>
                <p className="text-muted-foreground">{sections[currentSection].description}
                </p>
              </div>
              <div className="text-xl font-semibold text-foreground">
                Overall Score: {getOverallScore()}%
              </div>
            </div>

            <div className="space-y-6">
              {sections[currentSection].questions.map((question) => (
                <div key={question.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                      {question.id}
                    </div>
                    <p className="font-medium text-foreground flex-1">{question.question}</p>
                  </div>
                  
                  <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded mb-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{question.control}</p>
                        <p className="text-sm text-muted-foreground">{question.guidance}</p>
                      </div>
                    </div>
                  </div>
                  
                  {renderAnswerButtons(question.id)}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
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
                  variant="orange"
                >
                  Next Section
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleViewResults}
                  disabled={!hasCompletedMinimumSections() || isLoading}
                  className="flex items-center gap-2"
                  variant="orange"
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
          
          <div className="mt-8 p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-muted-foreground">
              For comprehensive supply chain risk management solutions, visit 
              <a 
                href="https://vendortal.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                VendorTal.com
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SupplyChainAssessment;