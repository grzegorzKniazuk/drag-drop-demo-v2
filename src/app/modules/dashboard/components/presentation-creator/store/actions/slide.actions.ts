import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlideActionTypes {
    LoadSlides = '[Slide] Load Slides',
    UpsertSlide = '[Slide] Upsert Slide',
    MoveSlide = '[Slide] Move Slide',
    AddSlides = '[Slide] Add Slides',
    UpsertSlides = '[Slide] Upsert Slides',
    UpdateSlide = '[Slide] Update Slide',
    UpdateSlides = '[Slide] Update Slides',
    DeleteSlide = '[Slide] Delete Slide',
    DeleteSlides = '[Slide] Delete Slides',
    ClearSlides = '[Slide] Clear Slides',
}

export class LoadSlides implements Action {
    public readonly type = SlideActionTypes.LoadSlides;

    constructor(public payload: { slides: Slide[] }) {
    }
}

export class UpsertSlide implements Action {
    public readonly type = SlideActionTypes.UpsertSlide;

    constructor(public payload: { slide: Slide }) {
    }
}

export class AddSlides implements Action {
    public readonly type = SlideActionTypes.AddSlides;

    constructor(public payload: { slides: Slide[] }) {
    }
}

export class UpsertSlides implements Action {
    public readonly type = SlideActionTypes.UpsertSlides;

    constructor(public payload: { slides: Slide[] }) {
    }
}

export class UpdateSlide implements Action {
    public readonly type = SlideActionTypes.UpdateSlide;

    constructor(public payload: { slide: Update<Slide> }) {
    }
}

export class UpdateSlides implements Action {
    public readonly type = SlideActionTypes.UpdateSlides;

    constructor(public payload: { slides: Update<Slide>[] }) {
    }
}

export class DeleteSlide implements Action {
    public readonly type = SlideActionTypes.DeleteSlide;

    constructor(public payload: { id: string }) {
    }
}

export class DeleteSlides implements Action {
    public readonly type = SlideActionTypes.DeleteSlides;

    constructor(public payload: { ids: string[] }) {
    }
}

export class ClearSlides implements Action {
    public readonly type = SlideActionTypes.ClearSlides;
}

export class MoveSlide implements Action {
    public readonly type = SlideActionTypes.MoveSlide;
}

export type SlideActions =
    LoadSlides
    | UpsertSlide
    | AddSlides
    | UpsertSlides
    | UpdateSlide
    | UpdateSlides
    | DeleteSlide
    | DeleteSlides
    | ClearSlides
    | MoveSlide;
