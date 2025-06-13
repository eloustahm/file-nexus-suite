import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTeam } from '@/hooks/useTeam';
import { Users, UserPlus, Mail, Calendar, Activity, MoreVertical, Trash2 } from 'lucide-react';

export const TeamMembers = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
  
  const {
    members,
    filteredMembers,
    isLoadingMembers,
    membersError,
    inviteMember,
    updateMemberRole,
    removeMember,
    showInviteModal,
    setShowInviteModal,
    showRemoveConfirm,
    setShowRemoveConfirm,
    showRoleUpdateModal,
    setShowRoleUpdateModal,
    memberFilter,
    setMemberFilter,
    roleFilter,
    setRoleFilter
  } = useTeam();

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    
    try {
      await inviteMember({ email: inviteEmail, role: inviteRole });
      setInviteEmail('');
      setInviteRole('viewer');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Failed to invite member:', error);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    try {
      await updateMemberRole({ memberId, role: newRole });
      setShowRoleUpdateModal(null);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember(memberId);
      setShowRemoveConfirm(null);
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  if (isLoadingMembers) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search members..."
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="w-64"
            />
            <Select value={roleFilter} onValueChange={(value: 'all' | 'admin' | 'editor' | 'viewer') => setRoleFilter(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <Select value={inviteRole} onValueChange={(value: 'admin' | 'editor' | 'viewer') => setInviteRole(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleInvite} className="w-full">
                    Send Invitation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {membersError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{membersError}</p>
            </div>
          )}
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                    ) : (
                      <Users className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                    {member.role}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Activity className="h-4 w-4" />
                    <span>Last active {new Date(member.lastActive).toLocaleDateString()}</span>
                  </div>
                  <Dialog open={showRoleUpdateModal === member.id} onOpenChange={(open) => setShowRoleUpdateModal(open ? member.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Member Role</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Select value={member.role} onValueChange={(value: 'admin' | 'editor' | 'viewer') => handleRoleChange(member.id, value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={showRemoveConfirm === member.id} onOpenChange={(open) => setShowRemoveConfirm(open ? member.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Team Member</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>Are you sure you want to remove {member.name} from the team?</p>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowRemoveConfirm(null)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={() => handleRemoveMember(member.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
