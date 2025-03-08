export interface QueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  isStale: boolean;
  timestamp: number;
}
