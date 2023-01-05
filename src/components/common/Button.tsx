import React, { ReactNode } from "react";

type IButton = React.DOMAttributes<HTMLButtonElement> & {
  type?: "submit" | "reset" | "button";
  color?: "green" | "red" | "gray";
  disabled?: boolean;
  children: ReactNode;
};

const bgColor = {
  green: "bg-green-500 hover:bg-green-400",
  red: "bg-red-500 hover:bg-red-400",
  gray: "bg-gray-500 hover:bg-gray-400",
  disabled: "bg-gray-400",
};

const Button = ({
  children,
  color = "green",
  disabled = false,
  ...props
}: IButton) => {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled ? bgColor.disabled : bgColor[color]
      }  w-full h-10 rounded-md duration-300`}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
