
/**
 * Utility functions and types for Zustand stores
 */

export interface BaseStoreState {
  loading: boolean;
  error: string | null;
}

export interface BaseStoreActions {
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const createBaseActions = (set: any): BaseStoreActions => ({
  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error })
});

export const handleAsyncAction = async <T>(
  action: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<T | null> => {
  try {
    setLoading(true);
    setError(null);
    return await action();
  } catch (error: any) {
    setError(error.message || 'An unexpected error occurred');
    console.error('Store action error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};
