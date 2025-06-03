
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Activity, 
  Search, 
  Filter, 
  FileText, 
  Users, 
  Settings, 
  Upload,
  Download,
  Share2,
  MessageSquare,
  Calendar
} from "lucide-react";
import { useActivityStore } from "@/store/useActivityStore";

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string;
  type: 'document' | 'team' | 'system' | 'chat';
  metadata?: any;
}

export const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("7d");
  
  const { logs, loading, error, fetchLogs, clearError } = useActivityStore();

  useEffect(() => {
    fetchLogs({ type: filterType, timeframe: timeFilter });
  }, [fetchLogs, filterType, timeFilter]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Mock data for development
  const mockLogs: ActivityLog[] = [
    {
      id: '1',
      action: 'document_uploaded',
      description: 'Uploaded "Project Proposal.pdf"',
      userId: 'user1',
      userName: 'Alice Johnson',
      userAvatar: '/placeholder.svg',
      timestamp: new Date().toISOString(),
      type: 'document'
    },
    {
      id: '2',
      action: 'team_invite_sent',
      description: 'Invited bob@company.com to join the team',
      userId: 'user1',
      userName: 'Alice Johnson',
      userAvatar: '/placeholder.svg',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'team'
    },
    {
      id: '3',
      action: 'document_shared',
      description: 'Shared "Financial Report Q3.xlsx" with the team',
      userId: 'user2',
      userName: 'Bob Smith',
      userAvatar: '/placeholder.svg',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      type: 'document'
    },
    {
      id: '4',
      action: 'chat_message',
      description: 'Posted a message in #general channel',
      userId: 'user3',
      userName: 'Carol Davis',
      userAvatar: '/placeholder.svg',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      type: 'chat'
    },
    {
      id: '5',
      action: 'settings_updated',
      description: 'Updated team security settings',
      userId: 'user1',
      userName: 'Alice Johnson',
      userAvatar: '/placeholder.svg',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      type: 'system'
    }
  ];

  const displayLogs = logs.length > 0 ? logs : mockLogs;

  const filteredLogs = displayLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string, action: string) => {
    switch (type) {
      case 'document':
        if (action.includes('upload')) return <Upload className="h-4 w-4" />;
        if (action.includes('download')) return <Download className="h-4 w-4" />;
        if (action.includes('share')) return <Share2 className="h-4 w-4" />;
        return <FileText className="h-4 w-4" />;
      case 'team':
        return <Users className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'team': return 'bg-green-100 text-green-800';
      case 'chat': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading activity logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-600 mt-1">Track all activities across your workspace</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1d">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 text-center py-4">
              <p>Error loading activity logs: {error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-lg ${getActivityColor(log.type)}`}>
                    {getActivityIcon(log.type, log.action)}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={log.userAvatar} />
                    <AvatarFallback>
                      {log.userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{log.userName}</span> {log.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getActivityColor(log.type)}>
                        {log.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatTimeAgo(log.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
