import React, { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  Shield, 
  AlertTriangle, 
  Menu, 
  Sun, 
  Moon, 
  LogOut, 
  ChevronDown, 
  HelpCircle,
  Bell,
  ExternalLink,
  Check,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { CISAComplianceTracker } from '../CISAComplianceTracker';

interface AssessmentLayoutProps {
  children?: ReactNode;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ 
  children,
  toggleDarkMode,
  darkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const assessmentTools = [
    { path: '/cisa-ransomware-readiness-assessment', name: 'CISA Ransomware Readiness Assessment' },
    { path: '/zero-trust-maturity-assessment', name: 'Zero Trust Maturity Assessment' },
    { path: '/network-segmentation-assessment', name: 'Network Segmentation Assessment' },
    { path: '/backup-readiness-assessment', name: 'Backup Readiness Assessment' },
    { path: '/incident-response-plan-assessment', name: 'Incident Response Plan Assessment' },
    { path: '/vulnerability-management-assessment', name: 'Vulnerability Management Assessment' },
    { path: '/ransomware-assessment', name: 'Ransomware Assessment' },
    { path: '/supply-chain-assessment', name: 'Supply Chain Risk Assessment' },
    { path: '/tabletop-exercise', name: 'Tabletop Exercise' },
    { path: '/nist-csf-alignment', name: 'NIST CSF Alignment' },
    { path: '/security-awareness', name: 'Security Awareness' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Security Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="h-10 w-10 mr-2 group-hover:opacity-90 transition-opacity">
                  <img 
                    src="/logo.png" 
                    alt="CISA Assessment Tools Logo" 
                    className="h-full w-full" 
                  />
                </div>
                <div>
                  <span className="text-lg font-bold text-foreground">CyberCaution Assessment Tools</span>
                  <div className="text-xs flex items-center text-primary">
                    <Check className="h-3 w-3 mr-1" />
                    <span>Official CISA Guidance Aligned</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center text-foreground hover:text-primary transition-colors px-3 py-2 text-sm">
                  Assessments
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </button>
                <div className="absolute hidden group-hover:block w-72 bg-card shadow-lg rounded-md border border-border mt-1 p-2 right-0 z-50">
                  <div className="space-y-1">
                    {assessmentTools.map((tool) => (
                      <Link 
                        key={tool.path} 
                        to={tool.path} 
                        className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <a 
                href="https://www.cisa.gov/stopransomware" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-foreground hover:text-primary transition-colors px-3 py-2 text-sm"
              >
                CISA Resources
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>

              <a 
                href="https://cybercaution.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-foreground hover:text-primary transition-colors px-3 py-2 text-sm"
              >
                Main Site
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="py-2 px-4 space-y-1">
            {assessmentTools.map((tool) => (
              <Link 
                key={tool.path} 
                to={tool.path} 
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
            <a 
              href="https://www.cisa.gov/stopransomware" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              CISA Resources
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
            <a 
              href="https://cybercaution.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Main Site
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
            <div className="border-t border-border my-2 pt-2">
              <button 
                className="flex w-full items-center px-3 py-2 text-base font-medium rounded-md hover:bg-muted transition-colors"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <>
                    <Sun className="mr-2 h-5 w-5" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-5 w-5" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CISA Compliance Indicator */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">CISA Cross-Sector Cybersecurity Performance Goals (CPGs) Assessment</span>
          </div>
          <a 
            href="https://www.cisa.gov/cross-sector-cybersecurity-performance-goals" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm flex items-center"
          >
            Learn more
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children || <Outlet />}
      </main>

      {/* Assessment Progress */}
      <CISAComplianceTracker />

      {/* Security Footer */}
      <footer className="bg-muted/30 border-t border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">CISA Assessment Tools</span>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-xs text-muted-foreground mr-4">
                Based on CISA guidelines and best practices
              </span>
              <a 
                href="https://www.cisa.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center"
              >
                CISA.gov
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};