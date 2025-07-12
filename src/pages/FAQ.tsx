import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Search, 
  Shield, 
  Database, 
  Lock, 
  Users, 
  Briefcase, 
  FileText
} from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';

const FAQ = () => {
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'product', name: 'Product', icon: Shield },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'account', name: 'Account & Billing', icon: Briefcase },
    { id: 'assessments', name: 'Assessments', icon: FileText },
    { id: 'data', name: 'Data & Privacy', icon: Database },
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  
  // FAQ Data
  const faqs = [
    {
      id: 'faq-1',
      category: 'product',
      question: 'What is CyberCaution™ by ERMITS?',
      answer: 'CyberCaution™ is a comprehensive risk management SaaS platform designed to help organizations assess, manage, and mitigate security risks, with a particular focus on ransomware protection. It provides NIST-aligned assessments, customized recommendations, and tools to strengthen your security posture.'
    },
    {
      id: 'faq-2',
      category: 'security',
      question: 'Is CyberCaution™ NIST compliant?',
      answer: 'Yes, CyberCaution™ is fully aligned with multiple NIST frameworks including NIST CSF 2.0, NIST SP 800-53, and NIST IR 8374 (Ransomware Risk Management). Our assessments and recommendations are directly mapped to these frameworks to help organizations achieve and maintain compliance.'
    },
    {
      id: 'faq-3',
      category: 'assessments',
      question: 'How long does a ransomware assessment take?',
      answer: 'A typical ransomware readiness assessment takes approximately 30-45 minutes to complete. The assessment consists of multiple sections covering different aspects of ransomware protection, and you can save your progress and return to complete it later if needed.'
    },
    {
      id: 'faq-4',
      category: 'account',
      question: 'How do I change my subscription plan?',
      answer: `You can change your subscription plan at any time from the Account Settings page. Navigate to Account > Subscription, and select "Change Plan." Your new plan will take effect at the start of your next billing cycle. If you're upgrading mid-cycle, we'll prorate the difference.`
    },
    {
      id: 'faq-5',
      category: 'security',
      question: 'How secure is my data in CyberCaution?',
      answer: 'We take data security extremely seriously. All data is encrypted both in transit and at rest using industry-standard encryption. We maintain SOC 2 Type II compliance, conduct regular penetration testing, and follow secure development practices. Your assessment data is never shared with third parties without your explicit permission.'
    },
    {
      id: 'faq-6',
      category: 'assessments',
      question: 'Can I export my assessment results?',
      answer: 'Yes, you can export your assessment results in multiple formats including PDF, CSV, and XLSX. You can also generate executive reports and detailed technical reports from your assessment data, which can be shared with stakeholders or used for compliance documentation.'
    },
    {
      id: 'faq-7',
      category: 'data',
      question: 'How is my data used by CyberCaution?',
      answer: 'We use your data solely to provide and improve our services. This includes generating recommendations, creating reports, and developing aggregated industry benchmarks. We never sell your data or use it for advertising purposes. For more details, please review our Privacy Policy.'
    },
    {
      id: 'faq-8',
      category: 'product',
      question: 'Does CyberCaution integrate with other security tools?',
      answer: 'Yes, CyberCaution™ offers integrations with many popular security tools and platforms including Splunk, Crowdstrike, Microsoft Defender, ServiceNow, Jira, and more. These integrations enable automated data collection, streamlined workflows, and enhanced reporting capabilities.'
    },
    {
      id: 'faq-9',
      category: 'account',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), ACH bank transfers, and wire transfers. For enterprise customers, we also offer invoicing with net-30 payment terms. Contact our sales team for more information on enterprise billing options.'
    },
    {
      id: 'faq-10',
      category: 'data',
      question: 'Can I delete my data from CyberCaution?',
      answer: 'Yes, you have full control over your data. You can delete individual assessments or your entire account at any time through the Account Settings page. When you delete your account, all of your personal data and assessment results are permanently removed from our systems within 30 days, in accordance with our data retention policy.'
    },
    {
      id: 'faq-11',
      category: 'product',
      question: 'Is CyberCaution suitable for small businesses?',
      answer: 'Absolutely! CyberCaution™ is designed to scale for organizations of all sizes. Our Starter plan is specifically tailored for small businesses, offering essential security assessment tools at an affordable price point. The platform\'s recommendations are contextual to your organization's size and industry.'
    },
    {
      id: 'faq-12',
      category: 'security',
      question: 'What should I do if I discover a security vulnerability?',
      answer: 'If you believe you\'ve found a security vulnerability in our platform, please report it immediately to security@ermits.com. We have a responsible disclosure program and take all security reports seriously. Our security team will investigate and respond to your report within 24 hours.'
    }
  ];
  
  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
  
  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
            <h1 className="text-3xl font-bold mb-2 text-foreground">Frequently Asked Questions</h1>
            <p className="text-xl text-orange-500">Get answers to common questions about CyberCaution by ERMITS</p>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.1}>
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full rounded-md border-border bg-background py-3 px-4 pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.2} className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'orange' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center mb-2"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.3}>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <Card key={faq.id} className={`cursor-pointer transition-shadow hover:shadow-md ${
                    expandedQuestions[faq.id] ? 'ring-2 ring-primary/20' : ''
                  }`}>
                    <CardContent className="p-0">
                      <div 
                        className="p-4 flex justify-between items-center"
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        <h3 className="font-medium text-foreground">{faq.question}</h3>
                        {expandedQuestions[faq.id] ? (
                          <ChevronUp className="h-5 w-5 text-primary" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      
                      {expandedQuestions[faq.id] && (
                        <div className="p-4 pt-0 border-t border-border">
                          <p className="text-muted-foreground">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 bg-muted/20 rounded-lg">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No questions found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any questions in this category. Try selecting a different category or search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.4}>
          <div className="bg-muted/20 dark:bg-muted/10 rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is ready to help you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/support">
                <Button variant="orange">
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default FAQ;