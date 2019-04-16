import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ColumnActions, ColumnActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { Column } from 'src/app/shared/interfaces/column';

export interface ColumnState extends EntityState<Column> {
  // additional entities state properties
}

export const columnAdapter: EntityAdapter<Column> = createEntityAdapter<Column>();

export const initialColumunState: ColumnState = columnAdapter.getInitialState({
  // additional entity state properties
});

export function columnReducer(state = initialColumunState, action: ColumnActions): ColumnState {
  switch (action.type) {
    case ColumnActionTypes.AddColumn: {
      return columnAdapter.addOne(action.payload.column, state);
    }

    case ColumnActionTypes.UpsertColumn: {
      return columnAdapter.upsertOne(action.payload.column, state);
    }

    case ColumnActionTypes.AddColumns: {
      return columnAdapter.addMany(action.payload.columns, state);
    }

    case ColumnActionTypes.UpsertColumns: {
      return columnAdapter.upsertMany(action.payload.columns, state);
    }

    case ColumnActionTypes.UpdateColumn: {
      return columnAdapter.updateOne(action.payload.column, state);
    }

    case ColumnActionTypes.UpdateColumns: {
      return columnAdapter.updateMany(action.payload.columns, state);
    }

    case ColumnActionTypes.DeleteColumn: {
      return columnAdapter.removeOne(action.payload.id, state);
    }

    case ColumnActionTypes.DeleteColumns: {
      return columnAdapter.removeMany(action.payload.ids, state);
    }

    case ColumnActionTypes.LoadColumns: {
      return columnAdapter.addAll(action.payload.columns, state);
    }

    case ColumnActionTypes.ClearColumns: {
      return columnAdapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = columnAdapter.getSelectors();
