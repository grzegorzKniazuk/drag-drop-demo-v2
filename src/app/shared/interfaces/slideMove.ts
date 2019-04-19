export interface SlideMove {
    start: {
        columnID: number;
        slideID: number;
    },
    end: {
        columnID: number;
        slideID: number;
    },
    dropOnDivider: boolean;
}
