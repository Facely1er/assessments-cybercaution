import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Calendar, 
  Users, 
  ArrowLeft,
  Building2,
  Globe,
  CheckCircle
} from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { toast } from '../components/ui/Toaster';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    reason: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent!', 'We\'ll get back to you as soon as possible.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        reason: 'general'
      });
    }, 1500);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Contact Us</h1>
            <p className="text-xl text-orange-500">Get in touch with our team for any questions or inquiries</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection type="fadeIn" delay={0.1} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border-border bg-background py-2 px-3"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border-border bg-background py-2 px-3"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="company">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-md border-border bg-background py-2 px-3"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border-border bg-background py-2 px-3"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="reason">
                      Reason for Contact *
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      required
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full rounded-md border-border bg-background py-2 px-3"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales Question</option>
                      <option value="support">Technical Support</option>
                      <option value="demo">Request a Demo</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="subject">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-md border-border bg-background py-2 px-3"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-md border-border bg-background py-2 px-3"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} variant="orange">
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection type="fadeIn" delay={0.2} className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <a href="mailto:contact@ermits.com" className="text-primary hover:underline">
                        contact@ermits.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a href="tel:+18886186160" className="text-primary hover:underline">
                        +1 (888) 618-6160
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monday-Friday: 9:00 AM - 6:00 PM ET
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <address className="not-italic text-sm">
                        8300 McCullough Lane<br />
                        Suite 203<br />
                        Gaithersburg, MD 20877<br />
                        United States
                      </address>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatedItem type="fadeIn" delay={0.1}>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Demo
                    </Button>
                  </AnimatedItem>
                  
                  <AnimatedItem type="fadeIn" delay={0.2}>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Live Chat Support
                    </Button>
                  </AnimatedItem>
                  
                  <AnimatedItem type="fadeIn" delay={0.3}>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Partner Inquiries
                    </Button>
                  </AnimatedItem>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Global Offices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">North America HQ</h3>
                      <p className="text-sm">Gaithersburg, Maryland</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Europe</h3>
                      <p className="text-sm">London, United Kingdom</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Asia Pacific</h3>
                      <p className="text-sm">Singapore</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection type="fadeIn" delay={0.3} className="mt-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <Globe className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">We're Here to Help</h3>
                  <p className="text-muted-foreground mb-4">
                    Our team is available to assist you with any questions about our products and services. 
                    Whether you're looking for a demo, have technical questions, or want to learn more about 
                    how CyberCaution™ can help your organization, we're here to help.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/ransomware-assessment">
                      <Button variant="orange">
                        Start Free Assessment
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Download Resources
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.4} className="mt-12 text-center">
          <div className="bg-muted/30 p-6 rounded-lg inline-block">
            <CheckCircle className="h-8 w-8 text-secure-green mx-auto mb-2" />
            <h3 className="text-lg font-medium mb-1">Committed to Your Privacy</h3>
            <p className="text-sm text-muted-foreground mb-2">
              We respect your privacy and are committed to protecting your personal information.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/company/privacy">
                <Button variant="link" size="sm">Privacy Policy</Button>
              </Link>
              <Link to="/company/terms">
                <Button variant="link" size="sm">Terms of Service</Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;