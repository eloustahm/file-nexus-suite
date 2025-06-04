
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { chatApi } from '@/services/chat';
import { ensureISOString } from '@/lib/dateUtils';
import type { ChatSession, ChatMessage, Agent, ChatHistory } from '@/types';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface DocumentChatContextState extends BaseContextState {
  selectedAgent: Agent | null;
  agents: Agent[];
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  selectedDocuments: string[];
  currentMessages: ChatMessage[];
  isLoading: boolean;
  isAgentTyping: boolean;
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
}

interface DocumentChatContextActions extends BaseContextActions {
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
}

interface DocumentChatContextValue extends DocumentChatContextState, DocumentChatContextActions {}

const DocumentChatContext = createContext<DocumentChatContextValue | undefined>(undefined);

interface DocumentChatProviderProps {
  children: ReactNode;
}

export const DocumentChatProvider: React.FC<DocumentChatProviderProps> = ({ children }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchAgents = async () => {
    await handleAsyncAction(
      async () => {
        const agentsData = await chatApi.getAgents();
        setAgents(agentsData);
      },
      setLoading,
      setError
    );
  };

  const fetchSessions = async () => {
    await handleAsyncAction(
      async () => {
        const sessionsData = await chatApi.getSessions();
        const chatHistoriesData: ChatHistory[] = sessionsData.map(session => ({
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
        setSessions(sessionsData);
        setChatHistories(chatHistoriesData);
      },
      setLoading,
      setError
    );
  };

  const createSession = async (documentId?: string, agentId?: string) => {
    await handleAsyncAction(
      async () => {
        const session = await chatApi.createSession({ 
          title: documentId ? 'Document Chat' : 'New Chat',
          documentId,
          agentId
        });
        setSessions(prev => [...prev, session]);
        setCurrentSession(session);
        setCurrentMessages(session.messages);
      },
      setLoading,
      setError
    );
  };

  const addDocument = (document: string) => {
    setSelectedDocuments(prev => [...prev, document]);
  };

  const removeDocument = (document: string) => {
    setSelectedDocuments(prev => prev.filter(doc => doc !== document));
  };

  const sendMessage = async (content: string, documentId?: string) => {
    try {
      setIsLoading(true);
      setIsAgentTyping(true);
      setError(null);
      
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        role: 'user',
        sender: 'user',
        timestamp: ensureISOString(new Date())
      };
      
      setCurrentMessages(prev => [...prev, userMessage]);

      const message = await chatApi.sendMessage({
        content,
        sessionId: currentSession?.id,
        documentId,
        agentId: selectedAgent?.id
      });

      setCurrentMessages(prev => [...prev, message]);

    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
      setIsAgentTyping(false);
    }
  };

  const loadChatHistory = (historyId: string) => {
    const session = sessions.find(s => s.id === historyId);
    if (session) {
      setSelectedHistory(historyId);
      setCurrentSession(session);
      setCurrentMessages(session.messages);
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await chatApi.deleteSession(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      setChatHistories(prev => prev.filter(h => h.id !== sessionId));
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const clearMessages = () => {
    setCurrentMessages([]);
    setCurrentSession(null);
  };

  const value: DocumentChatContextValue = {
    // State
    selectedAgent,
    agents,
    sessions,
    currentSession,
    selectedDocuments,
    currentMessages,
    loading,
    error,
    isLoading,
    isAgentTyping,
    chatHistories,
    selectedHistory,
    // Actions
    fetchAgents,
    fetchSessions,
    createSession,
    setSelectedAgent,
    setSelectedDocuments,
    addDocument,
    removeDocument,
    sendMessage,
    loadChatHistory,
    deleteSession,
    clearMessages,
    ...baseActions,
  };

  return <DocumentChatContext.Provider value={value}>{children}</DocumentChatContext.Provider>;
};

export const useDocumentChat = () => {
  const context = useContext(DocumentChatContext);
  if (context === undefined) {
    throw new Error('useDocumentChat must be used within a DocumentChatProvider');
  }
  return context;
};
