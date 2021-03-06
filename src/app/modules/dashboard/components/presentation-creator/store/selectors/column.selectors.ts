import { createSelector } from '@ngrx/store';
import { columnsState } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/presentation-creator.selectors';
import * as columnEntitySelectors from '../reducers/column.reducer';

export const amountOfPresentationColumns = createSelector(
    columnsState,
    columnEntitySelectors.selectTotal,
);

export const selectColumnsState = createSelector(
    columnsState,
    columnEntitySelectors.selectAll,
);

export const selectColumnByID = (columnID: number) => {
    return createSelector(
        columnsState,
        state => state.entities[columnID],
    );
};
