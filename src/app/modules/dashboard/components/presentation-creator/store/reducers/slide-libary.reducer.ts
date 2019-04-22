import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces/slide';
import {
    SlideLibaryActions,
    SlideLibaryActionsTypes,
} from 'src/app/modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';

export interface SlideLibaryState extends EntityState<Slide> {
    // additional entities state properties
}

export const slideLibaryAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();

export const initialSlideLibaryState: SlideLibaryState = slideLibaryAdapter.getInitialState({
    // additional entity state properties
});

export function slideLibaryReducer(state = initialSlideLibaryState, action: SlideLibaryActions): SlideLibaryState {
    switch (action.type) {
        case SlideLibaryActionsTypes.AddSlidesToLibary: {
            return slideLibaryAdapter.addMany(action.payload.slides, state);
        }
        case SlideLibaryActionsTypes.DeleteSlidesFromLibary: {
            return slideLibaryAdapter.removeMany(action.payload.ids, state);
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
} = slideLibaryAdapter.getSelectors();
