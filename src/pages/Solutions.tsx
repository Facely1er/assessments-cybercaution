import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from '@/components/ui/button';
import { 
  Shield, AlertTriangle, Network, CheckCircle, ArrowRight,
  Plug, Settings, BookOpen, Activity, Users
} from 'lucide-react';

const Solutions = () => {
  const handleStartCyberCheck = () => {
    // Navigate to cyber check page
    window.location.href = '/quick-cyber-check';
  };

  const handleRequestDemo = () => {
    // Navigate to demo request page
    window.location.href = '/onboarding';
  };

  const handleExploreHealthcare = () => {
    // Navigate to healthcare solutions page
    window.location.href = '/solutions/healthcare';
  };

  const handleExploreFinance = () => {
    // Navigate to financial solutions page 
    window.location.href = '/solutions/financial-services';
  };

  const handleExploreManufacturing = () => {
    // Navigate to manufacturing solutions page
    window.location.href = '/solutions/manufacturing';
  };

  const handleViewAllSolutions = () => {
    // Navigate to all solutions page
    window.location.href = '/solutions';
  };

  const handleContactSales = () => {
    // Navigate to contact sales page
    window.location.href = '/contact-sales';
  };

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="mb-16 text-center px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-6 text-foreground scroll-m-20">CyberCaution™ Industry Solutions</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-4">
          Security Orchestration &amp; Governance Platform for Proactive Risk Management
        </p>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
          Industry-specific solutions aligned with regulatory frameworks and optimized for your threat landscape. Streamline compliance, mitigate risk, and enhance operational resilience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={handleStartCyberCheck} className="bg-orange-500 hover:bg-orange-600">
            Start 3-Minute Cyber Check
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleRequestDemo}>
            Request Solution Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="mb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground scroll-m-20">CyberCaution™ Platform</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our integrated platform connects your existing tools, orchestrates workflows, provides a governance framework, aggregates analytics, and delivers human-centric training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center bg-muted/30 p-6 rounded-lg">
              <Plug className="h-16 w-16 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Integration Hub</h3>
              <p className="text-muted-foreground text-center">Connect your existing security tools into a unified ecosystem.</p>
            </div>
            <div className="flex flex-col items-center bg-muted/30 p-6 rounded-lg">
              <Settings className="h-16 w-16 mb-4 text-primary" /> 
              <h3 className="text-xl font-semibold mb-2">Orchestration Engine</h3>
              <p className="text-muted-foreground text-center">Automate security workflows and streamline incident response processes.</p>
            </div>
            <div className="flex flex-col items-center bg-muted/30 p-6 rounded-lg">
              <BookOpen className="h-16 w-16 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Governance Framework</h3>
              <p className="text-muted-foreground text-center">Implement and manage security policies aligned with industry standards.</p>
            </div>
            <div className="flex flex-col items-center bg-muted/30 p-6 rounded-lg">
              <Activity className="h-16 w-16 mb-4 text-primary" /> 
              <h3 className="text-xl font-semibold mb-2">Unified Analytics</h3>
              <p className="text-muted-foreground text-center">Gain comprehensive insights into your security posture with aggregated data.</p>
            </div>
            <div className="flex flex-col items-center bg-muted/30 p-6 rounded-lg">
              <Users className="h-16 w-16 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Human-Centric Training</h3>
              <p className="text-muted-foreground text-center">Empower your team with engaging and effective security awareness training.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground scroll-m-20">Industry-Specific Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CyberCaution provides tailored solutions that address the unique risks, compliance requirements, and operational needs of your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-4 text-[#FF6B00]" />
                <CardTitle>Healthcare</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>HIPAA compliance automation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>Medical device security</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>Telehealth risk management</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleExploreHealthcare}>
                  Explore Healthcare Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Network className="h-10 w-10 mb-4 text-[#FF6B00]" />
                <CardTitle>Financial Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>PCI DSS &amp; SOX compliance</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>Fraud detection &amp; prevention</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>Third-party risk management</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleExploreFinance}>
                  Explore Financial Solutions 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-10 w-10 mb-4 text-[#FF6B00]" />
                <CardTitle>Manufacturing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>OT/IT security integration</span>
                </div>
                <div className="flex items-start"> 
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>Supply chain risk monitoring</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 mt-1 flex-shrink-0" />
                  <span>Industrial IoT protection</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleExploreManufacturing}>
                  Explore Manufacturing Solutions
                  <ArrowRight className="ml-2 h-4 w-4" /> 
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button onClick={handleViewAllSolutions}>
              View All Industry Solutions
              <ArrowRight className="ml-2 h-4 w-4" /> 
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-orange-500 rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/50 via-orange-600/30 to-orange-500/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Secure Your Organization?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                CyberCaution delivers industry-specific solutions that integrate seamlessly into your environment and align with your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"> 
                <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90" onClick={handleContactSales}>
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"  
                  className="bg-transparent text-white border-white hover:bg-white/10"
                  onClick={handleStartCyberCheck}
                >
                  Start 3-Minute Cyber Check
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;