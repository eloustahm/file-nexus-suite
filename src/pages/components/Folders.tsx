
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Folder,
  FileText,
  Search,
  MoreVertical,
  Share,
  Archive,
  Trash2,
  Download,
  Eye,
  Users
} from "lucide-react";
import { NewFolderDialog } from "@/components/NewFolderDialog";

export const Folders = () => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Project Documents",
      description: "All project-related documents and files",
      fileCount: 24,
      access: "team",
      createdAt: "2023-12-01",
      lastModified: "2023-12-20",
      files: [
        { id: 1, name: "Project Proposal.pdf", size: "2.1 MB", type: "pdf", lastModified: "2 days ago" },
        { id: 2, name: "Budget Analysis.xlsx", size: "1.5 MB", type: "excel", lastModified: "1 week ago" },
        { id: 3, name: "Meeting Notes.docx", size: "456 KB", type: "word", lastModified: "3 days ago" }
      ]
    },
    {
      id: 2,
      name: "Legal Documents",
      description: "Contracts, agreements, and legal paperwork",
      fileCount: 12,
      access: "private",
      createdAt: "2023-11-15",
      lastModified: "2023-12-18",
      files: [
        { id: 4, name: "Service Agreement.pdf", size: "3.2 MB", type: "pdf", lastModified: "1 day ago" },
        { id: 5, name: "Privacy Policy.pdf", size: "890 KB", type: "pdf", lastModified: "5 days ago" }
      ]
    },
    {
      id: 3,
      name: "Marketing Materials",
      description: "Brochures, presentations, and marketing assets",
      fileCount: 18,
      access: "public",
      createdAt: "2023-12-10",
      lastModified: "2023-12-22",
      files: [
        { id: 6, name: "Brand Guidelines.pdf", size: "5.7 MB", type: "pdf", lastModified: "Today" },
        { id: 7, name: "Product Catalog.pdf", size: "8.2 MB", type: "pdf", lastModified: "Yesterday" },
        { id: 8, name: "Marketing Plan 2024.pptx", size: "12.1 MB", type: "powerpoint", lastModified: "1 week ago" }
      ]
    }
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getAccessColor = (access: string) => {
    switch (access) {
      case "private": return "bg-red-100 text-red-800";
      case "team": return "bg-blue-100 text-blue-800";
      case "public": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (type: string) => {
    return "📄"; // Simple emoji, can be replaced with proper icons
  };

  const handleCreateFolder = (newFolder: any) => {
    setFolders([...folders, newFolder]);
  };

  const handleDeleteFolder = (folderId: number) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
  };

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Folders</h1>
          <p className="text-gray-600 mt-1">Organize your documents in folders</p>
        </div>
        <NewFolderDialog onCreateFolder={handleCreateFolder} />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search folders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Folders Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredFolders.map((folder) => (
          <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">{folder.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Badge className={getAccessColor(folder.access)}>
                    {folder.access}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{folder.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{folder.fileCount} files</span>
                  <span>Modified {folder.lastModified}</span>
                </div>

                {/* Folder Actions */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    {selectedFolder === folder.id ? 'Hide' : 'View'} Files
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>

                {/* Files List */}
                {selectedFolder === folder.id && (
                  <div className="border-t pt-3 space-y-2">
                    <h4 className="font-medium text-sm">Files in this folder:</h4>
                    {folder.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <span>{getFileIcon(file.type)}</span>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} • {file.lastModified}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFolders.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No folders found matching your search.</p>
        </div>
      )}
    </div>
  );
};
