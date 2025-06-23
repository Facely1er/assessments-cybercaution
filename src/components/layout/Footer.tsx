import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Lightbulb, 
  CircleDollarSign, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  Info, 
  Briefcase, 
  Shield, 
  ScrollText 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const version = 'v2.0.0';
  
  return (
    <footer className="bg-muted/30 border-t border-border py-12 dark:bg-dark-surface/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center group">
              <img 
                src="/cybercaution.png" 
                alt="CyberCaution Logo" 
                className="h-10 w-10 transform group-hover:scale-110 transition-transform" 
              />
              <div className="ml-2">
                <span className="text-xl font-bold text-foreground">CyberCaution™</span>
                <span className="text-xs block text-muted-foreground">by ERMITS</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Proactive ransomware risk management aligned with NIST frameworks.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/solutions" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Building2 className="h-4 w-4 mr-2" />
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/features" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <CircleDollarSign className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/resources/guides" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/resources/blog" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources/support" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/company/careers" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/company/privacy" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/company/terms" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <ScrollText className="h-4 w-4 mr-2" />
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ERMITS LLC. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-secure-green mr-2"></span>
              <span className="text-xs text-muted-foreground">Systems operational</span>
            </div>
            <span className="text-xs text-muted-foreground">{version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;