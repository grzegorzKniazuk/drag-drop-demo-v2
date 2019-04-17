import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlideLibaryActionsTypes {
    AddSlide = '[SlideLibary] Add Slide',
    MoveSlide = '[SlideLibary] Move Slide',
    DeleteSlide = '[SlideLibary] Delete Slide',
    AddSlides = '[SlideLibary] Add Slides',
    DeleteSlides = '[SlideLibary] Delete Slides',
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

    constructor(public payload: { id: number }) {
    }
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

export type SlideLibaryActions = AddSlide | MoveSlide | DeleteSlide | AddSlides | DeleteSlides;
