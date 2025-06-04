
import { http } from '@/lib/api';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'pending' | 'suspended';
}

export interface InviteMemberData {
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  message?: string;
}

export interface TeamChatRoom {
  id: string;
  name: string;
  description?: string;
  type: 'group' | 'project';
  members: string[];
  createdAt: string;
  lastActivity: string;
  isPrivate: boolean;
}

export interface TeamChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  roomId: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
}

/**
 * Team API service
 */
export const teamApi = {
  // Get team members
  getMembers: async (): Promise<TeamMember[]> => {
    return http.get<TeamMember[]>('/api/team/members');
  },

  // Invite team member
  inviteMember: async (data: InviteMemberData): Promise<void> => {
    return http.post<void>('/api/team/invite', data);
  },

  // Update member role
  updateMemberRole: async (memberId: string, role: string): Promise<TeamMember> => {
    return http.put<TeamMember>(`/api/team/members/${memberId}`, { role });
  },

  // Remove team member
  removeMember: async (memberId: string): Promise<void> => {
    return http.delete<void>(`/api/team/members/${memberId}`);
  },

  // Get chat rooms
  getChatRooms: async (): Promise<TeamChatRoom[]> => {
    return http.get<TeamChatRoom[]>('/api/team/chat/rooms');
  },

  // Create chat room
  createChatRoom: async (data: { name: string; description?: string; type: 'group' | 'project'; members: string[] }): Promise<TeamChatRoom> => {
    return http.post<TeamChatRoom>('/api/team/chat/rooms', data);
  },

  // Get room messages
  getRoomMessages: async (roomId: string): Promise<TeamChatMessage[]> => {
    return http.get<TeamChatMessage[]>(`/api/team/chat/rooms/${roomId}/messages`);
  },

  // Send message to room
  sendRoomMessage: async (roomId: string, content: string): Promise<TeamChatMessage> => {
    return http.post<TeamChatMessage>(`/api/team/chat/rooms/${roomId}/messages`, { content });
  },

  // Join room
  joinRoom: async (roomId: string): Promise<void> => {
    return http.post<void>(`/api/team/chat/rooms/${roomId}/join`);
  },

  // Leave room
  leaveRoom: async (roomId: string): Promise<void> => {
    return http.post<void>(`/api/team/chat/rooms/${roomId}/leave`);
  }
};
