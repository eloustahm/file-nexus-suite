
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  Chip,
  Button,
  Divider,
  Container,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Send,
  FileText,
  Bot,
  User,
  ArrowLeft,
  Download,
  Share
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentChatStore } from '@/store/useDocumentChatStore';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  documentReferences?: string[];
}

export const ChatWithDocumentAgent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { documentId } = useParams();

  const { sendMessage, currentMessages, isAgentTyping } = useDocumentChatStore();

  // Mock document data
  const document = {
    id: documentId,
    name: 'Project Proposal.pdf',
    type: 'PDF',
    size: '2.4 MB',
    content: `
      PROJECT PROPOSAL
      
      Executive Summary
      This document outlines our comprehensive approach to developing a next-generation
      document management system. The project aims to revolutionize how organizations
      handle, process, and interact with their digital documents.
      
      Objectives
      1. Implement AI-powered document analysis
      2. Create intuitive user interfaces
      3. Ensure enterprise-grade security
      4. Provide real-time collaboration features
      
      Timeline
      Phase 1: Research and Planning (2 months)
      Phase 2: Development (6 months)
      Phase 3: Testing and Deployment (2 months)
      
      Budget
      Total estimated cost: $250,000
      - Development: $180,000
      - Testing: $40,000
      - Infrastructure: $30,000
    `
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Based on the document, I can help you with that. The project proposal mentions ${message.toLowerCase().includes('budget') ? 'a total estimated cost of $250,000' : message.toLowerCase().includes('timeline') ? 'a 10-month timeline across 3 phases' : 'comprehensive objectives including AI-powered analysis'}.`,
        sender: 'assistant',
        timestamp: new Date(),
        documentReferences: ['Project Proposal.pdf']
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton onClick={() => navigate('/chats')} sx={{ mr: 2 }}>
            <ArrowLeft />
          </IconButton>
          <FileText size={20} style={{ marginRight: 8 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {document.name}
          </Typography>
          <Button startIcon={<Share />} sx={{ mr: 1 }}>
            Share
          </Button>
          <Button startIcon={<Download />}>
            Download
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Chat Panel */}
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          {/* Messages */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <List>
              {messages.map((msg) => (
                <ListItem key={msg.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', pb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        maxWidth: '80%',
                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.600',
                          width: 32,
                          height: 32
                        }}
                      >
                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </Avatar>
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.100',
                          color: msg.sender === 'user' ? 'white' : 'text.primary'
                        }}
                      >
                        <Typography variant="body2">
                          {msg.content}
                        </Typography>
                        {msg.documentReferences && (
                          <Box sx={{ mt: 1 }}>
                            {msg.documentReferences.map((ref, index) => (
                              <Chip
                                key={index}
                                label={ref}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 0.5, color: 'inherit', borderColor: 'currentColor' }}
                              />
                            ))}
                          </Box>
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 1,
                            opacity: 0.7
                          }}
                        >
                          {formatTime(msg.timestamp)}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </ListItem>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'grey.600', width: 32, height: 32 }}>
                      <Bot size={16} />
                    </Avatar>
                    <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: 'grey.500',
                            borderRadius: '50%',
                            animation: 'bounce 1.4s infinite ease-in-out'
                          }}
                        />
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: 'grey.500',
                            borderRadius: '50%',
                            animation: 'bounce 1.4s infinite ease-in-out',
                            animationDelay: '0.16s'
                          }}
                        />
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: 'grey.500',
                            borderRadius: '50%',
                            animation: 'bounce 1.4s infinite ease-in-out',
                            animationDelay: '0.32s'
                          }}
                        />
                      </Box>
                    </Paper>
                  </Box>
                </ListItem>
              )}
            </List>
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Ask about the document..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Document Preview Panel */}
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Document Preview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {document.type} • {document.size}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <Paper sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100%' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                {document.content}
              </pre>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Add bounce animation for typing indicator */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};
