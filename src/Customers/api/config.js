import axios from "axios";
import { hideLoading, showLoading } from "../redux/loadingSlice";
import { store } from "../../main";

export const CYBER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA";

export const https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft: CYBER_TOKEN,
  },
});

https.interceptors.request.use(
  function (config) {
    console.log("Api đi");
    store.dispatch(showLoading());

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    console.log("Api về thành công");

    // Delay 3 giây trước khi ẩn loading
    setTimeout(() => {
      store.dispatch(hideLoading());
    }, 1500);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("Api về lỗi");
    // Delay 3 giây trước khi ẩn loading dù có lỗi
    setTimeout(() => {
      store.dispatch(hideLoading());
    }, 1500);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
