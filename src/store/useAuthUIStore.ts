
import { create } from 'zustand';

/**
 * Auth UI Store - Manages only UI state for authentication interface
 */
interface AuthUIState {
  // Form UI state
  showLoginForm: boolean;
  showRegisterForm: boolean;
  rememberMe: boolean;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setShowLoginForm: (show: boolean) => void;
  setShowRegisterForm: (show: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
  showLoginForm: false,
  showRegisterForm: false,
  rememberMe: false,
  isLoading: false,
  error: null,

  setShowLoginForm: (show) => set({ showLoginForm: show }),
  setShowRegisterForm: (show) => set({ showRegisterForm: show }),
  setRememberMe: (remember) => set({ rememberMe: remember }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
