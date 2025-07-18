// src/contexts/themeContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('cybercaution-theme');
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Update CSS variables for charts based on theme
    if (theme === 'dark') {
      // Dark theme chart colors (brighter)
      root.style.setProperty('--chart-primary', '96 165 250'); // blue-400
      root.style.setProperty('--chart-secondary', '52 211 153'); // emerald-400
      root.style.setProperty('--chart-tertiary', '251 191 36'); // amber-400
      root.style.setProperty('--chart-quaternary', '167 139 250'); // violet-400
      root.style.setProperty('--chart-quinary', '244 114 182'); // pink-400
    } else {
      // Light theme chart colors (darker)
      root.style.setProperty('--chart-primary', '37 99 235'); // blue-600
      root.style.setProperty('--chart-secondary', '5 150 105'); // emerald-600
      root.style.setProperty('--chart-tertiary', '217 119 6'); // amber-600
      root.style.setProperty('--chart-quaternary', '124 58 237'); // violet-600
      root.style.setProperty('--chart-quinary', '219 39 119'); // pink-600
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0F172A' : '#ffffff');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('cybercaution-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Export theme type for use in other components
export type { ThemeContextType };