import { useAuth } from "@hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  return (
    <header className="border-b ">
      <div className="flex items-center justify-between h-12 px-5">
        <p className="text-xl text-justify ">
          <b>ToDo</b>
        </p>
        <nav>
          <ul className="flex gap-2 text-sm">
            {auth.user.state ? (
              <li className="cursor-pointer" onClick={() => auth.logOut()}>
                LogOut
              </li>
            ) : (
              <>
                <li>
                  <Link to={"/auth/signin"}>SignIn</Link>
                </li>
                <li>
                  <Link to={"/auth/signup"}>SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
