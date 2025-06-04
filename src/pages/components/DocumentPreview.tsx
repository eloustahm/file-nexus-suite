
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Toolbar
} from '@mui/material';
import {
  Download,
  Share,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface DocumentPreviewProps {
  document: {
    id: string;
    name: string;
    type: string;
    size: string;
    content: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onDownload,
  onShare
}) => {
  const [zoom, setZoom] = React.useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Preview Header */}
      <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          {document.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
          {document.type} • {document.size}
        </Typography>
        <Button size="small" onClick={handleZoomOut} disabled={zoom <= 50}>
          <ZoomOut size={16} />
        </Button>
        <Typography variant="caption" sx={{ mx: 1 }}>
          {zoom}%
        </Typography>
        <Button size="small" onClick={handleZoomIn} disabled={zoom >= 200}>
          <ZoomIn size={16} />
        </Button>
        {onShare && (
          <Button size="small" onClick={onShare} sx={{ ml: 1 }}>
            <Share size={16} />
          </Button>
        )}
        {onDownload && (
          <Button size="small" onClick={onDownload} sx={{ ml: 1 }}>
            <Download size={16} />
          </Button>
        )}
      </Toolbar>

      {/* Preview Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Paper 
          sx={{ 
            p: 3, 
            bgcolor: 'grey.50', 
            minHeight: '100%',
            fontSize: `${zoom}%`
          }}
        >
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'inherit', 
            margin: 0,
            lineHeight: 1.6
          }}>
            {document.content}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
};
