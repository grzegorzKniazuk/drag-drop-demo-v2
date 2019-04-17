import { Slide } from 'src/app/shared/interfaces/slide';

export interface Presentation {
    id: number;
    title: string;
    slides: Slide[];
}
