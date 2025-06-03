
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
  Eye
} from "lucide-react";
import { useDocumentChatStore } from "@/store/useDocumentChatStore";
import { useToast } from "@/hooks/use-toast";

export const ChatHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'archived'>('all');
  const { toast } = useToast();

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

  const handlePreviewChat = (historyId: string) => {
    loadChatHistory(historyId);
    toast({
      title: "Chat loaded",
      description: "Previous conversation has been restored",
    });
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chat History</h1>
        <p className="text-gray-600 mt-1">Browse and manage your previous document conversations</p>
      </div>

      {error && (
        <div className="text-red-600 text-center py-4">
          <p>Error loading chat history: {error}</p>
        </div>
      )}

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHistories.map((history) => (
          <Card key={history.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {history.name}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {history.messageCount} msgs
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {history.lastMessage}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{history.timestamp.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{history.lastActivity}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span className="text-xs text-gray-500">
                      {history.documentName}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePreviewChat(history.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistories.length === 0 && (
        <div className="text-center py-12">
          <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No chat history found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "Start a conversation to see your chat history"}
          </p>
        </div>
      )}
    </div>
  );
};
