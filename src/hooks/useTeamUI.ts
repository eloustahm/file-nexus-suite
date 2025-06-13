import { useState } from 'react';

type RoleFilter = 'all' | 'admin' | 'editor' | 'viewer';

/**
 * Hook for managing team UI state
 */
export const useTeamUI = () => {
  // Modal and dialog UI state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  const [showRoleUpdateModal, setShowRoleUpdateModal] = useState<string | null>(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  
  // UI filters and selection
  const [memberFilter, setMemberFilter] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  
  // Chat room UI
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [roomFilter, setRoomFilter] = useState('');

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

  return {
    // State
    showInviteModal,
    showRemoveConfirm,
    showRoleUpdateModal,
    showCreateRoomModal,
    memberFilter,
    selectedMemberIds,
    roleFilter,
    selectedRoomId,
    roomFilter,

    // Actions
    setShowInviteModal,
    setShowRemoveConfirm,
    setShowRoleUpdateModal,
    setShowCreateRoomModal,
    setMemberFilter,
    setSelectedMemberIds,
    toggleMemberSelection,
    setRoleFilter,
    setSelectedRoomId,
    setRoomFilter,
    clearFilters,
    clearSelections,
  };
}; 