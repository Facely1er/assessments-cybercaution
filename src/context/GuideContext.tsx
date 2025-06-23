import React, { createContext, useContext, useState, useEffect } from 'react';

interface GuideProgress {
  id: string;
  completed: string[];
  lastVisited: string;
  startedAt: string;
  completedAt?: string;
}

interface GuideSection {
  id: string;
  title: string;
  totalSteps: number;
}

interface GuideContextType {
  progress: Record<string, GuideProgress>;
  markSectionComplete: (guideId: string, sectionId: string) => void;
  updateLastVisited: (guideId: string, sectionId: string) => void;
  getGuideProgress: (guideId: string) => number;
  getSectionProgress: (guideId: string, sectionId: string) => boolean;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (context === undefined) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Record<string, GuideProgress>>(() => {
    const saved = localStorage.getItem('guideProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('guideProgress', JSON.stringify(progress));
  }, [progress]);

  const markSectionComplete = (guideId: string, sectionId: string) => {
    setProgress(prev => {
      const guide = prev[guideId] || {
        id: guideId,
        completed: [],
        lastVisited: sectionId,
        startedAt: new Date().toISOString()
      };

      if (!guide.completed.includes(sectionId)) {
        const newCompleted = [...guide.completed, sectionId];
        return {
          ...prev,
          [guideId]: {
            ...guide,
            completed: newCompleted,
            completedAt: newCompleted.length === getTotalSections(guideId) 
              ? new Date().toISOString() 
              : undefined
          }
        };
      }

      return prev;
    });
  };

  const updateLastVisited = (guideId: string, sectionId: string) => {
    setProgress(prev => {
      const guide = prev[guideId] || {
        id: guideId,
        completed: [],
        lastVisited: sectionId,
        startedAt: new Date().toISOString()
      };

      return {
        ...prev,
        [guideId]: {
          ...guide,
          lastVisited: sectionId
        }
      };
    });
  };

  const getTotalSections = (guideId: string): number => {
    // This would ideally come from a configuration
    const guideSections: Record<string, number> = {
      'nist-csf': 3,
      'ransomware-protection': 3,
      'supply-chain': 2,
      'security-controls': 3,
      'compliance': 2,
      'risk-assessment': 3
    };
    return guideSections[guideId] || 0;
  };

  const getGuideProgress = (guideId: string): number => {
    const guide = progress[guideId];
    if (!guide) return 0;

    const totalSections = getTotalSections(guideId);
    return Math.round((guide.completed.length / totalSections) * 100);
  };

  const getSectionProgress = (guideId: string, sectionId: string): boolean => {
    return progress[guideId]?.completed.includes(sectionId) || false;
  };

  return (
    <GuideContext.Provider value={{
      progress,
      markSectionComplete,
      updateLastVisited,
      getGuideProgress,
      getSectionProgress
    }}>
      {children}
    </GuideContext.Provider>
  );
};