import { useState } from "react";
import { queryCache } from "./query-cache";
import { MutationOptions, MutationResult } from "./type/QueryType";

export function useMutation<T>(
  mutationFn: (params: any) => Promise<T>,
  options?: MutationOptions<T> // onSuccess, onError 옵션
): MutationResult<T> {
  const [state, setState] = useState<MutationResult<T>>({
    isLoading: false,
    error: null,
    data: null,
  });

  const mutate = async (params?: any) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null, data: null }));

    try {
      const result = await mutationFn(params);
      setState({ isLoading: false, error: null, data: result });
      options?.onSuccess?.(result);

      if (options?.queryKey) {
        queryCache.invalidateQueries(options.queryKey);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
        data: null,
      }));
      options?.onError?.(error as Error);
    }
  };

  return { mutate, ...state };
}
