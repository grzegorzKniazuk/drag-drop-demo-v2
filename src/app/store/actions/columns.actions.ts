import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/interfaces/column';

export enum ColumnsActionTypes {
    AddColumn = '[Add column] Action',
    EditColumn = '[Edit column] Action',
    RemoveColumn = '[Remove column] Action',
    MoveColumn = '[Move column] Action',
}

export class AddColumn implements Action {
    public readonly type = ColumnsActionTypes.AddColumn;

    constructor(public payload: { column: Column }) {
    }
}

export class EditColumn implements Action {
    public readonly type = ColumnsActionTypes.EditColumn;
}

export class RemoveColumn implements Action {
    public readonly type = ColumnsActionTypes.RemoveColumn;
}

export class MoveColumn implements Action {
    public readonly type = ColumnsActionTypes.MoveColumn;
}

export type ColumnsActions = AddColumn | EditColumn | RemoveColumn | MoveColumn;
