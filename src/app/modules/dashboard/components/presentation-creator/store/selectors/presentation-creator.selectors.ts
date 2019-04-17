import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PresentationCreatorState } from '../index';

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



