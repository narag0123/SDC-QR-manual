import { create } from "zustand";

interface GLocal {
    localName: string;
    setLocalName: (name: string) => void;
    fieldName: string;
    setFieldName: (name: string) => void;
    authorization: boolean;
    setAuthorization: (name: boolean) => void;
}
export const useGlobalStore = create<GLocal>((set) => {
    let initialAuth = false;

    if (typeof window !== "undefined") {
        const stored =
            localStorage.getItem("authorization");
        if (stored !== null) {
            try {
                initialAuth = JSON.parse(stored); // "true" -> true
            } catch (e) {
                initialAuth = false;
            }
        }
    }

    return {
        localName: "분당구",
        setLocalName: (localName) => set({ localName }),
        fieldName: "전기",
        setFieldName: (fieldName) => set({ fieldName }),
        authorization: initialAuth,
        setAuthorization: (auth) => {
            localStorage.setItem(
                "authorization",
                JSON.stringify(auth)
            );
            set({ authorization: auth });
        },
    };
});
