import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart3, 
  FileText,
  ArrowRight, 
  Building,
  TrendingDown, 
  Clock,
  DollarSign,
  Users,
  Shield,
  Link
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const BusinessImpactPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Business Impact Analysis</h1>
          <p className="text-muted-foreground">Evaluate ransomware impact on business functions and operations</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <RouterLink to="/app/business-impact-tool">
            <Button variant="orange">
              <BarChart3 className="mr-2 h-4 w-4" />
              Launch BIA Tool
            </Button>
          </RouterLink>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Business Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recovery Time</p>
                <h3 className="text-3xl font-bold">72h</h3>
                <p className="text-xs text-muted-foreground">Estimated recovery time</p>
              </div>
              <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Financial Impact</p>
                <h3 className="text-3xl font-bold">$650K</h3>
                <p className="text-xs text-muted-foreground">Estimated per day</p>
              </div>
              <div className="rounded-full p-3 bg-critical-red/10 text-critical-red">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Functions</p>
                <h3 className="text-3xl font-bold">8</h3>
                <p className="text-xs text-muted-foreground">Affected functions</p>
              </div>
              <div className="rounded-full p-3 bg-primary/10 text-primary">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Business Functions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Critical Business Functions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1">Customer Order Processing</h3>
                  <p className="text-sm text-muted-foreground mb-2">Handles all customer orders and payment processing</p>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-warning-amber" />
                    <span>Max Tolerable Downtime: 4 hours</span>
                  </div>
                </div>
                <div className="px-2 py-1 bg-critical-red/10 text-critical-red rounded-md text-sm font-medium">
                  Critical Impact
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1">Customer Support Systems</h3>
                  <p className="text-sm text-muted-foreground mb-2">Provides customer service and support functionality</p>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-warning-amber" />
                    <span>Max Tolerable Downtime: 12 hours</span>
                  </div>
                </div>
                <div className="px-2 py-1 bg-warning-amber/10 text-warning-amber rounded-md text-sm font-medium">
                  High Impact
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1">Inventory Management</h3>
                  <p className="text-sm text-muted-foreground mb-2">Tracks inventory levels and manages stock</p>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-warning-amber" />
                    <span>Max Tolerable Downtime: 24 hours</span>
                  </div>
                </div>
                <div className="px-2 py-1 bg-warning-amber/10 text-warning-amber rounded-md text-sm font-medium">
                  High Impact
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1">Payroll Processing</h3>
                  <p className="text-sm text-muted-foreground mb-2">Manages employee compensation</p>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-warning-amber" />
                    <span>Max Tolerable Downtime: 3 days</span>
                  </div>
                </div>
                <div className="px-2 py-1 bg-electric-blue/10 text-electric-blue rounded-md text-sm font-medium">
                  Medium Impact
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <RouterLink to="/app/business-impact-tool">
              <Button variant="orange">
                Launch Full Analysis Tool
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
          </div>
        </CardContent>
      </Card>

      {/* Financial Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Financial Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Direct Costs</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Revenue Loss</span>
                    <span className="text-sm font-medium">$350,000 / day</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-critical-red" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Recovery Costs</span>
                    <span className="text-sm font-medium">$150,000</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-warning-amber" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Operational Expenses</span>
                    <span className="text-sm font-medium">$75,000 / day</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-electric-blue" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Emergency Response</span>
                    <span className="text-sm font-medium">$75,000</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-electric-blue" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Indirect Costs</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Reputation Damage</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-critical-red" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Customer Churn</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-warning-amber" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Regulatory Penalties</span>
                    <span className="text-sm font-medium">Varies</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-warning-amber" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Legal Actions</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-warning-amber" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <RouterLink to="/app/business-impact-tool">
              <Button variant="orange" className="w-full">
                Launch Detailed Financial Impact Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Improve Recovery Time Objectives (RTOs)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Current recovery times for critical systems exceed business requirements. 
                  Implement the following to reduce RTOs:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">1</div>
                    <span>Enhance backup systems with faster recovery capabilities</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">2</div>
                    <span>Implement redundant systems for critical functions</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">3</div>
                    <span>Develop automated recovery workflows</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">4</div>
                    <span>Test recovery processes quarterly</span>
                  </div>
                </div>
                <div className="mt-4">
                  <RouterLink to="/app/business-impact-tool">
                    <Button variant="orange" className="mt-4">
                      Run Full Impact Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessImpactPage;