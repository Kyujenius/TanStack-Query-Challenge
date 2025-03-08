import { useState, useEffect } from "react";
import { queryCache } from "./query-cache";
import { QueryResult } from "./type/QueryType";

export function useQuery<T>(
  queryKey: string,
  queryFn: () => Promise<T>,
  cacheTime: number = 5 * 60 * 1000,
  staleTime: number = 30 * 1000
) {
  const [state, setState] = useState<QueryResult<T>>({
    data: null,
    error: null,
    isLoading: true,
    isFetching: false,
    isStale: false,
    timestamp: 0,
  });

  useEffect(() => {
    const cachedQuery = queryCache.getQuery<T>(queryKey);

    // 쿼리가 있을 경우
    if (cachedQuery) {
      // stale 한 지 확인
      const isStale = Date.now() - cachedQuery.timestamp > staleTime;

      // stale이면 데이터 불러오기
      setState({
        ...cachedQuery,
        isLoading: false,
        isFetching: isStale,
        isStale,
      });

      // stale 하지 않을 경우 그대로 유지
      if (!isStale) return;
    }

    // staleTime이 지나거나 캐시가 없으면 새로운 데이터 받아오기
    setState((prev) => ({ ...prev, isLoading: true }));

    queryFn()
      .then((data) => {
        const newQuery = {
          data,
          error: null,
          isLoading: false,
          isFetching: false,
          isStale: false,
          timestamp: Date.now(),
        };
        queryCache.addQuery(queryKey, newQuery);
        setState(newQuery);
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          error,
          isLoading: false,
          isFetching: false,
        }));
      });
  }, [queryKey]);

  return state;
}
