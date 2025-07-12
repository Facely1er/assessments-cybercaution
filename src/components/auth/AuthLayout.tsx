import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '../ui/Toaster';

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Toaster />
      <Analytics />
    </div>
  );
};

export default AuthLayout;