import axios, { AxiosResponse } from "axios";

const apiServerUrl = "http://localhost:8080";

export type IAuthLogin = { email: string; password: string };
export type IAuthSignUp = IAuthLogin;
type IResAuth = { message: string; token: string };
export type IGetTodosById = { id: string };
export type ITodo = { title: string; content: string };

//api auth
const signIn = (body: IAuthLogin): Promise<AxiosResponse<IResAuth>> =>
  axios.post(`${apiServerUrl}/users/login`, body);
const signUp = (body: IAuthSignUp): Promise<AxiosResponse<IResAuth>> =>
  axios.post(`${apiServerUrl}/users/create`, body);

// api todos
const getTodos = () => axios.get(`${apiServerUrl}/todos`);
const getTodosById = (id: string) => axios.get(`${apiServerUrl}/todos/${id}`);
const createTodo = (body: ITodo) => axios.post(`${apiServerUrl}/todos`, body);
const updateTodo = (id: string, body: ITodo) =>
  axios.put(`${apiServerUrl}/todos/${id}`, body);
const deleteTodo = (id: string) => axios.delete(`${apiServerUrl}/todos/${id}`);

const apis = {
  auth: {
    signIn,
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
