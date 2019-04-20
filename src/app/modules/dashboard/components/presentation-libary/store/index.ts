import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { presentationListReducer, PresentationListState } from './reducers/presentation-list.reducer';

export interface PresentationLibaryState {
    presentationList: PresentationListState,
}

export const reducers: ActionReducerMap<PresentationLibaryState> = {
    presentationList: presentationListReducer,
};

export const metaReducers: MetaReducer<PresentationLibaryState>[] = !environment.production ? [] : [ storeFreeze ];
