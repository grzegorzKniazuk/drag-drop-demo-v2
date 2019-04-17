import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddPresentation, PresentationListActionsTypes } from '../actions/presentation-list.actions';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PresentationListEffects {

    @Effect({ dispatch: false })
    public addPresentation$: Observable<boolean> = this.actions$.pipe(
        ofType<AddPresentation>(PresentationListActionsTypes.AddPresentation),
        switchMap(() => {
             return this.router.navigateByUrl('/dashboard/presentation-creator');
        }),
    );

    constructor(
        private actions$: Actions,
        private router: Router) {
    }
}
