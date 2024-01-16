import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface AuthStore {
  user: string;
  setUser(user: string): void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: "",
      setUser(user: string) {
        set({user});
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
