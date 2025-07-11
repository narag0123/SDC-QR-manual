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
        case 5:
            return "승강기";
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
        case 5:
            return "elevator";
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
        case "elevator":
            return 5;
        default:
            return 0;
    }
};
