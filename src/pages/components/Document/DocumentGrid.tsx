
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, FileText, Download, Share, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDocumentsUIStore } from '@/store/useDocumentsUIStore';
import { Document } from '@/services/documents';

interface DocumentGridProps {
  viewMode: 'grid' | 'list';
  filteredDocuments: Document[];
}

export const DocumentGrid = ({ viewMode, filteredDocuments }: DocumentGridProps) => {
  const { toggleDocumentSelection, selectedDocumentIds } = useDocumentsUIStore();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (filteredDocuments.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">Upload your first document to get started.</p>
        </CardContent>
      </Card>
    );
  }

  if (viewMode === 'list') {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Size</th>
                  <th className="text-left p-4 font-medium text-gray-900">Modified</th>
                  <th className="text-left p-4 font-medium text-gray-900">Tags</th>
                  <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr 
                    key={doc.id} 
                    className={`border-b hover:bg-gray-50 cursor-pointer ${
                      selectedDocumentIds.includes(doc.id) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => toggleDocumentSelection(doc.id)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{doc.type}</Badge>
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatFileSize(doc.size)}
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatDate(doc.updatedAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {doc.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredDocuments.map((doc) => (
        <Card 
          key={doc.id} 
          className={`cursor-pointer hover:shadow-md transition-shadow ${
            selectedDocumentIds.includes(doc.id) ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => toggleDocumentSelection(doc.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <FileText className="h-8 w-8 text-gray-400" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <h3 className="font-medium text-gray-900 truncate mb-2">{doc.name}</h3>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Type</span>
                <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Size</span>
                <span>{formatFileSize(doc.size)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Modified</span>
                <span>{formatDate(doc.updatedAt)}</span>
              </div>
            </div>
            
            {doc.tags && doc.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {doc.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {doc.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{doc.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
