import apis, { ITodo } from "@src/apis/apis";
import { TODO_KEY } from "@src/constant/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useUpdateTodo = () => {
  const queryClient = useQueryClient({});
  const errorMessage = (e: any) => alert(e.response.data.details);

  let [searchParams] = useSearchParams();
  let id = searchParams.get("id") as string;

  return useMutation((body: ITodo) => apis.todos.updateTodo(id, body), {
    onSuccess: () => {
      queryClient.invalidateQueries([TODO_KEY.TODOS]);
      queryClient.invalidateQueries([TODO_KEY.TODO_ITEM, id]);
    },
    onError: errorMessage,
  });
};

export default useUpdateTodo;
