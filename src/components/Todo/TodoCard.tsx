import { ITodoItem, useTodo } from "@hooks/useTodo";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const TodoCard = ({ content, createdAt, id, title, updatedAt }: ITodoItem) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [addEventState, setAddEventState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const addCardClickEvent = () =>
      cardRef.current?.addEventListener("click", (e) => {
        const { clientX: X, clientY: Y } = e;
        const deleteBoxRange = cardRef.current?.getElementsByTagName("span")[0];
        if (deleteBoxRange && cardRef.current) {
          const { offsetHeight, offsetTop, offsetLeft, offsetWidth } =
            deleteBoxRange;
          const addRange = 4;
          if (
            !(
              X > offsetLeft - addRange &&
              X < offsetLeft + offsetWidth + addRange &&
              Y > offsetTop - addRange &&
              Y < offsetTop + offsetHeight + addRange
            )
          ) {
            onClickCard();
          }
        }
      });

    if (!addEventState) {
      addCardClickEvent();
      setAddEventState(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todo = useTodo();
  const date = new Date(updatedAt);

  const updateDate = `
    ${date.toLocaleString().slice(0, date.toLocaleString().length - 3)}`;

  const onClickDelete = () => {
    const check = window.confirm(`${title}를 삭제하시겠습니까?`);
    check && todo.deleteTodo(id);
  };

  const onClickCard = () => {
    navigate(`/todo/${id}`);
  };

  return (
    <div
      className="z-10 w-full p-3 text-xl duration-300 ease-in-out bg-white border rounded-md shadow-md cursor-pointer hover:bg-green-100"
      ref={cardRef}
    >
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <span className="">
          <MdDeleteOutline
            onClick={() => onClickDelete()}
            className="w-6 h-6 text-red-400 duration-300 ease-in-out hover:scale-150"
          />
        </span>
      </div>
      <p className="text-xs text-right text-neutral-700">
        {updateDate} 에 수정됨{" "}
      </p>
    </div>
  );
};

export default TodoCard;
