import apis from "@src/apis/apis";
import { TODO_KEY } from "@src/constant/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateTodo = () => {
  const queryClient = useQueryClient({});
  const errorMessage = (e: any) => alert(e.response.data.details);

  return useMutation(apis.todos.createTodo, {
    onSuccess: () => queryClient.invalidateQueries([TODO_KEY.TODOS]),
    onError: errorMessage,
  });
};

export default useCreateTodo;
