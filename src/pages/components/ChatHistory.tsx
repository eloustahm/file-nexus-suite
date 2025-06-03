
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, 
  Search, 
  MessageSquare, 
  FileText, 
  Calendar,
  Filter,
  Trash2,
  Eye,
  Clock,
  Users
} from "lucide-react";
import { useDocumentChatStore } from "@/store/useDocumentChatStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const ChatHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'archived'>('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    chatHistories,
    loading,
    error,
    loadChatHistory,
    clearError
  } = useDocumentChatStore();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const filteredHistories = chatHistories.filter(history => {
    const matchesSearch = history.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         history.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'recent') {
      const isRecent = new Date().getTime() - history.timestamp.getTime() < 86400000 * 7; // 7 days
      return matchesSearch && isRecent;
    }
    
    return matchesSearch;
  });

  const handleResumeChat = (historyId: string) => {
    loadChatHistory(historyId);
    navigate('/documents/chat');
    toast({
      title: "Chat resumed",
      description: "Previous conversation has been restored",
    });
  };

  const handleDeleteChat = (historyId: string) => {
    // TODO: Implement delete functionality
    toast({
      title: "Chat deleted",
      description: "Chat history has been removed",
    });
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Recently';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chat History</h1>
          <p className="text-gray-600 mt-1">Browse and manage your document conversations</p>
        </div>
        <Button onClick={() => navigate('/documents/chat')}>
          <MessageSquare className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {error && (
        <div className="text-red-600 text-center py-4">
          <p>Error loading chat history: {error}</p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={filterType} onValueChange={(value: 'all' | 'recent' | 'archived') => setFilterType(value)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chat History List */}
      <div className="space-y-4">
        {filteredHistories.map((history) => (
          <Card key={history.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <MessageSquare className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{history.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {history.messageCount} messages
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2 text-sm">
                      {history.lastMessage}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{history.documentName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeAgo(history.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{history.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleResumeChat(history.id)}
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Resume
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteChat(history.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistories.length === 0 && (
        <div className="text-center py-12">
          <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No matching conversations' : 'No chat history yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? "Try adjusting your search terms or filters" 
              : "Start chatting with documents to see your conversation history here"
            }
          </p>
          <Button onClick={() => navigate('/documents/chat')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Start New Chat
          </Button>
        </div>
      )}
    </div>
  );
};
