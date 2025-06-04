
import { create } from 'zustand';
import { teamApi, TeamMember, InviteMemberData } from '@/services/team';

interface TeamSettings {
  teamName: string;
  teamDescription: string;
  visibility: 'private' | 'public';
  allowInvites: boolean;
  requireApproval: boolean;
  enableNotifications: boolean;
  defaultRole: 'viewer' | 'editor';
  maxMembers: number;
  enableTwoFactor: boolean;
  sessionTimeout: number;
}

interface TeamCollaborationState {
  members: TeamMember[];
  settings: TeamSettings;
  loading: boolean;
  error: string | null;
  
  // Member actions
  fetchMembers: () => Promise<void>;
  inviteMember: (data: InviteMemberData) => Promise<void>;
  updateMemberRole: (memberId: string, role: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  
  // Settings actions
  updateSettings: (settings: Partial<TeamSettings>) => Promise<void>;
  
  // Utility actions
  clearError: () => void;
}

export const useTeamCollaborationStore = create<TeamCollaborationState>((set, get) => ({
  members: [],
  settings: {
    teamName: "Development Team",
    teamDescription: "Main development team for the project",
    visibility: 'private',
    allowInvites: true,
    requireApproval: true,
    enableNotifications: true,
    defaultRole: 'viewer',
    maxMembers: 50,
    enableTwoFactor: false,
    sessionTimeout: 24
  },
  loading: false,
  error: null,

  fetchMembers: async () => {
    try {
      set({ loading: true, error: null });
      const members = await teamApi.getMembers();
      set({ members });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  inviteMember: async (data: InviteMemberData) => {
    try {
      set({ loading: true, error: null });
      await teamApi.inviteMember(data);
      // Refresh members list
      await get().fetchMembers();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateMemberRole: async (memberId: string, role: string) => {
    try {
      set({ loading: true, error: null });
      const updatedMember = await teamApi.updateMemberRole(memberId, role);
      set((state) => ({
        members: state.members.map(member =>
          member.id === memberId ? updatedMember : member
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeMember: async (memberId: string) => {
    try {
      set({ loading: true, error: null });
      await teamApi.removeMember(memberId);
      set((state) => ({
        members: state.members.filter(member => member.id !== memberId)
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (newSettings: Partial<TeamSettings>) => {
    try {
      set({ loading: true, error: null });
      // API call would go here when backend is ready
      set((state) => ({
        settings: { ...state.settings, ...newSettings }
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
