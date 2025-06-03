
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreferences {
  email: {
    documentShared: boolean;
    documentUpdated: boolean;
    teamInvite: boolean;
    systemUpdates: boolean;
    weeklyDigest: boolean;
  };
  push: {
    newMessages: boolean;
    documentComments: boolean;
    teamActivity: boolean;
    mentions: boolean;
  };
  frequency: 'instant' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export const NotificationSettings = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      documentShared: true,
      documentUpdated: true,
      teamInvite: true,
      systemUpdates: false,
      weeklyDigest: true,
    },
    push: {
      newMessages: true,
      documentComments: true,
      teamActivity: false,
      mentions: true,
    },
    frequency: 'instant',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
  });

  const { toast } = useToast();

  const handleEmailToggle = (key: keyof typeof preferences.email, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      email: { ...prev.email, [key]: value }
    }));
  };

  const handlePushToggle = (key: keyof typeof preferences.push, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      push: { ...prev.push, [key]: value }
    }));
  };

  const handleSave = () => {
    // API call to save preferences
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Document Shared</Label>
              <p className="text-sm text-gray-600">When someone shares a document with you</p>
            </div>
            <Switch
              checked={preferences.email.documentShared}
              onCheckedChange={(checked) => handleEmailToggle('documentShared', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Document Updated</Label>
              <p className="text-sm text-gray-600">When a shared document is modified</p>
            </div>
            <Switch
              checked={preferences.email.documentUpdated}
              onCheckedChange={(checked) => handleEmailToggle('documentUpdated', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Team Invitations</Label>
              <p className="text-sm text-gray-600">When you're invited to join a team</p>
            </div>
            <Switch
              checked={preferences.email.teamInvite}
              onCheckedChange={(checked) => handleEmailToggle('teamInvite', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>System Updates</Label>
              <p className="text-sm text-gray-600">Product updates and announcements</p>
            </div>
            <Switch
              checked={preferences.email.systemUpdates}
              onCheckedChange={(checked) => handleEmailToggle('systemUpdates', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Digest</Label>
              <p className="text-sm text-gray-600">Weekly summary of your activity</p>
            </div>
            <Switch
              checked={preferences.email.weeklyDigest}
              onCheckedChange={(checked) => handleEmailToggle('weeklyDigest', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Messages</Label>
              <p className="text-sm text-gray-600">Team chat messages and direct messages</p>
            </div>
            <Switch
              checked={preferences.push.newMessages}
              onCheckedChange={(checked) => handlePushToggle('newMessages', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Document Comments</Label>
              <p className="text-sm text-gray-600">Comments on your documents</p>
            </div>
            <Switch
              checked={preferences.push.documentComments}
              onCheckedChange={(checked) => handlePushToggle('documentComments', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Team Activity</Label>
              <p className="text-sm text-gray-600">General team activity updates</p>
            </div>
            <Switch
              checked={preferences.push.teamActivity}
              onCheckedChange={(checked) => handlePushToggle('teamActivity', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Mentions</Label>
              <p className="text-sm text-gray-600">When you're mentioned in chats or comments</p>
            </div>
            <Switch
              checked={preferences.push.mentions}
              onCheckedChange={(checked) => handlePushToggle('mentions', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email Frequency</Label>
            <Select 
              value={preferences.frequency} 
              onValueChange={(value: 'instant' | 'daily' | 'weekly') => 
                setPreferences(prev => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="daily">Daily digest</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Quiet Hours</Label>
              <p className="text-sm text-gray-600">Pause notifications during these hours</p>
            </div>
            <Switch
              checked={preferences.quietHours.enabled}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ 
                  ...prev, 
                  quietHours: { ...prev.quietHours, enabled: checked }
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Notification Preferences
      </Button>
    </div>
  );
};
