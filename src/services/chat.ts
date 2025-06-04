
import { http } from '@/lib/api';
import type { ChatMessage, ChatSession, Agent } from '@/types';

export interface SendMessageData {
  content: string;
  sessionId?: string;
  documentId?: string;
  agentId?: string;
}

/**
 * Chat API service
 */
export const chatApi = {
  // Get all chat sessions
  getSessions: async (): Promise<ChatSession[]> => {
    return http.get<ChatSession[]>('/api/chat/sessions');
  },

  // Get session by ID
  getSession: async (sessionId: string): Promise<ChatSession> => {
    return http.get<ChatSession>(`/api/chat/sessions/${sessionId}`);
  },

  // Create new chat session
  createSession: async (data: { title?: string; documentId?: string; agentId?: string }): Promise<ChatSession> => {
    return http.post<ChatSession>('/api/chat/sessions', data);
  },

  // Send message
  sendMessage: async (data: SendMessageData): Promise<ChatMessage> => {
    return http.post<ChatMessage>('/api/chat/messages', data);
  },

  // Get available agents
  getAgents: async (): Promise<Agent[]> => {
    return http.get<Agent[]>('/api/chat/agents');
  },

  // Delete session
  deleteSession: async (sessionId: string): Promise<void> => {
    return http.delete<void>(`/api/chat/sessions/${sessionId}`);
  },

  // Update session title
  updateSession: async (sessionId: string, data: { title: string }): Promise<ChatSession> => {
    return http.put<ChatSession>(`/api/chat/sessions/${sessionId}`, data);
  }
};
