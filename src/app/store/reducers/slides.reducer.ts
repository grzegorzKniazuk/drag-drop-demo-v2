import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces/slide';
import { SlidesActions, SlidesActionTypes } from 'src/app/store/actions/slides.actions';

export interface SlidesState extends EntityState<Slide> {
}

export const slidesStateAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();

export const initialSlidesState: SlidesState = slidesStateAdapter.getInitialState();

export function slidesReducer(state = initialSlidesState, action: SlidesActions): SlidesState {
    switch (action.type) {
        case SlidesActionTypes.AddSlide: {
            return slidesStateAdapter.addOne(action.payload.slide, state);
        }
        case SlidesActionTypes.EditSlide: {
            return { ...state };
        }
        case SlidesActionTypes.RemoveSlide: {
            return { ...state };
        }
        case SlidesActionTypes.MoveSlide: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = slidesStateAdapter.getSelectors();
