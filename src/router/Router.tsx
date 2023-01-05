import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import pages from "@pages/pages";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import Layout from "@components/Layout";
import axios from "axios";

const Router = () => {
  const auth = useAuth();
  const location = useLocation();

  console.log("path", location.pathname);
  const navigate = useNavigate();
  const canUseNoLoginPath = ["/auth/signin", "/auth/signup"];

  useEffect(() => {
    console.table(auth.user);
    const moveToNoLoginUser = () => {
      auth.user.state ||
        canUseNoLoginPath.filter((value) => value === location.pathname)
          .length ||
        navigate("/auth/signin");
    };
    const moveToLoginUser = () => {
      auth.user.state &&
        canUseNoLoginPath.filter((value) => value === location.pathname)
          .length &&
        navigate("/");
    };
    moveToNoLoginUser();
    moveToLoginUser();
    axios.defaults.headers.common["Authorization"] = auth.user.token;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<pages.Index />} />
        <Route path="auth">
          <Route path="signin" element={<pages.Auth.SignIn />} />
          <Route path="signup" element={<pages.Auth.SignUp />} />
        </Route>
        <Route path="todo/:id" element={<pages.Todo.Details />} />
      </Route>
      <Route path="*" />
    </Routes>
  );
};

export default Router;
