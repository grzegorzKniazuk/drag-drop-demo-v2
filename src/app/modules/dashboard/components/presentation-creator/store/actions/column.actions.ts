import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Column } from 'src/app/shared/interfaces/column';

export enum ColumnActionTypes {
    AddColumn = '[Column] Add Column',
    UpdateColumn = '[Column] Update Column',
    UpdateColumns = '[Column] Update Columns',
    DeleteColumn = '[Column] Delete Column',
}

export class AddColumn implements Action {
    public readonly type = ColumnActionTypes.AddColumn;

    constructor(public payload: { column: Column }) {
    }
}

export class UpdateColumn implements Action {
    public readonly type = ColumnActionTypes.UpdateColumn;

    constructor(public payload: { column: Update<Column> }) {
    }
}

export class UpdateColumns implements Action {
    public readonly type = ColumnActionTypes.UpdateColumns;

    constructor(public payload: { columns: Update<Column>[] }) {
    }
}

export class DeleteColumn implements Action {
    public readonly type = ColumnActionTypes.DeleteColumn;

    constructor(public payload: { id: string }) {
    }
}

export type ColumnActions =
    AddColumn
    | UpdateColumn
    | UpdateColumns
    | DeleteColumn;
