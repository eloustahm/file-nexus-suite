
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Zap, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Key
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { settingsApi } from "@/services/api";

export const Integrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const availableIntegrations = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Sync documents with Google Drive',
      icon: '📁',
      status: 'connected',
      category: 'Storage'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications in Slack channels',
      icon: '💬',
      status: 'available',
      category: 'Communication'
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      description: 'Connect with Office 365 documents',
      icon: '📊',
      status: 'connected',
      category: 'Productivity'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Sync files with Dropbox',
      icon: '📦',
      status: 'available',
      category: 'Storage'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows with 3000+ apps',
      icon: '⚡',
      status: 'available',
      category: 'Automation'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Process email attachments automatically',
      icon: '📧',
      status: 'available',
      category: 'Communication'
    }
  ];

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      const data = await settingsApi.getIntegrations();
      setIntegrations(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load integrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIntegration = async (integrationId: string, enabled: boolean) => {
    try {
      await settingsApi.updateIntegration(integrationId, { enabled });
      toast({
        title: enabled ? "Integration Enabled" : "Integration Disabled",
        description: `${integrationId} integration has been ${enabled ? 'connected' : 'disconnected'}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update integration",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Available
          </Badge>
        );
    }
  };

  const groupedIntegrations = availableIntegrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {} as Record<string, typeof availableIntegrations>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">Connect your favorite tools and services</p>
      </div>

      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          Some integrations may require API keys or authentication. Your credentials are encrypted and stored securely.
        </AlertDescription>
      </Alert>

      {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
            <CardDescription>
              {category === 'Storage' && 'Connect cloud storage services'}
              {category === 'Communication' && 'Integrate messaging and email tools'}
              {category === 'Productivity' && 'Connect productivity and office tools'}
              {category === 'Automation' && 'Set up automated workflows'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {categoryIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{integration.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        {getStatusBadge(integration.status)}
                      </div>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Switch
                          checked={true}
                          onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                        />
                      </>
                    ) : (
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            API Access
          </CardTitle>
          <CardDescription>
            Connect custom applications using our API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="api-key"
                type="password"
                value="sk-docuflow-••••••••••••••••"
                readOnly
                className="font-mono"
              />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            View API Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
