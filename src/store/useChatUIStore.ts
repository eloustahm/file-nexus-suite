
import { create } from 'zustand';

/**
 * Chat UI Store - Manages only UI state for chat interface
 */
interface ChatUIState {
  // Agent and session selection
  selectedAgentId: string | null;
  selectedSessionId: string | null;
  
  // Message input state
  messageInput: string;
  isTyping: boolean;
  
  // Modal and dialog UI state
  showNewChatModal: boolean;
  showDeleteSessionConfirm: boolean;
  
  // Actions
  setSelectedAgent: (agentId: string | null) => void;
  setSelectedSession: (sessionId: string | null) => void;
  setMessageInput: (input: string) => void;
  setIsTyping: (typing: boolean) => void;
  setShowNewChatModal: (show: boolean) => void;
  setShowDeleteSessionConfirm: (show: boolean) => void;
  clearInput: () => void;
}

export const useChatUIStore = create<ChatUIState>((set) => ({
  selectedAgentId: null,
  selectedSessionId: null,
  messageInput: '',
  isTyping: false,
  showNewChatModal: false,
  showDeleteSessionConfirm: false,

  setSelectedAgent: (agentId) => set({ selectedAgentId: agentId }),
  setSelectedSession: (sessionId) => set({ selectedSessionId: sessionId }),
  setMessageInput: (input) => set({ messageInput: input }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setShowNewChatModal: (show) => set({ showNewChatModal: show }),
  setShowDeleteSessionConfirm: (show) => set({ showDeleteSessionConfirm: show }),
  clearInput: () => set({ messageInput: '' }),
}));
