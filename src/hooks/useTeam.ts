import { useTeamQuery } from '@/hooks/queries/useTeamQuery';
import { useTeamUI } from '@/hooks/useTeamUI';
import { useMemo } from 'react';

/**
 * Combined hook that provides both UI state and server data for team management
 */
export const useTeam = () => {
  const teamQuery = useTeamQuery();
  const teamUI = useTeamUI();

  // Apply client-side filtering based on UI state
  const filteredMembers = useMemo(() => {
    let filtered = teamQuery.members;

    // Apply role filter
    if (teamUI.roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === teamUI.roleFilter);
    }

    // Apply search filter
    if (teamUI.memberFilter) {
      const query = teamUI.memberFilter.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [teamQuery.members, teamUI.roleFilter, teamUI.memberFilter]);

  // Apply client-side filtering for chat rooms
  const filteredChatRooms = useMemo(() => {
    let filtered = teamQuery.chatRooms;

    if (teamUI.roomFilter) {
      const query = teamUI.roomFilter.toLowerCase();
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(query) ||
        (room.description && room.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [teamQuery.chatRooms, teamUI.roomFilter]);

  return {
    // Server data with client-side filtering
    members: teamQuery.members,
    filteredMembers,
    chatRooms: teamQuery.chatRooms,
    filteredChatRooms,
    
    // Server state
    isLoadingMembers: teamQuery.isLoadingMembers,
    isLoadingChatRooms: teamQuery.isLoadingChatRooms,
    membersError: teamQuery.membersError?.message,
    chatRoomsError: teamQuery.chatRoomsError?.message,
    
    // Team actions
    inviteMember: teamQuery.inviteMember,
    updateMemberRole: teamQuery.updateMemberRole,
    removeMember: teamQuery.removeMember,
    createChatRoom: teamQuery.createChatRoom,
    refetchMembers: teamQuery.refetchMembers,
    refetchChatRooms: teamQuery.refetchChatRooms,
    
    // Mutation states
    isInviting: teamQuery.isInvitingMember,
    isUpdatingRole: teamQuery.isUpdatingRole,
    isRemoving: teamQuery.isRemovingMember,
    isCreatingRoom: teamQuery.isCreatingChatRoom,
    
    // UI state
    showInviteModal: teamUI.showInviteModal,
    showRemoveConfirm: teamUI.showRemoveConfirm,
    showRoleUpdateModal: teamUI.showRoleUpdateModal,
    showCreateRoomModal: teamUI.showCreateRoomModal,
    memberFilter: teamUI.memberFilter,
    selectedMemberIds: teamUI.selectedMemberIds,
    roleFilter: teamUI.roleFilter,
    selectedRoomId: teamUI.selectedRoomId,
    roomFilter: teamUI.roomFilter,
    
    // UI actions
    setShowInviteModal: teamUI.setShowInviteModal,
    setShowRemoveConfirm: teamUI.setShowRemoveConfirm,
    setShowRoleUpdateModal: teamUI.setShowRoleUpdateModal,
    setShowCreateRoomModal: teamUI.setShowCreateRoomModal,
    setMemberFilter: teamUI.setMemberFilter,
    setSelectedMembers: teamUI.setSelectedMemberIds,
    toggleMemberSelection: teamUI.toggleMemberSelection,
    setRoleFilter: teamUI.setRoleFilter,
    setSelectedRoom: teamUI.setSelectedRoomId,
    setRoomFilter: teamUI.setRoomFilter,
    clearFilters: teamUI.clearFilters,
    clearSelections: teamUI.clearSelections,
  };
};
