
import { http } from '@/lib/api';
import type { AIModule, AIModuleUpdateData, AIModuleTestResult } from '@/types/ai-module';

export const aiModulesService = {
  async getModules(): Promise<AIModule[]> {
    return http.get<AIModule[]>('/ai-modules');
  },

  async getModule(id: string): Promise<AIModule> {
    return http.get<AIModule>(`/ai-modules/${id}`);
  },

  async updateModule(id: string, data: AIModuleUpdateData): Promise<AIModule> {
    return http.put<AIModule>(`/ai-modules/${id}`, data);
  },

  async testModule(id: string): Promise<AIModuleTestResult> {
    return http.post<AIModuleTestResult>(`/ai-modules/${id}/test`);
  },

  async getModuleStats(id: string): Promise<any> {
    return http.get(`/ai-modules/${id}/stats`);
  },
};
