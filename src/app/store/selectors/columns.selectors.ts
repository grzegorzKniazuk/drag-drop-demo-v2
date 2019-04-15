import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColumnsState } from 'src/app/store/reducers/columns.reducer';
import * as columnsEntitySelectors from '../reducers/columns.reducer';

export const columnsState = createFeatureSelector<ColumnsState>('columns');

export const columnsAmount = createSelector(
    columnsState,
    columnsEntitySelectors.selectTotal,
);
