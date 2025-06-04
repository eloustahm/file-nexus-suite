
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatHistory } from '@/types';

interface ChatHistoryPanelProps {
  chatHistories: ChatHistory[];
  selectedHistory: string | null;
  onLoadHistory: (historyId: string) => void;
}

export const ChatHistoryPanel = ({ chatHistories, selectedHistory, onLoadHistory }: ChatHistoryPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {chatHistories.map((history) => (
          <div
            key={history.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedHistory === history.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onLoadHistory(history.id)}
          >
            <div className="font-medium text-sm">{history.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {history.messageCount} messages
            </div>
          </div>
        ))}
        {chatHistories.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No chat history yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
