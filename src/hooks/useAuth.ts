import { useNavigate } from "react-router-dom";
import apis, { IAuthLogin, IAuthSignUp } from "../apis/apis";
import { atom, useRecoilState } from "recoil";

type IUserToken = { state: boolean; token: string };

const initData = JSON.parse(
  localStorage.getItem("userAuthData") || `{"state":false,"token":""}`
) as IUserToken;

export const atomAuthState = atom<IUserToken>({
  key: `authState${new Date()}`,
  default: initData,
});

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUserAtom] = useRecoilState(atomAuthState);

  const setUser = (data: IUserToken) => {
    localStorage.setItem("userAuthData", JSON.stringify(data));
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
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data.details);
      });

  const signUp = async (Inputdata: IAuthSignUp) =>
    await apis.auth
      .signUp(Inputdata)
      .then((res) => {
        setUser({
          state: res.data.message === "계정이 성공적으로 생성되었습니다",
          token: res.data.token,
        });
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

  return { user, signIn, signUp, logOut };
};
