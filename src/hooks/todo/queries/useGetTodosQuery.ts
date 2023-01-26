import apis from "@src/apis/apis";
import { TODO_KEY } from "@src/constant/queries";
import { useQuery } from "@tanstack/react-query";

const useGetTodosQuery = () =>
  useQuery([TODO_KEY.TODOS], {
    queryFn: apis.todos.getTodos,
    select: (res) => res.data.data,
  });

export default useGetTodosQuery;
