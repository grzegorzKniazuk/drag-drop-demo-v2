import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { presentationListReducer, PresentationListState } from './reducers/presentation-list.reducer';

export interface PresentationLibaryState {
    presentationList: PresentationListState,
}

export const reducers: ActionReducerMap<PresentationLibaryState> = {
    presentationList: presentationListReducer,
};

export const metaReducers: MetaReducer<PresentationLibaryState>[] = environment.production ? [] : [];
