import TodoList from "@components/Todo/TodoList/TodoList";

import { MdAdd } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Index = () => {
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

            <div>
              <TodoList />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Index;
