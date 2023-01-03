import RootIndex from "./Index";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
const index = {
  Index: RootIndex,
  Auth: {
    SignIn,
    SignUp,
  },
};

export default index;
