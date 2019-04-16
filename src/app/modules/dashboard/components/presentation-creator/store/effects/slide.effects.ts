import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddSlide, AddSlides, SlideActionTypes } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/slide.actions';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SlideEffects {

    @Effect()
    public addSlide$ = this.actions$.pipe(
        ofType<AddSlide>(SlideActionTypes.AddSlide),
        map((action: AddSlide) => {

        })
    );

    @Effect()
    public addSlides$ = this.actions$.pipe(
        ofType<AddSlides>(SlideActionTypes.AddSlides),
        map((action: AddSlides) => {

        })
    );

    constructor(private actions$: Actions) {
    }

}
