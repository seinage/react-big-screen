import axios, { InternalAxiosRequestConfig } from "axios";

import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 基本配置
axios.defaults.baseURL = "http://127.0.0.1:8092/";

const curAxios = axios.create({
  timeout: 1000 * 10 // 如果请求超过 `timeout` 的时间，请求将被中断
});

curAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

curAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

type AnyObj = Record<string, unknown>
type GetParams = { urlParams?: AnyObj | AnyObj[] }
type PostParams = { urlParams?: AnyObj | AnyObj[], body?: AnyObj }

/**
 * 拼接 `url` 参数
 */
function handleUrlParams(params?: AnyObj | AnyObj[]) {
  if (!params)
    return "";

  let paramStr = "";
  if (!Array.isArray(params))
    params = [params];

  const arr = params.flatMap((i: any) => Object.entries(i));
  for (const [k, v] of arr) {
    if (v === "")
      continue;
    paramStr += `&${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`;
  }

  return `?${paramStr.slice(1)}`;
}

function handleRes() {

}

const get = (url: string, params?: GetParams) => {
  url += handleUrlParams(params?.urlParams);
  return curAxios.get(url)
};
const post = (url: string, params?: PostParams) => {
  url += handleUrlParams(params?.urlParams);
  return curAxios.post(url, params?.body);
};
const request = { get, post };

export default request;
