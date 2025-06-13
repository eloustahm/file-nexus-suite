import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/services/settings';
import type { Profile } from '@/types';
import { toast } from 'sonner';
import { PRIVACY_SETTINGS, type PrivacySetting } from '@/constants/privacy';

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

  // Get privacy settings query
  const privacySettingsQuery = useQuery({
    queryKey: ['settings', 'privacy'],
    queryFn: settingsService.getPrivacySettings,
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

  // Update privacy setting mutation
  const updatePrivacySettingMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      settingsService.updatePrivacySetting(id, enabled),
    onSuccess: (data) => {
      queryClient.setQueryData(['settings', 'privacy'], (old: PrivacySetting[] = []) =>
        old.map(setting =>
          setting.id === data.id ? { ...setting, enabled: data.enabled } : setting
        )
      );
      toast.success('Privacy setting updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update privacy setting');
    },
  });

  // Utility functions for privacy settings
  const getSettingsByCategory = (category: string) => {
    return privacySettingsQuery.data?.filter(setting => setting.category === category) ?? [];
  };

  const getSetting = (id: string) => {
    return privacySettingsQuery.data?.find(setting => setting.id === id);
  };

  return {
    // Data
    profile: profileQuery.data,
    integrations: integrationsQuery.data || [],
    privacySettings: privacySettingsQuery.data || [],

    // Loading states
    isLoadingProfile: profileQuery.isLoading,
    isLoadingIntegrations: integrationsQuery.isLoading,
    isLoadingPrivacySettings: privacySettingsQuery.isLoading,

    // Errors
    profileError: profileQuery.error,
    integrationsError: integrationsQuery.error,
    privacySettingsError: privacySettingsQuery.error,

    // Actions
    updateProfile: updateProfileMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
    updateIntegration: updateIntegrationMutation.mutate,
    updatePrivacySetting: updatePrivacySettingMutation.mutate,

    // Mutation states
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    isUpdatingIntegration: updateIntegrationMutation.isPending,
    isUpdatingPrivacySetting: updatePrivacySettingMutation.isPending,

    // Refetch
    refetchProfile: profileQuery.refetch,
    refetchIntegrations: integrationsQuery.refetch,
    refetchPrivacySettings: privacySettingsQuery.refetch,

    // Privacy settings utilities
    getSettingsByCategory,
    getSetting,
  };
};
