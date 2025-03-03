## Idea

1. `useQuery` 의 주요 기능 제작

- [x] fetching 과 동시에 queryKey 등록 & 캐시 시간 등록
  - `fetch`로 api 호출
  - "동시에" -> api 호출과 queryKey 등록 & 캐시 시간 등록을 비동기 처리
  - `Map` 으로 데이터 캐싱
- [x] 공통 로딩 상태 관리 isLoading (isPending 과 굳이 구분하지 않아도 됩니다 😄)
  - useQuery 호출시 isLoding 선언
  - 함수 호출을 try, catch로 감싸면 에러까지 같이 해결 할 수 있지 않을까?
  - promise의 pending을 활용해보면 어떨까?
- [x] 공통 에러 상태 관리 Error

2. `useMutation` 의 주요 기능 제작

- [x] onSuccess / onError 기능
- [x] invalidateQueries 함수 활용
  - mutationFn의 인자 값을 invalidateQueries로 전달달

3. `Context API`를 통해서 전역적으로 쓸 수 있게 만들어주는 `useQueryClient` 제작 (많이 어려우면 2번까지만!!)
