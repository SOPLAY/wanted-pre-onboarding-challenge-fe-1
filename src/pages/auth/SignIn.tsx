import Form from "@components/Layout/SignForm";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className=" w-96">
        <Form type={"signIn"} />
      </div>
    </div>
  );
};

export default SignIn;
