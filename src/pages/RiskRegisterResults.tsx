import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart3, 
  Download, 
  FileText, 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import { RiskCategory, RiskSeverity, RiskStatus } from '../types';

const RiskRegisterResults = () => {
  const navigate = useNavigate();
  
  // Mock data for the risk register results
  const mockResults = {
    totalRisks: 12,
    risksByCategory: {
      [RiskCategory.Technology]: 5,
      [RiskCategory.Operational]: 3,
      [RiskCategory.SupplyChain]: 2,
      [RiskCategory.People]: 1,
      [RiskCategory.Strategic]: 1
    },
    risksBySeverity: {
      [RiskSeverity.Critical]: 2,
      [RiskSeverity.High]: 4,
      [RiskSeverity.Medium]: 3,
      [RiskSeverity.Low]: 3
    },
    risksByStatus: {
      [RiskStatus.New]: 3,
      [RiskStatus.Assessed]: 2,
      [RiskStatus.InTreatment]: 4,
      [RiskStatus.Mitigated]: 2,
      [RiskStatus.Accepted]: 1
    },
    nistCsfMapping: {
      'ID.RA-1': 8,
      'ID.RA-2': 6,
      'ID.RA-3': 5,
      'ID.RA-4': 4,
      'ID.RA-5': 7,
      'ID.RA-6': 3
    },
    completedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const handleExportRiskRegister = () => {
    // In a real application, this would generate and download a risk register
    alert('Exporting risk register to Excel');
  };

  const handleDownloadTemplate = () => {
    // In a real application, this would download a template
    alert('Downloading NIST CSF-aligned risk register template');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate('/app/risk-register')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Risk Register
          </Button>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Risk Register Analysis</h1>
          <p className="text-muted-foreground">NIST CSF ID.RA Control Mapping and Risk Analysis</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportRiskRegister}>
            <Download className="mr-2 h-4 w-4" />
            Export Risk Register
          </Button>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <FileText className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Risks</p>
                <h3 className="text-3xl font-bold">{mockResults.totalRisks}</h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10 text-primary">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical & High</p>
                <h3 className="text-3xl font-bold">{mockResults.risksBySeverity[RiskSeverity.Critical] + mockResults.risksBySeverity[RiskSeverity.High]}</h3>
              </div>
              <div className="rounded-full p-3 bg-destructive/10 text-destructive">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Treatment</p>
                <h3 className="text-3xl font-bold">{mockResults.risksByStatus[RiskStatus.InTreatment]}</h3>
              </div>
              <div className="rounded-full p-3 bg-warning/10 text-warning">
                <Shield className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mitigated</p>
                <h3 className="text-3xl font-bold">{mockResults.risksByStatus[RiskStatus.Mitigated]}</h3>
              </div>
              <div className="rounded-full p-3 bg-success/10 text-success">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NIST CSF ID.RA Mapping */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            NIST CSF ID.RA Control Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(mockResults.nistCsfMapping).map(([control, count]) => (
              <div key={control}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{control}</span>
                    <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                      {count} risks
                    </span>
                  </div>
                  <span className="text-sm font-bold">{Math.round((count / mockResults.totalRisks) * 100)}%</span>
                </div>
                
                <div className="w-full bg-muted h-2 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-primary" 
                    style={{ width: `${(count / mockResults.totalRisks) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Risks by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(mockResults.risksByCategory)
                .filter(([_, count]) => count > 0)
                .sort(([_, countA], [__, countB]) => countB - countA)
                .map(([category, count]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                    
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="h-2 rounded-full bg-primary" 
                        style={{ width: `${(count / mockResults.totalRisks) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Risks by Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(mockResults.risksBySeverity)
                .filter(([_, count]) => count > 0)
                .map(([severity, count]) => {
                  let barColor = "bg-success";
                  if (severity === RiskSeverity.Critical) barColor = "bg-destructive";
                  else if (severity === RiskSeverity.High) barColor = "bg-warning";
                  else if (severity === RiskSeverity.Medium) barColor = "bg-primary";
                  
                  return (
                    <div key={severity}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{severity}</span>
                        <span className="text-sm font-bold">{count}</span>
                      </div>
                      
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${barColor}`}
                          style={{ width: `${(count / mockResults.totalRisks) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Findings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
              <h3 className="font-medium mb-2 text-foreground">NIST CSF Alignment</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Strong coverage of ID.RA-1 (Asset vulnerabilities) with 8 mapped risks</li>
                <li>Good coverage of ID.RA-5 (Risk determination) with 7 mapped risks</li>
                <li>Improvement needed for ID.RA-6 (Risk responses) with only 3 mapped risks</li>
              </ul>
            </div>
            
            <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
              <h3 className="font-medium mb-2 text-foreground">Risk Distribution</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Technology risks represent the largest category (42% of all risks)</li>
                <li>Critical and High severity risks account for 50% of the risk register</li>
                <li>33% of risks are currently in treatment phase</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium">Develop Risk Responses</h3>
                <p className="text-muted-foreground text-sm">
                  Increase coverage of ID.RA-6 by developing and documenting risk responses for all critical and high risks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium">Prioritize Technology Risks</h3>
                <p className="text-muted-foreground text-sm">
                  Focus on technology risks, which represent the largest category in your risk register.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium">Conduct Ransomware Tabletop Exercise</h3>
                <p className="text-muted-foreground text-sm">
                  Use the identified risks to develop realistic ransomware tabletop exercise scenarios.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={() => navigate('/app/risk-register')}>
              Return to Risk Register
              <ArrowLeft className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskRegisterResults;