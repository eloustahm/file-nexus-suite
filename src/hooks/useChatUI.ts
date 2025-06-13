import { useState } from 'react';

/**
 * Hook for managing chat UI state
 */
export const useChatUI = () => {
  // Selected session and agent
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  
  // Message input state
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Modal and dialog UI state
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showDeleteSessionConfirm, setShowDeleteSessionConfirm] = useState<string | null>(null);

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

  return {
    // State
    selectedSessionId,
    selectedAgentId,
    messageInput,
    isTyping,
    showNewChatModal,
    showDeleteSessionConfirm,

    // Actions
    setSelectedSession,
    setSelectedAgent,
    setMessageInput,
    setIsTyping,
    setShowNewChatModal,
    setShowDeleteSessionConfirm,
    clearInput,
  };
}; 