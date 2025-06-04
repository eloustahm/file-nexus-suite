
import { create } from 'zustand';

interface ChatUIState {
  // UI state only - no server data
  selectedAgentId: string | null;
  isTyping: boolean;
  messageInput: string;
  selectedSessionId: string | null;
  showNewChatModal: boolean;
  showDeleteSessionConfirm: string | null;
  
  // Actions
  setSelectedAgent: (agentId: string | null) => void;
  setIsTyping: (typing: boolean) => void;
  setMessageInput: (input: string) => void;
  setSelectedSession: (sessionId: string | null) => void;
  setShowNewChatModal: (show: boolean) => void;
  setShowDeleteSessionConfirm: (sessionId: string | null) => void;
  clearInput: () => void;
}

export const useChatUIStore = create<ChatUIState>((set) => ({
  selectedAgentId: null,
  isTyping: false,
  messageInput: '',
  selectedSessionId: null,
  showNewChatModal: false,
  showDeleteSessionConfirm: null,

  setSelectedAgent: (agentId) => set({ selectedAgentId: agentId }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setMessageInput: (input) => set({ messageInput: input }),
  setSelectedSession: (sessionId) => set({ selectedSessionId: sessionId }),
  setShowNewChatModal: (show) => set({ showNewChatModal: show }),
  setShowDeleteSessionConfirm: (sessionId) => set({ showDeleteSessionConfirm: sessionId }),
  clearInput: () => set({ messageInput: '' }),
}));
