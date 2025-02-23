import QueryCache from "./query-cache.js";

function useQuery({ queryKey, queryFn }) {
  // 쿼리가 비어있는지 확인하는 코드 추가
  const queryCache = new QueryCache();
  let isLoding = false;
  let error = false;

  async function fetchData() {
    try {
      // 이러면 외부에서 현재 로딩중인지 아닌지를 알 수가 없고 최종 상태만 알 수 있음...
      isLoading = true;
      const data = await queryFn();
      QueryCache.addQuery(queryKey, data);
    } catch (error) {
      error = true;
    } finally {
      isLoading = false;
    }
  }

  // 코드를 실행하면 persistent에 저장되어야하는 것 같은데...
  return { data, isLoding, error };
}
