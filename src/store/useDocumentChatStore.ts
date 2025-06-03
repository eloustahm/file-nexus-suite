
import { create } from 'zustand';

interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
  description: string;
  capabilities: string[];
  personality: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentId?: string;
}

interface DocumentChatState {
  selectedAgent: Agent | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  setSelectedAgent: (agent: Agent | null) => void;
  sendMessage: (content: string, documentId?: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  selectedAgent: null,
  messages: [],
  isLoading: false,
  error: null,

  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  sendMessage: async (content, documentId) => {
    const { selectedAgent } = get();
    
    try {
      set({ isLoading: true, error: null });
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date()
      };
      
      set((state) => ({
        messages: [...state.messages, userMessage]
      }));

      // Simulate AI response
      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I understand you're asking about: "${content}". Let me help you with that.`,
          sender: 'agent',
          timestamp: new Date(),
          agentId: selectedAgent?.id
        };
        
        set((state) => ({
          messages: [...state.messages, agentMessage],
          isLoading: false
        }));
      }, 1000);

    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  clearError: () => {
    set({ error: null });
  }
}));
