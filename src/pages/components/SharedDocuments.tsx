
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Share2, 
  Search, 
  Users, 
  FileText, 
  Calendar,
  Eye,
  Download,
  Settings,
  UserPlus
} from "lucide-react";

interface SharedDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  sharedBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  sharedWith: number;
  permissions: 'view' | 'edit' | 'admin';
  lastModified: Date;
  sharedAt: Date;
}

export const SharedDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("shared-with-me");

  // Mock data - replace with store integration
  const sharedWithMe: SharedDocument[] = [
    {
      id: '1',
      name: 'Q4 Financial Report.xlsx',
      type: 'Excel',
      size: '2.1 MB',
      sharedBy: {
        name: 'Alice Johnson',
        email: 'alice@company.com',
        avatar: '/placeholder.svg'
      },
      sharedWith: 5,
      permissions: 'view',
      lastModified: new Date(Date.now() - 86400000),
      sharedAt: new Date(Date.now() - 172800000)
    },
    {
      id: '2',
      name: 'Project Proposal.docx',
      type: 'Word',
      size: '1.8 MB',
      sharedBy: {
        name: 'Bob Smith',
        email: 'bob@company.com'
      },
      sharedWith: 3,
      permissions: 'edit',
      lastModified: new Date(Date.now() - 3600000),
      sharedAt: new Date(Date.now() - 259200000)
    }
  ];

  const sharedByMe: SharedDocument[] = [
    {
      id: '3',
      name: 'Contract Terms.pdf',
      type: 'PDF',
      size: '856 KB',
      sharedBy: {
        name: 'You',
        email: 'you@company.com'
      },
      sharedWith: 8,
      permissions: 'admin',
      lastModified: new Date(Date.now() - 7200000),
      sharedAt: new Date(Date.now() - 345600000)
    }
  ];

  const currentDocuments = activeTab === "shared-with-me" ? sharedWithMe : sharedByMe;
  
  const filteredDocuments = currentDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.sharedBy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'edit': return 'bg-blue-100 text-blue-800';
      case 'view': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shared Documents</h1>
        <p className="text-gray-600 mt-1">Manage documents shared with you and by you</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search shared documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shared-with-me" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Shared With Me ({sharedWithMe.length})
          </TabsTrigger>
          <TabsTrigger value="shared-by-me" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Shared By Me ({sharedByMe.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shared-with-me" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Shared by {doc.sharedBy.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Modified {doc.lastModified.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {doc.sharedBy.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">+{doc.sharedWith}</span>
                      </div>
                      <Badge className={getPermissionColor(doc.permissions)}>
                        {doc.permissions}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {activeTab === "shared-by-me" && (
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared-by-me" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Shared with {doc.sharedWith} people</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Shared {doc.sharedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        {doc.sharedWith} members
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <Share2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shared documents found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "Start sharing documents to see them here"}
          </p>
        </div>
      )}
    </div>
  );
};
