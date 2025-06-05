
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Search, 
  Filter,
  Globe,
  Database,
  Cloud,
  Smartphone,
  BarChart3,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  Shield,
  Zap
} from 'lucide-react';
import { Integration } from '@/types';

export const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock integrations data
  const integrations: Integration[] = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Sync documents with Google Drive for seamless collaboration',
      icon: 'Cloud',
      category: 'Storage',
      enabled: true,
      settings: { syncFrequency: 'hourly' }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and share documents in Slack channels',
      icon: 'MessageSquare',
      category: 'Communication',
      enabled: false
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      description: 'Integrate with Word, Excel, and PowerPoint',
      icon: 'FileText',
      category: 'Productivity',
      enabled: true
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect customer data with document workflows',
      icon: 'Database',
      category: 'CRM',
      enabled: false
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Send and receive documents via email',
      icon: 'Mail',
      category: 'Communication',
      enabled: true
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Schedule document reviews and deadlines',
      icon: 'Calendar',
      category: 'Productivity',
      enabled: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: integrations.length },
    { id: 'Storage', name: 'Storage', count: integrations.filter(i => i.category === 'Storage').length },
    { id: 'Communication', name: 'Communication', count: integrations.filter(i => i.category === 'Communication').length },
    { id: 'Productivity', name: 'Productivity', count: integrations.filter(i => i.category === 'Productivity').length },
    { id: 'CRM', name: 'CRM', count: integrations.filter(i => i.category === 'CRM').length }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ElementType> = {
      Cloud,
      Database,
      MessageSquare,
      Mail,
      Calendar,
      FileText,
      Shield,
      Zap,
      Globe,
      Smartphone,
      BarChart3
    };
    return icons[iconName] || Settings;
  };

  const toggleIntegration = (integrationId: string) => {
    console.log('Toggling integration:', integrationId);
    // This would typically call an API to enable/disable the integration
  };

  const configureIntegration = (integrationId: string) => {
    console.log('Configuring integration:', integrationId);
    // This would open a configuration modal or navigate to settings
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-gray-600">Connect your favorite tools and services</p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </Tabs>

      {filteredIntegrations.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Integrations Found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const IconComponent = getIconComponent(integration.icon);
            return (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {integration.description}
                  </CardDescription>
                  
                  {integration.enabled && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          Connected
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => configureIntegration(integration.id)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  )}
                  
                  {!integration.enabled && (
                    <Button
                      className="w-full"
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
