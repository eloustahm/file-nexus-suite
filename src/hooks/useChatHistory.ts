
import { useState } from 'react';
import { ChatHistory, ChatMessage } from '@/types';

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
      const existingIndex = prev.findIndex(h => h.id === historyKey);
      const lastMessage = messages.length > 0 ? messages[messages.length - 1].content : '';
      
      const newHistory: ChatHistory = {
        id: historyKey,
        name: documentName,
        title: documentName,
        lastMessage,
        timestamp: new Date(),
        messageCount: messages.length,
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    chatHistories,
    selectedHistory,
    setSelectedHistory,
    saveToHistory,
    loadChatHistory
  };
};
