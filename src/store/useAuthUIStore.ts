
import { create } from 'zustand';

interface AuthUIState {
  // UI state only - no server data
  isLoading: boolean;
  error: string | null;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  rememberMe: boolean;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowLoginForm: (show: boolean) => void;
  setShowRegisterForm: (show: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  clearError: () => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
  isLoading: false,
  error: null,
  showLoginForm: false,
  showRegisterForm: false,
  rememberMe: false,

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setShowLoginForm: (show) => set({ showLoginForm: show }),
  setShowRegisterForm: (show) => set({ showRegisterForm: show }),
  setRememberMe: (remember) => set({ rememberMe: remember }),
  clearError: () => set({ error: null }),
}));
