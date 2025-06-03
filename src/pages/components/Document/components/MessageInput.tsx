
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  message: string;
  selectedDocuments: string[];
  isAgentTyping: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: (message: string) => void;
}

export const MessageInput = ({ 
  selectedDocuments, 
  isAgentTyping, 
  onSendMessage 
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={selectedDocuments.length === 0 || isAgentTyping}
        className="flex-1"
      />
      <Button 
        onClick={handleSend} 
        disabled={!message.trim() || selectedDocuments.length === 0 || isAgentTyping}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
