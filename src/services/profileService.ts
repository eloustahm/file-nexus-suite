
import { http } from '@/lib/api';
import type { Profile, ProfileUpdateData, PasswordChange, ProfileActivity, ProfileStats, PrivacySettings } from '@/types/profile';

export const profileService = {
  async getProfile(): Promise<Profile> {
    return http.get<Profile>('/profile');
  },

  async updateProfile(data: ProfileUpdateData): Promise<Profile> {
    return http.put<Profile>('/profile', data);
  },

  async updatePassword(data: PasswordChange): Promise<void> {
    return http.put('/profile/password', data);
  },

  async getProfileSettings(): Promise<Profile['settings']> {
    const profile = await http.get<Profile>('/profile');
    return profile.settings;
  },

  async getProfilePreferences(): Promise<Profile['preferences']> {
    const profile = await http.get<Profile>('/profile');
    return profile.preferences;
  },

  async getSecuritySettings(): Promise<Profile['security']> {
    const profile = await http.get<Profile>('/profile');
    return profile.security;
  },

  async uploadAvatar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await http.upload<{ url: string }>('/profile/avatar', formData);
    return response.url;
  },

  async updatePreferences(preferences: Partial<Profile['preferences']>): Promise<Profile> {
    return http.patch<Profile>('/profile/preferences', { preferences });
  },

  async updateSecuritySettings(security: Partial<Profile['security']>): Promise<Profile> {
    return http.patch<Profile>('/profile/security', { security });
  },

  async getActivity(): Promise<ProfileActivity[]> {
    return http.get<ProfileActivity[]>('/profile/activity');
  },

  async getStats(): Promise<ProfileStats> {
    return http.get<ProfileStats>('/profile/stats');
  },

  async updatePrivacySettings(settings: Partial<PrivacySettings>): Promise<void> {
    return http.patch('/profile/privacy', settings);
  },
};
