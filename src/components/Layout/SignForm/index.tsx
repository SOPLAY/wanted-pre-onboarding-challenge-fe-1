import Button from "@components/common/Button";
import Input from "@components/common/Input";
import { useAuth } from "@hooks/useAuth";
import { validate } from "@libs/validate";
import { useState } from "react";
import { Link } from "react-router-dom";
type IForm = {
  type: "signIn" | "signUp";
};
const Form = ({ type }: IForm) => {
  const auth = useAuth();
  const [checkValue, setCheckValue] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  });

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const onChange = (event: any) => {
    const { name, value } = event.target;

    const validateInputValue = (
      value: string,
      target: "email" | "password"
    ) => {
      return validate[target](value);
    };
    setUserInput({ ...userInput, [name]: value });
    console.table(checkValue);
    name === "passwordCheck"
      ? setCheckValue({
          ...checkValue,
          passwordCheck: userInput.password === event.target.value,
        })
      : setCheckValue({
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
          state={userInput.email === "" ? true : checkValue.email}
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
          state={userInput.password === "" ? true : checkValue.password}
          name={"password"}
          onChange={(e) => onChange(e)}
          stateMessage="check your password!!"
        />
      </div>
      {type === "signUp" && (
        <div className="w-full -mt-1">
          <p>Password check</p>
          <Input
            placeholder="∙∙∙∙∙∙∙∙"
            type="password"
            state={
              userInput.passwordCheck === ""
                ? true
                : checkValue.password &&
                  userInput.password === userInput.passwordCheck
            }
            name={"passwordCheck"}
            onChange={(e) => onChange(e)}
            stateMessage="check password is defferent!!"
          />
        </div>
      )}
      <div className="w-full mt-8">
        {type === "signIn" && (
          <div>
            <Link to="/auth/signup">
              <p className="mb-3 text-sm text-center text-blue-600 duration-300 ease-in-out hover:scale-110">
                Sign up
              </p>
            </Link>
          </div>
        )}
        <Button
          type="submit"
          color="green"
          disabled={
            type === "signIn"
              ? !(checkValue.email && checkValue.password === true)
              : !(
                  checkValue.email &&
                  checkValue.password &&
                  checkValue.passwordCheck === true
                )
          }
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
