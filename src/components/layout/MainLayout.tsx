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
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background">
      {/* Navigation Header */}
      <Navigation 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="relative overflow-hidden">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;