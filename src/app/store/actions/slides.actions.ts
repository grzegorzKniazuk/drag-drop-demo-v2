import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlidesActionTypes {
    AddSlide = '[Add slide] Action',
    EditSlide = '[Edit slide] Action',
    RemoveSlide = '[Remove slide] Action',
    MoveSlide = '[Move slide] Action',
}

export class AddSlide implements Action {
    public readonly type = SlidesActionTypes.AddSlide;

    constructor(public payload: { slide: Slide }) {
    }
}

export class EditSlide implements Action {
    public readonly type = SlidesActionTypes.EditSlide;
}

export class RemoveSlide implements Action {
    public readonly type = SlidesActionTypes.RemoveSlide;
}

export class MoveSlide implements Action {
    public readonly type = SlidesActionTypes.MoveSlide;
}

export type SlidesActions = AddSlide | EditSlide | RemoveSlide | MoveSlide;
