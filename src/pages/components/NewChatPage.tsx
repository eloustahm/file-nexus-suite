
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Upload,
  MessageSquare,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
}

export const NewChatPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  // Mock documents
  const availableDocuments: Document[] = [
    {
      id: '1',
      name: 'Project Proposal.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      name: 'Financial Report Q3.xlsx',
      type: 'Excel',
      size: '1.8 MB',
      uploadDate: new Date(Date.now() - 172800000)
    },
    {
      id: '3',
      name: 'Contract Terms.docx',
      type: 'Word',
      size: '856 KB',
      uploadDate: new Date(Date.now() - 259200000)
    }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt']
    }
  });

  const handleStartChat = (document: Document) => {
    navigate(`/chat/document/${document.id}`);
  };

  const handleUploadAndChat = () => {
    if (uploadedFiles.length > 0) {
      const mockId = Date.now().toString();
      navigate(`/chat/document/${mockId}`);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => navigate('/chats')} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Start New Chat
          </h1>
          <p className="text-gray-600">
            Select a document or upload a new one to begin chatting
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
              <h3 className="text-lg font-semibold mb-2">
                {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-gray-600 mb-1">or click to browse</p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOCX, XLSX, TXT files
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">Uploaded Files:</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleUploadAndChat}
                  className="w-full mt-4"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Chat with Uploaded Files
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Selection */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Select Existing Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.type} • {doc.size}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Uploaded {formatDate(doc.uploadDate)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartChat(doc)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
