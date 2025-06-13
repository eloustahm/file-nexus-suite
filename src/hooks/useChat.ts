import { useChatQuery } from '@/hooks/queries/useChatQuery';
import { useState } from 'react';
import { ChatHistory, ChatMessage } from '@/types';
import { ensureISOString } from '@/lib/dateUtils';

/**
 * Combined hook that provides both UI state and server data for chat
 */
export const useChat = () => {
  const chatQuery = useChatQuery();

  // Selected session and agent
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  
  // Message input state
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Modal and dialog UI state
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showDeleteSessionConfirm, setShowDeleteSessionConfirm] = useState<string | null>(null);

  // Chat history state
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);

  const clearInput = () => {
    setMessageInput('');
    setIsTyping(false);
  };

  const setSelectedSession = (sessionId: string | null) => {
    setSelectedSessionId(sessionId);
    clearInput();
  };

  const setSelectedAgent = (agentId: string | null) => {
    setSelectedAgentId(agentId);
    clearInput();
  };

  const saveToHistory = (messages: ChatMessage[], selectedDocuments: string[]) => {
    if (selectedDocuments.length === 0) return;
    
    const historyKey = selectedDocuments.sort().join(',');
    const documentName = selectedDocuments.length === 1 
      ? selectedDocuments[0] 
      : `${selectedDocuments.length} Documents`;
    
    setChatHistories(prev => {
      const existingIndex = prev.findIndex(h => h.id === historyKey);
      const lastMessage = messages.length > 0 ? messages[messages.length - 1].content : '';
      
      const newHistory: ChatHistory = {
        id: historyKey,
        name: documentName,
        title: documentName,
        lastMessage,
        timestamp: ensureISOString(new Date()),
        messageCount: messages.length,
        messages,
        createdAt: ensureISOString(new Date()),
        updatedAt: ensureISOString(new Date()),
        documentName
      };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newHistory;
        return updated;
      } else {
        return [...prev, newHistory];
      }
    });
  };

  const loadChatHistory = (historyId: string) => {
    const history = chatHistories.find(h => h.id === historyId);
    if (history) {
      setSelectedHistory(historyId);
      const docs = historyId.split(',');
      return { messages: history.messages, documents: docs };
    }
    return null;
  };

  return {
    // Server data
    sessions: chatQuery.sessions,
    agents: chatQuery.agents,
    
    // Server state
    isLoadingSessions: chatQuery.isLoadingSessions,
    isLoadingAgents: chatQuery.isLoadingAgents,
    sessionsError: chatQuery.sessionsError,
    agentsError: chatQuery.agentsError,
    
    // Chat actions
    createSession: chatQuery.createSession,
    sendMessage: chatQuery.sendMessage,
    deleteSession: chatQuery.deleteSession,
    updateSession: chatQuery.updateSession,
    refetchSessions: chatQuery.refetchSessions,
    refetchAgents: chatQuery.refetchAgents,
    
    // Mutation states
    isCreatingSession: chatQuery.isCreatingSession,
    isSendingMessage: chatQuery.isSendingMessage,
    isDeletingSession: chatQuery.isDeletingSession,
    isUpdatingSession: chatQuery.isUpdatingSession,
    
    // UI state
    selectedAgentId,
    isTyping,
    messageInput,
    selectedSessionId,
    showNewChatModal,
    showDeleteSessionConfirm,
    chatHistories,
    selectedHistory,
    
    // UI actions
    setSelectedAgent,
    setIsTyping,
    setMessageInput,
    setSelectedSession,
    setShowNewChatModal,
    setShowDeleteSessionConfirm,
    clearInput,
    setSelectedHistory,
    saveToHistory,
    loadChatHistory,
  };
};
