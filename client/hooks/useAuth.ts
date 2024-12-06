import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface AuthPayload {
  name: string;
  email: string;
  password: string;
}

const login = async (payload: AuthPayload) => {
    const response = await axiosInstance.post("/login", payload, {
      withCredentials: true
  });
  return response.data;
};

const register = async (payload: AuthPayload) => {
  const response = await axiosInstance.post("/register", payload);
  return response.data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });
