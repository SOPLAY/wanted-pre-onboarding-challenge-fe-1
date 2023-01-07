import { Navigate, Route, Routes } from "react-router-dom";
import pages from "@pages/pages";
import { useAuth } from "@hooks/useAuth";
import Layout from "@components/Layout";

const Router = () => {
  const { user } = useAuth();

  const Auth = ({
    auth = false,
    element,
  }: {
    auth?: boolean;
    element: JSX.Element;
  }) =>
    user.state === auth ? (
      element
    ) : user.state ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="/auth/signin" />
    );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Auth auth element={<pages.Index />} />}>
          <Route path="/todo/:type" element={<pages.Todo.Type />} />
        </Route>
        <Route path="auth">
          <Route
            path="signin"
            element={<Auth element={<pages.Auth.SignIn />} />}
          />
          <Route
            path="signup"
            element={<Auth element={<pages.Auth.SignUp />} />}
          />
        </Route>
      </Route>
      <Route path="*" />
    </Routes>
  );
};

export default Router;
