import { useState } from 'react';
import { useAuthQuery } from '@/hooks/queries/useAuthQuery';

/**
 * Combined hook that provides both UI state and server data for authentication
 */
export const useAuth = () => {
  const authQuery = useAuthQuery();

  // Form UI state
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  return {
    // Server data from React Query
    user: authQuery.user,
    isAuthenticated: authQuery.isAuthenticated,
    
    // Loading states
    isLoading: authQuery.isLoading || isLoading,
    error: authQuery.error?.message || error,
    
    // Auth actions
    login: authQuery.login,
    register: authQuery.register,
    logout: authQuery.logout,
    refetchUser: authQuery.refetchUser,
    
    // Mutation loading states
    isLoggingIn: authQuery.isLoggingIn,
    isRegistering: authQuery.isRegistering,
    isLoggingOut: authQuery.isLoggingOut,
    
    // UI state
    showLoginForm,
    showRegisterForm,
    rememberMe,
    
    // UI actions
    setShowLoginForm,
    setShowRegisterForm,
    setRememberMe,
    setIsLoading,
    setError,
    clearError,
  };
};
