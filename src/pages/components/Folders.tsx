
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Folder,
  FolderPlus,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Upload,
  Star,
  Clock,
  Share,
  Trash2
} from "lucide-react";

export const Folders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const folders = [
    {
      id: 1,
      name: "Marketing Materials",
      itemCount: 24,
      lastModified: "2 days ago",
      shared: true,
      starred: true,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Project Documents",
      itemCount: 18,
      lastModified: "5 days ago",
      shared: false,
      starred: false,
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "Templates",
      itemCount: 12,
      lastModified: "1 week ago",
      shared: true,
      starred: true,
      color: "bg-purple-500"
    },
    {
      id: 4,
      name: "Archive",
      itemCount: 156,
      lastModified: "2 weeks ago",
      shared: false,
      starred: false,
      color: "bg-gray-500"
    },
    {
      id: 5,
      name: "Client Presentations",
      itemCount: 8,
      lastModified: "3 days ago",
      shared: true,
      starred: false,
      color: "bg-orange-500"
    },
    {
      id: 6,
      name: "Reports",
      itemCount: 32,
      lastModified: "1 day ago",
      shared: false,
      starred: true,
      color: "bg-red-500"
    }
  ];

  const FolderCard = ({ folder }: { folder: typeof folders[0] }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`h-12 w-12 ${folder.color} rounded-lg flex items-center justify-center`}>
            <Folder className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {folder.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
            {folder.shared && <Share className="h-4 w-4 text-blue-500" />}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{folder.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{folder.itemCount} items</span>
          <span>{folder.lastModified}</span>
        </div>
      </CardContent>
    </Card>
  );

  const FolderListItem = ({ folder }: { folder: typeof folders[0] }) => (
    <Card className="hover:shadow-sm transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 ${folder.color} rounded flex items-center justify-center`}>
              <Folder className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{folder.name}</h3>
              <p className="text-sm text-gray-500">{folder.itemCount} items • {folder.lastModified}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {folder.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
            {folder.shared && (
              <Badge variant="secondary" className="text-xs">
                <Share className="h-3 w-3 mr-1" />
                Shared
              </Badge>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Folders</h1>
          <p className="text-gray-600 mt-1">Organize your documents in folders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="flex border rounded-lg">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          <Star className="h-4 w-4 mr-2" />
          Starred
        </Button>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Shared
        </Button>
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          Recent
        </Button>
      </div>

      {/* Folders Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {folders.map((folder) => (
            <FolderListItem key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
};
