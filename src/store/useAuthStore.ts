
import { create } from 'zustand';
import { mockAuthApi } from '@/services/mockAuth';
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
        await mockAuthApi.csrf();
        await mockAuthApi.login({ email, password });
        await get().getCurrentUser();
        // Clear the auth attempted flag after successful login
        sessionStorage.removeItem('auth_attempted');
      },
      get().setLoading,
      get().setError
    );
  },

  signUp: async (email: string, password: string, firstName: string, lastName: string) => {
    await handleAsyncAction(
      async () => {
        await mockAuthApi.register({ email, password, firstName, lastName });
        await get().getCurrentUser();
        // Clear the auth attempted flag after successful signup
        sessionStorage.removeItem('auth_attempted');
      },
      get().setLoading,
      get().setError
    );
  },

  signOut: async () => {
    await handleAsyncAction(
      async () => {
        await mockAuthApi.logout();
        set({ user: null, isAuthenticated: false });
        // Clear the auth attempted flag on logout
        sessionStorage.removeItem('auth_attempted');
      },
      get().setLoading,
      get().setError
    );
  },

  resetPassword: async (email: string) => {
    await handleAsyncAction(
      async () => {
        await mockAuthApi.resetPassword(email);
      },
      get().setLoading,
      get().setError
    );
  },

  getCurrentUser: async () => {
    await handleAsyncAction(
      async () => {
        const user = await mockAuthApi.getCurrentUser();
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
