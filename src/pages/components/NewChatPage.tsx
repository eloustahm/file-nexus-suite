
import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Divider
} from '@mui/material';
import {
  FileText,
  Upload,
  MessageSquare,
  ArrowLeft,
  Download,
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
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
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
    // Navigate to chat interface with selected document
    navigate(`/chat/document/${document.id}`);
  };

  const handleUploadAndChat = () => {
    if (uploadedFiles.length > 0) {
      // In a real app, upload the file first, then navigate
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton onClick={() => navigate('/chats')} sx={{ mr: 2 }}>
          <ArrowLeft />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Start New Chat
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a document or upload a new one to begin chatting
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                <Upload size={20} />
                Upload New Document
              </Typography>
              
              <Paper
                {...getRootProps()}
                sx={{
                  p: 4,
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.300',
                  backgroundColor: isDragActive ? 'primary.50' : 'grey.50',
                  cursor: 'pointer',
                  textAlign: 'center',
                  mt: 2,
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.50'
                  }
                }}
              >
                <input {...getInputProps()} />
                <Upload size={48} color={isDragActive ? '#1976d2' : '#666'} style={{ marginBottom: 16 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  or click to browse
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Supports PDF, DOCX, XLSX, TXT files
                </Typography>
              </Paper>

              {uploadedFiles.length > 0 && (
                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Files:
                  </Typography>
                  <List dense>
                    {uploadedFiles.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <FileText size={20} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={file.name}
                          secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleUploadAndChat}
                    startIcon={<MessageSquare />}
                    sx={{ mt: 2 }}
                  >
                    Start Chat with Uploaded Files
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Document Selection */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                <FileText size={20} />
                Select Existing Document
              </Typography>
              
              <List sx={{ mt: 2 }}>
                {availableDocuments.map((doc, index) => (
                  <React.Fragment key={doc.id}>
                    <ListItem>
                      <ListItemIcon>
                        <FileText size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={doc.name}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              {doc.type} • {doc.size}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Uploaded {formatDate(doc.uploadDate)}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleStartChat(doc)}
                          startIcon={<MessageSquare />}
                        >
                          Chat
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < availableDocuments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
