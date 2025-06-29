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
            return "";
    }
};
