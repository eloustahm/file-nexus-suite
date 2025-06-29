
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'team';
  showEmail: boolean;
  showPhone: boolean;
  dataCollection: boolean;
  analytics: boolean;
  marketing: boolean;
  thirdPartySharing: boolean;
}

export const usePrivacySettings = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for now
  const { data: settings } = useQuery({
    queryKey: ['privacySettings'],
    queryFn: async (): Promise<PrivacySettings> => ({
      profileVisibility: 'private',
      showEmail: false,
      showPhone: false,
      dataCollection: true,
      analytics: false,
      marketing: false,
      thirdPartySharing: false,
    }),
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<PrivacySettings>) => {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...settings, ...newSettings };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacySettings'] });
      toast.success('Privacy settings updated successfully');
      setIsLoading(false);
    },
    onError: () => {
      toast.error('Failed to update privacy settings');
      setIsLoading(false);
    },
  });

  const updateSettings = (newSettings: Partial<PrivacySettings>) => {
    updateSettingsMutation.mutate(newSettings);
  };

  return {
    settings: settings || {} as PrivacySettings,
    isLoading,
    updateSettings,
  };
};
