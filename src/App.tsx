 // src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { AssessmentLayout } from './components/layout/AssessmentLayout';
import { MainLayout } from './components/layout/MainLayout';
import { ToolLayout } from './components/layout/ToolLayout';
import { Analytics } from '@vercel/analytics/react';
import AuthLayout from './components/auth/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const OnboardingPage = React.lazy(() => import('./pages/OnboardingPage'));
const QuickCyberCheck = React.lazy(() => import('./pages/QuickCyberCheck'));

// Lazy load updated toolkit tools
const ThreatCorrelation = React.lazy(() => import('./pages/tools/PredictiveBreachAnalytics'));
const UnifiedAnalytics = React.lazy(() => import('./pages/tools/DarkWebMonitoring'));
const VendorAssessment = React.lazy(() => import('./pages/tools/VendorIQEnhanced'));
const GapAnalysis = React.lazy(() => import('./pages/tools/ComplianceGapChecker'));
const ComplianceMapper = React.lazy(() => import('./pages/tools/NISTCSFToolkit'));
const PolicyOrchestrator = React.lazy(() => import('./pages/tools/Big5PolicyGenerator'));
const RiskAggregator = React.lazy(() => import('./pages/tools/BusinessImpactCalculator'));
const PlaybookAutomation = React.lazy(() => import('./pages/tools/IncidentResponsePlaybooks'));
const WorkflowDesigner = React.lazy(() => import('./pages/tools/BackupIntegrityValidator'));

// Lazy load new orchestration tools
const ToolsDirectory = React.lazy(() => import('./pages/tools/index'));
const IntegrationHub = React.lazy(() => import('./pages/tools/IntegrationHub'));
const WorkflowOrchestrator = React.lazy(() => import('./pages/tools/WorkflowOrchestrator'));
const GovernanceFramework = React.lazy(() => import('./pages/tools/GovernanceFramework'));
const AnalyticsOverlay = React.lazy(() => import('./pages/tools/AnalyticsOverlay'));
const SecurityTraining = React.lazy(() => import('./pages/tools/SecurityTraining'));

// Lazy load all other page components
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
const FAQ = React.lazy(() => import('./pages/FAQ'));
const DemoPage = React.lazy(() => import('./pages/DemoPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark-mode-transition-disabled');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('dark-mode-transition-disabled');
      document.documentElement.classList.remove('dark');
    }
    
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('dark-mode-transition-disabled');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [darkMode]);

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
    <ThemeProvider>
      <Router>
        <ErrorBoundary>
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
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/toolkit" element={<ToolkitPage />} />
                <Route path="/quick-cyber-check" element={<QuickCyberCheck />} />
                <Route path="/company/privacy" element={<Privacy />} />
                <Route path="/company/terms" element={<Terms />} />
              </Route>

              {/* Auth routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* Tool routes with ToolLayout */}
              <Route element={<ToolLayout />}>
                {/* Tools directory */}
                <Route path="/tools" element={<ToolsDirectory />} />
                
                {/* New Orchestration & Governance Tools */}
                <Route path="/tools/integration-hub" element={<IntegrationHub />} />
                <Route path="/tools/workflow-orchestrator" element={<WorkflowOrchestrator />} />
                <Route path="/tools/governance-framework" element={<GovernanceFramework />} />
                <Route path="/tools/analytics-overlay" element={<AnalyticsOverlay />} />
                <Route path="/tools/security-training" element={<SecurityTraining />} />
                
                {/* Updated toolkit tools */}
                <Route path="/tools/threat-correlation" element={<ThreatCorrelation />} />
                <Route path="/tools/unified-analytics" element={<UnifiedAnalytics />} />
                <Route path="/tools/vendor-assessment" element={<VendorAssessment />} />
                <Route path="/tools/gap-analysis" element={<GapAnalysis />} />
                <Route path="/tools/compliance-mapper" element={<ComplianceMapper />} />
                <Route path="/tools/policy-orchestrator" element={<PolicyOrchestrator />} />
                <Route path="/tools/risk-aggregator" element={<RiskAggregator />} />
                <Route path="/tools/playbook-automation" element={<PlaybookAutomation />} />
                <Route path="/tools/workflow-designer" element={<WorkflowDesigner />} />
              </Route>

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />

              {/* Assessment routes */}
              <Route element={<AssessmentLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
                <Route path="/assessments" element={<AssessmentsLanding />} />
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
        </ErrorBoundary>
        <Toaster />
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;