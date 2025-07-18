/**
 * useTheme hook and theme utilities for CyberCaution
 */

import { useContext, useMemo } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { Theme, ThemeColor, ThemeConfig } from '../types/theme';

// Re-export the main useTheme hook from context
export { useTheme } from '../contexts/themeContext';

// Additional theme utilities
export const useThemeColor = (color: ThemeColor) => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeProvider');
  }

  const { themeConfig } = context;

  return useMemo(() => {
    switch (color) {
      case 'primary':
        return {
          main: themeConfig.colors.primary,
          light: themeConfig.colors.primaryLight,
          dark: themeConfig.colors.primaryDark,
        };
      case 'secondary':
        return {
          main: themeConfig.colors.secondary,
          light: themeConfig.colors.secondaryLight,
          dark: themeConfig.colors.secondaryDark,
        };
      case 'success':
        return { main: themeConfig.colors.success };
      case 'warning':
        return { main: themeConfig.colors.warning };
      case 'error':
        return { main: themeConfig.colors.error };
      case 'info':
        return { main: themeConfig.colors.info };
      case 'neutral':
        return {
          main: themeConfig.colors.text,
          light: themeConfig.colors.textSecondary,
          dark: themeConfig.colors.text,
        };
      default:
        return { main: themeConfig.colors.text };
    }
  }, [color, themeConfig]);
};

export const useChartColors = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useChartColors must be used within a ThemeProvider');
  }

  const { themeConfig } = context;

  return useMemo(() => ({
    ...themeConfig.chart,
    getSeriesColors: (count: number = 6) => {
      const { series } = themeConfig.chart;
      const baseColors = [
        series.primary,
        series.secondary,
        series.success,
        series.warning,
        series.error,
        series.info,
        ...series.additional,
      ];
      
      // If we need more colors than available, cycle through them
      const colors: string[] = [];
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    },
  }), [themeConfig]);
};

export const useThemeTransition = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeTransition must be used within a ThemeProvider');
  }

  const { themeConfig } = context;

  return useMemo(() => ({
    fast: themeConfig.transitions.fast,
    normal: themeConfig.transitions.normal,
    slow: themeConfig.transitions.slow,
    apply: (property: string | string[], duration: 'fast' | 'normal' | 'slow' = 'normal') => {
      const props = Array.isArray(property) ? property : [property];
      return props.map(prop => `${prop} ${themeConfig.transitions[duration]}`).join(', ');
    },
  }), [themeConfig]);
};

export const useThemeShadow = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeShadow must be used within a ThemeProvider');
  }

  const { themeConfig } = context;

  return useMemo(() => ({
    sm: themeConfig.shadows.sm,
    md: themeConfig.shadows.md,
    lg: themeConfig.shadows.lg,
    xl: themeConfig.shadows.xl,
    elevation: (level: 1 | 2 | 3 | 4) => {
      const shadowMap = {
        1: themeConfig.shadows.sm,
        2: themeConfig.shadows.md,
        3: themeConfig.shadows.lg,
        4: themeConfig.shadows.xl,
      };
      return shadowMap[level];
    },
  }), [themeConfig]);
};

// Utility functions
export const getContrastText = (backgroundColor: string, themeConfig: ThemeConfig): string => {
  // Simple contrast calculation - you might want to use a more sophisticated algorithm
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return themeConfig.colors.text;
  
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const adjustColorBrightness = (color: string, percent: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const adjust = (value: number) => {
    const adjusted = Math.round(value + (255 - value) * (percent / 100));
    return Math.min(255, Math.max(0, adjusted));
  };

  const r = adjust(rgb.r);
  const g = adjust(rgb.g);
  const b = adjust(rgb.b);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const getThemeClassName = (theme: Theme, variant?: ThemeColor): string => {
  const baseClass = `theme-${theme}`;
  return variant ? `${baseClass} variant-${variant}` : baseClass;
};

// CSS variable helper
export const getCSSVariable = (variable: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

export const setCSSVariable = (variable: string, value: string): void => {
  document.documentElement.style.setProperty(variable, value);
};

// Theme preference detection
export const getSystemThemePreference = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const watchSystemThemePreference = (callback: (theme: Theme) => void): (() => void) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
};