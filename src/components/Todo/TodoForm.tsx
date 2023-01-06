import Button from "@components/common/Button";
import { useTodo } from "@hooks/useTodo";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
  const { updateTodo } = useTodo();
  const onClose = () => {
    isEidt && setEdit(false);
  };

  const [inputData, setInputData] = useState({
    title: title,
    content: content,
  });

  useEffect(() => {
    setInputData({ title, content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEidt]);

  const onChange = (e: any) =>
    setInputData({ ...inputData, [e.target.name]: e.target.value });

  const onUpdate = () => {
    updateTodo(id, inputData)
      .then(() => {
        setEditType("view");
      })
      .catch((e) => alert(e.response.data.details));
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
            <div className="mt-5 text-xl font-bold">
              {editType === "view" ? (
                <h1 className="">{title}</h1>
              ) : (
                <input
                  type="text"
                  className="flex-grow w-full border-2 "
                  name="title"
                  value={inputData.title}
                  onChange={(e) => onChange(e)}
                />
              )}
            </div>
            <div className="mx-3 mt-5 text-gray-700 ">
              {editType === "view" ? (
                <p className=" h-96">{content}</p>
              ) : (
                <textarea
                  className="w-full border-2 resize-none box-border-2 h-96"
                  draggable={false}
                  name="content"
                  value={inputData.content}
                  onChange={(e) => onChange(e)}
                />
              )}
            </div>
            {editType === "edit" && (
              <div className="mt-10">
                <Button
                  onClick={() => {
                    onUpdate();
                  }}
                >
                  수정하기
                </Button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TodoForm;
