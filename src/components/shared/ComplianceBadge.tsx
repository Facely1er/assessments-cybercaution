// components/shared/ComplianceBadge.tsx
import React from 'react';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  Lock, 
  Key, 
  Settings,
  LucideIcon
} from 'lucide-react';

export type ComplianceFramework = 'nist' | 'iso27001' | 'soc2' | 'gdpr' | 'hipaa' | 'pci' | 'cis' | 'custom';
export type ComplianceStatus = 'compliant' | 'partial' | 'gap' | 'na';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface ComplianceBadgeProps {
  framework: ComplianceFramework;
  status?: ComplianceStatus;
  score?: number;
  details?: string;
  size?: BadgeSize;
  customFrameworkName?: string;
  className?: string;
  onClick?: () => void;
}

interface FrameworkConfig {
  icon: LucideIcon;
  color: string;
  name: string;
  bgColor: string;
  textColor: string;
}

const frameworks: Record<ComplianceFramework, FrameworkConfig> = {
  nist: { 
    icon: Shield, 
    color: 'blue', 
    name: 'NIST CSF',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  iso27001: { 
    icon: FileText, 
    color: 'purple', 
    name: 'ISO 27001',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  soc2: { 
    icon: CheckCircle, 
    color: 'green', 
    name: 'SOC 2',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  gdpr: { 
    icon: Lock, 
    color: 'orange', 
    name: 'GDPR',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600'
  },
  hipaa: { 
    icon: Key, 
    color: 'red', 
    name: 'HIPAA',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600'
  },
  pci: { 
    icon: Shield, 
    color: 'indigo', 
    name: 'PCI DSS',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600'
  },
  cis: { 
    icon: Settings, 
    color: 'gray', 
    name: 'CIS Controls',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600'
  },
  custom: { 
    icon: FileText, 
    color: 'slate', 
    name: 'Custom',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-600'
  }
};

const statusConfig: Record<ComplianceStatus, { label: string; color: string }> = {
  compliant: { label: 'Compliant', color: 'text-green-600' },
  partial: { label: 'Partial', color: 'text-yellow-600' },
  gap: { label: 'Gap', color: 'text-red-600' },
  na: { label: 'N/A', color: 'text-gray-600' }
};

const sizeClasses: Record<BadgeSize, { container: string; icon: string }> = {
  sm: { 
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3'
  },
  md: { 
    container: 'px-3 py-1.5 text-sm',
    icon: 'w-4 h-4'
  },
  lg: { 
    container: 'px-4 py-2 text-base',
    icon: 'w-5 h-5'
  }
};

export const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({ 
  framework, 
  status = 'partial', 
  score,
  details,
  size = 'md',
  customFrameworkName,
  className = '',
  onClick
}) => {
  const frameworkConfig = frameworks[framework];
  const FrameworkIcon = frameworkConfig.icon;
  const currentStatus = statusConfig[status];
  const sizeConfig = sizeClasses[size];
  
  const displayName = framework === 'custom' && customFrameworkName 
    ? customFrameworkName 
    : frameworkConfig.name;

  return (
    <div 
      className={`inline-flex items-center gap-2 bg-white border rounded-lg ${sizeConfig.container} ${
        onClick ? 'cursor-pointer hover:bg-gray-50' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className={`p-1.5 rounded ${frameworkConfig.bgColor}`}>
        <FrameworkIcon className={`${frameworkConfig.textColor} ${sizeConfig.icon}`} />
      </div>
      <div>
        <div className="font-medium text-gray-900">{displayName}</div>
        <div className="text-xs flex items-center gap-2 mt-0.5">
          <span className={currentStatus.color}>
            {currentStatus.label}
          </span>
          {score !== undefined && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{score}%</span>
            </>
          )}
        </div>
      </div>
      {details && (
        <div className="ml-2 text-xs text-gray-500 max-w-[200px] truncate">
          {details}
        </div>
      )}
    </div>
  );
};