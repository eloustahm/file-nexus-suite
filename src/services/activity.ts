
import { http } from '@/lib/api';

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string;
  type: 'document' | 'team' | 'system' | 'chat';
  metadata?: Record<string, any>;
  resourceId?: string;
  resourceType?: string;
}

export interface ActivityFilters {
  type?: 'document' | 'team' | 'system' | 'chat';
  userId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

/**
 * Activity API service
 */
export const activityApi = {
  // Get activity logs with filters
  getLogs: async (filters?: ActivityFilters): Promise<ActivityLog[]> => {
    return http.get<ActivityLog[]>('/api/activity', { params: filters });
  },

  // Get document-specific activity
  getDocumentActivity: async (documentId: string): Promise<ActivityLog[]> => {
    return http.get<ActivityLog[]>(`/api/activity/documents/${documentId}`);
  },

  // Get user activity
  getUserActivity: async (userId: string): Promise<ActivityLog[]> => {
    return http.get<ActivityLog[]>(`/api/activity/users/${userId}`);
  },

  // Log custom activity
  logActivity: async (data: { action: string; description: string; type: string; metadata?: Record<string, any> }): Promise<void> => {
    return http.post<void>('/api/activity', data);
  }
};
