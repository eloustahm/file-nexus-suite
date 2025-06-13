import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Users, Plus, Hash } from 'lucide-react';
import { useTeamChatQuery } from '@/hooks/queries/useTeamChatQuery';

export const TeamChat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const {
    rooms,
    messages,
    isLoading,
    createRoom,
    sendMessage
  } = useTeamChatQuery();

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRoomId) return;
    
    try {
      await sendMessage({
        roomId: selectedRoomId,
        content: newMessage
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    
    try {
      await createRoom({
        name: newRoomName,
        members: [],
        type: 'group'
      });
      setNewRoomName('');
      setShowCreateRoom(false);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentMessages = selectedRoomId ? messages[selectedRoomId] || [] : [];
  const selectedRoom = rooms.find(room => room.id === selectedRoomId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Rooms Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Rooms
            </CardTitle>
            <Button size="sm" onClick={() => setShowCreateRoom(!showCreateRoom)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {showCreateRoom && (
            <div className="space-y-2">
              <Input
                placeholder="Room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleCreateRoom}>
                  Create
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowCreateRoom(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedRoomId === room.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedRoomId(room.id)}
            >
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{room.name}</span>
                <Badge variant="outline" className="text-xs">
                  {room.members.length}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {room.description || 'No description'}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {selectedRoom ? (
              <>
                <Hash className="h-5 w-5" />
                {selectedRoom.name}
                <div className="flex items-center gap-2 ml-auto">
                  <Users className="h-4 w-4" />
                  <span className="text-sm text-gray-600">{selectedRoom.members.length} members</span>
                </div>
              </>
            ) : (
              'Select a room to start chatting'
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[480px]">
          {!selectedRoom ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No room selected</h3>
                <p className="text-gray-600">Choose a room from the sidebar to start chatting.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {currentMessages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">
                        {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.senderName}</span>
                        <span className="text-xs text-gray-500">{formatTime(message.createdAt)}</span>
                      </div>
                      <div className="text-sm text-gray-900">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
