
import { useChatQuery } from '@/hooks/queries/useChatQuery';
import { useChatUIStore } from '@/store/useChatUIStore';

/**
 * Combined hook that provides both UI state and server data for chat
 */
export const useChat = () => {
  const chatQuery = useChatQuery();
  const chatUI = useChatUIStore();

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
    sendMessage: chatQuery.sendMessage,
    deleteSession: chatQuery.deleteSession,
    updateSession: chatQuery.updateSession,
    refetchSessions: chatQuery.refetchSessions,
    refetchAgents: chatQuery.refetchAgents,
    getSession: chatQuery.getSession,
    
    // Mutation states
    isCreatingSession: chatQuery.isCreatingSession,
    isSendingMessage: chatQuery.isSendingMessage,
    isDeletingSession: chatQuery.isDeletingSession,
    isUpdatingSession: chatQuery.isUpdatingSession,
    
    // UI state
    selectedAgentId: chatUI.selectedAgentId,
    isTyping: chatUI.isTyping,
    messageInput: chatUI.messageInput,
    selectedSessionId: chatUI.selectedSessionId,
    showNewChatModal: chatUI.showNewChatModal,
    showDeleteSessionConfirm: chatUI.showDeleteSessionConfirm,
    
    // UI actions
    setSelectedAgent: chatUI.setSelectedAgent,
    setIsTyping: chatUI.setIsTyping,
    setMessageInput: chatUI.setMessageInput,
    setSelectedSession: chatUI.setSelectedSession,
    setShowNewChatModal: chatUI.setShowNewChatModal,
    setShowDeleteSessionConfirm: chatUI.setShowDeleteSessionConfirm,
    clearInput: chatUI.clearInput,
  };
};
