
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Users, 
  Hash,
  Paperclip,
  Smile
} from "lucide-react";
import { useTeamChatStore } from "@/store/useTeamChatStore";

export const TeamChat = () => {
  const [newMessage, setNewMessage] = useState("");
  
  const {
    rooms,
    activeRoom,
    messages,
    loading,
    error,
    isTyping,
    fetchRooms,
    setActiveRoom,
    sendMessage,
    clearError
  } = useTeamChatStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeRoom) return;
    
    await sendMessage(activeRoom.id, newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Chat Rooms Sidebar */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Team Chat
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  activeRoom?.id === room.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveRoom(room)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {room.type === 'group' ? (
                      <Hash className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Users className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="font-medium text-sm">{room.name}</span>
                  </div>
                  {room.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {room.unreadCount}
                    </Badge>
                  )}
                </div>
                {room.lastMessage && (
                  <p className="text-xs text-gray-600 truncate">
                    {room.lastMessage.senderName}: {room.lastMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        {activeRoom ? (
          <>
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {activeRoom.type === 'group' ? (
                      <Hash className="h-5 w-5" />
                    ) : (
                      <Users className="h-5 w-5" />
                    )}
                    {activeRoom.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {activeRoom.participants.length} members
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  View Members
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(messages[activeRoom.id] || []).map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>
                        {message.senderName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.senderName}</span>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      {message.type === 'file' ? (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                          <Paperclip className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {message.fileName}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-900">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping[activeRoom.id]?.length > 0 && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>...</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {isTyping[activeRoom.id].join(', ')} typing...
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      placeholder={`Message #${activeRoom.name}`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat room</h3>
              <p className="text-gray-500">Choose a room from the sidebar to start chatting</p>
            </div>
          </CardContent>
        )}

        {error && (
          <div className="p-4 bg-red-50 border-t border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </Card>
    </div>
  );
};
