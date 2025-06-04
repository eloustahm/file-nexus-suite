
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>Loading chats...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
    </Container>
  );
};
