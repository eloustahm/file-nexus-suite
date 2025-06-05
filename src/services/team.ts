
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
  lastMessage?: string;
  lastActivity: string;
}

export interface TeamChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  roomId: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
}

/**
 * Team API service
 */
export const teamApi = {
  // Get team members
  getMembers: async (): Promise<TeamMember[]> => {
    console.log('Fetching team members');
    return http.get<TeamMember[]>('/api/team/members');
  },

  // Invite team member
  inviteMember: async (data: InviteMemberData) => {
    console.log('Inviting team member:', data.email);
    return http.post('/api/team/invite', data);
  },

  // Update member role
  updateMemberRole: async (memberId: string, role: string): Promise<TeamMember> => {
    console.log('Updating member role:', memberId, role);
    return http.put<TeamMember>(`/api/team/members/${memberId}/role`, { role });
  },

  // Remove team member
  removeMember: async (memberId: string) => {
    console.log('Removing team member:', memberId);
    return http.delete(`/api/team/members/${memberId}`);
  },

  // Get chat rooms
  getChatRooms: async (): Promise<TeamChatRoom[]> => {
    console.log('Fetching chat rooms');
    return http.get<TeamChatRoom[]>('/api/team/chat/rooms');
  },

  // Create chat room
  createChatRoom: async (data: { name: string; description?: string; type: 'group' | 'project'; members: string[] }): Promise<TeamChatRoom> => {
    console.log('Creating chat room:', data.name);
    return http.post<TeamChatRoom>('/api/team/chat/rooms', data);
  },

  // Get room messages
  getRoomMessages: async (roomId: string): Promise<TeamChatMessage[]> => {
    console.log('Fetching room messages:', roomId);
    return http.get<TeamChatMessage[]>(`/api/team/chat/rooms/${roomId}/messages`);
  },

  // Send room message
  sendRoomMessage: async (roomId: string, content: string): Promise<TeamChatMessage> => {
    console.log('Sending room message:', roomId);
    return http.post<TeamChatMessage>(`/api/team/chat/rooms/${roomId}/messages`, { content });
  },

  // Join room
  joinRoom: async (roomId: string) => {
    console.log('Joining room:', roomId);
    return http.post(`/api/team/chat/rooms/${roomId}/join`);
  },

  // Leave room
  leaveRoom: async (roomId: string) => {
    console.log('Leaving room:', roomId);
    return http.post(`/api/team/chat/rooms/${roomId}/leave`);
  }
};
