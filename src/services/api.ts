import axios, { AxiosError, AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import { StorageAuthTokenProps, getAuthTokenFromStorage, saveAuthTokenToStorage } from "@storage/authTokenStorage";

type SignOut = () => void;

type PromiseType = {
  onSuccess(token: string): void;
  onFailure(error: AxiosError): void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager(signOut: SignOut): () => void;
}

const api = axios.create({
  // baseURL: "http://192.168.0.101:3333",
  // baseURL: "http://172.20.10.8:3333",
  baseURL: "http://localhost:3333",
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response?.data?.message === 'token.expired' || requestError.response?.data?.message === 'token.invalid') {
        const { refresh_token } = await getAuthTokenFromStorage();
        if (!refresh_token) {
          signOut();
          return Promise.reject(requestError);
        }

        const originalRequestConfig = requestError.config;
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess(token) {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure(error) {
                reject(error)
              }
            });
          })
        }

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post<StorageAuthTokenProps>('/sessions/refresh-token', { refresh_token });
            await saveAuthTokenToStorage({ refresh_token: data.refresh_token, token: data.token });

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueue.forEach(request => {
              request.onSuccess(data.token);
            });

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            failedQueue.forEach((request) => {
              request.onFailure(error);
            });

            signOut();
            reject(error);
          } finally {
            isRefreshing = false;
            failedQueue = [];
          }
        })
      }

      signOut();
    }

    if (axios.isAxiosError(requestError) && requestError.response?.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    }
  
    return Promise.reject(new AppError("Error no servidor. Tente novamente mais tarde"));
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

api.interceptors.request.use((config) => {
  return config;
}, (error) => {

  return Promise.reject(error);
});

export { api };
