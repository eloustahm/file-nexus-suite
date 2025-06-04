
import { create } from 'zustand';
import { chatApi } from '@/services/chat';
import { ensureISOString } from '@/lib/dateUtils';
import type { ChatSession, ChatMessage, Agent, ChatHistory } from '@/types';

interface DocumentChatState {
  selectedAgent: Agent | null;
  agents: Agent[];
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  selectedDocuments: string[];
  currentMessages: ChatMessage[];
  isLoading: boolean;
  isAgentTyping: boolean;
  error: string | null;
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
  loading: boolean;
  
  // Actions
  fetchAgents: () => Promise<void>;
  fetchSessions: () => Promise<void>;
  createSession: (documentId?: string, agentId?: string) => Promise<void>;
  setSelectedAgent: (agent: Agent | null) => void;
  setSelectedDocuments: (documents: string[]) => void;
  addDocument: (document: string) => void;
  removeDocument: (document: string) => void;
  sendMessage: (content: string, documentId?: string) => Promise<void>;
  loadChatHistory: (historyId: string) => void;
  deleteSession: (sessionId: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

export const useDocumentChatStore = create<DocumentChatState>((set, get) => ({
  selectedAgent: null,
  agents: [],
  sessions: [],
  currentSession: null,
  selectedDocuments: [],
  currentMessages: [],
  isLoading: false,
  isAgentTyping: false,
  error: null,
  chatHistories: [],
  selectedHistory: null,
  loading: false,

  fetchAgents: async () => {
    try {
      set({ loading: true, error: null });
      const agents = await chatApi.getAgents();
      set({ agents });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSessions: async () => {
    try {
      set({ loading: true, error: null });
      const sessions = await chatApi.getSessions();
      const chatHistories: ChatHistory[] = sessions.map(session => ({
        id: session.id,
        name: session.title,
        title: session.title,
        lastMessage: session.messages[session.messages.length - 1]?.content || '',
        timestamp: ensureISOString(session.updatedAt),
        messageCount: session.messages.length,
        messages: session.messages,
        createdAt: ensureISOString(session.createdAt),
        updatedAt: ensureISOString(session.updatedAt),
        documentName: session.documentId ? 'Document Chat' : undefined
      }));
      set({ sessions, chatHistories });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createSession: async (documentId?: string, agentId?: string) => {
    try {
      set({ loading: true, error: null });
      const session = await chatApi.createSession({ 
        title: documentId ? 'Document Chat' : 'New Chat',
        documentId,
        agentId
      });
      set(state => ({
        sessions: [...state.sessions, session],
        currentSession: session,
        currentMessages: session.messages
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setSelectedAgent: (agent) => set({ selectedAgent: agent }),

  setSelectedDocuments: (documents) => set({ selectedDocuments: documents }),

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
    const { currentSession, selectedAgent } = get();
    
    try {
      set({ isLoading: true, isAgentTyping: true, error: null });
      
      // Add user message immediately to UI
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        role: 'user',
        sender: 'user',
        timestamp: ensureISOString(new Date())
      };
      
      set((state) => ({
        currentMessages: [...state.currentMessages, userMessage]
      }));

      // Send message to API
      const message = await chatApi.sendMessage({
        content,
        sessionId: currentSession?.id,
        documentId,
        agentId: selectedAgent?.id
      });

      // Add assistant message to UI
      set((state) => ({
        currentMessages: [...state.currentMessages, message]
      }));

    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false, isAgentTyping: false });
    }
  },

  loadChatHistory: (historyId) => {
    const session = get().sessions.find(s => s.id === historyId);
    if (session) {
      set({ 
        selectedHistory: historyId,
        currentSession: session,
        currentMessages: session.messages 
      });
    }
  },

  deleteSession: async (sessionId: string) => {
    try {
      await chatApi.deleteSession(sessionId);
      set(state => ({
        sessions: state.sessions.filter(s => s.id !== sessionId),
        currentSession: state.currentSession?.id === sessionId ? null : state.currentSession,
        chatHistories: state.chatHistories.filter(h => h.id !== sessionId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearMessages: () => set({ currentMessages: [], currentSession: null }),

  clearError: () => set({ error: null })
}));
