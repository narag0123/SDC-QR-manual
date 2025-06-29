import { create } from "zustand";

interface GLocal {
    localName: string;
    setLocalName: (name: string) => void;
    fieldName: string;
    setFieldName: (name: string) => void;
}

export const useGlobalStore = create<GLocal>((set) => ({
    localName: "분당구",
    setLocalName: (localName) => set({ localName }),
    fieldName: "전기",
    setFieldName: (fieldName) => set({ fieldName }),
}));
