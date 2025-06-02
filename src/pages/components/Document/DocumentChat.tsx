
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Send, 
  FileText, 
  MessageSquare, 
  Bot, 
  User,
  Upload,
  Search,
  X,
  Files,
  History,
  Settings,
  Sparkles,
  Brain,
  Clock
} from "lucide-react";

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  documentRefs?: string[];
  agentPersonality?: string;
}

interface ChatHistory {
  documentId: string;
  documentName: string;
  messages: ChatMessage[];
  lastActivity: string;
}

interface Agent {
  id: string;
  name: string;
  personality: string;
  description: string;
  icon: string;
  color: string;
}

export const DocumentChat = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const documents = [
    { id: 1, name: "Project Proposal.docx", type: "Word Document", size: "2.4 MB" },
    { id: 2, name: "Financial Report Q3.xlsx", type: "Excel Spreadsheet", size: "1.8 MB" },
    { id: 3, name: "Presentation Deck.pptx", type: "PowerPoint", size: "15.2 MB" },
    { id: 4, name: "Contract Terms.pdf", type: "PDF Document", size: "856 KB" },
    { id: 5, name: "Meeting Notes.docx", type: "Word Document", size: "1.2 MB" },
    { id: 6, name: "Budget Analysis.xlsx", type: "Excel Spreadsheet", size: "890 KB" },
  ];

  const agents: Agent[] = [
    {
      id: 'professional',
      name: 'Professional Assistant',
      personality: 'formal',
      description: 'Formal, detailed responses with professional language',
      icon: '👔',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'creative',
      name: 'Creative Helper',
      personality: 'creative',
      description: 'Imaginative, engaging responses with creative insights',
      icon: '🎨',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'analytical',
      name: 'Data Analyst',
      personality: 'analytical',
      description: 'Data-driven responses with charts and insights',
      icon: '📊',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'casual',
      name: 'Friendly Buddy',
      personality: 'casual',
      description: 'Casual, conversational tone with simple explanations',
      icon: '😊',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  // Initialize with default agent and welcome message
  useEffect(() => {
    if (!selectedAgent) {
      setSelectedAgent(agents[0]);
      setCurrentMessages([
        {
          id: 1,
          type: 'ai',
          message: 'Hello! I\'m your professional assistant. I can help you analyze and answer questions about your documents. Please select one or more documents and I\'ll provide detailed insights.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentPersonality: 'professional'
        }
      ]);
    }
  }, []);

  // Load chat history when documents are selected
  useEffect(() => {
    if (selectedDocuments.length > 0) {
      const historyKey = selectedDocuments.sort().join(',');
      const existingHistory = chatHistories.find(h => h.documentId === historyKey);
      
      if (existingHistory) {
        setCurrentMessages(existingHistory.messages);
        setSelectedHistory(historyKey);
      } else {
        // Create new chat session
        const welcomeMessage: ChatMessage = {
          id: Date.now(),
          type: 'ai',
          message: `Great! I'm now analyzing ${selectedDocuments.length === 1 ? `"${selectedDocuments[0]}"` : `${selectedDocuments.length} documents`}. What would you like to know about ${selectedDocuments.length === 1 ? 'this document' : 'these documents'}?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          documentRefs: [...selectedDocuments],
          agentPersonality: selectedAgent?.personality
        };
        setCurrentMessages([welcomeMessage]);
        setSelectedHistory(historyKey);
      }
    }
  }, [selectedDocuments, selectedAgent]);

  const handleDocumentToggle = (docName: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docName) 
        ? prev.filter(name => name !== docName)
        : [...prev, docName]
    );
  };

  const handleRemoveDocument = (docName: string) => {
    setSelectedDocuments(prev => prev.filter(name => name !== docName));
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map(doc => doc.name));
    }
  };

  const handleAgentChange = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
      
      // Add agent switch message
      const switchMessage: ChatMessage = {
        id: Date.now(),
        type: 'ai',
        message: getAgentSwitchMessage(agent),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
        agentPersonality: agent.personality
      };
      
      setCurrentMessages(prev => [...prev, switchMessage]);
    }
  };

  const getAgentSwitchMessage = (agent: Agent) => {
    switch (agent.personality) {
      case 'professional':
        return 'I am now operating in professional mode. I will provide formal, detailed responses with comprehensive analysis.';
      case 'creative':
        return 'Hey there! 🎨 I\'ve switched to creative mode! Let\'s explore these documents with some fresh, imaginative perspectives!';
      case 'analytical':
        return 'Data mode activated! 📊 I\'ll focus on metrics, trends, and quantitative insights from your documents.';
      case 'casual':
        return 'Cool! 😊 I\'m now in casual mode - let\'s chat about your docs in a friendly, easy-going way!';
      default:
        return 'Agent mode updated successfully.';
    }
  };

  const getAgentResponse = (userMessage: string, agent: Agent) => {
    const baseResponse = selectedDocuments.length === 0 
      ? 'Please select one or more documents first so I can provide specific insights.'
      : selectedDocuments.length === 1
      ? `Based on "${selectedDocuments[0]}", here's what I found: ${userMessage.includes('summary') ? 'This document contains key information about project timelines and budget allocations...' : 'I can help you with specific questions about this document.'}`
      : `Analyzing ${selectedDocuments.length} documents (${selectedDocuments.slice(0, 2).join(', ')}${selectedDocuments.length > 2 ? ` and ${selectedDocuments.length - 2} more` : ''}): ${userMessage.includes('summary') ? 'I found common themes across these documents including budget considerations, project timelines, and strategic objectives...' : 'I can help you find connections and insights across these documents.'}`;

    // Customize response based on agent personality
    switch (agent.personality) {
      case 'professional':
        return `${baseResponse} I recommend reviewing the key metrics and ensuring alignment with organizational objectives.`;
      case 'creative':
        return `🌟 ${baseResponse} There are some really interesting patterns here that could spark new ideas!`;
      case 'analytical':
        return `📈 ${baseResponse} Let me break down the data points: 85% relevance score, 3 key themes identified, 7 actionable insights extracted.`;
      case 'casual':
        return `${baseResponse} Pretty cool stuff in there! Let me know if you want me to dive deeper into anything specific! 😄`;
      default:
        return baseResponse;
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedAgent) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
      agentPersonality: selectedAgent.personality
    };

    const updatedMessages = [...currentMessages, newUserMessage];
    setCurrentMessages(updatedMessages);
    setIsAgentTyping(true);

    // Simulate AI response with agent personality
    setTimeout(() => {
      const aiResponse = getAgentResponse(message, selectedAgent);
      
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
        agentPersonality: selectedAgent.personality
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setCurrentMessages(finalMessages);
      setIsAgentTyping(false);
      
      // Save to history
      saveToHistory(finalMessages);
    }, 1500);

    setMessage("");
  };

  const saveToHistory = (messages: ChatMessage[]) => {
    if (selectedDocuments.length === 0) return;
    
    const historyKey = selectedDocuments.sort().join(',');
    const documentName = selectedDocuments.length === 1 
      ? selectedDocuments[0] 
      : `${selectedDocuments.length} Documents`;
    
    setChatHistories(prev => {
      const existingIndex = prev.findIndex(h => h.documentId === historyKey);
      const newHistory: ChatHistory = {
        documentId: historyKey,
        documentName,
        messages,
        lastActivity: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newHistory;
        return updated;
      } else {
        return [...prev, newHistory];
      }
    });
  };

  const loadChatHistory = (historyId: string) => {
    const history = chatHistories.find(h => h.documentId === historyId);
    if (history) {
      setCurrentMessages(history.messages);
      setSelectedHistory(historyId);
      // Extract selected documents from history
      const docs = historyId.split(',');
      setSelectedDocuments(docs);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6">
      {/* Document Selection Panel */}
      <div className="w-80 space-y-4">
        {/* Agent Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedAgent?.id} onValueChange={handleAgentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{agent.icon}</span>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedAgent && (
              <div className={`p-3 rounded-lg ${selectedAgent.color}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedAgent.icon}</span>
                  <div>
                    <div className="font-medium">{selectedAgent.name}</div>
                    <div className="text-xs">{selectedAgent.description}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat History */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Chat History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-48 overflow-y-auto">
            {chatHistories.map((history) => (
              <div
                key={history.documentId}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedHistory === history.documentId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => loadChatHistory(history.documentId)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-sm">{history.documentName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{history.lastActivity}</span>
                  <span>•</span>
                  <span>{history.messages.length} messages</span>
                </div>
              </div>
            ))}
            {chatHistories.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                No chat history yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Files className="h-5 w-5" />
              Select Documents
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs"
              >
                {selectedDocuments.length === documents.length ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-xs text-gray-500">
                {selectedDocuments.length} of {documents.length} selected
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedDocuments.includes(doc.name)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDocumentToggle(doc.name)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Checkbox 
                      checked={selectedDocuments.includes(doc.name)}
                      onChange={() => handleDocumentToggle(doc.name)}
                    />
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-sm flex-1">{doc.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 ml-6">{doc.type} • {doc.size}</div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Document Chat
            {selectedAgent && (
              <Badge variant="secondary" className={selectedAgent.color}>
                {selectedAgent.icon} {selectedAgent.name}
              </Badge>
            )}
          </CardTitle>
          {selectedDocuments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDocuments.map((docName) => (
                <Badge key={docName} variant="secondary" className="flex items-center gap-1">
                  {docName.length > 20 ? `${docName.substring(0, 20)}...` : docName}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => handleRemoveDocument(docName)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`${
                      msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                    } text-white`}>
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <span className="text-sm">
                          {selectedAgent?.icon || <Bot className="h-4 w-4" />}
                        </span>
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    {msg.documentRefs && msg.documentRefs.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {msg.documentRefs.map((docRef, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className={`text-xs ${msg.type === 'user' ? 'border-blue-200 text-blue-100' : 'border-gray-300'}`}
                          >
                            <FileText className="h-2 w-2 mr-1" />
                            {docRef.length > 15 ? `${docRef.substring(0, 15)}...` : docRef}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <span className={`text-xs block mt-1 ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
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
                      <span className="text-sm">
                        {selectedAgent?.icon || <Bot className="h-4 w-4" />}
                      </span>
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

          <Separator className="my-4" />

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder={
                selectedDocuments.length === 0 
                  ? "Select documents first..." 
                  : selectedDocuments.length === 1
                  ? "Ask a question about the document..."
                  : `Ask a question about ${selectedDocuments.length} documents...`
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={selectedDocuments.length === 0 || isAgentTyping}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim() || selectedDocuments.length === 0 || isAgentTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
