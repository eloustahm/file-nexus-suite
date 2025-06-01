
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Folder, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { QuickActionsDashboard } from "./QuickActionsDashboard";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Documents",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Active Workflows",
      value: "8",
      change: "+5%",
      changeType: "positive" as const,
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Shared Folders",
      value: "12",
      change: "+8%",
      changeType: "positive" as const,
      icon: Folder,
      color: "text-green-600"
    },
    {
      title: "Team Members",
      value: "6",
      change: "0%",
      changeType: "neutral" as const,
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const workflowUpdates = [
    {
      name: "Legal Document Review",
      status: "In Progress",
      progress: 75,
      dueDate: "Tomorrow",
      priority: "high"
    },
    {
      name: "Marketing Materials",
      status: "Completed",
      progress: 100,
      dueDate: "Completed",
      priority: "medium"
    },
    {
      name: "Contract Analysis",
      status: "Pending",
      progress: 25,
      dueDate: "Next Week",
      priority: "low"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your documents.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActionsDashboard />

      {/* Workflow Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Workflow Status
          </CardTitle>
          <CardDescription>Track the progress of your document workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowUpdates.map((workflow, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{workflow.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={workflow.priority === 'high' ? 'destructive' : 
                              workflow.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {workflow.priority}
                    </Badge>
                    <Badge 
                      variant={workflow.status === 'Completed' ? 'default' :
                              workflow.status === 'In Progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {workflow.status === 'Completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {workflow.status === 'In Progress' && <Clock className="h-3 w-3 mr-1" />}
                      {workflow.status === 'Pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{workflow.progress}%</span>
                  </div>
                  <Progress value={workflow.progress} className="h-2" />
                  <p className="text-sm text-gray-500">Due: {workflow.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
