
import { create } from 'zustand';

/**
 * Team UI Store - Manages only UI state for team interface
 */
interface TeamUIState {
  // Modal and dialog UI state
  showInviteModal: boolean;
  showRemoveConfirm: string | null; // member ID to remove
  showRoleUpdateModal: string | null; // member ID to update
  showCreateRoomModal: boolean;
  
  // UI filters and selection
  memberFilter: string;
  selectedMemberIds: string[];
  roleFilter: 'all' | 'admin' | 'editor' | 'viewer';
  
  // Chat room UI
  selectedRoomId: string | null;
  roomFilter: string;
  
  // Actions
  setShowInviteModal: (show: boolean) => void;
  setShowRemoveConfirm: (id: string | null) => void;
  setShowRoleUpdateModal: (id: string | null) => void;
  setShowCreateRoomModal: (show: boolean) => void;
  setMemberFilter: (filter: string) => void;
  setSelectedMembers: (ids: string[]) => void;
  toggleMemberSelection: (id: string) => void;
  setRoleFilter: (filter: 'all' | 'admin' | 'editor' | 'viewer') => void;
  setSelectedRoom: (id: string | null) => void;
  setRoomFilter: (filter: string) => void;
  clearFilters: () => void;
  clearSelections: () => void;
}

export const useTeamUIStore = create<TeamUIState>((set, get) => ({
  showInviteModal: false,
  showRemoveConfirm: null,
  showRoleUpdateModal: null,
  showCreateRoomModal: false,
  memberFilter: '',
  selectedMemberIds: [],
  roleFilter: 'all',
  selectedRoomId: null,
  roomFilter: '',

  setShowInviteModal: (show) => set({ showInviteModal: show }),
  setShowRemoveConfirm: (id) => set({ showRemoveConfirm: id }),
  setShowRoleUpdateModal: (id) => set({ showRoleUpdateModal: id }),
  setShowCreateRoomModal: (show) => set({ showCreateRoomModal: show }),
  setMemberFilter: (filter) => set({ memberFilter: filter }),
  setSelectedMembers: (ids) => set({ selectedMemberIds: ids }),
  toggleMemberSelection: (id) => {
    const { selectedMemberIds } = get();
    const isSelected = selectedMemberIds.includes(id);
    set({
      selectedMemberIds: isSelected
        ? selectedMemberIds.filter(memberId => memberId !== id)
        : [...selectedMemberIds, id]
    });
  },
  setRoleFilter: (filter) => set({ roleFilter: filter }),
  setSelectedRoom: (id) => set({ selectedRoomId: id }),
  setRoomFilter: (filter) => set({ roomFilter: filter }),
  clearFilters: () => set({ 
    memberFilter: '', 
    roleFilter: 'all', 
    roomFilter: '' 
  }),
  clearSelections: () => set({ 
    selectedMemberIds: [], 
    selectedRoomId: null 
  }),
}));
