import { Column } from './column';

export interface Presentation {
    id: number;
    title: string;
    columns: Column[];
}
