const QueryCache = require("../../query-cache.js");
const queryCache = new QueryCache();

function useQuery({ queryKey, queryFn, cacheTime }) {
  let isLoading = true;
  let error = null;
  let data = null;
  async function fetchData() {
    try {
      const cachedQuery = queryCache.getQuery(queryKey);
      if (
        !cachedQuery ||
        Date.now() > cachedQuery.timestamp + cachedQuery.cacheTime
      ) {
        // 해당 queryKey로 저장된 캐시가 없거나 저장된 데이터의 cacheTime이 만료되었을 경우 새로운 데이터를 가져온다
        const response = await queryFn();
        data = response;
        queryCache.addQuery(queryKey, {
          data,
          timestamp: Date.now(),
          cacheTime,
        });
      } else {
        data = cachedQuery.data;
      }
    } catch (err) {
      error = err;
      isLoading = false;
      return { error, isLoading };
    }
    isLoading = false;
    return { data, isLoading, error };
  }
  fetchData();
}

module.exports = useQuery;
