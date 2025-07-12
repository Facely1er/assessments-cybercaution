import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { Shield, Download, FileText, ArrowRight, ExternalLink, AlertTriangle, Info } from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';

const CisaResourcesSection = () => {
  return (
    <section className="py-16 bg-muted/10 relative overflow-hidden">
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-1 mb-4">
              <Shield className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">CISA #StopRansomware Resources</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Official CISA Cybersecurity Resources</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access critical cybersecurity guidance from the Cybersecurity and Infrastructure Security Agency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-critical-red/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-critical-red" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">CISA Alerts & Advisories</h3>
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest cybersecurity alerts, vulnerabilities, and advisories from CISA.
                </p>
                <a 
                  href="https://www.cisa.gov/news-events/cybersecurity-advisories" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Access Alerts
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Ransomware Guide</h3>
                <p className="text-muted-foreground mb-4">
                  CISA's comprehensive guide on ransomware prevention, detection, and response for organizations.
                </p>
                <a 
                  href="https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Download Guide
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                  <Info className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Security Assessment</h3>
                <p className="text-muted-foreground mb-4">
                  Evaluate your organization's ransomware readiness with our CISA-aligned assessment tool.
                </p>
                <Link to="/ransomware-assessment">
                  <Button className="mt-2">
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://www.cisa.gov/stopransomware" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-primary hover:underline"
            >
              Visit CISA #StopRansomware Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CisaResourcesSection;