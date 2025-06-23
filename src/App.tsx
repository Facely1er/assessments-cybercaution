import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import { GuideProvider } from './context/GuideContext';

// Layout components
import Layout from './components/layout/Layout';
import LandingLayout from './components/layout/LandingLayout';

// Pages
import Landing from './pages/Landing';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import RiskRegister from './pages/RiskRegister';
import RiskAssessment from './pages/RiskAssessment';
import RansomwareAssessment from './pages/RansomwareAssessment';
import RansomwareResults from './pages/RansomwareResults';
import RansomwareRecommendations from './pages/RansomwareRecommendations';
import SupplyChainAssessment from './pages/SupplyChainAssessment';
import SupplyChainResults from './pages/SupplyChainResults';
import SupplyChainRecommendations from './pages/SupplyChainRecommendations';
import ControlMapping from './pages/ControlMapping';
import Documents from './pages/Documents';
import Evidence from './pages/Evidence';
import Requirements from './pages/Requirements';
import Policies from './pages/Policies';
import Compliance from './pages/Compliance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// New pages
import RiskRegisterResults from './pages/RiskRegisterResults';
import TabletopExercise from './pages/TabletopExercise';
import NistCsfAlignment from './pages/NistCsfAlignment';
import Contact from './pages/Contact';
import Playbooks from './pages/Playbooks';
import SecurityAwareness from './pages/SecurityAwareness';

// Additional new pages
import BusinessImpactPage from './pages/BusinessImpactPage';
import BusinessImpactAnalysisTool from './pages/BusinessImpactAnalysisTool';
import ContinuityPage from './pages/ContinuityPage';
import DashboardPage from './pages/DashboardPage';
import DependencyManagerPage from './pages/DependencyManagerPage';
import RansomwarePage from './pages/RansomwarePage';
import ToolkitPage from './pages/ToolkitPage';
import ToolkitDetail from './pages/ToolkitDetail';
import TrainingPage from './pages/TrainingPage';
import InventoryPage from './pages/InventoryPage';

// New assessment dashboard pages
import RansomwareAssessmentDashboard from './pages/RansomwareAssessmentDashboard';
import SupplyChainRiskDashboard from './pages/SupplyChainRiskDashboard';

// RMF Pages
import RMFDashboard from './pages/RMF/RMFDashboard';
import RMFTaskList from './pages/RMF/RMFTaskList';
import RMFTaskDetail from './pages/RMF/RMFTaskDetail';

// Resource pages
import Documentation from './pages/resources/Documentation';
import GettingStarted from './pages/resources/documentation/GettingStarted';
import QuickStart from './pages/resources/documentation/QuickStart';
import Privacy from './pages/company/Privacy';
import Terms from './pages/company/Terms';
import Careers from './pages/company/Careers';
import PlatformOverview from './pages/resources/documentation/PlatformOverview';
import UnderstandingDashboard from './pages/resources/documentation/UnderstandingDashboard';
import RansomwareDefense from './pages/resources/documentation/RansomwareDefense';
import RiskRegisterGuide from './pages/resources/documentation/RiskRegisterGuide';
import TabletopExerciseGuide from './pages/resources/documentation/TabletopExerciseGuide';
import NistIr8374Guide from './pages/resources/documentation/NistIr8374Guide';
import Guides from './pages/resources/Guides';
import NistCsfGuide from './pages/resources/guides/NistCsfGuide';
import RansomwareGuide from './pages/resources/guides/RansomwareGuide';
import SupplyChainGuide from './pages/resources/guides/SupplyChainGuide';
import SecurityControlsGuide from './pages/resources/guides/SecurityControlsGuide';
import ComplianceGuide from './pages/resources/guides/ComplianceGuide';
import RiskAssessmentGuide from './pages/resources/guides/RiskAssessmentGuide';
import Blog from './pages/resources/Blog';
import Support from './pages/resources/Support';

// Guide components
import CuiCmmcGuide from './components/CuiCmmcGuide';
import TabletopGuide from './components/TabletopGuide';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { RiskProvider } from './context/RiskContext';
import { DocumentProvider } from './context/DocumentContext';
import { RMFProvider } from './context/RMFContext';

