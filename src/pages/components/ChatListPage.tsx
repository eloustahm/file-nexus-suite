
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Grid,
  Paper
} from '@mui/material';
import {
  Search,
  MessageSquare,
  FileText,
  Add,
  AccessTime,
  ArrowForward
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocumentChatStore } from '@/store/useDocumentChatStore';

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
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Document Chats
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue your conversations with documents
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleNewChat}
          size="large"
        >
          New Chat
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" gap={1}>
              <Chip
                label="All"
                onClick={() => setFilterType('all')}
                color={filterType === 'all' ? 'primary' : 'default'}
                variant={filterType === 'all' ? 'filled' : 'outlined'}
              />
              <Chip
                label="Recent"
                onClick={() => setFilterType('recent')}
                color={filterType === 'recent' ? 'primary' : 'default'}
                variant={filterType === 'recent' ? 'filled' : 'outlined'}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Chat List */}
      {filteredChats.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <MessageSquare size={64} color="#ccc" style={{ marginBottom: 16 }} />
          <Typography variant="h6" gutterBottom>
            {searchTerm ? 'No matching chats found' : 'No chats yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Start a conversation with your documents'
            }
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleNewChat}
            sx={{ mt: 2 }}
          >
            Start First Chat
          </Button>
        </Paper>
      ) : (
        <List>
          {filteredChats.map((chat) => (
            <Card key={chat.id} sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <FileText size={20} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6">{chat.name}</Typography>
                      <Chip
                        label={`${chat.messageCount} messages`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {chat.lastMessage}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <AccessTime size={14} />
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeAgo(chat.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    onClick={() => handleResumeChat(chat.id)}
                  >
                    Resume
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </Card>
          ))}
        </List>
      )}
    </Container>
  );
};
