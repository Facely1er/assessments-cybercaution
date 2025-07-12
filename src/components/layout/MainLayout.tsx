import React, { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from './Footer';

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
      <Footer />
    </div>
  );
};

export default MainLayout;