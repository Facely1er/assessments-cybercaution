import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../utils/AnimatedSection';
import AnimatedItem from '../../utils/AnimatedItem';
import { LifeBuoy, MessageSquare, Phone, Mail, BookOpen, Video, Users, FileQuestion, ArrowRight, Calendar, HelpCircle, Award, MessageCircle, Headphones, Clock, DivideIcon as LucideIcon, Zap, CheckCircle } from 'lucide-react';

const Support = () => {
  const [supportMethod, setSupportMethod] = useState('email');

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support representative",
      action: "Call Now",
      availability: "Business Hours"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions or issues",
      action: "Send Email",
      availability: "24/7"
    },
    {
      icon: Video,
      title: "Video Consultations",
      description: "Schedule a video call with our experts",
      action: "Book Session",
      availability: "By Appointment"
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Browse our comprehensive knowledge base",
      articles: 250
    },
    {
      icon: FileQuestion,
      title: "FAQs",
      description: "Find answers to common questions",
      articles: 100
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Learn through step-by-step video guides",
      articles: 50
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share knowledge",
      articles: 1000
    }
  ];

  const supportPlans = [
    {
      title: "Standard",
      description: "Included with all subscriptions",
      features: [
        "Email support during business hours",
        "Knowledge base access",
        "Community forum access",
        "Response time: 24 hours"
      ]
    },
    {
      title: "Professional",
      description: "Enhanced support for business needs",
      features: [
        "Email and phone support",
        "Priority response queue",
        "Access to video tutorials",
        "Response time: 8 hours"
      ],
      highlighted: true
    },
    {
      title: "Enterprise",
      description: "Dedicated support for critical environments",
      features: [
        "24/7 priority support",
        "Dedicated support engineer",
        "Direct access to product experts",
        "Response time: 1 hour"
      ]
    }
  ];

  const faqs = [
    {
      question: "How quickly will I receive a response to my support request?",
      answer: "Response times vary based on your support plan. Standard support typically responds within 24 hours during business days, Professional within 8 hours, and Enterprise within 1 hour for critical issues."
    },
    {
      question: "How do I upgrade my support plan?",
      answer: "You can upgrade your support plan from your account settings page. Navigate to Settings > Billing > Support Plan and select the plan that best fits your needs."
    },
    {
      question: "Do you provide implementation assistance?",
      answer: "Yes, we offer implementation assistance through our professional services team. This service is available to clients on Professional and Enterprise plans."
    },
    {
      question: "Can I get help with customizing the platform for my specific needs?",
      answer: "Absolutely. Our Enterprise support plan includes customization assistance. For other plans, you can purchase professional services hours for customization support."
    }
  ];

  const renderSupportOption = () => {
    switch(supportMethod) {
      case 'email':
        return (
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Contact via Email</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name*</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-border bg-background py-2 px-3"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address*</label>
                <input 
                  type="email" 
                  className="w-full rounded-md border-border bg-background py-2 px-3"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject*</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-border bg-background py-2 px-3"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message*</label>
                <textarea 
                  rows={5}
                  className="w-full rounded-md border-border bg-background py-2 px-3"
                  placeholder="Describe your issue or question in detail"
                />
              </div>
              <Button variant="orange" className="w-full">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 'chat':
        return (
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Start Live Chat</h3>
            <div className="text-center py-8">
              <MessageCircle className="h-16 w-16 text-[#FF6B00] mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                Connect instantly with our support team and get real-time assistance with your questions.
              </p>
              <Button variant="orange" size="lg">
                Start Chat Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'phone':
        return (
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Phone Support</h3>
            <div className="text-center py-8">
              <Headphones className="h-16 w-16 text-[#FF6B00] mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Call our support team directly at:
              </p>
              <p className="text-2xl font-bold mb-6">+1 (800) 555-1234</p>
              <div className="text-sm text-muted-foreground mb-6">
                <p>Business Hours:</p>
                <p>Monday-Friday: 9:00 AM - 8:00 PM ET</p>
              </div>
              <Button variant="orange">
                Request Callback
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'video':
        return (
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Schedule Video Consultation</h3>
            <div className="text-center py-4">
              <Calendar className="h-16 w-16 text-[#FF6B00] mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                Schedule a one-on-one video consultation with a product expert.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="hover:shadow-md cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Product Help</p>
                    <p className="text-xs text-muted-foreground">30 min session</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Implementation</p>
                    <p className="text-xs text-muted-foreground">60 min session</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Strategic Review</p>
                    <p className="text-xs text-muted-foreground">45 min session</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button variant="orange" size="lg">
                Check Availability
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="py-20">
      <AnimatedSection type="fadeIn" className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold mb-4">Support Center</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto">
          Get the help you need to succeed with CyberCaution™ by ERMITS
        </p>
      </AnimatedSection>

      <AnimatedSection type="fadeIn" delay={0.1} className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {supportOptions.map((option, index) => (
            <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
              <Card 
                className={`hover:shadow-lg transition-shadow cursor-pointer h-full 
                ${supportMethod === option.title.split(' ')[0].toLowerCase() ? 'border-[#FF6B00] ring-1 ring-[#FF6B00]' : 'dark:border-muted'}`}
                onClick={() => setSupportMethod(option.title.split(' ')[0].toLowerCase())}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <option.icon className="h-12 w-12 text-[#FF6B00] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-2 flex-grow">{option.description}</p>
                  <p className="text-sm text-[#FF6B00] mb-4">Available: {option.availability}</p>
                  <Button 
                    variant={supportMethod === option.title.split(' ')[0].toLowerCase() ? "orange" : "outline"} 
                    className="w-full mt-auto"
                  >
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>

        {/* Contact form based on selected method */}
        <div className="mt-8">
          {renderSupportOption()}
        </div>
      </AnimatedSection>

      {/* Self-Help Resources */}
      <AnimatedSection type="fadeIn" delay={0.2} className="py-16 bg-muted/30 dark:bg-muted/10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Self-Help Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers quickly with our comprehensive knowledge resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-shadow dark:border-muted h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <resource.icon className="h-12 w-12 text-[#FF6B00] mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-2 flex-grow">{resource.description}</p>
                    <p className="text-sm text-[#FF6B00] mb-4">{resource.articles}+ articles</p>
                    <Button variant="orange" className="w-full mt-auto">
                      Browse
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Support Plans */}
      <AnimatedSection type="fadeIn" delay={0.3} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Support Plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the support level that best fits your organization's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportPlans.map((plan, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card 
                  className={`hover:shadow-lg transition-shadow h-full dark:border-muted
                  ${plan.highlighted ? 'border-[#FF6B00] ring-1 ring-[#FF6B00]' : ''}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">{plan.title} Support</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{plan.description}</p>
                    
                    <div className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant={plan.highlighted ? "orange" : "outline"} 
                      className="w-full mt-auto"
                    >
                      {plan.highlighted ? 'Current Plan' : 'Upgrade'}
                      {!plan.highlighted && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection type="fadeIn" delay={0.4} className="py-16 bg-muted/30 dark:bg-muted/10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our support services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="dark:border-muted">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-[#FF6B00] mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection type="fadeIn" delay={0.5} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Advanced Technical Support?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Our expert team can provide personalized guidance for complex security challenges and implementation needs
              </p>
              <Button 
                variant="white" 
                className="bg-white text-[#FF6B00] hover:bg-white/90"
                size="lg"
              >
                Schedule a Consultation
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Support;