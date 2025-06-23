import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  ArrowUpRight, 
  ArrowRight, 
  ArrowDown, 
  BarChart3, 
  Clipboard, 
  ClipboardCheck, 
  HelpCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { RiskLikelihood, RiskImpact } from '../types';

const RiskAssessment = () => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Risk Assessment</h1>
          <p className="text-muted-foreground">Evaluate and analyze risks using structured methodologies</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Clipboard className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
          <Button variant="outline">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Templates
          </Button>
        </div>
      </div>

      {/* Risk Assessment Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Risk Assessment Methodology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            RiskGuard uses a structured approach to risk assessment based on industry best practices and frameworks including NIST SP 800-30, ISO 27005, and FAIR.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-2 text-primary" />
                Step 1: Risk Identification
              </h3>
              <p className="text-xs mt-2 text-muted-foreground">
                Identify potential risks to information systems, assets, and operations.
              </p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium flex items-center">
                <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                Step 2: Risk Analysis
              </h3>
              <p className="text-xs mt-2 text-muted-foreground">
                Analyze risks based on likelihood and impact to determine inherent risk levels.
              </p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium flex items-center">
                <ArrowDown className="h-4 w-4 mr-2 text-primary" />
                Step 3: Risk Evaluation
              </h3>
              <p className="text-xs mt-2 text-muted-foreground">
                Evaluate risks against criteria to determine if treatment is required and prioritize actions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Calculation Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Risk Calculation Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border text-sm p-2 bg-muted/30"></th>
                  <th colSpan={5} className="border text-sm p-2 bg-muted/30 text-center">Impact</th>
                </tr>
                <tr>
                  <th className="border text-sm p-2 bg-muted/30 w-28">Likelihood</th>
                  {Object.values(RiskImpact).map((impact) => (
                    <th key={impact} className="border text-sm p-2 bg-muted/30 text-center w-24">
                      {impact}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(RiskLikelihood).map((likelihood, lIndex) => (
                  <tr key={likelihood}>
                    <td className="border text-sm p-2 bg-muted/30">{likelihood}</td>
                    {Object.values(RiskImpact).map((impact, iIndex) => {
                      // Calculate risk score
                      const score = (lIndex + 1) * (iIndex + 1);
                      
                      // Determine color based on score
                      let colorClass = 'bg-green-100 text-green-800';
                      if (score > 15) {
                        colorClass = 'bg-red-100 text-red-800';
                      } else if (score > 10) {
                        colorClass = 'bg-orange-100 text-orange-800';
                      } else if (score > 5) {
                        colorClass = 'bg-yellow-100 text-yellow-800';
                      }
                      
                      return (
                        <td 
                          key={`${likelihood}-${impact}`} 
                          className={`border text-sm p-2 text-center ${colorClass}`}
                        >
                          {score}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-100 text-green-800 p-2 rounded text-sm text-center">
              Low Risk (1-5)
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm text-center">
              Medium Risk (6-10)
            </div>
            <div className="bg-orange-100 text-orange-800 p-2 rounded text-sm text-center">
              High Risk (11-15)
            </div>
            <div className="bg-red-100 text-red-800 p-2 rounded text-sm text-center">
              Critical Risk (16-25)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Impact Assessment Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Impact Level</th>
                  <th className="text-left py-2 px-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Very Low</td>
                  <td className="py-2 px-2">Negligible effect on operations, assets, or individuals</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Low</td>
                  <td className="py-2 px-2">Limited adverse effect on operations, assets, or individuals</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Medium</td>
                  <td className="py-2 px-2">Serious adverse effect on operations, assets, or individuals</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">High</td>
                  <td className="py-2 px-2">Severe or catastrophic adverse effect on operations, assets, or individuals</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-medium">Very High</td>
                  <td className="py-2 px-2">Critical or catastrophic adverse effect requiring immediate action</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Likelihood Assessment Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Likelihood Level</th>
                  <th className="text-left py-2 px-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Very Low</td>
                  <td className="py-2 px-2">Highly unlikely to occur (0-10% probability)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Low</td>
                  <td className="py-2 px-2">Unlikely to occur (11-30% probability)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Medium</td>
                  <td className="py-2 px-2">Somewhat likely to occur (31-60% probability)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">High</td>
                  <td className="py-2 px-2">Likely to occur (61-80% probability)</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-medium">Very High</td>
                  <td className="py-2 px-2">Highly likely to occur (81-100% probability)</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Frameworks and Methodologies */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Risk Assessment Frameworks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium">NIST SP 800-30</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Guide for Conducting Risk Assessments
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium">ISO 27005</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Information Security Risk Management
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium">FAIR (Factor Analysis of Information Risk)</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Quantitative Risk Analysis Framework
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium">NIST Cybersecurity Framework</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Risk Assessment Elements
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium">OCTAVE (Operationally Critical Threat, Asset, and Vulnerability Evaluation)</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Risk-based strategic assessment
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium">COBIT 5 for Risk</h3>
              <p className="text-xs text-muted-foreground mt-1">
                IT Risk Management Framework
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;