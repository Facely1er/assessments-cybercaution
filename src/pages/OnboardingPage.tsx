import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, ArrowRight, ArrowLeft, Play, Target, 
  Users, BarChart3, Award, Clock, FileCheck, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [logoLoadError, setLogoLoadError] = useState(false);
  
  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to CyberCaution™',
      subtitle: 'Your comprehensive ransomware defense platform',
      content: (
        <div className="text-center">
          <div className="mb-8">
            <Shield className="h-24 w-24 text-orange-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Defend Against Ransomware with Confidence
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              CyberCaution provides enterprise-grade cybersecurity assessments, response toolkits, 
              and training programs aligned with CISA and NIST frameworks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <FileCheck className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Assess</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Evaluate your current security posture with CISA and NIST assessments</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <Target className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Respond</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get personalized action plans and incident response playbooks</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <Award className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Train</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Educate your team with role-based training modules</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'assessments',
      title: 'Security Assessments',
      subtitle: 'Measure your ransomware readiness',
      content: (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Choose Your Assessment Path
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our assessments are aligned with industry-leading frameworks to give you accurate, 
              actionable insights into your security posture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">CISA Ransomware Readiness</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Quick assessment aligned with CISA #StopRansomware guidance</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="dark:text-gray-300">25-35 minutes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <span className="dark:text-gray-300">35 targeted questions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <span className="dark:text-gray-300">Immediate results</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 hover:border-green-400 dark:hover:border-green-600 transition-colors">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">NIST Cybersecurity Framework</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Comprehensive assessment covering all five NIST CSF functions</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="dark:text-gray-300">90-120 minutes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <span className="dark:text-gray-300">142 detailed questions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <span className="dark:text-gray-300">Multi-session support</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Pro Tip:</strong> Start with the CISA assessment for a quick overview, 
                then complete the NIST assessment for comprehensive analysis.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'toolkit',
      title: 'Response Toolkit',
      subtitle: 'Your personalized defense strategy',
      content: (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Get Your Personalized Action Plan
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Based on your assessment results, we'll generate a customized 90-day roadmap 
              with specific actions to strengthen your defenses.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3 mr-4">
                    <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Immediate Actions</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Critical vulnerabilities that need attention within 1-2 weeks</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3 mr-4">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Short-term Goals</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Important improvements to implement over 3-8 weeks</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 mr-4">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Long-term Strategy</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Advanced security measures for weeks 9-12 and beyond</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Included Resources</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Incident response playbooks</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Communication templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recovery checklists</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Emergency contact lists</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Compliance documentation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      subtitle: 'Work together for stronger security',
      content: (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Collaborate with Your Security Team
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              CyberCaution supports multi-user assessments, team invitations, and collaborative planning 
              to ensure your entire organization is aligned on security priorities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Invite Team Members</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Send email invitations to colleagues for collaborative assessments</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Track Progress</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monitor team progress and see consolidated results across participants</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Schedule Sessions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Plan assessment sessions with calendar integration and reminders</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Team Features Include:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Multi-user assessments</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Shared reports</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Calendar integration</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ready',
      title: 'You\'re All Set!',
      subtitle: 'Ready to start your cybersecurity journey',
      content: (
        <div className="text-center">
          <div className="mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Welcome to CyberCaution™
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              You're now ready to begin strengthening your organization's ransomware defenses. 
              Start with a quick assessment or explore the platform features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-lg p-6">
              <Play className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Start Assessment</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Begin with a CISA ransomware readiness assessment</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-6">
              <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Explore Dashboard</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Tour the platform and familiarize yourself with features</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Need help?</strong> Use the chatbot in the bottom-right corner for guided walkthroughs 
              and assistance at any time.
            </p>
          </div>
        </div>
      )
    }
  ];
  
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  
  const handleNext = () => {
    if (isLastStep) {
      navigate('/dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-orange-950/30">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {logoLoadError ? (
                <span className="h-10 w-10 flex items-center justify-center text-sm font-bold text-orange-600">
                  CyberCaution
                </span>
              ) : (
                <img 
                  src="/cybercaution.png" 
                  alt="CyberCaution Logo" 
                  className="h-10 w-10"
                  onError={() => {
                    setLogoLoadError(true);
                  }}
                />
              )}
              <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">CyberCaution™</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`text-xs ${idx <= currentStep ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-gray-400 dark:text-gray-500'}`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{currentStepData.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{currentStepData.subtitle}</p>
        </div>
        
        <div className="mb-12">
          {currentStepData.content}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${currentStep === 0 
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </button>
          
          <div className="flex space-x-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`
                  w-3 h-3 rounded-full transition-all duration-200
                  ${idx === currentStep 
                    ? 'bg-orange-600' 
                    : idx < currentStep 
                      ? 'bg-orange-300 dark:bg-orange-700' 
                      : 'bg-gray-300 dark:bg-gray-700'}
                `}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLastStep ? 'Get Started' : 'Next'}
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;