import React, { createContext, useContext, useState } from 'react';
import { Document, Evidence, Requirement } from '../types';
import { mockDocuments, mockEvidences, mockRequirements } from '../data/mockData';

interface DocumentContextType {
  documents: Document[];
  evidences: Evidence[];
  requirements: Requirement[];
  addDocument: (doc: Omit<Document, 'id'>) => Promise<Document>;
  updateDocument: (id: string, doc: Partial<Document>) => Promise<Document>;
  deleteDocument: (id: string) => Promise<void>;
  addEvidence: (evidence: Omit<Evidence, 'id'>) => Promise<Evidence>;
  updateEvidence: (id: string, evidence: Partial<Evidence>) => Promise<Evidence>;
  deleteEvidence: (id: string) => Promise<void>;
  updateRequirement: (id: string, req: Partial<Requirement>) => Promise<Requirement>;
  getDocumentsByControl: (controlId: string) => Document[];
  getEvidencesByRequirement: (requirementId: string) => Evidence[];
  searchDocuments: (query: string, filters?: Partial<Document>) => Document[];
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [evidences, setEvidences] = useState<Evidence[]>(mockEvidences);
  const [requirements] = useState<Requirement[]>(mockRequirements);

  const addDocument = async (doc: Omit<Document, 'id'>): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}`,
    };
    
    setDocuments(prev => [...prev, newDoc]);
    return newDoc;
  };

  const updateDocument = async (id: string, docUpdate: Partial<Document>): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let updatedDoc: Document | undefined;
    
    setDocuments(prev => 
      prev.map(doc => {
        if (doc.id === id) {
          updatedDoc = { ...doc, ...docUpdate, updatedAt: new Date().toISOString() };
          return updatedDoc;
        }
        return doc;
      })
    );
    
    if (!updatedDoc) {
      throw new Error(`Document with id ${id} not found`);
    }
    
    return updatedDoc;
  };

  const deleteDocument = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const addEvidence = async (evidence: Omit<Evidence, 'id'>): Promise<Evidence> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEvidence: Evidence = {
      ...evidence,
      id: `evidence-${Date.now()}`,
    };
    
    setEvidences(prev => [...prev, newEvidence]);
    return newEvidence;
  };

  const updateEvidence = async (id: string, evidenceUpdate: Partial<Evidence>): Promise<Evidence> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let updatedEvidence: Evidence | undefined;
    
    setEvidences(prev => 
      prev.map(evidence => {
        if (evidence.id === id) {
          updatedEvidence = { ...evidence, ...evidenceUpdate };
          return updatedEvidence;
        }
        return evidence;
      })
    );
    
    if (!updatedEvidence) {
      throw new Error(`Evidence with id ${id} not found`);
    }
    
    return updatedEvidence;
  };

  const deleteEvidence = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setEvidences(prev => prev.filter(evidence => evidence.id !== id));
  };

  const updateRequirement = async (id: string, reqUpdate: Partial<Requirement>): Promise<Requirement> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const requirement = requirements.find(req => req.id === id);
    if (!requirement) {
      throw new Error(`Requirement with id ${id} not found`);
    }
    
    const updatedRequirement = { ...requirement, ...reqUpdate };
    return updatedRequirement;
  };

  const getDocumentsByControl = (controlId: string): Document[] => {
    return documents.filter(doc => doc.relatedControls.includes(controlId));
  };

  const getEvidencesByRequirement = (requirementId: string): Evidence[] => {
    return evidences.filter(evidence => evidence.requirements.includes(requirementId));
  };

  const searchDocuments = (query: string, filters?: Partial<Document>): Document[] => {
    return documents.filter(doc => {
      // Apply text search
      const searchMatch = query.toLowerCase().split(' ').every(term =>
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.tags.some(tag => tag.toLowerCase().includes(term))
      );

      if (!searchMatch) return false;

      // Apply filters
      if (filters) {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined) return true;
          return doc[key as keyof Document] === value;
        });
      }

      return true;
    });
  };

  return (
    <DocumentContext.Provider value={{
      documents,
      evidences,
      requirements,
      addDocument,
      updateDocument,
      deleteDocument,
      addEvidence,
      updateEvidence,
      deleteEvidence,
      updateRequirement,
      getDocumentsByControl,
      getEvidencesByRequirement,
      searchDocuments
    }}>
      {children}
    </DocumentContext.Provider>
  );
};