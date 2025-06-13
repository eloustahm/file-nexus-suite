import { http } from '@/lib/api';
import type { TeamMember, TeamSettings, TeamRoom, ChatMessage } from '@/types/team';

export const teamService = {
  // Team Members
  async getMembers(): Promise<TeamMember[]> {
    const response = await http.get<{ members: TeamMember[] }>('/team/members');
    return response.members;
  },

  async inviteMember(data: { email: string; role: string }): Promise<TeamMember> {
    const response = await http.post<{ member: TeamMember }>('/team/members/invite', data);
    return response.member;
  },

  async updateMemberRole(memberId: string, role: string): Promise<TeamMember> {
    const response = await http.patch<{ member: TeamMember }>(`/team/members/${memberId}/role`, { role });
    return response.member;
  },

  async removeMember(memberId: string): Promise<void> {
    await http.delete<void>(`/team/members/${memberId}`);
  },

  // Team Settings
  async getSettings(): Promise<TeamSettings> {
    const response = await http.get<{ settings: TeamSettings }>('/team/settings');
    return response.settings;
  },

  async updateSettings(settings: Partial<TeamSettings>): Promise<TeamSettings> {
    const response = await http.patch<{ settings: TeamSettings }>('/team/settings', settings);
    return response.settings;
  },

  // Team Rooms
  async getRooms(): Promise<TeamRoom[]> {
    const response = await http.get<{ rooms: TeamRoom[] }>('/team/rooms');
    return response.rooms;
  },

  async createRoom(data: { name: string; members: string[]; type: string }): Promise<TeamRoom> {
    const response = await http.post<{ room: TeamRoom }>('/team/rooms', data);
    return response.room;
  },

  async updateRoom(roomId: string, data: Partial<TeamRoom>): Promise<TeamRoom> {
    const response = await http.patch<{ room: TeamRoom }>(`/team/rooms/${roomId}`, data);
    return response.room;
  },

  async deleteRoom(roomId: string): Promise<void> {
    await http.delete<void>(`/team/rooms/${roomId}`);
  },

  async leaveRoom(roomId: string): Promise<void> {
    await http.post<void>(`/team/rooms/${roomId}/leave`);
  },

  // Chat
  async getChatRooms(): Promise<TeamRoom[]> {
    const response = await http.get<{ rooms: TeamRoom[] }>('/team/chat/rooms');
    return response.rooms;
  },

  async createChatRoom(data: { name: string; members: string[] }): Promise<TeamRoom> {
    const response = await http.post<{ room: TeamRoom }>('/team/chat/rooms', data);
    return response.room;
  },

  async getChatMessages(roomId: string): Promise<ChatMessage[]> {
    const response = await http.get<{ messages: ChatMessage[] }>(`/team/chat/rooms/${roomId}/messages`);
    return response.messages;
  },

  async sendChatMessage(roomId: string, content: string): Promise<ChatMessage> {
    const response = await http.post<{ message: ChatMessage }>(`/team/chat/rooms/${roomId}/messages`, { content });
    return response.message;
  },

  async joinChatRoom(roomId: string): Promise<void> {
    await http.post<void>(`/team/chat/rooms/${roomId}/join`);
  }
};
