import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
// Import main layout components directly since they're used for the structure
import { AssessmentLayout } from './components/layout/AssessmentLayout';
import { MainLayout } from './components/layout/MainLayout';
import { Analytics } from '@vercel/analytics/react';
import AuthLayout from './components/auth/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load all page components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Features = React.lazy(() => import('./pages/Features'));
const Solutions = React.lazy(() => import('./pages/Solutions'));
const ToolkitPage = React.lazy(() => import('./pages/ToolkitPage'));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));
const AssessmentsLanding = React.lazy(() => import('./pages/AssessmentsLanding'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const RansomwareAssessment = React.lazy(() => import('./pages/RansomwareAssessment'));
const RansomwareResults = React.lazy(() => import('./pages/RansomwareResults'));
const RansomwareRecommendations = React.lazy(() => import('./pages/RansomwareRecommendations'));
const SupplyChainAssessment = React.lazy(() => import('./pages/SupplyChainAssessment'));
const SupplyChainResults = React.lazy(() => import('./pages/SupplyChainResults'));
const SupplyChainRecommendations = React.lazy(() => import('./pages/SupplyChainRecommendations'));
const ZeroTrustMaturityAssessment = React.lazy(() => import('./pages/ZeroTrustMaturityAssessment'));
const ZeroTrustMaturityResults = React.lazy(() => import('./pages/ZeroTrustMaturityResults'));
const NetworkSegmentationAssessment = React.lazy(() => import('./pages/NetworkSegmentationAssessment'));
const NetworkSegmentationResults = React.lazy(() => import('./pages/NetworkSegmentationResults'));
const BackupReadinessAssessment = React.lazy(() => import('./pages/BackupReadinessAssessment'));
const BackupReadinessResults = React.lazy(() => import('./pages/BackupReadinessResults'));
const IncidentResponsePlanAssessment = React.lazy(() => import('./pages/IncidentResponsePlanAssessment'));
const IncidentResponseResults = React.lazy(() => import('./pages/IncidentResponseResults'));
const VulnerabilityManagementAssessment = React.lazy(() => import('./pages/VulnerabilityManagementAssessment'));
const VulnerabilityManagementResults = React.lazy(() => import('./pages/VulnerabilityManagementResults'));
const TabletopExercise = React.lazy(() => import('./pages/TabletopExercise'));
const NistCsfAlignment = React.lazy(() => import('./pages/NistCsfAlignment'));
const SecurityAwareness = React.lazy(() => import('./pages/SecurityAwareness'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Support = React.lazy(() => import('./pages/Support'));
import AuthLayout from './components/auth/AuthLayout';
const FAQ = React.lazy(() => import('./pages/FAQ'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    // Initialize from local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
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

  // Loading fallback for lazy loaded components
  const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Main website routes */}
          <Route element={<MainLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/toolkit" element={<ToolkitPage />} />
          </Route>

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Assessment routes */}
          <Route element={<AssessmentLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
            {/* Assessment landing page */}
            <Route path="/assessments" element={<AssessmentsLanding />} />
          </Route>

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AssessmentLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
                <Dashboard />
              </AssessmentLayout>
            </ProtectedRoute>
          } />

          <Route element={<AssessmentLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
          {/* Assessment tools */}
          <Route path="/ransomware-assessment" element={<RansomwareAssessment />} />
          <Route path="/ransomware-results" element={<RansomwareResults />} />
          <Route path="/ransomware-recommendations" element={<RansomwareRecommendations />} />
          <Route path="/supply-chain-assessment" element={<SupplyChainAssessment />} />
          <Route path="/supply-chain-results" element={<SupplyChainResults />} />
          <Route path="/supply-chain-recommendations" element={<SupplyChainRecommendations />} />
          <Route path="/zero-trust-maturity-assessment" element={<ZeroTrustMaturityAssessment />} />
          <Route path="/zero-trust-maturity-results" element={<ZeroTrustMaturityResults />} />
          <Route path="/network-segmentation-assessment" element={<NetworkSegmentationAssessment />} />
          <Route path="/network-segmentation-results" element={<NetworkSegmentationResults />} />
          <Route path="/backup-readiness-assessment" element={<BackupReadinessAssessment />} />
          <Route path="/backup-readiness-results" element={<BackupReadinessResults />} />
          <Route path="/incident-response-plan-assessment" element={<IncidentResponsePlanAssessment />} />
          <Route path="/incident-response-results" element={<IncidentResponseResults />} />
          <Route path="/vulnerability-management-assessment" element={<VulnerabilityManagementAssessment />} />
          <Route path="/vulnerability-management-results" element={<VulnerabilityManagementResults />} />
          <Route path="/tabletop-exercise" element={<TabletopExercise />} />
          <Route path="/nist-csf-alignment" element={<NistCsfAlignment />} />
          <Route path="/security-awareness" element={<SecurityAwareness />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Toaster />
     <Analytics />
    </Router>
  );
}

export default App;