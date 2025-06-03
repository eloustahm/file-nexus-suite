
import { useState } from 'react';
import { ChatHistory, ChatMessage } from '@/pages/components/Document/types/chatTypes';

export const useChatHistory = () => {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);

  const saveToHistory = (messages: ChatMessage[], selectedDocuments: string[]) => {
    if (selectedDocuments.length === 0) return;
    
    const historyKey = selectedDocuments.sort().join(',');
    const documentName = selectedDocuments.length === 1 
      ? selectedDocuments[0] 
      : `${selectedDocuments.length} Documents`;
    
    setChatHistories(prev => {
      const existingIndex = prev.findIndex(h => h.documentId === historyKey);
      const newHistory: ChatHistory = {
        id: historyKey,
        title: documentName,
        documentId: historyKey,
        documentName,
        messages,
        lastActivity: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: new Date(),
        updatedAt: new Date()
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
    const history = chatHistories.find(h => h.documentId === historyId);
    if (history) {
      setSelectedHistory(historyId);
      const docs = historyId.split(',');
      return { messages: history.messages, documents: docs };
    }
    return null;
  };

  return {
    chatHistories,
    selectedHistory,
    setSelectedHistory,
    saveToHistory,
    loadChatHistory
  };
};
