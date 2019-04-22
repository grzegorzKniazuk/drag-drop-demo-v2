import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { columnReducer, ColumnState } from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/column.reducer';
import { slideLibaryReducer, SlideLibaryState } from 'src/app/modules/dashboard/components/presentation-creator/store/reducers/slide-libary.reducer';

export interface PresentationCreatorState {
    slidesLibary: SlideLibaryState,
    columns: ColumnState,
}

export const reducers: ActionReducerMap<PresentationCreatorState> = {
    slidesLibary: slideLibaryReducer,
    columns: columnReducer,
};

export const metaReducers: MetaReducer<PresentationCreatorState>[] = environment.production ? [] : [];
