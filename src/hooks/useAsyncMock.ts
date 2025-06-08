import { useCallback, useEffect, useState } from 'react';

export function useAsyncMock<T>(asyncFunction: () => Promise<T>) {
  const [state, setState] = useState<{
    data: T | null;
    isLoading: boolean;
    error: string | null;
  }>({
    data: null,
    isLoading: true, // Sempre inicia como true
    error: null,
  });

  const execute = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const data = await asyncFunction();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }, [asyncFunction]);

  // Executa automaticamente ao montar o componente
  useEffect(() => {
    execute();
  }, [execute]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    execute,
    retry,
  };
}
