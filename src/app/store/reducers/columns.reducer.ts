import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Column } from 'src/app/shared/interfaces/column';
import { ColumnsActions, ColumnsActionTypes } from 'src/app/store/actions/columns.actions';

export interface ColumnsState extends EntityState<Column> {
}

export const columnsStateAdapter: EntityAdapter<Column> = createEntityAdapter<Column>();

export const initialColumnsState: ColumnsState = columnsStateAdapter.getInitialState();

export function columnsReducer(state = initialColumnsState, action: ColumnsActions) {
    switch (action.type) {
        case ColumnsActionTypes.AddColumn: {
            return columnsStateAdapter.addOne(action.payload.column, state);
        }
        case ColumnsActionTypes.EditColumn: {
            return { ...state };
        }
        case ColumnsActionTypes.RemoveColumn: {
            return { ...state };
        }
        case ColumnsActionTypes.MoveColumn: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = columnsStateAdapter.getSelectors();
