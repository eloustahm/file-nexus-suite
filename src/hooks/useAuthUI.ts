import { useState } from 'react';

/**
 * Hook for managing auth UI state
 */
export const useAuthUI = () => {
  // Form UI state
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  return {
    // State
    showLoginForm,
    showRegisterForm,
    rememberMe,
    isLoading,
    error,

    // Actions
    setShowLoginForm,
    setShowRegisterForm,
    setRememberMe,
    setIsLoading,
    setError,
    clearError,
  };
}; 