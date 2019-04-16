import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as columnEntitySelectors from '../reducers/column.reducer';
import { PresentationCreatorState } from 'src/app/modules/dashboard/components/presentation-creator/store/index';

export const presentationCreatorState = createFeatureSelector<PresentationCreatorState>('presentationCreator');

export const columnsState = createSelector(
    presentationCreatorState,
    state => state.columns,
);

export const slidesState = createSelector(
    presentationCreatorState,
    state => state.columns,
);

export const columnsAmount = createSelector(
    columnsState,
    columnEntitySelectors.selectTotal,
);
