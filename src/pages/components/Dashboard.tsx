
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Folder, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";
import { QuickActionsDashboard } from "./QuickActionsDashboard";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Documents",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText
    },
    {
      title: "Active Workflows",
      value: "23",
      change: "+5%", 
      changeType: "positive" as const,
      icon: Activity
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      changeType: "neutral" as const,
      icon: Users
    },
    {
      title: "Storage Used",
      value: "2.1 GB",
      change: "+0.5 GB",
      changeType: "neutral" as const,
      icon: Folder
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Document uploaded",
      document: "Project Proposal.pdf",
      user: "Sarah Wilson",
      time: "2 minutes ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Workflow completed",
      document: "Legal Review Process",
      user: "Mike Johnson",
      time: "1 hour ago", 
      status: "completed"
    },
    {
      id: 3,
      action: "Document shared",
      document: "Marketing Plan.docx",
      user: "Lisa Chen",
      time: "3 hours ago",
      status: "pending"
    }
  ];

  const getChangeColor = (type: string) => {
    switch (type) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your documents.</p>
      </div>

      {/* Quick Actions */}
      <QuickActionsDashboard />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${getChangeColor(stat.changeType)}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.document}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Document Overview</CardTitle>
            <CardDescription>Your document statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Documents this week</span>
                <Badge variant="secondary">+15</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending reviews</span>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completed workflows</span>
                <Badge className="bg-green-100 text-green-800">12</Badge>
              </div>
              <Button className="w-full" variant="outline">
                View All Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
