export interface IAuthSignIn {
  email: string;
  password: string;
}
export interface IAuthSignUp extends IAuthSignIn {}

export interface IResAuth {
  message: string;
  token: string;
}
export type IUserToken = { state: boolean; token: string };
