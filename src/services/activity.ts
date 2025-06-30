
import { http } from '@/lib/api';
import type { ActivityLog } from '@/types';

export interface ActivityListResponse {
  activities: ActivityLog[];
  total: number;
  page: number;
  limit: number;
}

export interface ActivityParams {
  page?: number;
  limit?: number;
  filter?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const activityService = {
  async getActivities(params?: ActivityParams): Promise<ActivityListResponse> {
    return http.get<ActivityListResponse>('/activity', { params });
  },

  async getActivity(id: string): Promise<ActivityLog> {
    return http.get<ActivityLog>(`/activity/${id}`);
  },

  async createActivity(data: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
    return http.post<ActivityLog>('/activity', data);
  },

  async deleteActivity(id: string): Promise<void> {
    return http.delete(`/activity/${id}`);
  },
};
