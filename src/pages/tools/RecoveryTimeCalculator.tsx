import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Clock, ArrowLeft, 
  Calculator, 
  Server, 
  Mail,
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
        {/* Back to Toolkit Button */}
        <Link to="/toolkit" className="inline-flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>

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

        {/* Recovery Time Calculation Content */}
        {selectedSystem && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {selectedSystem.name} Recovery Analysis
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Calculate recovery time objectives (RTO) and recovery point objectives (RPO) for {selectedSystem.name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Recovery Time Objective (RTO)</h4>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">4.5 hours</div>
                        <div className="text-sm text-gray-600">Estimated recovery time</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>System restoration:</span>
                          <span>2.5 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data recovery:</span>
                          <span>1.5 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Testing & validation:</span>
                          <span>0.5 hours</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Recovery Point Objective (RPO)</h4>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">15 minutes</div>
                        <div className="text-sm text-gray-600">Maximum data loss</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Backup frequency:</span>
                          <span>Every 15 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Replication lag:</span>
                          <span>5 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data sync time:</span>
                          <span>10 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Recovery Factors</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-2">Infrastructure</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>• Redundant systems: Available</div>
                          <div>• Backup storage: Local + Cloud</div>
                          <div>• Network capacity: 1Gbps</div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-2">Processes</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>• Automated failover: Enabled</div>
                          <div>• Recovery procedures: Documented</div>
                          <div>• Team availability: 24/7</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Calculator className="h-4 w-4 mr-2" />
                      Recalculate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {!selectedSystem && (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Recovery Time Estimation Tool</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Select a system type above to begin calculating estimated recovery time objectives (RTO)
              and recovery point objectives (RPO) based on your infrastructure.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoveryTimeCalculator;