import { useState } from 'react';
import { useSettingsQuery } from '@/hooks/queries/useSettingsQuery';

type SettingsSection = 'profile' | 'security' | 'notifications' | 'integrations' | 'billing';

/**
 * Combined hook that provides both UI state and server data for settings
 */
export const useSettings = () => {
  const settingsQuery = useSettingsQuery();

  // Active section/tab
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  
  // Modal and dialog UI state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState<string | null>(null);
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const reset = () => {
    setActiveSection('profile');
    setShowPasswordModal(false);
    setShowDeleteAccountConfirm(false);
    setShowIntegrationModal(null);
    setIsEditing(false);
    setUnsavedChanges(false);
  };

  return {
    // Server data
    profile: settingsQuery.profile,
    integrations: settingsQuery.integrations,
    
    // Server state
    isLoadingProfile: settingsQuery.isLoadingProfile,
    isLoadingIntegrations: settingsQuery.isLoadingIntegrations,
    profileError: settingsQuery.profileError?.message,
    integrationsError: settingsQuery.integrationsError?.message,
    
    // Settings actions
    updateProfile: settingsQuery.updateProfile,
    updatePassword: settingsQuery.updatePassword,
    updateIntegration: settingsQuery.updateIntegration,
    refetchProfile: settingsQuery.refetchProfile,
    refetchIntegrations: settingsQuery.refetchIntegrations,
    
    // Mutation states
    isUpdatingProfile: settingsQuery.isUpdatingProfile,
    isUpdatingPassword: settingsQuery.isUpdatingPassword,
    isUpdatingIntegration: settingsQuery.isUpdatingIntegration,
    
    // UI state
    activeSection,
    showPasswordModal,
    showDeleteAccountConfirm,
    showIntegrationModal,
    isEditing,
    unsavedChanges,
    
    // UI actions
    setActiveSection,
    setShowPasswordModal,
    setShowDeleteAccountConfirm,
    setShowIntegrationModal,
    setIsEditing,
    setUnsavedChanges,
    reset,
  };
};
