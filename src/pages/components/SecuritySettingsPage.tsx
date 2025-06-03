
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  Key, 
  Smartphone, 
  Monitor, 
  MapPin,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginSession {
  id: string;
  device: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

export const SecuritySettingsPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [sessions] = useState<LoginSession[]>([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'San Francisco, CA',
      lastActive: new Date(),
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      lastActive: new Date(Date.now() - 86400000),
      current: false
    },
    {
      id: '3',
      device: 'Firefox on macOS',
      location: 'New York, NY',
      lastActive: new Date(Date.now() - 172800000),
      current: false
    }
  ]);

  const { toast } = useToast();

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    // API call to change password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully",
    });
    
    setPasswordData({ current: '', new: '', confirm: '' });
    setIsChangingPassword(false);
  };

  const handleRevokeSession = (sessionId: string) => {
    // API call to revoke session
    toast({
      title: "Session revoked",
      description: "The session has been terminated",
    });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been enabled",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Change Password</Label>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    Update Password
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable 2FA</Label>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
              {twoFactorEnabled && (
                <Badge className="mt-2 bg-green-100 text-green-800">Enabled</Badge>
              )}
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleEnable2FA}
            />
          </div>
          {twoFactorEnabled && (
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                View Recovery Codes
              </Button>
              <Button variant="outline" size="sm">
                Generate New Codes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{session.device}</span>
                      {session.current && (
                        <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {session.lastActive.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Account Recovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Download Account Data
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
