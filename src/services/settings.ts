
import { http } from '@/lib/api';

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Integration {
  id: string;
  name: string;
  enabled: boolean;
  config?: any;
}

/**
 * Settings API service
 */
export const settingsApi = {
  // Get user profile
  getProfile: async (): Promise<Profile> => {
    return http.get<Profile>('/api/settings/profile');
  },
  
  // Update user profile
  updateProfile: async (profileData: Partial<Profile>): Promise<Profile> => {
    return http.put<Profile>('/api/settings/profile', profileData);
  },
  
  // Update password
  updatePassword: async (passwordData: { currentPassword: string; newPassword: string }): Promise<void> => {
    return http.put<void>('/api/settings/password', passwordData);
  },
  
  // Get integrations
  getIntegrations: async (): Promise<Integration[]> => {
    return http.get<Integration[]>('/api/settings/integrations');
  },
  
  // Update integration
  updateIntegration: async (provider: string, config: any): Promise<void> => {
    return http.put<void>(`/api/settings/integrations/${provider}`, config);
  }
};
