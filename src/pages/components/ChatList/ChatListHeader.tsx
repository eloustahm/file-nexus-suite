
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Plus } from 'lucide-react';

interface ChatListHeaderProps {
  onNewChat: () => void;
}

export const ChatListHeader: React.FC<ChatListHeaderProps> = ({ onNewChat }) => {
  return (
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
        startIcon={<Plus />}
        onClick={onNewChat}
        size="large"
      >
        New Chat
      </Button>
    </Box>
  );
};
