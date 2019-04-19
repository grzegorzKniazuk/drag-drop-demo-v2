import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlideLibaryActionsTypes {
    AddSlidesToLibary = '[SlideLibary] Add Slides To Libary',
    DeleteSlidesFromLibary = '[SlideLibary] Delete Slides From Libary',
}

export class AddSlidesToLibary implements Action {
    public readonly type = SlideLibaryActionsTypes.AddSlidesToLibary;

    constructor(public payload: { slides: Slide[] }) {
    }
}

export class DeleteSlidesFromLibary implements Action {
    public readonly type = SlideLibaryActionsTypes.DeleteSlidesFromLibary;

    constructor(public payload: { ids: number[] }) {
    }
}

export type SlideLibaryActions = AddSlidesToLibary | DeleteSlidesFromLibary;
