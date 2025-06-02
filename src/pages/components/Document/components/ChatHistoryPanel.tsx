
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, MessageSquare, Clock } from "lucide-react";
import { ChatHistory } from '../types/chatTypes';

interface ChatHistoryPanelProps {
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
  onLoadHistory: (historyId: string) => void;
}

export const ChatHistoryPanel = ({ chatHistories, selectedHistory, onLoadHistory }: ChatHistoryPanelProps) => {
  return (
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
            onClick={() => onLoadHistory(history.documentId)}
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
  );
};
