
import { create } from 'zustand';
import { Agent, Message, ChatHistory, ChatMessage } from '@/pages/components/Document/types/chatTypes';

interface DocumentChatState {
  selectedAgent: Agent | null;
  messages: Message[];
  selectedDocuments: string[];
  currentMessages: ChatMessage[];
  isLoading: boolean;
  isAgentTyping: boolean;
  error: string | null;
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
  loading: boolean;
  
  setSelectedAgent: (agent: Agent | null) => void;
  setSelectedDocuments: (documents: string[]) => void;
  addDocument: (document: string) => void;
  removeDocument: (document: string) => void;
  sendMessage: (content: string, documentId?: string) => Promise<void>;
  loadChatHistory: (historyId: string) => void;
  clearMessages: () => void;
  clearError: () => void;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  selectedAgent: null,
  messages: [],
  selectedDocuments: [],
  currentMessages: [],
  isLoading: false,
  isAgentTyping: false,
  error: null,
  chatHistories: [
    {
      id: '1',
      name: 'Contract Analysis',
      title: 'Contract Analysis',
      lastMessage: 'The contract terms look favorable...',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 15,
      messages: [],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      name: 'Financial Report Review',
      title: 'Financial Report Review',
      lastMessage: 'Q3 revenue increased by 23%...',
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 8,
      messages: [],
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000)
    }
  ],
  selectedHistory: null,
  loading: false,

  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  setSelectedDocuments: (documents) => {
    set({ selectedDocuments: documents });
  },

  addDocument: (document) => {
    set((state) => ({
      selectedDocuments: [...state.selectedDocuments, document]
    }));
  },

  removeDocument: (document) => {
    set((state) => ({
      selectedDocuments: state.selectedDocuments.filter(doc => doc !== document)
    }));
  },

  sendMessage: async (content, documentId) => {
    const { selectedAgent } = get();
    
    try {
      set({ isLoading: true, isAgentTyping: true, error: null });
      
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        role: 'user',
        sender: 'user',
        timestamp: new Date()
      };
      
      set((state) => ({
        currentMessages: [...state.currentMessages, userMessage]
      }));

      setTimeout(() => {
        const agentMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `I understand you're asking about: "${content}". Let me help you with that.`,
          role: 'assistant',
          sender: 'agent',
          timestamp: new Date(),
          agentId: selectedAgent?.id
        };
        
        set((state) => ({
          currentMessages: [...state.currentMessages, agentMessage],
          isLoading: false,
          isAgentTyping: false
        }));
      }, 1000);

    } catch (error: any) {
      set({ error: error.message, isLoading: false, isAgentTyping: false });
    }
  },

  loadChatHistory: (historyId) => {
    set({ selectedHistory: historyId });
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        content: 'Hello, I need help with this document.',
        role: 'user',
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        content: 'I\'d be happy to help you analyze the document.',
        role: 'assistant',
        sender: 'agent',
        timestamp: new Date(Date.now() - 3500000)
      }
    ];
    set({ currentMessages: mockMessages });
  },

  clearMessages: () => {
    set({ messages: [], currentMessages: [] });
  },

  clearError: () => {
    set({ error: null });
  }
}));
