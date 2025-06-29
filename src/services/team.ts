
import { http } from '@/lib/api';
import type { TeamMember, TeamSettings, TeamRoom, ChatMessage } from '@/types/team';

export const teamService = {
  /**
   * Get team members
   */
  getMembers: async (): Promise<TeamMember[]> => {
    return http.get<TeamMember[]>('/team/members');
  },

  /**
   * Invite a new team member
   */
  inviteMember: async (data: { email: string; role: string }): Promise<TeamMember> => {
    return http.post<TeamMember>('/team/members/invite', data);
  },

  /**
   * Update team member role
   */
  updateMemberRole: async (memberId: string, role: string): Promise<TeamMember> => {
    return http.patch<TeamMember>(`/team/members/${memberId}/role`, { role });
  },

  /**
   * Remove team member
   */
  removeMember: async (memberId: string): Promise<void> => {
    return http.delete(`/team/members/${memberId}`);
  },

  /**
   * Get team settings
   */
  getSettings: async (): Promise<TeamSettings> => {
    return http.get<TeamSettings>('/team/settings');
  },

  /**
   * Update team settings
   */
  updateSettings: async (settings: Partial<TeamSettings>): Promise<TeamSettings> => {
    return http.patch<TeamSettings>('/team/settings', settings);
  },

  /**
   * Get team chat rooms
   */
  getRooms: async (): Promise<TeamRoom[]> => {
    return http.get<TeamRoom[]>('/team/rooms');
  },

  /**
   * Create a new chat room
   */
  createChatRoom: async (data: { name: string; description?: string; type: 'group' | 'project'; members: string[] }): Promise<TeamRoom> => {
    return http.post<TeamRoom>('/team/rooms', data);
  },

  /**
   * Get messages for a chat room
   */
  getRoomMessages: async (roomId: string): Promise<ChatMessage[]> => {
    return http.get<ChatMessage[]>(`/team/rooms/${roomId}/messages`);
  },

  /**
   * Send a message to a chat room
   */
  sendRoomMessage: async (roomId: string, content: string): Promise<ChatMessage> => {
    return http.post<ChatMessage>(`/team/rooms/${roomId}/messages`, { content });
  },

  /**
   * Join a chat room
   */
  joinRoom: async (roomId: string): Promise<void> => {
    return http.post(`/team/rooms/${roomId}/join`);
  },

  /**
   * Leave a chat room
   */
  leaveRoom: async (roomId: string): Promise<void> => {
    return http.post(`/team/rooms/${roomId}/leave`);
  },

  /**
   * Join a chat room (alias for joinRoom for backwards compatibility)
   */
  joinChatRoom: async (roomId: string): Promise<void> => {
    return http.post(`/team/rooms/${roomId}/join`);
  },
};
