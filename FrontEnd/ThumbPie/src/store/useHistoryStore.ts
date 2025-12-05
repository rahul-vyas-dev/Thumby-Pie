import { create } from "zustand";

interface sessionState {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    sessionId: string;
    imageUrl?: string[];
    GeneratedImageUrl?: string[];
    prompt: string;
    ImagePublicId?: string[];
    AiImagePublicId?: string[];
    createdAt: Date;
  }[];
  statusCode: number;
}

interface historyStore {
  data: sessionState | null;
  SetHistory: (data: sessionState) => void;
  EditHistory: (data: sessionState) => void;
  DeleteHistory: (_id: string) => void;
}

export const useHistoryStore = create<historyStore>((set) => ({
  data: {
    success: true,
    message: "successfully fetched",
    data: [
      {
        _id: "string1",
        userId: "string",
        sessionId: "string;",
        imageUrl: [
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        ],
        GeneratedImageUrl: [
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        ],
        prompt: "string",
        ImagePublicId: [""],
        AiImagePublicId: [""],
        createdAt: new Date(Date.now()),
      },
      {
        _id: "strindsg1",
        userId: "string",
        sessionId: "string;",
        imageUrl: [
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        ],
        GeneratedImageUrl: [
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
          "https://tse1.mm.bing.net/th/id/OIP.eZwMo1VS01cGzkiLG0IPeQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        ],
        prompt: "string",
        ImagePublicId: [""],
        AiImagePublicId: [""],
        createdAt: new Date(Date.now()),
      },
    ],
    statusCode: 200,
  },
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
  DeleteHistory: (_id: string) =>
    set((state) => {
      if (!state.data) return state;
      const filteredHistory = state.data.data.filter((obj) => obj._id !== _id);
      return {
        data: {
          ...state.data,
          data: filteredHistory,
        },
      };
    }),
}));
