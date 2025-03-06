// 쿼리 캐시 저장소 역할을 해주는 QueryCache 이용
class QueryCache {
  constructor() {
    this.queries = new Map();
    this.mutations = new Map();
    let dataUpdatedAt = new Date(); // 호출과 동시에 현재 시간 저장
  }

  // 쿼리 캐시 저장소에 쿼리 추가
  addQuery(key, query) {
    this.queries.set(key, query);
  }

  // 쿼리 캐시 저장소에서 쿼리 가져오기
  getQuery(key) {
    return this.queries.get(key);
  }

  // 캐시 무효화 로직
  invalidateQueries(keyPattern) {
    Array.from(this.queries.keys()).forEach((key) => {
      if (key.match(keyPattern)) {
        this.queries.get(key).invalidate();
      }
    });
  }
}

module.exports = QueryCache;
