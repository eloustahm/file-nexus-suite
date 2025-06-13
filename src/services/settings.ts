import { http } from '@/lib/api';
import type { Profile } from '@/types';
import type { Integration } from '@/types/integration';

export const settingsService = {
  async getProfile(): Promise<Profile> {
    return http.get<Profile>('/settings/profile');
  },

  async updateProfile(profileData: Partial<Profile>): Promise<Profile> {
    return http.patch<Profile>('/settings/profile', profileData);
  },

  async updatePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<void> {
    await http.patch<void>('/settings/password', passwordData);
  },

  async getIntegrations(): Promise<Integration[]> {
    return http.get<Integration[]>('/settings/integrations');
  },

  async updateIntegration(provider: string, config: any): Promise<void> {
    await http.patch<void>(`/settings/integrations/${provider}`, config);
  }
};
