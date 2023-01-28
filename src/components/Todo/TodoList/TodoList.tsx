import React from "react";
import TodoCard from "../TodoCard/TodoCard";
import { ITodoItem } from "@src/types/todo";
import useGetTodosQuery from "@hooks/todo/queries/useGetTodosQuery";

const TodoList = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  if (isLoading) return <div>loding</div>;
  return (
    <ul className="grid justify-center gap-y-0 gap-x-6">
      {!isLoading &&
        todos?.map((todoItem: ITodoItem, index: number) => (
          <li key={index} className={"w-96"}>
            <TodoCard {...todoItem} index={index + 1} />
          </li>
        ))}
    </ul>
  );
};

export default TodoList;
