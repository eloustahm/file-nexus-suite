import { http } from '@/lib/api';
import type { Profile, ProfileUpdateData, ProfileStats, PasswordChange, ProfileActivity } from '@/types';

export const profileService = {
  // Get user profile
  async getProfile(): Promise<Profile> {
    return http.get<Profile>('/profile');
  },

  // Update user profile
  async updateProfile(data: ProfileUpdateData): Promise<Profile> {
    return http.patch<Profile>('/profile', data);
  },

  // Get profile statistics
  async getStats(): Promise<ProfileStats> {
    return http.get<ProfileStats>('/profile/stats');
  },

  // Update profile settings
  async updateSettings(settings: Partial<Profile['settings']>): Promise<Profile> {
    return http.patch<Profile>('/profile/settings', { settings });
  },

  // Update profile preferences
  async updatePreferences(preferences: Partial<Profile['preferences']>): Promise<Profile> {
    return http.patch<Profile>('/profile/preferences', { preferences });
  },

  // Update profile security settings
  async updateSecurity(security: Partial<Profile['security']>): Promise<Profile> {
    return http.patch<Profile>('/profile/security', { security });
  },

  // Get profile activity
  async getActivity(): Promise<ProfileActivity[]> {
    return http.get<ProfileActivity[]>('/profile/activity');
  },

  // Get user preferences
  async getPreferences(): Promise<Profile['preferences']> {
    const response = await http.get<{ data: Profile['preferences'] }>('/profile/preferences');
    return response.data;
  },

  // Update user avatar
  async updateAvatar(file: File): Promise<Profile> {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await http.post<{ data: Profile }>('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete user avatar
  async deleteAvatar(): Promise<Profile> {
    const response = await http.delete<{ data: Profile }>('/profile/avatar');
    return response.data;
  },

  // Change password
  async changePassword(data: PasswordChange): Promise<void> {
    await http.post<void>('/profile/password', data);
  },
}; 