import { ITodoItem, useTodo } from "@hooks/useTodo";
import { useRef } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

type ITodoCard = ITodoItem & {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setEditType: React.Dispatch<React.SetStateAction<"edit" | "view" | "add">>;
  index: number;
};
const TodoCard = ({
  id,
  title,
  updatedAt,
  index,
  setEdit,
  setEditType,
  setId,
}: ITodoCard) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const todo = useTodo();
  const date = new Date(updatedAt);

  const updateDate = `
    ${date.toLocaleString().slice(0, date.toLocaleString().length - 3)}`;

  const onClickCard = (isEdit?: boolean) => {
    setId(id);
    !isEdit ? setEditType("view") : setEditType("edit");
    setEdit(true);
  };

  return (
    <div
      className={`z-10 w-full p-3 text-xl duration-300 ease-in-out  border-b hover:bg-green-100 `}
      ref={cardRef}
    >
      <div className="flex items-center justify-between cursor-pointer">
        <h3 onClick={() => onClickCard()} className={"flex-grow"}>
          <span className="text-base">{index}. </span>
          {title.length > 17 ? `${title.slice(0, 17)}...` : title}
        </h3>
        <span className="flex">
          <MdModeEditOutline
            onClick={() => onClickCard(true)}
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
        {updateDate} 에 수정됨
      </p>
    </div>
  );
};

export default TodoCard;
