
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/services/payment';
import { QUERY_KEYS } from '@/constants';
import { useToast } from '@/hooks/use-toast';

/**
 * React Query hooks for payment API
 */
export const usePaymentQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get plans
  const plansQuery = useQuery({
    queryKey: [QUERY_KEYS.PAYMENT, 'plans'],
    queryFn: paymentApi.getPlans,
  });

  // Get usage
  const usageQuery = useQuery({
    queryKey: [QUERY_KEYS.PAYMENT, 'usage'],
    queryFn: paymentApi.getUsage,
  });

  // Create subscription mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: paymentApi.createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT] });
      toast({
        title: 'Subscription created',
        description: 'Your subscription has been created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating subscription',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Cancel subscription mutation
  const cancelSubscriptionMutation = useMutation({
    mutationFn: paymentApi.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT] });
      toast({
        title: 'Subscription cancelled',
        description: 'Your subscription has been cancelled',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error cancelling subscription',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    // Data
    plans: plansQuery.data || [],
    usage: usageQuery.data,
    
    // Loading states
    loading: plansQuery.isLoading || usageQuery.isLoading,
    isLoadingPlans: plansQuery.isLoading,
    isLoadingUsage: usageQuery.isLoading,
    
    // Error states
    error: plansQuery.error || usageQuery.error,
    plansError: plansQuery.error,
    usageError: usageQuery.error,
    
    // Actions
    createSubscription: createSubscriptionMutation.mutate,
    cancelSubscription: cancelSubscriptionMutation.mutate,
    refetch: () => {
      plansQuery.refetch();
      usageQuery.refetch();
    },
    refetchPlans: plansQuery.refetch,
    refetchUsage: usageQuery.refetch,
    
    // Mutation states
    isCreating: createSubscriptionMutation.isPending,
    isCancelling: cancelSubscriptionMutation.isPending,
    isCreatingSubscription: createSubscriptionMutation.isPending,
    isCancellingSubscription: cancelSubscriptionMutation.isPending,
  };
};
