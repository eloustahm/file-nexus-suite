
import React from 'react';
import { ChatHistory } from '@/pages/components/Document/types/chatTypes';
import { ChatListItem } from './ChatListItem';

interface ChatListProps {
  chats: ChatHistory[];
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
