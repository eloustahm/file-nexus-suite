
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi, type Profile } from '@/services/settings';
import { toast } from 'sonner';

export const useSettingsQuery = () => {
  const queryClient = useQueryClient();

  // Get profile query
  const profileQuery = useQuery({
    queryKey: ['settings', 'profile'],
    queryFn: settingsApi.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get integrations query
  const integrationsQuery = useQuery({
    queryKey: ['settings', 'integrations'],
    queryFn: settingsApi.getIntegrations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Profile>) => settingsApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) => 
      settingsApi.updatePassword(data),
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
      settingsApi.updateIntegration(provider, config),
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

    // Mutations
    updateProfile: updateProfileMutation.mutateAsync,
    updatePassword: updatePasswordMutation.mutateAsync,
    updateIntegration: updateIntegrationMutation.mutateAsync,

    // Loading states
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    isUpdatingIntegration: updateIntegrationMutation.isPending,

    // Refetch
    refetchProfile: profileQuery.refetch,
    refetchIntegrations: integrationsQuery.refetch,
  };
};
