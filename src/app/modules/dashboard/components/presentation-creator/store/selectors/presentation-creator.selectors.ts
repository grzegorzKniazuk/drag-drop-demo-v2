import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PresentationCreatorState } from 'src/app/modules/dashboard/components/presentation-creator/store/index';
import * as slidesLibaryEntitySelectors from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/column.reducer';

export const presentationCreatorState = createFeatureSelector<PresentationCreatorState>('presentationCreator');

export const columnsState = createSelector(
    presentationCreatorState,
    state => state.columns,
);

export const slidesState = createSelector(
    presentationCreatorState,
    state => state.columns,
);

export const slidesLibaryState = createSelector(
    presentationCreatorState,
    state => state.slidesLibary,
);

export const amountOfSlidesInLibary = createSelector(
    slidesLibaryState,
    slidesLibaryEntitySelectors.selectTotal,
);

