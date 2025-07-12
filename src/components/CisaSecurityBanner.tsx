import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ExternalLink, Shield } from 'lucide-react';

const CisaSecurityBanner = () => {
  return (
    <div className="bg-primary/10 dark:bg-primary/20 py-3 border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">CISA #StopRansomware Initiative Partner</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/ransomware-assessment" 
              className="text-primary hover:underline flex items-center"
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              <span>Check your ransomware readiness</span>
            </Link>
            
            <a 
              href="https://www.cisa.gov/stopransomware" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              CISA Resources
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CisaSecurityBanner;