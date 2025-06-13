import type { LucideIcon } from 'lucide-react';

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
  tags?: string[];
  status: 'active' | 'archived' | 'deleted';
  version: number;
  parentId?: string;
  isFolder: boolean;
  children?: File[];
}

export interface FileType {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  extensions: string[];
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export interface FileFilter {
  id: string;
  label: string;
  value: string;
}

export interface FileQueryParams {
  search?: string;
  type?: string;
  status?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  parentId?: string;
}

export interface FileStats {
  totalFiles: number;
  totalSize: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  recentActivity: {
    uploads: number;
    downloads: number;
    updates: number;
  };
}

export interface FileListResponse {
  files: File[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface FileDownloadResponse {
  url: string;
}

export interface FileUpdateData {
  name?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  status?: 'active' | 'archived' | 'deleted';
}

export interface FileResponse {
  file: File;
} 