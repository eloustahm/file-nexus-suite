
import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type: 'user' | 'ai';
  message: string;
  documentRefs?: string[];
  agentPersonality?: string;
}

interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  personality: string;
  icon: string;
  color: string;
  capabilities: string[];
}

interface ChatHistory {
  id: string;
  title: string;
  documentId: string;
  documentName: string;
  messages: ChatMessage[];
  lastActivity: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentChatState {
  selectedDocuments: string[];
  currentMessages: ChatMessage[];
  selectedAgent: Agent | null;
  isAgentTyping: boolean;
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  setSelectedDocuments: (documents: string[]) => void;
  addDocument: (documentName: string) => void;
  removeDocument: (documentName: string) => void;
  setSelectedAgent: (agent: Agent) => void;
  sendMessage: (message: string) => Promise<void>;
  loadChatHistory: (historyId: string) => void;
  saveToHistory: (messages: ChatMessage[], documents: string[]) => void;
  clearChat: () => void;
  clearError: () => void;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  selectedDocuments: [],
  currentMessages: [],
  selectedAgent: null,
  isAgentTyping: false,
  chatHistories: [],
  selectedHistory: null,
  loading: false,
  error: null,

  setSelectedDocuments: (documents: string[]) => {
    set({ selectedDocuments: documents });
  },

  addDocument: (documentName: string) => {
    set(state => ({
      selectedDocuments: state.selectedDocuments.includes(documentName) 
        ? state.selectedDocuments
        : [...state.selectedDocuments, documentName]
    }));
  },

  removeDocument: (documentName: string) => {
    set(state => ({
      selectedDocuments: state.selectedDocuments.filter(doc => doc !== documentName)
    }));
  },

  setSelectedAgent: (agent: Agent) => {
    set({ selectedAgent: agent });
    
    // Add agent switch message
    const switchMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Switched to ${agent.name}. I'm ready to help you with ${agent.description.toLowerCase()}`,
      role: 'assistant',
      timestamp: new Date(),
      type: 'ai',
      message: `Switched to ${agent.name}. I'm ready to help you with ${agent.description.toLowerCase()}`,
      agentPersonality: agent.personality
    };

    set(state => ({
      currentMessages: [...state.currentMessages, switchMessage]
    }));
  },

  sendMessage: async (message: string) => {
    const { selectedDocuments, selectedAgent, currentMessages } = get();
    
    if (!message.trim() || !selectedAgent) return;

    try {
      set({ loading: true, error: null });

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        role: 'user',
        timestamp: new Date(),
        type: 'user',
        message: message,
        documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
        agentPersonality: selectedAgent.personality
      };

      const updatedMessages = [...currentMessages, userMessage];
      set({ currentMessages: updatedMessages, isAgentTyping: true });

      // Call AI API
      const response = await aiApi.chatWithDocument(
        selectedDocuments[0] || 'general', 
        message
      );

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message || 'I understand your question. Let me help you with that.',
        role: 'assistant',
        timestamp: new Date(),
        type: 'ai',
        message: response.message || 'I understand your question. Let me help you with that.',
        documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
        agentPersonality: selectedAgent.personality
      };

      const finalMessages = [...updatedMessages, aiMessage];
      set({ currentMessages: finalMessages });

      // Save to history
      get().saveToHistory(finalMessages, selectedDocuments);

    } catch (error: any) {
      set({ error: error.message });
      console.error('Error sending message:', error);
    } finally {
      set({ loading: false, isAgentTyping: false });
    }
  },

  loadChatHistory: (historyId: string) => {
    const { chatHistories } = get();
    const history = chatHistories.find(h => h.documentId === historyId);
    
    if (history) {
      const documents = historyId.split(',');
      set({
        currentMessages: history.messages,
        selectedDocuments: documents,
        selectedHistory: historyId
      });
    }
  },

  saveToHistory: (messages: ChatMessage[], selectedDocuments: string[]) => {
    if (selectedDocuments.length === 0) return;
    
    const historyKey = selectedDocuments.sort().join(',');
    const documentName = selectedDocuments.length === 1 
      ? selectedDocuments[0] 
      : `${selectedDocuments.length} Documents`;
    
    set(state => {
      const existingIndex = state.chatHistories.findIndex(h => h.documentId === historyKey);
      const newHistory: ChatHistory = {
        id: historyKey,
        title: documentName,
        documentId: historyKey,
        documentName,
        messages,
        lastActivity: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const updatedHistories = existingIndex >= 0
        ? state.chatHistories.map((h, i) => i === existingIndex ? newHistory : h)
        : [...state.chatHistories, newHistory];
      
      return { chatHistories: updatedHistories };
    });
  },

  clearChat: () => {
    set({
      currentMessages: [],
      selectedDocuments: [],
      selectedHistory: null,
      isAgentTyping: false
    });
  },

  clearError: () => set({ error: null })
}));
