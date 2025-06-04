
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/services/payment';
import { toast } from 'sonner';

export const usePaymentQuery = () => {
  const queryClient = useQueryClient();

  // Get plans query
  const plansQuery = useQuery({
    queryKey: ['payment', 'plans'],
    queryFn: paymentApi.getPlans,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Get usage query
  const usageQuery = useQuery({
    queryKey: ['payment', 'usage'],
    queryFn: paymentApi.getUsage,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create subscription mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: (planId: string) => paymentApi.createSubscription(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      toast.success('Subscription created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create subscription');
    },
  });

  // Cancel subscription mutation
  const cancelSubscriptionMutation = useMutation({
    mutationFn: paymentApi.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      toast.success('Subscription cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel subscription');
    },
  });

  return {
    // Data
    plans: plansQuery.data || [],
    usage: usageQuery.data,

    // Loading states
    isLoadingPlans: plansQuery.isLoading,
    isLoadingUsage: usageQuery.isLoading,

    // Errors
    plansError: plansQuery.error,
    usageError: usageQuery.error,

    // Mutations
    createSubscription: createSubscriptionMutation.mutateAsync,
    cancelSubscription: cancelSubscriptionMutation.mutateAsync,

    // Loading states
    isCreatingSubscription: createSubscriptionMutation.isPending,
    isCancellingSubscription: cancelSubscriptionMutation.isPending,

    // Refetch
    refetchPlans: plansQuery.refetch,
    refetchUsage: usageQuery.refetch,
  };
};
