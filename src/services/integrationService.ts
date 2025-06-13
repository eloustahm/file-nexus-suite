import { http } from '@/lib/api';
import type { Integration } from '@/types';

export const integrationService = {
  async getIntegrations(): Promise<Integration[]> {
    const response = await http.get<{ data: { integrations: Integration[] } }>('/integrations');
    return response.data.integrations;
  },

  async getIntegration(id: string): Promise<Integration> {
    const response = await http.get<{ data: { integration: Integration } }>(`/integrations/${id}`);
    return response.data.integration;
  },

  async createIntegration(data: Partial<Integration>): Promise<Integration> {
    const response = await http.post<{ data: { integration: Integration } }>('/integrations', data);
    return response.data.integration;
  },

  async updateIntegration(id: string, data: Partial<Integration>): Promise<Integration> {
    const response = await http.put<{ data: { integration: Integration } }>(`/integrations/${id}`, data);
    return response.data.integration;
  },

  async deleteIntegration(id: string): Promise<void> {
    await http.delete<void>(`/integrations/${id}`);
  },

  async testConnection(id: string): Promise<{ success: boolean }> {
    const response = await http.post<{ data: { success: boolean } }>(`/integrations/${id}/test`);
    return response.data;
  },

  async syncData(id: string): Promise<{ success: boolean }> {
    const response = await http.post<{ data: { success: boolean } }>(`/integrations/${id}/sync`);
    return response.data;
  }
}; 