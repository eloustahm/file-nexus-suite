
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActivityStore } from '@/store/useActivityStore';
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
  const [filterType, setFilterType] = useState<'all' | 'document' | 'team' | 'system' | 'chat'>('all');
  const { logs, loading, error, fetchLogs, setFilters } = useActivityStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    if (filterType === 'all') {
      setFilters({});
    } else {
      setFilters({ type: filterType as 'document' | 'team' | 'system' | 'chat' });
    }
  }, [filterType, setFilters]);

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activity Logs
          </CardTitle>
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
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
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activity found</h3>
            <p className="text-gray-600">No activity logs match your current filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => {
              const Icon = getActivityIcon(log.type);
              return (
                <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <Badge className={getActivityColor(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{log.userName}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(log.timestamp)}</span>
                    </div>
                  </div>
                  {log.userAvatar && (
                    <img
                      src={log.userAvatar}
                      alt={log.userName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
