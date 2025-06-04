
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from '@/store/useSettingsStore';
import { Settings, ExternalLink, Check, X } from 'lucide-react';

// Define local integration interface to match component needs
interface LocalIntegration {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'error';
  category: string;
}

export const Integrations = () => {
  const [localIntegrations, setLocalIntegrations] = useState<LocalIntegration[]>([]);
  const { integrations, loading, error, fetchIntegrations, updateIntegration } = useSettingsStore();

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  useEffect(() => {
    // Transform API integrations to local format
    const transformed = integrations.map(integration => ({
      id: integration.id,
      name: integration.name,
      description: `${integration.name} integration`,
      icon: '🔧',
      enabled: integration.enabled,
      status: integration.enabled ? 'connected' as const : 'disconnected' as const,
      category: 'productivity'
    }));
    setLocalIntegrations(transformed);
  }, [integrations]);

  const handleToggleIntegration = async (integrationId: string, enabled: boolean) => {
    try {
      await updateIntegration(integrationId, { enabled });
      setLocalIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, enabled, status: enabled ? 'connected' as const : 'disconnected' as const }
            : integration
        )
      );
    } catch (error) {
      console.error('Failed to update integration:', error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Integrations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {localIntegrations.length === 0 ? (
          <div className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations available</h3>
            <p className="text-gray-600">Check back later for available integrations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {localIntegrations.map((integration) => {
              const StatusIcon = getStatusIcon(integration.status);
              return (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{integration.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <Badge className={getStatusColor(integration.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {integration.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                    />
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
