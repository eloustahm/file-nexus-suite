
import { useTeamCollaborationQuery } from '@/hooks/queries/useTeamCollaborationQuery';
import { useState } from 'react';

/**
 * Combined hook that provides both UI state and server data for team collaboration
 */
export const useTeamCollaboration = () => {
  const teamQuery = useTeamCollaborationQuery();

  // UI state for modals and forms
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeleteMemberConfirm, setShowDeleteMemberConfirm] = useState<string | null>(null);
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
    // Server data
    members: teamQuery.members,
    settings: teamQuery.settings,
    
    // Server state
    isLoadingMembers: teamQuery.isLoadingMembers,
    isLoadingSettings: teamQuery.isLoadingSettings,
    membersError: teamQuery.membersError,
    settingsError: teamQuery.settingsError,
    
    // Team actions
    inviteMember: teamQuery.inviteMember,
    updateMemberRole: teamQuery.updateMemberRole,
    removeMember: teamQuery.removeMember,
    updateSettings: teamQuery.updateSettings,
    refetchMembers: teamQuery.refetchMembers,
    refetchSettings: teamQuery.refetchSettings,
    
    // Mutation states
    isInvitingMember: teamQuery.isInvitingMember,
    isUpdatingMemberRole: teamQuery.isUpdatingMemberRole,
    isRemovingMember: teamQuery.isRemovingMember,
    isUpdatingSettings: teamQuery.isUpdatingSettings,
    
    // UI state
    showInviteModal,
    showSettingsModal,
    showDeleteMemberConfirm,
    isEditingSettings,
    unsavedChanges,
    
    // UI actions
    setShowInviteModal,
    setShowSettingsModal,
    setShowDeleteMemberConfirm,
    setIsEditingSettings,
    setUnsavedChanges,
    reset,
  };
};
