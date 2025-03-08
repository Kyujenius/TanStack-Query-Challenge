import { QueryCache } from "../../query-cache";

export function useQuery(queryKey, queryFn, options = {}) {
  const { staleTime = 0, cacheTime = 5 * 60 * 1000 } = options;
  const cache = QueryCache();
  i;
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    //쿼리가 있는지 먼저 확인
    const query = cache.getQuery(queryKey);

    //있으면, 시간을 확인해서, updatedAt 이랑 ,staleTime을 비교한다.
    if (!query || Date.now() - query.updatedAt > staleTime) {
      //비교시에, 이 데이터가 stale 하지 않다면 자동으로 fetchData() 를 실행시켜준다.
      fetchData();
    } else {
      //비교 결과 stale하다면, setState로 기존의 query에서의 state를 가져온다.
      setState({ ...query.state });
    }

    function fetchData() {
      queryFn()
        .then((data) => {
          //queryFn 을 통해서 데이터를 가져오고, 이를 cache 안에 넣어둔다.
          cache.addQuery(queryKey, {
            state: { data, isLoading: false, error: null },
            updatedAt: Date.now(),
          });
          setState({ data, isLoading: false, error: null });
        })
        .catch((error) => {
          setState({ data: null, isLoading: false, error });
        });
    }
  }, [queryKey]);

  return state;
}
