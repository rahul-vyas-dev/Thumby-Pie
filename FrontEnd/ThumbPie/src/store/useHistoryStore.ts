import { create } from "zustand";

interface sessionState {
  success: boolean;
  message: string;
  data: {
    _id:string
    userId: string;
    sessionId: string;
    imageUrl?: string[];
    GeneratedImageUrl?: string[];
    prompt: string;
    ImagePublicId?: string[];
    AiImagePublicId?: string[];
    createdAt: { type: Date; default: Date };
  }[];
  statusCode: number;
}

interface historyStore {
  data: sessionState | null;
  SetHistory: (data: sessionState) => void;
  EditHistory: (data: sessionState) => void;
  DeleteHistory: (_id:string) => void;
}

export const useHistoryStore = create<historyStore>((set) => ({
  data: null,
  SetHistory: (data: sessionState) => set({ data }),
  EditHistory: (data: sessionState) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          data: [...state.data.data, ...data.data],
        },
      };
    }),
  DeleteHistory: (_id: string) => set((state) => { 
    if (!state.data) return state;
    const filteredHistory = state.data.data.filter((obj) => obj._id !== _id);
    return {
      data: {
        ...state.data,
        data:filteredHistory
    } }
  }),
}));

