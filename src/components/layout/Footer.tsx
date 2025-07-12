import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2,
  Lightbulb,
  CircleDollarSign,
  FileText,
  MessageSquare,
  HelpCircle,
  Info,
  Briefcase,
  Shield,
  ScrollText,
  ExternalLink,
  AlertTriangle,
  Mail,
  Phone
} from 'lucide-react';
import { SUBDOMAIN_URLS } from '../../utils/navigation';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const version = 'v2.0.0';
  
  return (
    <footer className="bg-muted/30 border-t border-border py-8 dark:bg-dark-surface/30">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {/* Company Info - Compact */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center group mb-3">
              <img 
                src="/cybercaution.png" 
                alt="CyberCaution Logo"
                className="h-12 w-12 transform group-hover:scale-110 transition-transform" 
              />
              <div className="ml-2">
                <span className="text-lg font-bold text-foreground">CyberCaution™</span>
                <span className="text-xs block text-muted-foreground">by ERMITS</span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground mb-3">
              CISA #StopRansomware partner providing proactive ransomware risk management.
            </p>
            
            {/* Contact Info - Condensed */}
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <Mail className="h-3 w-3 text-muted-foreground mr-2" />
                <a href="mailto:contact@ermits.com" className="text-foreground hover:text-primary">
                  contact@ermits.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 text-muted-foreground mr-2" />
                <a href="tel:+18886186160" className="text-foreground hover:text-primary">
                  +1 (240) 599-0102
                </a>
              </div>
            </div>
          </div>
          
          {/* Solutions & Resources Combined */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Solutions & Resources</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to="/solutions" className="flex items-center text-muted-foreground hover:text-primary">
                  <Building2 className="h-3 w-3 mr-2" />
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/features" className="flex items-center text-muted-foreground hover:text-primary">
                  <Lightbulb className="h-3 w-3 mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="flex items-center text-muted-foreground hover:text-primary">
                  <CircleDollarSign className="h-3 w-3 mr-2" />
                  Pricing
                </Link>
              </li>
              <li>
                <a 
                  href={`${SUBDOMAIN_URLS.RESOURCES}/documentation`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <FileText className="h-3 w-3 mr-2" />
                  Documentation
                  <ExternalLink className="h-2.5 w-2.5 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href={`${SUBDOMAIN_URLS.RESOURCES}/guides`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <BookOpen className="h-3 w-3 mr-2" />
                  Security Guides
                  <ExternalLink className="h-2.5 w-2.5 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href={`${SUBDOMAIN_URLS.RESOURCES}/support`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <HelpCircle className="h-3 w-3 mr-2" />
                  Support
                  <ExternalLink className="h-2.5 w-2.5 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company & Compliance */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Company & Compliance</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to="/about" className="flex items-center text-muted-foreground hover:text-primary">
                  <Info className="h-3 w-3 mr-2" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/company/careers" className="flex items-center text-muted-foreground hover:text-primary">
                  <Briefcase className="h-3 w-3 mr-2" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center text-muted-foreground hover:text-primary">
                <MessageSquare className="h-3 w-3 mr-2" />
                Contact
              </Link>
            </li>
            <li>
              <Link to="/support" className="flex items-center text-muted-foreground hover:text-primary">
                <HelpCircle className="h-3 w-3 mr-2" />
                Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="flex items-center text-muted-foreground hover:text-primary">
                <MessageSquare className="h-3 w-3 mr-2" />
                FAQ
        
            </li>
            <li>
        {/* Footer Bottom - Single Row */}
            </ul>
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-border text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-muted-foreground">
              &copy; {currentYear} ERMITS LLC. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-secure-green mr-2"></span>
              <span className="text-xs text-muted-foreground">CISA Compliance: Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <span className="text-xs text-muted-foreground">{version}</span>
            <a 
              href={`${SUBDOMAIN_URLS.RESOURCES}/blog`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary inline-flex items-center"
            >
              Blog
              <ExternalLink className="h-2.5 w-2.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  )
}
  )
}
  )
}
  )
}