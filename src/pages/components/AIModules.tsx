import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from 'lucide-react';
import { useAIModules } from '@/hooks/useAIModules';
import { SectionLoading } from '@/components/LoadingStates';
import { cn } from '@/lib/utils';

export function AIModules() {
  const {
    modules,
    isLoading,
    updateModuleStatus
  } = useAIModules();

  if (isLoading) {
    return <SectionLoading message="Loading AI modules..." />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Modules</h2>
        <p className="text-muted-foreground">
          Manage and monitor your AI-powered document processing modules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          const usagePercentage = (module.usage.current / module.usage.limit) * 100;

          return (
            <Card key={module.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{module.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    "capitalize",
                    module.status === 'active' && "bg-green-500/10 text-green-500",
                    module.status === 'inactive' && "bg-gray-500/10 text-gray-500",
                    module.status === 'pending' && "bg-yellow-500/10 text-yellow-500"
                  )}
                >
                  {getStatusText(module.status)}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Usage</span>
                    <span>
                      {module.usage.current} / {module.usage.limit} {module.usage.unit}
                    </span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>

                <div className="space-y-2">
                  {module.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        getStatusColor(module.status)
                      )} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    updateModuleStatus.mutate({
                      id: module.id,
                      status: module.status === 'active' ? 'inactive' : 'active'
                    })
                  }
                  disabled={module.status === 'pending'}
                >
                  {module.status === 'active' ? 'Disable' : 'Enable'} Module
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
