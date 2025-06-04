
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useDocuments } from '@/hooks/useDocuments';

export const DocumentUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocument, isUploading } = useDocuments();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadDocument(file);
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt,.md"
      />
      <Button onClick={triggerFileSelect} disabled={isUploading}>
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </>
  );
};
