import apis, { ITodo } from "@src/apis/apis";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { atom, useRecoilState } from "recoil";

export type ITodoItem = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};
const initailTodsState = [
  { title: "", content: "", id: "", createdAt: "", updatedAt: "" },
];
const todosAtom = atom({
  key: `todosAtom${new Date().toLocaleTimeString()}`,
  default: initailTodsState,
});

export const useTodo = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.setToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [todos, setTodos] = useRecoilState<ITodoItem[]>(todosAtom);

  const getTodos = () => {
    apis.todos.getTodos().then((res) => setTodos(res.data.data));
  };

  const getTodosById = (id: string) =>
    apis.todos.getTodos().then((res) => res.data as ITodoItem);

  const createTodo = (data: ITodo) => {
    apis.todos
      .createTodo(data)
      .then((res) => {
        getTodos();
      })
      .catch((e) => {
        alert(e.response.data.details);
      });
  };

  const updateTodo = (id: string, data: ITodo) =>
    apis.todos
      .updateTodo(id, data)
      .then(() => {
        alert("성공적으로 반영되었습니다.");
        getTodos();
      })
      .catch((e) => {
        alert(e.response.data.details);
      });

  const deleteTodo = (id: string) =>
    apis.todos
      .deleteTodo(id)
      .then(() => {
        getTodos();
        alert("성공적으로 삭제 되었습니다!");
      })
      .catch((e) => {
        alert(e.response.data.details);
      });
  return { todos, getTodos, getTodosById, createTodo, updateTodo, deleteTodo };
};
