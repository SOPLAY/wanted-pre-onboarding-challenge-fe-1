import Form from "@components/Layout/SignForm";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-96">
        <Form type={"signUp"} />
      </div>
    </div>
  );
};

export default SignUp;
