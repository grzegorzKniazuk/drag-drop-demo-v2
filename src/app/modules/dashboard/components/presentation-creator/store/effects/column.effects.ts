import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddColumn, ColumnActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store';
import { Slide } from '../../../../../../shared/interfaces/slide';
import { DeleteSlidesFromLibary } from '../actions/slide-libary.actions';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ColumnEffects {

    @Effect({ dispatch: false })
    public addColumn$: Observable<void> = this.actions$.pipe(
        ofType<AddColumn>(ColumnActionTypes.AddColumn),
        map((action: AddColumn) => {
            const ids = action.payload.column.slides.map((slide: Slide) => {
                return slide.id;
            });

            if (ids.length) {
                this.store.dispatch(new DeleteSlidesFromLibary({ ids }));
            }
        }),
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
    ) {
    }

}
