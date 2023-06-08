import { AUTH_TOKEN } from "@/constant";
import axios, { AxiosRequestConfig, Method as AxiosMethod, AxiosInstance, AxiosError, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:6060/api/v1/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export type IMeThod = Extract<
  AxiosMethod,
  | "delete"
  | "get"
  | "head"
  | "post"
  | "put"
  | "patch"
  | "options"
  | "purge"
  | "link"
  | "unlink"
  | "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "PURGE"
  | "LINK"
  | "UNLINK"
>;
instance.interceptors.request.use(
  function (config: AxiosRequestConfig | any) {
  const token = config.headers?.Authorization || window?.localStorage.getItem(AUTH_TOKEN);
  // console.log("token", token);
  if (token !== null && token !== undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  }

    return config;
  },
  function (error: AxiosError | any) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  },
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error: AxiosError | any) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  },
);

export const request = (url: string, payload: any, method: IMeThod | any, token?: string) => {
  let data = payload;
  let params;
  if (method === "get") {
    params = payload;
  }
  if(token) {
  instance.defaults.headers.common = {'Authorization': `${token}`}
  }

  return instance({ url, data, params, method });
};

const APIs = {
  login: (payload: any) => request("/auth/login", payload, "POST"),
  users: (payload: any) => request("/users", payload.data, "get", payload.token),
};
export default APIs;
