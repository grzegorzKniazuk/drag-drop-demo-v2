import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Column } from 'src/app/shared/interfaces/column';

export enum ColumnActionTypes {
    AddColumn = '[Column] Add Column',
    AddColumns = '[Column] Add Columns',
    UpdateColumn = '[Column] Update Column',
    UpdateColumns = '[Column] Update Columns',
    DeleteColumn = '[Column] Delete Column',
    DeleteAllColumns = '[Column] Delete All Columns',
}

export class AddColumn implements Action {
    public readonly type = ColumnActionTypes.AddColumn;

    constructor(public payload: { column: Column }) {
    }
}

export class AddColumns implements Action {
    public readonly type = ColumnActionTypes.AddColumns;

    constructor(public payload: { columns: Column[] }) {
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

export class DeleteAllColumns implements Action {
    public readonly type = ColumnActionTypes.DeleteAllColumns;
}

export type ColumnActions =
    AddColumn
    | AddColumns
    | UpdateColumn
    | UpdateColumns
    | DeleteColumn
    | DeleteAllColumns;
