import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '@/services/payment';
import type { Plan, Subscription, Usage } from '@/types/payment';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const usePaymentQuery = () => {
  const queryClient = useQueryClient();

  // Get plans query
  const plansQuery = useQuery({
    queryKey: [QUERY_KEYS.PAYMENT, 'plans'],
    queryFn: paymentService.getPlans,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Get current subscription query
  const subscriptionQuery = useQuery({
    queryKey: [QUERY_KEYS.PAYMENT, 'subscription'],
    queryFn: paymentService.getSubscription,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get usage query
  const usageQuery = useQuery({
    queryKey: [QUERY_KEYS.PAYMENT, 'usage'],
    queryFn: paymentService.getUsage,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create subscription mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: (planId: string) => paymentService.createSubscription(planId),
    onSuccess: (subscription) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT] });
      queryClient.setQueryData([QUERY_KEYS.PAYMENT, 'subscription'], subscription);
      toast.success('Subscription created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create subscription');
    },
  });

  // Cancel subscription mutation
  const cancelSubscriptionMutation = useMutation({
    mutationFn: paymentService.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT] });
      queryClient.setQueryData([QUERY_KEYS.PAYMENT, 'subscription'], null);
      toast.success('Subscription cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel subscription');
    },
  });

  // Update payment method mutation
  const updatePaymentMethodMutation = useMutation({
    mutationFn: (paymentMethodId: string) => paymentService.updatePaymentMethod(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT] });
      toast.success('Payment method updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update payment method');
    },
  });

  return {
    // Server data
    plans: plansQuery.data || [],
    subscription: subscriptionQuery.data,
    usage: usageQuery.data,
    
    // Server state
    isLoadingPlans: plansQuery.isLoading,
    isLoadingSubscription: subscriptionQuery.isLoading,
    isLoadingUsage: usageQuery.isLoading,
    plansError: plansQuery.error?.message,
    subscriptionError: subscriptionQuery.error?.message,
    usageError: usageQuery.error?.message,
    
    // Payment actions
    createSubscription: createSubscriptionMutation.mutate,
    cancelSubscription: cancelSubscriptionMutation.mutate,
    updatePaymentMethod: updatePaymentMethodMutation.mutate,
    refetchPlans: plansQuery.refetch,
    refetchSubscription: subscriptionQuery.refetch,
    refetchUsage: usageQuery.refetch,
    
    // Mutation states
    isCreatingSubscription: createSubscriptionMutation.isPending,
    isCancellingSubscription: cancelSubscriptionMutation.isPending,
    isUpdatingPaymentMethod: updatePaymentMethodMutation.isPending,
  };
}; 