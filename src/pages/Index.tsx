import TodoCard from "@components/Todo/TodoCard";
import TodoForm from "@components/Todo/TodoForm";
import { useTodo } from "@hooks/useTodo";
import { useState } from "react";
import { useEffect } from "react";

const Index = () => {
  const todo = useTodo();
  const [isEdit, setIsEdit] = useState(false);
  const [editType, setEditType] = useState<"view" | "edit">("view");
  const [currentId, setCurrentId] = useState("");
  //초기 데이터 패칭 데이터 패칭
  useEffect(() => {
    todo.getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex h-full">
        <div className="flex justify-center flex-grow h-full p-10 ">
          <div className="max-w-4xl ">
            <h1 className="w-full mb-10 text-2xl font-bold ">To do list</h1>

            <div className="">
              <ul className="grid justify-center gap-y-0 gap-x-6">
                {todo.todos.map((todoItem, index) => (
                  <li key={index} className={"w-96"}>
                    <TodoCard
                      {...todoItem}
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
          {...todo.todos.filter((v) => v.id === currentId)[0]}
        />
      </div>
    </>
  );
};

export default Index;
