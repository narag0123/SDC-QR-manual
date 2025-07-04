export const convertFieldKR = (i: number) => {
    switch (i) {
        case 1:
            return "전기";
        case 2:
            return "기계";
        case 3:
            return "통신";
        case 4:
            return "소방";
        default:
            "";
    }
};

export const convertFieldEN = (i: number) => {
    switch (i) {
        case 1:
            return "electricity";
        case 2:
            return "mechanic";
        case 3:
            return "telecommunication";
        case 4:
            return "fireservice";
        default:
            "";
    }
};

export const convertFieldIndex = (name: string): number => {
    switch (name) {
        case "electricity":
            return 1;
        case "mechanic":
            return 2;
        case "telecommunication":
            return 3;
        case "fireservice":
            return 4;
        default:
            return 0;
    }
};
