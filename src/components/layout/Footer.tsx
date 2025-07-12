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
  Phone,
  BookOpen,
  Wrench,
  Lock
} from 'lucide-react';
import { SUBDOMAIN_URLS } from '../../utils/navigation';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const version = 'v2.0.0';
  
  return (
    <footer className="bg-muted/30 border-t border-border py-6 dark:bg-dark-surface/30">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          {/* Column 1: Company Info */}
          <div>
            <Link to="/" className="flex items-center group mb-2">
              <img 
                src="/cybercaution.png" 
                alt="CyberCaution Logo"
                className="h-10 w-10 transform group-hover:scale-110 transition-transform" 
              />
              <div className="ml-2">
                <span className="text-base font-bold text-foreground">CyberCaution™</span>
                <span className="text-xs block text-muted-foreground">by ERMITS</span>
              </div>
            </Link>
            
            <p className="text-xs text-muted-foreground mb-2">
              CISA #StopRansomware partner providing proactive ransomware risk management.
            </p>
            
            <div className="space-y-1 text-xs">
              <div className="flex items-center">
                <Mail className="h-3 w-3 text-muted-foreground mr-2" />
                <a href="mailto:contact@ermits.com" className="text-muted-foreground hover:text-primary">
                  contact@ermits.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 text-muted-foreground mr-2" />
                <a href="tel:+18886186160" className="text-muted-foreground hover:text-primary">
                  +1 (240) 599-0102
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground">Solutions</h3>
            <ul className="space-y-1 text-xs">
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
                <Link to="/assessments" className="flex items-center text-muted-foreground hover:text-primary">
                  <Shield className="h-3 w-3 mr-2" />
                  Assessments
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground">Resources</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a 
                  href={`${SUBDOMAIN_URLS.RESOURCES}/documentation`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <FileText className="h-3 w-3 mr-2" />
                  Documentation
                  <ExternalLink className="h-2 w-2 ml-1" />
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
                  <ExternalLink className="h-2 w-2 ml-1" />
                </a>
              </li>
              <li>
                <Link to="/toolkit" className="flex items-center text-muted-foreground hover:text-primary">
                  <Wrench className="h-3 w-3 mr-2" />
                  Toolkit
                </Link>
              </li>
              <li>
                <a 
                  href={`${SUBDOMAIN_URLS.RESOURCES}/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <FileText className="h-3 w-3 mr-2" />
                  Blog
                  <ExternalLink className="h-2 w-2 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Company & Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground">Company & Legal</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link to="/about" className="flex items-center text-muted-foreground hover:text-primary">
                  <Info className="h-3 w-3 mr-2" />
                  About
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
                <Link to="/company/privacy" className="flex items-center text-muted-foreground hover:text-primary">
                  <Lock className="h-3 w-3 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/company/terms" className="flex items-center text-muted-foreground hover:text-primary">
                  <ScrollText className="h-3 w-3 mr-2" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - Single Row */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-3 border-t border-border text-xs">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-muted-foreground">
              &copy; {currentYear} ERMITS LLC. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-secure-green mr-2"></span>
              <span className="text-xs text-muted-foreground">CISA Compliance: Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <span className="text-xs text-muted-foreground">{version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;