
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import type { Profile, ProfileUpdateData } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useProfileQuery = () => {
  const profileQuery = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data: profileQuery.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    refetch: profileQuery.refetch,
  };
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ProfileUpdateData) => profileService.updateProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      queryClient.setQueryData([QUERY_KEYS.PROFILE], updatedProfile);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};
