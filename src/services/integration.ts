
import { http } from '@/lib/api';
import type { Integration } from '@/types';

export const integrationService = {
  async getIntegrations(): Promise<Integration[]> {
    return http.get<Integration[]>('/integrations');
  },

  async getIntegration(id: string): Promise<Integration> {
    return http.get<Integration>(`/integrations/${id}`);
  },

  async createIntegration(data: Omit<Integration, 'id'>): Promise<Integration> {
    return http.post<Integration>('/integrations', data);
  },

  async updateIntegration(id: string, data: Partial<Integration>): Promise<Integration> {
    return http.put<Integration>(`/integrations/${id}`, data);
  },

  async deleteIntegration(id: string): Promise<void> {
    return http.delete(`/integrations/${id}`);
  },

  async testIntegration(id: string): Promise<{ success: boolean; message: string }> {
    return http.post(`/integrations/${id}/test`);
  },

  async enableIntegration(id: string): Promise<Integration> {
    return http.patch<Integration>(`/integrations/${id}/enable`);
  },

  async disableIntegration(id: string): Promise<Integration> {
    return http.patch<Integration>(`/integrations/${id}/disable`);
  },
};
