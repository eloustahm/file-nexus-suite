import { useState } from 'react';
import { useActivityLogs } from '@/hooks/useActivityLogs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { ACTIVITY_TYPES, ACTIVITY_FILTERS, type ActivityLog as ActivityLogType } from '@/constants/activity';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export function ActivityLog() {
  const { activities, isLoading, clearActivityLogs } = useActivityLogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details?.fileName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activity Log</h2>
        <Button
          variant="outline"
          onClick={() => clearActivityLogs()}
        >
          Clear Log
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedFilter}>
        <TabsList>
          {ACTIVITY_FILTERS.map(filter => (
            <TabsTrigger
              key={filter.id}
              value={filter.value}
            >
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedFilter} className="mt-4">
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No activities found
              </div>
            ) : (
              filteredActivities.map((activity) => {
                const activityType = ACTIVITY_TYPES[activity.type];
                const Icon = activityType.icon;

                return (
                  <Card key={activity.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2 rounded-lg",
                        activityType.bgColor
                      )}>
                        <Icon className={cn("w-5 h-5", activityType.color)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.description}</p>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{activity.user.name}</span>
                          <span>•</span>
                          <span>{activity.user.email}</span>
                        </div>
                        {activity.details && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            {activity.details.fileName && (
                              <p>File: {activity.details.fileName}</p>
                            )}
                            {activity.details.fileSize && (
                              <p>Size: {activity.details.fileSize}</p>
                            )}
                            {activity.details.fileType && (
                              <p>Type: {activity.details.fileType}</p>
                            )}
                            {activity.details.sharedWith && (
                              <p>Shared with: {activity.details.sharedWith.join(', ')}</p>
                            )}
                            {activity.details.permission && (
                              <p>Permission: {activity.details.permission}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 