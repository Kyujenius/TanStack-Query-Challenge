const QueryCache = require("./query-cache");

function useMutation({ mutationFn }) {
  let onSuccess = false;
  let error = false;

  async function mutationData(...args) {
    try {
      const response = await mutationFn(...args);
      QueryCache.invalidateQueries(...args);
    } catch (error) {
      error = true;
      return { error };
    } finally {
      onSuccess = true;
      return { onSuccess, response };
    }
  }
}
