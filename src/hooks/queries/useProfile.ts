import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { profileService } from '@/services/profileService';
import type { UserProfile, UserPreferences, ProfileUpdate, PasswordChange } from '@/types/profile';

// Query keys
export const profileKeys = {
  all: ['profile'] as const,
  details: () => [...profileKeys.all, 'detail'] as const,
  preferences: () => [...profileKeys.all, 'preferences'] as const,
};

// Query hooks
export const useProfileQuery = () => {
  return useQuery({
    queryKey: profileKeys.details(),
    queryFn: () => profileService.getProfile(),
  });
};

export const usePreferencesQuery = () => {
  return useQuery({
    queryKey: profileKeys.preferences(),
    queryFn: () => profileService.getPreferences(),
  });
};

// Mutation hooks
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdate) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.details() });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update profile');
      console.error('Update profile error:', error);
    },
  });
};

export const useUpdatePreferencesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserPreferences>) => profileService.updatePreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.preferences() });
      toast.success('Preferences updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update preferences');
      console.error('Update preferences error:', error);
    },
  });
};

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileService.updateAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.details() });
      toast.success('Avatar updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update avatar');
      console.error('Update avatar error:', error);
    },
  });
};

export const useDeleteAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileService.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.details() });
      toast.success('Avatar deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete avatar');
      console.error('Delete avatar error:', error);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: PasswordChange) => profileService.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error) => {
      toast.error('Failed to change password');
      console.error('Change password error:', error);
    },
  });
}; 