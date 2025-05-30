
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  FileText, 
  MessageSquare, 
  Bot, 
  User,
  Upload,
  Search
} from "lucide-react";

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  documentRef?: string;
}

export const DocumentChat = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I can help you analyze and answer questions about your documents. Please select a document to get started.',
      timestamp: '10:30 AM'
    }
  ]);

  const documents = [
    { id: 1, name: "Project Proposal.docx", type: "Word Document", size: "2.4 MB" },
    { id: 2, name: "Financial Report Q3.xlsx", type: "Excel Spreadsheet", size: "1.8 MB" },
    { id: 3, name: "Presentation Deck.pptx", type: "PowerPoint", size: "15.2 MB" },
    { id: 4, name: "Contract Terms.pdf", type: "PDF Document", size: "856 KB" },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      documentRef: selectedDocument || undefined
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'ai',
        message: selectedDocument 
          ? `Based on the document "${selectedDocument}", here's what I found: ${message.includes('summary') ? 'This document contains key information about project timelines and budget allocations...' : 'I can help you with specific questions about this document. What would you like to know?'}`
          : 'Please select a document first so I can provide specific insights.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6">
      {/* Document Selection Panel */}
      <div className="w-80">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Select Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedDocument === doc.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDocument(doc.name)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-sm">{doc.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
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
            {selectedDocument && (
              <Badge variant="secondary" className="ml-2">
                {selectedDocument}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {msg.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <span className={`text-xs ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder={selectedDocument ? "Ask a question about the document..." : "Select a document first..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!selectedDocument}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim() || !selectedDocument}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
