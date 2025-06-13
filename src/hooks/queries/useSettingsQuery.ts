import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/services/settings';
import type { Profile } from '@/types';
import { toast } from 'sonner';

export const useSettingsQuery = () => {
  const queryClient = useQueryClient();

  // Get profile query
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: settingsService.getProfile,
  });

  // Get integrations query
  const integrationsQuery = useQuery({
    queryKey: ['settings', 'integrations'],
    queryFn: settingsService.getIntegrations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: settingsService.updateProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['profile'], updatedProfile);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: settingsService.updatePassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update password');
    },
  });

  // Update integration mutation
  const updateIntegrationMutation = useMutation({
    mutationFn: ({ provider, config }: { provider: string; config: any }) => 
      settingsService.updateIntegration(provider, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'integrations'] });
      toast.success('Integration updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update integration');
    },
  });

  return {
    // Data
    profile: profileQuery.data,
    integrations: integrationsQuery.data || [],

    // Loading states
    isLoadingProfile: profileQuery.isLoading,
    isLoadingIntegrations: integrationsQuery.isLoading,

    // Errors
    profileError: profileQuery.error,
    integrationsError: integrationsQuery.error,

    // Actions
    updateProfile: updateProfileMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
    updateIntegration: updateIntegrationMutation.mutate,

    // Mutation states
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    isUpdatingIntegration: updateIntegrationMutation.isPending,

    // Refetch
    refetchProfile: profileQuery.refetch,
    refetchIntegrations: integrationsQuery.refetch,
  };
};
