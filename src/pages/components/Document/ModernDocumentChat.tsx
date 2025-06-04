
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  FileText, 
  Plus, 
  X, 
  Bot,
  User,
  Send,
  Paperclip
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDocumentChatStore } from '@/store/useDocumentChatStore';
import { useChatAgents } from '@/hooks/useChatAgents';

interface DocumentTab {
  id: string;
  name: string;
  type: string;
  size: string;
  content?: string;
  isActive: boolean;
}

export const ModernDocumentChat = () => {
  const [documentTabs, setDocumentTabs] = useState<DocumentTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  
  const { agents } = useChatAgents();
  const {
    selectedAgent,
    currentMessages,
    isAgentTyping,
    error,
    setSelectedAgent,
    sendMessage,
    clearError
  } = useDocumentChatStore();

  // Mock documents
  const availableDocuments = [
    { id: "1", name: "Project Proposal.docx", type: "Word Document", size: "2.4 MB" },
    { id: "2", name: "Financial Report Q3.xlsx", type: "Excel Spreadsheet", size: "1.8 MB" },
    { id: "3", name: "Contract Terms.pdf", type: "PDF Document", size: "856 KB" },
    { id: "4", name: "Meeting Notes.docx", type: "Word Document", size: "1.2 MB" },
  ];

  useEffect(() => {
    if (!selectedAgent && agents.length > 0) {
      setSelectedAgent(agents[0]);
    }
  }, [agents, selectedAgent, setSelectedAgent]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleAddDocument = (doc: any) => {
    const newTab: DocumentTab = {
      id: doc.id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      isActive: true,
      content: `This is a preview of ${doc.name}. Full document content would be loaded here...`
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
    
    await sendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string | Date) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const activeTab = documentTabs.find(tab => tab.id === activeTabId);

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Chat</h1>
          <p className="text-gray-600">Chat with your documents using AI agents</p>
        </div>
        <div className="flex items-center gap-4">
          {selectedAgent && (
            <Badge variant="secondary" className={selectedAgent.color}>
              {selectedAgent.icon} {selectedAgent.name}
            </Badge>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Document Tabs */}
      {documentTabs.length > 0 && (
        <Tabs value={activeTabId || ''} onValueChange={setActiveTabId}>
          <TabsList className="w-full justify-start">
            {documentTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="max-w-32 truncate">{tab.name}</span>
                <X 
                  className="h-3 w-3 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTab(tab.id);
                  }}
                />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {documentTabs.length === 0 ? (
          /* No Documents State */
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center space-y-4">
              <FileText className="h-16 w-16 text-gray-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">No Documents Selected</h3>
                <p className="text-gray-600 mb-4">Choose documents to start chatting</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {availableDocuments.map((doc) => (
                    <Button
                      key={doc.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddDocument(doc)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      {doc.name}
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
            <ResizablePanel defaultSize={40} minSize={30}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {activeTab?.name}
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    {activeTab?.type} • {activeTab?.size}
                  </div>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                  <ScrollArea className="h-full">
                    <div className="p-4 bg-gray-50 rounded border text-sm">
                      {activeTab?.content}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle />

            {/* Chat Panel */}
            <ResizablePanel defaultSize={60} minSize={40}>
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Chat
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4">
                      {currentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Avatar className="w-8 h-8">
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
                            <div className={`p-3 rounded-lg ${
                              msg.role === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                              <span className={`text-xs block mt-1 ${
                                msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {formatTimestamp(msg.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isAgentTyping && (
                        <div className="flex gap-3 justify-start">
                          <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gray-600 text-white">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about the document..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isAgentTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>

      {/* Quick Add Documents */}
      {documentTabs.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Add more documents:</span>
          {availableDocuments
            .filter(doc => !documentTabs.find(tab => tab.id === doc.id))
            .map((doc) => (
              <Button
                key={doc.id}
                variant="outline"
                size="sm"
                onClick={() => handleAddDocument(doc)}
                className="flex items-center gap-1"
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
