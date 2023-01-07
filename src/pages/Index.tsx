import TodoCard from "@components/Todo/TodoCard";
import TodoForm from "@components/Todo/TodoForm";
import { useTodo } from "@hooks/useTodo";
import { useState } from "react";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";

const Index = () => {
  const todo = useTodo();
  const [isEdit, setIsEdit] = useState(false);
  const [editType, setEditType] = useState<"view" | "edit" | "add">("view");
  const [currentId, setCurrentId] = useState("");
  //초기 데이터 패칭 데이터 패칭
  useEffect(() => {
    todo.getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onCreate = () => {
    setIsEdit(true);
    setCurrentId("");
    setEditType("add");
  };
  return (
    <>
      <div className="flex h-full">
        <div className="flex justify-center flex-grow h-full p-10 ">
          <div className="max-w-4xl ">
            <div className="flex items-center justify-between w-full mb-10 text-2xl font-bold min-w-[24rem]">
              <h1 className="">To do list</h1>
              <div
                className="flex items-center justify-center w-10 h-10 duration-300 ease-in-out border-2 rounded-full cursor-pointer hover:text-green-500 hover:scale-110 hover:rotate-90 "
                onClick={() => onCreate()}
              >
                <MdAdd className="text-3xl" />
              </div>
            </div>

            <div className="">
              <ul className="grid justify-center gap-y-0 gap-x-6">
                {todo.todos.map((todoItem, index) => (
                  <li key={index} className={"w-96"}>
                    <TodoCard
                      {...todoItem}
                      index={index + 1}
                      title={`${todoItem.title}`}
                      setEdit={setIsEdit}
                      setId={setCurrentId}
                      setEditType={setEditType}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <TodoForm
          isEidt={isEdit}
          setEdit={setIsEdit}
          setEditType={setEditType}
          editType={editType}
          setId={setCurrentId}
          {...todo.todos.filter((v) => v.id === currentId)[0]}
        />
      </div>
    </>
  );
};

export default Index;
