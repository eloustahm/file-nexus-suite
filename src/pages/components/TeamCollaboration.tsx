import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTeamCollaboration } from '@/hooks/useTeamCollaboration';
import { 
  Users, 
  Settings, 
  UserPlus, 
  Trash2, 
  Shield
} from 'lucide-react';

export const TeamCollaboration = () => {
  const [activeTab, setActiveTab] = useState("members");
  const { toast } = useToast();
  const {
    members,
    settings,
    isLoadingMembers,
    isLoadingSettings,
    membersError,
    settingsError,
    inviteMember,
    updateMemberRole,
    updateSettings,
    showInviteModal,
    showSettingsModal,
    showDeleteMemberConfirm,
    isEditingSettings,
    unsavedChanges,
    setShowInviteModal,
    setShowSettingsModal,
    setShowDeleteMemberConfirm,
    setIsEditingSettings,
    setUnsavedChanges,
    reset
  } = useTeamCollaboration();

  const handleInviteMember = async (data: { email: string; role: string }) => {
    try {
      await inviteMember(data);
      setShowInviteModal(false);
      toast({
        title: "Success",
        description: "Member invited successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to invite member",
        variant: "destructive"
      });
    }
  };

  const handleUpdateMemberRole = async (memberId: string, role: string) => {
    try {
      await updateMemberRole({ memberId, role });
      toast({
        title: "Success",
        description: "Member role updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member role",
        variant: "destructive"
      });
    }
  };

  const handleUpdateSettings = async (newSettings: Partial<typeof settings>) => {
    try {
      await updateSettings(newSettings);
      setIsEditingSettings(false);
      setUnsavedChanges(false);
      toast({
        title: "Success",
        description: "Team settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Collaboration</CardTitle>
          <CardDescription>
            Manage your team members and collaboration settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="members">
                <Users className="w-4 h-4 mr-2" />
                Members
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button onClick={() => setShowInviteModal(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>

                {isLoadingMembers ? (
                  <div>Loading members...</div>
                ) : membersError ? (
                  <div className="text-red-500">{membersError}</div>
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateMemberRole(member.id, member.role === 'admin' ? 'member' : 'admin')}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            {member.role === 'admin' ? 'Demote' : 'Promote'}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setShowDeleteMemberConfirm(member.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Settings</h3>
                  <Button
                    variant={isEditingSettings ? "default" : "outline"}
                    onClick={() => setIsEditingSettings(!isEditingSettings)}
                  >
                    {isEditingSettings ? "Cancel" : "Edit Settings"}
                  </Button>
                </div>

                {isLoadingSettings ? (
                  <div>Loading settings...</div>
                ) : settingsError ? (
                  <div className="text-red-500">{settingsError}</div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Team Name</Label>
                        <Input
                          value={settings?.teamName}
                          onChange={(e) => {
                            setUnsavedChanges(true);
                            // Handle team name change
                          }}
                          disabled={!isEditingSettings}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Team Description</Label>
                        <Input
                          value={settings?.teamDescription}
                          onChange={(e) => {
                            setUnsavedChanges(true);
                            // Handle description change
                          }}
                          disabled={!isEditingSettings}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Default Role</Label>
                        <select
                          value={settings?.defaultRole}
                          onChange={(e) => {
                            setUnsavedChanges(true);
                            // Handle role change
                          }}
                          disabled={!isEditingSettings}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="viewer">Viewer</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    {isEditingSettings && (
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingSettings(false);
                            setUnsavedChanges(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleUpdateSettings({
                            // Add updated settings here
                          })}
                          disabled={!unsavedChanges}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}; 