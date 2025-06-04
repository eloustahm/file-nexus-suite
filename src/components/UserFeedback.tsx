
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface UserFeedbackProps {
  type: FeedbackType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const feedbackIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const feedbackColors = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600'
};

export const UserFeedback = ({ type, title, message, action }: UserFeedbackProps) => {
  const Icon = feedbackIcons[type];
  const colorClass = feedbackColors[type];

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border bg-white shadow-sm">
      <Icon className={`h-5 w-5 ${colorClass}`} />
      <div className="flex-1">
        <h4 className={`font-medium ${colorClass}`}>{title}</h4>
        {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
      </div>
      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

// Helper hook for common feedback patterns
export const useFeedback = () => {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: 'default',
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: 'destructive',
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: 'default',
    });
  };

  return {
    showSuccess,
    showError,
    showInfo
  };
};
