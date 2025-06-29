export const convertLocalNameKR2EN = (
    name: string
): string => {
    switch (name) {
        case "분당구":
            return "bd";
        case "중원구":
            return "jw";
        case "수정구":
            return "sj";
        default:
            return "";
    }
};

export const convertLocalNameEN2KR = (name: string) => {
    switch (name) {
        case "bd":
            return "분당구";
        case "jw":
            return "중원구";
        case "sj":
            return "수정구";
        default:
            return "";
    }
};
