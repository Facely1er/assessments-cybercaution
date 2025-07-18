// hooks/useWorkflows.ts
import { useState, useCallback, useEffect } from 'react';
import { WorkflowNodeData, NodeType } from '../components/shared/WorkflowNode';

export interface WorkflowConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourcePort?: string;
  targetPort?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNodeData[];
  connections: WorkflowConnection[];
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  currentNodeId?: string;
  logs: WorkflowLog[];
}

export interface WorkflowLog {
  timestamp: Date;
  nodeId: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}

export interface UseWorkflowsReturn {
  workflows: Workflow[];
  executions: WorkflowExecution[];
  isLoading: boolean;
  error: string | null;
  createWorkflow: (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Workflow>;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  executeWorkflow: (id: string) => Promise<WorkflowExecution>;
  stopExecution: (executionId: string) => Promise<void>;
  addNode: (workflowId: string, node: Omit<WorkflowNodeData, 'id'>) => Promise<WorkflowNodeData>;
  updateNode: (workflowId: string, nodeId: string, updates: Partial<WorkflowNodeData>) => Promise<void>;
  deleteNode: (workflowId: string, nodeId: string) => Promise<void>;
  addConnection: (workflowId: string, connection: Omit<WorkflowConnection, 'id'>) => Promise<void>;
  deleteConnection: (workflowId: string, connectionId: string) => Promise<void>;
  validateWorkflow: (workflowId: string) => Promise<{ valid: boolean; errors: string[] }>;
}

// Mock workflow templates
const workflowTemplates = {
  incidentResponse: {
    name: 'Automated Incident Response',
    description: 'Responds to security incidents automatically',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger' as NodeType,
        name: 'Security Alert',
        description: 'Triggered by SIEM alert',
        integration: 'Splunk'
      },
      {
        id: 'condition-1',
        type: 'condition' as NodeType,
        name: 'Severity Check',
        description: 'Check if severity > High',
        config: { condition: 'severity > 3' }
      },
      {
        id: 'action-1',
        type: 'action' as NodeType,
        name: 'Isolate Host',
        description: 'Isolate affected endpoint',
        integration: 'CrowdStrike'
      },
      {
        id: 'notification-1',
        type: 'notification' as NodeType,
        name: 'Notify SOC Team',
        description: 'Send alert to security team',
        config: { channel: 'slack', team: '@soc-team' }
      }
    ],
    connections: [
      { id: 'conn-1', sourceNodeId: 'trigger-1', targetNodeId: 'condition-1' },
      { id: 'conn-2', sourceNodeId: 'condition-1', targetNodeId: 'action-1' },
      { id: 'conn-3', sourceNodeId: 'action-1', targetNodeId: 'notification-1' }
    ]
  }
};

