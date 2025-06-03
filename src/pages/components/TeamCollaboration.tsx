
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Settings } from "lucide-react";
import { TeamChat } from "./TeamChat";
import { TeamMembers } from "./TeamMembers";
import { TeamSettings } from "./TeamSettings";

export const TeamCollaboration = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team Collaboration</h1>
        <p className="text-gray-600 mt-1">Collaborate with your team members</p>
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
