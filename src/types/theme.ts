/**
 * Theme types for CyberCaution Security Orchestration & Governance Platform
 */

export type Theme = 'light' | 'dark';

export type ThemeColor = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  text: string;
  textSecondary: string;
  border: string;
  divider: string;
  overlay: string;
  shadow: string;
}

export interface ChartTheme {
  background: string;
  text: string;
  grid: string;
  axis: string;
  series: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    additional: string[];
  };
  tooltip: {
    background: string;
    text: string;
    border: string;
  };
}

export interface ThemeConfig {
  name: Theme;
  colors: ThemeColors;
  chart: ChartTheme;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    dropdown: number;
    modal: number;
    popover: number;
    tooltip: number;
    notification: number;
  };
}

export interface ThemedComponentProps {
  variant?: ThemeColor;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

export interface ThemeContextValue {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// CSS Variable names for runtime theme switching
export const CSS_VARIABLES = {
  // Main colors
  '--color-primary': 'primary',
  '--color-primary-light': 'primaryLight',
  '--color-primary-dark': 'primaryDark',
  '--color-secondary': 'secondary',
  '--color-secondary-light': 'secondaryLight',
  '--color-secondary-dark': 'secondaryDark',
  '--color-success': 'success',
  '--color-warning': 'warning',
  '--color-error': 'error',
  '--color-info': 'info',
  
  // UI colors
  '--color-background': 'background',
  '--color-surface': 'surface',
  '--color-surface-variant': 'surfaceVariant',
  '--color-text': 'text',
  '--color-text-secondary': 'textSecondary',
  '--color-border': 'border',
  '--color-divider': 'divider',
  '--color-overlay': 'overlay',
  
  // Chart colors
  '--chart-background': 'chart.background',
  '--chart-text': 'chart.text',
  '--chart-grid': 'chart.grid',
  '--chart-axis': 'chart.axis',
  '--chart-primary': 'chart.series.primary',
  '--chart-secondary': 'chart.series.secondary',
  '--chart-success': 'chart.series.success',
  '--chart-warning': 'chart.series.warning',
  '--chart-error': 'chart.series.error',
  '--chart-info': 'chart.series.info',
  
  // Shadows
  '--shadow-sm': 'shadows.sm',
  '--shadow-md': 'shadows.md',
  '--shadow-lg': 'shadows.lg',
  '--shadow-xl': 'shadows.xl',
} as const;

export type CSSVariableName = keyof typeof CSS_VARIABLES;