
import { create } from 'zustand';
import { teamApi } from '@/services/api';

interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActive?: string;
  avatar?: string;
}

interface TeamState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  inviteMember: (email: string, role: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  clearError: () => void;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  members: [],
  loading: false,
  error: null,

  fetchMembers: async () => {
    try {
      set({ loading: true, error: null });
      const members = await teamApi.getMembers() as TeamMember[];
      set({ members });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  inviteMember: async (email: string, role: string) => {
    try {
      set({ loading: true, error: null });
      await teamApi.inviteMember({ email, role });
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
      await teamApi.updateMemberRole(memberId, role);
      set(state => ({
        members: state.members.map(member => 
          member.id === memberId ? { ...member, role: role as any } : member
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeMember: async (memberId: string) => {
    try {
      set({ loading: true, error: null });
      await teamApi.removeMember(memberId);
      set(state => ({
        members: state.members.filter(member => member.id !== memberId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
