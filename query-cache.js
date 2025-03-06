class QueryCache {
  constructor() {
    this.queries = new Map();
    this.mutations = new Map();
  }

  addQuery(key, query) {
    this.queries.set(key, query);
  }

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
