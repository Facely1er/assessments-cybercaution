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
  ExternalLink,
  Lock,
  User,
  Network,
  Globe,
  Database
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toaster';
import { supabase, assessmentSubmissions } from '../lib/supabase';
import { CISA, CISA_ASSESSMENT_FRAMEWORK, AssessmentQuestion } from '../utils/cisaAssessment';

const ZeroTrustMaturityAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [complianceScore, setComplianceScore] = useState(0);
  const [maturityLevel, setMaturityLevel] = useState('Traditional');
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Load saved progress on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('zeroTrustAssessment');
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
          localStorage.setItem('zeroTrustAssessment', JSON.stringify({
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

  // CISA Zero Trust Maturity Assessment sections
  const sections = [
    {
      title: "Identity Pillar",
      description: "Evaluate authentication and identity management controls",
      icon: User,
      questions: [
        {
          id: "CISA-ZT-ID-1",
          question: "Do you enforce multi-factor authentication for all users?",
          guidance: "CISA recommends MFA for all users accessing resources",
          category: 'Prevention' as const,
          controlReference: 'Identity.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-ZT-ID-2",
          question: "Do you implement risk-based access controls for all applications?",
          guidance: "CISA recommends adaptive, risk-based access decisions",
          category: 'Prevention' as const,
          controlReference: 'Identity.2',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-ID-3",
          question: "Do you implement centralized identity management across all systems?",
          guidance: "CISA recommends centralized identity governance",
          category: 'Prevention' as const,
          controlReference: 'Identity.3',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-ID-4",
          question: "Do you enforce the principle of least privilege for all identities?",
          guidance: "CISA recommends enforcing least privilege access",
          category: 'Prevention' as const,
          controlReference: 'Identity.4',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-ID-5",
          question: "Do you regularly review and validate all identity and access privileges?",
          guidance: "CISA recommends continuous validation of identity privileges",
          category: 'Prevention' as const,
          controlReference: 'Identity.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Device Pillar",
      description: "Evaluate device security and management",
      icon: Lock,
      questions: [
        {
          id: "CISA-ZT-DEV-1",
          question: "Do you have a complete and continuously updated inventory of all devices?",
          guidance: "CISA recommends comprehensive device inventory",
          category: 'Prevention' as const,
          controlReference: 'Device.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-ZT-DEV-2",
          question: "Do you implement device health checks before granting access to resources?",
          guidance: "CISA recommends device posture checking for access",
          category: 'Prevention' as const,
          controlReference: 'Device.2',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-DEV-3",
          question: "Do you enforce device compliance policies for all endpoints?",
          guidance: "CISA recommends enforcing security compliance on all devices",
          category: 'Prevention' as const,
          controlReference: 'Device.3',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-DEV-4",
          question: "Do you have centralized device management for all endpoint types?",
          guidance: "CISA recommends centralized management of all devices",
          category: 'Prevention' as const,
          controlReference: 'Device.4',
          priority: 'medium' as const
        },
        {
          id: "CISA-ZT-DEV-5",
          question: "Do you maintain continuous monitoring of device security posture?",
          guidance: "CISA recommends continuous monitoring of device security",
          category: 'Detection' as const,
          controlReference: 'Device.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Network Pillar",
      description: "Evaluate network security and segmentation",
      icon: Network,
      questions: [
        {
          id: "CISA-ZT-NET-1",
          question: "Have you implemented network micro-segmentation?",
          guidance: "CISA recommends network micro-segmentation to limit lateral movement",
          category: 'Prevention' as const,
          controlReference: 'Network.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-ZT-NET-2",
          question: "Do you encrypt all network traffic between systems?",
          guidance: "CISA recommends encrypting all network communications",
          category: 'Prevention' as const,
          controlReference: 'Network.2',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-NET-3",
          question: "Do you enforce access controls at the network level for all resources?",
          guidance: "CISA recommends network-level access controls",
          category: 'Prevention' as const,
          controlReference: 'Network.3',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-NET-4",
          question: "Do you monitor all network traffic for suspicious activities?",
          guidance: "CISA recommends continuous network traffic monitoring",
          category: 'Detection' as const,
          controlReference: 'Network.4',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-NET-5",
          question: "Have you eliminated trust based on network location?",
          guidance: "CISA recommends removing implicit trust based on network location",
          category: 'Prevention' as const,
          controlReference: 'Network.5',
          priority: 'high' as const
        }
      ]
    },
    {
      title: "Application Pillar",
      description: "Evaluate application security controls",
      icon: Globe,
      questions: [
        {
          id: "CISA-ZT-APP-1",
          question: "Do you implement access controls at the application level?",
          guidance: "CISA recommends application-level access controls",
          category: 'Prevention' as const,
          controlReference: 'Application.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-ZT-APP-2",
          question: "Do you continuously test and validate application security?",
          guidance: "CISA recommends continuous application security testing",
          category: 'Prevention' as const,
          controlReference: 'Application.2',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-APP-3",
          question: "Do you implement security controls in the CI/CD pipeline?",
          guidance: "CISA recommends integrating security in the development process",
          category: 'Prevention' as const,
          controlReference: 'Application.3',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-APP-4",
          question: "Do you monitor applications for anomalous behavior?",
          guidance: "CISA recommends behavioral monitoring of applications",
          category: 'Detection' as const,
          controlReference: 'Application.4',
          priority: 'medium' as const
        },
        {
          id: "CISA-ZT-APP-5",
          question: "Do you maintain an inventory of all applications and their security status?",
          guidance: "CISA recommends maintaining application inventory",
          category: 'Prevention' as const,
          controlReference: 'Application.5',
          priority: 'medium' as const
        }
      ]
    },
    {
      title: "Data Pillar",
      description: "Evaluate data security and protection",
      icon: Database,
      questions: [
        {
          id: "CISA-ZT-DAT-1",
          question: "Have you classified data based on sensitivity and implemented appropriate controls?",
          guidance: "CISA recommends data classification and corresponding controls",
          category: 'Prevention' as const,
          controlReference: 'Data.1',
          priority: 'critical' as const
        },
        {
          id: "CISA-ZT-DAT-2",
          question: "Do you encrypt sensitive data at rest?",
          guidance: "CISA recommends encrypting sensitive data at rest",
          category: 'Prevention' as const,
          controlReference: 'Data.2',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-DAT-3",
          question: "Do you encrypt sensitive data in transit?",
          guidance: "CISA recommends encrypting sensitive data in transit",
          category: 'Prevention' as const,
          controlReference: 'Data.3',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-DAT-4",
          question: "Do you implement data access controls based on need-to-know?",
          guidance: "CISA recommends strict need-to-know data access controls",
          category: 'Prevention' as const,
          controlReference: 'Data.4',
          priority: 'high' as const
        },
        {
          id: "CISA-ZT-DAT-5",
          question: "Do you monitor for unauthorized data access or exfiltration?",
          guidance: "CISA recommends monitoring for unauthorized data access",
          category: 'Detection' as const,
          controlReference: 'Data.5',
          priority: 'high' as const
        }
      ]
    }
  ];

  // Update compliance score when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const allQuestions = sections.flatMap(section => section.questions) as AssessmentQuestion[];
      const framework = CISA.frameworks.ZERO_TRUST_MATURITY;
      
      const score = CISA.calculateScore(answers, framework, allQuestions);
      setComplianceScore(score);
      
      // Determine maturity level based on score
      if (score >= 80) {
        setMaturityLevel('Optimal');
      } else if (score >= 50) {
        setMaturityLevel('Advanced');
      } else {
        setMaturityLevel('Traditional');
      }
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
        assessment_type: 'zero-trust',
        framework_name: 'CISA Zero Trust Maturity Model',
        overall_score: overallScore,
        section_scores: sectionScores,
        answers: answers,
        completed_at: new Date().toISOString()
      };

      // Save to Supabase
      const savedAssessment = await assessmentSubmissions.create(assessmentData);
      
      // Clear local storage since we've saved to database
      localStorage.removeItem('zeroTrustAssessment');
      
      toast.success('Assessment saved!', 'Your Zero Trust maturity assessment results have been saved successfully.');
      
      // Navigate to results page with the saved data
      navigate('/zero-trust-maturity-results', { 
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

  const handleExportAssessment = () => {
    toast.info('Downloading template', 'CISA-aligned Zero Trust assessment template is being prepared for download');
  };

  const handleSaveProgress = () => {
    setIsSaving(true);
    
    localStorage.setItem('zeroTrustAssessment', JSON.stringify({
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

  const renderStartScreen = () => {
    return (
      <>
        <div className="mb-6">
          <Link to="/assessments" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">Zero Trust Maturity Assessment</h1>
              <p className="text-muted-foreground mb-2">Based on CISA's Zero Trust Maturity Model</p>
              <p className="text-sm text-muted-foreground">
                <a href="https://www.cisa.gov/zero-trust-maturity-model" 
                   className="text-primary hover:underline" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Learn more about CISA's Zero Trust Maturity Model
                </a>
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About CISA's Zero Trust Maturity Model</CardTitle>
            <CardDescription>
              Evaluate your organization's zero trust implementation maturity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">What is Zero Trust?</h3>
                <p className="text-muted-foreground mb-4">
                  Zero Trust is a security model based on the principle "never trust, always verify" that eliminates implicit trust based on network location and requires continuous validation of all users and devices.
                </p>
                <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                  <p className="text-sm italic">
                    "Zero trust is a security model, a set of system design principles, and a coordinated cybersecurity and system management strategy."
                    <span className="block text-right mt-1">- CISA Zero Trust Maturity Model</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Zero Trust Maturity Levels</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium mb-1">Traditional</div>
                    <p className="text-sm text-muted-foreground">Reliance on perimeter security, limited identity verification, network trust based on location</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium mb-1">Advanced</div>
                    <p className="text-sm text-muted-foreground">Multi-factor authentication, application layer protections, initial segmentation, some data categorization</p>
                  </div>
                  <div className="p-3 border border-primary/40 bg-primary/5 rounded-lg">
                    <div className="font-medium mb-1">Optimal</div>
                    <p className="text-sm text-muted-foreground">Risk-based access, micro-segmentation, continuous validation, comprehensive monitoring, data-level protections</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Zero Trust Pillars</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="border border-border p-4 rounded-lg text-center">
                  <User className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Identity</div>
                </div>
                <div className="border border-border p-4 rounded-lg text-center">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Device</div>
                </div>
                <div className="border border-border p-4 rounded-lg text-center">
                  <Network className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Network</div>
                </div>
                <div className="border border-border p-4 rounded-lg text-center">
                  <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Application</div>
                </div>
                <div className="border border-border p-4 rounded-lg text-center">
                  <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Data</div>
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
            <CardTitle>CISA Zero Trust Resources</CardTitle>
            <CardDescription>
              Additional resources from CISA to help implement Zero Trust
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.cisa.gov/zero-trust-maturity-model"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Maturity Model</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA Zero Trust Maturity Model document</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/sites/default/files/2023-04/zero_trust_implementation_benefits_508c.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Implementation Benefits</h3>
                  <p className="text-sm text-muted-foreground mb-2">CISA's guidance on Zero Trust benefits</p>
                  <div className="text-primary text-sm">Download PDF</div>
                </div>
              </a>
              
              <a 
                href="https://www.cisa.gov/resources-tools/resources/zero-trust-use-cases"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-border rounded-lg p-4 transition-colors group-hover:border-primary">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Use Cases</h3>
                  <p className="text-sm text-muted-foreground mb-2">Zero Trust use cases from CISA</p>
                  <div className="text-primary text-sm">View Resource</div>
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
          <Link to="/assessments" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">Zero Trust Maturity Assessment</h1>
              <p className="text-muted-foreground">Based on CISA's Zero Trust Maturity Model</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveProgress} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Progress'}
              </Button>
              <Button variant="outline" onClick={handleExportAssessment}>
                <Download className="mr-2 h-4 w-4" />
                Export Assessment
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 overflow-x-auto">
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
                          <HelpCircle className="h-3 w-3 text-warning-amber mr-1" /> Incomplete
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

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Zero Trust Maturity Level: {maturityLevel}</h3>
            </div>
            <div className="text-sm font-medium">
              Overall Score: {getOverallScore()}%
            </div>
          </div>
          <div className="w-full bg-muted h-2 rounded-full mt-2">
            <div 
              className={`h-2 rounded-full ${
                maturityLevel === 'Optimal' ? 'bg-secure-green' :
                maturityLevel === 'Advanced' ? 'bg-electric-blue' :
                'bg-warning-amber'
              }`} 
              style={{ width: `${getOverallScore()}%` }}
            />
          </div>
        </div>

        <Card className="p-6 border dark:border-muted mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">{sections[currentSection].title}</h2>
            <p className="text-muted-foreground">{sections[currentSection].description}</p>
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
              Previous Pillar
            </Button>
            
            {currentSection < sections.length - 1 ? (
              <Button
                onClick={() => setCurrentSection(prev => prev + 1)}
              >
                Next Pillar
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
        
        <Card>
          <CardHeader>
            <CardTitle>CISA Zero Trust Guidance</CardTitle>
            <CardDescription>Learn more about implementing Zero Trust based on CISA's model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="p-4 border border-border rounded-lg text-center">
                <User className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-2">Identity</h3>
                <p className="text-sm text-muted-foreground mb-2">Verify all user identities</p>
                <a 
                  href="https://www.cisa.gov/zero-trust-maturity-model" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center justify-center"
                >
                  CISA Guide
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
              
              <div className="p-4 border border-border rounded-lg text-center">
                <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-2">Device</h3>
                <p className="text-sm text-muted-foreground mb-2">Validate device security</p>
                <a 
                  href="https://www.cisa.gov/zero-trust-maturity-model" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center justify-center"
                >
                  CISA Guide
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
              
              <div className="p-4 border border-border rounded-lg text-center">
                <Network className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-2">Network</h3>
                <p className="text-sm text-muted-foreground mb-2">Segment and secure networks</p>
                <a 
                  href="https://www.cisa.gov/zero-trust-maturity-model" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center justify-center"
                >
                  CISA Guide
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
              
              <div className="p-4 border border-border rounded-lg text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-2">Application</h3>
                <p className="text-sm text-muted-foreground mb-2">Secure all applications</p>
                <a 
                  href="https://www.cisa.gov/zero-trust-maturity-model" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center justify-center"
                >
                  CISA Guide
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
              
              <div className="p-4 border border-border rounded-lg text-center">
                <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-2">Data</h3>
                <p className="text-sm text-muted-foreground mb-2">Protect data at all levels</p>
                <a 
                  href="https://www.cisa.gov/zero-trust-maturity-model" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center justify-center"
                >
                  CISA Guide
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
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

export default ZeroTrustMaturityAssessment;