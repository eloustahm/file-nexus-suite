
import { http } from '@/lib/api';
import { ChatSession, ChatMessage, Agent } from '@/types';

export interface SendMessageData {
  sessionId: string;
  content: string;
  agentId?: string;
}

export interface CreateSessionData {
  title?: string;
  documentId?: string;
  agentId?: string;
}

/**
 * Chat API service
 */
export const chatApi = {
  // Get all chat sessions
  getSessions: async (): Promise<ChatSession[]> => {
    console.log('Fetching chat sessions');
    return http.get<ChatSession[]>('/api/chat/sessions');
  },

  // Get chat session by ID
  getSession: async (sessionId: string): Promise<ChatSession> => {
    console.log('Fetching chat session:', sessionId);
    return http.get<ChatSession>(`/api/chat/sessions/${sessionId}`);
  },

  // Create new chat session
  createSession: async (data: CreateSessionData): Promise<ChatSession> => {
    console.log('Creating chat session:', data);
    return http.post<ChatSession>('/api/chat/sessions', data);
  },

  // Send message
  sendMessage: async (data: SendMessageData): Promise<ChatMessage> => {
    console.log('Sending message:', data);
    return http.post<ChatMessage>('/api/chat/messages', data);
  },

  // Update session
  updateSession: async (sessionId: string, data: { title: string }): Promise<ChatSession> => {
    console.log('Updating session:', sessionId);
    return http.put<ChatSession>(`/api/chat/sessions/${sessionId}`, data);
  },

  // Delete session
  deleteSession: async (sessionId: string) => {
    console.log('Deleting session:', sessionId);
    return http.delete(`/api/chat/sessions/${sessionId}`);
  },

  // Get available agents
  getAgents: async (): Promise<Agent[]> => {
    console.log('Fetching chat agents');
    return http.get<Agent[]>('/api/chat/agents');
  }
};
