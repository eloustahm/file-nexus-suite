
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, X } from "lucide-react";
import { ChatMessage, Document, Agent } from './types/chatTypes';
import { useChatAgents } from '@/hooks/useChatAgents';
import { useChatHistory } from '@/hooks/useChatHistory';
import { AgentSelector } from './components/AgentSelector';
import { ChatHistoryPanel } from './components/ChatHistoryPanel';
import { DocumentSelector } from './components/DocumentSelector';
import { ChatMessages } from './components/ChatMessages';
import { MessageInput } from './components/MessageInput';

export const DocumentChat = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const {
    agents,
    selectedAgent,
    setSelectedAgent,
    getAgentSwitchMessage,
    getAgentResponse
  } = useChatAgents();

  const {
    chatHistories,
    selectedHistory,
    setSelectedHistory,
    saveToHistory,
    loadChatHistory
  } = useChatHistory();

  const documents: Document[] = [
    { id: "1", name: "Project Proposal.docx", type: "Word Document", size: "2.4 MB" },
    { id: "2", name: "Financial Report Q3.xlsx", type: "Excel Spreadsheet", size: "1.8 MB" },
    { id: "3", name: "Presentation Deck.pptx", type: "PowerPoint", size: "15.2 MB" },
    { id: "4", name: "Contract Terms.pdf", type: "PDF Document", size: "856 KB" },
    { id: "5", name: "Meeting Notes.docx", type: "Word Document", size: "1.2 MB" },
    { id: "6", name: "Budget Analysis.xlsx", type: "Excel Spreadsheet", size: "890 KB" },
  ];

  // Initialize with default agent and welcome message
  useEffect(() => {
    if (!selectedAgent && agents.length > 0) {
      setSelectedAgent(agents[0]);
      setCurrentMessages([
        {
          id: "1",
          content: 'Hello! I\'m your professional assistant. I can help you analyze and answer questions about your documents. Please select one or more documents and I\'ll provide detailed insights.',
          role: 'assistant',
          timestamp: new Date(),
          type: 'ai',
          message: 'Hello! I\'m your professional assistant. I can help you analyze and answer questions about your documents. Please select one or more documents and I\'ll provide detailed insights.',
          agentPersonality: 'professional'
        }
      ]);
    }
  }, [agents, selectedAgent, setSelectedAgent]);

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
          id: Date.now().toString(),
          content: `Great! I'm now analyzing ${selectedDocuments.length === 1 ? `"${selectedDocuments[0]}"` : `${selectedDocuments.length} documents`}. What would you like to know about ${selectedDocuments.length === 1 ? 'this document' : 'these documents'}?`,
          role: 'assistant',
          timestamp: new Date(),
          type: 'ai',
          message: `Great! I'm now analyzing ${selectedDocuments.length === 1 ? `"${selectedDocuments[0]}"` : `${selectedDocuments.length} documents`}. What would you like to know about ${selectedDocuments.length === 1 ? 'this document' : 'these documents'}?`,
          documentRefs: [...selectedDocuments],
          agentPersonality: selectedAgent?.personality
        };
        setCurrentMessages([welcomeMessage]);
        setSelectedHistory(historyKey);
      }
    }
  }, [selectedDocuments, selectedAgent, chatHistories, setSelectedHistory]);

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

  const handleAgentChange = (agent: Agent) => {
    setSelectedAgent(agent);

    // Add agent switch message
    const switchMessage: ChatMessage = {
      id: Date.now().toString(),
      content: getAgentSwitchMessage(agent),
      role: 'assistant',
      timestamp: new Date(),
      type: 'ai',
      message: getAgentSwitchMessage(agent),
      documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
      agentPersonality: agent.personality
    };

    setCurrentMessages(prev => [...prev, switchMessage]);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedAgent) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
      type: 'user',
      message: message,
      documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
      agentPersonality: selectedAgent.personality
    };

    const updatedMessages = [...currentMessages, newUserMessage];
    setCurrentMessages(updatedMessages);
    setIsAgentTyping(true);

    // Simulate AI response with agent personality
    setTimeout(() => {
      const aiResponse = getAgentResponse(message, selectedAgent, selectedDocuments);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        type: 'ai',
        message: aiResponse,
        documentRefs: selectedDocuments.length > 0 ? [...selectedDocuments] : undefined,
        agentPersonality: selectedAgent.personality
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setCurrentMessages(finalMessages);
      setIsAgentTyping(false);

      // Save to history
      saveToHistory(finalMessages, selectedDocuments);
    }, 1500);

    setMessage("");
  };

  const handleLoadHistory = (historyId: string) => {
    const result = loadChatHistory(historyId);
    if (result) {
      setCurrentMessages(result.messages);
      setSelectedDocuments(result.documents);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6">
      {/* Document Selection Panel */}
      <div className="w-80 space-y-4">
        <AgentSelector
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentChange={handleAgentChange}
        />

        <ChatHistoryPanel
          chatHistories={chatHistories}
          selectedHistory={selectedHistory}
          onLoadHistory={handleLoadHistory}
        />

        <DocumentSelector
          documents={documents}
          selectedDocuments={selectedDocuments}
          onDocumentToggle={handleDocumentToggle}
          onSelectAll={handleSelectAll}
        />
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
          <ChatMessages
            messages={currentMessages}
            selectedAgent={selectedAgent}
            isAgentTyping={isAgentTyping}
          />

          <Separator className="my-4" />

          <MessageInput
            message={message}
            selectedDocuments={selectedDocuments}
            isAgentTyping={isAgentTyping}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
};
