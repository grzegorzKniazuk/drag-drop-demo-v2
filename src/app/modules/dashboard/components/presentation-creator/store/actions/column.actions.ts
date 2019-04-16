import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Column } from 'src/app/shared/interfaces/column';

export enum ColumnActionTypes {
    LoadColumns = '[Column] Load Columns',
    AddColumn = '[Column] Add Column',
    UpsertColumn = '[Column] Upsert Column',
    AddColumns = '[Column] Add Columns',
    UpsertColumns = '[Column] Upsert Columns',
    UpdateColumn = '[Column] Update Column',
    UpdateColumns = '[Column] Update Columns',
    DeleteColumn = '[Column] Delete Column',
    DeleteColumns = '[Column] Delete Columns',
    ClearColumns = '[Column] Clear Columns',
    MoveColumn = '[Column] Move Column',
}

export class LoadColumns implements Action {
    readonly type = ColumnActionTypes.LoadColumns;

    constructor(public payload: { columns: Column[] }) {
    }
}

export class AddColumn implements Action {
    readonly type = ColumnActionTypes.AddColumn;

    constructor(public payload: { column: Column }) {
    }
}

export class UpsertColumn implements Action {
    readonly type = ColumnActionTypes.UpsertColumn;

    constructor(public payload: { column: Column }) {
    }
}

export class AddColumns implements Action {
    readonly type = ColumnActionTypes.AddColumns;

    constructor(public payload: { columns: Column[] }) {
    }
}

export class UpsertColumns implements Action {
    readonly type = ColumnActionTypes.UpsertColumns;

    constructor(public payload: { columns: Column[] }) {
    }
}

export class UpdateColumn implements Action {
    readonly type = ColumnActionTypes.UpdateColumn;

    constructor(public payload: { column: Update<Column> }) {
    }
}

export class UpdateColumns implements Action {
    readonly type = ColumnActionTypes.UpdateColumns;

    constructor(public payload: { columns: Update<Column>[] }) {
    }
}

export class DeleteColumn implements Action {
    readonly type = ColumnActionTypes.DeleteColumn;

    constructor(public payload: { id: string }) {
    }
}

export class DeleteColumns implements Action {
    readonly type = ColumnActionTypes.DeleteColumns;

    constructor(public payload: { ids: string[] }) {
    }
}

export class ClearColumns implements Action {
    readonly type = ColumnActionTypes.ClearColumns;
}

export class MoveColumn implements Action {
    public readonly type = ColumnActionTypes.MoveColumn;
}

export type ColumnActions =
    LoadColumns
    | AddColumn
    | UpsertColumn
    | AddColumns
    | UpsertColumns
    | UpdateColumn
    | UpdateColumns
    | DeleteColumn
    | DeleteColumns
    | ClearColumns
    | MoveColumn;
