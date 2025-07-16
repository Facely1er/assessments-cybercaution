import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
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
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toaster';

const QuickCyberCheck = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const steps = [
    {
      title: "Welcome to 3-Minute Cyber Check",
      content: (
        <div className="text-center">
          <Shield className="h-20 w-20 text-orange-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-foreground">Quick Security Assessment</h2>
          <p className="text-muted-foreground mb-8">
            Answer a few questions to get an instant assessment of your organization's cyber readiness.
            This quick check takes only 3 minutes to complete.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>3 minutes</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>5 questions</span>
            </div>
          </div>
          <Button 
            variant="orange" 
            size="lg" 
            onClick={() => setCurrentStep(1)}
            className="px-8"
          >
            Start Quick Check
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    {
      title: "Backups",
      question: "Do you maintain offline, encrypted backups of critical data?",
      info: "CISA recommends maintaining offline, encrypted backups that are tested regularly."
    },
    {
      title: "Multi-Factor Authentication",
      question: "Have you implemented multi-factor authentication for critical systems and remote access?",
      info: "CISA identifies MFA as one of the most effective controls to prevent unauthorized access."
    },
    {
      title: "Software Updates",
      question: "Do you regularly update and patch systems, software, and applications?",
      info: "Keeping systems updated is crucial for addressing known vulnerabilities."
    },
    {
      title: "Response Plan",
      question: "Do you have a documented incident response plan for cyber attacks?",
      info: "A documented plan helps ensure efficient and effective response to security incidents."
    },
    {
      title: "User Training",
      question: "Do you provide security awareness training to your staff regularly?",
      info: "Regular training helps staff identify and avoid phishing and social engineering attacks."
    },
    {
      title: "Results",
      content: (result) => (
        <div className="text-center">
          <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${
            result.score >= 8 ? 'bg-green-100 text-green-700' : 
            result.score >= 6 ? 'bg-blue-100 text-blue-700' : 
            result.score >= 4 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'
          }`}>
            {result.score >= 8 ? (
              <CheckCircle className="h-16 w-16" />
            ) : result.score >= 6 ? (
              <Info className="h-16 w-16" />
            ) : result.score >= 4 ? (
              <AlertTriangle className="h-16 w-16" />
            ) : (
              <AlertTriangle className="h-16 w-16" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-foreground">Your Security Score: {result.score}/10</h2>
          <p className="text-xl mb-6 text-muted-foreground">
            {result.score >= 8 ? 'Good cyber hygiene!' : 
             result.score >= 6 ? 'Moderate security posture.' : 
             result.score >= 4 ? 'Elevated risk level.' : 
             'Critical security gaps detected.'}
          </p>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-foreground">Key Recommendations:</h3>
              <ul className="space-y-2 text-left">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/ransomware-assessment">
              <Button variant="orange">
                Take Full Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline">
              Download Results
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: answer
    }));
    
    // Move to the next question
    setCurrentStep(currentStep + 1);
  };
  
  // Calculate results when reaching the results step
  const calculateResults = () => {
    let score = 0;
    const recommendations: string[] = [];
    
    // Score each question from 0-2 points
    for (let i = 1; i <= 5; i++) {
      const answer = answers[i];
      if (answer === 'yes') {
        score += 2;
      } else if (answer === 'partial') {
        score += 1;
      } else {
        // Add recommendation based on the "no" answer
        switch (i) {
          case 1:
            recommendations.push("Implement a 3-2-1 backup strategy with offline copies");
            break;
          case 2:
            recommendations.push("Deploy multi-factor authentication for all remote access");
            break;
          case 3:
            recommendations.push("Establish a regular patching schedule for all systems");
            break;
          case 4:
            recommendations.push("Develop a formal incident response plan");
            break;
          case 5:
            recommendations.push("Implement regular security awareness training");
            break;
        }
      }
    }
    
    // If we don't have 3 recommendations yet, add the most important ones
    const defaultRecommendations = [
      "Conduct a comprehensive ransomware readiness assessment",
      "Review your cyber insurance coverage for ransomware protection",
      "Test your backups regularly to ensure recoverability"
    ];
    
    while (recommendations.length < 3) {
      const nextRec = defaultRecommendations.shift();
      if (nextRec && !recommendations.includes(nextRec)) {
        recommendations.push(nextRec);
      }
    }
    
    return {
      score,
      recommendations: recommendations.slice(0, 3) // Limit to top 3 recommendations
    };
  };

  // Render a question step
  const renderQuestion = (step: typeof steps[number]) => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground">{step.title}</h2>
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-foreground text-lg mb-4">{step.question}</p>
            <div className="bg-muted/20 p-4 rounded-lg mb-6 flex items-start">
              <Info className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{step.info}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button 
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => handleAnswer('yes')}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Yes, fully implemented
              </Button>
              <Button 
                variant="outline"
                className="border-amber-500 text-amber-600 hover:bg-amber-50"
                onClick={() => handleAnswer('partial')}
              >
                <Circle className="mr-2 h-5 w-5" />
                Partially implemented
              </Button>
              <Button 
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
                onClick={() => handleAnswer('no')}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Not implemented
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep <= 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Question {currentStep} of 5
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={!answers[currentStep]}
          >
            Skip
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const currentStep = steps[currentStep];
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Quick Cyber Check</h1>
          <p className="text-muted-foreground">Get an instant assessment of your cybersecurity posture</p>
        </div>
        
        {currentStep === 0 ? (
          steps[0].content
        ) : currentStep === 6 ? (
          steps[6].content(calculateResults())
        ) : (
          renderQuestion(steps[currentStep])
        )}
      </div>
    </div>
  );
};

export default QuickCyberCheck;