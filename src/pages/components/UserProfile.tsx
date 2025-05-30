
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Mail,
  Shield,
  Calendar,
  Edit,
  Settings,
  Key
} from "lucide-react";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500 mt-1">
                  Recommended: Square image, at least 200x200px
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">Full Name</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">Email Address</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <Badge className="bg-blue-100 text-blue-800">{user.role}</Badge>
                  <p className="text-sm text-gray-500 mt-1">Account Role</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">January 2024</p>
                  <p className="text-sm text-gray-500">Member Since</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Two-Factor Auth
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
