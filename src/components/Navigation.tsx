import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Gauge, 
  Lightbulb, 
  Rocket, 
  BookOpen, 
  Building2, 
  User, 
  Moon, 
  SunMoon, 
  Menu, 
  X,
  ClipboardList,
  Wrench
} from 'lucide-react';
import { Button } from './ui/Button';
import { SUBDOMAIN_URLS } from '../utils/navigation';

interface NavigationProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  toggleDarkMode, 
  darkMode, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const location = useLocation();

  const navItems = [
    { 
      name: 'Home', 
      path: '/',
      icon: Home, 
      external: false
    },
    { 
      name: 'Assessments', 
      path: '/assessments',
      icon: ClipboardList,
      external: false
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard',
      icon: Gauge,
      external: false
    },
    { 
      name: 'Features', 
      path: '/features',
      icon: Lightbulb,
      external: false
    },
    { 
      name: 'Solutions', 
      path: '/solutions',
      icon: Rocket,
      external: false
    },
    { 
      name: 'Resources', 
      path: '/resources',
      icon: BookOpen,
      external: false
    },
   { 
     name: 'Toolkit', 
     path: '/toolkit',
     icon: Wrench,
     external: false
   },
    { 
      name: 'Pricing', 
      path: '/pricing',
      icon: Building2,
      external: false
    }
  ];

  const handleExternalNavigation = (url: string) => {
    if (url) {
      window.location.href = url;
    }
  };

  const handleMobileExternalClick = (url: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      handleExternalNavigation(url);
    }, 100); // Small delay to allow menu close animation
  };

  const handleMobileInternalClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button 
              onClick={() => handleExternalNavigation(SUBDOMAIN_URLS.MAIN)} 
              className="flex items-center group cursor-pointer hover:opacity-80 transition-opacity"
              type="button"
            >
              <img 
                src="/cybercaution.png" 
                alt="CyberCaution Logo" 
                className="h-12 w-12 transform group-hover:scale-110 transition-transform" 
              />
              <div className="ml-2">
                <span className="text-xl font-bold text-foreground hidden md:block">CyberCaution™</span>
                <span className="text-xs text-muted-foreground hidden md:block">by ERMITS</span>
              </div>
            </button>
          </div>
          
          {/* Centered Navigation Items */}
          <div className="hidden sm:flex sm:space-x-1">
            {navItems.map(item => (
              <div key={item.name}>
                {item.external ? (
                  <button 
                    onClick={() => handleExternalNavigation(item.url || '')}
                    className="flex items-center text-foreground hover:text-electric-blue transition-colors duration-200 px-2 py-2 text-sm font-medium cursor-pointer"
                    type="button"
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`flex items-center transition-colors duration-200 px-2 py-2 text-sm font-medium ${
                      location.pathname === item.path 
                        ? 'text-electric-blue' 
                        : 'text-foreground hover:text-electric-blue'
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-md text-foreground hover:text-electric-blue transition-colors duration-200 mr-1"
              aria-label="Toggle dark mode"
              type="button"
            >
              {darkMode ? (
                <SunMoon className="h-5 w-5 hover:rotate-12 transition-transform" />
              ) : (
                <Moon className="h-5 w-5 hover:rotate-12 transition-transform" />
              )}
            </button>
            <button 
              onClick={() => handleExternalNavigation(`${SUBDOMAIN_URLS.AUTH}/login`)}
              type="button"
              className="cursor-pointer"
            >
              <Button variant="orange" className="ml-1 flex items-center" size="sm">
                <User className="mr-1 h-3 w-3" />
                Login
              </Button>
            </button>
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
      
      {/* Mobile menu */}
      <div 
        className={`sm:hidden bg-card border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.external ? (
                <button
                  onClick={() => handleMobileExternalClick(item.url || '')}
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground hover:bg-muted w-full text-left cursor-pointer"
                  type="button"
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                    location.pathname === item.path 
                      ? 'text-electric-blue bg-electric-blue/5 dark:bg-electric-blue/10' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onClick={handleMobileInternalClick}
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
  );
};

export default Navigation;