import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Users, 
  HelpCircle, 
  CheckCircle, 
  Clock,
  Video,
  BookOpen
} from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';

const Support = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Support Center</h1>
            <p className="text-xl text-orange-500">Get help with CyberCaution by ERMITS</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <AnimatedSection type="fadeIn" delay={0.1} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>How Can We Help You?</CardTitle>
                <CardDescription>
                  Choose a support option below or search our knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for answers..."
                      className="w-full rounded-md border-border bg-background py-3 px-4 pl-10"
                    />
                    <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      Search
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="hover:shadow-md transition-all duration-300 dark:border-muted">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mr-4">
                          <MessageSquare className="h-5 w-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h3 className="font-medium">Live Chat Support</h3>
                          <p className="text-sm text-muted-foreground">Available 24/7</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect with our technical support team via live chat for immediate assistance.
                      </p>
                      <Button variant="outline" className="w-full">
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-300 dark:border-muted">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mr-4">
                          <Phone className="h-5 w-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-muted-foreground">9AM-6PM ET, Mon-Fri</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Speak directly with our support team for complex issues or urgent assistance.
                      </p>
                      <Button variant="outline" className="w-full">
                        +1 (888) 618-6160
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-md transition-all duration-300 dark:border-muted">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mr-4">
                          <Mail className="h-5 w-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Send us an email with your question and we'll get back to you within one business day.
                      </p>
                      <Button variant="outline" className="w-full">
                        support@ermits.com
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-300 dark:border-muted">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h3 className="font-medium">Submit a Ticket</h3>
                          <p className="text-sm text-muted-foreground">Detailed issue tracking</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create a support ticket for complex issues requiring investigation by our technical team.
                      </p>
                      <Button variant="outline" className="w-full">
                        Create Ticket
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection type="fadeIn" delay={0.2} className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Support Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/faq">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Frequently Asked Questions
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="mr-2 h-4 w-4" />
                    Video Tutorials
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Knowledge Base
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Community Forum
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CyberCaution Platform</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-secure-green rounded-full mr-1"></div>
                        <span className="text-xs text-secure-green">Operational</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Assessment Services</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-secure-green rounded-full mr-1"></div>
                        <span className="text-xs text-secure-green">Operational</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Services</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-secure-green rounded-full mr-1"></div>
                        <span className="text-xs text-secure-green">Operational</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dashboard</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-secure-green rounded-full mr-1"></div>
                        <span className="text-xs text-secure-green">Operational</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-right text-muted-foreground">
                      <Clock className="inline h-3 w-3 mr-1" />
                      Updated 5 minutes ago
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection type="fadeIn" delay={0.3}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Popular Support Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "Getting Started", 
                topics: [
                  "Creating your account",
                  "Setting up your first assessment",
                  "Understanding your dashboard",
                  "Inviting team members"
                ] 
              },
              { 
                title: "Assessments & Reports", 
                topics: [
                  "Completing a ransomware assessment",
                  "Exporting assessment results",
                  "Generating compliance reports",
                  "Scheduling recurring assessments"
                ] 
              },
              { 
                title: "Account & Billing", 
                topics: [
                  "Updating billing information",
                  "Changing subscription plans",
                  "Managing user permissions",
                  "Cancelling your subscription"
                ] 
              }
            ].map((category, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="dark:border-muted">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>
                          <button className="text-left hover:text-primary transition-colors text-sm flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Button variant="link" className="text-primary px-0 mt-2">
                      View all topics
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.4} className="mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Can't find what you're looking for?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our support team is ready to help you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="orange">
                Contact Support
              </Button>
              <Link to="/faq">
                <Button variant="outline">
                  Browse FAQs
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Support;