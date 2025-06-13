export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinedAt: string;
  lastActive?: string;
}

export interface TeamSettings {
  teamName: string;
  teamDescription: string;
  visibility: 'private' | 'public';
  allowInvites: boolean;
  requireApproval: boolean;
  enableNotifications: boolean;
  defaultRole: 'viewer' | 'editor';
  maxMembers: number;
  enableTwoFactor: boolean;
  sessionTimeout: number;
}

export interface TeamRoom {
  id: string;
  name: string;
  type: 'group' | 'project';
  members: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
} 