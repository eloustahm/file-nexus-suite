
import { http } from '@/lib/api';
import type { ActivityLog, ActivityFilter } from '@/types';

export const activityService = {
  // Get activities with pagination and filtering
  async getActivities(params: ActivityFilter): Promise<{ activities: ActivityLog[]; total: number }> {
    return http.get<{ activities: ActivityLog[]; total: number }>('/activities', { params });
  },

  // Get activity statistics
  async getStats(params: { startDate?: string; endDate?: string }): Promise<any> {
    return http.get('/activities/stats', { params });
  },

  // Get a single activity by ID
  async getActivity(id: string): Promise<ActivityLog> {
    return http.get<ActivityLog>(`/activities/${id}`);
  },

  // Create a new activity
  async createActivity(data: Partial<ActivityLog>): Promise<ActivityLog> {
    return http.post<ActivityLog>('/activities', data);
  },

  // Delete a specific activity
  async deleteActivity(id: string): Promise<void> {
    return http.delete<void>(`/activities/${id}`);
  },

  // Clear activities based on filters
  async clearActivities(params: { before?: string; type?: string }): Promise<void> {
    return http.delete<void>('/activities', { params });
  }
};
