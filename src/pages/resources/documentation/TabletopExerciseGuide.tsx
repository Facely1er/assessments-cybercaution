import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Users,
  Clock,
  MessageSquare,
  FileText,
  Download,
  Calendar,
  Settings
} from 'lucide-react';

const TabletopExerciseGuide = () => {
  const navigate = useNavigate();

  const exercisePhases = [
    {
      title: "Planning",
      description: "Prepare for the tabletop exercise",
      steps: [
        "Define exercise objectives and scope",
        "Develop realistic ransomware scenario",
        "Identify and invite participants",
        "Create exercise materials and injects",
        "Prepare evaluation criteria"
      ]
    },
    {
      title: "Execution",
      description: "Conduct the tabletop exercise",
      steps: [
        "Brief participants on exercise rules",
        "Present the scenario and initial conditions",
        "Introduce scenario injects at appropriate times",
        "Facilitate discussion and decision-making",
        "Document responses and decisions"
      ]
    },
    {
      title: "Evaluation",
      description: "Assess exercise performance",
      steps: [
        "Conduct hot wash immediately after exercise",
        "Gather participant feedback",
        "Evaluate against established criteria",
        "Identify strengths and weaknesses",
        "Document lessons learned"
      ]
    },
    {
      title: "Improvement",
      description: "Implement improvements based on findings",
      steps: [
        "Develop improvement plan",
        "Assign action items with owners",
        "Update incident response procedures",
        "Enhance technical controls as needed",
        "Schedule follow-up exercise"
      ]
    }
  ];

  const scenarioElements = [
    {
      title: "Initial Vector",
      description: "How the ransomware attack begins",
      examples: [
        "Phishing email with malicious attachment",
        "Compromised remote access credentials",
        "Exploitation of unpatched vulnerability",
        "Supply chain compromise",
        "Malicious insider"
      ]
    },
    {
      title: "Detection",
      description: "How the attack is discovered",
      examples: [
        "Security monitoring alert",
        "User reports suspicious activity",
        "System performance issues",
        "Ransom note appears",
        "Files become encrypted"
      ]
    },
    {
      title: "Impact",
      description: "Effects of the ransomware attack",
      examples: [
        "Critical systems unavailable",
        "Customer data encrypted",
        "Operational disruption",
        "Financial impact",
        "Reputational damage"
      ]
    },
    {
      title: "Complications",
      description: "Additional challenges to address",
      examples: [
        "Backup systems also compromised",
        "Public disclosure of the incident",
        "Regulatory reporting requirements",
        "Executive on vacation during incident",
        "Ransom demand with deadline"
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/resources/documentation')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documentation
        </Button>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Ransomware Tabletop Exercise Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How to plan, conduct, and evaluate effective ransomware tabletop exercises
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Exercise Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exercisePhases.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{phase.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{phase.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {phase.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Building Effective Scenarios</h2>
          <p className="text-muted-foreground mb-8">
            Effective tabletop exercises require realistic scenarios that challenge participants and test your organization's capabilities.
            Include these key elements in your ransomware exercise scenarios:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarioElements.map((element) => (
              <Card key={element.title} className="dark:border-muted">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3 text-foreground">{element.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{element.description}</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 text-foreground">Examples:</h4>
                    <ul className="space-y-2">
                      {element.examples.map((example, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Key Participants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Technical Team</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>IT Security Team</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Network Administrators</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>System Administrators</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Help Desk Representatives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Business Team</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Executive Leadership</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Business Unit Leaders</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Finance Representatives</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Human Resources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Support Team</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Legal Counsel</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Communications/PR</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Customer Support</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>External Consultants</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Exercise Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Facilitator Guide</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Comprehensive guide for exercise facilitators with scenario details, injects, and discussion questions.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Participant Handouts</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Materials for exercise participants including scenario overview and role-specific information.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Evaluation Forms</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Forms to evaluate exercise performance and identify improvement areas.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">After-Action Report</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Template for documenting exercise results, findings, and improvement recommendations.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">NIST Alignment</h3>
              <p className="text-muted-foreground mb-4">
                Tabletop exercises align with the following NIST CSF controls:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground"><strong>PR.IP-10:</strong> Response and recovery plans are tested</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground"><strong>RS.CO-1:</strong> Personnel know their roles and order of operations when a response is needed</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground"><strong>RC.RP-1:</strong> Recovery plan is executed during or after a cybersecurity incident</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground"><strong>RC.IM-1:</strong> Recovery plans incorporate lessons learned</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button 
            onClick={() => navigate('/tabletop-exercise')}
            className="mr-4"
          >
            View Exercise Scenarios
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/ransomware-assessment')}
          >
            Start Ransomware Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TabletopExerciseGuide;