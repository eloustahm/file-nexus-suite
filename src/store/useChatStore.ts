
import { create } from 'zustand';
import { chatApi } from '@/services/api';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  documentId?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  documentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  createSession: (documentId?: string) => void;
  sendMessage: (message: string, documentId?: string) => Promise<void>;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  loading: false,
  error: null,

  createSession: (documentId?: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: documentId ? 'Document Chat' : 'New Chat',
      messages: [],
      documentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    set(state => ({
      sessions: [...state.sessions, newSession],
      currentSession: newSession,
      messages: []
    }));
  },

  sendMessage: async (message: string, documentId?: string) => {
    try {
      set({ loading: true, error: null });
      
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        role: 'user',
        timestamp: new Date(),
        documentId
      };

      set(state => ({ messages: [...state.messages, userMessage] }));

      const response = await chatApi.sendMessage({
        content: message,
        documentId,
        sessionId: get().currentSession?.id
      });

      const assistantMessage: ChatMessage = {
        id: response.id,
        content: response.content,
        role: 'assistant',
        timestamp: new Date(response.timestamp)
      };

      set(state => ({ messages: [...state.messages, assistantMessage] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  loadSession: (sessionId: string) => {
    const session = get().sessions.find(s => s.id === sessionId);
    if (session) {
      set({ currentSession: session, messages: session.messages });
    }
  },

  deleteSession: (sessionId: string) => {
    set(state => ({
      sessions: state.sessions.filter(s => s.id !== sessionId),
      currentSession: state.currentSession?.id === sessionId ? null : state.currentSession
    }));
  },

  clearError: () => set({ error: null })
}));
