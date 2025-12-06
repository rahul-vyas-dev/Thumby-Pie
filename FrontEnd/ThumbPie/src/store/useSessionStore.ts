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
  data: {
    success: true,
    data: [
      {
        sessionId: "string",
        userId: "string",
        sessionName: "stringg1",
        createdAt: "32:32:2",
        lastUpdated: "Date",
      },
      {
        sessionId: "string2",
        userId: "string",
        sessionName: "string2",
        createdAt: "32:32:2",
        lastUpdated: "Date",
      },
      {
        sessionId: "string3",
        userId: "string",
        sessionName: "string3",
        createdAt: "32:32:2",
        lastUpdated: "Date",
      },
    ],
    message: "no data dound",
    statusCode: 401,
  },
  setData: (data: sessionState) =>
    set((state) => {
      if (!state.data) return state;
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
