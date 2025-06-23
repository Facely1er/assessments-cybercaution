import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  User,
  Calendar,
  ArrowRight,
  Link
} from 'lucide-react';
import type { RMFTask } from '../../types/rmf';

interface RMFTaskListProps {
  tasks: RMFTask[];
  phaseId: string;
}

const RMFTaskList: React.FC<RMFTaskListProps> = ({ tasks, phaseId }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'Not Started':
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
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
          <h1 className="text-2xl font-bold">RMF Tasks</h1>
          <p className="text-muted-foreground">Manage and track RMF tasks</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Export Tasks
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded mr-2">
                      {task.id}
                    </span>
                    <h3 className="text-lg font-medium">{task.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{task.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Responsible:</span>
                      <span className="ml-1 font-medium">{task.responsible.join(', ')}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">SDLC Phase:</span>
                      <span className="ml-1 font-medium">{task.sdlc}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">References:</span>
                      <span className="ml-1 font-medium">{task.references.length}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Outcomes:</h4>
                    <ul className="space-y-1">
                      {task.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                  <Button>
                    View Details
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

export default RMFTaskList;