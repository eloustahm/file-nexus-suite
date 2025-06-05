
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/services/auth';
import { QUERY_KEYS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import type { LoginData, RegisterData } from '@/services/auth';

/**
 * React Query hooks for authentication API
 */
export const useAuthQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get current user
  const userQuery = useQuery({
    queryKey: [QUERY_KEYS.AUTH, 'user'],
    queryFn: authApi.getCurrentUser,
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });
      toast({
        title: 'Registration successful',
        description: 'Welcome to the platform!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Logout failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast({
        title: 'Reset email sent',
        description: 'Check your email for reset instructions',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Reset email failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
    onSuccess: () => {
      toast({
        title: 'Password reset successful',
        description: 'Your password has been updated',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Password reset failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    // Data
    user: userQuery.data,
    isAuthenticated: !!userQuery.data,
    
    // Loading states
    isLoading: userQuery.isLoading,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSendingReset: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    
    // Error states
    error: userQuery.error,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    
    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    refetch: userQuery.refetch,
  };
};
