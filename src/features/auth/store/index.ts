import {create} from "zustand";

export interface AuthStore {
  user: string;
  setUser(user: string): void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: "",
  setUser(user: string) {
    set({user});
  },
}));
