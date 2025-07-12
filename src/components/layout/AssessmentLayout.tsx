import React, { ReactNode, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
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
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { CISAComplianceTracker } from '../CISAComplianceTracker';
import AssessmentSubNav from '../AssessmentSubNav';
import MainLayout from './MainLayout';

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
    <MainLayout
      toggleDarkMode={toggleDarkMode}
      darkMode={darkMode}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    >
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

      {/* Assessment Sub-Navigation */}
      <AssessmentSubNav />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {children || <Outlet />}
      </div>

      {/* Assessment Progress */}
      <CISAComplianceTracker />
    </MainLayout>
  );
};