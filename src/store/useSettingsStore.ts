
import { create } from 'zustand';
import { settingsApi } from '@/services/api';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  timezone: string;
  language: string;
}

interface Integration {
  provider: string;
  enabled: boolean;
  config: any;
}

interface SettingsState {
  profile: UserProfile | null;
  integrations: Integration[];
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  fetchIntegrations: () => Promise<void>;
  updateIntegration: (provider: string, config: any) => Promise<void>;
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
      const profile = await settingsApi.getProfile() as UserProfile;
      set({ profile });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (data: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      const updatedProfile = await settingsApi.updateProfile(data) as UserProfile;
      set({ profile: updatedProfile });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    try {
      set({ loading: true, error: null });
      await settingsApi.updatePassword({ currentPassword, newPassword });
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
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
