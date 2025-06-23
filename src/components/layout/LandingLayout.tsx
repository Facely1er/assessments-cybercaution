import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Menu, 
  X, 
  AlertTriangle, 
  BookOpen, 
  Info, 
  User, 
  SunMoon, 
  Moon, 
  ChevronDown, 
  Network,
  CheckCircle,
  FileText,
  Gauge,
  Rocket,
  Lightbulb,
  MessageSquare,
  Home,
  Shield,
  Building2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import { Button } from '../ui/Button';
import { SUBDOMAIN_URLS } from '../../utils/navigation';

interface LandingLayoutProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const LandingLayout = ({ toggleDarkMode, darkMode }: LandingLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Listen for scroll to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reorganized navigation with clearer structure and reduced duplication
  const navItems = [
    { 
      name: 'Home', 
      path: '/',
      icon: Home
    },
    { 
      name: 'Assessments', 
      icon: Gauge,
      children: [
        { name: 'Ransomware Assessment', path: '/ransomware-assessment', icon: AlertTriangle },
        { name: 'NIST CSF Alignment', path: '/nist-csf-alignment', icon: Shield },
        { name: 'Supply Chain Assessment', path: '/supply-chain-assessment', icon: Network },
        { name: 'Tabletop Exercise', path: '/tabletop-exercise', icon: CheckCircle }
      ]
    },
    { 
      name: 'Features', 
      path: '/features',
      icon: Lightbulb
    },
    { 
      name: 'Solutions', 
      path: '/solutions',
      icon: Rocket
    },
    { 
      name: 'Resources', 
      icon: BookOpen,
      children: [
        { name: 'Documentation', path: '/documentation', icon: FileText },
        { name: 'Guides', path: '/resources/guides', icon: BookOpen },
        { name: 'Blog', path: '/resources/blog', icon: MessageSquare },
        { name: 'Support', path: '/resources/support', icon: Info },
      ]
    },
    { 
      name: 'Company', 
      icon: Building2,
      children: [
        { name: 'Pricing', path: '/pricing', icon: FileText },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: MessageSquare },
      ]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''} bg-background`}>
      <nav className={`sticky top-0 z-20 bg-background/95 backdrop-blur-sm transition-shadow duration-300 ${isScrolled ? 'shadow-md dark:shadow-gray-900/40' : ''} border-b border-border/50`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img 
                  src="/cybercaution.png" 
                  alt="CyberCaution Logo" 
                  className="h-12 w-12 transform group-hover:scale-110 transition-transform" 
                />
                <div className="ml-2">
                  <span className="text-xl font-bold text-foreground hidden md:block">CyberCaution™</span>
                  <span className="text-xs text-muted-foreground hidden md:block">by ERMITS</span>
                </div>
              </Link>
              
              <div className="hidden sm:ml-4 sm:flex gap-x-0.5">
                {navItems.map(item => (
                  <div key={item.name} className="relative group">
                    {item.children ? (
                      <div className="flex items-center text-foreground hover:text-electric-blue transition-colors duration-200 px-2 py-2 text-sm font-medium cursor-pointer">
                        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                        <span>{item.name}</span>
                        <ChevronDown className="ml-1 h-3 w-3 transform group-hover:rotate-180 transition-transform duration-200" />
                        
                        {/* Dropdown */}
                        <div className="absolute hidden group-hover:block top-full left-0 w-56 mt-1 bg-card shadow-lg rounded-md border border-border/50 p-2 z-50">
                          {item.children.map(child => (
                            <Link 
                              key={child.path} 
                              to={child.path}
                              className="block px-4 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors flex items-center"
                            >
                              {child.icon && <child.icon className="h-4 w-4 mr-2" />}
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        to={item.path} 
                        className={`flex items-center transition-colors duration-200 px-2 py-2 text-sm font-medium ${location.pathname === item.path ? 'text-electric-blue' : 'text-foreground hover:text-electric-blue'}`}
                      >
                        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-foreground hover:text-electric-blue transition-colors duration-200 mr-2"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunMoon className="h-5 w-5 hover:rotate-12 transition-transform" />
                ) : (
                  <Moon className="h-5 w-5 hover:rotate-12 transition-transform" />
                )}
              </button>
              <Link to="/login">
                <Button variant="orange" className="ml-2 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <button
                type="button"
                className="sm:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-electric-blue transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6 transition-transform transform duration-200 rotate-90" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6 transition-transform transform duration-200" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu - enhanced with smooth animation */}
        <div 
          className={`sm:hidden bg-card border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.children ? (
                  <>
                    <div className="px-3 py-2 text-base font-medium text-foreground flex items-center">
                      {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                      {item.name}
                    </div>
                    <div className="pl-5 space-y-1">
                      {item.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            location.pathname === child.path 
                              ? 'text-electric-blue bg-electric-blue/5 dark:bg-electric-blue/10' 
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {child.icon && <child.icon className="h-4 w-4 mr-2" />}
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                      location.pathname === item.path 
                        ? 'text-electric-blue bg-electric-blue/5 dark:bg-electric-blue/10' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingLayout;