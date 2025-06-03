
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Mail,
  Shield,
  Calendar,
  Edit,
  Settings,
  Key,
  Eye
} from "lucide-react";
import { OTPSettings } from "./OTPSettings";
import { PrivacySettings } from "./PrivacySettings";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

export const UserProfile = () => {
  const { profile, loading, error, fetchProfile, updateProfile } = useSettingsStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaveProfile = async (formData: FormData) => {
    try {
      const profileData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      };

      await updateProfile(profileData);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const displayUser = profile || user;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="otp">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveProfile(formData);
                }}>
                  <div className="flex items-center gap-6">
                    <img 
                      src={displayUser?.avatar || '/placeholder.svg'} 
                      alt={displayUser?.firstName || 'User'}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div>
                      <Button variant="outline" size="sm" type="button">
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
                      <Input 
                        id="firstName" 
                        name="firstName"
                        defaultValue={displayUser?.firstName || ""} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        defaultValue={displayUser?.lastName || ""} 
                        className="mt-1" 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      defaultValue={displayUser?.email || ""} 
                      className="mt-1" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      className="mt-1" 
                    />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
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
                      <p className="font-medium">{displayUser?.firstName} {displayUser?.lastName}</p>
                      <p className="text-sm text-gray-500">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{displayUser?.email}</p>
                      <p className="text-sm text-gray-500">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <Badge className="bg-blue-100 text-blue-800">{user?.role || 'User'}</Badge>
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Login History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Account Recovery
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="otp" className="space-y-6">
          <OTPSettings />
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <PrivacySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
