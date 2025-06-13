import { useState } from 'react';

type SettingsSection = 'profile' | 'security' | 'notifications' | 'integrations' | 'billing';

/**
 * Hook for managing settings UI state
 */
export const useSettingsUI = () => {
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
    // State
    activeSection,
    showPasswordModal,
    showDeleteAccountConfirm,
    showIntegrationModal,
    isEditing,
    unsavedChanges,

    // Actions
    setActiveSection,
    setShowPasswordModal,
    setShowDeleteAccountConfirm,
    setShowIntegrationModal,
    setIsEditing,
    setUnsavedChanges,
    reset,
  };
}; 