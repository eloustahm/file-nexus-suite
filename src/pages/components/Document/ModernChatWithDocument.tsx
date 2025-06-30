
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  FileText, 
  Bot,
  User,
  Send,
  Paperclip,
  Settings,
  Plus,
  Search,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Bookmark,
  Share,
  Download
} from "lucide-react";
import { useChat } from '@/hooks/useChat';
import { useChatAgents } from '@/hooks/useChatAgents';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  documentReferences?: string[];
  liked?: boolean;
  disliked?: boolean;
  bookmarked?: boolean;
}

interface DocumentTab {
  id: string;
  name: string;
  type: string;
  size: string;
  content: string;
  isActive: boolean;
}

export const ModernChatWithDocument = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [documentTabs, setDocumentTabs] = useState<DocumentTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { agents } = useChatAgents();
  const { sendMessage, isSendingMessage } = useChat();

  // Mock documents
  const availableDocuments = [
    { 
      id: "1", 
      name: "Project Proposal.pdf", 
      type: "PDF", 
      size: "2.4 MB",
      content: `PROJECT PROPOSAL - AI Document Management System

EXECUTIVE SUMMARY
This project proposes the development of an advanced AI-powered document management system that will revolutionize how organizations handle, process, and interact with their digital documents.

OBJECTIVES
• Implement cutting-edge AI document analysis capabilities
• Create intuitive and user-friendly interfaces
• Ensure enterprise-grade security and compliance
• Provide real-time collaboration features
• Enable seamless integration with existing systems

TECHNICAL APPROACH
Our solution leverages state-of-the-art natural language processing, machine learning algorithms, and cloud-based infrastructure to deliver:
- Intelligent document categorization and tagging
- Advanced search and retrieval capabilities
- Automated workflow processing
- Real-time collaboration tools
- Comprehensive analytics and reporting

PROJECT TIMELINE
Phase 1: Research and Planning (2 months)
- Requirements gathering and analysis
- Technology stack selection
- Architecture design

Phase 2: Development (6 months)
- Core system development
- AI model training and integration
- User interface implementation
- Security framework implementation

Phase 3: Testing and Deployment (2 months)
- Comprehensive testing
- Performance optimization
- Production deployment
- User training and documentation

BUDGET BREAKDOWN
Total Project Cost: $250,000
- Development Team: $180,000
- Infrastructure and Tools: $30,000
- Testing and Quality Assurance: $40,000

EXPECTED OUTCOMES
- 50% reduction in document processing time
- 75% improvement in document retrieval accuracy
- 90% user satisfaction rate
- ROI within 12 months of deployment`
    },
    { 
      id: "2", 
      name: "Technical Specs.docx", 
      type: "Word", 
      size: "1.8 MB",
      content: `TECHNICAL SPECIFICATIONS - AI Document Management System

SYSTEM ARCHITECTURE
The system follows a microservices architecture with the following components:

1. FRONTEND LAYER
- React-based web application
- Responsive design for mobile and desktop
- Real-time updates using WebSocket connections
- Progressive Web App (PWA) capabilities

2. API GATEWAY
- RESTful API design
- Authentication and authorization
- Rate limiting and throttling
- Request/response logging

3. MICROSERVICES
- Document Processing Service
- AI Analysis Service
- User Management Service
- Notification Service
- Search Service

4. DATA LAYER
- PostgreSQL for structured data
- MongoDB for document metadata
- Redis for caching
- Elasticsearch for full-text search

5. AI/ML COMPONENTS
- Natural Language Processing (NLP) engine
- Document classification models
- Entity extraction algorithms
- Sentiment analysis capabilities

TECHNOLOGY STACK
Frontend: React, TypeScript, Tailwind CSS
Backend: Node.js, Express.js, Python
Databases: PostgreSQL, MongoDB, Redis
Search: Elasticsearch
AI/ML: TensorFlow, PyTorch, Hugging Face
Cloud: AWS/Azure/GCP
Containers: Docker, Kubernetes

PERFORMANCE REQUIREMENTS
- Response time: < 2 seconds for document queries
- Throughput: 1000+ concurrent users
- Availability: 99.9% uptime
- Scalability: Horizontal scaling capability

SECURITY FEATURES
- End-to-end encryption
- Multi-factor authentication
- Role-based access control
- Audit logging
- Data backup and recovery`
    },
    { 
      id: "3", 
      name: "User Manual.pdf", 
      type: "PDF", 
      size: "3.2 MB",
      content: `USER MANUAL - AI Document Management System

GETTING STARTED

Welcome to the AI Document Management System! This comprehensive guide will help you navigate and utilize all the features of our platform.

1. ACCOUNT SETUP
- Create your account using your email address
- Verify your email through the confirmation link
- Set up your profile and preferences
- Choose your subscription plan

2. DASHBOARD OVERVIEW
The main dashboard provides:
- Quick access to recent documents
- System notifications and alerts
- Usage statistics and analytics
- Quick action buttons

3. DOCUMENT MANAGEMENT
Upload Documents:
- Drag and drop files or use the upload button
- Supported formats: PDF, DOC, DOCX, TXT, RTF
- Maximum file size: 100MB per document
- Bulk upload capability available

Organize Documents:
- Create folders and subfolders
- Add tags and labels
- Set custom metadata
- Use favorites and bookmarks

4. AI FEATURES
Smart Search:
- Natural language queries
- Semantic search capabilities
- Filter by date, type, author
- Save search queries

Document Analysis:
- Automatic categorization
- Key phrase extraction
- Sentiment analysis
- Content summarization

5. COLLABORATION
- Share documents with team members
- Set permission levels (view, edit, admin)
- Real-time collaborative editing
- Comment and annotation system
- Version control and history

6. CHAT INTERFACE
- Ask questions about your documents
- Get AI-powered insights
- Request document summaries
- Generate related content

TROUBLESHOOTING
Common issues and solutions:
- Upload failures: Check file format and size
- Search not working: Clear cache and cookies
- Slow performance: Check internet connection
- Login issues: Reset password or contact support

For additional help, contact our support team at support@aidms.com`
    }
  ];

  useEffect(() => {
    if (agents.length > 0 && !selectedAgent) {
      setSelectedAgent(agents[0]);
    }
  }, [agents, selectedAgent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAddDocument = (doc: any) => {
    const newTab: DocumentTab = {
      id: doc.id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      content: doc.content,
      isActive: true
    };

    setDocumentTabs(prev => {
      const updated = prev.map(tab => ({ ...tab, isActive: false }));
      return [...updated, newTab];
    });
    setActiveTabId(doc.id);
  };

  const handleRemoveTab = (tabId: string) => {
    setDocumentTabs(prev => {
      const filtered = prev.filter(tab => tab.id !== tabId);
      if (activeTabId === tabId && filtered.length > 0) {
        setActiveTabId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveTabId(null);
      }
      return filtered;
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      documentReferences: documentTabs.map(tab => tab.name)
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      // Simulate AI response with document context
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateContextualResponse(message, documentTabs),
          timestamp: new Date(),
          documentReferences: documentTabs.map(tab => tab.name)
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const generateContextualResponse = (query: string, docs: DocumentTab[]): string => {
    const lowerQuery = query.toLowerCase();
    
    if (docs.length === 0) {
      return "I'd be happy to help! Please upload some documents first so I can provide specific insights and answers based on your content.";
    }

    if (lowerQuery.includes('summary') || lowerQuery.includes('summarize')) {
      return `Based on the ${docs.length} document(s) you've shared, here's a summary:\n\n${docs.map(doc => `**${doc.name}**: This appears to be a ${doc.type} document focusing on ${doc.name.includes('Proposal') ? 'project planning and business objectives' : doc.name.includes('Technical') ? 'technical specifications and system architecture' : 'user guidance and operational procedures'}.`).join('\n\n')}\n\nWould you like me to dive deeper into any specific aspect?`;
    }

    if (lowerQuery.includes('budget') || lowerQuery.includes('cost')) {
      return "According to the project proposal document, the total estimated budget is $250,000, broken down as follows:\n\n• Development Team: $180,000 (72%)\n• Infrastructure and Tools: $30,000 (12%)\n• Testing and Quality Assurance: $40,000 (16%)\n\nThe project expects ROI within 12 months of deployment. Would you like me to explain any specific cost category?";
    }

    if (lowerQuery.includes('timeline') || lowerQuery.includes('schedule')) {
      return "The project timeline spans 10 months total across 3 phases:\n\n**Phase 1: Research and Planning (2 months)**\n- Requirements gathering and analysis\n- Technology stack selection\n- Architecture design\n\n**Phase 2: Development (6 months)**\n- Core system development\n- AI model training and integration\n- User interface implementation\n\n**Phase 3: Testing and Deployment (2 months)**\n- Comprehensive testing\n- Performance optimization\n- Production deployment\n\nWould you like more details about any specific phase?";
    }

    if (lowerQuery.includes('technical') || lowerQuery.includes('architecture')) {
      return "The system uses a microservices architecture with these key components:\n\n🔧 **Frontend**: React, TypeScript, Tailwind CSS\n🔧 **Backend**: Node.js, Express.js, Python\n🔧 **Databases**: PostgreSQL, MongoDB, Redis\n🔧 **AI/ML**: TensorFlow, PyTorch, Hugging Face\n🔧 **Cloud**: AWS/Azure/GCP with Docker & Kubernetes\n\nPerformance targets include <2s response times, 1000+ concurrent users, and 99.9% uptime. What technical aspect would you like to explore further?";
    }

    if (lowerQuery.includes('features') || lowerQuery.includes('capabilities')) {
      return "The AI Document Management System offers these key features:\n\n🤖 **AI-Powered Features**:\n• Intelligent document categorization\n• Natural language search\n• Content summarization\n• Entity extraction\n\n👥 **Collaboration Tools**:\n• Real-time collaborative editing\n• Comment and annotation system\n• Version control\n• Permission management\n\n📊 **Analytics & Insights**:\n• Usage statistics\n• Document analytics\n• Performance metrics\n• Custom reporting\n\nWhich feature category interests you most?";
    }

    // Default contextual response
    return `I can see you have ${docs.length} document(s) loaded: ${docs.map(d => d.name).join(', ')}. I can help you with questions about:\n\n• Document summaries and key insights\n• Specific details from the content\n• Comparisons between documents\n• Technical specifications\n• Project timelines and budgets\n• Implementation details\n\nWhat would you like to know more about?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMessageAction = (messageId: string, action: 'like' | 'dislike' | 'bookmark' | 'copy') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        switch (action) {
          case 'like':
            return { ...msg, liked: !msg.liked, disliked: false };
          case 'dislike':
            return { ...msg, disliked: !msg.disliked, liked: false };
          case 'bookmark':
            return { ...msg, bookmarked: !msg.bookmarked };
          case 'copy':
            navigator.clipboard.writeText(msg.content);
            return msg;
          default:
            return msg;
        }
      }
      return msg;
    }));
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const activeTab = documentTabs.find(tab => tab.id === activeTabId);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chat with Documents</h1>
          <p className="text-gray-600">Ask questions and get insights from your documents using AI</p>
        </div>
        <div className="flex items-center gap-4">
          {selectedAgent && (
            <Badge variant="secondary" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              {selectedAgent.name}
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Document Tabs */}
      {documentTabs.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600 font-medium">Active Documents:</span>
          <div className="flex gap-2 flex-1 overflow-x-auto">
            {documentTabs.map((tab) => (
              <Badge 
                key={tab.id}
                variant={tab.id === activeTabId ? "default" : "outline"}
                className="flex items-center gap-2 whitespace-nowrap cursor-pointer"
                onClick={() => setActiveTabId(tab.id)}
              >
                <FileText className="h-3 w-3" />
                <span className="max-w-32 truncate">{tab.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTab(tab.id);
                  }}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {documentTabs.length === 0 ? (
          /* No Documents State */
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Start a Document Conversation</h3>
                  <p className="text-gray-600 mb-6">Upload documents to begin asking questions and getting AI-powered insights</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-gray-500 font-medium">Sample Documents:</div>
                <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                  {availableDocuments.map((doc) => (
                    <Button
                      key={doc.id}
                      variant="outline"
                      onClick={() => handleAddDocument(doc)}
                      className="flex items-center gap-3 p-4 h-auto justify-start"
                    >
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Chat Interface with Document Preview */
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Document Preview */}
            <ResizablePanel defaultSize={35} minSize={25}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {activeTab?.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    {activeTab?.type} • {activeTab?.size}
                  </div>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                  <ScrollArea className="h-full">
                    <div className="p-4 bg-gray-50 rounded border text-sm whitespace-pre-wrap">
                      {activeTab?.content}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle />

            {/* Chat Panel */}
            <ResizablePanel defaultSize={65} minSize={50}>
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat Assistant
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search conversation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-48"
                      />
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-6 p-4">
                      {messages.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Bot className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p>Hi! I'm here to help you understand your documents.</p>
                          <p className="text-sm mt-1">Ask me anything about the content you've uploaded.</p>
                        </div>
                      )}
                      
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className={`${
                                msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                              } text-white`}>
                                {msg.role === 'user' ? (
                                  <User className="h-4 w-4" />
                                ) : (
                                  <Bot className="h-4 w-4" />
                                )}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className={`group ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
                              <div className={`p-4 rounded-lg ${
                                msg.role === 'user' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 text-gray-900 border'
                              }`}>
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                  {msg.content}
                                </div>
                                {msg.documentReferences && msg.documentReferences.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-gray-200 opacity-75">
                                    <div className="text-xs flex items-center gap-1">
                                      <FileText className="h-3 w-3" />
                                      Referenced: {msg.documentReferences.join(', ')}
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span>{formatTimestamp(msg.timestamp)}</span>
                                {msg.role === 'assistant' && (
                                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={`h-6 w-6 p-0 ${msg.liked ? 'text-green-600' : ''}`}
                                      onClick={() => handleMessageAction(msg.id, 'like')}
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={`h-6 w-6 p-0 ${msg.disliked ? 'text-red-600' : ''}`}
                                      onClick={() => handleMessageAction(msg.id, 'dislike')}
                                    >
                                      <ThumbsDown className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={`h-6 w-6 p-0 ${msg.bookmarked ? 'text-yellow-600' : ''}`}
                                      onClick={() => handleMessageAction(msg.id, 'bookmark')}
                                    >
                                      <Bookmark className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleMessageAction(msg.id, 'copy')}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex gap-4 justify-start">
                          <div className="flex gap-3 max-w-[85%]">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gray-600 text-white">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 p-4 rounded-lg border">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="space-y-3">
                    {/* Quick Actions */}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("Can you provide a summary of the key points?")}
                      >
                        📋 Summarize
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("What are the main objectives mentioned?")}
                      >
                        🎯 Objectives
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("What is the timeline for this project?")}
                      >
                        📅 Timeline
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("What are the budget details?")}
                      >
                        💰 Budget
                      </Button>
                    </div>
                    
                    {/* Input Area */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-shrink-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your documents..."
                        className="flex-1"
                        disabled={isTyping}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isTyping}
                        className="flex-shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>

      {/* Quick Add Documents */}
      {documentTabs.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
          <span className="text-sm text-gray-600">Add more:</span>
          {availableDocuments
            .filter(doc => !documentTabs.find(tab => tab.id === doc.id))
            .map((doc) => (
              <Button
                key={doc.id}
                variant="ghost"
                size="sm"
                onClick={() => handleAddDocument(doc)}
                className="flex items-center gap-1 text-xs"
              >
                <Plus className="h-3 w-3" />
                {doc.name.length > 15 ? `${doc.name.substring(0, 15)}...` : doc.name}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};
