
import { http } from '@/lib/api';

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  type: 'document' | 'team' | 'system' | 'chat';
  userId: string;
  userName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ActivityFilters {
  type?: string;
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
  // Get activity logs with optional filters
  getLogs: async (filters?: ActivityFilters): Promise<ActivityLog[]> => {
    console.log('Fetching activity logs with filters:', filters);
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    
    const response = await http.get<ActivityLog[]>(`/api/activity?${params.toString()}`);
    return response;
  },

  // Log a new activity
  logActivity: async (data: { action: string; description: string; type: string; metadata?: Record<string, any> }) => {
    console.log('Logging activity:', data);
    return http.post('/api/activity', data);
  },

  // Get activity for a specific document
  getDocumentActivity: async (documentId: string): Promise<ActivityLog[]> => {
    console.log('Fetching document activity:', documentId);
    return http.get<ActivityLog[]>(`/api/activity/document/${documentId}`);
  },

  // Get activity for a specific user
  getUserActivity: async (userId: string): Promise<ActivityLog[]> => {
    console.log('Fetching user activity:', userId);
    return http.get<ActivityLog[]>(`/api/activity/user/${userId}`);
  }
};
