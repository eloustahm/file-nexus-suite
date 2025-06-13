import React from 'react';
import { ChatSession } from '@/services/chat';
import { ChatListItem } from './ChatListItem';

interface ChatListProps {
  chats: ChatSession[];
  onResumeChat: (chatId: string) => void;
  formatTimeAgo: (date: Date) => string;
}

export const ChatList: React.FC<ChatListProps> = ({ 
  chats, 
  onResumeChat, 
  formatTimeAgo 
}) => {
  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          onResumeChat={onResumeChat}
          formatTimeAgo={formatTimeAgo}
        />
      ))}
    </div>
  );
};
