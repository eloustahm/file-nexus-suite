
import { http } from '@/lib/api';

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  capabilities: string[];
  isActive: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  documentId?: string;
  agentId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  sender: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

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
    console.log('Fetching chat sessions');
    return http.get<ChatSession[]>('/api/chat/sessions');
  },

  // Get available agents
  getAgents: async (): Promise<Agent[]> => {
    console.log('Fetching chat agents');
    return http.get<Agent[]>('/api/chat/agents');
  },

  // Create new chat session
  createSession: async (data: { title?: string; documentId?: string; agentId?: string }): Promise<ChatSession> => {
    console.log('Creating chat session:', data);
    return http.post<ChatSession>('/api/chat/sessions', data);
  },

  // Send message
  sendMessage: async (data: SendMessageData): Promise<ChatMessage> => {
    console.log('Sending message:', data);
    return http.post<ChatMessage>('/api/chat/messages', data);
  },

  // Get session by ID
  getSession: async (sessionId: string): Promise<ChatSession> => {
    console.log('Fetching session:', sessionId);
    return http.get<ChatSession>(`/api/chat/sessions/${sessionId}`);
  },

  // Delete session
  deleteSession: async (sessionId: string) => {
    console.log('Deleting session:', sessionId);
    return http.delete(`/api/chat/sessions/${sessionId}`);
  },

  // Update session
  updateSession: async (sessionId: string, data: { title: string }): Promise<ChatSession> => {
    console.log('Updating session:', sessionId, data);
    return http.put<ChatSession>(`/api/chat/sessions/${sessionId}`, data);
  }
};
