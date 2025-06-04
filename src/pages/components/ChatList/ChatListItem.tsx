
import React from 'react';
import {
  Card,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
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
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
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
                <Clock size={14} />
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
            endIcon={<ArrowRight />}
            onClick={() => onResumeChat(chat.id)}
          >
            Resume
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </Card>
  );
};
