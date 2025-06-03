import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DocumentChatState {
  activeDocumentId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  setActiveDocumentId: (documentId: string | null) => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  sendMessage: (message: string) => Promise<void>;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  activeDocumentId: null,
  messages: [],
  isLoading: false,
  error: null,

  setActiveDocumentId: (documentId) => {
    set({ activeDocumentId: documentId, messages: [], error: null });
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  sendMessage: async (message: string) => {
    const { activeDocumentId, addMessage } = get();
    
    if (!activeDocumentId) {
      console.error('No active document selected');
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // Add user message
      addMessage({
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      // Call API
      const response = await aiApi.chatWithDocument(activeDocumentId, message);
      
      // Add AI response
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response?.content || 'Sorry, I could not process your request.',
        timestamp: new Date()
      });

    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to send message';
      set({ error: errorMessage });
      
      // Add error message to chat
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
