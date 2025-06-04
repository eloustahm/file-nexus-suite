
import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Base state interface that all contexts will extend
 */
export interface BaseContextState {
  loading: boolean;
  error: string | null;
}

/**
 * Base actions interface that all contexts will extend
 */
export interface BaseContextActions {
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * Utility function to handle async actions with loading and error states
 */
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
    console.error('Context action error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};

/**
 * Creates base actions that all contexts can use
 */
export const createBaseActions = (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): BaseContextActions => ({
  clearError: () => setError(null),
  setLoading,
  setError
});
