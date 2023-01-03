type IInput = {
  placeholder?: string;
  type?: "text" | "password" | "tel" | "text" | "email";
  pattern?: string;
  state?: boolean;
  stateMessage?: string;
};

type IStateMessage = {
  state: boolean;

  children: any;
};

const Style = {
  Input: (data: IInput) => (
    <input
      className={`
        h-10 px-2 py-1 text-sm border border-gray-200 rounded-md placeholder:text-sm w-96 focus:outline-blue-600
        ${data.type === "password" && "text-xl placeholder:text-xl"} 
        ${!data.state && "bg-red-500/30 border-red-500"}
      `}
      {...data}
    />
  ),
  StateMessage: (data: IStateMessage) => (
    <p
      className={`
        pt-1 text-xs text-red-500 duration-500
        ${data.state && "opacity-0 -translate-y-1"}
      `}
    >
      {data.children}
    </p>
  ),
};

const Input = ({
  placeholder = "",
  type = "text",
  pattern = "",
  state = true,
  stateMessage = "",
}: IInput) => (
  <>
    <Style.Input
      type={type}
      placeholder={placeholder}
      pattern={pattern}
      state={state}
    />
    <Style.StateMessage state={state}>{stateMessage}</Style.StateMessage>
  </>
);

export default Input;
