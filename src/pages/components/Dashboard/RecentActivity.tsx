
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export const RecentActivity = () => {
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
    },
    {
      id: 4,
      action: "AI analysis completed",
      document: "Contract Analysis.pdf",
      user: "System",
      time: "4 hours ago",
      status: "completed"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest actions in your workspace</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
              <div className="flex-shrink-0">
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.document}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
