
import { create } from 'zustand';
import { Agent, ChatMessage } from '@/types';

/**
 * UI-only state for document chat (no server data)
 */
interface DocumentChatUIState {
  // UI State
  selectedAgent: Agent | null;
  messageInput: string;
  isTyping: boolean;
  selectedDocuments: string[];
  
  // UI Actions
  setSelectedAgent: (agent: Agent | null) => void;
  setMessageInput: (input: string) => void;
  setIsTyping: (typing: boolean) => void;
  setSelectedDocuments: (documents: string[]) => void;
  clearInput: () => void;
}

export const useDocumentChatStore = create<DocumentChatUIState>((set) => ({
  // Initial UI state
  selectedAgent: null,
  messageInput: '',
  isTyping: false,
  selectedDocuments: [],

  // UI Actions
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setMessageInput: (input) => set({ messageInput: input }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setSelectedDocuments: (documents) => set({ selectedDocuments: documents }),
  clearInput: () => set({ messageInput: '' }),
}));
