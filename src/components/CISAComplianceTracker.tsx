import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Info, Link, Lock } from 'lucide-react';

export const CISAComplianceTracker: React.FC = () => {
  // Mocked data - in a real app, this would be calculated from assessment results
  const cpgCompliance = 72;
  const ransomwareReadiness = 68;
  const zeroTrustMaturity = 'Advanced';
  const incidentResponseScore = 85;
  
  return (
    <div className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CPGComplianceStatus score={cpgCompliance} />
          <RansomwareReadinessScore score={ransomwareReadiness} />
          <ZeroTrustMaturity level={zeroTrustMaturity} />
          <IncidentResponseCapability score={incidentResponseScore} />
        </div>
      </div>
    </div>
  );
};

const CPGComplianceStatus: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="flex items-center">
      <Shield className="h-4 w-4 text-primary mr-2" />
      <div>
        <div className="text-xs text-muted-foreground">CISA CPG Compliance</div>
        <div className="text-sm font-medium">{score}%</div>
      </div>
    </div>
  );
};

const RansomwareReadinessScore: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="flex items-center">
      <AlertTriangle className="h-4 w-4 text-warning-amber mr-2" />
      <div>
        <div className="text-xs text-muted-foreground">Ransomware Readiness</div>
        <div className="text-sm font-medium">{score}%</div>
      </div>
    </div>
  );
};

const ZeroTrustMaturity: React.FC<{ level: string }> = ({ level }) => {
  return (
    <div className="flex items-center">
      <Lock className="h-4 w-4 text-primary mr-2" />
      <div>
        <div className="text-xs text-muted-foreground">Zero Trust Maturity</div>
        <div className="text-sm font-medium">{level}</div>
      </div>
    </div>
  );
};

const IncidentResponseCapability: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="flex items-center">
      <Info className="h-4 w-4 text-electric-blue mr-2" />
      <div>
        <div className="text-xs text-muted-foreground">Incident Response</div>
        <div className="text-sm font-medium">{score}%</div>
      </div>
    </div>
  );
};