/**
 * Formatting utilities for the CyberCaution platform
 * Provides consistent formatting across all tools and components
 */

/**
 * Number formatting options
 */
export interface NumberFormatOptions {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  thousandsSeparator?: boolean;
}

/**
 * Format a number with optional prefix/suffix and thousands separator
 */
export function formatNumber(
  value: number,
  options: NumberFormatOptions = {}
): string {
  const {
    decimals = 0,
    prefix = '',
    suffix = '',
    thousandsSeparator = true
  } = options;

  if (isNaN(value)) return 'N/A';

  let formatted = value.toFixed(decimals);
  
  if (thousandsSeparator) {
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formatted = parts.join('.');
  }

  return `${prefix}${formatted}${suffix}`;
}

/**
 * Format a number as a shortened string (1K, 1.2M, etc.)
 */
export function formatShortNumber(value: number): string {
  if (isNaN(value)) return 'N/A';
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e9) {
    return sign + (absValue / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (absValue >= 1e6) {
    return sign + (absValue / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (absValue >= 1e3) {
    return sign + (absValue / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return sign + absValue.toString();
}

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  if (isNaN(value)) return 'N/A';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    // Fallback to simple formatting if Intl is not supported
    return `$${formatNumber(value, { decimals: 2 })}`;
  }
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(
  value: number,
  decimals: number = 1,
  includeSign: boolean = false
): string {
  if (isNaN(value)) return 'N/A';
  
  const formatted = value.toFixed(decimals);
  const sign = includeSign && value > 0 ? '+' : '';
  
  return `${sign}${formatted}%`;
}

/**
 * Date formatting options
 */
export interface DateFormatOptions {
  format?: 'short' | 'medium' | 'long' | 'full' | 'custom';
  customFormat?: string;
  includeTime?: boolean;
  timeFormat?: '12h' | '24h';
  relative?: boolean;
}

/**
 * Format a date with various options
 */
export function formatDate(
  date: Date | string | number,
  options: DateFormatOptions = {}
): string {
  const {
    format = 'medium',
    includeTime = false,
    timeFormat = '12h',
    relative = false
  } = options;

  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  // Handle relative dates
  if (relative) {
    return formatRelativeDate(dateObj);
  }

  // Format based on selected format
  switch (format) {
    case 'short':
      return formatShortDate(dateObj, includeTime, timeFormat);
    case 'medium':
      return formatMediumDate(dateObj, includeTime, timeFormat);
    case 'long':
      return formatLongDate(dateObj, includeTime, timeFormat);
    case 'full':
      return formatFullDate(dateObj, includeTime, timeFormat);
    default:
      return formatMediumDate(dateObj, includeTime, timeFormat);
  }
}

/**
 * Format date as relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (Math.abs(diffSecs) < 60) {
    return diffSecs < 0 ? 'in a few seconds' : 'a few seconds ago';
  }
  if (Math.abs(diffMins) < 60) {
    const mins = Math.abs(diffMins);
    return diffMins < 0 
      ? `in ${mins} minute${mins !== 1 ? 's' : ''}`
      : `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  }
  if (Math.abs(diffHours) < 24) {
    const hours = Math.abs(diffHours);
    return diffHours < 0
      ? `in ${hours} hour${hours !== 1 ? 's' : ''}`
      : `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  if (Math.abs(diffDays) < 7) {
    const days = Math.abs(diffDays);
    return diffDays < 0
      ? `in ${days} day${days !== 1 ? 's' : ''}`
      : `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  if (Math.abs(diffWeeks) < 4) {
    const weeks = Math.abs(diffWeeks);
    return diffWeeks < 0
      ? `in ${weeks} week${weeks !== 1 ? 's' : ''}`
      : `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }
  if (Math.abs(diffMonths) < 12) {
    const months = Math.abs(diffMonths);
    return diffMonths < 0
      ? `in ${months} month${months !== 1 ? 's' : ''}`
      : `${months} month${months !== 1 ? 's' : ''} ago`;
  }
  
  const years = Math.abs(diffYears);
  return diffYears < 0
    ? `in ${years} year${years !== 1 ? 's' : ''}`
    : `${years} year${years !== 1 ? 's' : ''} ago`;
}

/**
 * Format date as short format (MM/DD/YYYY)
 */
function formatShortDate(date: Date, includeTime: boolean, timeFormat: string): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  
  let result = `${month}/${day}/${year}`;
  
  if (includeTime) {
    result += ' ' + formatTime(date, timeFormat);
  }
  
  return result;
}

/**
 * Format date as medium format (Jan 1, 2024)
 */
function formatMediumDate(date: Date, includeTime: boolean, timeFormat: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  let result = `${month} ${day}, ${year}`;
  
  if (includeTime) {
    result += ' at ' + formatTime(date, timeFormat);
  }
  
  return result;
}

/**
 * Format date as long format (January 1, 2024)
 */
function formatLongDate(date: Date, includeTime: boolean, timeFormat: string): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  let result = `${month} ${day}, ${year}`;
  
  if (includeTime) {
    result += ' at ' + formatTime(date, timeFormat);
  }
  
  return result;
}

/**
 * Format date as full format (Monday, January 1, 2024)
 */
function formatFullDate(date: Date, includeTime: boolean, timeFormat: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[date.getDay()];
  
  let result = `${dayName}, ${formatLongDate(date, false, timeFormat)}`;
  
  if (includeTime) {
    result += ' at ' + formatTime(date, timeFormat);
  }
  
  return result;
}

/**
 * Format time
 */
function formatTime(date: Date, format: '12h' | '24h'): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  if (format === '24h') {
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return `${displayHours}:${minutes} ${period}`;
}

/**
 * Format duration in seconds to human-readable format
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return 'N/A';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts: string[] = [];
  
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
  
  return parts.join(' ');
}

/**
 * Format bytes to human-readable format
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  if (isNaN(bytes)) return 'N/A';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format a risk score (0-100) to a label
 */
export function formatRiskScore(score: number): { label: string; color: string } {
  if (isNaN(score)) {
    return { label: 'Unknown', color: 'gray' };
  }
  
  if (score >= 80) {
    return { label: 'Critical', color: 'red' };
  } else if (score >= 60) {
    return { label: 'High', color: 'orange' };
  } else if (score >= 40) {
    return { label: 'Medium', color: 'yellow' };
  } else if (score >= 20) {
    return { label: 'Low', color: 'blue' };
  } else {
    return { label: 'Minimal', color: 'green' };
  }
}

/**
 * Format a compliance percentage to a status
 */
export function formatComplianceStatus(percentage: number): { label: string; color: string } {
  if (isNaN(percentage)) {
    return { label: 'Unknown', color: 'gray' };
  }
  
  if (percentage >= 95) {
    return { label: 'Excellent', color: 'green' };
  } else if (percentage >= 80) {
    return { label: 'Good', color: 'blue' };
  } else if (percentage >= 60) {
    return { label: 'Fair', color: 'yellow' };
  } else if (percentage >= 40) {
    return { label: 'Poor', color: 'orange' };
  } else {
    return { label: 'Critical', color: 'red' };
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Convert string to slug format
 */
export function toSlug(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}