// ScrollToTop component to handle scrolling to top on page changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Apply dark mode class with a slight delay to prevent flicker
  useEffect(() => {
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
  useEffect(() => {
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
      <ScrollToTop />
      <AuthProvider>
        <RiskProvider>
          <DocumentProvider>
            <RMFProvider>
              <GuideProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
                    <Route index element={<Landing />} />
                    <Route path="features" element={<Features />} />
                    <Route path="solutions" element={<Solutions />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="about" element={<About />} />
                    
                    {/* Assessment routes */}
                    <Route path="ransomware-assessment" element={<RansomwareAssessment />} />
                    <Route path="ransomware-results" element={<RansomwareResults />} />
                    <Route path="ransomware-recommendations" element={<RansomwareRecommendations />} />
                    
                    <Route path="supply-chain-assessment" element={<SupplyChainAssessment />} />
                    <Route path="supply-chain-results" element={<SupplyChainResults />} />
                    <Route path="supply-chain-recommendations" element={<SupplyChainRecommendations />} />
                    
                    {/* New pages */}
                    <Route path="tabletop-exercise" element={<TabletopExercise />} />
                    <Route path="nist-csf-alignment" element={<NistCsfAlignment />} />
                    <Route path="risk-register-results" element={<RiskRegisterResults />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="playbooks" element={<Playbooks />} />
                    <Route path="security-awareness" element={<SecurityAwareness />} />
                    
                    {/* Company pages */}
                    <Route path="company/privacy" element={<Privacy />} />
                    <Route path="company/terms" element={<Terms />} />
                    <Route path="company/careers" element={<Careers />} />

                    {/* Resources routes */}
                    <Route path="resources">
                      <Route path="guides" element={<Guides />} />
                      <Route path="blog" element={<Blog />} />
                      <Route path="support" element={<Support />} />
                    </Route>
                    
                    {/* Documentation routes - keep for backward compatibility */}
                    <Route path="documentation" element={<Navigate to="/resources/documentation\" replace />} />
                    <Route path="resources/documentation">
                      <Route index element={<Documentation />} />
                      <Route path="getting-started" element={<GettingStarted />} />
                      <Route path="quick-start" element={<QuickStart />} />
                      <Route path="platform-overview" element={<PlatformOverview />} />
                      <Route path="understanding-dashboard" element={<UnderstandingDashboard />} />
                      <Route path="ransomware-defense" element={<RansomwareDefense />} />
                      <Route path="risk-register-guide" element={<RiskRegisterGuide />} />
                      <Route path="tabletop-exercise-guide" element={<TabletopExerciseGuide />} />
                      <Route path="nist-ir-8374-guide" element={<NistIr8374Guide />} />
                    </Route>

                    {/* Guides routes - keep for backward compatibility */}
                    <Route path="guides" element={<Navigate to="/resources/guides\" replace />} />

                    {/* Individual guides routes */}
                    <Route path="resources/guides">
                      <Route index element={<Guides />} />
                      <Route path="nist-csf" element={<NistCsfGuide />} />
                      <Route path="ransomware-guide" element={<RansomwareGuide />} />
                      <Route path="supply-chain" element={<SupplyChainGuide />} />
                      <Route path="security-controls" element={<SecurityControlsGuide />} />
                      <Route path="compliance" element={<ComplianceGuide />} />
                      <Route path="risk-assessment" element={<RiskAssessmentGuide />} />
                      <Route path="cui-cmmc" element={<CuiCmmcGuide />} />
                      <Route path="tabletop-guide" element={<TabletopGuide />} />
                    </Route>
                  </Route>
                  
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes - For development, removing authentication requirement */}
                  <Route path="/app" element={<Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
                    {/* Redirect from /app to the new dashboard */}
                    <Route index element={<Navigate to="/app/dashboard-new\" replace />} />
                    <Route path="risk-register\" element={<RiskRegister />} />
                    <Route path="risk-assessment" element={<RiskAssessment />} />
                    <Route path="control-mapping" element={<ControlMapping />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="evidence" element={<Evidence />} />
                    <Route path="requirements" element={<Requirements />} />
                    <Route path="policies" element={<Policies />} />
                    <Route path="compliance" element={<Compliance />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                    
                    {/* New page routes */}
                    <Route path="business-impact" element={<BusinessImpactPage />} />
                    <Route path="business-impact-tool" element={<BusinessImpactAnalysisTool />} />
                    <Route path="continuity" element={<ContinuityPage />} />
                    <Route path="dashboard-new" element={<DashboardPage />} />
                    <Route path="security-awareness" element={<SecurityAwareness />} />
                    <Route path="dependency-manager" element={<DependencyManagerPage />} />
                    <Route path="ransomware" element={<RansomwarePage />} />
                    <Route path="toolkit" element={<ToolkitPage />} />
                    <Route path="toolkit/:toolId" element={<ToolkitDetail />} />
                    <Route path="training" element={<TrainingPage />} />
                    <Route path="inventory" element={<InventoryPage />} />
                    <Route path="nist-csf-alignment" element={<NistCsfAlignment />} />

                    {/* New assessment dashboard routes */}
                    <Route path="ransomware-assessment-dashboard" element={<RansomwareAssessmentDashboard />} />
                    <Route path="supply-chain-risk-dashboard" element={<SupplyChainRiskDashboard />} />
                    
                    {/* RMF routes */}
                    <Route path="rmf">
                      <Route index element={<RMFDashboard />} />
                      <Route path=":phaseId/tasks" element={<RMFTaskList tasks={[]} phaseId="" />} />
                      <Route path=":phaseId/tasks/:taskId" element={<RMFTaskDetail task={{
                        id: '',
                        title: '',
                        description: '',
                        inputs: [],
                        outputs: [],
                        responsible: [],
                        supporting: [],
                        outcomes: [],
                        references: [],
                        sdlc: '',
                        rationale: ''
                      }} onBack={() => {}} />} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
                <Toaster />
              </GuideProvider>
            </RMFProvider>
          </DocumentProvider>
        </RiskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;