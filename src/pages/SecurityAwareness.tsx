import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { getStorageUrl } from '../utils/supabaseAssets';
import { 
  Shield, 
  Users, 
  Mail, 
  AlertTriangle, 
  Lock, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Play,
  Download,
  Calendar,
  BarChart3,
  User,
  Smartphone,
  Laptop,
  Globe
} from 'lucide-react';
import { toast } from '../components/ui/Toaster';

const SecurityAwareness = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const trainingModules = [
    {
      id: 'module-1',
      title: 'Phishing Awareness',
      description: 'Learn to identify and avoid phishing attempts',
      duration: '30 minutes',
      level: 'Beginner',
      format: 'Interactive',
      topics: [
        'Email phishing tactics',
        'Spear phishing identification',
        'Suspicious link detection',
        'Reporting procedures'
      ],
      popular: true
    },
    {
      id: 'module-2',
      title: 'Password Security',
      description: 'Best practices for creating and managing secure passwords',
      duration: '25 minutes',
      level: 'Beginner',
      format: 'Interactive',
      topics: [
        'Password creation guidelines',
        'Multi-factor authentication',
        'Password manager usage',
        'Account security'
      ],
      popular: true
    },
    {
      id: 'module-3',
      title: 'Social Engineering Defense',
      description: 'Recognize and defend against social engineering attacks',
      duration: '45 minutes',
      level: 'Intermediate',
      format: 'Video + Quiz',
      topics: [
        'Common social engineering tactics',
        'Pretexting scenarios',
        'Baiting and quid pro quo attacks',
        'Defense strategies'
      ],
      popular: false
    },
    {
      id: 'module-4',
      title: 'Mobile Device Security',
      description: 'Securing smartphones and tablets in the workplace',
      duration: '35 minutes',
      level: 'Beginner',
      format: 'Interactive',
      topics: [
        'Mobile threat landscape',
        'Secure device configuration',
        'App security',
        'Public WiFi risks'
      ],
      popular: false
    },
    {
      id: 'module-5',
      title: 'Data Handling & Classification',
      description: 'Proper handling of sensitive information',
      duration: '40 minutes',
      level: 'Intermediate',
      format: 'Video + Quiz',
      topics: [
        'Data classification levels',
        'Handling requirements by level',
        'Secure data sharing',
        'Data disposal'
      ],
      popular: false
    },
    {
      id: 'module-6',
      title: 'Ransomware Prevention',
      description: 'Preventing ransomware infections and minimizing impact',
      duration: '45 minutes',
      level: 'Intermediate',
      format: 'Interactive',
      topics: [
        'Ransomware delivery methods',
        'Warning signs of infection',
        'Preventive measures',
        'Response procedures'
      ],
      popular: true
    }
  ];
  
  const campaigns = [
    {
      id: 'campaign-1',
      title: 'Quarterly Phishing Simulation',
      description: 'Regular phishing tests to measure awareness and identify training needs',
      frequency: 'Quarterly',
      participants: 'All Employees',
      metrics: [
        'Click-through rate',
        'Reporting rate',
        'Time to report',
        'Department performance'
      ]
    },
    {
      id: 'campaign-2',
      title: 'Security Newsletter',
      description: 'Monthly newsletter with security tips, news, and reminders',
      frequency: 'Monthly',
      participants: 'All Employees',
      metrics: [
        'Open rate',
        'Click-through rate',
        'Content engagement',
        'Feedback ratings'
      ]
    },
    {
      id: 'campaign-3',
      title: 'Security Champion Program',
      description: 'Designated security advocates within each department',
      frequency: 'Ongoing',
      participants: 'Selected Employees',
      metrics: [
        'Champion engagement',
        'Department awareness improvement',
        'Security incident reduction',
        'Program satisfaction'
      ]
    }
  ];
  
  const resources = [
    {
      id: 'resource-1',
      title: 'Security Awareness Posters',
      description: 'Printable posters for office display',
      type: 'PDF',
      count: 12
    },
    {
      id: 'resource-2',
      title: 'Email Templates',
      description: 'Security announcement templates',
      type: 'DOCX',
      count: 8
    },
    {
      id: 'resource-3',
      title: 'Desk Reference Cards',
      description: 'Quick reference security guides',
      type: 'PDF',
      count: 5
    },
    {
      id: 'resource-4',
      title: 'Digital Screensavers',
      description: 'Security reminder screensavers',
      type: 'PNG',
      count: 10
    }
  ];

  const handleDownload = (id: string) => {
    toast.success('Download started', 'Your download will begin shortly');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Security Awareness Program</h1>
        <p className="text-muted-foreground">Comprehensive security awareness training and resources</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'modules' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('modules')}
        >
          Training Modules
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'campaigns' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'resources' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Awareness Program</CardTitle>
              <CardDescription>
                Build a strong security culture with our comprehensive awareness program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our Security Awareness Program helps organizations build a strong security culture through 
                engaging training, simulations, and ongoing reinforcement. The program is designed to reduce 
                human-related security incidents by increasing awareness and changing behaviors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <Users className="h-6 w-6 text-primary mr-2" />
                      <h3 className="font-medium">Training</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interactive training modules covering essential security topics
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <Mail className="h-6 w-6 text-primary mr-2" />
                      <h3 className="font-medium">Simulations</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Realistic phishing and social engineering simulations
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <BarChart3 className="h-6 w-6 text-primary mr-2" />
                      <h3 className="font-medium">Metrics</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive reporting and improvement tracking
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Program Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Reduced Security Incidents</p>
                      <p className="text-sm text-muted-foreground">
                        Organizations typically see a 50-70% reduction in security incidents
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Regulatory Compliance</p>
                      <p className="text-sm text-muted-foreground">
                        Meets requirements for NIST, ISO, HIPAA, PCI DSS, and more
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Improved Security Culture</p>
                      <p className="text-sm text-muted-foreground">
                        Creates a security-conscious workforce and culture
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Measurable Results</p>
                      <p className="text-sm text-muted-foreground">
                        Track progress with comprehensive metrics and reporting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Implementation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Program Planning</h4>
                      <p className="text-sm text-muted-foreground">
                        Define objectives, scope, and success metrics (1-2 weeks)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Baseline Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        Evaluate current awareness levels (2-3 weeks)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Program Launch</h4>
                      <p className="text-sm text-muted-foreground">
                        Roll out initial training and communications (1 week)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Ongoing Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular training, simulations, and reinforcement (continuous)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Measurement & Improvement</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular assessment and program refinement (quarterly)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">All Employees</h4>
                      <p className="text-sm text-muted-foreground">
                        Core security awareness training for everyone in the organization
                      </p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-1 text-secure-green" />
                        Phishing awareness, password security, data handling
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">IT Staff</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced technical security training for IT personnel
                      </p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-1 text-secure-green" />
                        Secure configuration, threat detection, incident response
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Executives</h4>
                      <p className="text-sm text-muted-foreground">
                        Executive-focused security awareness and decision-making
                      </p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-1 text-secure-green" />
                        Security governance, risk management, crisis response
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Developers</h4>
                      <p className="text-sm text-muted-foreground">
                        Secure development practices for software teams
                      </p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-1 text-secure-green" />
                        Secure coding, OWASP Top 10, secure SDLC
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button variant="orange" size="lg" onClick={() => setActiveTab('modules')}>
              Explore Training Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Training Modules Tab */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-lg p-2 bg-primary/10">
                      {module.id.includes('phishing') ? (
                        <Mail className="h-5 w-5 text-primary" />
                      ) : module.id.includes('password') ? (
                        <Lock className="h-5 w-5 text-primary" />
                      ) : module.id.includes('mobile') ? (
                        <Smartphone className="h-5 w-5 text-primary" />
                      ) : module.id.includes('ransomware') ? (
                        <AlertTriangle className="h-5 w-5 text-primary" />
                      ) : module.id.includes('social') ? (
                        <Users className="h-5 w-5 text-primary" />
                      ) : (
                        <Shield className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {module.level}
                      </span>
                      {module.popular && (
                        <span className="text-xs bg-warning-amber/10 text-warning-amber px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{module.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{module.format}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-medium mb-2">Topics Covered:</h4>
                    <ul className="space-y-1">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-start text-xs">
                          <CheckCircle className="h-3 w-3 text-secure-green mr-1.5 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Module
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Training Development</CardTitle>
              <CardDescription>
                Need specialized training for your organization?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We can develop custom training modules tailored to your organization's specific needs, 
                industry, and compliance requirements.
              </p>
              <Button variant="orange">
                Request Custom Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Awareness Campaigns</CardTitle>
              <CardDescription>
                Ongoing campaigns to reinforce security awareness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our security awareness campaigns help reinforce training through regular activities, 
                communications, and simulations. These campaigns are designed to keep security top-of-mind 
                and build a strong security culture.
              </p>
              
              <div className="space-y-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-medium mb-2">{campaign.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{campaign.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-1">Frequency</p>
                              <p className="text-muted-foreground">{campaign.frequency}</p>
                            </div>
                            
                            <div>
                              <p className="font-medium mb-1">Participants</p>
                              <p className="text-muted-foreground">{campaign.participants}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="font-medium mb-1 text-sm">Key Metrics:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {campaign.metrics.map((metric, index) => (
                                <div key={index} className="flex items-center text-xs">
                                  <CheckCircle className="h-3 w-3 text-primary mr-1.5" />
                                  <span>{metric}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <Link to="/demo">
                          <Button variant="orange">
                            Request Program Demo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to="/dashboard">
                          <Button variant="outline">
                            Implementation Guide
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Phishing Simulation Platform</CardTitle>
              <CardDescription>
                Test and improve your organization's phishing awareness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Realistic Phishing Templates</p>
                        <p className="text-sm text-muted-foreground">
                          Library of templates based on real-world phishing attacks
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Automated Campaigns</p>
                        <p className="text-sm text-muted-foreground">
                          Schedule and automate phishing simulations
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Just-in-Time Training</p>
                        <p className="text-sm text-muted-foreground">
                          Immediate feedback and training for users who fall for simulations
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Comprehensive Reporting</p>
                        <p className="text-sm text-muted-foreground">
                          Detailed metrics and improvement tracking
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Why Simulations Matter</h3>
                  <p className="text-muted-foreground mb-4">
                    Regular phishing simulations are one of the most effective ways to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Measure real-world susceptibility to phishing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Provide practical experience in a safe environment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Identify departments or individuals needing additional training</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-secure-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Track improvement over time</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full mt-4">
                    Learn More About Simulations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Awareness Materials</CardTitle>
                <CardDescription>
                  Downloadable resources to reinforce security awareness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-2">
                              {resource.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {resource.count} items
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(resource.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Policy Templates</CardTitle>
                <CardDescription>
                  Customizable security policy templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 'policy-1',
                      title: 'Acceptable Use Policy',
                      description: 'Guidelines for appropriate use of IT resources',
                      type: 'DOCX',
                      pages: 8
                    },
                    {
                      id: 'policy-2',
                      title: 'Password Policy',
                      description: 'Requirements for secure password creation and management',
                      type: 'DOCX',
                      pages: 5
                    },
                    {
                      id: 'policy-3',
                      title: 'Email Security Policy',
                      description: 'Guidelines for secure email usage and handling',
                      type: 'DOCX',
                      pages: 6
                    },
                    {
                      id: 'policy-4',
                      title: 'Mobile Device Policy',
                      description: 'Requirements for secure mobile device usage',
                      type: 'DOCX',
                      pages: 7
                    }
                  ].map((policy) => (
                    <div key={policy.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">{policy.title}</h4>
                          <p className="text-xs text-muted-foreground">{policy.description}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-2">
                              {policy.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {policy.pages} pages
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(policy.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Awareness Videos</CardTitle>
              <CardDescription>
                Educational videos on key security topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: 'video-1',
                    title: 'Phishing: Don\'t Take the Bait',
                    duration: '5:32',
                    thumbnail: getStorageUrl('images/videos/phishing-thumbnail.jpeg')
                  },
                  {
                    id: 'video-2',
                    title: 'Password Security Essentials',
                    duration: '4:45',
                    thumbnail: getStorageUrl('images/videos/password-thumbnail.jpeg')
                  },
                  {
                    id: 'video-3',
                    title: 'Social Engineering Defense',
                    duration: '6:18',
                    thumbnail: getStorageUrl('images/videos/social-engineering-thumbnail.jpeg')
                  }
                ].map((video) => (
                  <div key={video.id} className="overflow-hidden rounded-lg border border-border">
                    <div className="aspect-video relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">{video.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  View All Videos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="rounded-full p-6 bg-primary/10">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Ready to Build a Stronger Security Culture?</h3>
                <p className="text-muted-foreground mb-4">
                  Our security awareness program can help your organization reduce risk and build a security-conscious workforce.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button variant="orange">
                    Request Program Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link to="/app/training">
                    <Button variant="outline">
                      View Training Platform
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityAwareness;