
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Send, 
  FileText, 
  MessageSquare, 
  Bot, 
  User,
  Upload,
  Search,
  X,
  Files
} from "lucide-react";

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  documentRefs?: string[];
}

export const DocumentChat = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I can help you analyze and answer questions about your documents. Please select one or more documents to get started.',
      timestamp: '10:30 AM'
    }
  ]);

  const documents = [
    { id: 1, name: "Project Proposal.docx", type: "Word Document", size: "2.4 MB" },
    { id: 2, name: "Financial Report Q3.xlsx", type: "Excel Spreadsheet", size: "1.8 MB" },
    { id: 3, name: "Presentation Deck.pptx", type: "PowerPoint", size: "15.2 MB" },
    { id: 4, name: "Contract Terms.pdf", type: "PDF Document", size: "856 KB" },
    { id: 5, name: "Meeting Notes.docx", type: "Word Document", size: "1.2 MB" },
    { id: 6, name: "Budget Analysis.xlsx", type: "Excel Spreadsheet", size: "890 KB" },
  ];

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

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      
      if (selectedDocuments.length === 0) {
        aiResponse = 'Please select one or more documents first so I can provide specific insights.';
      } else if (selectedDocuments.length === 1) {
        aiResponse = `Based on "${selectedDocuments[0]}", here's what I found: ${message.includes('summary') ? 'This document contains key information about project timelines and budget allocations...' : 'I can help you with specific questions about this document.'}`;
      } else {
        aiResponse = `Analyzing ${selectedDocuments.length} documents (${selectedDocuments.slice(0, 2).join(', ')}${selectedDocuments.length > 2 ? ` and ${selectedDocuments.length - 2} more` : ''}): ${message.includes('summary') ? 'I found common themes across these documents including budget considerations, project timelines, and strategic objectives...' : 'I can help you find connections and insights across these documents.'}`;
      }

      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined
      };
      setMessages(prev => [...prev, aiMessage]);
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
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
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
              disabled={selectedDocuments.length === 0}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim() || selectedDocuments.length === 0}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
