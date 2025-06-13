import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retryOnMount: true,
      throwOnError: true,
      onError: (error: any) => {
        toast.error(error.message || 'An error occurred while fetching data');
      },
    },
    mutations: {
      retry: 1,
      onError: (error: any) => {
        toast.error(error.message || 'An error occurred while saving data');
      },
    },
  },
});

// Helper function to handle optimistic updates
export const optimisticUpdate = <T>(
  queryKey: unknown[],
  updateFn: (oldData: T) => T
) => {
  queryClient.setQueryData(queryKey, (old: T) => updateFn(old));
};

// Helper function to handle optimistic delete
export const optimisticDelete = <T extends { id: string }>(
  queryKey: unknown[],
  id: string
) => {
  queryClient.setQueryData(queryKey, (old: T[] = []) => 
    old.filter(item => item.id !== id)
  );
};

// Helper function to handle optimistic create
export const optimisticCreate = <T>(
  queryKey: unknown[],
  newItem: T
) => {
  queryClient.setQueryData(queryKey, (old: T[] = []) => [...old, newItem]);
};

// Helper function to handle optimistic update of a single item
export const optimisticUpdateItem = <T extends { id: string }>(
  queryKey: unknown[],
  id: string,
  updateFn: (oldItem: T) => T
) => {
  queryClient.setQueryData(queryKey, (old: T[] = []) =>
    old.map(item => item.id === id ? updateFn(item) : item)
  );
};
