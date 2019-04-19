import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlideLibaryActionsTypes {
    DeleteSlide = '[SlideLibary] Delete Slide',
    AddSlides = '[SlideLibary] Add Slides',
    DeleteSlides = '[SlideLibary] Delete Slides',
}

export class AddSlides implements Action {
    public readonly type = SlideLibaryActionsTypes.AddSlides;

    constructor(public payload: { slides: Slide[] }) {
    }
}

export class DeleteSlides implements Action {
    public readonly type = SlideLibaryActionsTypes.DeleteSlides;

    constructor(public payload: { ids: number[] }) {
    }
}

export type SlideLibaryActions = AddSlides | DeleteSlides;
