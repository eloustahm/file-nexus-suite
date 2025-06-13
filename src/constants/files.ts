import { File, FileType } from '@/types/file';
import {
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  File as FileIcon,
} from 'lucide-react';

export interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'code' | 'other';
  size: string;
  lastModified: string;
  owner: {
    name: string;
    email: string;
    avatar?: string;
  };
  shared: boolean;
  starred: boolean;
  tags: string[];
  path: string;
  icon: typeof FileText;
}

export const FILE_TYPES: Record<string, FileType> = {
  document: {
    id: 'document',
    label: 'Document',
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    extensions: ['.doc', '.docx', '.pdf', '.txt', '.rtf'],
  },
  image: {
    id: 'image',
    label: 'Image',
    icon: Image,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
  },
  video: {
    id: 'video',
    label: 'Video',
    icon: Video,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    extensions: ['.mp4', '.mov', '.avi', '.wmv', '.flv'],
  },
  audio: {
    id: 'audio',
    label: 'Audio',
    icon: Music,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  },
  archive: {
    id: 'archive',
    label: 'Archive',
    icon: Archive,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    extensions: ['.zip', '.rar', '.7z', '.tar', '.gz'],
  },
  code: {
    id: 'code',
    label: 'Code',
    icon: Code,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    extensions: ['.js', '.ts', '.py', '.java', '.cpp', '.html', '.css'],
  },
  other: {
    id: 'other',
    label: 'Other',
    icon: FileIcon,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    extensions: [],
  },
};

export const FILE_FILTERS = [
  { id: 'all', label: 'All Files', value: 'all' },
  { id: 'document', label: 'Documents', value: 'document' },
  { id: 'image', label: 'Images', value: 'image' },
  { id: 'video', label: 'Videos', value: 'video' },
  { id: 'audio', label: 'Audio', value: 'audio' },
  { id: 'archive', label: 'Archives', value: 'archive' },
  { id: 'code', label: 'Code', value: 'code' },
];

export const FILE_SORT_OPTIONS = [
  { id: 'name-asc', label: 'Name (A-Z)', value: 'name', order: 'asc' },
  { id: 'name-desc', label: 'Name (Z-A)', value: 'name', order: 'desc' },
  { id: 'date-asc', label: 'Date (Oldest)', value: 'createdAt', order: 'asc' },
  { id: 'date-desc', label: 'Date (Newest)', value: 'createdAt', order: 'desc' },
  { id: 'size-asc', label: 'Size (Smallest)', value: 'size', order: 'asc' },
  { id: 'size-desc', label: 'Size (Largest)', value: 'size', order: 'desc' },
];

export const SAMPLE_FILES: FileItem[] = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    type: 'document',
    size: '2.5 MB',
    lastModified: '2024-03-15T10:30:00Z',
    owner: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg'
    },
    shared: true,
    starred: true,
    tags: ['important', 'project'],
    path: '/Documents/Project Proposal.pdf',
    icon: FileText
  },
  {
    id: '2',
    name: 'Team Photo.jpg',
    type: 'image',
    size: '1.8 MB',
    lastModified: '2024-03-15T11:15:00Z',
    owner: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/avatars/jane.jpg'
    },
    shared: false,
    starred: false,
    tags: ['team', 'photo'],
    path: '/Images/Team Photo.jpg',
    icon: Image
  },
  {
    id: '3',
    name: 'Product Demo.mp4',
    type: 'video',
    size: '45.2 MB',
    lastModified: '2024-03-15T12:00:00Z',
    owner: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: '/avatars/mike.jpg'
    },
    shared: true,
    starred: true,
    tags: ['demo', 'product'],
    path: '/Videos/Product Demo.mp4',
    icon: Video
  },
  {
    id: '4',
    name: 'Background Music.mp3',
    type: 'audio',
    size: '3.7 MB',
    lastModified: '2024-03-15T13:45:00Z',
    owner: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      avatar: '/avatars/sarah.jpg'
    },
    shared: false,
    starred: false,
    tags: ['music', 'background'],
    path: '/Audio/Background Music.mp3',
    icon: Music
  },
  {
    id: '5',
    name: 'Project Files.zip',
    type: 'archive',
    size: '156.8 MB',
    lastModified: '2024-03-15T14:30:00Z',
    owner: {
      name: 'Alex Brown',
      email: 'alex@example.com',
      avatar: '/avatars/alex.jpg'
    },
    shared: true,
    starred: false,
    tags: ['backup', 'project'],
    path: '/Archives/Project Files.zip',
    icon: Archive
  }
]; 