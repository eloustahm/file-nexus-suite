
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Bot, FileText } from "lucide-react";
import { ChatMessage, Agent } from '../types/chatTypes';

interface ChatMessagesProps {
  messages: ChatMessage[];
  selectedAgent: Agent | null;
  isAgentTyping: boolean;
}

export const ChatMessages = ({ messages, selectedAgent, isAgentTyping }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Avatar className="w-8 h-8">
              <AvatarFallback className={`${
                msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'
              } text-white`}>
                {msg.type === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <span className="text-sm">
                    {selectedAgent?.icon || <Bot className="h-4 w-4" />}
                  </span>
                )}
              </AvatarFallback>
            </Avatar>
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
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Typing Indicator */}
      {isAgentTyping && (
        <div className="flex gap-3 justify-start">
          <div className="flex gap-3 max-w-[80%]">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gray-600 text-white">
                <span className="text-sm">
                  {selectedAgent?.icon || <Bot className="h-4 w-4" />}
                </span>
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
