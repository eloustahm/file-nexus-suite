import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTeamCollaboration } from '@/hooks/useTeamCollaboration';
import { Settings, Save, Users, Shield, Bell } from 'lucide-react';

export const TeamSettings = () => {
  const {
    settings,
    isLoadingSettings,
    settingsError,
    updateSettings,
    isEditingSettings,
    unsavedChanges,
    setIsEditingSettings,
    setUnsavedChanges
  } = useTeamCollaboration();

  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings(formData);
      setIsEditingSettings(false);
      setUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  if (isLoadingSettings) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Team Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {settingsError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{settingsError}</p>
            </div>
          )}

          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5" />
              General
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Team Name</label>
                <Input
                  value={formData?.teamName}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  placeholder="Enter team name"
                  disabled={!isEditingSettings}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select
                  value={formData?.visibility}
                  onValueChange={(value) => handleInputChange('visibility', value)}
                  disabled={!isEditingSettings}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={formData?.teamDescription}
                onChange={(e) => handleInputChange('teamDescription', e.target.value)}
                placeholder="Describe your team"
                rows={3}
                disabled={!isEditingSettings}
              />
            </div>
          </div>

          {/* Member Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Member Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Default Role</label>
                <Select
                  value={formData?.defaultRole}
                  onValueChange={(value) => handleInputChange('defaultRole', value)}
                  disabled={!isEditingSettings}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Members</label>
                <Input
                  type="number"
                  value={formData?.maxMembers}
                  onChange={(e) => handleInputChange('maxMembers', parseInt(e.target.value) || 0)}
                  min={1}
                  max={1000}
                  disabled={!isEditingSettings}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Enable Notifications</label>
                  <p className="text-sm text-gray-500">Receive notifications for team activities</p>
                </div>
                <Switch
                  checked={formData?.enableNotifications}
                  onCheckedChange={(checked) => handleInputChange('enableNotifications', checked)}
                  disabled={!isEditingSettings}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Require Approval</label>
                  <p className="text-sm text-gray-500">Require approval for new member invites</p>
                </div>
                <Switch
                  checked={formData?.requireApproval}
                  onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
                  disabled={!isEditingSettings}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditingSettings(!isEditingSettings);
                if (!isEditingSettings) {
                  setFormData(settings);
                  setUnsavedChanges(false);
                }
              }}
            >
              {isEditingSettings ? 'Cancel' : 'Edit Settings'}
            </Button>
            {isEditingSettings && (
              <Button onClick={handleSave} disabled={!unsavedChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
