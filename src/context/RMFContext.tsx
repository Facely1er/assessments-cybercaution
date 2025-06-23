import React, { createContext, useContext, useState } from 'react';
import type { RMFTask, RMFStep, RMFPhase } from '../types/rmf';

interface RMFContextType {
  phases: RMFPhase[];
  currentPhase: string;
  setCurrentPhase: (phase: string) => void;
  tasks: RMFTask[];
  updateTaskStatus: (taskId: string, status: string) => void;
}

const RMFContext = createContext<RMFContextType | undefined>(undefined);

const useRMF = () => {
  const context = useContext(RMFContext);
  if (context === undefined) {
    throw new Error('useRMF must be used within a RMFProvider');
  }
  return context;
};

export const RMFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState('prepare');
  const [phases, setPhases] = useState<RMFPhase[]>([]);
  const [tasks, setTasks] = useState<RMFTask[]>([]);

  const updateTaskStatus = (taskId: string, status: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status } 
          : task
      )
    );
  };

  return (
    <RMFContext.Provider value={{
      phases,
      currentPhase,
      setCurrentPhase,
      tasks,
      updateTaskStatus
    }}>
      {children}
    </RMFContext.Provider>
  );
};