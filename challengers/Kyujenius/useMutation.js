import { QueryCache } from "../../query-cache";

export function useMutation(mutationFn, { onSuccess, onError } = {}) {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    data: null,
  });

  const mutate = async (params) => {
    // 먼저 로딩을 true 상태로 만든다.
    setState({ isLoading: true, error: null, data: null });

    try {
      //mutation 함수에 파라미터가 있을 수 있으니,
      const result = await mutationFn(params);
      setState({ isLoading: false, error: null, data: result });
      //mutation이 성공할 시에는 onSuccess 함수를 통해서 성공시의 함수를 실행시킨다.
      onSuccess?.(onSuccessParams);
      // 캐시 무효화 실행
      QueryCache.invalidateQueries(relatedQueryKey);
    } catch (error) {
      setState({ isLoading: false, error, data: null });
      onError?.(onErrorParams);
    }
  };

  return [mutate, ...state];
}
