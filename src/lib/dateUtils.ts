
/**
 * Utilities for consistent date handling across the application
 */

/**
 * Converts a date value to ISO string format
 */
export const toISOString = (date: Date | string | null | undefined): string => {
  if (!date) return new Date().toISOString();
  if (typeof date === 'string') return date;
  return date.toISOString();
};

/**
 * Converts an ISO string to a Date object
 */
export const fromISOString = (dateString: string | null | undefined): Date => {
  if (!dateString) return new Date();
  return new Date(dateString);
};

/**
 * Type guard to check if a value is a valid date string
 */
export const isValidDateString = (value: any): value is string => {
  return typeof value === 'string' && !isNaN(Date.parse(value));
};

/**
 * Safely converts any date value to ISO string
 */
export const ensureISOString = (value: Date | string | null | undefined): string => {
  if (!value) return new Date().toISOString();
  if (typeof value === 'string') {
    return isValidDateString(value) ? value : new Date().toISOString();
  }
  return value.toISOString();
};

/**
 * Formats a date string for display
 */
export const formatDisplayDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
};

/**
 * Formats a date string for relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    
    return formatDisplayDate(dateString);
  } catch {
    return 'Invalid date';
  }
};
