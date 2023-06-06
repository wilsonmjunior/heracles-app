import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://192.168.0.108:3333",
})

api.interceptors.request.use((config) => {
  return config;
}, (error) => {

  return Promise.reject(error);
})

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (axios.isAxiosError(error) && error.response?.data) {
    return Promise.reject(new AppError(error.response.data.message));
  }

  return Promise.reject(new AppError("Error no servidor. Tente novamente mais tarde"));
})

export { api }
