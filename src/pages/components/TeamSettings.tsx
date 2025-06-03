
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Shield, 
  Users, 
  Bell,
  Lock,
  Globe,
  UserCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamCollaborationStore } from "@/store/useTeamCollaborationStore";

export const TeamSettings = () => {
  const { toast } = useToast();
  
  const {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    clearError
  } = useTeamCollaborationStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSaveSettings = async () => {
    try {
      await updateSettings(settings);
      toast({
        title: "Settings saved",
        description: "Team settings have been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    }
  };

  const updateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    updateSettings({ [key]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading team settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-red-600 text-center py-4">
          <p>Error loading team settings: {error}</p>
        </div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={settings.teamName}
                  onChange={(e) => updateSetting('teamName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="teamDescription">Team Description</Label>
                <Input
                  id="teamDescription"
                  value={settings.teamDescription}
                  onChange={(e) => updateSetting('teamDescription', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="visibility">Team Visibility</Label>
                <Select value={settings.visibility} onValueChange={(value: 'private' | 'public') => updateSetting('visibility', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Private - Invite only
                      </div>
                    </SelectItem>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Public - Anyone can join
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maxMembers">Maximum Members</Label>
                <Input
                  id="maxMembers"
                  type="number"
                  value={settings.maxMembers}
                  onChange={(e) => updateSetting('maxMembers', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Member Invites</Label>
                  <p className="text-sm text-gray-600">Allow team members to invite others</p>
                </div>
                <Switch
                  checked={settings.allowInvites}
                  onCheckedChange={(checked) => updateSetting('allowInvites', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Approval</Label>
                  <p className="text-sm text-gray-600">New members need admin approval</p>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
                />
              </div>
              <div>
                <Label htmlFor="defaultRole">Default Role for New Members</Label>
                <Select value={settings.defaultRole} onValueChange={(value: 'viewer' | 'editor') => updateSetting('defaultRole', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Viewer - Read only access
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Editor - Can create and edit
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Require 2FA for all team members</p>
                </div>
                <Switch
                  checked={settings.enableTwoFactor}
                  onCheckedChange={(checked) => updateSetting('enableTwoFactor', checked)}
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Automatically log out inactive users after this time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Team Notifications</Label>
                  <p className="text-sm text-gray-600">Send notifications for team activities</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => updateSetting('enableNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </Tabs>
    </div>
  );
};
