import axios, { AxiosRequestConfig, Method as AxiosMethod } from "axios";
const instance = axios.create({
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
    // Làm gì đó trước khi request dược gửi đi
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  },
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  },
);

export const request = (url: string, payload: any, method: IMeThod | any) => {
  let data = payload;
  let params;
  if (method === "get") {
    params = payload;
  }
  return instance({ url, data, params, method });
};

const APIs = {
  login: (payload: any) => request("/auth/login", payload, "POST"),
};
export default APIs;
