import Button from "@components/common/Button";
import { useTodo } from "@hooks/useTodo";
import { useEffect } from "react";
import { useState } from "react";
import { MdArrowBack, MdClose, MdModeEditOutline } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

type ITodoFrom = {
  isEidt: boolean;
};

const TodoForm = ({
  isEidt,
}: // editType,
ITodoFrom) => {
  const navigate = useNavigate();
  console.log();
  const location = useLocation();
  const { type: editType } = useParams();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") as string;

  const { updateTodo, createTodo, getTodosById } = useTodo();

  const onClose = () => {
    navigate("/");
  };

  const [inputData, setInputData] = useState({
    title: "",
    content: "",
    updatedAt: "",
  });

  const date = new Date(inputData.updatedAt);

  const updateDate = `
    ${date.toLocaleString().slice(0, date.toLocaleString().length - 3)}`;

  useEffect(() => {
    if (editType === "add") {
      setInputData({ title: "", content: "", updatedAt: "" });
    } else {
      getTodosById(id).then((res) => {
        setInputData(res);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChange = (e: any) =>
    setInputData({ ...inputData, [e.target.name]: e.target.value });

  const onClick = () => {
    if (editType === "edit") {
      updateTodo(id, inputData)
        .then(() => {
          navigate(`/todo/view?id=${id}`);
        })
        .catch((e) => alert(e.response.data.details));
    } else if (editType === "add") {
      const { title, content } = inputData;
      !(!title || !content)
        ? createTodo(inputData)
            .then((res) => {
              alert("성공적으로 추가되었습니다!");
              navigate(`/todo/view?id=${res.id}`);
            })
            .catch((e) => {
              alert(e.response.data.details);
            })
        : alert(
            `${title === "" ? "제목" : "내용"}은 필수로 입력되어야 합니다.`
          );
    }
  };

  return (
    <div
      className={`
      fixed top-0 left-0 w-screen h-screen  ease-in-out 
      ${isEidt ? "backdrop-blur-[3px]" : "opacity-0 -z-10 "}
      `}
    >
      <dialog
        open={isEidt}
        className={`bg-transparent h-full p-0 mr-0 shadow-md w-full bg-none `}
      >
        <div className="flex h-full ">
          <div className="flex-grow bg-none" onClick={() => onClose()} />
          <div className="p-5 overflow-auto bg-white shadow-md w-96">
            <div className="flex items-center justify-between text-3xl">
              <Link to="/">
                <MdClose className="duration-300 ease-in-out hover:rotate-90 hover:text-red-600 hover:scale-110" />
              </Link>
              <div>
                <p className="text-xs">{updateDate}에 수정됨</p>
              </div>
              {editType === "view" ? (
                <Link to={`/todo/edit?id=${id}`}>
                  <MdModeEditOutline className="text-2xl duration-300 ease-in-out hover:text-green-500 hover:scale-110 " />
                </Link>
              ) : (
                editType !== "add" && (
                  <Link to={`/todo/view?id=${id}`}>
                    <MdArrowBack className="text-3xl duration-300 ease-in-out hover:text-red-400 hover:scale-110 " />
                  </Link>
                )
              )}
            </div>
            <div className="mt-5 text-xl font-bold">
              {editType === "view" ? (
                <h1 className="">{inputData.title}</h1>
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
                <p className=" h-96">{inputData.content}</p>
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
            {editType !== "view" && (
              <div className="mt-10">
                <Button
                  onClick={() => {
                    onClick();
                  }}
                >
                  {editType === "edit" ? "수정하기" : "추가하기"}
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
