
import { z } from 'zod';

// Document validation schemas
export const createDocumentSchema = z.object({
  name: z.string().min(1, 'Document name is required').max(255, 'Name too long'),
  content: z.string().min(1, 'Document content is required'),
  type: z.string().min(1, 'Document type is required'),
  folderId: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const shareDocumentSchema = z.object({
  userIds: z.array(z.string().min(1, 'User ID is required')),
  permissions: z.enum(['read', 'write', 'admin']),
  expiresAt: z.string().optional()
});

// Chat validation schemas
export const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message content is required').max(4000, 'Message too long'),
  sessionId: z.string().optional(),
  documentId: z.string().optional(),
  agentId: z.string().optional()
});

export const createChatSessionSchema = z.object({
  title: z.string().min(1, 'Session title is required').max(255, 'Title too long'),
  documentId: z.string().optional(),
  agentId: z.string().optional()
});

// Team validation schemas
export const inviteMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'editor', 'viewer']),
  message: z.string().optional()
});

export const createChatRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  type: z.enum(['group', 'project']),
  members: z.array(z.string()).min(1, 'At least one member is required')
});

// Settings validation schemas
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'Name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Document generation validation schemas
export const generateDocumentSchema = z.object({
  title: z.string().min(1, 'Document title is required').max(255, 'Title too long'),
  purpose: z.string().min(1, 'Document purpose is required').max(500, 'Purpose too long'),
  instructions: z.string().max(2000, 'Instructions too long').optional(),
  templateId: z.string().optional()
});

// Notification settings validation schema
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  documentUpdates: z.boolean(),
  teamInvites: z.boolean(),
  systemAlerts: z.boolean(),
  marketingEmails: z.boolean()
});

// Folder validation schemas
export const createFolderSchema = z.object({
  name: z.string().min(1, 'Folder name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  parentId: z.string().optional()
});

// Workflow validation schemas
export const createWorkflowSchema = z.object({
  name: z.string().min(1, 'Workflow name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  trigger: z.enum(['manual', 'upload', 'schedule', 'approval']),
  steps: z.array(z.object({
    name: z.string().min(1, 'Step name is required'),
    type: z.enum(['approval', 'review', 'automation', 'notification']),
    assignedTo: z.string().optional()
  })).optional()
});

// Generic validation helpers
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    throw error;
  }
};

export const validatePartialData = <T>(schema: z.ZodSchema<T>, data: unknown): Partial<T> => {
  try {
    // Convert schema to partial and parse
    const partialSchema = z.object({}).passthrough();
    const result = partialSchema.parse(data);
    
    // Validate individual fields that are present
    const validatedResult: any = {};
    const schemaShape = (schema as any)._def?.shape?.();
    
    if (schemaShape && typeof data === 'object' && data !== null) {
      Object.keys(data as object).forEach(key => {
        if (schemaShape[key]) {
          try {
            validatedResult[key] = schemaShape[key].parse((data as any)[key]);
          } catch (error) {
            // Skip invalid fields in partial validation
          }
        }
      });
    }
    
    return validatedResult;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    throw error;
  }
};
