
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { paymentService } from '@/services/payment';
import { toast } from 'sonner';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: paymentService.getSubscriptions,
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: paymentService.createSubscription,
    onSuccess: () => {
      toast.success('Subscription created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create subscription');
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: paymentService.cancelSubscription,
    onSuccess: () => {
      toast.success('Subscription cancelled successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel subscription');
    },
  });

  return {
    subscriptions: subscriptions || [],
    isLoading,
    isProcessing,
    createSubscription: createSubscriptionMutation.mutate,
    cancelSubscription: cancelSubscriptionMutation.mutate,
  };
};
