
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { chatApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

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

interface ChatContextState extends BaseContextState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
}

interface ChatContextActions extends BaseContextActions {
  createSession: (documentId?: string) => void;
  sendMessage: (message: string, documentId?: string) => Promise<void>;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
}

interface ChatContextValue extends ChatContextState, ChatContextActions {}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const createSession = (documentId?: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: documentId ? 'Document Chat' : 'New Chat',
      messages: [],
      documentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setSessions(prev => [...prev, newSession]);
    setCurrentSession(newSession);
    setMessages([]);
  };

  const sendMessage = async (message: string, documentId?: string) => {
    await handleAsyncAction(
      async () => {
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          content: message,
          role: 'user',
          timestamp: new Date(),
          documentId
        };

        setMessages(prev => [...prev, userMessage]);

        const response = await chatApi.sendMessage({
          content: message,
          documentId,
          sessionId: currentSession?.id
        });

        const assistantMessage: ChatMessage = {
          id: response.id,
          content: response.content,
          role: 'assistant',
          timestamp: new Date(response.timestamp)
        };

        setMessages(prev => [...prev, assistantMessage]);
      },
      setLoading,
      setError
    );
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      setMessages(session.messages);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
    }
  };

  const value: ChatContextValue = {
    // State
    sessions,
    currentSession,
    messages,
    loading,
    error,
    // Actions
    createSession,
    sendMessage,
    loadSession,
    deleteSession,
    ...baseActions,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
