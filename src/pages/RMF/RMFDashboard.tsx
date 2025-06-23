import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Settings,
  ArrowRight
} from 'lucide-react';

const RMFDashboard = () => {
  const phases = [
    {
      id: 'prepare',
      name: 'Prepare',
      description: 'Essential activities to help prepare the organization to manage security and privacy risks',
      status: 'In Progress',
      progress: 65,
      tasks: {
        total: 18,
        completed: 12,
        inProgress: 4,
        notStarted: 2
      }
    },
    {
      id: 'categorize',
      name: 'Categorize',
      description: 'Categorize the system and information processed, stored, and transmitted',
      status: 'Not Started',
      progress: 0,
      tasks: {
        total: 3,
        completed: 0,
        inProgress: 0,
        notStarted: 3
      }
    },
    {
      id: 'select',
      name: 'Select',
      description: 'Select an initial set of controls and tailor as needed',
      status: 'Not Started',
      progress: 0,
      tasks: {
        total: 6,
        completed: 0,
        inProgress: 0,
        notStarted: 6
      }
    },
    {
      id: 'implement',
      name: 'Implement',
      description: 'Implement the security and privacy controls',
      status: 'Not Started',
      progress: 0,
      tasks: {
        total: 2,
        completed: 0,
        inProgress: 0,
        notStarted: 2
      }
    },
    {
      id: 'assess',
      name: 'Assess',
      description: 'Assess whether controls are implemented correctly and operating as intended',
      status: 'Not Started',
      progress: 0,
      tasks: {
        total: 6,
        completed: 0,
        inProgress: 0,
        notStarted: 6
      }
    },
    {
      id: 'authorize',
      name: 'Authorize',
      description: 'Authorize the system or common controls',
      status: 'Not Started',
      progress: 0,
      tasks: {
        total: 5,
        completed: 0,
        inProgress: 0,
        notStarted: 5
      }
    },
    {
      id: 'monitor',
      name: 'Monitor',
      description: 'Monitor security and privacy controls on an ongoing basis',
      status: 'Not Started',
      progress: 0,
      tasks: {
        total: 7,
        completed: 0,
        inProgress: 0,
        notStarted: 7
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'Not Started':
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/10 text-success';
      case 'In Progress':
        return 'bg-warning/10 text-warning';
      case 'Not Started':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Risk Management Framework</h1>
          <p className="text-muted-foreground">Track and manage RMF implementation progress</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <h3 className="text-3xl font-bold">47</h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-3xl font-bold">12</h3>
              </div>
              <div className="rounded-full p-3 bg-success/10 text-success">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <h3 className="text-3xl font-bold">4</h3>
              </div>
              <div className="rounded-full p-3 bg-warning/10 text-warning">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Not Started</p>
                <h3 className="text-3xl font-bold">31</h3>
              </div>
              <div className="rounded-full p-3 bg-muted text-muted-foreground">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RMF Phases */}
      <div className="grid grid-cols-1 gap-6">
        {phases.map((phase) => (
          <Card key={phase.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">{phase.name}</h3>
                    <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${getStatusColor(phase.status)}`}>
                      {phase.status}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{phase.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Total Tasks:</span>
                      <span className="ml-1 font-medium">{phase.tasks.total}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-success" />
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="ml-1 font-medium">{phase.tasks.completed}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-warning" />
                      <span className="text-muted-foreground">In Progress:</span>
                      <span className="ml-1 font-medium">{phase.tasks.inProgress}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Not Started:</span>
                      <span className="ml-1 font-medium">{phase.tasks.notStarted}</span>
                    </div>
                  </div>

                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                  <Button>
                    View Tasks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RMFDashboard;