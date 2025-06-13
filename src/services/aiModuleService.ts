import { http } from '@/lib/api';
import type { AIModule, AIModuleResponse, AIModuleListResponse, AIModuleUpdateData } from '@/types/ai-module';

export const aiModuleService = {
  // Get all AI modules
  getModules: async () => {
    return http.get<AIModuleListResponse>('/ai/modules');
  },

  // Get a specific AI module by ID
  getModule: async (id: string) => {
    const response = await http.get<AIModuleResponse>(`/ai/modules/${id}`);
    return response.module;
  },

  // Update module status
  updateModule: async (id: string, data: AIModuleUpdateData) => {
    return http.patch<AIModuleResponse>(`/ai/modules/${id}`, data);
  },

  // Get module usage statistics
  getModuleStats: async (id: string) => {
    const response = await http.get<{ stats: AIModule['stats'] }>(`/ai/modules/${id}/stats`);
    return response.stats;
  },

  // Get module features
  getModuleFeatures: async (id: string) => {
    const response = await http.get<{ features: AIModule['features'] }>(`/ai/modules/${id}/features`);
    return response.features;
  },

  // Test module connection
  testModuleConnection: async (id: string) => {
    return http.post<{ success: boolean; message: string }>(`/ai/modules/${id}/test`);
  },

  // Get module logs
  getModuleLogs: async (id: string, params: { page?: number; limit?: number }) => {
    const response = await http.get<{ logs: Array<{ timestamp: string; message: string; level: string }> }>(
      `/ai/modules/${id}/logs`,
      { params }
    );
    return response.logs;
  },
}; 