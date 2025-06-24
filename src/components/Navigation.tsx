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
  X 
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
      icon: Home
    },
    { 
      name: 'Assessments', 
      path: '/assessments',
      icon: Gauge,
      external: true,
      url: `${SUBDOMAIN_URLS.ASSESS}/assessment`
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard',
      icon: Gauge,
      external: true,
      url: `${SUBDOMAIN_URLS.APP}/dashboard`
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
      path: '/resources',
      icon: BookOpen,
      external: true,
      url: `${SUBDOMAIN_URLS.RESOURCES}/guides`
    },
    { 
      name: 'Pricing', 
      path: '/pricing',
      icon: Building2
    }
  ];

  return (
    <nav className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
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
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-1">
              {navItems.map(item => (
                <div key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.url}
                      className="flex items-center text-foreground hover:text-electric-blue transition-colors duration-200 px-2 py-2 text-sm font-medium"
                    >
                      {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                      <span>{item.name}</span>
                    </a>
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
          </div>
          
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-md text-foreground hover:text-electric-blue transition-colors duration-200 mr-1"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunMoon className="h-5 w-5 hover:rotate-12 transition-transform" />
              ) : (
                <Moon className="h-5 w-5 hover:rotate-12 transition-transform" />
              )}
            </button>
            <a href={`${SUBDOMAIN_URLS.AUTH}/login`}>
              <Button variant="orange" className="ml-1 flex items-center" size="sm">
                <User className="mr-1 h-3 w-3" />
                Login
              </Button>
            </a>
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
                <a
                  href={item.url}
                  className={`flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground hover:bg-muted`}
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                  {item.name}
                </a>
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
  );
};

export default Navigation;