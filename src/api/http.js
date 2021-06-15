import Vue from "vue"
import axios from "axios";

const domain = "http://www.mikonchen.top";
// const domain = "http://49.234.76.196";
// const domain = "http://localhost";
const port = 3000;
// const limit = 20;

// 创建axios实例
const httpService = axios.create({
  baseURL: `${domain}:${port}/`,
  responseType: "json",
  timeout: 200000,
  withCredentials: true,
})

httpService.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err);
})

httpService.interceptors.response.use(config => {
  return config;
}, err => {
  return Promise.reject(err);
})

// 普通请求
export const request = (
  url, // 接口后缀
  parameter = {}, // 携带参数
  method = "GET", // 请求方法
) => {
  let options = { url, method };
  method == "GET" ?
    options.params = parameter :
    method == "POST" ?
      options.data = parameter :
      ""
  return httpService.request(options)

  // suffix += `?timestamp=${Date.parse(new Date()) / 1000}`; // POST请求url必须添加时间戳,使每次请求url不一样,不然请求会被缓存
}

// 登录后普通请求
export const requestLogined = (
  url, // 接口后缀
  parameter = {}, // 携带参数
  method = "GET", // 请求方法
) => {
  
  let cookie = Vue.prototype.$cookie.getCookie("cookie");
  cookie && (parameter.cookie = cookie);
  
  let options = { url, method };
  method == "GET" ?
    options.params = parameter :
    method == "POST" ?
      options.data = parameter :
      ""
  return httpService.request(options)
}


