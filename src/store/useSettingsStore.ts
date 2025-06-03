
import { create } from 'zustand';
import { settingsApi } from '@/services/api';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  phone?: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Integration {
  id: string;
  name: string;
  enabled: boolean;
  config?: any;
}

interface SettingsState {
  profile: Profile | null;
  integrations: Integration[];
  loading: boolean;
  error: string | null;
  
  // Profile actions
  fetchProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  changePassword: (passwordData: PasswordChangeData) => Promise<void>;
  
  // Integration actions
  fetchIntegrations: () => Promise<void>;
  updateIntegration: (provider: string, config: any) => Promise<void>;
  
  // Utility actions
  clearError: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  profile: null,
  integrations: [],
  loading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const profile = await settingsApi.getProfile() as Profile;
      set({ profile });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (profileData: Partial<Profile>) => {
    try {
      set({ loading: true, error: null });
      const updatedProfile = await settingsApi.updateProfile(profileData) as Profile;
      set({ profile: updatedProfile });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  changePassword: async (passwordData: PasswordChangeData) => {
    try {
      set({ loading: true, error: null });
      await settingsApi.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchIntegrations: async () => {
    try {
      set({ loading: true, error: null });
      const integrations = await settingsApi.getIntegrations() as Integration[];
      set({ integrations });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateIntegration: async (provider: string, config: any) => {
    try {
      set({ loading: true, error: null });
      await settingsApi.updateIntegration(provider, config);
      // Refresh integrations
      await get().fetchIntegrations();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
