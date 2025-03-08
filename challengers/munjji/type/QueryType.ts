export interface QueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  isStale: boolean;
  timestamp: number;
}

export interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  queryKey?: string;
}

export interface MutationResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  mutate: (params: any) => Promise<void>;
}
