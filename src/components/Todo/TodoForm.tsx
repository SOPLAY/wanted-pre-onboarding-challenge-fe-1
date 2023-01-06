import React from "react";
import { MdArrowBack, MdClose, MdModeEditOutline } from "react-icons/md";

type ITodoFrom = {
  isEidt: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditType: React.Dispatch<React.SetStateAction<"edit" | "view">>;
  editType: string;
  id: string;
  title: string;
  content: string;
};

const TodoForm = ({
  isEidt,
  setEdit,
  id,
  title,
  content,
  editType,
  setEditType,
}: ITodoFrom) => {
  const onClose = () => {
    isEidt && setEdit(false);
  };

  return (
    <div
      className={`
      fixed top-0 left-0 w-screen h-screen  duration-300 ease-in-out 
      ${isEidt ? "backdrop-blur-[3px]" : "opacity-0 -z-10 "}
      `}
    >
      <dialog
        open={isEidt}
        className={`bg-transparent h-full p-0 mr-0 shadow-md w-full duration-300 translate-x-96 animate-todoFadeIn bg-none  
        ${isEidt && "translate-x-0 duration-300"}
        `}
      >
        <div className="flex h-full">
          <div className="flex-grow bg-none" onClick={() => onClose()} />
          <div className="p-5 bg-white shadow-md w-96">
            <div className="flex items-center justify-between text-3xl">
              <MdClose
                className="duration-300 ease-in-out hover:rotate-90 hover:text-red-600 hover:scale-110"
                onClick={() => onClose()}
              />
              {editType === "view" ? (
                <MdModeEditOutline
                  className="text-2xl duration-300 ease-in-out hover:text-green-500 hover:scale-110 "
                  onClick={() => setEditType("edit")}
                />
              ) : (
                <MdArrowBack
                  className="text-3xl duration-300 ease-in-out hover:text-red-400 hover:scale-110 "
                  onClick={() => setEditType("view")}
                />
              )}
            </div>
            <div className="mt-5">
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div className="mx-3 mt-5 text-gray-700">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TodoForm;
