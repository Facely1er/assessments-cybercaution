import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AlertTriangle, 
  Lock, 
  Network, 
  Database, 
  Shield, 
  Target,
  Users,
  Eye,
  FileText,
  Home
} from 'lucide-react';

const AssessmentSubNav: React.FC = () => {
  const location = useLocation();

  const assessmentLinks = [
    {
      name: 'Overview',
      path: '/assessments',
      icon: Home,
      description: 'Assessment portal home'
    },
    {
      name: 'Ransomware',
      path: '/ransomware-assessment',
      icon: AlertTriangle,
      description: 'Ransomware readiness assessment'
    },
    {
      name: 'Zero Trust',
      path: '/zero-trust-maturity-assessment',
      icon: Lock,
      description: 'Zero trust maturity evaluation'
    },
    {
      name: 'Supply Chain',
      path: '/supply-chain-assessment',
      icon: Network,
      description: 'Supply chain risk assessment'
    },
    {
      name: 'Incident Response',
      path: '/incident-response-plan-assessment',
      icon: Shield,
      description: 'Incident response readiness'
    },
    {
      name: 'Vulnerability Mgmt',
      path: '/vulnerability-management-assessment',
      icon: Eye,
      description: 'Vulnerability management assessment'
    },
    {
      name: 'Backup Readiness',
      path: '/backup-readiness-assessment',
      icon: Database,
      description: 'Backup and recovery assessment'
    },
    {
      name: 'Tabletop Exercise',
      path: '/tabletop-exercise',
      icon: Users,
      description: 'Incident response exercises'
    }
  ];

  return (
    <div className="bg-muted/20 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
            {assessmentLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }
                  `}
                  title={link.description}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{link.name}</span>
                  <span className="sm:hidden">{link.name.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="hidden md:flex items-center text-xs text-muted-foreground">
            <FileText className="h-3 w-3 mr-1" />
            <span>Quick Assessment Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSubNav;