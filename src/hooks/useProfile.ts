import { useProfileQuery, useUpdateProfileMutation } from '@/hooks/queries/useProfileQuery';
import { useState } from 'react';

/**
 * Combined hook that provides both UI state and server data for user profile
 */
export const useProfile = () => {
  // Queries
  const { data: profile, isLoading, error } = useProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name ?? '',
    email: profile?.email ?? '',
    bio: profile?.bio ?? '',
    avatar: profile?.avatar ?? '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
    setIsEditing(false);
  };

  return {
    // Data
    profile,
    
    // Loading states
    isLoading,
    isUpdating: updateProfileMutation.isPending,
    
    // Errors
    error: error?.message,
    updateError: updateProfileMutation.error?.message,
    
    // UI state
    isEditing,
    formData,
    
    // Actions
    setIsEditing,
    handleInputChange,
    handleSubmit,
  };
}; 