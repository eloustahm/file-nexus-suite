
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { toast } from 'sonner';
import type { PrivacySettings } from '@/types/profile';

export const usePrivacySettings = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['privacySettings'],
    queryFn: async () => {
      const profile = await profileService.getProfile();
      return profile.settings.privacy as PrivacySettings;
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (newSettings: Partial<PrivacySettings>) => 
      profileService.updatePrivacySettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacySettings'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Privacy settings updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });

  return {
    settings: settings || {
      profileVisibility: 'public' as const,
      showEmail: false,
      showPhone: false,
      allowDirectMessages: true,
      showOnlineStatus: true,
      shareAnalytics: false,
    },
    isLoading,
    updateSettings: updateSettingsMutation.mutate,
  };
};
