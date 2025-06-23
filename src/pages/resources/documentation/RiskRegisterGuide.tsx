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
  ClipboardList,
  BarChart3,
  FileText,
  Download,
  Link
} from 'lucide-react';

const RiskRegisterGuide = () => {
  const navigate = useNavigate();

  const riskRegisterSteps = [
    {
      title: "Risk Identification",
      description: "Identify ransomware risks to your organization",
      steps: [
        "Identify critical assets that could be affected by ransomware",
        "Document potential ransomware attack vectors",
        "Consider both technical and non-technical vulnerabilities",
        "Review past incidents and near-misses",
        "Incorporate threat intelligence about current ransomware trends"
      ]
    },
    {
      title: "Risk Analysis",
      description: "Analyze and evaluate identified risks",
      steps: [
        "Determine likelihood of ransomware incidents",
        "Assess potential impact on operations",
        "Calculate risk scores based on likelihood and impact",
        "Prioritize risks based on scores",
        "Map risks to NIST CSF ID.RA controls"
      ]
    },
    {
      title: "Risk Treatment",
      description: "Develop and implement risk treatments",
      steps: [
        "Identify treatment options (mitigate, transfer, accept, avoid)",
        "Develop specific action plans for each risk",
        "Assign ownership and deadlines",
        "Implement technical and procedural controls",
        "Document residual risk after treatment"
      ]
    },
    {
      title: "Risk Monitoring",
      description: "Monitor and review risks over time",
      steps: [
        "Establish key risk indicators (KRIs)",
        "Implement regular risk review cadence",
        "Update risk register as environment changes",
        "Track treatment progress and effectiveness",
        "Report on risk status to stakeholders"
      ]
    }
  ];

  const idraControls = [
    {
      id: "ID.RA-1",
      name: "Asset vulnerabilities are identified and documented",
      ransomwareMapping: "Identify vulnerabilities that could be exploited by ransomware, such as unpatched systems, insecure configurations, and weak authentication."
    },
    {
      id: "ID.RA-2",
      name: "Cyber threat intelligence is received from information sharing forums and sources",
      ransomwareMapping: "Gather intelligence about current ransomware threats, tactics, techniques, and procedures from trusted sources."
    },
    {
      id: "ID.RA-3",
      name: "Threats, both internal and external, are identified and documented",
      ransomwareMapping: "Document specific ransomware threats to your organization, including potential attack vectors and threat actors."
    },
    {
      id: "ID.RA-4",
      name: "Potential business impacts and likelihoods are identified",
      ransomwareMapping: "Assess the operational, financial, and reputational impact of potential ransomware attacks on your organization."
    },
    {
      id: "ID.RA-5",
      name: "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk",
      ransomwareMapping: "Calculate ransomware risk levels based on the combination of threats, vulnerabilities, likelihoods, and potential impacts."
    },
    {
      id: "ID.RA-6",
      name: "Risk responses are identified and prioritized",
      ransomwareMapping: "Develop and prioritize specific responses to identified ransomware risks, including preventive and detective controls."
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
          <h1 className="text-4xl font-bold mb-4 text-foreground">Ransomware Risk Register Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How to build and maintain a ransomware risk register aligned with NIST CSF ID.RA controls
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Risk Register Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {riskRegisterSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {step.steps.map((substep, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{substep}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">NIST CSF ID.RA Control Mapping</h2>
          <p className="text-muted-foreground mb-8">
            The NIST Cybersecurity Framework's ID.RA (Identify - Risk Assessment) category provides a structured approach 
            to identifying, analyzing, and managing ransomware risks. Here's how to map your ransomware risks to these controls:
          </p>
          
          <div className="space-y-6">
            {idraControls.map((control) => (
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
                          <p className="text-sm text-muted-foreground">{control.ransomwareMapping}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Risk Register Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Basic Template</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Simple ransomware risk register template with basic fields for small organizations.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ClipboardList className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Advanced Template</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Comprehensive template with NIST CSF mapping and detailed risk analysis.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="dark:border-muted">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Executive Dashboard</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Executive-level dashboard template for ransomware risk reporting.
                </p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Best Practices</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Update your risk register at least quarterly</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Include both technical and non-technical stakeholders in risk identification</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Use consistent scoring methodology for all risks</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Map each risk to specific NIST CSF controls</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Document both inherent and residual risk scores</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button 
            onClick={() => navigate('/app/risk-register')}
            className="mr-4"
          >
            Go to Risk Register
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/app/nist-csf-alignment')}
          >
            View NIST CSF Alignment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskRegisterGuide;