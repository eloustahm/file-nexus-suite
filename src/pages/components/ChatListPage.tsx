import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import { ChatListHeader } from '@/pages/components/ChatList/ChatListHeader';
import { ChatSearchAndFilters } from '@/pages/components/ChatList/ChatSearchAndFilters';
import { EmptyState } from '@/pages/components/ChatList/EmptyState';
import { ChatList } from '@/pages/components/ChatList/ChatList';

export const ChatListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'recent'>('all');
  const navigate = useNavigate();

  const { 
    sessions,
    isLoadingSessions,
    sessionsError,
    refetchSessions
  } = useChat();

  const filteredChats = sessions.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'recent') {
      const isRecent = new Date().getTime() - new Date(chat.updatedAt).getTime() < 86400000 * 7;
      return matchesSearch && isRecent;
    }

    return matchesSearch;
  });

  const handleResumeChat = (chatId: string) => {
    navigate(`/dashboard/chat/${chatId}`);
  };

  const handleNewChat = () => {
    navigate('/dashboard/chat/new');
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
          <button 
            onClick={() => refetchSessions()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
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
