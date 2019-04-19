import { createSelector } from '@ngrx/store';
import * as slidesLibaryEntitySelectors from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/slide-libary.reducer';
import { slidesLibaryState } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/presentation-creator.selectors';

export const amountOfSlidesInLibary = createSelector(
    slidesLibaryState,
    slidesLibaryEntitySelectors.selectTotal,
);

export const slidesLibaryEntities = createSelector(
    slidesLibaryState,
    slidesLibaryEntitySelectors.selectAll,
);

export const selectSlideFromLibaryById = (slideId: number) => createSelector(
    slidesLibaryState,
    state => state.entities[slideId],
);
