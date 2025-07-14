import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle, HelpCircle, Shield, Building2, Users, FileText, Server, ArrowRight } from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/useSupabase';

const Pricing = () => {
  // Fetch dynamic pricing data from database
  const { data: pricingPlans, loading: plansLoading } = useSupabaseQuery('pricing_plans', {
    filter: (query) => query.eq('active', true),
    orderBy: { column: 'order_index', ascending: true }
  });

  // Fallback pricing plans if database is not available
  const fallbackPlans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with risk management",
      price: "49",
      billing: "per user/month",
      popular: false,
      features: [
        "Up to 100 risks",
        "Basic risk assessment",
        "5 custom reports",
        "Email support",
        "1 compliance framework",
        "Basic analytics"
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing organizations with complex needs",
      price: "99",
      billing: "per user/month",
      popular: true,
      features: [
        "Unlimited risks",
        "Advanced risk assessment",
        "Unlimited custom reports",
        "Priority support",
        "3 compliance frameworks",
        "Advanced analytics",
        "Custom workflows",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Contact us",
      billing: "custom pricing",
      popular: false,
      features: [
        "Everything in Professional",
        "Unlimited compliance frameworks",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment option",
        "Custom feature development",
        "Training and consulting"
      ]
    }
  ];

  // Use dynamic plans if available, otherwise fallback
  const plans = !plansLoading && pricingPlans?.length ? 
    pricingPlans.map(plan => ({
      ...plan,
      features: Array.isArray(plan.features) ? plan.features : []
    })) : fallbackPlans;

  const featuredClients = [
    "Healthcare Systems", "Financial Institutions", "Government Agencies", 
    "Technology Companies", "Manufacturing", "Critical Infrastructure"
  ];

  return (
    <div className="py-20">
      <AnimatedSection type="fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h1>
          <p className="text-xl text-orange-500 max-w-3xl mx-auto">
            Choose the plan that best fits your organization's needs
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection type="fadeIn" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-6">
          {plans.map((plan, index) => (
            <AnimatedItem 
              key={index} 
              type="fadeIn" 
              delay={index * 0.1 + 0.2} 
              className={`relative dark:border-muted ${plan.popular ? 'border-[#FF6B00] shadow-lg dark:shadow-[#FF6B00]/10' : ''}`}
            >
              <Card>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FF6B00] text-white text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-end gap-2">
                      {plan.price === "Contact us" ? (
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      ) : (
                        <>
                          <span className="text-sm mt-2 text-foreground">$</span>
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.billing}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "orange" : "outline"}
                  >
                    Get Started
                  </Button>
                  <Link to="/solutions#financial">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>

      {/* Feature Comparison */}
      <AnimatedSection type="fadeIn" delay={0.3} className="mt-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Compare Plans</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find the perfect fit for your organization's needs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="p-4 text-left font-semibold">Feature</th>
                <th className="p-4 text-center font-semibold">Starter</th>
                <th className="p-4 text-center font-semibold">Professional</th>
                <th className="p-4 text-center font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Security Assessment</td>
                <td className="p-4 text-center">Basic</td>
                <td className="p-4 text-center">Advanced</td>
                <td className="p-4 text-center">Enterprise-grade</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Risk Register & Assessment</td>
                <td className="p-4 text-center">Up to 100 risks</td>
                <td className="p-4 text-center">Unlimited</td>
                <td className="p-4 text-center">Unlimited + Custom fields</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Supply Chain Risk</td>
                <td className="p-4 text-center">Basic assessment</td>
                <td className="p-4 text-center">Advanced monitoring</td>
                <td className="p-4 text-center">Comprehensive management</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Tabletop Exercises</td>
                <td className="p-4 text-center">1 template</td>
                <td className="p-4 text-center">5 templates</td>
                <td className="p-4 text-center">Unlimited + Custom</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">NIST CSF Alignment</td>
                <td className="p-4 text-center">Basic</td>
                <td className="p-4 text-center">Advanced</td>
                <td className="p-4 text-center">Comprehensive</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Business Impact Analysis</td>
                <td className="p-4 text-center">Basic</td>
                <td className="p-4 text-center">Advanced</td>
                <td className="p-4 text-center">Enterprise-grade</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Documentation</td>
                <td className="p-4 text-center">10 templates</td>
                <td className="p-4 text-center">50 templates</td>
                <td className="p-4 text-center">Unlimited + Custom</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Support</td>
                <td className="p-4 text-center">Email</td>
                <td className="p-4 text-center">Email & Phone</td>
                <td className="p-4 text-center">Dedicated Support</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Custom Integrations</td>
                <td className="p-4 text-center">—</td>
                <td className="p-4 text-center">Limited</td>
                <td className="p-4 text-center"><CheckCircle className="inline h-5 w-5 text-secure-green" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* Features by industry */}
      <AnimatedSection type="fadeIn" delay={0.4} className="py-16 px-4 md:px-6 bg-muted/30 dark:bg-muted/10 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Industry-Specific Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each plan can be customized with industry-specific features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-[#FF6B00]" />
                  Financial Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>GLBA compliance templates</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Financial regulatory controls</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Customer data protection</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#FF6B00]" />
                  Healthcare
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>HIPAA compliance features</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>PHI protection controls</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business associate assessment</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-[#FF6B00]" />
                  Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>DevSecOps integration</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Cloud security controls</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>API security assessment</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-[#FF6B00]" />
                  Manufacturing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Supply chain security</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>OT/IT security integration</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <span>ICS security controls</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Trusted By Section */}
      <AnimatedSection type="fadeIn" delay={0.5} className="mt-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Trusted By</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Organizations across various industries rely on CyberCaution by ERMITS® for their security needs
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
            {featuredClients.map((client, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-4 h-24 flex items-center justify-center text-center">
                  <span className="text-foreground font-medium">{client}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection type="fadeIn" delay={0.6} className="mt-16 max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              question: "How are user licenses calculated?",
              answer: "User licenses are based on the number of users who need access to the platform. We offer flexible licensing options for different user roles, including full users, read-only users, and executive dashboard users."
            },
            {
              question: "Do you offer discounts for non-profit organizations?",
              answer: "Yes, we offer special pricing for non-profit organizations, educational institutions, and healthcare providers. Please contact our sales team for details."
            },
            {
              question: "Can I upgrade or downgrade my plan later?",
              answer: "Yes, you can upgrade your plan at any time. Downgrades can be processed at the end of your current billing cycle."
            },
            {
              question: "Is there a free trial available?",
              answer: "We offer a 14-day free trial of our Professional plan. You can also request a customized demo of any plan to see how it aligns with your specific needs."
            },
            {
              question: "What kind of support is included?",
              answer: "All plans include some level of support. Starter plans include email support during business hours. Professional plans add phone support. Enterprise plans include dedicated support with guaranteed response times."
            }
          ].map((faq, index) => (
            <Card key={index} className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection type="fadeIn" delay={0.7} className="mt-16">
        <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden max-w-6xl mx-auto">
          {/* Background glow effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Strengthen Your Security Posture?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Start with a free assessment or schedule a personalized demo today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button variant="white" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-white/90">
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ransomware-assessment">
                <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-muted/50 dark:bg-muted/20 rounded-lg p-4">
          <HelpCircle className="h-5 w-5 text-[#FF6B00]" />
          <p className="text-sm text-foreground">
            Need a custom plan? <Button variant="link" className="p-0 text-[#FF6B00]">Contact our sales team</Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;