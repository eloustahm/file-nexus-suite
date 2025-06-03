
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Users, Settings, Plus } from "lucide-react";
import { TeamChat } from "./TeamChat";
import { TeamMembers } from "./TeamMembers";
import { TeamSettings } from "./TeamSettings";
import { useTeamChatStore } from "@/store/useTeamChatStore";
import { useToast } from "@/hooks/use-toast";

export const TeamCollaboration = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [newChatType, setNewChatType] = useState<'group' | 'project'>('group');
  
  const { createRoom } = useTeamChatStore();
  const { toast } = useToast();

  const handleCreateNewChat = async () => {
    if (!newChatName.trim()) return;

    try {
      await createRoom(newChatName, ['current-user'], newChatType);
      setNewChatName("");
      setNewChatType('group');
      setIsNewChatOpen(false);
      
      toast({
        title: "Chat room created",
        description: `Created new ${newChatType} chat: ${newChatName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create chat room",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Collaboration</h1>
          <p className="text-gray-600 mt-1">Collaborate with your team members</p>
        </div>
        
        {activeTab === "chat" && (
          <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Create New Chat Room</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chatName">Chat Room Name</Label>
                  <Input
                    id="chatName"
                    placeholder="Enter chat room name"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="chatType">Room Type</Label>
                  <Select value={newChatType} onValueChange={(value: 'group' | 'project') => setNewChatType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="group">Group Chat</SelectItem>
                      <SelectItem value="project">Project Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateNewChat} className="w-full">
                  Create Chat Room
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Team Chat
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-6">
          <TeamChat />
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <TeamMembers />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <TeamSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
