import { useAuthQuery } from '@/hooks/queries/useAuthQuery';
import { useAuthUI } from '@/hooks/useAuthUI';

/**
 * Combined hook that provides both UI state and server data for authentication
 */
export const useAuth = () => {
  const authQuery = useAuthQuery();
  const authUI = useAuthUI();

  return {
    // Server data from React Query
    user: authQuery.user,
    isAuthenticated: authQuery.isAuthenticated,
    
    // Simple loading state - only true during initial load
    isLoading: authQuery.isLoading,
    error: authQuery.error?.message || authUI.error,
    
    // Auth actions
    login: authQuery.login,
    register: authQuery.register,
    logout: authQuery.logout,
    refetchUser: authQuery.refetchUser,
    
    // Mutation loading states
    isLoggingIn: authQuery.isLoggingIn,
    isRegistering: authQuery.isRegistering,
    isLoggingOut: authQuery.isLoggingOut,
    
    // UI state and actions
    showLoginForm: authUI.showLoginForm,
    showRegisterForm: authUI.showRegisterForm,
    rememberMe: authUI.rememberMe,
    setShowLoginForm: authUI.setShowLoginForm,
    setShowRegisterForm: authUI.setShowRegisterForm,
    setRememberMe: authUI.setRememberMe,
    
    // UI actions
    setLoading: authUI.setIsLoading,
    setError: authUI.setError,
    clearError: authUI.clearError,
  };
};
