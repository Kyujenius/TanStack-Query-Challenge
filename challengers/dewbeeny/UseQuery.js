const QueryCache = require("./query-cache");

function useQuery({ queryKey, queryFn }) {
  // 쿼리가 비어있는지 확인하는 코드 추가
  const queryCache = new QueryCache();
  let isLoding = false;
  let error = false;

  async function fetchData() {
    try {
      isLoading = true;
      return { isLoding };
      const data = await queryFn();
      QueryCache.addQuery(queryKey, data);
    } catch (error) {
      error = true;
      return { error };
    } finally {
      isLoading = false;
      return { isLoding };
    }
  }
  // 코드를 실행하면 persistent에 저장되어야하는 것 같은데...
}

module.exports = useQuery;
