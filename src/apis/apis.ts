import axios from 'axios';

const apiServerUrl = 'http://localhost:8080';

export type IAuthLogin = { email: string; password: string };
export type IAuthSign = IAuthLogin;

//promise를 반환
const apis = {
  auth: {
    login: (data: IAuthLogin) => axios.post(`${apiServerUrl}/user/login`, data),
    signUp: (data: IAuthSign) =>
      axios.post(`${apiServerUrl}/user/create`, data),
  },
  todos: {
    getTodos: () => {},
    getTodosById: () => {},
    createTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
  },
};

export default apis;
