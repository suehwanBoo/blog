import type { User } from "@boo/firebase/type";
import { create } from "zustand";

type AuthStore = {
  auth: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  login: (user: User) => set({ auth: user }),
  logout: () => set({ auth: null }),
}));
