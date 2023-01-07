import { useNavigate } from "react-router-dom";
import apis, { IAuthLogin, IAuthSignUp } from "../apis/apis";
import { atom, useRecoilState } from "recoil";
import axios from "axios";

type IUserToken = { state: boolean; token: string };

const localUserToken: string = JSON.parse(
  localStorage.getItem("userToken") || `""`
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
    localStorage.setItem("userToken", JSON.stringify(data.token));
    setUserAtom(data);
  };

  //외부 사용 가능 함수
  const signIn = async (Inputdata: IAuthLogin) =>
    await apis.auth
      .signIn(Inputdata)
      .then((res) => {
        setUser({
          state: res.data.message === "성공적으로 로그인 했습니다",
          token: res.data.token,
        });
        axios.defaults.headers.common["Authorization"] = res.data.token;
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data.details);
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
        axios.defaults.headers.common["Authorization"] = res.data.token;
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
    axios.defaults.headers.common["Authorization"] = user.token;
  };

  return { user, signIn, signUp, logOut, setToken };
};
