// import { ITodoItem, useTodo } from "@hooks/useTodo";
import useDeleteTodo from "@hooks/todo/mutation/useDeleteTodo";
import { ITodoItem } from "@src/types/todo";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TodoCardView from "./TodoCardView";

type ITodoCard = ITodoItem & {
  index: number;
};
const TodoCard = ({ id, title, createdAt, updatedAt, index }: ITodoCard) => {
  const { mutate: deleteTodo } = useDeleteTodo();

  const date = new Date(createdAt);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentId = searchParams.get("id") as string;
  const updateDate = date
    .toLocaleString()
    .slice(0, date.toLocaleString().length - 3);

  const onClickCard = (isEdit?: boolean) => {
    navigate(`/todo/${isEdit ? "edit" : "view"}?id=${id}`, {
      relative: "path",
    });
  };

  const onDelete = () => {
    if (window.confirm(`"${title}" 삭제하시겠습니까?`)) {
      deleteTodo(id);
    }
  };

  return (
    <TodoCardView
      title={title}
      index={index}
      id={id}
      currentId={currentId}
      updateDate={updateDate}
      onClickCard={onClickCard}
      onDelete={onDelete}
    />
  );
};

export default React.memo(TodoCard);
