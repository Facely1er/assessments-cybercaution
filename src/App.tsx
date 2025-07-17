import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from './components/ui/Toaster';

// Layouts
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const AuthLayout = lazy(() => import('./components/auth/AuthLayout'));
const AssessmentLayout = lazy(() => import('./components/layout/AssessmentLayout'));

// Core Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Features = lazy(() => import('./pages/Features'));
const Solutions = lazy(() => import('./pages/Solutions'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Support = lazy(() => import('./pages/Support'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ToolkitPage = lazy(() => import('./pages/ToolkitPage'));

// Assessment & Tool Pages
const AssessmentsLanding = lazy(() => import('./pages/AssessmentsLanding'));
const RansomwareAssessment = lazy(() => import('./pages/RansomwareAssessment'));
const RansomwareResults = lazy(() => import('./pages/RansomwareResults'));
const RansomwareRecommendations = lazy(() => import('./pages/RansomwareRecommendations'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SecurityAwareness = lazy(() => import('./pages/SecurityAwareness'));
const TabletopExercise = lazy(() => import('./pages/TabletopExercise'));
const NistCsfAlignment = lazy(() => import('./pages/NistCsfAlignment'));
const ZeroTrustMaturityAssessment = lazy(() => import('./pages/ZeroTrustMaturityAssessment'));
const ZeroTrustMaturityResults = lazy(() => import('./pages/ZeroTrustMaturityResults'));
const SupplyChainAssessment = lazy(() => import('./pages/SupplyChainAssessment'));
const SupplyChainResults = lazy(() => import('./pages/SupplyChainResults'));
const SupplyChainRecommendations = lazy(() => import('./pages/SupplyChainRecommendations'));
const NetworkSegmentationAssessment = lazy(() => import('./pages/NetworkSegmentationAssessment'));
const NetworkSegmentationResults = lazy(() => import('./pages/NetworkSegmentationResults'));
const BackupReadinessAssessment = lazy(() => import('./pages/BackupReadinessAssessment'));
const BackupReadinessResults = lazy(() => import('./pages/BackupReadinessResults'));
const IncidentResponsePlanAssessment = lazy(() => import('./pages/IncidentResponsePlanAssessment'));
const IncidentResponseResults = lazy(() => import('./pages/IncidentResponseResults'));
const VulnerabilityManagementAssessment = lazy(() => import('./pages/VulnerabilityManagementAssessment'));
const VulnerabilityManagementResults = lazy(() => import('./pages/VulnerabilityManagementResults'));
const QuickCyberCheck = lazy(() => import('./pages/QuickCyberCheck'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

// Toolkit Tools
const ThreatIntelligenceDashboard = lazy(() => import('./pages/tools/ThreatWeatherDashboard'));
const PredictiveBreachAnalytics = lazy(() => import('./pages/tools/PredictiveBreachAnalytics'));
const IndustryThreatProfiler = lazy(() => import('./pages/tools/IndustryThreatProfiler'));
const DarkWebMonitoring = lazy(() => import('./pages/tools/DarkWebMonitoring'));
const NISTCSFToolkit = lazy(() => import('./pages/tools/NISTCSFToolkit'));
const VendorSecurityScorecard = lazy(() => import('./pages/tools/VendorSecurityScorecard'));
const BusinessImpactCalculator = lazy(() => import('./pages/tools/BusinessImpactCalculator'));

// Add new toolkit tools
const Big5PolicyGenerator = lazy(() => import('./pages/tools/Big5PolicyGenerator'));
const IncidentResponsePlaybooks = lazy(() => import('./pages/tools/IncidentResponsePlaybooks'));
const RansomwareReadinessAssessmentTool = lazy(() => import('./pages/tools/RansomwareReadinessAssessment'));
const VendorIQEnhanced = lazy(() => import('./pages/tools/VendorIQEnhanced'));

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Main Layout */}
          <Route 
            path="/" 
            element={
              <MainLayout 
                toggleDarkMode={toggleDarkMode} 
                darkMode={darkMode} 
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="features" element={<Features />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="demo" element={<DemoPage />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="support" element={<Support />} />
            <Route path="toolkit" element={<ToolkitPage />} />
            <Route path="quick-cyber-check" element={<QuickCyberCheck />} />
            <Route path="onboarding" element={<OnboardingPage />} />

            {/* Company Policy Routes */}
            <Route path="company">
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>

            {/* Toolkit Routes */}
            <Route path="tools">
              <Route path="threat-weather" element={<ThreatIntelligenceDashboard />} />
              <Route path="predictive-analytics" element={<PredictiveBreachAnalytics />} />
              <Route path="industry-threats" element={<IndustryThreatProfiler />} />
              <Route path="dark-web-monitor" element={<DarkWebMonitoring />} />
              <Route path="nist-csf-wizard" element={<NISTCSFToolkit />} />
              <Route path="vendor-scorecard" element={<VendorSecurityScorecard />} />
              <Route path="business-impact" element={<BusinessImpactCalculator />} />
              
              {/* New toolkit routes */}
              <Route path="policy-generator" element={<Big5PolicyGenerator />} />
              <Route path="incident-orchestrator" element={<IncidentResponsePlaybooks />} />
              <Route path="ransomware-assessment" element={<RansomwareReadinessAssessmentTool />} />
              <Route path="vendoriq-platform" element={<VendorIQEnhanced />} />
            </Route>

            {/* Protected Dashboard */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Assessment Routes */}
            <Route path="assessments" element={
              <AssessmentLayout 
                toggleDarkMode={toggleDarkMode} 
                darkMode={darkMode} 
              />
            }>
              <Route index element={<AssessmentsLanding />} />
              <Route path="results" element={<Dashboard />} />
            </Route>

            <Route path="ransomware-assessment" element={<RansomwareAssessment />} />
            <Route path="ransomware-results" element={<RansomwareResults />} />
            <Route path="ransomware-recommendations" element={<RansomwareRecommendations />} />
            <Route path="security-awareness" element={<SecurityAwareness />} />
            <Route path="tabletop-exercise" element={<TabletopExercise />} />
            <Route path="nist-csf-alignment" element={<NistCsfAlignment />} />
            <Route path="zero-trust-maturity-assessment" element={<ZeroTrustMaturityAssessment />} />
            <Route path="zero-trust-maturity-results" element={<ZeroTrustMaturityResults />} />
            <Route path="supply-chain-assessment" element={<SupplyChainAssessment />} />
            <Route path="supply-chain-results" element={<SupplyChainResults />} />
            <Route path="supply-chain-recommendations" element={<SupplyChainRecommendations />} />
            <Route path="network-segmentation-assessment" element={<NetworkSegmentationAssessment />} />
            <Route path="network-segmentation-results" element={<NetworkSegmentationResults />} />
            <Route path="backup-readiness-assessment" element={<BackupReadinessAssessment />} />
            <Route path="backup-readiness-results" element={<BackupReadinessResults />} />
            <Route path="incident-response-plan-assessment" element={<IncidentResponsePlanAssessment />} />
            <Route path="incident-response-results" element={<IncidentResponseResults />} />
            <Route path="vulnerability-management-assessment" element={<VulnerabilityManagementAssessment />} />
            <Route path="vulnerability-management-results" element={<VulnerabilityManagementResults />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      <Analytics />
    </Router>
  );
}

export default App;