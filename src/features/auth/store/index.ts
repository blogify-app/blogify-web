import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {Whoami} from "@/services/api/gen";

export interface AuthStore {
  user: Whoami | null;
  setUser(user: Whoami | null): void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser(user) {
        set({user});
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
