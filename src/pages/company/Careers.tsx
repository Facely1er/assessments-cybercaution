import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Users, 
  GraduationCap, 
  Heart, 
  Globe, 
  Zap,
  ArrowRight
} from 'lucide-react';
import AnimatedSection from '../../utils/AnimatedSection';
import AnimatedItem from '../../utils/AnimatedItem';

const Careers = () => {
  const openPositions = [
    {
      id: 'job-1',
      title: 'Senior Security Engineer',
      department: 'Engineering',
      location: 'Gaithersburg, MD',
      type: 'Full-time',
      remote: 'Remote Eligible',
      description: 'Join our team to help design and implement security solutions for our enterprise customers.',
      requirements: [
        '5+ years of experience in security engineering',
        'Experience with cloud security (AWS, Azure, GCP)',
        'Knowledge of NIST frameworks and security standards',
        'Programming experience in Python, Go, or similar languages'
      ]
    },
    {
      id: 'job-2',
      title: 'Product Manager - Risk Management',
      department: 'Product',
      location: 'Gaithersburg, MD',
      type: 'Full-time',
      remote: 'Remote Eligible',
      description: 'Lead the development of our risk management product suite, working closely with engineering and customer success teams.',
      requirements: [
        '3+ years of product management experience',
        'Background in cybersecurity or risk management',
        'Experience with agile development methodologies',
        'Strong communication and stakeholder management skills'
      ]
    },
    {
      id: 'job-3',
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      remote: 'Remote',
      description: 'Help our customers implement and get the most value from our security and compliance solutions.',
      requirements: [
        '3+ years in customer success or account management',
        'Experience with SaaS products',
        'Understanding of security and compliance concepts',
        'Excellent communication and relationship-building skills'
      ]
    },
    {
      id: 'job-4',
      title: 'Security Compliance Consultant',
      department: 'Professional Services',
      location: 'Remote',
      type: 'Full-time',
      remote: 'Remote',
      description: 'Provide expert guidance to customers implementing security frameworks and compliance programs.',
      requirements: [
        'Experience with NIST CSF, ISO 27001, and other security frameworks',
        'Background in security assessments and audits',
        'Excellent client-facing communication skills',
        'Relevant certifications (CISSP, CISA, etc.) preferred'
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Comprehensive Health Benefits',
      description: 'Medical, dental, and vision coverage for you and your dependents'
    },
    {
      icon: Clock,
      title: 'Flexible Work Schedule',
      description: 'Work-life balance with flexible hours and remote work options'
    },
    {
      icon: GraduationCap,
      title: 'Professional Development',
      description: 'Training budget, certification support, and career growth opportunities'
    },
    {
      icon: Zap,
      title: 'Competitive Compensation',
      description: 'Salary, bonuses, and equity options for all full-time employees'
    },
    {
      icon: Globe,
      title: 'Remote-First Culture',
      description: 'Work from anywhere with our distributed team approach'
    },
    {
      icon: Users,
      title: 'Collaborative Environment',
      description: 'Join a team of passionate security professionals making a difference'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Careers at ERMITS</h1>
            <p className="text-xl text-orange-500">Join our team and help build the future of security and risk management</p>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At ERMITS, we're on a mission to simplify risk management and empower organizations to build resilient security programs through innovative technology and expert guidance. We believe that effective security should be accessible to all organizations, regardless of size or industry.
              </p>
              <p className="text-muted-foreground mb-6">
                Our team is passionate about solving complex security challenges and helping our customers protect their most valuable assets. We're looking for talented individuals who share our vision and want to make a meaningful impact in the cybersecurity industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="orange">
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">
                  Meet Our Team
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="ERMITS Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.2}>
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.3}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Open Positions</h2>
          <div className="space-y-6 mb-16">
            {openPositions.map((job, index) => (
              <AnimatedItem key={job.id} type="fadeIn" delay={index * 0.1}>
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <span className="ml-3 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {job.department}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            {job.remote}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start text-sm">
                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                        <Button>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.4}>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Don't See the Right Fit?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. If you don't see a position that matches your skills, send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button variant="orange">
                Submit Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.5} className="mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Hiring Process</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We've designed our hiring process to be transparent, efficient, and respectful of your time.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-8">
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Application Review</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Our team reviews your application and resume
                </p>
              </div>
              
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Initial Interview</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Virtual conversation with our hiring team
                </p>
              </div>
              
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Technical Assessment</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Role-specific skills evaluation
                </p>
              </div>
              
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Final Interview</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Meet with team members and leadership
                </p>
              </div>
              
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">5</span>
                </div>
                <h3 className="font-medium mb-2">Offer</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Welcome to the ERMITS team!
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Careers;