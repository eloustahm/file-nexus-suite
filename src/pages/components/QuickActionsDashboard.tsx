
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Upload, 
  FolderPlus, 
  MessageSquare, 
  Wand2, 
  Search,
  Clock,
  TrendingUp,
  Users,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QuickActionsDashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Upload,
      title: "Upload Document",
      description: "Add new documents to your workspace",
      action: () => setIsUploadOpen(true),
      color: "bg-blue-500"
    },
    {
      icon: FolderPlus,
      title: "Create Folder",
      description: "Organize your documents",
      action: () => setIsNewFolderOpen(true),
      color: "bg-green-500"
    },
    {
      icon: MessageSquare,
      title: "Chat with AI",
      description: "Ask questions about your documents",
      action: () => window.location.href = "/chat",
      color: "bg-purple-500"
    },
    {
      icon: Wand2,
      title: "Generate Document",
      description: "Create documents with AI",
      action: () => window.location.href = "/generate",
      color: "bg-orange-500"
    }
  ];

  const recentActivities = [
    { action: "Uploaded", item: "Marketing Report.pdf", time: "2 hours ago", type: "upload" },
    { action: "Shared", item: "Project Proposal", time: "4 hours ago", type: "share" },
    { action: "Created", item: "Q4 Analysis", time: "1 day ago", type: "create" },
    { action: "Modified", item: "Budget 2024.xlsx", time: "2 days ago", type: "edit" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Files uploaded",
        description: `Successfully uploaded ${files.length} file(s)`,
      });
      setIsUploadOpen(false);
    }
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      toast({
        title: "Folder created",
        description: `Folder "${folderName}" created successfully`,
      });
      setFolderName("");
      setFolderDescription("");
      setIsNewFolderOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
                onClick={action.action}
              >
                <div className={`h-8 w-8 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.type === 'upload' ? 'bg-blue-100' :
                    activity.type === 'share' ? 'bg-green-100' :
                    activity.type === 'create' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.action} <span className="text-blue-600">{activity.item}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Choose files to upload to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Select Files</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="mt-1"
                accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx"
              />
            </div>
            <div>
              <Label htmlFor="folder-select">Destination Folder</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root Folder</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="templates">Templates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={isNewFolderOpen} onOpenChange={setIsNewFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Organize your documents with a new folder
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="folder-description">Description (Optional)</Label>
              <Textarea
                id="folder-description"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                placeholder="Enter folder description"
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateFolder} className="flex-1">
                Create Folder
              </Button>
              <Button variant="outline" onClick={() => setIsNewFolderOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
