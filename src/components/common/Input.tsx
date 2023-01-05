import React from "react";

type IInput = React.DOMAttributes<HTMLInputElement> & {
  placeholder?: string;
  type?: "text" | "password" | "tel" | "text" | "email";
  pattern?: string;
  state?: boolean;
  stateMessage?: string;
  name?: string;
};

const Input = ({
  type = "text",
  state = true,
  stateMessage = "",
  ...props
}: IInput) => (
  <div>
    <input
      type={type}
      className={`
        text-black h-10 px-2 py-1 text-sm border border-gray-200 rounded-md placeholder:text-sm w-full focus:outline-blue-600
        ${type === "password" && "text-xl placeholder:text-xl"} 
        ${!state && "bg-red-500/30 border-red-500"}
      `}
      {...props}
    />
    <p
      className={`
        pt-1 text-xs text-red-500 duration-500
        ${state && "opacity-0 -translate-y-1"}
      `}
    >
      {stateMessage}
    </p>
  </div>
);

export default React.memo(Input);
