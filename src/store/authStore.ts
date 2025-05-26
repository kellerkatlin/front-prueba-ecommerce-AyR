import type { UserResponse } from "@/types/auth.type";
import { create } from "zustand";

type AuthStore = {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
