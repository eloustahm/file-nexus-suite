import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import type { LoginCredentials, RegisterData } from '@/types';
import { toast } from 'sonner';

export const useAuthQuery = () => {
  const queryClient = useQueryClient();

  // Get current user query - simple configuration
  const userQuery = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: authService.getCurrentUser,
    retry: false, // Never retry auth calls
    staleTime: Infinity, // Cache auth result until manually invalidated
    gcTime: Infinity, // Keep in cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
      toast.success('Login successful');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
      toast.success('Registration successful');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear(); // Clear all cached data on logout
      toast.success('Logged out successfully');
    },
    onError: (error: any) => {
      // Even if logout fails, clear local state
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear();
      toast.error(error.message || 'Logout failed');
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    isAuthenticated: userQuery.data !== null && userQuery.data !== undefined,
    
    // Mutations
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    
    // Refetch - only call when explicitly needed
    refetchUser: userQuery.refetch,
  };
};
