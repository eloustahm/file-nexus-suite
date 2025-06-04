
import { create } from 'zustand';
import { authApi } from '@/services/auth';

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
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (val: boolean) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      sessionStorage.setItem('auth_attempted', 'true');
      await authApi.csrf();
      await authApi.login({ email, password });
      await get().getCurrentUser();
      sessionStorage.removeItem('auth_attempted');
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
      sessionStorage.setItem('auth_attempted', 'true');
      await authApi.register({ email, password, firstName, lastName });
      await get().getCurrentUser();
      sessionStorage.removeItem('auth_attempted');
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await authApi.logout();
      set({ user: null, isAuthenticated: false });
      sessionStorage.removeItem('auth_attempted');
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
      set({ loading: true, error: null });
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false, error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => set({ user }),
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),
  clearError: () => set({ error: null })
}));
