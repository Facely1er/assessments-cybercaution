// components/shared/WorkflowNode.tsx
import React from 'react';
import { 
  Zap, 
  GitBranch, 
  Activity, 
  Link2, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Server,
  LucideIcon
} from 'lucide-react';

export type NodeType = 'trigger' | 'condition' | 'action' | 'integration' | 'notification';

export interface WorkflowNodeData {
  id: string;
  type: NodeType;
  name: string;
  description: string;
  integration?: string;
  config?: Record<string, any>;
  inputs?: string[];
  outputs?: string[];
}

export interface NodeConnection {
  position: 'top' | 'right' | 'bottom' | 'left';
  type: 'input' | 'output';
  id: string;
}

export interface WorkflowNodeProps {
  node: WorkflowNodeData;
  isActive?: boolean;
  isCompleted?: boolean;
  hasError?: boolean;
  onClick?: (node: WorkflowNodeData) => void;
  connections?: NodeConnection[];
  className?: string;
}

const nodeTypes: Record<NodeType, { icon: LucideIcon; color: string }> = {
  trigger: { icon: Zap, color: 'bg-blue-500' },
  condition: { icon: GitBranch, color: 'bg-purple-500' },
  action: { icon: Activity, color: 'bg-green-500' },
  integration: { icon: Link2, color: 'bg-orange-500' },
  notification: { icon: AlertCircle, color: 'bg-yellow-500' }
};

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({ 
  node, 
  isActive = false, 
  isCompleted = false,
  hasError = false,
  onClick,
  connections = [],
  className = ''
}) => {
  const NodeIcon = nodeTypes[node.type]?.icon || Activity;
  const nodeColor = nodeTypes[node.type]?.color || 'bg-gray-500';

  const handleClick = () => {
    onClick?.(node);
  };

  const getBorderClass = (): string => {
    if (isActive) return 'border-blue-500 shadow-lg';
    if (isCompleted) return 'border-green-500';
    if (hasError) return 'border-red-500';
    return 'border-gray-200 hover:border-gray-300';
  };

  const getConnectionPosition = (connection: NodeConnection): string => {
    const positions = {
      right: 'right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2',
      bottom: 'bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2',
      left: 'left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
      top: 'top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2'
    };
    return positions[connection.position];
  };

  return (
    <div 
      className={`relative p-4 bg-white rounded-lg border-2 cursor-pointer transition-all ${getBorderClass()} ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${nodeColor} text-white`}>
          <NodeIcon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{node.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{node.description}</p>
          {node.integration && (
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <Server className="w-3 h-3" />
              {node.integration}
            </div>
          )}
        </div>
        {isCompleted && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
        {hasError && (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
      
      {/* Connection points */}
      {connections.map((connection) => (
        <div
          key={connection.id}
          className={`absolute w-3 h-3 ${
            connection.type === 'input' ? 'bg-gray-400' : 'bg-blue-400'
          } rounded-full ${getConnectionPosition(connection)}`}
          title={`${connection.type}: ${connection.id}`}
        />
      ))}
    </div>
  );
};