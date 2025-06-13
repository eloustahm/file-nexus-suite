import { useTeamQuery } from '@/hooks/queries/useTeamQuery';
import { useTeamCollaborationQuery } from '@/hooks/queries/useTeamCollaborationQuery';
import { useState, useMemo } from 'react';

type RoleFilter = 'all' | 'admin' | 'editor' | 'viewer';

/**
 * Combined hook that provides both UI state and server data for team management
 */
export const useTeam = () => {
  const teamQuery = useTeamQuery();
  const collaborationQuery = useTeamCollaborationQuery();

  // Modal and dialog UI state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  const [showRoleUpdateModal, setShowRoleUpdateModal] = useState<string | null>(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // UI filters and selection
  const [memberFilter, setMemberFilter] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  
  // Chat room UI
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [roomFilter, setRoomFilter] = useState('');

  // Settings UI
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Apply client-side filtering based on UI state
  const filteredMembers = useMemo(() => {
    let filtered = teamQuery.members;

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    // Apply search filter
    if (memberFilter) {
      const query = memberFilter.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [teamQuery.members, roleFilter, memberFilter]);

  // Apply client-side filtering for chat rooms
  const filteredRooms = useMemo(() => {
    let filtered = teamQuery.rooms;

    if (roomFilter) {
      const query = roomFilter.toLowerCase();
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(query) ||
        (room.description && room.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [teamQuery.rooms, roomFilter]);

  const toggleMemberSelection = (id: string) => {
    setSelectedMemberIds(prev => {
      const isSelected = prev.includes(id);
      return isSelected
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id];
    });
  };

  const clearFilters = () => {
    setMemberFilter('');
    setRoleFilter('all');
    setRoomFilter('');
  };

  const clearSelections = () => {
    setSelectedMemberIds([]);
    setSelectedRoomId(null);
  };

  const reset = () => {
    setShowInviteModal(false);
    setShowSettingsModal(false);
    setShowRemoveConfirm(null);
    setShowRoleUpdateModal(null);
    setShowCreateRoomModal(false);
    setIsEditingSettings(false);
    setUnsavedChanges(false);
    clearFilters();
    clearSelections();
  };

  // Helper function to get error message
  const getErrorMessage = (error: Error | string | null | undefined): string | undefined => {
    if (!error) return undefined;
    if (typeof error === 'string') return error;
    return error.message;
  };

  return {
    // Server data with client-side filtering
    members: teamQuery.members,
    filteredMembers,
    rooms: teamQuery.rooms,
    filteredRooms,
    settings: collaborationQuery.settings,
    
    // Server state
    isLoadingMembers: teamQuery.isLoadingMembers || collaborationQuery.isLoadingMembers,
    isLoadingRooms: teamQuery.isLoadingRooms,
    isLoadingSettings: collaborationQuery.isLoadingSettings,
    membersError: getErrorMessage(teamQuery.membersError) || getErrorMessage(collaborationQuery.membersError),
    roomsError: getErrorMessage(teamQuery.roomsError),
    settingsError: getErrorMessage(collaborationQuery.settingsError),
    
    // Team actions
    inviteMember: teamQuery.inviteMember,
    updateMemberRole: teamQuery.updateMemberRole,
    removeMember: teamQuery.removeMember,
    createChatRoom: teamQuery.createChatRoom,
    updateSettings: collaborationQuery.updateSettings,
    refetchMembers: teamQuery.refetchMembers,
    refetchRooms: teamQuery.refetchRooms,
    refetchSettings: collaborationQuery.refetchSettings,
    
    // Mutation states
    isInviting: teamQuery.isInvitingMember,
    isUpdatingMemberRole: teamQuery.isUpdatingMemberRole,
    isRemoving: teamQuery.isRemovingMember,
    isCreatingChatRoom: teamQuery.isCreatingChatRoom,
    isUpdatingSettings: collaborationQuery.isUpdatingSettings,
    
    // UI state
    showInviteModal,
    showRemoveConfirm,
    showRoleUpdateModal,
    showCreateRoomModal,
    showSettingsModal,
    memberFilter,
    selectedMemberIds,
    roleFilter,
    selectedRoomId,
    roomFilter,
    isEditingSettings,
    unsavedChanges,
    
    // UI actions
    setShowInviteModal,
    setShowRemoveConfirm,
    setShowRoleUpdateModal,
    setShowCreateRoomModal,
    setShowSettingsModal,
    setMemberFilter,
    setSelectedMemberIds,
    toggleMemberSelection,
    setRoleFilter,
    setSelectedRoomId,
    setRoomFilter,
    setIsEditingSettings,
    setUnsavedChanges,
    clearFilters,
    clearSelections,
    reset,
  };
};
