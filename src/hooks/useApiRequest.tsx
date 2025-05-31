
import { useState, useCallback } from 'react';

export interface ApiRequestState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiRequestReturn<T = any> {
  state: ApiRequestState<T>;
  execute: (requestFn: () => Promise<T>) => Promise<void>;
  reset: () => void;
  setData: (data: T) => void;
}

export const useApiRequest = <T = any>(): UseApiRequestReturn<T> => {
  const [state, setState] = useState<ApiRequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (requestFn: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await requestFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  return { state, execute, reset, setData };
};
