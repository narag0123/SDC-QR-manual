export const convertFieldNameKR2EN = (name: string) => {
    switch (name) {
        case "전기":
            return "electricity";
        case "기계":
            return "mechanic";
        case "통신":
            return "telecommunication";
        case "소방":
            return "fireservice";
        default:
            return "convertFieldNameKR2EN뭔가잘못됨";
    }
};

export const convertFieldNameEN2KR = (name: string) => {
    switch (name) {
        case "electricity":
            return "전기";
        case "mechanic":
            return "기계";
        case "telecommunication":
            return "통신";
        case "fireservice":
            return "소방";
        default:
            return "convertFieldNameEN2KR뭔가잘못됨";
    }
};
