
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Mail, 
  MoreVertical, 
  Search,
  Crown,
  Edit,
  Shield,
  Eye,
  MessageSquare,
  Activity
} from "lucide-react";
import { useTeamStore } from "@/store/useTeamStore";
import { useToast } from "@/hooks/use-toast";

export const TeamCollaboration = () => {
  const { members, inviteMember, updateMemberRole, removeMember, loading } = useTeamStore();
  const { toast } = useToast();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', role: 'viewer' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleInviteMember = async () => {
    try {
      await inviteMember(inviteData);
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${inviteData.email}`,
      });
      setInviteData({ email: '', role: 'viewer' });
      setIsInviteOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      await updateMemberRole(memberId, newRole);
      toast({
        title: "Role updated",
        description: "Member role has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member role",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember(memberId);
      toast({
        title: "Member removed",
        description: "Team member has been removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'editor': return <Edit className="h-4 w-4" />;
      case 'viewer': return <Eye className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teamStats = [
    { label: 'Total Members', value: members.length, icon: Users },
    { label: 'Active Today', value: 8, icon: Activity },
    { label: 'Pending Invites', value: 3, icon: Mail },
    { label: 'Admins', value: members.filter(m => m.role === 'admin').length, icon: Crown }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Collaboration</h1>
          <p className="text-gray-600 mt-1">Manage your team members and their permissions</p>
        </div>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="invite-role">Role</Label>
                <Select value={inviteData.role} onValueChange={(value) => setInviteData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer - Can view documents</SelectItem>
                    <SelectItem value="editor">Editor - Can view and edit documents</SelectItem>
                    <SelectItem value="admin">Admin - Full access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleInviteMember} disabled={loading || !inviteData.email} className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {teamStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
              <CardDescription>Manage your team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-xs text-gray-400">
                          Last active: {member.lastActive || 'Never'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        <span className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </span>
                      </Badge>
                      
                      <Select
                        value={member.role}
                        onValueChange={(value) => handleRoleChange(member.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Overview of what each role can do</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="h-5 w-5 text-red-600" />
                      <h3 className="font-medium">Admin</h3>
                      <Badge className="bg-red-100 text-red-800">Full Access</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Manage team members and roles</li>
                      <li>• Create, edit, and delete all documents</li>
                      <li>• Configure workflows and integrations</li>
                      <li>• Access billing and subscription settings</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Edit className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">Editor</h3>
                      <Badge className="bg-blue-100 text-blue-800">Edit Access</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Create and edit documents</li>
                      <li>• Share documents with team members</li>
                      <li>• Use AI features and workflows</li>
                      <li>• View team activity and reports</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">Viewer</h3>
                      <Badge className="bg-green-100 text-green-800">View Only</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• View shared documents</li>
                      <li>• Download documents (if permitted)</li>
                      <li>• Add comments and annotations</li>
                      <li>• Use basic AI chat features</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent team collaboration activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
                <p className="text-gray-500">Team activity will appear here once members start collaborating</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
