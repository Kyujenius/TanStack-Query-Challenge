const QueryCache = require("../../query-cache.js");
const queryCache = new QueryCache();

function useMutation({ mutationFn, onSuccess, onError }) {
  async function mutate(variables) {
    try {
      const data = await mutationFn(variables);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  }
  return { mutate };
}

module.exports = useMutation;
