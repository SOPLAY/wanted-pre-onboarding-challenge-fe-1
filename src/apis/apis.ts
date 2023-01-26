import { AxiosResponse } from "axios";
import axios from "./axios";
import { ITodoItem } from "@src/types/todo";
import { IAuthSignIn, IAuthSignUp, IResAuth } from "@src/types/auth";

const apiServerUrl = "http://localhost:8080";

// export type IGetTodosById = { id: string };
export type ITodo = { title: string; content: string };

//api auth
const signIn = (body: IAuthSignIn): Promise<AxiosResponse<IResAuth>> =>
  axios.post(`${apiServerUrl}/users/login`, body);
const signUp = (body: IAuthSignUp): Promise<AxiosResponse<IResAuth>> =>
  axios.post(`${apiServerUrl}/users/create`, body);

// api todos
const getTodos = (): Promise<AxiosResponse<{ data: ITodoItem[] }>> =>
  axios.get(`${apiServerUrl}/todos`);

const getTodosById = (
  id: string
): Promise<AxiosResponse<{ data: ITodoItem }>> =>
  axios.get(`${apiServerUrl}/todos/${id}`);

const createTodo = (body: ITodo): Promise<AxiosResponse<ITodoItem>> =>
  axios.post(`${apiServerUrl}/todos`, body);

const updateTodo = (
  id: string,
  body: ITodo
): Promise<AxiosResponse<ITodoItem>> =>
  axios.put(`${apiServerUrl}/todos/${id}`, body);

const deleteTodo = (id: string): Promise<AxiosResponse<{ data: null }>> =>
  axios.delete(`${apiServerUrl}/todos/${id}`);

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
