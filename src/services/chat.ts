
import { http } from '@/lib/api';
import type { ChatMessage, ChatSession } from '@/types/chat';

// Export the ChatSession type for use in other files
export type { ChatSession } from '@/types/chat';

export const chatService = {
  /**
   * Get all chat sessions for the current user
   */
  getSessions: async (): Promise<ChatSession[]> => {
    return http.get<ChatSession[]>('/chat/sessions');
  },

  /**
   * Create a new chat session
   */
  createSession: async (data: { title: string; documentIds?: string[] }): Promise<ChatSession> => {
    return http.post<ChatSession>('/chat/sessions', data);
  },

  /**
   * Get messages for a specific chat session
   */
  getMessages: async (sessionId: string): Promise<ChatMessage[]> => {
    return http.get<ChatMessage[]>(`/chat/sessions/${sessionId}/messages`);
  },

  /**
   * Send a message in a chat session
   */
  sendMessage: async (sessionId: string, data: { message: string; documentIds?: string[] }): Promise<ChatMessage> => {
    return http.post<ChatMessage>(`/chat/sessions/${sessionId}/messages`, data);
  },

  /**
   * Delete a chat session
   */
  deleteSession: async (sessionId: string): Promise<void> => {
    return http.delete(`/chat/sessions/${sessionId}`);
  },

  /**
   * Update a chat session
   */
  updateSession: async (sessionId: string, data: Partial<ChatSession>): Promise<ChatSession> => {
    return http.put<ChatSession>(`/chat/sessions/${sessionId}`, data);
  },

  /**
   * Get chat agents/assistants
   */
  getAgents: async () => {
    return http.get('/chat/agents');
  },

  /**
   * Create a new chat agent
   */
  createAgent: async (data: any) => {
    return http.post('/chat/agents', data);
  },

  /**
   * Update a chat agent
   */
  updateAgent: async (id: string, data: any) => {
    return http.put(`/chat/agents/${id}`, data);
  },

  /**
   * Delete a chat agent
   */
  deleteAgent: async (id: string) => {
    return http.delete(`/chat/agents/${id}`);
  },
};
