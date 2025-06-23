import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  RefreshCw, 
  Clock, 
  FileText, 
  Building2, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Zap,
  Server,
  Network,
  Database,
  ArrowRight,
  Calendar,
  CalendarCheck,
  Heart,
  Activity
} from 'lucide-react';

const ContinuityPage = () => {
  const [activeTab, setActiveTab] = useState('plans');

  // Mock data
  const recoveryPlans = [
    {
      id: 'plan-1',
      name: 'Ransomware Recovery Plan',
      type: 'IT Disaster Recovery',
      lastUpdated: '2025-03-01',
      lastTested: '2025-02-15',
      status: 'Active',
      rto: '24 hours',
      rpo: '4 hours',
      owner: 'IT Security Team',
      version: '2.3',
      critical: true
    },
    {
      id: 'plan-2',
      name: 'Data Center Outage Plan',
      type: 'IT Disaster Recovery',
      lastUpdated: '2025-02-10',
      lastTested: '2025-01-20',
      status: 'Active',
      rto: '4 hours',
      rpo: '15 minutes',
      owner: 'Infrastructure Team',
      version: '3.1',
      critical: true
    },
    {
      id: 'plan-3',
      name: 'Business Continuity Plan',
      type: 'Business Continuity',
      lastUpdated: '2025-01-15',
      lastTested: '2024-12-05',
      status: 'Active',
      rto: '48 hours',
      rpo: 'N/A',
      owner: 'Business Continuity Team',
      version: '1.8',
      critical: false
    }
  ];

  const exercises = [
    {
      id: 'exercise-1',
      name: 'Annual Ransomware Tabletop Exercise',
      type: 'Tabletop',
      date: '2025-02-15',
      status: 'Completed',
      participants: ['IT Security', 'Executive Team', 'Legal', 'Communications'],
      findings: 5,
      owner: 'CISO Office',
      duration: '4 hours'
    },
    {
      id: 'exercise-2',
      name: 'Backup Restoration Test',
      type: 'Functional',
      date: '2025-01-20',
      status: 'Completed',
      participants: ['IT Operations', 'Infrastructure Team'],
      findings: 2,
      owner: 'IT Operations',
      duration: '8 hours'
    },
    {
      id: 'exercise-3',
      name: 'Q2 Crisis Management Exercise',
      type: 'Tabletop',
      date: '2025-04-15',
      status: 'Scheduled',
      participants: ['Executive Team', 'Crisis Management Team', 'Communications'],
      findings: 0,
      owner: 'Risk Management',
      duration: '3 hours'
    }
  ];

  const criticalFunctions = [
    {
      id: 'function-1',
      name: 'Order Processing',
      category: 'Core Business',
      rto: '4 hours',
      owner: 'Operations',
      dependencies: ['ERP System', 'Payment Gateway', 'Customer Database'],
      backupProcess: 'Manual order processing via phone',
      priority: 'Critical'
    },
    {
      id: 'function-2',
      name: 'Customer Support',
      category: 'Customer Service',
      rto: '8 hours',
      owner: 'Customer Support',
      dependencies: ['CRM System', 'Customer Database', 'Email System'],
      backupProcess: 'Phone-only support with manual ticketing',
      priority: 'High'
    },
    {
      id: 'function-3',
      name: 'Email Communications',
      category: 'Communications',
      rto: '12 hours',
      owner: 'IT',
      dependencies: ['Email Server', 'Internet Connection'],
      backupProcess: 'Personal email accounts with encryption',
      priority: 'Medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Completed':
        return 'bg-secure-green/10 text-secure-green';
      case 'Scheduled':
        return 'bg-warning-amber/10 text-warning-amber';
      case 'Draft':
        return 'bg-electric-blue/10 text-electric-blue';
      case 'Outdated':
      case 'Failed':
        return 'bg-critical-red/10 text-critical-red';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Business Continuity</h1>
          <p className="text-muted-foreground">Manage business continuity and disaster recovery plans</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Plan
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Exercise
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recovery Plans</p>
                <h3 className="text-3xl font-bold">3</h3>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Functions</p>
                <h3 className="text-3xl font-bold">3</h3>
              </div>
              <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                <Heart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Exercise</p>
                <h3 className="text-3xl font-bold">21d</h3>
              </div>
              <div className="rounded-full p-3 bg-secure-green/10 text-secure-green">
                <CalendarCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Program Maturity</p>
                <h3 className="text-3xl font-bold">72%</h3>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'plans' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('plans')}
        >
          Recovery Plans
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'functions' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('functions')}
        >
          Critical Functions
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'exercises' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('exercises')}
        >
          Exercises & Tests
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          {recoveryPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">{plan.name}</h3>
                      <span className={`ml-3 text-xs rounded-full px-2 py-0.5 ${getStatusColor(plan.status)}`}>
                        {plan.status}
                      </span>
                      {plan.critical && (
                        <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-critical-red/10 text-critical-red">
                          Critical
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.type} • v{plan.version}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-xs mb-4">
                      <div>
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span className="ml-1 font-medium">{plan.lastUpdated}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Tested:</span>
                        <span className="ml-1 font-medium">{plan.lastTested}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">RTO:</span>
                        <span className="ml-1 font-medium">{plan.rto}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">RPO:</span>
                        <span className="ml-1 font-medium">{plan.rpo}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground mr-3">Next test due in 30 days</span>
                      
                      <Users className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">Owner: {plan.owner}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                    <Button size="sm">View Plan</Button>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Test Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'functions' && (
        <div className="space-y-4">
          {criticalFunctions.map((func) => (
            <Card key={func.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">{func.name}</h3>
                      <span className={`ml-3 text-xs rounded-full px-2 py-0.5 ${
                        func.priority === 'Critical' 
                          ? 'bg-critical-red/10 text-critical-red' 
                          : func.priority === 'High'
                          ? 'bg-warning-amber/10 text-warning-amber'
                          : 'bg-electric-blue/10 text-electric-blue'
                      }`}>
                        {func.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {func.category} • Recovery Time Objective: {func.rto}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-xs mb-4">
                      <div>
                        <span className="text-muted-foreground">Owner:</span>
                        <span className="ml-1 font-medium">{func.owner}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Backup Process:</span>
                        <span className="ml-1 font-medium">{func.backupProcess}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-1">Dependencies:</p>
                      <div className="flex flex-wrap gap-2">
                        {func.dependencies.map((dep, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">
                      Edit Function
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'exercises' && (
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">{exercise.name}</h3>
                      <span className={`ml-3 text-xs rounded-full px-2 py-0.5 ${getStatusColor(exercise.status)}`}>
                        {exercise.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {exercise.type} Exercise • {exercise.duration}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-xs mb-4">
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-1 font-medium">{exercise.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Owner:</span>
                        <span className="ml-1 font-medium">{exercise.owner}</span>
                      </div>
                      {exercise.status === 'Completed' && (
                        <div>
                          <span className="text-muted-foreground">Findings:</span>
                          <span className="ml-1 font-medium">{exercise.findings}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-1">Participants:</p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.participants.map((participant, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {participant}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                    {exercise.status === 'Completed' ? (
                      <Button size="sm">View Results</Button>
                    ) : (
                      <Button size="sm">Manage Exercise</Button>
                    )}
                    <Button size="sm" variant="outline">
                      {exercise.status === 'Completed' ? 'Download Report' : 'Edit Details'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button variant="outline">
              View All Exercises
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Related Resources */}
      {activeTab === 'plans' && (
        <Card>
          <CardHeader>
            <CardTitle>Plan Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Ransomware Recovery Plan</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  NIST-aligned ransomware recovery plan template.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Building2 className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Business Continuity Plan</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Comprehensive business continuity plan template.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Server className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">IT Disaster Recovery Plan</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Template for IT infrastructure recovery.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'functions' && (
        <Card>
          <CardHeader>
            <CardTitle>Critical Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Database className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Primary Database</h3>
                </div>
                <div className="text-xs text-muted-foreground space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span>Recovery Time:</span>
                    <span>4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backup Frequency:</span>
                    <span>Hourly</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Backup:</span>
                    <span>15 minutes ago</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Recovery Plan
                </Button>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Server className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Web Application Servers</h3>
                </div>
                <div className="text-xs text-muted-foreground space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span>Recovery Time:</span>
                    <span>2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redundancy:</span>
                    <span>Active-Active Cluster</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Tested:</span>
                    <span>7 days ago</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Recovery Plan
                </Button>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Network className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Network Infrastructure</h3>
                </div>
                <div className="text-xs text-muted-foreground space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span>Recovery Time:</span>
                    <span>6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redundancy:</span>
                    <span>Dual ISP, Redundant Switches</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Tested:</span>
                    <span>30 days ago</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Recovery Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'exercises' && (
        <Card>
          <CardHeader>
            <CardTitle>Exercise Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Ransomware Tabletop Exercise</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Scenario-based exercise to test ransomware readiness.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Server className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Data Recovery Test</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Functional test of backup recovery procedures.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center mb-3">
                  <Building2 className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Crisis Management Exercise</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Exercise for executive and crisis management team.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContinuityPage;