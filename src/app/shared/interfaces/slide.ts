import { SlideActions } from 'src/app/shared/interfaces/slide-actions';

export interface Slide {
    id: string;
    imageData: string | ArrayBuffer;
    actions: SlideActions[];
}
