import { http } from '@/lib/api';
import type { File, FileQueryParams, FileUpdateData, FileListResponse, FileResponse, FileDownloadResponse } from '@/types/file';

export const fileService = {
  // Get list of files with optional query parameters
  async getFiles(params: FileQueryParams): Promise<FileListResponse> {
    return http.get<FileListResponse>('/files', { params });
  },

  // Get a single file by ID
  async getFile(id: string): Promise<File> {
    const response = await http.get<FileResponse>(`/files/${id}`);
    return response.file;
  },

  // Get file download URL
  async getDownloadUrl(id: string): Promise<string> {
    const response = await http.get<FileDownloadResponse>(`/files/${id}/download`);
    return response.url;
  },

  // Update file metadata
  async updateFile(id: string, data: FileUpdateData): Promise<File> {
    const response = await http.patch<FileResponse>(`/files/${id}`, data);
    return response.file;
  },

  // Delete a file
  async deleteFile(id: string): Promise<void> {
    await http.delete<void>(`/files/${id}`);
  },

  // Upload a new file
  async uploadFile(file: File, data: Partial<File>): Promise<File> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(data));

    const response = await http.upload<FileResponse>('/files/upload', formData);
    return response.file;
  },

  // Get file preview URL
  async getPreviewUrl(id: string): Promise<string> {
    const response = await http.get<FileDownloadResponse>(`/files/${id}/preview`);
    return response.url;
  },

  // Get file metadata
  async getFileMetadata(id: string): Promise<Record<string, any>> {
    const response = await http.get<{ metadata: Record<string, any> }>(`/files/${id}/metadata`);
    return response.metadata;
  },

  // Get file versions
  async getFileVersions(id: string): Promise<File[]> {
    const response = await http.get<{ versions: File[] }>(`/files/${id}/versions`);
    return response.versions;
  },

  // Restore a specific version
  async restoreVersion(id: string, versionId: string): Promise<File> {
    const response = await http.post<FileResponse>(`/files/${id}/versions/${versionId}/restore`);
    return response.file;
  },
}; 