export interface QueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}
