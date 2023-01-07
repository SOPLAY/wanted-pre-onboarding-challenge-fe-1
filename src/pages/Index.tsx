import TodoCard from "@components/Todo/TodoCard";
import { useTodo } from "@hooks/useTodo";
import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Index = () => {
  const todo = useTodo();

  //초기 데이터 패칭 데이터 패칭
  useEffect(() => {
    todo.todos[1] || todo.getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="flex h-full">
        <div className="flex justify-center flex-grow h-full p-10 ">
          <div className="max-w-4xl ">
            <div className="flex items-center justify-between w-full mb-10 text-2xl font-bold min-w-[24rem]">
              <h1 className="">To do list</h1>
              <Link to={"/todo/add"}>
                <div className="flex items-center justify-center w-10 h-10 duration-300 ease-in-out border-2 rounded-full cursor-pointer hover:text-green-500 hover:scale-110 hover:rotate-90 ">
                  <MdAdd className="text-3xl" />
                </div>
              </Link>
            </div>

            <div className="">
              <ul className="grid justify-center gap-y-0 gap-x-6">
                {todo.todos.map((todoItem, index) => (
                  <li key={index} className={"w-96"}>
                    <TodoCard
                      {...todoItem}
                      index={index + 1}
                      title={`${todoItem.title}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Index;
