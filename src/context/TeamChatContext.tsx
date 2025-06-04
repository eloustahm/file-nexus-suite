
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { teamApi, TeamChatRoom, TeamChatMessage } from '@/services/team';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface TeamChatContextState extends BaseContextState {
  rooms: TeamChatRoom[];
  activeRoom: TeamChatRoom | null;
  messages: Record<string, TeamChatMessage[]>;
  isConnected: boolean;
  typingUsers: Record<string, string[]>;
}

interface TeamChatContextActions extends BaseContextActions {
  fetchRooms: () => Promise<void>;
  createRoom: (name: string, members: string[], type: 'group' | 'project') => Promise<void>;
  setActiveRoom: (room: TeamChatRoom | null) => void;
  fetchMessages: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, content: string) => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  setTyping: (roomId: string, userId: string, isTyping: boolean) => void;
}

interface TeamChatContextValue extends TeamChatContextState, TeamChatContextActions {}

const TeamChatContext = createContext<TeamChatContextValue | undefined>(undefined);

export const TeamChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<TeamChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<TeamChatRoom | null>(null);
  const [messages, setMessages] = useState<Record<string, TeamChatMessage[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});

  const baseActions = createBaseActions(setLoading, setError);

  const fetchRooms = async () => {
    await handleAsyncAction(
      async () => {
        const data = await teamApi.getChatRooms();
        setRooms(data);
      },
      setLoading,
      setError
    );
  };

  const createRoom = async (name: string, members: string[], type: 'group' | 'project') => {
    await handleAsyncAction(
      async () => {
        const room = await teamApi.createChatRoom({ name, members, type });
        setRooms(prev => [...prev, room]);
      },
      setLoading,
      setError
    );
  };

  const setActiveRoomHandler = (room: TeamChatRoom | null) => {
    setActiveRoom(room);
    if (room) {
      fetchMessages(room.id);
    }
  };

  const fetchMessages = async (roomId: string) => {
    await handleAsyncAction(
      async () => {
        const msgs = await teamApi.getRoomMessages(roomId);
        setMessages(prev => ({ ...prev, [roomId]: msgs }));
      },
      setLoading,
      setError
    );
  };

  const sendMessage = async (roomId: string, content: string) => {
    try {
      const message = await teamApi.sendRoomMessage(roomId, content);
      setMessages(prev => ({
        ...prev,
        [roomId]: [...(prev[roomId] || []), message]
      }));
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const joinRoom = async (roomId: string) => {
    await handleAsyncAction(
      async () => {
        await teamApi.joinRoom(roomId);
        await fetchRooms();
      },
      setLoading,
      setError
    );
  };

  const leaveRoom = async (roomId: string) => {
    await handleAsyncAction(
      async () => {
        await teamApi.leaveRoom(roomId);
        await fetchRooms();
      },
      setLoading,
      setError
    );
  };

  const setTyping = (roomId: string, userId: string, isTyping: boolean) => {
    setTypingUsers(prev => {
      const roomTyping = prev[roomId] || [];
      const newTyping = isTyping
        ? [...roomTyping.filter(id => id !== userId), userId]
        : roomTyping.filter(id => id !== userId);
      
      return { ...prev, [roomId]: newTyping };
    });
  };

  const value: TeamChatContextValue = {
    rooms,
    activeRoom,
    messages,
    loading,
    error,
    isConnected,
    typingUsers,
    fetchRooms,
    createRoom,
    setActiveRoom: setActiveRoomHandler,
    fetchMessages,
    sendMessage,
    joinRoom,
    leaveRoom,
    setTyping,
    ...baseActions,
  };

  return <TeamChatContext.Provider value={value}>{children}</TeamChatContext.Provider>;
};

export const useTeamChat = () => {
  const context = useContext(TeamChatContext);
  if (context === undefined) {
    throw new Error('useTeamChat must be used within a TeamChatProvider');
  }
  return context;
};
