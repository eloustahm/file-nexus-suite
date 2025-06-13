import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PRIVACY_SETTINGS, type PrivacySetting } from '@/constants/privacy';
import { settingsService } from '@/services/settings';
import type { Profile } from '@/types';

// Mock API function - replace with actual API call
const fetchPrivacySettings = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would come from the API
  return PRIVACY_SETTINGS.map(setting => ({
    ...setting,
    enabled: setting.defaultValue
  }));
};

export const usePrivacySettings = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: settingsService.getProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: settingsService.updateProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['profile'], updatedProfile);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: settingsService.updatePassword,
  });

  const { data: settings, isLoading: settingsLoading, error } = useQuery({
    queryKey: ['privacy-settings'],
    queryFn: fetchPrivacySettings
  });

  const updateSetting = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, enabled };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['privacy-settings'], (old: any) =>
        old.map((setting: PrivacySetting) =>
          setting.id === data.id ? { ...setting, enabled: data.enabled } : setting
        )
      );
      toast.success('Privacy setting updated successfully');
    },
    onError: () => {
      toast.error('Failed to update privacy setting');
    }
  });

  const getSettingsByCategory = (category: string) => {
    return settings?.filter(setting => setting.category === category) ?? [];
  };

  const getSetting = (id: string) => {
    return settings?.find(setting => setting.id === id);
  };

  return {
    profile,
    isLoading,
    updateProfile: updateProfileMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    settings: settings ?? [],
    settingsLoading,
    error,
    updateSetting,
    getSettingsByCategory,
    getSetting
  };
}; 