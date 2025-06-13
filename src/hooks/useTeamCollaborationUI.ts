import { useState } from 'react';

/**
 * Hook for managing team collaboration UI state
 */
export const useTeamCollaborationUI = () => {
  // Modal and dialog UI state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeleteMemberConfirm, setShowDeleteMemberConfirm] = useState<string | null>(null);
  
  // Form states
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const reset = () => {
    setShowInviteModal(false);
    setShowSettingsModal(false);
    setShowDeleteMemberConfirm(null);
    setIsEditingSettings(false);
    setUnsavedChanges(false);
  };

  return {
    // State
    showInviteModal,
    showSettingsModal,
    showDeleteMemberConfirm,
    isEditingSettings,
    unsavedChanges,

    // Actions
    setShowInviteModal,
    setShowSettingsModal,
    setShowDeleteMemberConfirm,
    setIsEditingSettings,
    setUnsavedChanges,
    reset,
  };
}; 