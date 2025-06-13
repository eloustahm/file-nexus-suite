import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Send,
  FileText,
  Bot,
  User,
  ArrowLeft,
  Download,
  Share,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from '@/types';

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
  const [zoom, setZoom] = useState(100);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { documentId } = useParams();

  const { sendMessage, isSendingMessage } = useChat();

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
  }, [messages]);

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

    try {
      await sendMessage({
        sessionId: documentId || 'default',
        content: message
      });

      // For now, we'll create a mock response since the actual response is not typed
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: `Based on the document, I can help you with that. The project proposal mentions ${message.toLowerCase().includes('budget') ? 'a total estimated cost of $250,000' : message.toLowerCase().includes('timeline') ? 'a 10-month timeline across 3 phases' : 'comprehensive objectives including AI-powered analysis'}.`,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{document.name}</h1>
            <p className="text-sm text-gray-500">{document.type} • {document.size}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Document Preview */}
        <div className="w-1/2 border-r p-4 overflow-auto">
          <div className="prose max-w-none" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
            <pre className="whitespace-pre-wrap font-mono text-sm">{document.content}</pre>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-1/2 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg p-3`}>
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block max-w-[80%] bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the document..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
