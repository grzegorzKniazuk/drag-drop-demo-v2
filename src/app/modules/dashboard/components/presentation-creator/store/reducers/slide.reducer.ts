import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SlideActions, SlideActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/slide.actions';
import { Slide } from 'src/app/shared/interfaces/slide';

export interface SlideState extends EntityState<Slide> {
    // additional entities state properties
}

export const slideAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();

export const initialSlideState: SlideState = slideAdapter.getInitialState({
    // additional entity state properties
});

export function slideReducer(state = initialSlideState, action: SlideActions): SlideState {
    switch (action.type) {
        case SlideActionTypes.AddSlide: {
            return slideAdapter.addOne(action.payload.slide, state);
        }

        case SlideActionTypes.UpsertSlide: {
            return slideAdapter.upsertOne(action.payload.slide, state);
        }

        case SlideActionTypes.AddSlides: {
            return slideAdapter.addMany(action.payload.slides, state);
        }

        case SlideActionTypes.UpsertSlides: {
            return slideAdapter.upsertMany(action.payload.slides, state);
        }

        case SlideActionTypes.UpdateSlide: {
            return slideAdapter.updateOne(action.payload.slide, state);
        }

        case SlideActionTypes.UpdateSlides: {
            return slideAdapter.updateMany(action.payload.slides, state);
        }

        case SlideActionTypes.DeleteSlide: {
            return slideAdapter.removeOne(action.payload.id, state);
        }

        case SlideActionTypes.DeleteSlides: {
            return slideAdapter.removeMany(action.payload.ids, state);
        }

        case SlideActionTypes.LoadSlides: {
            return slideAdapter.addAll(action.payload.slides, state);
        }

        case SlideActionTypes.ClearSlides: {
            return slideAdapter.removeAll(state);
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
} = slideAdapter.getSelectors();
