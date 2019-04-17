import { Action } from '@ngrx/store';
import { Presentation } from '../../../../../../shared/interfaces/presentation';
import { Update } from '@ngrx/entity';

export enum PresentationListActionsTypes {
    AddPresentation = '[PresentationList] Add Presentation',
    UpdatePresentation = '[PresentationList] Update Presentation',
    DeletePresentation = '[PresentationList] Delete Presentation',
}

export class AddPresentation implements Action {
    public readonly type = PresentationListActionsTypes.AddPresentation;

    constructor(public payload: { presentation: Presentation }) {
    }
}

export class UpdatePresentation implements Action {
    public readonly type = PresentationListActionsTypes.UpdatePresentation;

    constructor(public payload: { presentation: Update<Presentation> }) {
    }
}

export class DeletePresentation implements Action {
    public readonly type = PresentationListActionsTypes.DeletePresentation;

    constructor(public payload: { id: number }) {
    }
}

export type PresentationListActions = AddPresentation | UpdatePresentation | DeletePresentation;
