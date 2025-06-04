import { http } from '@/lib/api';

// Auth APIs
export const authApi = {
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
  }
};

// Documents APIs
export const documentsApi = {
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

// Document Generation APIs
export const documentGenerationApi = {
  getTemplates: async () => {
    return http.get('/api/document-generation/templates');
  },
  
  getGeneratedDocuments: async () => {
    return http.get('/api/document-generation/documents');
  },
  
  getDocument: async (documentId: string) => {
    return http.get(`/api/document-generation/documents/${documentId}`);
  },
  
  generateDocument: async (data: any) => {
    return http.post('/api/document-generation/generate', data);
  },
  
  regenerateDocument: async (documentId: string, data: any) => {
    return http.put(`/api/document-generation/documents/${documentId}/regenerate`, data);
  },
  
  selectDocument: async (documentId: string) => {
    return http.patch(`/api/document-generation/documents/${documentId}/select`);
  },
  
  deleteDocument: async (documentId: string) => {
    return http.delete(`/api/document-generation/documents/${documentId}`);
  },
  
  downloadDocument: async (documentId: string) => {
    return http.get(`/api/document-generation/documents/${documentId}/download`, {
      responseType: 'blob'
    });
  }
};

// Folders APIs
export const foldersApi = {
  getAll: async () => {
    return http.get('/api/folders');
  },
  
  create: async (folderData: { name: string; parentId?: string }) => {
    return http.post('/api/folders', folderData);
  },
  
  update: async (id: string, data: any) => {
    return http.put(`/api/folders/${id}`, data);
  },
  
  delete: async (id: string) => {
    return http.delete(`/api/folders/${id}`);
  },
  
  getDocuments: async (id: string) => {
    return http.get(`/api/folders/${id}/documents`);
  }
};

// Workflows APIs
export const workflowsApi = {
  getAll: async () => {
    return http.get('/api/workflows');
  },
  
  getById: async (id: string) => {
    return http.get(`/api/workflows/${id}`);
  },
  
  create: async (workflowData: any) => {
    return http.post('/api/workflows', workflowData);
  },
  
  update: async (id: string, data: any) => {
    return http.put(`/api/workflows/${id}`, data);
  },
  
  delete: async (id: string) => {
    return http.delete(`/api/workflows/${id}`);
  },
  
  execute: async (id: string, documentId: string) => {
    return http.post(`/api/workflows/${id}/execute`, { documentId });
  }
};

// Team APIs
export const teamApi = {
  getMembers: async () => {
    return http.get('/api/team/members');
  },
  
  inviteMember: async (inviteData: { email: string; role: string }) => {
    return http.post('/api/team/invite', inviteData);
  },
  
  updateMemberRole: async (memberId: string, role: string) => {
    return http.put(`/api/team/members/${memberId}`, { role });
  },
  
  removeMember: async (memberId: string) => {
    return http.delete(`/api/team/members/${memberId}`);
  }
};

// AI APIs
export const aiApi = {
  chatWithDocument: async (documentId: string, message: string) => {
    return http.post('/api/ai/chat', { documentId, message });
  },
  
  summarizeDocument: async (documentId: string) => {
    return http.post(`/api/ai/summarize/${documentId}`);
  },
  
  extractData: async (documentId: string, fields: string[]) => {
    return http.post(`/api/ai/extract/${documentId}`, { fields });
  },
  
  generateDocument: async (data: { templateId: string; fields: any; agentId?: string }) => {
    return http.post('/api/ai/generate', data);
  },
  
  getTemplates: async () => {
    return http.get('/api/ai/templates');
  }
};

// Activity APIs
export const activityApi = {
  getLogs: async (filters?: any) => {
    return http.get('/api/activity', { params: filters });
  },
  
  getDocumentActivity: async (documentId: string) => {
    return http.get(`/api/activity/documents/${documentId}`);
  }
};

// Payment APIs
export const paymentApi = {
  getPlans: async () => {
    return http.get('/api/payment/plans');
  },
  
  createSubscription: async (planId: string) => {
    return http.post('/api/payment/subscribe', { planId });
  },
  
  cancelSubscription: async () => {
    return http.post('/api/payment/cancel');
  },
  
  getUsage: async () => {
    return http.get('/api/payment/usage');
  }
};

// Settings APIs
export const settingsApi = {
  getProfile: async () => {
    return http.get('/api/settings/profile');
  },
  
  updateProfile: async (profileData: any) => {
    return http.put('/api/settings/profile', profileData);
  },
  
  updatePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    return http.put('/api/settings/password', passwordData);
  },
  
  getIntegrations: async () => {
    return http.get('/api/settings/integrations');
  },
  
  updateIntegration: async (provider: string, config: any) => {
    return http.put(`/api/settings/integrations/${provider}`, config);
  }
};
