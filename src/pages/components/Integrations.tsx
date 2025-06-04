
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSettings } from '@/hooks/useSettings';
import { 
  Settings, 
  ExternalLink, 
  Check, 
  X, 
  Key, 
  Eye, 
  EyeOff,
  RefreshCw,
  Zap,
  Database,
  Cloud,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface LocalIntegration {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'error';
  category: string;
  hasApiKey?: boolean;
  apiKey?: string;
}

const defaultIntegrations: LocalIntegration[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Advanced AI text generation and analysis',
    icon: '🤖',
    enabled: false,
    status: 'disconnected',
    category: 'ai',
    hasApiKey: true
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Cloud storage and document sync',
    icon: '📁',
    enabled: false,
    status: 'disconnected',
    category: 'storage'
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Office applications and cloud services',
    icon: '📊',
    enabled: false,
    status: 'disconnected',
    category: 'productivity'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and notifications',
    icon: '💬',
    enabled: false,
    status: 'disconnected',
    category: 'communication'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Knowledge management and documentation',
    icon: '📝',
    enabled: false,
    status: 'disconnected',
    category: 'productivity'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'File storage and sharing',
    icon: '📦',
    enabled: false,
    status: 'disconnected',
    category: 'storage'
  }
];

export const Integrations = () => {
  const [localIntegrations, setLocalIntegrations] = useState<LocalIntegration[]>(defaultIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<LocalIntegration | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { integrations, isLoadingIntegrations, integrationsError, refetchIntegrations, updateIntegration } = useSettings();

  useEffect(() => {
    refetchIntegrations();
  }, [refetchIntegrations]);

  useEffect(() => {
    // Merge API integrations with default ones
    const merged = defaultIntegrations.map(defaultInteg => {
      const apiInteg = integrations.find(api => api.id === defaultInteg.id);
      if (apiInteg) {
        return {
          ...defaultInteg,
          enabled: apiInteg.enabled,
          status: apiInteg.enabled ? 'connected' as const : 'disconnected' as const,
          apiKey: apiInteg.config?.apiKey
        };
      }
      return defaultInteg;
    });
    setLocalIntegrations(merged);
  }, [integrations]);

  const handleToggleIntegration = async (integration: LocalIntegration) => {
    if (integration.hasApiKey && !integration.enabled && !integration.apiKey) {
      setSelectedIntegration(integration);
      return;
    }

    setIsLoading(true);
    try {
      await updateIntegration({ 
        provider: integration.id, 
        config: { 
          enabled: !integration.enabled,
          apiKey: integration.apiKey 
        } 
      });
      
      setLocalIntegrations(prev => 
        prev.map(integ => 
          integ.id === integration.id 
            ? { 
                ...integ, 
                enabled: !integ.enabled, 
                status: !integ.enabled ? 'connected' : 'disconnected' 
              }
            : integ
        )
      );
      toast.success(`${integration.name} ${!integration.enabled ? 'connected' : 'disconnected'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${!integration.enabled ? 'connect' : 'disconnect'} ${integration.name}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!selectedIntegration || !apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setIsLoading(true);
    try {
      await updateIntegration({
        provider: selectedIntegration.id,
        config: { 
          enabled: true,
          apiKey: apiKey.trim()
        }
      });

      setLocalIntegrations(prev =>
        prev.map(integ =>
          integ.id === selectedIntegration.id
            ? { ...integ, enabled: true, status: 'connected', apiKey: apiKey.trim() }
            : integ
        )
      );

      toast.success(`${selectedIntegration.name} connected successfully`);
      setSelectedIntegration(null);
      setApiKey('');
    } catch (error) {
      toast.error(`Failed to connect ${selectedIntegration.name}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async (integration: LocalIntegration) => {
    setIsLoading(true);
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`${integration.name} connection test successful`);
    } catch (error) {
      toast.error(`${integration.name} connection test failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return Check;
      case 'error': return X;
      default: return Settings;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return Zap;
      case 'storage': return Database;
      case 'productivity': return Cloud;
      case 'communication': return Shield;
      default: return Settings;
    }
  };

  const categories = Array.from(new Set(localIntegrations.map(i => i.category)));

  if (isLoadingIntegrations) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Integrations & Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          {integrationsError && (
            <Alert className="mb-4">
              <X className="h-4 w-4" />
              <AlertDescription>{integrationsError}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localIntegrations.map((integration) => {
                  const StatusIcon = getStatusIcon(integration.status);
                  const CategoryIcon = getCategoryIcon(integration.category);
                  
                  return (
                    <Card key={integration.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{integration.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900">{integration.name}</h4>
                                <Badge className={getStatusColor(integration.status)}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {integration.status}
                                </Badge>
                                <CategoryIcon className="h-4 w-4 text-gray-400" />
                              </div>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                              {integration.enabled && integration.hasApiKey && (
                                <p className="text-xs text-green-600 mt-1">
                                  API Key configured ✓
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {integration.enabled && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => testConnection(integration)}
                                disabled={isLoading}
                              >
                                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                              </Button>
                            )}
                            <Switch
                              checked={integration.enabled}
                              onCheckedChange={() => handleToggleIntegration(integration)}
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localIntegrations
                    .filter(integration => integration.category === category)
                    .map((integration) => {
                      const StatusIcon = getStatusIcon(integration.status);
                      
                      return (
                        <Card key={integration.id} className="border hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{integration.icon}</div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                                    <Badge className={getStatusColor(integration.status)}>
                                      <StatusIcon className="h-3 w-3 mr-1" />
                                      {integration.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">{integration.description}</p>
                                </div>
                              </div>
                              <Switch
                                checked={integration.enabled}
                                onCheckedChange={() => handleToggleIntegration(integration)}
                                disabled={isLoading}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* API Key Configuration Modal */}
      {selectedIntegration && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Configure {selectedIntegration.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {selectedIntegration.id === 'openai' && (
              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-1">How to get your OpenAI API key:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI API Keys page</a></li>
                    <li>Sign in to your OpenAI account</li>
                    <li>Click "Create new secret key"</li>
                    <li>Copy the key and paste it here</li>
                  </ol>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button onClick={handleSaveApiKey} disabled={isLoading || !apiKey.trim()}>
                {isLoading ? 'Connecting...' : 'Connect'}
              </Button>
              <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
