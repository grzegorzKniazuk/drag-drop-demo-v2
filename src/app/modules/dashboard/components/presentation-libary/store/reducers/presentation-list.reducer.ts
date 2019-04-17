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
        case PresentationListActionsTypes.UpdatePresentation: {
            return presentationListAdapter.updateOne(action.payload.presentation, state);
        }
        case PresentationListActionsTypes.DeletePresentation: {
            return presentationListAdapter.removeOne(action.payload.id, state);
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
