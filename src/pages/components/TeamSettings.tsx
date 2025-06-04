
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTeamCollaborationStore } from '@/store/useTeamCollaborationStore';
import { Settings, Save, Users, Shield, Bell } from 'lucide-react';

export const TeamSettings = () => {
  const {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings
  } = useTeamCollaborationStore();

  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings(formData);
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
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
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
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
                  value={formData.teamName}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) => handleInputChange('visibility', value)}
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
                value={formData.teamDescription}
                onChange={(e) => handleInputChange('teamDescription', e.target.value)}
                placeholder="Describe your team"
                rows={3}
              />
            </div>
          </div>

          {/* Member Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5" />
              Member Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Default Role</label>
                <Select
                  value={formData.defaultRole}
                  onValueChange={(value) => handleInputChange('defaultRole', value)}
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
                  value={formData.maxMembers}
                  onChange={(e) => handleInputChange('maxMembers', parseInt(e.target.value) || 0)}
                  min={1}
                  max={1000}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Allow Invitations</label>
                  <p className="text-xs text-gray-500">Members can invite others to the team</p>
                </div>
                <Switch
                  checked={formData.allowInvites}
                  onCheckedChange={(checked) => handleInputChange('allowInvites', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Require Approval</label>
                  <p className="text-xs text-gray-500">New members need approval to join</p>
                </div>
                <Switch
                  checked={formData.requireApproval}
                  onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Two-Factor Authentication</label>
                  <p className="text-xs text-gray-500">Require 2FA for all team members</p>
                </div>
                <Switch
                  checked={formData.enableTwoFactor}
                  onCheckedChange={(checked) => handleInputChange('enableTwoFactor', checked)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Session Timeout (hours)</label>
                <Input
                  type="number"
                  value={formData.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value) || 24)}
                  min={1}
                  max={168}
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
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Team Notifications</label>
                <p className="text-xs text-gray-500">Send notifications for team activities</p>
              </div>
              <Switch
                checked={formData.enableNotifications}
                onCheckedChange={(checked) => handleInputChange('enableNotifications', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
