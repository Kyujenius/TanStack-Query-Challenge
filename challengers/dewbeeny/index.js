const useQuery = require("./UseQuery.js");

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// const createTodo = async (title) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         id: 2,
//         title: title,
//         body: "테스트 테스트",
//       });
//     }, 2000);
//   });
// }

// API 호출 예제
const apiURL = "https://jsonplaceholder.typicode.com/posts/1";

const get = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Get"],
    queryFn: fetchData(apiURL),
  });
  if (isLoading) {
    console.log(`로딩중`);
  }
  if (error) {
    console.error(`${error}`);
  }
};

get();

// const mutation = useMutation({
//   mutationFn: createTodo,
//   onMutate() {
//     /* ... */
//   },
//   onSuccess(data) {
//     console.log(data);
//   },
//   onError(err) {
//     console.log(err);
//   },
//   onSettled() {
//     /* ... */
//   },
// });

// const onCreateTodo = (e) => {
//   e.preventDefault();
//   mutate({ title });
// };
