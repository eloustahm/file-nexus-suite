
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Share,
  Search,
  Filter,
  User,
  Clock,
  Eye,
  Edit,
  Download,
  MoreVertical,
  Link,
  Mail
} from "lucide-react";

export const Shared = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sharedWithMe = [
    {
      id: 1,
      name: "Marketing Strategy 2024.docx",
      sharedBy: "Sarah Wilson",
      sharedDate: "2 hours ago",
      permission: "edit",
      status: "viewed",
      icon: "📄"
    },
    {
      id: 2,
      name: "Project Budget.xlsx",
      sharedBy: "Mike Johnson",
      sharedDate: "1 day ago",
      permission: "view",
      status: "pending",
      icon: "📊"
    },
    {
      id: 3,
      name: "Team Presentation.pptx",
      sharedBy: "Lisa Chen",
      sharedDate: "3 days ago",
      permission: "edit",
      status: "edited",
      icon: "📽️"
    }
  ];

  const sharedByMe = [
    {
      id: 1,
      name: "Company Guidelines.pdf",
      sharedWith: "5 people",
      sharedDate: "1 week ago",
      permission: "view",
      views: 12,
      icon: "📋"
    },
    {
      id: 2,
      name: "Q4 Report.docx",
      sharedWith: "Team Alpha",
      sharedDate: "2 weeks ago",
      permission: "edit",
      views: 8,
      icon: "📄"
    }
  ];

  const getPermissionColor = (permission: string) => {
    return permission === "edit" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "viewed": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "edited": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shared Documents</h1>
          <p className="text-gray-600 mt-1">Documents shared with you and by you</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search shared documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="with-me" className="w-full">
        <TabsList>
          <TabsTrigger value="with-me">Shared with Me</TabsTrigger>
          <TabsTrigger value="by-me">Shared by Me</TabsTrigger>
          <TabsTrigger value="links">Shared Links</TabsTrigger>
        </TabsList>

        <TabsContent value="with-me" className="space-y-4">
          <div className="grid gap-4">
            {sharedWithMe.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{doc.icon}</div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-3 w-3" />
                          <span>Shared by {doc.sharedBy}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{doc.sharedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPermissionColor(doc.permission)}>
                        {doc.permission}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {doc.permission === "edit" && (
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="by-me" className="space-y-4">
          <div className="grid gap-4">
            {sharedByMe.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{doc.icon}</div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Share className="h-3 w-3" />
                          <span>Shared with {doc.sharedWith}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{doc.sharedDate}</span>
                          <Eye className="h-3 w-3 ml-2" />
                          <span>{doc.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPermissionColor(doc.permission)}>
                        {doc.permission}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Shared Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No shared links created yet</p>
                <Button>
                  <Link className="h-4 w-4 mr-2" />
                  Create Shared Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
