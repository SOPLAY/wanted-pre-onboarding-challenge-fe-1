import useGetTodosQuery from "@hooks/todo/queries/useGetTodosQuery";
import TodoListView from "./TodoListView";

const TodoList = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  return <TodoListView isLoading={isLoading} todos={todos} />;
};

export default TodoList;
