import TodoForm from "@components/Todo/TodoForm";
import { useLocation } from "react-router-dom";

const Todo_Type = () => {
  const location = useLocation();

  return <TodoForm isEidt={location.pathname.split("/")[1] === "todo"} />;
};

export default Todo_Type;
