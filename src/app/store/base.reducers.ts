import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { slidesReducer, SlidesState } from 'src/app/store/reducers/slides.reducer';
import { columnsReducer, ColumnsState } from 'src/app/store/reducers/columns.reducer';

export interface AppState {
    slides: SlidesState;
    columns: ColumnsState;
}

export const baseReducers: ActionReducerMap<AppState> = {
    slides: slidesReducer,
    columns: columnsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [ storeFreeze ];
