
/**
 * Date utility functions
 */

export const ensureISOString = (date: string | Date): string => {
  if (typeof date === 'string') {
    // Check if it's already an ISO string
    if (date.includes('T') && (date.includes('Z') || date.includes('+') || date.includes('-'))) {
      return date;
    }
    // Try to parse and convert to ISO
    const parsed = new Date(date);
    return parsed.toISOString();
  }
  return date.toISOString();
};

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = now.getTime() - target.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return target.toLocaleDateString();
};
