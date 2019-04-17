import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddPresentation, PresentationListActionsTypes } from '../actions/presentation-list.actions';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store';
import { AddSlides } from '../../../presentation-creator/store/actions/slide.actions';

@Injectable({
    providedIn: 'root',
})
export class PresentationListEffects {

    @Effect({ dispatch: true })
    public addPresentation$: Observable<void> = this.actions$.pipe(
        ofType<AddPresentation>(PresentationListActionsTypes.AddPresentation),
        switchMap((action: AddPresentation) => {
             return this.router.navigateByUrl('/dashboard/presentation-creator').then(() => {
                 return this.store.dispatch(new AddSlides({ slides: action.payload.presentation.slides }));
             });
        }),
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private router: Router,
    ) {
    }
}
