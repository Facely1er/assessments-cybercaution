import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Lock,
  Database,
  FileText,
  Users,
  Clock,
  RefreshCw,
  Download
} from 'lucide-react';

const RansomwareDefense = () => {
  const navigate = useNavigate();

  const defenseStrategies = [
    {
      title: "Prevention",
      description: "Implement controls to prevent ransomware infections",
      steps: [
        "Deploy email filtering and anti-phishing solutions",
        "Implement application allowlisting",
        "Keep systems patched and updated",
        "Use multi-factor authentication",
        "Segment networks to limit lateral movement"
      ]
    },
    {
      title: "Detection",
      description: "Detect ransomware activity quickly",
      steps: [
        "Monitor for suspicious file activity",
        "Implement endpoint detection and response",
        "Deploy network monitoring solutions",
        "Enable comprehensive logging",
        "Establish 24/7 monitoring capabilities"
      ]
    },
    {
      title: "Response",
      description: "Respond effectively to ransomware incidents",
      steps: [
        "Develop a ransomware-specific incident response plan",
        "Establish clear decision-making procedures",
        "Create communication templates",
        "Define containment strategies",
        "Document evidence collection procedures"
      ]
    },
    {
      title: "Recovery",
      description: "Recover from ransomware attacks",
      steps: [
        "Maintain offline, encrypted backups",
        "Test backup restoration regularly",
        "Document recovery procedures",
        "Establish business continuity plans",
        "Define recovery prioritization"
      ]
    }
  ];

  const nistControls = [
    {
      id: "PR.AC-1",
      name: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
      implementation: "Implement multi-factor authentication for all accounts, especially privileged and remote access"
    },
    {
      id: "PR.DS-5",
      name: "Protections against data leaks are implemented",
      implementation: "Deploy anti-malware solutions with ransomware-specific detection capabilities"
    },
    {
      id: "PR.IP-4",
      name: "Backups of information are conducted, maintained, and tested",
      implementation: "Maintain offline, encrypted backups with regular testing of restoration procedures"
    },
    {
      id: "DE.CM-4",
      name: "Malicious code is detected",
      implementation: "Implement endpoint detection and response solutions to detect ransomware activity"
    },
    {
      id: "RS.RP-1",
      name: "Response plan is executed during or after an incident",
      implementation: "Develop and maintain a ransomware-specific incident response plan"
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/resources/documentation')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documentation
        </Button>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Ransomware Defense Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive strategies to prevent, detect, respond to, and recover from ransomware attacks
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Defense Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {defenseStrategies.map((strategy, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{strategy.title}</h3>
                  <p className="text-muted-foreground mb-6">{strategy.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {strategy.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">NIST Framework Alignment</h2>
          <p className="text-muted-foreground mb-8">
            The following controls from the NIST Cybersecurity Framework are particularly important for ransomware defense, as highlighted in NIST IR 8374.
          </p>
          
          <div className="space-y-6">
            {nistControls.map((control) => (
              <Card key={control.id} className="dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded mr-2">
                          {control.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium mb-2 text-foreground">{control.name}</h3>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{control.implementation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Critical Ransomware Defenses</h3>
              <p className="text-muted-foreground mb-4">
                Based on NIST IR 8374 and industry best practices, these are the most critical defenses against ransomware:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Implement multi-factor authentication for all remote access</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Maintain offline, encrypted backups and test restoration regularly</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Keep systems patched and updated, especially internet-facing systems</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Segment networks to limit lateral movement</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Develop and test a ransomware-specific incident response plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button 
            onClick={() => navigate('/ransomware-assessment')}
            className="mr-4"
          >
            Start Ransomware Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/tabletop-exercise')}
          >
            View Tabletop Exercises
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RansomwareDefense;