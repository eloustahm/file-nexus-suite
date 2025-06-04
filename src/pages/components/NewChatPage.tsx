
import React, { useState, useCallback, useEffect } from 'react';
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
import { useDocumentsStore } from '@/store/useDocumentsStore';

export const NewChatPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { documents, loading, fetchDocuments } = useDocumentsStore();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

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

  const handleStartChat = (documentId: string) => {
    navigate(`/dashboard/chat/document/${documentId}`);
  };

  const handleUploadAndChat = () => {
    if (uploadedFiles.length > 0) {
      const mockId = Date.now().toString();
      navigate(`/dashboard/chat/document/${mockId}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/chat')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Chat
        </Button>
        <div className="h-4 w-px bg-gray-300" />
        <h1 className="text-2xl font-bold text-gray-900">Start New Chat</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload New Document */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload & Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                {isDragActive
                  ? 'Drop your files here...'
                  : 'Drag & drop files here, or click to select'}
              </p>
              <p className="text-xs text-gray-500">
                Supports PDF, DOCX, XLSX, TXT files
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm text-gray-900">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </div>
                    <Badge variant="outline">{formatFileSize(file.size)}</Badge>
                  </div>
                ))}
                <Button onClick={handleUploadAndChat} className="w-full mt-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Chat with Uploaded Files
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Select Existing Document */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Select Existing Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-4">
                  No documents available. Upload some documents first.
                </p>
                <Button variant="outline" onClick={() => navigate('/dashboard/documents')}>
                  Go to Documents
                </Button>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {documents.slice(0, 10).map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleStartChat(document.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {document.name}
                        </h4>
                        <Badge variant="outline">{document.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{formatFileSize(document.size)}</span>
                        <span>•</span>
                        <span>{formatDate(document.updatedAt)}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* General Chat Option */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start General Chat
            </h3>
            <p className="text-gray-600 mb-4">
              Chat with AI assistant without any specific document context
            </p>
            <Button onClick={() => navigate('/dashboard/chat/general')}>
              <Plus className="h-4 w-4 mr-2" />
              Start General Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
