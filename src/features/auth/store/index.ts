import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface AuthStore {
  user: string | null;
  setUser(user: string | null): void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: "",
      setUser(user: string | null) {
        set({user});
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
