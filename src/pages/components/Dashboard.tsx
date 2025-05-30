
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Upload,
  Clock,
  TrendingUp,
  Users,
  Download,
  Edit,
  Share,
  MoreVertical
} from "lucide-react";

export const Dashboard = () => {
  const stats = [
    { title: "Total Documents", value: "125", icon: FileText, trend: "+12%" },
    { title: "Storage Used", value: "2.4 GB", icon: Upload, trend: "+8%" },
    { title: "Shared Documents", value: "23", icon: Users, trend: "+15%" },
    { title: "Recent Activity", value: "18", icon: Clock, trend: "+5%" },
  ];

  const recentDocuments = [
    { name: "Project Proposal Q4.docx", type: "Word Document", modified: "2 hours ago", size: "2.1 MB", status: "draft" },
    { name: "Financial Report.xlsx", type: "Excel Spreadsheet", modified: "4 hours ago", size: "1.8 MB", status: "final" },
    { name: "Marketing Strategy.pptx", type: "PowerPoint Presentation", modified: "1 day ago", size: "5.2 MB", status: "review" },
    { name: "Contract Template.pdf", type: "PDF Document", modified: "2 days ago", size: "890 KB", status: "approved" },
    { name: "Meeting Notes.docx", type: "Word Document", modified: "3 days ago", size: "1.2 MB", status: "draft" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "final": return "bg-green-100 text-green-800";
      case "review": return "bg-blue-100 text-blue-800";
      case "approved": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes("Word")) return "📄";
    if (type.includes("Excel")) return "📊";
    if (type.includes("PowerPoint")) return "📋";
    if (type.includes("PDF")) return "📕";
    return "📄";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your most recently accessed documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getFileIcon(doc.type)}</div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{doc.modified}</span>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Create New Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="h-4 w-4 mr-2" />
                Share Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Used</span>
                  <span className="font-medium">2.4 GB of 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Upgrade Storage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
