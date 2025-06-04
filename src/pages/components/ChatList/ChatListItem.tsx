
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, Clock, ArrowRight } from 'lucide-react';
import { ChatHistory } from '@/pages/components/Document/types/chatTypes';

interface ChatListItemProps {
  chat: ChatHistory;
  onResumeChat: (chatId: string) => void;
  formatTimeAgo: (date: Date) => string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ 
  chat, 
  onResumeChat, 
  formatTimeAgo 
}) => {
  return (
    <Card className="p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              <FileText className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
              <Badge variant="outline" className="text-xs">
                {chat.messageCount} messages
              </Badge>
            </div>
            <p className="text-sm text-gray-600 truncate mb-1">
              {chat.lastMessage}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formatTimeAgo(chat.timestamp)}</span>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={() => onResumeChat(chat.id)}
          className="ml-4"
        >
          Resume
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};
