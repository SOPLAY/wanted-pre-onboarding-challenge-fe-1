import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import pages from "@pages/pages";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import Layout from "@components/Layout";

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
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<pages.Index />} />
        <Route path="auth">
          <Route path="signin" element={<pages.Auth.SignIn />} />
          <Route path="signup" element={<pages.Auth.SignUp />} />
        </Route>
      </Route>
      <Route path="*" />
    </Routes>
  );
};

export default Router;
