import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddColumn, AddColumns, ColumnActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ColumnEffects {

    @Effect()
    public addColumn$ = this.actions$.pipe(
        ofType<AddColumn>(ColumnActionTypes.AddColumn),
        tap(() => {

        }),
    );

    public addColumns$ = this.actions$.pipe(
        ofType<AddColumns>(ColumnActionTypes.AddColumns),
        tap(() => {

        }),
    );

    constructor(private actions$: Actions) {
    }

}
