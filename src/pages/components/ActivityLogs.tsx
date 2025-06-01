
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Activity, 
  FileText, 
  Edit, 
  Trash2, 
  Share2, 
  Upload, 
  Download,
  Search,
  Filter,
  Calendar
} from "lucide-react";

export const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterUser, setFilterUser] = useState("all");

  const activities = [
    {
      id: 1,
      type: "create",
      action: "Created document",
      document: "Project Proposal 2024.pdf",
      user: { name: "John Doe", avatar: "/placeholder.svg" },
      timestamp: "2024-01-15 10:30 AM",
      details: "Created new document in Marketing folder"
    },
    {
      id: 2,
      type: "edit",
      action: "Edited document",
      document: "Team Guidelines.docx",
      user: { name: "Alice Johnson", avatar: "/placeholder.svg" },
      timestamp: "2024-01-15 09:45 AM",
      details: "Updated section 3: Communication protocols"
    },
    {
      id: 3,
      type: "share",
      action: "Shared document",
      document: "Q4 Report.xlsx",
      user: { name: "Bob Smith", avatar: "/placeholder.svg" },
      timestamp: "2024-01-15 09:15 AM",
      details: "Shared with carol@company.com as Editor"
    },
    {
      id: 4,
      type: "workflow",
      action: "Workflow completed",
      document: "Invoice Template.pdf",
      user: { name: "Carol Davis", avatar: "/placeholder.svg" },
      timestamp: "2024-01-15 08:30 AM",
      details: "Document Review workflow completed successfully"
    },
    {
      id: 5,
      type: "delete",
      action: "Deleted document",
      document: "Old Draft.txt",
      user: { name: "David Wilson", avatar: "/placeholder.svg" },
      timestamp: "2024-01-14 05:20 PM",
      details: "Moved to trash"
    },
    {
      id: 6,
      type: "upload",
      action: "Uploaded document",
      document: "Contract_v2.pdf",
      user: { name: "Eve Brown", avatar: "/placeholder.svg" },
      timestamp: "2024-01-14 03:15 PM",
      details: "Uploaded to Contracts folder"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return <FileText className="h-4 w-4" />;
      case 'edit': return <Edit className="h-4 w-4" />;
      case 'delete': return <Trash2 className="h-4 w-4" />;
      case 'share': return <Share2 className="h-4 w-4" />;
      case 'upload': return <Upload className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'edit': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'share': return 'bg-purple-100 text-purple-800';
      case 'upload': return 'bg-orange-100 text-orange-800';
      case 'workflow': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesUser = filterUser === "all" || activity.user.name === filterUser;
    
    return matchesSearch && matchesType && matchesUser;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-600 mt-1">Track all document and workflow activities</p>
      </div>

      {/* Filters */}
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
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="share">Share</SelectItem>
                <SelectItem value="upload">Upload</SelectItem>
                <SelectItem value="workflow">Workflow</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                <SelectItem value="Bob Smith">Bob Smith</SelectItem>
                <SelectItem value="Carol Davis">Carol Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activities
          </CardTitle>
          <CardDescription>
            {filteredActivities.length} activities found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.document}</p>
                  <p className="text-xs text-gray-500">{activity.details}</p>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{activity.user.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
