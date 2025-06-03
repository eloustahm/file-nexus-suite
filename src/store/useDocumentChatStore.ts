
import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  documentRefs?: string[];
}

interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ChatHistory {
  documentId: string;
  documentName: string;
  lastActivity: string;
  messages: ChatMessage[];
}

interface DocumentChatState {
  activeDocumentId: string | null;
  messages: ChatMessage[];
  selectedDocuments: string[];
  currentMessages: ChatMessage[];
  selectedAgent: Agent | null;
  isAgentTyping: boolean;
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
  loading: boolean;
  error: string | null;
  setActiveDocumentId: (documentId: string | null) => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  sendMessage: (message: string) => Promise<void>;
  setSelectedDocuments: (documents: string[]) => void;
  addDocument: (document: string) => void;
  removeDocument: (document: string) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  loadChatHistory: (historyId: string) => void;
  clearError: () => void;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  activeDocumentId: null,
  messages: [],
  selectedDocuments: [],
  currentMessages: [],
  selectedAgent: null,
  isAgentTyping: false,
  chatHistories: [],
  selectedHistory: null,
  loading: false,
  error: null,

  setActiveDocumentId: (documentId) => {
    set({ activeDocumentId: documentId, messages: [], error: null });
  },

  addMessage: (message) => {
    set((state) => ({ 
      messages: [...state.messages, message],
      currentMessages: [...state.currentMessages, message]
    }));
  },

  clearMessages: () => {
    set({ messages: [], currentMessages: [] });
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

  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  loadChatHistory: (historyId) => {
    const history = get().chatHistories.find(h => h.documentId === historyId);
    if (history) {
      set({ 
        selectedHistory: historyId,
        currentMessages: history.messages,
        activeDocumentId: historyId
      });
    }
  },

  sendMessage: async (message: string) => {
    const { activeDocumentId, addMessage, selectedDocuments } = get();
    
    try {
      set({ loading: true, isAgentTyping: true, error: null });

      // Add user message
      addMessage({
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date(),
        documentRefs: selectedDocuments
      });

      // Call API
      const response = activeDocumentId 
        ? await aiApi.chatWithDocument(activeDocumentId, message)
        : { content: 'Please select a document to chat with.' };
      
      // Add AI response
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: (response as any)?.content || 'Sorry, I could not process your request.',
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
      set({ loading: false, isAgentTyping: false });
    }
  },

  clearError: () => set({ error: null })
}));
