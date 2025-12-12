import { create } from "zustand";

export interface sessionState {
  success: boolean;
  message: string;
  data: {
    sessionId: string;
    userId: string;
    sessionName: string;
    createdAt?: string;
    lastUpdated?: string;
  }[];
  statusCode: number;
}

interface sessionStore {
  data: sessionState | null;
  setData: (data: sessionState) => void;
  deleteSession: (id: string) => void;
  clearSessionHistory: () => void;
  EditSessionTitle: (sessionId: string, sessionName: string) => void;
}

export const useSessionStore = create<sessionStore>((set) => ({
  data: null,
  setData: (data: sessionState) =>
    set((state) => {
      console.log('this is existing state data', data);
        if (!state.data) {
          return { data: data };
        }
      return {
        data: {
          ...state.data,
          data: [...data.data, ...state.data.data],
        },
      };
    }),
  deleteSession: (id: string) =>
    set((state) => {
      if (!state.data) return state;

      const filtered = state.data.data.filter(
        (dataItem) => dataItem.sessionId !== id
      );
      return {
        data: {
          ...state.data,
          data: filtered,
        },
      };
    }),
  clearSessionHistory: () => set({ data: null }),
  EditSessionTitle: (sessionId: string, sessionName: string) =>
    set((state) => {
      if (!state.data) return state;
      const updatedData = state.data?.data.map((obj) =>
        obj.sessionId == sessionId ? { ...obj, sessionName } : obj
      );

      return {
        data: {
          ...state.data,
          data: updatedData,
        },
      };
    }),
}));
