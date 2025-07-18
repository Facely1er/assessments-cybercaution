import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';  
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/useSupabase';
import { 
  Shield, AlertTriangle, Network, Globe, HeartPulse, Briefcase, 
  Factory, Building2, Landmark, GraduationCap, CheckCircle as Check, 
  FileText, Lock, BookOpen, Users, Download, Scale, CloudCog, 
  RefreshCw, FileCheck, Eye, TrendingUp, Zap, Brain, Activity
} from 'lucide-react';

// Map of Lucide icon names to components for dynamic icon loading
const LucideIcons: Record<string, React.FC<any>> = {
  Shield, AlertTriangle, Network, Globe, HeartPulse, Briefcase, Factory, 
  Building2, Landmark, GraduationCap, CheckCircle, FileText, Lock, BookOpen, 
  Users, Scale, CloudCog, RefreshCw, FileCheck, Eye, TrendingUp, Zap, Brain, Activity
};

const Pricing = () => {
  // Fetch pricing plans from Supabase
  const pricingPlansOptions = React.useMemo(() => ({
    filter: (query) => query.eq('is_active', true),
    orderBy: { column: 'sort_order', ascending: true }
  }), []);
  const { data: pricingPlans, loading: plansLoading, error: plansError } = useSupabaseQuery('pricing_plans', pricingPlansOptions);

  // Fetch industry solutions from Supabase
  const industrySolutionsOptions = React.useMemo(() => ({
    orderBy: { column: 'order_index', ascending: true },
    limit: 6
  }), []);
  const { data: industrySolutions, loading: solutionsLoading, error: solutionsError } = useSupabaseQuery('solutions', industrySolutionsOptions);

  // Process pricing plans data
  const processedPlans = React.useMemo(() => {
    if (!pricingPlans || pricingPlans.length === 0) {
      return [
        {
          name: 'Starter',
          description: 'Perfect for small organizations getting started with cybersecurity',
          price: 0,
          price_label: 'Free',
          billing_label: 'Forever',
          plan_type: 'free',
          features: [
            'Basic security assessment',
            'Ransomware readiness check',
            'Email security guidelines',
            'Community support',
            'Basic reporting'
          ],
          cta_label: 'Start Free',
          cta_link: '/quick-cyber-check',
          popular: false
        },
        {
          name: 'Professional',
          description: 'Comprehensive security for growing organizations',
          price: 149,
          price_label: '$149',
          billing_label: 'per month',
          plan_type: 'professional',
          features: [
            'All Starter features',
            'Advanced threat profiling',
            'Compliance gap analysis',
            'Custom policy generation',
            'Priority email support',
            'Detailed analytics and reporting',
            'Multi-user collaboration'
          ],
          cta_label: 'Start Trial',
          cta_link: '/demo',
          popular: true
        },
        {
          name: 'Enterprise',
          description: 'Advanced security solutions for large organizations',
          price: 449,
          price_label: '$449',
          billing_label: 'per month',
          plan_type: 'enterprise',
          features: [
            'All Professional features',
            'Custom integrations',
            'Dedicated account manager',
            'Phone and priority support',
            'Custom training sessions',
            'Advanced API access',
            'White-label options'
          ],
          cta_label: 'Contact Sales',
          cta_link: '/contact',
          popular: false
        }
      ];
    }

    return pricingPlans.map(plan => {
      // Determine CTA based on plan type
      let cta_label = 'Get Started';
      let cta_link = '/demo';
      
      if (plan.plan_type === 'free') {
        cta_label = 'Start Free';
        cta_link = '/quick-cyber-check';
      } else if (plan.plan_type === 'enterprise' || plan.plan_type === 'custom') {
        cta_label = 'Contact Sales';
        cta_link = '/contact';
      } else {
        cta_label = 'Start Trial';
        cta_link = '/demo';
      }

      // Format price display
      let price_display = plan.price_monthly || 0;
      let price_label = plan.price_monthly ? `$${plan.price_monthly}` : 'Free';
      let billing_label = 'per month';
      
      if (plan.plan_type === 'free') {
        price_label = 'Free';
        billing_label = 'Forever';
      } else if (plan.plan_type === 'custom') {
        price_label = 'Custom';
        billing_label = 'Contact us';
      }

      return {
        ...plan,
        price: price_display,
        price_label,
        billing_label,
        cta_label,
        cta_link,
        features: Array.isArray(plan.features) ? plan.features : []
      };
    });
  }, [pricingPlans]);

  // Process industry solutions data
  const processedSolutions = React.useMemo(() => {
    if (!industrySolutions || industrySolutions.length === 0) {
      return [
        {
          title: 'Healthcare',
          description: 'HIPAA-compliant security solutions for healthcare organizations',
          icon: HeartPulse,
          tagline: 'Protect patient data with specialized healthcare security'
        },
        {
          title: 'Financial Services',
          description: 'Regulatory-compliant solutions for financial institutions',
          icon: Landmark,
          tagline: 'Meet compliance requirements with financial-grade security'
        },
        {
          title: 'Manufacturing',
          description: 'Industrial cybersecurity for manufacturing environments',
          icon: Factory,
          tagline: 'Secure operational technology and industrial systems'
        },
        {
          title: 'Education',
          description: 'Student data protection and campus security solutions',
          icon: GraduationCap,
          tagline: 'Protect student records and educational systems'
        },
        {
          title: 'Government',
          description: 'FISMA-compliant security for government agencies',
          icon: Building2,
          tagline: 'Meet federal security requirements and guidelines'
        },
        {
          title: 'Technology',
          description: 'Advanced security for technology companies',
          icon: Brain,
          tagline: 'Protect intellectual property and customer data'
        }
      ];
    }

    return industrySolutions.map(solution => {
      // Map icon string to component
      const IconComponent = LucideIcons[solution.icon as keyof typeof LucideIcons] || Shield;
      
      return {
        ...solution,
        icon: IconComponent
      };
    });
  }, [industrySolutions]);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-6 mb-16">
          {plansLoading ? (
            // Loading state
            [...Array(3)].map((_, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <Card className="relative dark:border-muted animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="h-12 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                    </div>
                    <div className="space-y-3 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 bg-muted rounded w-full"></div>
                      ))}
                    </div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))
          ) : plansError ? (
            // Error state
            <div className="col-span-3 text-center py-12">
              <AlertTriangle className="h-12 w-12 text-warning-amber mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Unable to load pricing plans</h3>
              <p className="text-muted-foreground">Please try again later or contact support.</p>
            </div>
          ) : (
            // Render pricing plans
            processedPlans.map((plan, index) => (
              <AnimatedItem 
                key={plan.id || index}
                type="fadeIn"
                delay={index * 0.1 + 0.2}
                className={`relative dark:border-muted ${plan.is_popular || plan.popular ? 'border-[#FF6B00] shadow-lg dark:shadow-[#FF6B00]/10' : ''}`}
              >
                <Card>
                  {(plan.is_popular || plan.popular) && (
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
                        <span className="text-4xl font-bold text-foreground">{plan.price_label}</span>
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
            ))
          )}
        </div>
      </AnimatedSection>

      {/* Industry-Specific Solutions */}
      <AnimatedSection type="fadeIn" delay={0.3} className="bg-muted/30 dark:bg-muted/10 py-16 px-4 md:px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Industry-Specific Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tailored cybersecurity solutions designed for your industry's unique challenges and compliance requirements
            </p>
          </div>

          {solutionsLoading ? (
            // Loading state for solutions
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow dark:border-muted animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 bg-muted rounded-lg mb-4"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : solutionsError ? (
            // Error state for solutions
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-warning-amber mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Unable to load industry solutions</h3>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          ) : processedSolutions.length === 0 ? (
            // No data state for solutions
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Industry Solutions Coming Soon</h3>
              <p className="text-muted-foreground">We're working on industry-specific solutions tailored to your needs.</p>
            </div>
          ) : (
            // Render industry solutions
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedSolutions.map((solution, index) => (
                <AnimatedItem key={solution.solution_id || index} type="fadeIn" delay={index * 0.1}>
                  <Card className="hover:shadow-lg transition-shadow dark:border-muted h-full">
                    <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                        {React.createElement(solution.icon, { 
                          className: 'h-6 w-6 text-[#FF6B00]' 
                        })}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{solution.title}</h3>
                      <p className="text-muted-foreground mb-4">{solution.description}</p>
                      {solution.tagline && (
                        <p className="text-sm text-[#FF6B00] font-medium">{solution.tagline}</p>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/solutions">
              <Button variant="orange">
                View All Industry Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
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