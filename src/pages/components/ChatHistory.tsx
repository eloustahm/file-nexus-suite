
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDocumentChatStore } from '@/store/useDocumentChatStore';
import { MessageSquare, Calendar, FileText, Trash2 } from 'lucide-react';

interface ChatHistoryProps {
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatHistory = ({ onSelectChat, onDeleteChat }: ChatHistoryProps) => {
  const { chatHistories, loading, error, deleteSession, fetchSessions } = useDocumentChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteSession(chatId);
      onDeleteChat(chatId);
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const formatTimeAgo = (timestamp: Date | string) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Chat History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {chatHistories.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chat history</h3>
            <p className="text-gray-600">Start a new conversation to see your chat history here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chatHistories.map((chat) => (
              <div 
                key={chat.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{chat.title}</h4>
                    {chat.documentName && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Document
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{chat.lastMessage}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatTimeAgo(chat.timestamp)}</span>
                    <span>•</span>
                    <span>{chat.messageCount} messages</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat.id);
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
