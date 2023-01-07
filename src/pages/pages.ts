import RootIndex from "./Index";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Todo_Type from "./todo/Todo_Type";
const index = {
  Index: RootIndex,
  Auth: {
    SignIn,
    SignUp,
  },
  Todo: {
    Type: Todo_Type,
  },
};

export default index;
