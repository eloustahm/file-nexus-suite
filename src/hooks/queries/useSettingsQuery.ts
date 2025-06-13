
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/services/settings';
import type { Profile } from '@/types';
import type { Integration } from '@/types/integration';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useSettingsQuery = () => {
  const queryClient = useQueryClient();

  // Get profile query
  const profileQuery = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: settingsService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get integrations query
  const integrationsQuery = useQuery({
    queryKey: [QUERY_KEYS.INTEGRATIONS],
    queryFn: settingsService.getIntegrations,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Profile>) => settingsService.updateProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      queryClient.setQueryData([QUERY_KEYS.PROFILE], updatedProfile);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      settingsService.updatePassword(data),
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTEGRATIONS] });
      toast.success('Integration updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update integration');
    },
  });

  return {
    // Server data
    profile: profileQuery.data,
    integrations: integrationsQuery.data || [],
    
    // Server state
    isLoadingProfile: profileQuery.isLoading,
    isLoadingIntegrations: integrationsQuery.isLoading,
    profileError: profileQuery.error,
    integrationsError: integrationsQuery.error,
    
    // Settings actions
    updateProfile: updateProfileMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
    updateIntegration: updateIntegrationMutation.mutate,
    refetchProfile: profileQuery.refetch,
    refetchIntegrations: integrationsQuery.refetch,
    
    // Mutation states
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    isUpdatingIntegration: updateIntegrationMutation.isPending,
  };
};
