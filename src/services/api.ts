// src/services/api.ts
import { storageAuthTokenGet } from '@storage/storageAuthToken';
import axios, { AxiosError, AxiosInstance } from 'axios';

type SignOut = () => void;
type TokenRefreshCallback = (newToken: string) => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (config: {
    signOut: SignOut;
    refreshTokenUpdated: TokenRefreshCallback;
  }) => () => void;
};

const api = axios.create({
  baseURL: 'http://192.168.15.29:3333',
}) as APIInstanceProps;

let failedQueue: PromiseType[] = [];
let isRefreshing = false;

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.onFailure(error);
    } else if (token) {
      promise.onSuccess(token);
    }
  });
  failedQueue = [];
};

api.registerInterceptTokenManager = ({ signOut, refreshTokenUpdated }) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        const errorMessage = requestError.response.data?.message;

        if (
          errorMessage === 'token.expired' ||
          errorMessage === 'token.invalid'
        ) {
          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers.Authorization = `Bearer ${token}`;
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          try {
            const { refresh_token } = await storageAuthTokenGet();
            if (!refresh_token) {
              signOut();
              return Promise.reject(new Error('No refresh token available'));
            }

            const response = await api.post('/refresh-token', {
              refresh_token,
            });
            const { token } = response.data;

            api.defaults.headers.Authorization = `Bearer ${token}`;
            originalRequestConfig.headers = {
              ...originalRequestConfig.headers,
              Authorization: `Bearer ${token}`,
            };

            refreshTokenUpdated(token);
            processQueue(null, token);
            return api(originalRequestConfig);
          } catch (error: any) {
            processQueue(error, null);
            signOut();
            return Promise.reject(error);
          } finally {
            isRefreshing = false;
          }
        }
      }

      return Promise.reject(requestError);
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export default api;
