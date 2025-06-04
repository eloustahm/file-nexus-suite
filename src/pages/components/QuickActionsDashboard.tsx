
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Plus, 
  Upload, 
  MessageSquare, 
  Users, 
  Settings,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Zap,
  Brain,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'document' | 'chat' | 'team';
  title: string;
  time: string;
  status: 'completed' | 'in-progress' | 'failed';
}

export const QuickActionsDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'document',
      title: 'Created "Project Proposal" document',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'chat',
      title: 'Started chat with Document Assistant',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'team',
      title: 'Shared document with team',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'document',
      title: 'Generating technical specification',
      time: '2 hours ago',
      status: 'in-progress'
    }
  ]);

  const handleQuickAction = async (actionId: string) => {
    setIsLoading(true);
    
    // Simulate action processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'new-document',
      title: 'Create Document',
      description: 'Generate a new document with AI assistance',
      icon: <FileText className="h-5 w-5" />,
      action: () => handleQuickAction('new-document'),
      badge: 'Popular',
      color: 'bg-blue-500'
    },
    {
      id: 'upload-document',
      title: 'Upload Document',
      description: 'Upload and analyze existing documents',
      icon: <Upload className="h-5 w-5" />,
      action: () => handleQuickAction('upload-document'),
      color: 'bg-green-500'
    },
    {
      id: 'start-chat',
      title: 'AI Chat',
      description: 'Get help from our document AI assistant',
      icon: <MessageSquare className="h-5 w-5" />,
      action: () => handleQuickAction('start-chat'),
      badge: 'New',
      color: 'bg-purple-500'
    },
    {
      id: 'invite-team',
      title: 'Invite Team',
      description: 'Collaborate with your team members',
      icon: <Users className="h-5 w-5" />,
      action: () => handleQuickAction('invite-team'),
      color: 'bg-orange-500'
    },
    {
      id: 'workflow',
      title: 'Create Workflow',
      description: 'Automate your document processes',
      icon: <Workflow className="h-5 w-5" />,
      action: () => handleQuickAction('workflow'),
      badge: 'Pro',
      color: 'bg-indigo-500'
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      description: 'Get analytics on your documents',
      icon: <Brain className="h-5 w-5" />,
      action: () => handleQuickAction('ai-insights'),
      color: 'bg-pink-500'
    }
  ];

  const getStatusColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'team':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-3xl font-bold text-blue-600">24</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-600">+3</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Chats</p>
                <p className="text-3xl font-bold text-purple-600">47</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-600">+12</span> today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-orange-600">8</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-600">+2</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-3xl font-bold text-green-600">15h</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-600">+3h</span> this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => (
              <div key={action.id} className="group">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200"
                  onClick={action.action}
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{action.title}</p>
                        {action.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Button>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-center py-4">
                <LoadingSpinner size="sm" text="Processing..." />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-100 ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                    <Badge 
                      variant={activity.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  {index < recentActivities.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Activity
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Getting Started Tips
          </CardTitle>
          <CardDescription>
            Make the most of DocuFlow AI with these tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Start with Templates</h4>
              </div>
              <p className="text-sm text-gray-600">
                Use our pre-built templates to create documents faster and maintain consistency.
              </p>
              <Link to="/generate">
                <Button variant="link" className="p-0 h-auto mt-2">
                  Explore Templates →
                </Button>
              </Link>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <h4 className="font-medium">Train Your AI</h4>
              </div>
              <p className="text-sm text-gray-600">
                The more you use our AI, the better it becomes at understanding your preferences.
              </p>
              <Link to="/chat">
                <Button variant="link" className="p-0 h-auto mt-2">
                  Start Chatting →
                </Button>
              </Link>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium">Invite Your Team</h4>
              </div>
              <p className="text-sm text-gray-600">
                Collaborate in real-time and share documents securely with your team members.
              </p>
              <Link to="/team">
                <Button variant="link" className="p-0 h-auto mt-2">
                  Manage Team →
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
