import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import { AssessmentLayout } from './components/layout/AssessmentLayout';

// Assessment landing page
import AssessmentsLanding from './pages/AssessmentsLanding';

// Assessment tools
import RansomwareAssessment from './pages/RansomwareAssessment';
import RansomwareResults from './pages/RansomwareResults';
import RansomwareRecommendations from './pages/RansomwareRecommendations';
import SupplyChainAssessment from './pages/SupplyChainAssessment';
import SupplyChainResults from './pages/SupplyChainResults';
import SupplyChainRecommendations from './pages/SupplyChainRecommendations';
import ZeroTrustMaturityAssessment from './pages/ZeroTrustMaturityAssessment';
import NetworkSegmentationAssessment from './pages/NetworkSegmentationAssessment';
import BackupReadinessAssessment from './pages/BackupReadinessAssessment';
import IncidentResponsePlanAssessment from './pages/IncidentResponsePlanAssessment';
import IncidentResponseResults from './pages/IncidentResponseResults';
import VulnerabilityManagementAssessment from './pages/VulnerabilityManagementAssessment';
import TabletopExercise from './pages/TabletopExercise';
import NistCsfAlignment from './pages/NistCsfAlignment';
import SecurityAwareness from './pages/SecurityAwareness';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    // Initialize from local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Apply dark mode class with a slight delay to prevent flicker
  React.useEffect(() => {
    // Store the preference
    localStorage.setItem('darkMode', String(darkMode));
    
    // Apply the class without animation first
    if (darkMode) {
      document.documentElement.classList.add('dark-mode-transition-disabled');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('dark-mode-transition-disabled');
      document.documentElement.classList.remove('dark');
    }
    
    // Enable animations after a small delay
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('dark-mode-transition-disabled');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [darkMode]);

  // Listen for system preference changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <Routes>
        {/* Default redirect to the assessments landing page */}
        <Route path="/" element={<Navigate to="/assessments" replace />} />
        
        {/* Assessment routes */}
        <Route element={<AssessmentLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
          {/* Assessment landing page */}
          <Route path="/assessments" element={<AssessmentsLanding />} />
          
          {/* Assessment tools */}
          <Route path="/ransomware-assessment" element={<RansomwareAssessment />} />
          <Route path="/ransomware-results" element={<RansomwareResults />} />
          <Route path="/ransomware-recommendations" element={<RansomwareRecommendations />} />
          <Route path="/supply-chain-assessment" element={<SupplyChainAssessment />} />
          <Route path="/supply-chain-results" element={<SupplyChainResults />} />
          <Route path="/supply-chain-recommendations" element={<SupplyChainRecommendations />} />
          <Route path="/zero-trust-maturity-assessment" element={<ZeroTrustMaturityAssessment />} />
          <Route path="/network-segmentation-assessment" element={<NetworkSegmentationAssessment />} />
          <Route path="/backup-readiness-assessment" element={<BackupReadinessAssessment />} />
          <Route path="/incident-response-plan-assessment" element={<IncidentResponsePlanAssessment />} />
          <Route path="/incident-response-results" element={<IncidentResponseResults />} />
          <Route path="/vulnerability-management-assessment" element={<VulnerabilityManagementAssessment />} />
          <Route path="/tabletop-exercise" element={<TabletopExercise />} />
          <Route path="/nist-csf-alignment" element={<NistCsfAlignment />} />
          <Route path="/security-awareness" element={<SecurityAwareness />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;