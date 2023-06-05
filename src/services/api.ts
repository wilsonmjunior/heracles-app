import axios from "axios";

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
  return Promise.reject(error);
})

export { api }
