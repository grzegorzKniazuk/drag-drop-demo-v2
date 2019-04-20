import { Action } from '@ngrx/store';
import { Presentation } from '../../../../../../shared/interfaces/presentation';

export enum PresentationListActionsTypes {
    AddPresentation = '[PresentationList] Add Presentation',
}

export class AddPresentation implements Action {
    public readonly type = PresentationListActionsTypes.AddPresentation;

    constructor(public payload: { presentation: Presentation }) {
    }
}

export type PresentationListActions = AddPresentation;
