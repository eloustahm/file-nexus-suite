
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile } from './UserProfile';
import { Integrations } from './Integrations';
import { PaymentPage } from './PaymentPage';
import { 
  User, 
  Zap, 
  CreditCard, 
  Bell, 
  Shield, 
  Users,
  Settings as SettingsIcon
} from 'lucide-react';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Admin',
  avatar: '/placeholder.svg'
};

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UserProfile user={mockUser} />
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Integrations />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <PaymentPage />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Settings</h3>
            <p className="text-gray-500">Notification preferences coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
            <p className="text-gray-500">Advanced security options coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Team Management</h3>
            <p className="text-gray-500">Team collaboration features coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
