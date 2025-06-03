
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  MessageSquare, 
  Users, 
  FolderPlus, 
  FileText, 
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActionsDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Upload Document",
      description: "Add new files to your workspace",
      icon: Upload,
      action: () => navigate('/documents'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Start AI Chat",
      description: "Chat with your documents",
      icon: MessageSquare,
      action: () => navigate('/chat'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Create Folder",
      description: "Organize your documents",
      icon: FolderPlus,
      action: () => navigate('/folders'),
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Invite Team",
      description: "Add team members",
      icon: Users,
      action: () => navigate('/team'),
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Generate Document",
      description: "Create with AI assistance",
      icon: FileText,
      action: () => navigate('/generate'),
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Create Workflow",
      description: "Automate your processes",
      icon: Zap,
      action: () => navigate('/workflow'),
      color: "bg-red-500 hover:bg-red-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all"
              onClick={action.action}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
