import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  CheckCircle, 
  FileText,
  User,
  Calendar,
  ArrowLeft,
  Link,
  Info
} from 'lucide-react';
import type { RMFTask } from '../../types/rmf';

interface RMFTaskDetailProps {
  task: RMFTask;
  onBack: () => void;
}

const RMFTaskDetail: React.FC<RMFTaskDetailProps> = ({ task, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
              {task.id}
            </span>
            <CardTitle>{task.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Responsible Roles</h3>
              <ul className="space-y-1">
                {task.responsible.map((role, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Supporting Roles</h3>
              <ul className="space-y-1">
                {task.supporting.map((role, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Outcomes</h3>
            <ul className="space-y-2">
              {task.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Inputs</h3>
              <ul className="space-y-1">
                {task.inputs.map((input, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {input}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Outputs</h3>
              <ul className="space-y-1">
                {task.outputs.map((output, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">References</h3>
            <ul className="space-y-1">
              {task.references.map((reference, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                  {reference}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium mb-1">Rationale</h3>
                <p className="text-sm text-muted-foreground">{task.rationale}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">SDLC Phase:</span>
              <span className="ml-1 text-sm font-medium">{task.sdlc}</span>
            </div>
            <Button>Update Status</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RMFTaskDetail;