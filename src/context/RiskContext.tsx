import React, { createContext, useContext, useState } from 'react';
import { Risk, RiskCategory, RiskSeverity, RiskStatus, RiskTreatment, DashboardMetrics } from '../types';
import { mockRisks, mockDashboardMetrics } from '../data/mockData';

interface RiskContextType {
  risks: Risk[];
  dashboardMetrics: DashboardMetrics;
  addRisk: (risk: Omit<Risk, 'id'>) => Promise<Risk>;
  updateRisk: (id: string, risk: Partial<Risk>) => Promise<Risk>;
  deleteRisk: (id: string) => Promise<void>;
  getRiskById: (id: string) => Risk | undefined;
  addTreatment: (riskId: string, treatment: Omit<RiskTreatment, 'id' | 'riskId'>) => Promise<RiskTreatment>;
  filterRisks: (params: Partial<{
    category: RiskCategory;
    severity: RiskSeverity;
    status: RiskStatus;
    search: string;
  }>) => Risk[];
}

const RiskContext = createContext<RiskContextType | undefined>(undefined);

export const useRisk = () => {
  const context = useContext(RiskContext);
  if (context === undefined) {
    throw new Error('useRisk must be used within a RiskProvider');
  }
  return context;
};

export const RiskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>(mockDashboardMetrics);

  const addRisk = async (risk: Omit<Risk, 'id'>): Promise<Risk> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRisk: Risk = {
      ...risk,
      id: `risk-${Date.now()}`,
    };
    
    setRisks(prev => [...prev, newRisk]);
    
    // Update dashboard metrics
    updateMetricsAfterChange();
    
    return newRisk;
  };

  const updateRisk = async (id: string, riskUpdate: Partial<Risk>): Promise<Risk> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let updatedRisk: Risk | undefined;
    
    setRisks(prev => 
      prev.map(risk => {
        if (risk.id === id) {
          updatedRisk = { ...risk, ...riskUpdate, dateUpdated: new Date().toISOString() };
          return updatedRisk;
        }
        return risk;
      })
    );
    
    if (!updatedRisk) {
      throw new Error(`Risk with id ${id} not found`);
    }
    
    // Update dashboard metrics
    updateMetricsAfterChange();
    
    return updatedRisk;
  };

  const deleteRisk = async (id: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setRisks(prev => prev.filter(risk => risk.id !== id));
    
    // Update dashboard metrics
    updateMetricsAfterChange();
  };

  const getRiskById = (id: string): Risk | undefined => {
    return risks.find(risk => risk.id === id);
  };

  const addTreatment = async (
    riskId: string, 
    treatment: Omit<RiskTreatment, 'id' | 'riskId'>
  ): Promise<RiskTreatment> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTreatment: RiskTreatment = {
      ...treatment,
      id: `treatment-${Date.now()}`,
      riskId,
    };
    
    let updatedRisk: Risk | undefined;
    
    setRisks(prev => 
      prev.map(risk => {
        if (risk.id === riskId) {
          updatedRisk = { 
            ...risk, 
            treatments: [...risk.treatments, newTreatment],
            dateUpdated: new Date().toISOString()
          };
          return updatedRisk;
        }
        return risk;
      })
    );
    
    if (!updatedRisk) {
      throw new Error(`Risk with id ${riskId} not found`);
    }
    
    // Update dashboard metrics if needed
    if (treatment.status === 'Completed') {
      updateMetricsAfterChange();
    }
    
    return newTreatment;
  };

  const filterRisks = (params: Partial<{
    category: RiskCategory;
    severity: RiskSeverity;
    status: RiskStatus;
    search: string;
  }>): Risk[] => {
    return risks.filter(risk => {
      if (params.category && risk.category !== params.category) return false;
      if (params.severity && risk.severity !== params.severity) return false;
      if (params.status && risk.status !== params.status) return false;
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        return (
          risk.title.toLowerCase().includes(searchLower) ||
          risk.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  };

  // Helper function to update dashboard metrics after changes
  const updateMetricsAfterChange = () => {
    // In a real app, we might recalculate or fetch updated metrics
    // For this mock, we'll update a few key metrics based on the risks state
    
    const openRisks = risks.filter(
      r => r.status !== RiskStatus.Closed && r.status !== RiskStatus.Mitigated
    ).length;
    
    const mitigatedRisks = risks.filter(r => r.status === RiskStatus.Mitigated).length;
    const acceptedRisks = risks.filter(r => r.status === RiskStatus.Accepted).length;
    
    const highSeverityRisks = risks.filter(
      r => r.severity === RiskSeverity.High || 
           r.severity === RiskSeverity.VeryHigh || 
           r.severity === RiskSeverity.Critical
    ).length;
    
    // Create a category count record
    const risksByCategory: Record<RiskCategory, number> = {} as Record<RiskCategory, number>;
    Object.values(RiskCategory).forEach(category => {
      risksByCategory[category] = risks.filter(r => r.category === category).length;
    });
    
    // Create a severity count record
    const risksBySeverity: Record<RiskSeverity, number> = {} as Record<RiskSeverity, number>;
    Object.values(RiskSeverity).forEach(severity => {
      risksBySeverity[severity] = risks.filter(r => r.severity === severity).length;
    });
    
    // Create a status count record
    const risksByStatus: Record<RiskStatus, number> = {} as Record<RiskStatus, number>;
    Object.values(RiskStatus).forEach(status => {
      risksByStatus[status] = risks.filter(r => r.status === status).length;
    });
    
    // Update the metrics
    setDashboardMetrics(prev => ({
      ...prev,
      totalRisks: risks.length,
      openRisks,
      mitigatedRisks,
      acceptedRisks,
      highSeverityRisks,
      risksByCategory,
      risksBySeverity,
      risksByStatus,
      // We'd also update other metrics in a real application
    }));
  };

  return (
    <RiskContext.Provider value={{
      risks,
      dashboardMetrics,
      addRisk,
      updateRisk,
      deleteRisk,
      getRiskById,
      addTreatment,
      filterRisks
    }}>
      {children}
    </RiskContext.Provider>
  );
};