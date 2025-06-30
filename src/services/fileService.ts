
import { http } from '@/lib/api';
import type { File, FileQueryParams, FileUpdateData, FileUploadResponse, FileListResponse } from '@/types/file';

export const fileService = {
  async getFiles(params?: FileQueryParams): Promise<FileListResponse> {
    return http.get<FileListResponse>('/files', { params });
  },

  async getFile(id: string): Promise<File> {
    return http.get<File>(`/files/${id}`);
  },

  async uploadFile(file: globalThis.File, metadata?: Record<string, any>): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    return http.upload<FileUploadResponse>('/files/upload', formData);
  },

  async updateFile(id: string, data: FileUpdateData): Promise<File> {
    return http.put<File>(`/files/${id}`, data);
  },

  async deleteFile(id: string): Promise<void> {
    return http.delete(`/files/${id}`);
  },

  async downloadFile(id: string): Promise<Blob> {
    return http.get<Blob>(`/files/${id}/download`, { responseType: 'blob' });
  },
};
