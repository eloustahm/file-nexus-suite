
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, X } from "lucide-react";
import { useChatAgents } from '@/hooks/useChatAgents';
import { useDocumentChatStore } from '@/store/useDocumentChatStore';
import { AgentSelector } from './components/AgentSelector';
import { ChatHistoryPanel } from './components/ChatHistoryPanel';
import { DocumentSelector } from './components/DocumentSelector';
import { ChatMessages } from './components/ChatMessages';
import { MessageInput } from './components/MessageInput';
import type { Agent } from '@/types';

export const DocumentChat = () => {
  const { agents } = useChatAgents();
  
  const {
    selectedDocuments,
    currentMessages,
    selectedAgent,
    isAgentTyping,
    chatHistories,
    selectedHistory,
    loading,
    error,
    setSelectedDocuments,
    addDocument,
    removeDocument,
    setSelectedAgent,
    sendMessage,
    loadChatHistory,
    clearError
  } = useDocumentChatStore();

  // Mock documents data
  const documents = [
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
      // Convert agent to match unified type
      const unifiedAgent: Agent = {
        ...agents[0],
        isActive: true,
        personality: agents[0].personality || agents[0].description
      };
      setSelectedAgent(unifiedAgent);
    }
  }, [agents, selectedAgent, setSelectedAgent]);

  const handleDocumentToggle = (docName: string) => {
    if (selectedDocuments.includes(docName)) {
      removeDocument(docName);
    } else {
      addDocument(docName);
    }
  };

  const handleRemoveDocument = (docName: string) => {
    removeDocument(docName);
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map(doc => doc.name));
    }
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  const handleLoadHistory = (historyId: string) => {
    loadChatHistory(historyId);
  };

  const handleAgentChange = (agent: any) => {
    // Convert to unified Agent type
    const unifiedAgent: Agent = {
      ...agent,
      isActive: true,
      personality: agent.personality || agent.description
    };
    setSelectedAgent(unifiedAgent);
  };

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

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
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
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
            message=""
            selectedDocuments={selectedDocuments}
            isAgentTyping={isAgentTyping || loading}
            onMessageChange={() => {}}
            onSendMessage={handleSendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
};
