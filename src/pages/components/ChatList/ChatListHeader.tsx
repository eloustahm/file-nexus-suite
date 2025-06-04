
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ChatListHeaderProps {
  onNewChat: () => void;
}

export const ChatListHeader: React.FC<ChatListHeaderProps> = ({ onNewChat }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Document Chats
        </h1>
        <p className="text-gray-600">
          Continue your conversations with documents
        </p>
      </div>
      <Button onClick={onNewChat} size="lg">
        <Plus className="h-4 w-4 mr-2" />
        New Chat
      </Button>
    </div>
  );
};
