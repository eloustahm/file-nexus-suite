
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Eye, 
  Download, 
  Trash2, 
  Cookie, 
  Share, 
  Bell,
  Info,
  ExternalLink 
} from 'lucide-react';
import { toast } from 'sonner';

export const PrivacySettingsDetailed = () => {
  const [settings, setSettings] = useState({
    dataCollection: true,
    analytics: false,
    marketing: false,
    profileVisibility: true,
    activitySharing: false,
    documentSharing: true,
    emailNotifications: true,
    cookiesEssential: true,
    cookiesAnalytics: false,
    cookiesMarketing: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateSetting = async (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Privacy setting updated');
    }, 500);
  };

  const exportData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Data export request submitted. You will receive an email with download link.');
    }, 2000);
  };

  const deleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Account deletion request submitted. You will receive a confirmation email.');
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="data" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
          <TabsTrigger value="rights">Your Rights</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Collection & Usage
              </CardTitle>
              <CardDescription>
                Control how we collect and use your data to improve our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Essential Data Collection</p>
                  <p className="text-sm text-muted-foreground">
                    Required for core functionality and security
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Required</Badge>
                  <Switch checked={settings.dataCollection} disabled />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Analytics & Performance</p>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how you use our platform to improve performance
                  </p>
                </div>
                <Switch
                  checked={settings.analytics}
                  onCheckedChange={(checked) => updateSetting('analytics', checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Marketing & Personalization</p>
                  <p className="text-sm text-muted-foreground">
                    Personalized content and product recommendations
                  </p>
                </div>
                <Switch
                  checked={settings.marketing}
                  onCheckedChange={(checked) => updateSetting('marketing', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Profile Visibility
              </CardTitle>
              <CardDescription>
                Control who can see your profile and activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Allow others to find and view your public profile
                  </p>
                </div>
                <Switch
                  checked={settings.profileVisibility}
                  onCheckedChange={(checked) => updateSetting('profileVisibility', checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Activity Status</p>
                  <p className="text-sm text-muted-foreground">
                    Show when you're active or recently online
                  </p>
                </div>
                <Switch
                  checked={settings.activitySharing}
                  onCheckedChange={(checked) => updateSetting('activitySharing', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="h-5 w-5" />
                Sharing Preferences
              </CardTitle>
              <CardDescription>
                Control how your content can be shared and discovered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Document Sharing</p>
                  <p className="text-sm text-muted-foreground">
                    Allow sharing of documents with team members
                  </p>
                </div>
                <Switch
                  checked={settings.documentSharing}
                  onCheckedChange={(checked) => updateSetting('documentSharing', checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about shared documents and collaborations
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Cookie Preferences
              </CardTitle>
              <CardDescription>
                Manage how we use cookies and similar technologies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Essential Cookies</p>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Required</Badge>
                  <Switch checked={settings.cookiesEssential} disabled />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Analytics Cookies</p>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
                <Switch
                  checked={settings.cookiesAnalytics}
                  onCheckedChange={(checked) => updateSetting('cookiesAnalytics', checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Marketing Cookies</p>
                  <p className="text-sm text-muted-foreground">
                    Used to track visitors across websites for advertising
                  </p>
                </div>
                <Switch
                  checked={settings.cookiesMarketing}
                  onCheckedChange={(checked) => updateSetting('cookiesMarketing', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Rights & Control
              </CardTitle>
              <CardDescription>
                Exercise your data protection rights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Export Your Data</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download a copy of all your data in a portable format
                  </p>
                  <Button variant="outline" onClick={exportData} disabled={isLoading}>
                    <Download className="h-4 w-4 mr-2" />
                    {isLoading ? 'Processing...' : 'Request Data Export'}
                  </Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Delete Your Account</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" onClick={deleteAccount} disabled={isLoading}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">Your Privacy Rights</p>
                    <ul className="text-sm space-y-1">
                      <li>• Right to access your personal data</li>
                      <li>• Right to correct inaccurate data</li>
                      <li>• Right to delete your data</li>
                      <li>• Right to data portability</li>
                      <li>• Right to object to processing</li>
                    </ul>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Learn more about your rights
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
