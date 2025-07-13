import axiosInstance from './axiosInstance';

export const get = <T = any>(url: string, config = {}) =>
  axiosInstance.get<T>(url, config);

export const post = <T = any>(url: string, data?: any, config = {}) =>
  axiosInstance.post<T>(url, data, config);

export const put = <T = any>(url: string, data?: any, config = {}) =>
  axiosInstance.put<T>(url, data, config);

export const del = <T = any>(url: string, config = {}) =>
  axiosInstance.delete<T>(url, config);
