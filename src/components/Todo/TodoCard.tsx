import { ITodoItem, useTodo } from "@hooks/useTodo";
import { useRef } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";

type ITodoCard = ITodoItem & {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
};
const TodoCard = ({
  content,
  createdAt,
  id,
  title,
  updatedAt,
  setEdit,
  setId,
}: ITodoCard) => {
  const path = useLocation().pathname.split("/");
  const targetId = path[path.length - 1];

  const cardRef = useRef<HTMLDivElement>(null);

  const todo = useTodo();

  const date = new Date(updatedAt);

  const updateDate = `
    ${date.toLocaleString().slice(0, date.toLocaleString().length - 3)}`;

  const onClickCard = () => {
    setId(id);
    setEdit(true);
  };

  return (
    <div
      className={`z-10 w-full p-3 text-xl duration-300 ease-in-out bg-white border-b hover:bg-green-100
         ${targetId === id && "bg-green-100"}`}
      ref={cardRef}
    >
      <div className="flex items-center justify-between cursor-pointer">
        <h3 onClick={() => onClickCard()} className={"flex-grow"}>
          {title}
        </h3>
        <span className="flex">
          <MdModeEditOutline
            onClick={() => onClickCard()}
            className={"mr-1 hover:scale-125 duration-300"}
          />
          <MdDeleteOutline
            onClick={() => todo.deleteTodo(id)}
            className="text-red-400 duration-300 hover:scale-125"
          />
        </span>
      </div>
      <p
        className="text-xs text-right cursor-pointer text-neutral-700"
        onClick={() => onClickCard()}
      >
        {updateDate} 에 수정됨{" "}
      </p>
    </div>
  );
};

export default TodoCard;
