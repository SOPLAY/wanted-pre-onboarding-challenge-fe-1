import apis from "@src/apis/apis";
import { TODO_KEY } from "@src/constant/queries";
import { useQuery } from "@tanstack/react-query";

const useGetTodoByIdQuery = (id: string) =>
  useQuery([TODO_KEY.TODO_ITEM, id], {
    queryFn: () => apis.todos.getTodosById(id),
    select: (res) => res.data.data,
  });

export default useGetTodoByIdQuery;
