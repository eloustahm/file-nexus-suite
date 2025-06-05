
import { http } from '@/lib/api';

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  timezone: string;
  language: string;
  phoneNumber?: string;
  company?: string;
  jobTitle?: string;
  bio?: string;
}

export interface Integration {
  id: string;
  provider: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config: Record<string, any>;
}

/**
 * Settings API service
 */
export const settingsApi = {
  // Get user profile
  getProfile: async (): Promise<Profile> => {
    console.log('Fetching user profile');
    return http.get<Profile>('/api/settings/profile');
  },

  // Update user profile
  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    console.log('Updating user profile:', data);
    return http.put<Profile>('/api/settings/profile', data);
  },

  // Update password
  updatePassword: async (data: { currentPassword: string; newPassword: string }) => {
    console.log('Updating user password');
    return http.put('/api/settings/password', data);
  },

  // Get integrations
  getIntegrations: async (): Promise<Integration[]> => {
    console.log('Fetching integrations');
    return http.get<Integration[]>('/api/settings/integrations');
  },

  // Update integration
  updateIntegration: async (provider: string, config: any): Promise<Integration> => {
    console.log('Updating integration:', provider, config);
    return http.put<Integration>(`/api/settings/integrations/${provider}`, { config });
  }
};
