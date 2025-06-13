
import { useChatQuery } from '@/hooks/queries/useChatQuery';
import { useState } from 'react';

/**
 * Combined hook that provides both UI state and server data for chat
 */
export const useChat = () => {
  const chatQuery = useChatQuery();

  // UI state
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const clearSession = () => {
    setSelectedSessionId(null);
    setSelectedAgentId(null);
    setIsTyping(false);
  };

  return {
    // Server data
    sessions: chatQuery.sessions,
    agents: chatQuery.agents,
    
    // Server state
    isLoadingSessions: chatQuery.isLoadingSessions,
    isLoadingAgents: chatQuery.isLoadingAgents,
    sessionsError: chatQuery.sessionsError?.message,
    agentsError: chatQuery.agentsError?.message,
    
    // Chat actions
    createSession: chatQuery.createSession,
    updateSession: chatQuery.updateSession,
    deleteSession: chatQuery.deleteSession,
    sendMessage: chatQuery.sendMessage,
    refetchSessions: chatQuery.refetchSessions,
    refetchAgents: chatQuery.refetchAgents,
    getSession: chatQuery.getSession,
    getSessionMessages: chatQuery.getSessionMessages,
    
    // Mutation states
    isCreatingSession: chatQuery.isCreatingSession,
    isUpdatingSession: chatQuery.isUpdatingSession,
    isDeletingSession: chatQuery.isDeletingSession,
    isSendingMessage: chatQuery.isSendingMessage,
    
    // UI state
    selectedSessionId,
    selectedAgentId,
    isTyping,
    newSessionTitle,
    showNewSessionModal,
    showDeleteConfirm,
    
    // UI actions
    setSelectedSessionId,
    setSelectedAgentId,
    setIsTyping,
    setNewSessionTitle,
    setShowNewSessionModal,
    setShowDeleteConfirm,
    clearSession,
  };
};
