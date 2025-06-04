
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
  const [zoom, setZoom] = useState(100);
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/chats')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <FileText className="h-5 w-5" />
            <h1 className="text-xl font-semibold">{document.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={msg.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}>
                        {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <Card className={`p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                      <p className="text-sm">{msg.content}</p>
                      {msg.documentReferences && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {msg.documentReferences.map((ref, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {ref}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-2">
                        {formatTime(msg.timestamp)}
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="p-3 bg-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about the document..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Document Preview Panel */}
        <div className="w-1/2 border-l flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Document Preview</h3>
                <p className="text-sm text-gray-600">{document.type} • {document.size}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <Card className="p-6 bg-gray-50 min-h-full">
              <pre 
                className="whitespace-pre-wrap font-mono text-sm leading-relaxed"
                style={{ fontSize: `${zoom}%` }}
              >
                {document.content}
              </pre>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
