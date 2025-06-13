import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIntegrations } from '@/hooks/useIntegrations';
import { type IntegrationDefinition } from '@/constants/integrations';
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
  Shield,
  CheckCircle2,
  XCircle,
  Plus,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  useIntegrationsQuery,
  useCreateIntegrationMutation,
  useUpdateIntegrationMutation,
  useDeleteIntegrationMutation,
  useTestIntegrationMutation,
  useSyncIntegrationMutation,
} from '@/hooks/queries/useIntegrations';
import { Integration } from '@/types/integration';

export function Integrations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const {
    data,
    isLoading,
    error
  } = useIntegrationsQuery();

  const createIntegration = useCreateIntegrationMutation();
  const updateIntegration = useUpdateIntegrationMutation();
  const deleteIntegration = useDeleteIntegrationMutation();
  const testIntegration = useTestIntegrationMutation();
  const syncIntegration = useSyncIntegrationMutation();

  const integrations = data?.data.integrations || [];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || integration.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateIntegration = () => {
    // TODO: Implement integration creation modal
    createIntegration.mutate({
      name: 'New Integration',
      type: 'storage',
      status: 'inactive',
      config: {}
    });
  };

  const handleUpdateStatus = (integration: Integration) => {
    updateIntegration.mutate({
      id: integration.id,
      data: {
        status: integration.status === 'active' ? 'inactive' : 'active'
      }
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this integration?')) {
      deleteIntegration.mutate(id);
    }
  };

  const handleTestConnection = (id: string) => {
    testIntegration.mutate(id);
  };

  const handleSync = (id: string) => {
    syncIntegration.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <AlertCircle className="w-8 h-8 mr-2" />
        Failed to load integrations
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Integrations</h2>
        <Button onClick={handleCreateIntegration}>
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search integrations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedType}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No integrations found
              </div>
            ) : (
              filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{integration.name}</h3>
                      <Badge
                        variant={integration.status === 'active' ? 'default' : 'secondary'}
                      >
                        {integration.status}
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Type: {integration.type}</p>
                      {integration.lastSync && (
                        <p>Last sync: {new Date(integration.lastSync).toLocaleString()}</p>
                      )}
                      {integration.error && (
                        <p className="text-red-500">Error: {integration.error}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStatus(integration)}
                      >
                        {integration.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestConnection(integration.id)}
                      >
                        Test Connection
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(integration.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
