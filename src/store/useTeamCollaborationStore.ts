
import { create } from 'zustand';
import { teamApi } from '@/services/api';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: Date;
  lastActive: Date;
  status: 'active' | 'pending' | 'suspended';
}

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
  inviteMember: (email: string, role: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  
  // Settings actions
  fetchSettings: () => Promise<void>;
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
      const members = await teamApi.getMembers() as TeamMember[];
      set({ members });
    } catch (error: any) {
      // Fallback to mock data if API fails
      const mockMembers: TeamMember[] = [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@company.com',
          role: 'admin',
          avatar: '/placeholder.svg',
          joinedAt: new Date('2024-01-01'),
          lastActive: new Date(),
          status: 'active'
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@company.com',
          role: 'editor',
          avatar: '/placeholder.svg',
          joinedAt: new Date('2024-01-15'),
          lastActive: new Date(Date.now() - 86400000),
          status: 'active'
        }
      ];
      set({ members: mockMembers, error: null });
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
      // Update local state
      set((state) => ({
        members: state.members.map(member =>
          member.id === memberId ? { ...member, role: role as any } : member
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
      // Remove from local state
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

  fetchSettings: async () => {
    try {
      set({ loading: true, error: null });
      // Mock settings - replace with API call when available
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (newSettings: Partial<TeamSettings>) => {
    try {
      set({ loading: true, error: null });
      // Mock update - replace with API call when available
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
