
import { create } from 'zustand';
import { authApi } from '@/services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      await authApi.csrf();
      await authApi.login({ email, password });
      await get().getCurrentUser();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      set({ loading: true, error: null });
      await authApi.register({ email, password, firstName, lastName });
      await get().getCurrentUser();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await authApi.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      await authApi.resetPassword(email);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getCurrentUser: async () => {
    try {
      set({ loading: true });
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false, error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
