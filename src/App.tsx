import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';

// Preserved assessment pages
import RansomwareAssessment from './pages/RansomwareAssessment';
import RansomwareResults from './pages/RansomwareResults';
import RansomwareRecommendations from './pages/RansomwareRecommendations';
import SupplyChainAssessment from './pages/SupplyChainAssessment';
import SupplyChainResults from './pages/SupplyChainResults';
import SupplyChainRecommendations from './pages/SupplyChainRecommendations';
import TabletopExercise from './pages/TabletopExercise';
import NistCsfAlignment from './pages/NistCsfAlignment';
import SecurityAwareness from './pages/SecurityAwareness';
import NotFound from './pages/NotFound';

// New CISA assessment tools will be imported here

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/ransomware-assessment" replace />} />
        
        {/* Preserved assessment pages */}
        <Route path="/ransomware-assessment" element={<RansomwareAssessment />} />
        <Route path="/ransomware-results" element={<RansomwareResults />} />
        <Route path="/ransomware-recommendations" element={<RansomwareRecommendations />} />
        <Route path="/supply-chain-assessment" element={<SupplyChainAssessment />} />
        <Route path="/supply-chain-results" element={<SupplyChainResults />} />
        <Route path="/supply-chain-recommendations" element={<SupplyChainRecommendations />} />
        <Route path="/tabletop-exercise" element={<TabletopExercise />} />
        <Route path="/nist-csf-alignment" element={<NistCsfAlignment />} />
        <Route path="/security-awareness" element={<SecurityAwareness />} />
        
        {/* New CISA assessment tools will be added here */}
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;