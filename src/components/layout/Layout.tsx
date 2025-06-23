import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MinimalFooter from './MinimalFooter';
import { useAuth } from '../../context/AuthContext';
import Login from '../../pages/Login';

interface LayoutProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ toggleDarkMode, darkMode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // DEVELOPMENT MODE: Authentication check is disabled for testing
  // IMPORTANT: Re-enable this check before production deployment!
  // if (!user) {
  //   return <Login />;
  // }

  // For development, create a mock user if none exists
  const mockUser = user || {
    id: 'dev-user',
    name: 'Development User',
    email: 'dev@example.com',
    role: 'admin',
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        toggleMobileMenu={toggleSidebar} 
      />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} toggleCollapsed={toggleSidebar} />
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto focus:outline-none">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 max-w-7xl">
              <Outlet />
            </div>
          </main>
          <MinimalFooter />
        </div>
      </div>
    </div>
  );
};

export default Layout;