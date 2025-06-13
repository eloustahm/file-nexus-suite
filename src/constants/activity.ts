import { FileText, Upload, Download, Edit, Trash, Share, Lock, Unlock } from 'lucide-react';

export interface ActivityLog {
  id: string;
  type: 'upload' | 'download' | 'edit' | 'delete' | 'share' | 'permission';
  description: string;
  timestamp: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  details?: {
    fileName?: string;
    fileSize?: string;
    fileType?: string;
    sharedWith?: string[];
    permission?: 'read' | 'write' | 'admin';
  };
  icon: typeof FileText;
}

export const ACTIVITY_TYPES = {
  upload: {
    icon: Upload,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  download: {
    icon: Download,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  edit: {
    icon: Edit,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  delete: {
    icon: Trash,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  share: {
    icon: Share,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  permission: {
    icon: Lock,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  }
};

export const ACTIVITY_FILTERS = [
  {
    id: 'all',
    label: 'All Activities',
    value: 'all'
  },
  {
    id: 'uploads',
    label: 'Uploads',
    value: 'upload'
  },
  {
    id: 'downloads',
    label: 'Downloads',
    value: 'download'
  },
  {
    id: 'edits',
    label: 'Edits',
    value: 'edit'
  },
  {
    id: 'deletes',
    label: 'Deletions',
    value: 'delete'
  },
  {
    id: 'shares',
    label: 'Shares',
    value: 'share'
  },
  {
    id: 'permissions',
    label: 'Permissions',
    value: 'permission'
  }
];

export const SAMPLE_ACTIVITIES: ActivityLog[] = [
  {
    id: '1',
    type: 'upload',
    description: 'Uploaded a new document',
    timestamp: '2024-03-15T10:30:00Z',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg'
    },
    details: {
      fileName: 'Project Proposal.pdf',
      fileSize: '2.5 MB',
      fileType: 'application/pdf'
    },
    icon: Upload
  },
  {
    id: '2',
    type: 'share',
    description: 'Shared document with team',
    timestamp: '2024-03-15T11:15:00Z',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/avatars/jane.jpg'
    },
    details: {
      fileName: 'Project Proposal.pdf',
      sharedWith: ['team@example.com', 'client@example.com']
    },
    icon: Share
  },
  {
    id: '3',
    type: 'permission',
    description: 'Updated document permissions',
    timestamp: '2024-03-15T12:00:00Z',
    user: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: '/avatars/mike.jpg'
    },
    details: {
      fileName: 'Project Proposal.pdf',
      permission: 'write'
    },
    icon: Lock
  },
  {
    id: '4',
    type: 'edit',
    description: 'Edited document content',
    timestamp: '2024-03-15T13:45:00Z',
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      avatar: '/avatars/sarah.jpg'
    },
    details: {
      fileName: 'Project Proposal.pdf'
    },
    icon: Edit
  },
  {
    id: '5',
    type: 'download',
    description: 'Downloaded document',
    timestamp: '2024-03-15T14:30:00Z',
    user: {
      name: 'Alex Brown',
      email: 'alex@example.com',
      avatar: '/avatars/alex.jpg'
    },
    details: {
      fileName: 'Project Proposal.pdf',
      fileSize: '2.5 MB',
      fileType: 'application/pdf'
    },
    icon: Download
  }
]; 