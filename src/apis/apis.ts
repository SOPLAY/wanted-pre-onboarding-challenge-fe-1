import axios, { AxiosResponse } from "axios";

const apiServerUrl = "http://localhost:8080";

export type IAuthLogin = { email: string; password: string };
export type IAuthSignUp = IAuthLogin;

type IResAuth = { message: string; token: string };

//api auth
const login = (data: IAuthLogin): Promise<AxiosResponse<IResAuth>> =>
  axios.post(`${apiServerUrl}/user/login`, data);

const signUp = (data: IAuthSignUp): Promise<AxiosResponse<IResAuth>> =>
  axios.post(`${apiServerUrl}/user/create`, data);

// api todos

const getTodos = () => {};
const getTodosById = () => {};
const createTodo = () => {};
const updateTodo = () => {};
const deleteTodo = () => {};

const apis = {
  auth: {
    login,
    signUp,
  },
  todos: {
    getTodos,
    getTodosById,
    createTodo,
    updateTodo,
    deleteTodo,
  },
};

export default apis;
