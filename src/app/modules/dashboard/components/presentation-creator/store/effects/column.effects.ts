import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable({
    providedIn: 'root',
})
export class ColumnEffects {

    constructor(
        private actions$: Actions,
    ) {
    }

}
