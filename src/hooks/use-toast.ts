
import { toast as sonnerToast } from 'sonner';

// Simple wrapper around sonner to match the expected interface
export const toast = ({ title, description, variant }: { 
  title: string; 
  description?: string; 
  variant?: 'default' | 'destructive'; 
}) => {
  if (variant === 'destructive') {
    sonnerToast.error(title, { description });
  } else {
    sonnerToast.success(title, { description });
  }
};

export const useToast = () => {
  return {
    toast,
    toasts: [] // For compatibility with shadcn components
  };
};
