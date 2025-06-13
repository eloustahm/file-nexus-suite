import { useSettingsQuery } from '@/hooks/queries/useSettingsQuery';
import { useSettingsUI } from '@/hooks/useSettingsUI';

/**
 * Combined hook that provides both UI state and server data for settings
 */
export const useSettings = () => {
  const settingsQuery = useSettingsQuery();
  const settingsUI = useSettingsUI();

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
    activeSection: settingsUI.activeSection,
    showPasswordModal: settingsUI.showPasswordModal,
    showDeleteAccountConfirm: settingsUI.showDeleteAccountConfirm,
    showIntegrationModal: settingsUI.showIntegrationModal,
    isEditing: settingsUI.isEditing,
    unsavedChanges: settingsUI.unsavedChanges,
    
    // UI actions
    setActiveSection: settingsUI.setActiveSection,
    setShowPasswordModal: settingsUI.setShowPasswordModal,
    setShowDeleteAccountConfirm: settingsUI.setShowDeleteAccountConfirm,
    setShowIntegrationModal: settingsUI.setShowIntegrationModal,
    setIsEditing: settingsUI.setIsEditing,
    setUnsavedChanges: settingsUI.setUnsavedChanges,
    reset: settingsUI.reset,
  };
};
