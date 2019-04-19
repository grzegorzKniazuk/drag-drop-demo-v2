import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ColumnActions, ColumnActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { Column } from 'src/app/shared/interfaces/column';
import { MoveIDs } from '../../../../../../shared/interfaces/moveIDs';

export interface ColumnState extends EntityState<Column> {
    moveSlideStart: MoveIDs;
    moveSlideEnd: MoveIDs;
}

export const columnAdapter: EntityAdapter<Column> = createEntityAdapter<Column>();

export const initialColumunState: ColumnState = columnAdapter.getInitialState({
    moveSlideStart: undefined,
    moveSlideEnd: undefined,
});

export function columnReducer(state = initialColumunState, action: ColumnActions): ColumnState {
    switch (action.type) {
        case ColumnActionTypes.AddColumn: {
            return columnAdapter.addOne(action.payload.column, state);
        }

        case ColumnActionTypes.AddColumns: {
            return columnAdapter.addMany(action.payload.columns, state);
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
