import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { slideReducer, SlideState } from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/slide.reducer';
import { columnReducer, ColumnState } from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/column.reducer';
import { slideLibaryReducer, SlideLibaryState } from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/slide-libary.reducer';

export interface PresentationCreatorState {
    slidesLibary: SlideLibaryState,
    slides: SlideState,
    columns: ColumnState,
}

export const reducers: ActionReducerMap<PresentationCreatorState> = {
    slidesLibary: slideLibaryReducer,
    slides: slideReducer,
    columns: columnReducer,
};

export const metaReducers: MetaReducer<PresentationCreatorState>[] = !environment.production ? [] : [ storeFreeze ];
