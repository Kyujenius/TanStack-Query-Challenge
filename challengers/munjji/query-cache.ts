import { QueryResult } from "./type/QueryType";

export class QueryCache {
  private queries: Map<string, any>;

  constructor() {
    this.queries = new Map();
  }

  // 쿼리 캐시 저장
  addQuery<T>(key: string, query: QueryResult<T>) {
    this.queries.set(key, query);
  }

  // 캐시에서 쿼리 가져오기
  getQuery<T>(key: string): QueryResult<T> | undefined {
    return this.queries.get(key);
  }

  // 캐시 무효화
  invalidateQueries(keyPattern: string) {
    Array.from(this.queries.keys()).forEach((key) => {
      if (key.includes(keyPattern)) {
        this.queries.delete(key);
      }
    });
  }
}

export const queryCache = new QueryCache();