export const useWorkflows = (): UseWorkflowsReturn => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with sample workflow
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleWorkflow: Workflow = {
          id: 'wf-001',
          ...workflowTemplates.incidentResponse,
          isActive: true,
          lastRun: new Date(Date.now() - 3600000),
          nextRun: new Date(Date.now() + 3600000),
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 3600000)
        };
        
        setWorkflows([sampleWorkflow]);
      } catch (err) {
        setError('Failed to load workflows');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  const createWorkflow = useCallback(async (
    workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Workflow> => {
    const newWorkflow: Workflow = {
      ...workflow,
      id: `wf-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setWorkflows(prev => [...prev, newWorkflow]);
    return newWorkflow;
  }, []);

  const updateWorkflow = useCallback(async (id: string, updates: Partial<Workflow>) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === id 
        ? { ...wf, ...updates, updatedAt: new Date() }
        : wf
    ));
  }, []);

  const deleteWorkflow = useCallback(async (id: string) => {
    setWorkflows(prev => prev.filter(wf => wf.id !== id));
  }, []);

  const executeWorkflow = useCallback(async (id: string): Promise<WorkflowExecution> => {
    const workflow = workflows.find(wf => wf.id === id);
    if (!workflow) throw new Error('Workflow not found');
    
    const execution: WorkflowExecution = {
      id: `exec-${Date.now()}`,
      workflowId: id,
      status: 'running',
      startTime: new Date(),
      currentNodeId: workflow.nodes[0]?.id,
      logs: [{
        timestamp: new Date(),
        nodeId: workflow.nodes[0]?.id || '',
        level: 'info',
        message: 'Workflow execution started'
      }]
    };
    
    setExecutions(prev => [...prev, execution]);
    
    // Simulate workflow execution
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= workflow.nodes.length - 1) {
        clearInterval(interval);
        setExecutions(prev => prev.map(exec => 
          exec.id === execution.id 
            ? {
                ...exec,
                status: 'completed',
                endTime: new Date(),
                currentNodeId: undefined,
                logs: [...exec.logs, {
                  timestamp: new Date(),
                  nodeId: workflow.nodes[workflow.nodes.length - 1].id,
                  level: 'info',
                  message: 'Workflow completed successfully'
                }]
              }
            : exec
        ));
        return;
      }
      
      currentIndex++;
      const currentNode = workflow.nodes[currentIndex];
      
      setExecutions(prev => prev.map(exec => 
        exec.id === execution.id 
          ? {
              ...exec,
              currentNodeId: currentNode.id,
              logs: [...exec.logs, {
                timestamp: new Date(),
                nodeId: currentNode.id,
                level: 'info',
                message: `Executing: ${currentNode.name}`
              }]
            }
          : exec
      ));
    }, 2000);
    
    return execution;
  }, [workflows]);

  const stopExecution = useCallback(async (executionId: string) => {
    setExecutions(prev => prev.map(exec => 
      exec.id === executionId 
        ? { ...exec, status: 'cancelled', endTime: new Date() }
        : exec
    ));
  }, []);

  const addNode = useCallback(async (
    workflowId: string, 
    node: Omit<WorkflowNodeData, 'id'>
  ): Promise<WorkflowNodeData> => {
    const newNode: WorkflowNodeData = {
      ...node,
      id: `node-${Date.now()}`
    };
    
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? { ...wf, nodes: [...wf.nodes, newNode], updatedAt: new Date() }
        : wf
    ));
    
    return newNode;
  }, []);

  const updateNode = useCallback(async (
    workflowId: string, 
    nodeId: string, 
    updates: Partial<WorkflowNodeData>
  ) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? {
            ...wf,
            nodes: wf.nodes.map(node => 
              node.id === nodeId ? { ...node, ...updates } : node
            ),
            updatedAt: new Date()
          }
        : wf
    ));
  }, []);

  const deleteNode = useCallback(async (workflowId: string, nodeId: string) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? {
            ...wf,
            nodes: wf.nodes.filter(node => node.id !== nodeId),
            connections: wf.connections.filter(
              conn => conn.sourceNodeId !== nodeId && conn.targetNodeId !== nodeId
            ),
            updatedAt: new Date()
          }
        : wf
    ));
  }, []);

  const addConnection = useCallback(async (
    workflowId: string, 
    connection: Omit<WorkflowConnection, 'id'>
  ) => {
    const newConnection: WorkflowConnection = {
      ...connection,
      id: `conn-${Date.now()}`
    };
    
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? { ...wf, connections: [...wf.connections, newConnection], updatedAt: new Date() }
        : wf
    ));
  }, []);

  const deleteConnection = useCallback(async (workflowId: string, connectionId: string) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? {
            ...wf,
            connections: wf.connections.filter(conn => conn.id !== connectionId),
            updatedAt: new Date()
          }
        : wf
    ));
  }, []);

  const validateWorkflow = useCallback(async (workflowId: string): Promise<{ 
    valid: boolean; 
    errors: string[] 
  }> => {
    const workflow = workflows.find(wf => wf.id === workflowId);
    if (!workflow) return { valid: false, errors: ['Workflow not found'] };
    
    const errors: string[] = [];
    
    // Check if workflow has nodes
    if (workflow.nodes.length === 0) {
      errors.push('Workflow must have at least one node');
    }
    
    // Check if workflow has a trigger
    const hasTrigger = workflow.nodes.some(node => node.type === 'trigger');
    if (!hasTrigger) {
      errors.push('Workflow must have at least one trigger node');
    }
    
    // Check for orphaned nodes
    workflow.nodes.forEach(node => {
      const isConnected = workflow.connections.some(
        conn => conn.sourceNodeId === node.id || conn.targetNodeId === node.id
      );
      if (!isConnected && workflow.nodes.length > 1) {
        errors.push(`Node "${node.name}" is not connected to the workflow`);
      }
    });
    
    // Check for circular dependencies
    // (Simplified check - in production, use proper graph algorithms)
    
    return {
      valid: errors.length === 0,
      errors
    };
  }, [workflows]);

  return {
    workflows,
    executions,
    isLoading,
    error,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
    stopExecution,
    addNode,
    updateNode,
    deleteNode,
    addConnection,
    deleteConnection,
    validateWorkflow
  };
};