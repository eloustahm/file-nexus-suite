
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentChatStore } from '@/store/useDocumentChatStore';
import { ChatListHeader } from './ChatList/ChatListHeader';
import { ChatSearchAndFilters } from './ChatList/ChatSearchAndFilters';
import { EmptyState } from './ChatList/EmptyState';
import { ChatList } from './ChatList/ChatList';

export const ChatListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'recent'>('all');
  const navigate = useNavigate();
  
  const { chatHistories, loading, error } = useDocumentChatStore();

  const filteredChats = chatHistories.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'recent') {
      const isRecent = new Date().getTime() - chat.timestamp.getTime() < 86400000 * 7;
      return matchesSearch && isRecent;
    }
    
    return matchesSearch;
  });

  const handleResumeChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  const handleNewChat = () => {
    navigate('/chat/new');
  };

  const formatTimeAgo = (date: Date) => {
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <ChatListHeader onNewChat={handleNewChat} />
      
      <ChatSearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={setFilterType}
      />

      {filteredChats.length === 0 ? (
        <EmptyState searchTerm={searchTerm} onNewChat={handleNewChat} />
      ) : (
        <ChatList
          chats={filteredChats}
          onResumeChat={handleResumeChat}
          formatTimeAgo={formatTimeAgo}
        />
      )}
    </div>
  );
};
