
import React, { useEffect } from 'react';
import { useDocumentChatStore } from '@/store/useDocumentChatStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { formatRelativeTime } from '@/lib/dateUtils';

export interface ChatHistoryProps {
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatHistory = ({ onSelectChat, onDeleteChat }: ChatHistoryProps) => {
  const { chatHistories, loading, error, fetchSessions, deleteSession } = useDocumentChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleDeleteChat = async (chatId: string) => {
    await deleteSession(chatId);
    onDeleteChat(chatId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-600 text-center">
          <p>Error loading chat history: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Chat History</h1>
        <p className="text-gray-600">View and resume your previous conversations</p>
      </div>

      {chatHistories.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Chat History</h3>
            <p className="text-gray-600">You haven't started any conversations yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {chatHistories.map((chat) => (
            <Card key={chat.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
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
                      <span>{formatRelativeTime(chat.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectChat(chat.id)}
                  >
                    Resume
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteChat(chat.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
