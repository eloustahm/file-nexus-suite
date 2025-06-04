
import { create } from 'zustand';
import { teamApi, TeamChatRoom, TeamChatMessage } from '@/services/team';

interface TeamChatState {
  rooms: TeamChatRoom[];
  activeRoom: TeamChatRoom | null;
  messages: Record<string, TeamChatMessage[]>;
  loading: boolean;
  error: string | null;
  isConnected: boolean;
  typingUsers: Record<string, string[]>;

  // Actions
  fetchRooms: () => Promise<void>;
  createRoom: (name: string, members: string[], type: 'group' | 'project') => Promise<void>;
  setActiveRoom: (room: TeamChatRoom | null) => void;
  fetchMessages: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, content: string) => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  setTyping: (roomId: string, userId: string, isTyping: boolean) => void;
  clearError: () => void;
}

export const useTeamChatStore = create<TeamChatState>((set, get) => ({
  rooms: [],
  activeRoom: null,
  messages: {},
  loading: false,
  error: null,
  isConnected: false,
  typingUsers: {},

  fetchRooms: async () => {
    try {
      set({ loading: true, error: null });
      const rooms = await teamApi.getChatRooms();
      set({ rooms });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createRoom: async (name: string, members: string[], type: 'group' | 'project') => {
    try {
      set({ loading: true, error: null });
      const room = await teamApi.createChatRoom({ name, members, type });
      set(state => ({ rooms: [...state.rooms, room] }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setActiveRoom: (room) => {
    set({ activeRoom: room });
    if (room) {
      get().fetchMessages(room.id);
    }
  },

  fetchMessages: async (roomId: string) => {
    try {
      set({ loading: true, error: null });
      const messages = await teamApi.getRoomMessages(roomId);
      set(state => ({
        messages: { ...state.messages, [roomId]: messages }
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (roomId: string, content: string) => {
    try {
      const message = await teamApi.sendRoomMessage(roomId, content);
      set(state => ({
        messages: {
          ...state.messages,
          [roomId]: [...(state.messages[roomId] || []), message]
        }
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  joinRoom: async (roomId: string) => {
    try {
      await teamApi.joinRoom(roomId);
      // Refresh rooms to get updated membership
      await get().fetchRooms();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  leaveRoom: async (roomId: string) => {
    try {
      await teamApi.leaveRoom(roomId);
      // Refresh rooms to get updated membership
      await get().fetchRooms();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  setTyping: (roomId: string, userId: string, isTyping: boolean) => {
    set(state => {
      const roomTyping = state.typingUsers[roomId] || [];
      const newTyping = isTyping
        ? [...roomTyping.filter(id => id !== userId), userId]
        : roomTyping.filter(id => id !== userId);
      
      return {
        typingUsers: { ...state.typingUsers, [roomId]: newTyping }
      };
    });
  },

  clearError: () => set({ error: null })
}));
