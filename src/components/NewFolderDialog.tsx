
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderPlus } from "lucide-react";

interface NewFolderDialogProps {
  onCreateFolder: (folder: any) => void;
}

export const NewFolderDialog = ({ onCreateFolder }: NewFolderDialogProps) => {
  const [open, setOpen] = useState(false);
  const [folderData, setFolderData] = useState({
    name: "",
    description: "",
    access: "private",
    parentFolder: ""
  });

  const handleCreate = () => {
    if (folderData.name) {
      onCreateFolder({
        id: Date.now(),
        name: folderData.name,
        description: folderData.description,
        access: folderData.access,
        parentFolder: folderData.parentFolder,
        fileCount: 0,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      });
      setFolderData({ name: "", description: "", access: "private", parentFolder: "" });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder to organize your documents
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Folder Name</label>
            <Input 
              placeholder="Enter folder name"
              value={folderData.name}
              onChange={(e) => setFolderData({...folderData, name: e.target.value})}
              className="mt-1" 
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description (Optional)</label>
            <Textarea 
              placeholder="Describe what this folder contains"
              value={folderData.description}
              onChange={(e) => setFolderData({...folderData, description: e.target.value})}
              className="mt-1" 
            />
          </div>
          <div>
            <label className="text-sm font-medium">Access Level</label>
            <Select value={folderData.access} onValueChange={(value) => setFolderData({...folderData, access: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team">Team Access</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Parent Folder (Optional)</label>
            <Select value={folderData.parentFolder} onValueChange={(value) => setFolderData({...folderData, parentFolder: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select parent folder" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate}>Create Folder</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
