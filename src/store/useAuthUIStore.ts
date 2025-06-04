
import { create } from 'zustand';

/**
 * Auth UI Store - Manages only UI state for authentication forms
 * Server data (user, tokens, etc.) is handled by React Query in useAuth hook
 */
interface AuthUIState {
  // Form UI state
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
  reset: () => void;
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
  reset: () => set({ 
    isLoading: false, 
    error: null, 
    showLoginForm: false, 
    showRegisterForm: false, 
    rememberMe: false 
  }),
}));
