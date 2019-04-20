import { createSelector } from '@ngrx/store';
import * as presentationListEntitySelectors from '../reducers/presentation-list.reducer';
import { presentationListState } from './presentation-libary.selectors';

export const amountOfPresentationsInLibary = createSelector(
    presentationListState,
    presentationListEntitySelectors.selectTotal,
);
