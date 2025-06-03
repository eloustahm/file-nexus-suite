
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SidebarHeaderProps {
  collapsed: boolean;
}

export const SidebarHeader = ({ collapsed }: SidebarHeaderProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white"/>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-gray-900">
              DocuFlow
            </span>
          )}
        </div>
        <SidebarTrigger/>
      </div>

      {!collapsed && (
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6">
              <Plus className="h-4 w-4 mr-2"/>
              New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Choose files to upload to your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="document-upload">Select Files</Label>
                <Input
                  id="document-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="mt-1"
                  accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx"
                />
              </div>
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, DOC, DOCX, TXT, XLSX, PPTX
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
