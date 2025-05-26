import api from "@/lib/axios";
import type { UserRequest } from "@/types/auth.type";
import Cookies from "js-cookie";

const API_URL = "/auth";

export const login = async (credentials: UserRequest) => {
  const res = await api.post(`${API_URL}/login-admin`, credentials);
  Cookies.set("token", res.data.access_token, { secure: true });
  return res.data;
};

export const register = async (credentials: UserRequest) => {
  const res = await api.post(`${API_URL}/register-admin`, credentials);
  Cookies.set("token", res.data.access_token, { secure: true });
  return res.data;
};

export const logout = async () => {
  Cookies.remove("token");
  window.location.reload();
};

export const getProfile = async () => {
  const res = await api.get(`${API_URL}/me-admin`);
  return res.data;
};
