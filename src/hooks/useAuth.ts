import apis, { IAuthLogin, IAuthSignUp } from "../apis/apis";
import { atom, useRecoilState } from "recoil";

type IUserToken = { state: boolean; token: string };

export const atomAuthState = atom<IUserToken>({
  key: "authState",
  default: { state: false, token: "" },
});

export const useAuth = () => {
  const [user, setUser] = useRecoilState(atomAuthState);

  const signIn = async (Inputdata: IAuthLogin) =>
    await apis.auth.signIn(Inputdata).then((res) => {
      setUser({
        state: res.data.message === "성공적으로 로그인 했습니다",
        token: res.data.token,
      });
      return res.data.message;
    });

  const signUp = async (Inputdata: IAuthSignUp) =>
    await apis.auth.signUp(Inputdata).then((res) => {
      setUser({
        state: res.data.message === "계정이 성공적으로 생성되었습니다",
        token: res.data.token,
      });
      return res.data.message;
    });

  return { user, signIn, signUp };
};
