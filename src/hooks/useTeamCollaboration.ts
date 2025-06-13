import { useTeamCollaborationQuery } from '@/hooks/queries/useTeamCollaborationQuery';
import { useTeamCollaborationUI } from '@/hooks/useTeamCollaborationUI';

/**
 * Combined hook that provides both server data and UI state for team collaboration
 */
export const useTeamCollaboration = () => {
  const teamQuery = useTeamCollaborationQuery();
  const teamUI = useTeamCollaborationUI();

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
    updateSettings: teamQuery.updateSettings,
    refetchMembers: teamQuery.refetchMembers,
    refetchSettings: teamQuery.refetchSettings,
    
    // Mutation states
    isInvitingMember: teamQuery.isInvitingMember,
    isUpdatingMemberRole: teamQuery.isUpdatingMemberRole,
    isUpdatingSettings: teamQuery.isUpdatingSettings,
    
    // UI state
    showInviteModal: teamUI.showInviteModal,
    showSettingsModal: teamUI.showSettingsModal,
    showDeleteMemberConfirm: teamUI.showDeleteMemberConfirm,
    isEditingSettings: teamUI.isEditingSettings,
    unsavedChanges: teamUI.unsavedChanges,
    
    // UI actions
    setShowInviteModal: teamUI.setShowInviteModal,
    setShowSettingsModal: teamUI.setShowSettingsModal,
    setShowDeleteMemberConfirm: teamUI.setShowDeleteMemberConfirm,
    setIsEditingSettings: teamUI.setIsEditingSettings,
    setUnsavedChanges: teamUI.setUnsavedChanges,
    reset: teamUI.reset,
  };
}; 