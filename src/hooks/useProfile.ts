
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { toast } from 'sonner';
import type { Profile, ProfileUpdateData, PasswordChange } from '@/types/profile';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileUpdateData) => profileService.updateProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['profile'], updatedProfile);
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: PasswordChange) => profileService.updatePassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update password');
    },
  });

  return {
    profile: profile || null,
    displayName: profile?.name || `${profile?.firstName} ${profile?.lastName}` || 'User',
    isLoading,
    error: error?.message,
    updateProfile: updateProfileMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
  };
};
