import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ColumnActions, ColumnActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { Column } from 'src/app/shared/interfaces/column';
import { SlideMove } from '../../../../../../shared/interfaces/slideMove';

export interface ColumnState extends EntityState<Column> {
    slideMove: SlideMove,
}

export const columnAdapter: EntityAdapter<Column> = createEntityAdapter<Column>();

export const initialColumunState: ColumnState = columnAdapter.getInitialState({
    slideMove: undefined,
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
        case ColumnActionTypes.MoveSlideStart: {
            return {
                ...state,
                slideMove: {
                    ...state.slideMove,
                    start: {
                        columnID: action.payload.columnID,
                        slideID: action.payload.slideID,
                    },
                    dropOnDivider: false,
                },
            }
        }
        case ColumnActionTypes.MoveSlideEnd: {
            return {
                ...state,
                slideMove: {
                    ...state.slideMove,
                    end: {
                        columnID: action.payload.columnID,
                        slideID: action.payload.slideID,
                    },
                    dropOnDivider: action.payload.dropOnDivider,
                },
            }
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
