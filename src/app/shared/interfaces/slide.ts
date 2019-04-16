import { SlideActions } from 'src/app/shared/interfaces/slide-actions';

export interface Slide {
    id: number;
    columnId: number;
    imageData: string | ArrayBuffer;
    actions: SlideActions[];
}
