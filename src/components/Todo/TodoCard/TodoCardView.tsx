import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

interface ITodoCardView {
  title: string;
  currentId: string;
  id: string;
  onClickCard: (isEdit?: boolean) => void;
  index: number;
  onDelete: () => void;
  updateDate: string;
}

const TodoCardView = ({
  title,
  currentId,
  id,
  onClickCard,
  index,
  onDelete,
  updateDate,
}: ITodoCardView) => (
  <div
    className={`z-10 w-full p-3 text-xl duration-300 ease-in-out  border-b hover:bg-green-100 
        ${currentId === id && "bg-green-100"}
      `}
  >
    <div className="flex items-center justify-between cursor-pointer">
      <h3
        onClick={() => onClickCard()}
        className={"flex-growo whitespace-nowrap overflow-hidden text-ellipsis"}
      >
        <span className="text-base">{index}. </span>
        {title}
      </h3>
      <span className="flex">
        <MdModeEditOutline
          onClick={() => onClickCard(true)}
          className={"mr-1 hover:scale-125 duration-300 hover:text-green-500"}
        />
        <MdDeleteOutline
          onClick={() => onDelete()}
          className="text-red-400 duration-300 hover:scale-125"
        />
      </span>
    </div>
    <p
      className="text-xs text-right cursor-pointer text-neutral-700"
      onClick={() => onClickCard()}
    >
      {updateDate}에 생성됨
    </p>
  </div>
);

export default TodoCardView;
