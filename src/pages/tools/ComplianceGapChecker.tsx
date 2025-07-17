import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  FileText, 
  Settings, 
  Download
} from 'lucide-react';

const ComplianceGapChecker: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Gap Checker</h1>
          <p className="text-lg text-gray-600">
            Identify and remediate compliance gaps across frameworks
          </p>
        </div>

        {/* Framework Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Select Compliance Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'nist-csf', name: 'NIST Cybersecurity Framework' },
                { id: 'iso27001', name: 'ISO 27001' },
                { id: 'pci-dss', name: 'PCI DSS' },
                { id: 'hipaa', name: 'HIPAA' },
                { id: 'gdpr', name: 'GDPR' },
                { id: 'soc2', name: 'SOC 2' }
              ].map((framework) => (
                <Button 
                  key={framework.id}
                  variant={selectedFramework === framework.id ? "default" : "outline"}
                  className="h-auto py-4 justify-start"
                  onClick={() => setSelectedFramework(framework.id)}
                >
                  <CheckCircle className={`mr-2 h-4 w-4 ${
                    selectedFramework === framework.id ? 'text-white' : 'text-green-600'
                  }`} />
                  {framework.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Content */}
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Compliance Gap Analysis Tool</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Select a compliance framework above to begin analyzing your organization's 
            compliance posture and identifying potential gaps.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <Button 
                disabled={!selectedFramework}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Start Gap Analysis
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Sample Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceGapChecker;