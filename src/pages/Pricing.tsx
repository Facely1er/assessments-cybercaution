import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';  
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/useSupabase';

const Pricing = () => {
  // Fetch pricing plans from Supabase
  const { data: pricingPlans, loading: plansLoading } = useSupabaseQuery('pricing_plans', {
    filter: (query) => query.eq('active', true)
  });

  // Map Supabase data to pricing plan objects 
  const plans = !plansLoading && pricingPlans?.length ? 
    pricingPlans.map(plan => ({
      ...plan,
      features: Array.isArray(plan.features) ? plan.features : []
    })) : [];

  return (
    <div className="py-20">
      <AnimatedSection type="fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Flexible Cybersecurity Plans</h1>
          <p className="text-xl text-orange-500 max-w-3xl mx-auto">
            Choose the plan that fits your organization's security needs
          </p>
        </div>
      </AnimatedSection>

      {/* Pricing Plans */}
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
                      {plan.custom_pricing ? (
                        <span className="text-4xl font-bold text-foreground">{plan.price_label}</span>
                      ) : (
                        <>
                          <span className="text-sm mt-2 text-foreground">$</span>
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.billing_label}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.cta_link}>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      {plan.cta_label}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection type="fadeIn" delay={0.2} className="mt-16 max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              question: "How are user licenses calculated?",
              answer: "User licenses are based on the number of active users who need access to the CyberCaution platform. We offer role-based licensing, with different prices for full users, read-only users, and executive dashboard users."
            },
            {
              question: "Do you offer discounts for non-profit organizations?",
              answer: "Yes, we provide special pricing for qualified non-profit organizations, educational institutions, and healthcare providers. Please contact our sales team for details."
            },
            {
              question: "Can I change my plan later on?",
              answer: "Absolutely, you can upgrade your CyberCaution plan at any time to gain access to more advanced features and higher usage limits. Downgrades take effect at the end of your current billing period."
            },
            {
              question: "Is there a free trial available?",
              answer: "We offer a 14-day free trial of our Professional plan so you can explore CyberCaution's capabilities. You can also schedule a personalized demo to see how each plan aligns with your organization's requirements."
            },
            {
              question: "What type of customer support is included?",
              answer: "All CyberCaution plans include customer support. Our Starter plan offers email support during business hours. The Professional plan adds phone support. Enterprise plans include priority support with SLAs."
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

      {/* CTA Section */}  
      <AnimatedSection type="fadeIn" delay={0.3} className="mt-16">
        <div className="bg-[#FF6B00] rounded-lg p-6 md:p-8 text-center shadow-lg relative overflow-hidden max-w-6xl mx-auto">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Secure Your Organization with CyberCaution
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Take the first step with a free cybersecurity assessment
            </p>
            <div className="flex justify-center">
              <Link to="/ransomware-assessment">
                <Button variant="white" className="bg-white text-[#FF6B00] hover:bg-white/90">
                  Get Free Assessment
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
            Need a custom cybersecurity plan? <Link to="/contact"><Button variant="link" className="p-0 text-[#FF6B00]">Talk to an Expert</Button></Link>  
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;