import React from 'react';
import { AlertTriangle, Phone, Mail, FileText, ExternalLink, Clock } from 'lucide-react';

const IncidentReportingSection = () => {
  return (
    <div className="py-16 bg-muted/20 dark:bg-dark-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Incident Reporting</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Report cybersecurity incidents and get expert assistance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-background dark:bg-dark-surface rounded-lg p-6 border border-border shadow-sm">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-warning-amber mr-2" />
              Report to CISA
            </h3>
            <p className="text-muted-foreground mb-6">
              The Cybersecurity and Infrastructure Security Agency (CISA) encourages proactive reporting of cybersecurity incidents.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">CISA Central</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+18882672583" className="hover:underline">
                      +1 (888) 267-2583
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">Email Reporting</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:central@cisa.gov" className="hover:underline">
                      central@cisa.gov
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">Online Reporting</p>
                  <p className="text-sm text-muted-foreground">
                    <a 
                      href="https://www.cisa.gov/report" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center hover:underline"
                    >
                      Submit report online
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-background dark:bg-dark-surface rounded-lg p-6 border border-border shadow-sm">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Clock className="h-5 w-5 text-warning-amber mr-2" />
              Ransomware Response
            </h3>
            <p className="text-muted-foreground mb-6">
              If your organization is experiencing a ransomware attack, follow these immediate steps:
            </p>
            
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">1</span>
                <div>
                  <p className="font-medium">Isolate affected systems</p>
                  <p className="text-sm text-muted-foreground">Disconnect infected computers from the network</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">2</span>
                <div>
                  <p className="font-medium">Report the incident</p>
                  <p className="text-sm text-muted-foreground">Contact CISA, FBI, and local authorities</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">3</span>
                <div>
                  <p className="font-medium">Preserve evidence</p>
                  <p className="text-sm text-muted-foreground">Take system images and preserve logs</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">4</span>
                <div>
                  <p className="font-medium">Implement response plan</p>
                  <p className="text-sm text-muted-foreground">Follow your incident response plan</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-6">
              <a 
                href="https://www.cisa.gov/stopransomware/ransomware-guide" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center"
              >
                Download CISA Ransomware Response Checklist
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportingSection;