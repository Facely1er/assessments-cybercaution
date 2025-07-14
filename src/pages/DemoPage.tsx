import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  RefreshCw
} from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { toast } from '../components/ui/Toaster';
import { supabase } from '../lib/supabase';

const DemoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    demo_type: 'product' // Default value
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('demo_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone || null,
            message: formData.message,
            demo_type: formData.demo_type,
            status: 'new'
          }
        ]);
      
      if (error) {
        console.error('Error submitting demo request:', error);
        toast.error('Submission Failed', error.message);
      } else {
        toast.success('Demo Request Submitted', 'We\'ll get back to you shortly to schedule your demo.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          demo_type: 'product'
        });
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast.error('Submission Failed', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="text-3xl font-bold mb-2 text-foreground">Request a Demo</h1>
            <p className="text-xl text-orange-500">See how CyberCaution by ERMITS can transform your security program</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection type="fadeIn" delay={0.1} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Personalized Demo</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will reach out to schedule a demonstration tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="demo-name">
                        Full Name *
                      </label>
                      <input
                        id="demo-name"
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
                      <label className="block text-sm font-medium mb-1" htmlFor="demo-email">
                        Email Address *
                      </label>
                      <input
                        id="demo-email"
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
                      <label className="block text-sm font-medium mb-1" htmlFor="demo-company">
                        Company *
                      </label>
                      <input
                        id="demo-company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-md border-border bg-background py-2 px-3"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="demo-phone">
                        Phone Number
                      </label>
                      <input
                        id="demo-phone"
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
                    <label className="block text-sm font-medium mb-1" htmlFor="demo-type">
                      Demo Type *
                    </label>
                    <select
                      id="demo-type"
                      name="demo_type"
                      required
                      value={formData.demo_type}
                      onChange={handleChange}
                      className="w-full rounded-md border-border bg-background py-2 px-3"
                    >
                      <option value="product">Product Overview</option>
                      <option value="ransomware">Ransomware Protection</option>
                      <option value="supply-chain">Supply Chain Security</option>
                      <option value="compliance">Compliance Solutions</option>
                      <option value="customized">Customized Demo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="demo-message">
                      Additional Information
                    </label>
                    <textarea
                      id="demo-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-md border-border bg-background py-2 px-3"
                      placeholder="Let us know about your specific interests and requirements..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} variant="orange">
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2 h-4 w-4" />
                          Request Demo
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
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Personalized Demo</h3>
                      <p className="text-sm text-muted-foreground">
                        Our product specialist will tailor the demo to your specific security needs
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Flexible Scheduling</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll work around your availability to find a convenient time
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Industry-Specific Focus</h3>
                      <p className="text-sm text-muted-foreground">
                        See how our solutions address challenges in your specific industry
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demo Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Product Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete walkthrough of the CyberCaution platform
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Feature-Specific</h3>
                      <p className="text-sm text-muted-foreground">
                        Focused demonstration on specific capabilities
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secure-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Technical Deep Dive</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed technical session with our security experts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Have Questions?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our team is ready to help with any questions you might have before scheduling a demo.
                      </p>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection type="fadeIn" delay={0.3} className="mt-16">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-muted/30 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Expert-Led Demo</h3>
                  <p className="text-sm text-muted-foreground">
                    Guided by security professionals with extensive industry experience
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-muted/30 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Custom Scenarios</h3>
                  <p className="text-sm text-muted-foreground">
                    See how CyberCaution addresses your organization's specific challenges
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-muted/30 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Obligation</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about our solutions without any pressure or commitment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DemoPage;