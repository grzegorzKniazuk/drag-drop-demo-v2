import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Presentation } from '../../../../../../shared/interfaces/presentation';
import { PresentationListActions, PresentationListActionsTypes } from '../actions/presentation-list.actions';

export interface PresentationListState extends EntityState<Presentation> {
    // additional entities state properties
}

export const presentationListAdapter: EntityAdapter<Presentation> = createEntityAdapter<Presentation>();

export const initialPresentationListState: PresentationListState = presentationListAdapter.getInitialState({
    // additional entity state properties
});

export function presentationListReducer(state = initialPresentationListState, action: PresentationListActions): PresentationListState {
    switch (action.type) {
        case PresentationListActionsTypes.AddPresentation: {
            return presentationListAdapter.addOne(action.payload.presentation, state);
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
} = presentationListAdapter.getSelectors();
