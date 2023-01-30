import { useNavigate } from "react-router-dom";
import apis from "../apis/apis";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { AUTH_KEYS } from "@src/constant/auth";
import { IAuthSignIn, IAuthSignUp, IUserToken } from "@src/types/auth";

const localUserToken: string = JSON.parse(
  localStorage.getItem(AUTH_KEYS.USER_KEY) || `""`
);
const initData: IUserToken = {
  state: localUserToken !== "",
  token: localUserToken,
};

export const atomAuthState = atom<IUserToken>({
  key: `authState${new Date()}`,
  default: initData,
});

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUserAtom] = useRecoilState(atomAuthState);

  const setUser = (data: IUserToken) => {
    localStorage.setItem(AUTH_KEYS.USER_KEY, JSON.stringify(data.token));
    setUserAtom(data);
  };

  //외부 사용 가능 함수
  const signIn = async (Inputdata: IAuthSignIn) =>
    await apis.auth
      .signIn(Inputdata)
      .then((res) => {
        setUser({
          state: res.data.message === "성공적으로 로그인 했습니다",
          token: res.data.token,
        });
        axios.defaults.headers.common[AUTH_KEYS.TOKEN_KEY] = res.data.token;
        navigate("/");
      })
      .catch((e) => {
        user.state && logOut();
      });

  const signUp = async (Inputdata: IAuthSignUp) =>
    await apis.auth
      .signUp(Inputdata)
      .then((res) => {
        setUser({
          state: res.data.message === "계정이 성공적으로 생성되었습니다",
          token: res.data.token,
        });
        axios.defaults.headers.common[AUTH_KEYS.TOKEN_KEY] = res.data.token;
        alert("회원가입에 성공했습니다.!!");
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data.details);
      });

  const logOut = () => {
    setUser({ state: false, token: "" });
    navigate("/auth/signIn");
  };

  const setToken = () => {
    axios.defaults.headers.common[AUTH_KEYS.TOKEN_KEY] = user.token;
  };

  return { user, signIn, signUp, logOut, setToken };
};
