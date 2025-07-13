import axiosInstance from '@/common/http/axiosInstance';
import { API_ENDPOINTS } from '@/constants/constants';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
    email,
    password,
  });
  return res.data; // should include { token, user }
};
