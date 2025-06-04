
import { http } from '@/lib/api';

// Re-export all domain-specific APIs
export { authApi } from './auth';
export { documentsApi } from './documents';
export { documentGenerationApi } from './documentGeneration';
export { chatApi } from './chat';
export { teamApi } from './team';
export { activityApi } from './activity';
export { notificationsApi } from './notifications';
export { foldersApi } from './folders';
export { workflowsApi } from './workflows';
export { paymentApi } from './payment';
export { settingsApi } from './settings';

// Legacy APIs - these will be removed once all components are updated
export const legacyApi = {
  // Auth APIs (use authApi instead)
  login: async (credentials: { email: string; password: string }) => {
    return http.post('/api/auth/login', credentials);
  },
  
  register: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    return http.post('/api/auth/register', data);
  },
  
  logout: async () => {
    return http.post('/api/auth/logout');
  },
  
  getCurrentUser: async () => {
    const response = await http.get<{ user: any }>('/api/auth/me');
    return response.user;
  },
  
  resetPassword: async (email: string) => {
    return http.post('/api/auth/reset-password', { email });
  },
  
  csrf: async () => {
    return http.get('/sanctum/csrf-cookie');
  },

  // Documents APIs (use documentsApi instead)
  getAll: async () => {
    return http.get('/api/documents');
  },
  
  getById: async (id: string) => {
    return http.get(`/api/documents/${id}`);
  },
  
  create: async (document: FormData) => {
    return http.upload('/api/documents', document);
  },
  
  update: async (id: string, data: any) => {
    return http.put(`/api/documents/${id}`, data);
  },
  
  delete: async (id: string) => {
    return http.delete(`/api/documents/${id}`);
  },
  
  share: async (id: string, shareData: any) => {
    return http.post(`/api/documents/${id}/share`, shareData);
  },
  
  getVersions: async (id: string) => {
    return http.get(`/api/documents/${id}/versions`);
  }
};
