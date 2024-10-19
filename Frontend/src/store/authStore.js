import { create } from "zustand";


export const useAuthStore = create((set) => ({
  authUser:null,
  setAuthUser: (user) => {
    set(() => ({ authUser: user }));
  },
}));