import React from 'react';
import { Link } from 'react-router-dom';

const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const version = 'v2.0.0';
  
  return (
    <footer className="bg-muted/30 border-t border-border py-2 dark:bg-dark-surface/30 flex items-center h-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-full text-xs">
          <div className="text-muted-foreground">
            &copy; {currentYear} ERMITS LLC
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <span className="w-2 h-2 rounded-full bg-secure-green mr-2"></span>
              <span className="text-muted-foreground">Systems operational</span>
            </div>
            <span className="text-muted-foreground">{version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;