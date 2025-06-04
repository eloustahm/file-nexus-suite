
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { MessageSquare, Plus } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  onNewChat: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, onNewChat }) => {
  return (
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
        startIcon={<Plus />}
        onClick={onNewChat}
        sx={{ mt: 2 }}
      >
        Start First Chat
      </Button>
    </Paper>
  );
};
