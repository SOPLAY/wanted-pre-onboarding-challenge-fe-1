import { AUTH_KEYS } from "@src/constant/auth";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create();

//요청 인터셉터
axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_KEYS.USER_KEY);
    if (token) {
      config.headers = {};
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

//응답 인터셉터
// axiosClient.interceptors.response.use(
//   res=>res,
//   error => Promise.reject(error)
// )

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<{ details: string }>) => {
    const isTokenMissing = error.response?.status === 401;

    if (isTokenMissing) {
      alert("로그인이 필요한 페이지 입니다!!");
      window.location.replace("/auth/signin");
    } else {
      alert(error.response?.data.details);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
