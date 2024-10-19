import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,  // Initial value
      setAuthUser: (user) => {
        set(() => ({ authUser: user }));
      },
    }),
    {
      name: "auth-store",  // Unique name for localStorage key
      getStorage: () => localStorage,  // (optional) Specify storage, default is localStorage
    }
  )
);
