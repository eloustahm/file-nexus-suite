
import { create } from 'zustand';
import { authApi } from '@/services/api';
import { createBaseActions, handleAsyncAction, BaseStoreState, BaseStoreActions } from '@/lib/storeUtils';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthState extends BaseStoreState, BaseStoreActions {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Base actions
  ...createBaseActions(set),

  signIn: async (email: string, password: string) => {
    await handleAsyncAction(
      async () => {
        await authApi.csrf();
        await authApi.login({ email, password });
        await get().getCurrentUser();
      },
      get().setLoading,
      get().setError
    );
  },

  signUp: async (email: string, password: string, firstName: string, lastName: string) => {
    await handleAsyncAction(
      async () => {
        await authApi.register({ email, password, firstName, lastName });
        await get().getCurrentUser();
      },
      get().setLoading,
      get().setError
    );
  },

  signOut: async () => {
    await handleAsyncAction(
      async () => {
        await authApi.logout();
        set({ user: null, isAuthenticated: false });
      },
      get().setLoading,
      get().setError
    );
  },

  resetPassword: async (email: string) => {
    await handleAsyncAction(
      async () => {
        await authApi.resetPassword(email);
      },
      get().setLoading,
      get().setError
    );
  },

  getCurrentUser: async () => {
    await handleAsyncAction(
      async () => {
        const user = await authApi.getCurrentUser();
        set({ user, isAuthenticated: true });
        return user;
      },
      get().setLoading,
      (error) => {
        set({ user: null, isAuthenticated: false, error });
      }
    );
  }
}));
