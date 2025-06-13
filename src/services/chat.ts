import { http } from '@/lib/api';
import type { ChatSession, ChatMessage, ChatAgent } from '@/types/chat';

export const chatService = {
  // Chat Sessions
  async getSessions(): Promise<ChatSession[]> {
    const response = await http.get<{ sessions: ChatSession[] }>('/chat/sessions');
    return response.sessions;
  },

  async getSession(sessionId: string): Promise<ChatSession> {
    const response = await http.get<{ session: ChatSession }>(`/chat/sessions/${sessionId}`);
    return response.session;
  },

  async createSession(data: { title: string; agentId?: string }): Promise<ChatSession> {
    const response = await http.post<{ session: ChatSession }>('/chat/sessions', data);
    return response.session;
  },

  async updateSession(sessionId: string, data: Partial<ChatSession>): Promise<ChatSession> {
    const response = await http.patch<{ session: ChatSession }>(`/chat/sessions/${sessionId}`, data);
    return response.session;
  },

  async deleteSession(sessionId: string): Promise<void> {
    await http.delete<void>(`/chat/sessions/${sessionId}`);
  },

  // Chat Messages
  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    const response = await http.get<{ messages: ChatMessage[] }>(`/chat/sessions/${sessionId}/messages`);
    return response.messages;
  },

  async sendMessage(sessionId: string, content: string): Promise<ChatMessage> {
    const response = await http.post<{ message: ChatMessage }>(`/chat/sessions/${sessionId}/messages`, { content });
    return response.message;
  },

  // Chat Agents
  async getAgents(): Promise<ChatAgent[]> {
    const response = await http.get<{ agents: ChatAgent[] }>('/chat/agents');
    return response.agents;
  }
};
