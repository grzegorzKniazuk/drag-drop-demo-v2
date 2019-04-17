import { Slide } from './slide';

export interface Column {
    id: number;
    title: string;
    slides: Slide[];
}
