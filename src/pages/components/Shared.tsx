
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Share2, 
  FileText, 
  Eye, 
  Edit, 
  Download, 
  Search,
  Filter,
  Calendar,
  User
} from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";

export const Shared = () => {
  const { documents, isLoading, error, refetch } = useDocuments();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Mock shared documents data
  const sharedDocuments = [
    {
      id: 1,
      name: "Project Proposal 2024.pdf",
      sharedBy: { name: "Alice Johnson", avatar: "/placeholder.svg" },
      sharedAt: "2024-01-15",
      role: "editor",
      size: "2.3 MB",
      type: "pdf"
    },
    {
      id: 2,
      name: "Marketing Strategy.docx",
      sharedBy: { name: "Bob Smith", avatar: "/placeholder.svg" },
      sharedAt: "2024-01-14",
      role: "viewer",
      size: "1.8 MB",
      type: "docx"
    },
    {
      id: 3,
      name: "Financial Report Q4.xlsx",
      sharedBy: { name: "Carol Davis", avatar: "/placeholder.svg" },
      sharedAt: "2024-01-13",
      role: "editor",
      size: "5.2 MB",
      type: "xlsx"
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const filteredDocuments = sharedDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || doc.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading shared documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shared with Me</h1>
        <p className="text-gray-600 mt-1">Documents that others have shared with you</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search shared documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shared Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Shared Documents
          </CardTitle>
          <CardDescription>
            {filteredDocuments.length} documents shared with you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {getFileIcon(document.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{document.name}</h3>
                    <Badge className={getRoleBadgeColor(document.role)}>
                      {document.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Shared by {document.sharedBy.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {document.sharedAt}
                    </div>
                    <span>{document.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {document.role !== 'viewer' && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
