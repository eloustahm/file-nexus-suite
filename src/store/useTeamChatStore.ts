
import { create } from 'zustand';

interface TeamChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
}

interface TeamChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'project';
  participants: string[];
  lastMessage?: TeamChatMessage;
  unreadCount: number;
  createdAt: Date;
}

interface TeamChatState {
  rooms: TeamChatRoom[];
  activeRoom: TeamChatRoom | null;
  messages: Record<string, TeamChatMessage[]>;
  loading: boolean;
  error: string | null;
  isTyping: Record<string, string[]>;
  
  // Actions
  fetchRooms: () => Promise<void>;
  setActiveRoom: (room: TeamChatRoom) => void;
  sendMessage: (roomId: string, content: string, type?: 'text' | 'file') => Promise<void>;
  fetchMessages: (roomId: string) => Promise<void>;
  markAsRead: (roomId: string) => void;
  setTyping: (roomId: string, userId: string, isTyping: boolean) => void;
  createRoom: (name: string, participants: string[], type: 'direct' | 'group' | 'project') => Promise<void>;
  clearError: () => void;
}

export const useTeamChatStore = create<TeamChatState>((set, get) => ({
  rooms: [],
  activeRoom: null,
  messages: {},
  loading: false,
  error: null,
  isTyping: {},

  fetchRooms: async () => {
    try {
      set({ loading: true, error: null });
      
      // Mock data for now - replace with API call
      const mockRooms: TeamChatRoom[] = [
        {
          id: '1',
          name: 'General',
          type: 'group',
          participants: ['user1', 'user2', 'user3'],
          unreadCount: 2,
          createdAt: new Date(),
          lastMessage: {
            id: '1',
            senderId: 'user2',
            senderName: 'Alice Johnson',
            content: 'Hey team, the new documents are ready for review!',
            timestamp: new Date(),
            type: 'text'
          }
        },
        {
          id: '2',
          name: 'Project Alpha',
          type: 'project',
          participants: ['user1', 'user2'],
          unreadCount: 0,
          createdAt: new Date(),
          lastMessage: {
            id: '2',
            senderId: 'user1',
            senderName: 'Bob Smith',
            content: 'Updated the contract terms document',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text'
          }
        }
      ];
      
      set({ rooms: mockRooms });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setActiveRoom: (room) => {
    set({ activeRoom: room });
    get().fetchMessages(room.id);
    get().markAsRead(room.id);
  },

  sendMessage: async (roomId, content, type = 'text') => {
    try {
      const newMessage: TeamChatMessage = {
        id: Date.now().toString(),
        senderId: 'current-user',
        senderName: 'You',
        content,
        timestamp: new Date(),
        type
      };

      set((state) => ({
        messages: {
          ...state.messages,
          [roomId]: [...(state.messages[roomId] || []), newMessage]
        }
      }));

      // Update room's last message
      set((state) => ({
        rooms: state.rooms.map(room => 
          room.id === roomId 
            ? { ...room, lastMessage: newMessage }
            : room
        )
      }));

    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchMessages: async (roomId) => {
    try {
      const existingMessages = get().messages[roomId];
      if (existingMessages) return; // Already loaded

      // Mock messages - replace with API call
      const mockMessages: TeamChatMessage[] = [
        {
          id: '1',
          senderId: 'user2',
          senderName: 'Alice Johnson',
          senderAvatar: '/placeholder.svg',
          content: 'Good morning everyone! Ready for the sprint review?',
          timestamp: new Date(Date.now() - 7200000),
          type: 'text'
        },
        {
          id: '2',
          senderId: 'user3',
          senderName: 'Carol Davis',
          content: 'Yes, I have all the documents prepared.',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: '3',
          senderId: 'user2',
          senderName: 'Alice Johnson',
          content: 'contract-v2.pdf',
          timestamp: new Date(Date.now() - 1800000),
          type: 'file',
          fileName: 'contract-v2.pdf',
          fileUrl: '/placeholder-file.pdf'
        }
      ];

      set((state) => ({
        messages: {
          ...state.messages,
          [roomId]: mockMessages
        }
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  markAsRead: (roomId) => {
    set((state) => ({
      rooms: state.rooms.map(room =>
        room.id === roomId ? { ...room, unreadCount: 0 } : room
      )
    }));
  },

  setTyping: (roomId, userId, isTyping) => {
    set((state) => {
      const currentTyping = state.isTyping[roomId] || [];
      const newTyping = isTyping
        ? [...currentTyping.filter(id => id !== userId), userId]
        : currentTyping.filter(id => id !== userId);
      
      return {
        isTyping: {
          ...state.isTyping,
          [roomId]: newTyping
        }
      };
    });
  },

  createRoom: async (name, participants, type) => {
    try {
      const newRoom: TeamChatRoom = {
        id: Date.now().toString(),
        name,
        type,
        participants,
        unreadCount: 0,
        createdAt: new Date()
      };

      set((state) => ({
        rooms: [...state.rooms, newRoom]
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null })
}));
