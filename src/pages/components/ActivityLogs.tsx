
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActivity } from '@/hooks/useActivity';
import { Clock, User, FileText, Users, Settings } from 'lucide-react';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'document': return FileText;
    case 'team': return Users;
    case 'system': return Settings;
    case 'chat': return User;
    default: return Clock;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'document': return 'bg-blue-100 text-blue-800';
    case 'team': return 'bg-green-100 text-green-800';
    case 'system': return 'bg-purple-100 text-purple-800';
    case 'chat': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ActivityLogs = () => {
  const { 
    logs, 
    isLoading, 
    error, 
    typeFilter, 
    setTypeFilter 
  } = useActivity();

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading activity logs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600 text-center">
            <p>Error loading activity logs: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">Track all system activities and changes</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {logs.map((log) => {
          const Icon = getActivityIcon(log.type);
          const colorClass = getActivityColor(log.type);

          return (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-full ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{log.action}</h3>
                      <Badge variant="outline" className={colorClass}>
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.userName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(log.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {logs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activity logs</h3>
              <p className="text-gray-600">Activity logs will appear here as actions are performed.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
