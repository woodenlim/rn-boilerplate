// src/common/http/axiosInstance.ts
import axios from 'axios';
import type { Store } from 'redux';
import type { RootState } from '@/redux/rootReducer';
import { logoutRequest } from '@/features/auth/authSlice';
import { store } from '@/redux/store/store';
import { DateTime } from 'luxon';

const getTransactionId = (): string => {
  const now = DateTime.utc();
  const date = now.toFormat('yyyyMMdd');
  const time = now.toFormat('HHmmssSSS');

  const { auth } = store.getState();
  // let userId = auth?.profile?.user_id || "";
  let userId = 'userId';
  return userId ? `U${userId}D${date}T${time}` : `D${date}T${time}`;
};

const axiosInstance = axios.create({
  baseURL: 'https://api.yourdomain.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const configureInterceptor = () => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    config => {
      config.headers['X-Request-ID'] = getTransactionId();
      const state = store.getState();
      const token = state.auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 401) {
        store.dispatch(logoutRequest());
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
