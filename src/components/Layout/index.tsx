import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen font-mono bg-white">
      <Header />
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
