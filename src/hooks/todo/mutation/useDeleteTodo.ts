import apis from "@src/apis/apis";
import { TODO_KEY } from "@src/constant/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteTodo = () => {
  const queryClient = useQueryClient({});
  const errorMessage = (e: any) => alert(e.response.data.details);

  return useMutation((id: string) => apis.todos.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([TODO_KEY.TODOS]);
    },
    onError: errorMessage,
  });
};

export default useDeleteTodo;
