import React, { ReactNode, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { Shield, ExternalLink } from 'lucide-react';

interface MainLayoutProps {
  children?: ReactNode;
  toggleDarkMode: () => void;
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  toggleDarkMode,
  darkMode,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Header */}
      <Navigation 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">CyberCaution Assessment Portal</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
              <Link to="/company/privacy" className="text-primary hover:underline text-sm">
                Privacy Policy
              </Link>
              <Link to="/company/terms" className="text-primary hover:underline text-sm">
                Terms of Service
              </Link>
              <span className="text-xs text-muted-foreground mr-4">
                Based on CISA guidelines and best practices
              </span>
              <a 
                href="https://www.cisa.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center"
              >
                CISA.gov
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;