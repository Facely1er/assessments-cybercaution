import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Clock, 
  Calculator, 
  Server, 
  Database, 
  FileText, 
  CheckCircle, 
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';

const RecoveryTimeCalculator: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recovery Time Calculator</h1>
          <p className="text-lg text-gray-600">
            Estimate recovery time objectives and business continuity metrics
          </p>
        </div>

        {/* System Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Select System Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'database', name: 'Database Systems', icon: Database },
                { id: 'file-servers', name: 'File Servers', icon: FileText },
                { id: 'web-apps', name: 'Web Applications', icon: Server },
                { id: 'email', name: 'Email Systems', icon: Mail },
                { id: 'erp', name: 'ERP Systems', icon: Building },
                { id: 'crm', name: 'CRM Systems', icon: Users }
              ].map((system) => (
                <div
                  key={system.id}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    selectedSystem === system.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onClick={() => setSelectedSystem(system.id)}
                >
                  <div className="flex items-center gap-3">
                    <system.icon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{system.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Content */}
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Recovery Time Estimation Tool</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Select a system type above to begin calculating estimated recovery time objectives (RTO)
            and recovery point objectives (RPO) based on your infrastructure.
          </p>
          <div className="max-w-md mx-auto">
            <Button 
              disabled={!selectedSystem}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Recovery Time
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryTimeCalculator;