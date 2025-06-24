import React, { ReactNode, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Award, 
  Users,
  Smile,
  Globe,
  Heart,
  Zap,
  CheckCircle,
  BookOpen,
  Lock,
  FileCheck,
  Building,
  Clock,
  Star,
  Trophy,
  BarChart,
  Lightbulb,
  Calendar,
  ArrowRight,
  Menu,
  Sun, 
  Moon, 
  LogOut, 
  ChevronDown, 
  HelpCircle,
  Bell,
  ExternalLink,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { CISAComplianceTracker } from '../CISAComplianceTracker';
import Navigation from '../Navigation';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      {/* Navigation Header */}
      <Navigation 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

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
              <span className="text-sm text-muted-foreground">CyberCaution Assessment Portal</span>
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