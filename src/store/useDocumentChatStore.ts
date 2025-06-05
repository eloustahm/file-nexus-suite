
import { create } from 'zustand';
import { Agent, ChatMessage, ChatHistory } from '@/types';
import { chatApi } from '@/services/chat';

/**
 * Complete document chat store with both UI state and server data methods
 */
interface DocumentChatState {
  // UI State
  selectedAgent: Agent | null;
  messageInput: string;
  isTyping: boolean;
  selectedDocuments: string[];
  
  // Server data (temporary until we move to React Query)
  chatHistories: ChatHistory[];
  currentMessages: ChatMessage[];
  isAgentTyping: boolean;
  loading: boolean;
  error: string | null;
  
  // UI Actions
  setSelectedAgent: (agent: Agent | null) => void;
  setMessageInput: (input: string) => void;
  setIsTyping: (typing: boolean) => void;
  setSelectedDocuments: (documents: string[]) => void;
  clearInput: () => void;
  
  // Server actions (temporary)
  fetchSessions: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  clearError: () => void;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  // Initial UI state
  selectedAgent: null,
  messageInput: '',
  isTyping: false,
  selectedDocuments: [],
  
  // Initial server state
  chatHistories: [],
  currentMessages: [],
  isAgentTyping: false,
  loading: false,
  error: null,

  // UI Actions
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setMessageInput: (input) => set({ messageInput: input }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setSelectedDocuments: (documents) => set({ selectedDocuments: documents }),
  clearInput: () => set({ messageInput: '' }),
  
  // Server actions (mock implementations)
  fetchSessions: async () => {
    set({ loading: true, error: null });
    try {
      // Mock data for now
      const mockSessions: ChatHistory[] = [
        {
          id: '1',
          name: 'Project Discussion',
          title: 'Project Discussion',
          lastMessage: 'Let me help you with that document analysis...',
          timestamp: new Date().toISOString(),
          messageCount: 5,
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          documentName: 'Project Proposal.pdf'
        }
      ];
      set({ chatHistories: mockSessions, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  sendMessage: async (message: string) => {
    const { currentMessages, selectedAgent } = get();
    set({ isAgentTyping: true });
    
    try {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        role: 'user',
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      set({ currentMessages: [...currentMessages, userMessage] });
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `I understand you're asking about "${message}". Let me analyze the document and provide insights.`,
          role: 'assistant',
          sender: selectedAgent?.name || 'AI Assistant',
          timestamp: new Date().toISOString()
        };
        
        set(state => ({ 
          currentMessages: [...state.currentMessages, aiMessage],
          isAgentTyping: false 
        }));
      }, 1500);
    } catch (error: any) {
      set({ error: error.message, isAgentTyping: false });
    }
  },

  deleteSession: async (sessionId: string) => {
    set({ loading: true });
    try {
      set(state => ({
        chatHistories: state.chatHistories.filter(chat => chat.id !== sessionId),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
