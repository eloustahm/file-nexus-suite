
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  message: string;
  selectedDocuments: string[];
  isAgentTyping: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export const MessageInput = ({ 
  message, 
  selectedDocuments, 
  isAgentTyping, 
  onMessageChange, 
  onSendMessage 
}: MessageInputProps) => {
  return (
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
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
        disabled={selectedDocuments.length === 0 || isAgentTyping}
        className="flex-1"
      />
      <Button 
        onClick={onSendMessage} 
        disabled={!message.trim() || selectedDocuments.length === 0 || isAgentTyping}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
