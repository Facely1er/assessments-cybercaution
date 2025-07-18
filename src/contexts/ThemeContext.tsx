/**
 * Theme Context for CyberCaution Security Orchestration & Governance Platform
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Theme, 
  ThemeConfig, 
  ThemeContextValue, 
  CSS_VARIABLES,
  CSSVariableName 
} from '../types/theme';

// Theme configurations
const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: '#2563eb',
    primaryLight: '#60a5fa',
    primaryDark: '#1d4ed8',
    secondary: '#7c3aed',
    secondaryLight: '#a78bfa',
    secondaryDark: '#6d28d9',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceVariant: '#f3f4f6',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    divider: '#d1d5db',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  chart: {
    background: '#ffffff',
    text: '#374151',
    grid: '#e5e7eb',
    axis: '#6b7280',
    series: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      additional: ['#ec4899', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'],
    },
    tooltip: {
      background: '#ffffff',
      text: '#111827',
      border: '#e5e7eb',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },
};

const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',
    secondary: '#8b5cf6',
    secondaryLight: '#a78bfa',
    secondaryDark: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceVariant: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    divider: '#475569',
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  chart: {
    background: '#1e293b',
    text: '#e2e8f0',
    grid: '#334155',
    axis: '#94a3b8',
    series: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      additional: ['#ec4899', '#a78bfa', '#14b8a6', '#84cc16', '#fb923c'],
    },
    tooltip: {
      background: '#334155',
      text: '#f1f5f9',
      border: '#475569',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },
};

const themes: Record<Theme, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};

// Create context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Local storage key
const THEME_STORAGE_KEY = 'cybercaution-theme';

// Helper function to get value from nested object using path
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper function to apply theme to CSS variables
const applyThemeToCSS = (themeConfig: ThemeConfig): void => {
  const root = document.documentElement;
  
  Object.entries(CSS_VARIABLES).forEach(([cssVar, path]) => {
    const value = getNestedValue(themeConfig, path);
    if (value) {
      root.style.setProperty(cssVar, value);
    }
  });
  
  // Apply theme class to body for additional styling hooks
  document.body.className = `theme-${themeConfig.name}`;
  
  // Apply transition styles
  root.style.setProperty('--transition-fast', themeConfig.transitions.fast);
  root.style.setProperty('--transition-normal', themeConfig.transitions.normal);
  root.style.setProperty('--transition-slow', themeConfig.transitions.slow);
};

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'dark',
  storageKey = THEME_STORAGE_KEY 
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      // Check localStorage first
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme as Theme;
      }
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      
      return defaultTheme;
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
      return defaultTheme;
    }
  });

  const themeConfig = themes[theme];

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyThemeToCSS(themeConfig);
  }, [themeConfig]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no saved preference
      const savedTheme = localStorage.getItem(storageKey);
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
      setThemeState(newTheme);
    }
  }, [storageKey]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value: ThemeContextValue = {
    theme,
    themeConfig,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Export theme configurations for external use
export { lightTheme, darkTheme, themes };