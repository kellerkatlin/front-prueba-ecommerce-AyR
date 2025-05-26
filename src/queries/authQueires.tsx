import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useEffect } from "react";
import type {
  LoginResponse,
  UserRequest,
  UserResponse,
} from "@/types/auth.type";
import { getProfile, login, logout, register } from "@/api/authService";
import { useAuthStore } from "@/store/authStore";

export const useLogin = () => {
  return useMutation<LoginResponse, AxiosError, UserRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      const { token } = data;
      localStorage.setItem("token", token);
    },
  });
};

export const useRegister = () => {
  return useMutation<LoginResponse, AxiosError, UserRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      const { token } = data;
      localStorage.setItem("token", token);
    },
  });
}

export const useLogout = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
    },
  });
};

export const useProfile = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const { data, isSuccess, isLoading, isError } = useQuery<UserResponse, Error>(
    {
      queryKey: ["me"],
      queryFn: getProfile,
      retry: false,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data]);

  return { data, isSuccess, isLoading, isError };
};
