import React, { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
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
  const { sessions, isLoadingSessions, sessionsError, refetchSessions, deleteSession } = useChat();

  useEffect(() => {
    refetchSessions();
  }, [refetchSessions]);

  const handleDeleteChat = async (chatId: string) => {
    await deleteSession(chatId);
    onDeleteChat(chatId);
  };

  if (isLoadingSessions) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (sessionsError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-600 text-center">
          <p>Error loading chat history: {sessionsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chat History</h2>
        <Button variant="outline" onClick={() => refetchSessions()}>
          Refresh
        </Button>
      </div>

      {sessions.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chat history</h3>
            <p className="text-gray-600">Your chat history will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((chat) => (
            <Card key={chat.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{chat.name}</h3>
                    <p className="text-sm text-gray-500">{chat.lastMessageAt}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{chat.agentId}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => onSelectChat(chat.id)}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteChat(chat.id)}>
                    <Clock className="h-4 w-4" />
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
