
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Plus } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  onNewChat: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, onNewChat }) => {
  return (
    <Card className="p-12 text-center">
      <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {searchTerm ? 'No matching chats found' : 'No chats yet'}
      </h3>
      <p className="text-gray-600 mb-4">
        {searchTerm 
          ? 'Try adjusting your search terms' 
          : 'Start a conversation with your documents'
        }
      </p>
      <Button onClick={onNewChat}>
        <Plus className="h-4 w-4 mr-2" />
        Start First Chat
      </Button>
    </Card>
  );
};
