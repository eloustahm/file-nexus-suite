
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatHistory } from './ChatHistory';

export const ChatHistoryWrapper = () => {
  const navigate = useNavigate();

  const handleSelectChat = (chatId: string) => {
    navigate(`/dashboard/chat/${chatId}`);
  };

  const handleDeleteChat = (chatId: string) => {
    console.log('Chat deleted:', chatId);
  };

  return (
    <ChatHistory 
      onSelectChat={handleSelectChat}
      onDeleteChat={handleDeleteChat}
    />
  );
};
