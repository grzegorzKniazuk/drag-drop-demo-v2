import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PresentationLibaryState } from '../index';

export const presentationLibaryState = createFeatureSelector('presentationLibary');

export const presentationListState = createSelector(
    presentationLibaryState,
    (state: PresentationLibaryState) => state.presentationList,
);
