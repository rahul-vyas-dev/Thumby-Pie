import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  success: true;
  message: string;
  data: [
    {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
  statusCode: 200;
  accessToken: string;
}

interface UserStore {
  user: UserState | null;
  setUser: (user: UserState) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserState) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

export const selectUserData = (state: UserStore) => state.user?.data[0];
export const selectAccessToken = (state: UserStore) => state.user?.accessToken;
export const selectIsAuthenticated = (state: UserStore) => state.user !== null;
