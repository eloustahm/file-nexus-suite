
export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  content?: string;
  folderId?: string;
  parentId?: string;
  isShared: boolean;
  status?: 'active' | 'archived' | 'deleted';
  path?: string;
  createdBy?: string;
  url?: string;
  metadata?: Record<string, any>;
  starred?: boolean;
  shared?: boolean;
}

export interface FileType {
  id: string;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  extensions: string[];
}

export interface FileQueryParams {
  folderId?: string;
  type?: string;
  search?: string;
  tags?: string[];
  status?: 'active' | 'archived' | 'deleted';
  page?: number;
  limit?: number;
}

export interface FileUpdateData {
  name?: string;
  content?: string;
  tags?: string[];
  folderId?: string;
  status?: 'active' | 'archived' | 'deleted';
  starred?: boolean;
  shared?: boolean;
}

export interface FileUploadResponse {
  file: File;
  success: boolean;
  message: string;
}

export interface FileListResponse {
  files: File[];
  total: number;
  page: number;
  limit: number;
}

export interface FileResponse {
  file: File;
  success: boolean;
  message: string;
}

export interface FileDownloadResponse {
  url: string;
  filename: string;
  size: number;
}

export interface FileVersion {
  id: string;
  fileId: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  changes: string;
  size: number;
}

export interface FileMetadata {
  id: string;
  fileId: string;
  metadata: Record<string, any>;
  extractedText?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
}
