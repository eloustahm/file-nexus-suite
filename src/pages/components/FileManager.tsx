import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { FILE_TYPES, FILE_FILTERS } from '@/constants/files';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Star, Share2, MoreVertical, Download, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useFilesQuery,
  useUpdateFileMutation,
  useDeleteFileMutation,
  useFileDownloadUrlQuery,
} from '@/hooks/queries/useFiles';
import type { File, FileUpdateData, FileQueryParams } from '@/types/file';

export function FileManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const queryParams: FileQueryParams = {
    search: searchQuery,
    type: selectedFilter === 'all' ? undefined : selectedFilter,
    limit: 50,
  };

  const { data: filesData, isLoading } = useFilesQuery(queryParams);

  const { mutate: updateFile } = useUpdateFileMutation();
  const { mutate: deleteFile } = useDeleteFileMutation();
  const { data: downloadUrlData } = useFileDownloadUrlQuery(selectedFileId ?? '');

  const files = filesData?.files ?? [];

  const handleStarToggle = (file: File) => {
    const updateData: FileUpdateData = {
      starred: !file.metadata.starred,
    };
    updateFile({
      id: file.id,
      data: updateData,
    });
  };

  const handleShareToggle = (file: File) => {
    const updateData: FileUpdateData = {
      shared: !file.metadata.shared,
    };
    updateFile({
      id: file.id,
      data: updateData,
    });
  };

  const handleDelete = (fileId: string) => {
    deleteFile(fileId);
  };

  const handleDownload = (fileId: string) => {
    setSelectedFileId(fileId);
    const url = downloadUrlData?.url;
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">File Manager</h2>
        <Button>
          Upload File
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedFilter}>
        <TabsList>
          {FILE_FILTERS.map(filter => (
            <TabsTrigger
              key={filter.id}
              value={filter.value}
            >
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedFilter} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No files found
              </div>
            ) : (
              files.map((file) => {
                const fileType = FILE_TYPES[file.type] ?? FILE_TYPES.other;
                const Icon = fileType.icon;

                return (
                  <Card key={file.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2 rounded-lg",
                        fileType.bgColor
                      )}>
                        <Icon className={cn("w-5 h-5", fileType.color)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStarToggle(file)}
                            >
                              <Star className={cn(
                                "w-4 h-4",
                                file.metadata.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              )} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleShareToggle(file)}
                            >
                              <Share2 className={cn(
                                "w-4 h-4",
                                file.metadata.shared ? "text-blue-500" : "text-muted-foreground"
                              )} />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDownload(file.id)}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-500"
                                  onClick={() => handleDelete(file.id)}
                                >
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{file.createdBy}</span>
                          <span>•</span>
                          <span>{file.path}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {file.tags.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
} 