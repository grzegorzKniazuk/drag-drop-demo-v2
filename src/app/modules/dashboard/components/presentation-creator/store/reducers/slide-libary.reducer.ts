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
        case SlideLibaryActionsTypes.AddSlide: {
            return slideLibaryAdapter.addOne(action.payload.slide, state);
        }
        case SlideLibaryActionsTypes.AddSlides: {
            return slideLibaryAdapter.addMany(action.payload.slides, state);
        }
        case SlideLibaryActionsTypes.DeleteSlide: {
            return slideLibaryAdapter.removeOne(action.payload.id, state);
        }
        case SlideLibaryActionsTypes.DeleteSlides: {
            return slideLibaryAdapter.removeMany(action.payload.ids, state);
        }
        case SlideLibaryActionsTypes.MoveSlide: {
            return state;
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
