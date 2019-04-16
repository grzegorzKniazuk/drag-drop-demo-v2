import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlideLibaryActionsTypes {
    AddSlide = '[SlideLibary] Add Slide',
    MoveSlide = '[SlideLibary] Move Slide',
    DeleteSlide = '[SlideLibary] Delete Slide',
    AddSlides = '[SlideLibary] Add Slides',
}

export class AddSlide implements Action {
    public readonly type = SlideLibaryActionsTypes.AddSlide;

    constructor(public payload: { slide: Slide }) {
    }
}

export class MoveSlide implements Action {
    public readonly type = SlideLibaryActionsTypes.MoveSlide;
}

export class DeleteSlide implements Action {
    public readonly type = SlideLibaryActionsTypes.DeleteSlide;

    constructor(public payload: { id: string }) {
    }
}

export class AddSlides implements Action {
    public readonly type = SlideLibaryActionsTypes.AddSlides;

    constructor(public payload: { slides: Slide[] }) {
    }
}

export type SlideLibaryActions = AddSlide | MoveSlide | DeleteSlide | AddSlides;
