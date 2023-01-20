/* eslint-disable react-hooks/rules-of-hooks */
import apis, { ITodo } from "@src/apis/apis";
import { useEffect } from "react";
import { useAuth } from "../useAuth";
import { atom, useRecoilState } from "recoil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TODO_KEY } from "@src/constant/queries";
import { ITodoItem } from "@src/types/todo";

const initailTodsState = [
  { title: "", content: "", id: "", createdAt: "", updatedAt: "" },
];
const todosAtom = atom({
  key: `todosAtom${new Date().toLocaleTimeString()}`,
  default: initailTodsState,
});

const errorMessage = (e: any) => alert(e.response.data.details);
export const useTodo = () => {
  const queryClient = useQueryClient({});

  const auth = useAuth();
  useEffect(() => {
    auth.setToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodos = () =>
    useQuery({
      queryKey: [TODO_KEY.TODOS],
      queryFn: apis.todos.getTodos,
      onError: () => auth.logOut(),
    });

  const { data: todos, ...props } = getTodos();

  const getTodosById = (id: string) =>
    todos && [...todos].filter((v) => v.id === id);

  const createTodo = useMutation(apis.todos.createTodo, {
    onSuccess: () => queryClient.invalidateQueries([TODO_KEY.TODOS]),
    onError: errorMessage,
  });

  const updateTodo = useMutation(apis.todos.updateTodo as any, {
    onSuccess: () => queryClient.invalidateQueries([TODO_KEY.TODOS]),
    onError: errorMessage,
  });

  const deleteTodo = useMutation(apis.todos.deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries([TODO_KEY.TODOS]),
    onError: errorMessage,
  });

  return {
    todos,
    getTodos,
    getTodosById,
    createTodo,
    updateTodo,
    deleteTodo,
    ...props,
  };
};
