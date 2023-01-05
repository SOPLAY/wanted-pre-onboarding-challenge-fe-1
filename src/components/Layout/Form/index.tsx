import Button from "@components/common/Button";
import Input from "@components/common/Input";
import { useAuth } from "@hooks/useAuth";
import { validate } from "@libs/validate";
import { useState } from "react";
type IForm = {
  type: "signIn" | "signUp";
};
const Form = ({ type }: IForm) => {
  const auth = useAuth();
  const [checkValue, setCheckValue] = useState({
    email: false,
    password: false,
  });

  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const onChange = (event: any) => {
    const { name, value } = event.target;

    const validateInputValue = (
      value: string,
      target: "email" | "password"
    ) => {
      return validate[target](value);
    };
    setUserInput({ ...userInput, [name]: value });
    setCheckValue({
      ...checkValue,
      [name]: validateInputValue(value, name as "email" | "password"),
    });
  };
  return (
    <form className="w-full text-gray-700">
      <div className="w-full">
        <p>Email</p>
        <Input
          placeholder="youremail@example.com"
          type="email"
          state={checkValue.email}
          name={"email"}
          onChange={(e) => onChange(e)}
          stateMessage="check your email!!"
        />
      </div>

      <div className="w-full mt-2">
        <p>Password</p>
        <Input
          placeholder="∙∙∙∙∙∙∙∙"
          type="password"
          state={checkValue.password}
          name={"password"}
          onChange={(e) => onChange(e)}
          stateMessage="check your password!!"
        />
      </div>
      <div className="w-full mt-8">
        <Button
          type="submit"
          color="green"
          disabled={!(checkValue.email && checkValue.password === true)}
          onClick={(e) => {
            e.preventDefault();
            auth[type](userInput);
          }}
        >
          {type === "signIn" ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
