const QueryCache = require("./query-cache");

function useMutation({ mutationFn }) {
  let onSuccess = false;
  let error = false;

  async function mutationData() {
    try {
      const response = await mutationFn();
    } catch (error) {
      error = true;
      return { error };
    } finally {
      onSuccess = true;
      return { onSuccess, response };
    }
  }
}
