
import { create } from 'zustand';

/**
 * Team UI Store - Manages only UI state for team interface
 */
interface TeamUIState {
  // Member management UI
  showInviteModal: boolean;
  showRemoveConfirm: string | null; // member ID to remove
  showRoleUpdateModal: string | null; // member ID to update
  memberFilter: string;
  selectedMemberIds: string[];
  roleFilter: 'all' | 'admin' | 'editor' | 'viewer';
  
  // Chat room UI
  showCreateRoomModal: boolean;
  selectedRoomId: string | null;
  roomFilter: string;
  
  // Actions
  setShowInviteModal: (show: boolean) => void;
  setShowRemoveConfirm: (memberId: string | null) => void;
  setShowRoleUpdateModal: (memberId: string | null) => void;
  setMemberFilter: (filter: string) => void;
  setSelectedMembers: (ids: string[]) => void;
  toggleMemberSelection: (id: string) => void;
  setRoleFilter: (filter: 'all' | 'admin' | 'editor' | 'viewer') => void;
  setShowCreateRoomModal: (show: boolean) => void;
  setSelectedRoom: (roomId: string | null) => void;
  setRoomFilter: (filter: string) => void;
  clearFilters: () => void;
  clearSelections: () => void;
}

export const useTeamUIStore = create<TeamUIState>((set, get) => ({
  showInviteModal: false,
  showRemoveConfirm: null,
  showRoleUpdateModal: null,
  memberFilter: '',
  selectedMemberIds: [],
  roleFilter: 'all',
  showCreateRoomModal: false,
  selectedRoomId: null,
  roomFilter: '',

  setShowInviteModal: (show) => set({ showInviteModal: show }),
  setShowRemoveConfirm: (memberId) => set({ showRemoveConfirm: memberId }),
  setShowRoleUpdateModal: (memberId) => set({ showRoleUpdateModal: memberId }),
  setMemberFilter: (filter) => set({ memberFilter: filter }),
  setSelectedMembers: (ids) => set({ selectedMemberIds: ids }),
  toggleMemberSelection: (id) => {
    const current = get().selectedMemberIds;
    const isSelected = current.includes(id);
    set({
      selectedMemberIds: isSelected
        ? current.filter(memberId => memberId !== id)
        : [...current, id]
    });
  },
  setRoleFilter: (filter) => set({ roleFilter: filter }),
  setShowCreateRoomModal: (show) => set({ showCreateRoomModal: show }),
  setSelectedRoom: (roomId) => set({ selectedRoomId: roomId }),
  setRoomFilter: (filter) => set({ roomFilter: filter }),
  clearFilters: () => set({ 
    memberFilter: '', 
    roleFilter: 'all',
    roomFilter: ''
  }),
  clearSelections: () => set({ selectedMemberIds: [] }),
}));
